const request = require("supertest");
const app = require("../controllers/users.controllers");

describe("Auth Endpoints", () => {
  it("should sign up a user", async () => {
    const res = await request(app).post("/signup").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User added successfully!");
  });

  it("should sign in a user", async () => {
    const res = await request(app).post("/signin").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Login successfully!");
    expect(res.body).toHaveProperty("token");
  });
});
