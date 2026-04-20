const { default: axios } = require("axios");
const { Sale, sequelize } = require("../models");

class PaymentController {
  static async createQRIS(req, res, next) {
    try {
      const { sale_id, payment_amount } = req.body;

      const sale = await Sale.findByPk(sale_id);
      if (!sale) throw { name: "NotFound" };

      if (payment_amount < sale.total) {
        throw { name: "InsufficientPayment" };
      }

      const qrisResponse = await axios.post(
        `https://app.pakasir.com/api/transactioncreate/qris`,
        {
          project: process.env.SLUG_PAKASIR,
          order_id: String(sale_id),
          amount: payment_amount,
          api_key: process.env.API_PAKASIR,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        },
      );

      console.log(
        "QRIS Response dari Pakasir:",
        JSON.stringify(qrisResponse.data, null, 2),
      );

      res.status(200).json({
        message: "QRIS created successfully",
        data: {
          qris_code: qrisResponse.data.payment.payment_number,
          payment_method: qrisResponse.data.payment.payment_method,
          amount: qrisResponse.data.payment.amount,
          total_payment: qrisResponse.data.payment.total_payment,
          fee: qrisResponse.data.payment.fee,
          expired_at: qrisResponse.data.payment.expired_at,
          transaction_id: qrisResponse.data.payment.order_id,
          sale_id,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async confirmPayment(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { sale_id, payment_amount, payment_method } = req.body;
      const sale = await Sale.findByPk(sale_id, { transaction: t });
      if (!sale) throw { name: "NotFound" };

      if (sale.total === 0 || sale.total === null) {
        throw { name: "EmptySale" };
      }

      if (payment_amount < sale.total) {
        throw { name: "InsufficientPayment" };
      }

      let change_amount = payment_amount - sale.total;

      await sale.update(
        {
          payment_amount,
          change_amount,
          payment_method,
        },
        { transaction: t },
      );
      await t.commit();

      res.status(200).json({
        message: "Payment Success",
        data: {
          invoice_number: sale.invoice_number,
          total: sale.total,
          payment_amount: sale.payment_amount,
          change_amount: sale.change_amount,
          payment_method,
        },
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  // pakasir payment confirmation
  static async pakasirWebhook(req, res, next) {
    try {
      const { order_id, status, transaction_id } = req.body;

      if (status === "paid" || status === "success") {
        const sale = await Sale.findByPk(order_id);

        if (sale) {
          await sale.update({
            payment_status: status,
            external_transaction_id: transaction_id,
          });
        }
      }

      res.status(200).json({
        message: "Webhook received",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = PaymentController;
