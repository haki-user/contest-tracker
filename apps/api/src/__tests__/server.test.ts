import supertest from "supertest";
import { createServer } from "../server";

describe("Server", () => {
  it("health check returns 200", async () => {
    await supertest(createServer())
      .get("/contest/CF")
      .expect(200)
      .then((res) => {
        expect(res.ok).toBe(true);
      });
  });

  it("message endpoint says hello", async () => {
    await supertest(createServer())
      .get("/")
      .expect(200)
      .then((res) => {
        expect(res.ok).toEqual(true);
      });
  });
});
