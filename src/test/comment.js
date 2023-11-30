const request = require("supertest");
const app = require("../controllers/comments.controllers");

describe("Comment Endpoints", () => {
  let commentId;

  // Test d'ajout d'un commentaire
  it("should add a new comment", async () => {
    const res = await request(app).post("/addComment").send({
      content: "Just a comment content, normally replaced with lorem ipsum!",
      post_id: "1",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Comment added successfully!");
    commentId = res.body.result.insertId; // Stocke l'ID du commentaire pour les tests ultérieurs
  });

  // Test de récupération de tous les commentaires pour un post spécifique
  it("should get all comments for a specific post", async () => {
    const res = await request(app).get("/getComments").send({
      post_id: "1",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "Comments retrieved successfully!"
    );
    expect(res.body).toHaveProperty("result");
    expect(res.body.result).toBeInstanceOf(Array);
  });

  // Test de récupération d'un commentaire spécifique pour un post spécifique
  it("should get a specific comment for a specific post", async () => {
    const res = await request(app).get(`/getComment/${commentId}`).send({
      post_id: "1",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "One comment retrieved successfully!"
    );
    expect(res.body).toHaveProperty("result");
    expect(res.body.result).toBeInstanceOf(Array);
    expect(res.body.result.length).toBe(1); // S'assure qu'un seul commentaire est retourné
  });

  // Test de mise à jour d'un commentaire
  it("should update a comment", async () => {
    const res = await request(app).put(`/updateComment/${commentId}`).send({
      content: "Updated comment content",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "One comment updated successfully!"
    );
    expect(res.body).toHaveProperty("result");
    expect(res.body.result.affectedRows).toBe(1); // S'assure qu'un seul commentaire est mis à jour
  });
});
