const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("../src/routes/posts");

const app = express();
app.use(express.json());
app.use("/posts", postRoutes);

beforeAll(async() => {
    await mongoose.connect("mongodb://localhost:27017/test-db");
});

afterAll(async() => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe("Testando rota /posts", () => {
    it("Deve retornar array vazio inicialmente", async() => {
        const res = await request(app).get("/posts");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});