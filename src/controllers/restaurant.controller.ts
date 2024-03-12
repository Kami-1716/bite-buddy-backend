import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import uploadToCloudinary from "../utils/cloudinary";
import mongoose from "mongoose";

export const createNewRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (existingRestaurant) {
      return res.status(409).json({
        message: "Restaurant with this name already exists",
      });
    }
    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image?.buffer).toString("base64");
    const dataUri = `data:${image?.mimetype};base64,${base64Image}`;

    const uploadImageResponse = await uploadToCloudinary(dataUri);
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadImageResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();
    res.status(201).json({
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong while creating restaurant",
    });
  }
};

export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    res.status(200).json({
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong while fetching restaurant",
    });
  }
};

export default {
  createNewRestaurant,
  getMyRestaurant,
};
