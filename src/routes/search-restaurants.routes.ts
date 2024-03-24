import { Router } from "express";
import { param } from "express-validator";
import { searchRestaurants } from "../controllers/search-restaurants.controller";

// search restaurants rotutes
const router = Router();

// search restaurant
router
  .route("/search/:city")
  .get(
    param("city")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("City must be a valid string"),
    searchRestaurants
  );

export default router;
