import request from "supertest";
import app from "../app";
import { db } from "../db";

beforeEach(async () => {
  await db.query("DELETE FROM users;");
});

afterAll(async () => {
  await db.end();
});

describe("POST /api/auth/signup", () => {

  it("Debe crear un usuario correctamente", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        username: "testuser",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user.username).toBe("testuser");
  });

  it("Debe fallar si falta username", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        password: "123456",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("username y password son requeridos");
  });

  it("Debe fallar si el usuario ya existe", async () => {
    // crear primero
    await request(app)
      .post("/api/auth/signup")
      .send({
        username: "user1",
        password: "123456",
      });

    // intentar duplicar
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        username: "user1",
        password: "123456",
      });

    expect(res.statusCode).toBe(400); // tu controlador devuelve 400, NO 409
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("El usuario ya existe");
  });

});
