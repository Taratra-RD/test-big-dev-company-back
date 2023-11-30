const request = require("supertest");
const app = require("../controllers/posts.controllers");

describe("Post Endpoints", () => {
  let postId;

  // Test d'ajout d'un post
  it("should add a new post", async () => {
    const res = await request(app).post("/addPost").send({
      title: "New post",
      content: "Just a post content, normally replaced with lorem ipsum!",
      user_id: "1",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Post added successfully!");
    postId = res.body.result.insertId; // Stocke l'ID du post pour les tests ultérieurs
  });

  // Test de récupération de tous les posts
  it("should get all posts", async () => {
    const res = await request(app).get("/getPosts");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Posts retrieved successfully!");
    expect(res.body).toHaveProperty("result");
    expect(res.body.result).toBeInstanceOf(Array);
  });

  // Test de récupération d'un post spécifique
  it("should get a specific post", async () => {
    const res = await request(app).get(`/getPost/${postId}`); // Utilise l'ID du post créé précédemment

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "One post retrieved successfully!"
    );
    expect(res.body).toHaveProperty("result");
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.result.length).toBe(1); // S'assure qu'un seul post est retourné
  });

  // Test de mise à jour d'un post
  it("should update a post", async () => {
    const res = await request(app)
      .put(`/updatePost/${postId}`) // Utilise l'ID du post créé précédemment
      .send({
        title: "Updated post",
        content: "Updated post content",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "One post updated successfully!"
    );
    expect(res.body).toHaveProperty("result");
    expect(res.body.result.affectedRows).toBe(1); // S'assure qu'un seul post est mis à jour
  });
});
