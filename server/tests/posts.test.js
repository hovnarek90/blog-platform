const request = require("supertest");
const app = require("../app"); 
const mongoose = require("mongoose");
const Post = require("../models/Post");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/blog-platform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
}) 

describe("POST /api/posts", () => {
  it("should create a new post", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({ title: "Test Post", content: "This is a test post." });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", "Test Post");
    expect(response.body).toHaveProperty("content", "This is a test post.");
  });
});

describe("GET /api/posts", () => {
  it("should return all posts", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET /api/posts/:id", () => {
  it("should return a post by ID", async () => {
    const newPost = new Post({
      title: "Test Post",
      content: "This is a test post.",
    });
    await newPost.save();

    const response = await request(app).get(`/api/posts/${newPost._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Test Post");
  });
});

describe("DELETE /api/posts/:id", () => {
  it("should delete a post by ID", async () => {
    const newPost = new Post({
      title: "Post to delete",
      content: "Delete me!",
    });
    await newPost.save();

    const response = await request(app).delete(`/api/posts/${newPost._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Post deleted");
  });
});
