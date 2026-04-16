const { default: axios } = require("axios");
const { Sale, sequelize } = require("../models");

class PaymentController {
  static async payment(req, res, next) {
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

      if (payment_method === "QRIS") {
        const qrisResponse = await axios.post(
          `https://app.pakasir.com/api/transactioncreate/qris`,
          {
            project: "depodomain",
            order_id: sale_id,
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
      }

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
}

module.exports = PaymentController;
