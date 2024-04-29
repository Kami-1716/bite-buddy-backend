import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";

export const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const searchTerm = (req.query.searchTerm as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOptions = (req.query.sortOptions as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i");

    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisines"] = { $in: cuisinesArray };
    }

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOptions]: 1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .lean();
    const totalRestaurants = await Restaurant.countDocuments(query);
    const response = {
      data: restaurants,
      pagination: {
        total: totalRestaurants,
        page: page,
        pages: Math.ceil(totalRestaurants / pageSize),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
