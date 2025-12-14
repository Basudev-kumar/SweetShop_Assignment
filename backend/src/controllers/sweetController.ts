// src/controllers/sweetController.ts
import { Request, Response } from 'express';
import Sweet, { ISweet } from '../models/Sweet';

export const createSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity, description } = req.body;

    const sweet = new Sweet({
      name,
      category,
      price,
      quantity: quantity || 0,
      description,
    });

    await sweet.save();

    res.status(201).json({
      success: true,
      data: sweet,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const getSweets = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.name = { $regex: search as string, $options: 'i' };
    }

    const sweets = await Sweet.find(query);
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const getSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    res.status(200).json({
      success: true,
      data: sweet,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity, description } = req.body;

    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price,
        quantity,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    res.status(200).json({
      success: true,
      data: sweet,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};