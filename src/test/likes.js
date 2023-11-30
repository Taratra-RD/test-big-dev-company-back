const request = require("supertest");
const app = require("../controllers/likes.controllers");

describe("Likes Endpoints", () => {
  let postId;
  let userId;

  // Test de récupération des likes
  it("should get likes for a post", async () => {
    const res = await request(app).get(`/getLike/${postId}`).send({
      user_id: userId,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Get liked post successfully!");
    expect(res.body).toHaveProperty("result");
  });

  // Test de mise à jour des likes (ajout)
  it("should add a like to a post", async () => {
    const res = await request(app).put(`/updateLikes/${postId}`).send({
      user_id: userId,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Liked post successfully!");
    expect(res.body).toHaveProperty("result");
  });

  // Test de mise à jour des likes (suppression)
  it("should remove a like from a post", async () => {
    const res = await request(app).put(`/updateLikes/${postId}`).send({
      user_id: userId,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Disliked post successfully!");
    expect(res.body).toHaveProperty("result");
  });
});
