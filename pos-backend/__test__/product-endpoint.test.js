require("dotenv").config();
const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { User, Category, Product } = require("../models");
const redis = require("../helpers/redis");
const imageKit = require("../helpers/imagekit");

let adminToken;
let testCategoryId;
let testProductId;

// Mock the dependencies
jest.mock("../helpers/redis", () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  keys: jest.fn().mockResolvedValue([]),
}));

jest.mock("../helpers/imagekit", () => ({
  files: {
    upload: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.setTimeout(30000); // 30 seconds to allow for DB connection/setup

beforeAll(async () => {
  try {
    // Ensure DB is clean before starting
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

    console.log("Admin user created:", user.id);

    // 2. Generate Token
    adminToken = signToken({ id: user.id, username: user.username, role: user.role });

    // 3. Create Category
    const category = await Category.create({ name: "Medicine" });
    testCategoryId = category.id;

    // 4. Create Initial Product
    const product = await Product.create({
      name: "Paracetamol",
      price: 15000,
      cost_price: 10000,
      stock: 50,
      image: "https://example.com/image.jpg",
      imageId: "img_temp_id_123",
      barcode: "1234567890",
      category_id: testCategoryId,
    });
    testProductId = product.id;
  } catch (error) {
    console.log("Setup Error Detail:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // Clean up
    await User.destroy({ where: {}, truncate: true, cascade: true });
    await Product.destroy({ where: {}, truncate: true, cascade: true });
    await Category.destroy({ where: {}, truncate: true, cascade: true });
    
    // Close DB connection
    await sequelize.close();
  } catch (error) {
    console.log("Teardown Error:", error);
  }
});

describe("Product Endpoints", () => {
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("GET /product/list", () => {
    it("should return 200 and a list of products", async () => {
      // Mock redis get to return null so it forces fetch from DB
      redis.get.mockResolvedValue(null);

      const response = await request(app)
        .get("/product/list")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Success get all products");
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1); // Because we seeded 1 product
    });

    it("should return 200 and a list of products from Redis Cache", async () => {
      const mockCachedData = {
        message: "Success get all products",
        pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
        data: [{ id: testProductId, name: "Paracetamol Cached" }]
      };
      redis.get.mockResolvedValue(JSON.stringify(mockCachedData));

      const response = await request(app)
        .get("/product/list")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.data[0].name).toBe("Paracetamol Cached");
    });
  });

  describe("POST /product/add", () => {
    it("should create a new product and return 201", async () => {
      // Mock ImageKit upload
      imageKit.files.upload.mockResolvedValue({
        url: "https://example.com/new-product.jpg",
        fileId: "img_new_temp_id",
      });

      const response = await request(app)
        .post("/product/add")
        .set("Cookie", [`token=${adminToken}`])
        .field("name", "Amoxicillin")
        .field("price", 20000)
        .field("cost_price", 15000)
        .field("stock", 100)
        .field("barcode", "0987654321")
        .field("category_id", testCategoryId)
        .attach("image", Buffer.from("fake-image-content"), "test-image.jpg");

      if (response.status !== 201) {
        console.log("POST /product/add failed:", response.body);
      }
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Success");
      expect(imageKit.files.upload).toHaveBeenCalledTimes(1);
    });

    it("should return 400 when no image is uploaded", async () => {
      const response = await request(app)
        .post("/product/add")
        .set("Cookie", [`token=${adminToken}`])
        .field("name", "No Image Product")
        .field("price", 10000)
        .field("cost_price", 5000);

      expect(response.status).toBe(400); // Bad Request, handled by error handler
    });
  });

  describe("GET /product/:id", () => {
    it("should return 200 and product details for a valid ID", async () => {
      const response = await request(app)
        .get(`/product/${testProductId}`)
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", testProductId);
      expect(response.body).toHaveProperty("name", "Paracetamol");
    });

    it("should return 404 for an invalid product ID", async () => {
      const response = await request(app)
        .get("/product/999999")
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(404);
    });
  });

  describe("PUT /product/:id", () => {
    it("should update an existing product and return 200", async () => {
      // Mock ImageKit upload for edit
      imageKit.files.upload.mockResolvedValue({
        url: "https://example.com/updated-product.jpg",
        fileId: "img_upd_temp_id",
      });

      const response = await request(app)
        .put(`/product/${testProductId}`)
        .set("Cookie", [`token=${adminToken}`])
        .field("name", "Paracetamol Extra")
        .field("price", 16000)
        .field("cost_price", 11000)
        .field("stock", 60)
        .field("category_id", testCategoryId)
        .attach("image", Buffer.from("fake-updated-image"), "test-update.jpg");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Update success");
    });
  });

  describe("DELETE /product/:id", () => {
    it("should delete an existing product and return 200", async () => {
      // Mock ImageKit delete
      imageKit.files.delete.mockResolvedValue(true);

      const response = await request(app)
        .delete(`/product/${testProductId}`)
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Delete Success");
      expect(imageKit.files.delete).toHaveBeenCalledTimes(1);
    });

    it("should return 404 when trying to delete non-existent product", async () => {
      const response = await request(app)
        .delete(`/product/999999`)
        .set("Cookie", [`token=${adminToken}`]);

      expect(response.status).toBe(404);
    });
  });
});