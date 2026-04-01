const app = require("../app.tsc");
const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");

const data = {
  name: "Testing Admin",
  username: "testadmin",
  password: hashPassword("12345678"),
  role: "admin",
  image: "https://ik.imagekit.io/myfiles/default-image-1.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

let cookieStr = "";

beforeAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkInsert("Users", [data]);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Authentication Endpoints", () => {
  describe("POST /auth/login", () => {
    it("should login successfully and return 200 with token/cookie", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "testadmin",
        password: "12345678",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("username", "testadmin");
      expect(response.body).toHaveProperty("role", "admin");

      // Simpan cookie untuk test selanjutnya
      const cookies = response.headers["set-cookie"];
      if (cookies) {
        cookieStr = cookies.find((c) => c.startsWith("token="));
      }
    });

    it("should fail to login with wrong password and return 401", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "testadmin",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username or password",
      );
    });

    it("should fail to login with unregistered username and return 401", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "notfounduser",
        password: "12345678",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username or password",
      );
    });

    it("should fail to login with empty username and return 400", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "",
        password: "12345678",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Username and password are required",
      );
    });
  });

  describe("GET /auth/getme", () => {
    it("should get user info successfully and return 200", async () => {
      const response = await request(app)
        .get("/auth/getme")
        .set("Cookie", cookieStr);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("username", "testadmin");
      expect(response.body).toHaveProperty("role", "admin");
    });

    it("should fail to get user info without token and return 401", async () => {
      const response = await request(app).get("/auth/getme");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("POST /auth/logout", () => {
    it("should logout successfully, clear cookie, and return 200", async () => {
      const response = await request(app)
        .post("/auth/logout")
        .set("Cookie", cookieStr);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Logout success");
    });

    it("should fail to logout if not logged in and return 401", async () => {
      const response = await request(app).post("/auth/logout");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
});
