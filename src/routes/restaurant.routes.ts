import express from "express";

const router = express.Router();

router.route("/").get((req, res) => {
  res.json({ message: "Hello, world!" });
});

export default router;
