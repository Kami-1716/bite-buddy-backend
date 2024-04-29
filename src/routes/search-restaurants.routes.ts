import { Router } from "express";
import { param } from "express-validator";
import {
  getRestaurantById,
  searchRestaurants,
} from "../controllers/search-restaurants.controller";

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

// get restaurant by id
router
  .route("/:restaurantId")
  .get(
    param("restaurantId")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Restaurant id must be a valid string"),
    getRestaurantById
  );

export default router;
