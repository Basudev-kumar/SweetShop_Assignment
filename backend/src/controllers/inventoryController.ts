// src/controllers/inventoryController.ts
import { Request, Response } from 'express';
import Sweet from '../models/Sweet';

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const sweetId = req.params.id;

    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough stock available',
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

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

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const sweetId = req.params.id;

    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    sweet.quantity += quantity;
    await sweet.save();

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