require("dotenv").config();
const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { User, Category, Product, Sale, SaleItem } = require("../models");
const redis = require("../helpers/redis");

let adminToken;
let testCategoryId;
let testProductId;
let testSaleId;

// Mock the dependencies
jest.mock("../helpers/redis", () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  keys: jest.fn().mockResolvedValue([]),
}));

jest.setTimeout(30000); // 30 seconds to allow for DB connection/setup

beforeAll(async () => {
  try {
    // Ensure DB is clean before starting
    await SaleItem.destroy({ where: {}, truncate: true, cascade: true });
    await Sale.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });
    await Product.destroy({ where: {}, truncate: true, cascade: true });
    await Category.destroy({ where: {}, truncate: true, cascade: true });

    // 1. Create User -> Admin
    const user = await User.create({
      name: "Admin Tester",
      username: "testadmin",
      email: "admin@test.com",
      password: "password",
      role: "admin",
      status: "active",
    });

    // 2. Generate Token
    adminToken = signToken({ id: user.id, username: user.username, role: user.role });

    // 3. Create Category
    const category = await Category.create({ name: "Medicine" });
    testCategoryId = category.id;

    // 4. Create Initial Product with enough stock
    const product = await Product.create({
      name: "Paracetamol",
      price: 15000,
      cost_price: 10000,
      stock: 100,
      image: "https://example.com/image.jpg",
      imageId: "img_temp_id_123",
      barcode: "1234567890",
      category_id: testCategoryId,
    });
    testProductId = product.id;

    // 5. Create Initial Sale (for GET lists tests)
    const sale = await Sale.create({
      user_id: user.id,
      invoice_number: "INV-123456789",
      total: 15000,
      payment_amount: 20000,
      change_amount: 5000,
      payment_method: "Cash"
    });
    testSaleId = sale.id;

    await SaleItem.create({
      sale_id: testSaleId,
      product_id: testProductId,
      quantity: 1,
      price: 15000,
      subtotal: 15000
    });

  } catch (error) {
    console.log("Setup Error Detail:", error);
    throw error;
  }
});

afterAll(async () => {
  // Test finished
});

describe("Sale Endpoints", () => {
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("GET /sale/list-sale", () => {
    it("should return 200 and a list of sales", async () => {
      const response = await request(app)
        .get("/sale/list-sale")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Success get all sales");
      expect(response.body.data).toHaveProperty("allSales");
      expect(Array.isArray(response.body.data.allSales)).toBe(true);
      expect(response.body.data.allSales.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("GET /sale/list-item", () => {
    it("should return 200 and a list of sale items", async () => {
      const response = await request(app)
        .get("/sale/list-item")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Success get all sale items");
      expect(response.body.data).toHaveProperty("saleItems");
      expect(Array.isArray(response.body.data.saleItems)).toBe(true);
      expect(response.body.data.saleItems.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("GET /sale/:id", () => {
    it("should return 200 and the detail of sale transaction", async () => {
      const response = await request(app)
        .get(`/sale/${testSaleId}`)
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Success get sale");
      expect(response.body.data).toHaveProperty("sale");
      expect(response.body.data.sale.id).toBe(testSaleId);
      expect(Array.isArray(response.body.data.sale.SaleItems)).toBe(true);
    });

    it("should return 404 for an invalid sale ID", async () => {
      const response = await request(app)
        .get("/sale/999999")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Error not found");
    });
  });

  describe("POST /sale/add-item", () => {
    it("should create a new sale and update product stock correctly", async () => {
      const payload = {
        payment_amount: 30000,
        change_amount: 0,
        payment_method: "Cash",
        items: [
          {
            product_id: testProductId,
            quantity: 2
          }
        ]
      };

      const response = await request(app)
        .post("/sale/add-item")
        .set("Cookie", [`token=${adminToken}`])
        .send(payload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Success add sale item");
      expect(response.body.data).toHaveProperty("sale_id");
      expect(response.body.data.total).toBe(30000); // 2 * 15000

      // Verify Redis cache gets invalidated:
      expect(redis.keys).toHaveBeenCalledWith("products:*");

      // Verify product stock is updated in DB
      const updatedProduct = await Product.findByPk(testProductId);
      // Because initially stock was 100, and 1 item was bought during setup hook?
      // Wait, the setup hook didn't decrease the stock for the testSale item explicitly in `beforeAll` using the service logic.
      // So stock was explicitly created as 100.
      expect(updatedProduct.stock).toBe(98); // 100 - 2
    });

    it("should return 400 when missing items array", async () => {
      const payload = {
        payment_amount: 15000,
        change_amount: 0,
        payment_method: "Cash",
      };

      const response = await request(app)
        .post("/sale/add-item")
        .set("Cookie", [`token=${adminToken}`])
        .send(payload);

      expect(response.status).toBe(400); 
    });

    it("should return 400 when quantity exceeds product stock", async () => {
      const payload = {
        payment_amount: 30000,
        change_amount: 0,
        payment_method: "Cash",
        items: [
          {
            product_id: testProductId,
            quantity: 9999 // Exceeding stock
          }
        ]
      };

      const response = await request(app)
        .post("/sale/add-item")
        .set("Cookie", [`token=${adminToken}`])
        .send(payload);

      expect(response.status).toBe(400); 
      expect(response.body).toHaveProperty("message", "Product stock is not enough");
    });
  });

  describe("GET /sale/summary and /sale/analytics/*", () => {
    it("should return 200 for sales summary", async () => {
      const response = await request(app)
        .get("/sale/summary")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Success get sales summary");
    });

    it("should return 200 for daily analytics", async () => {
      const response = await request(app)
        .get("/sale/analytics/daily")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Success get daily analytics");
    });

    it("should return 200 for weekly analytics", async () => {
      const response = await request(app)
        .get("/sale/analytics/weekly")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Success get weekly analytics");
    });

    it("should return 200 for monthly analytics", async () => {
      const response = await request(app)
        .get("/sale/analytics/monthly")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Success get monthly analytics");
    });

    it("should return 200 for top products analytics", async () => {
      const response = await request(app)
        .get("/sale/analytics/top-products")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Success get top products analytics");
    });
  });
});

