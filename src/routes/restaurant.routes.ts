import express from "express";
import multer from "multer";
import { createNewRestaurant } from "../controllers/restaurant.controller";
import { jwtCheck, jwtParse } from "../middlewares/auth0.middleware";
import { validateMyRestaurantRequest } from "../middlewares/validation.middleware";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router
  .route("/")
  .post(
    upload.single("imageUrl"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    createNewRestaurant
  );

export default router;
