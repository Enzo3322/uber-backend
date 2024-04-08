import { Request, Response } from "express";
import { getAll, getByAccountId, create } from "../user";

export class UserController {
  public async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, cpf, carPlate, isPassenger, isDriver } = req.body;
      const user = await create({
        name,
        email,
        cpf,
        carPlate,
        isPassenger,
        isDriver,
      });

      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await getAll();

      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async getByAccountId(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const user = await getByAccountId(accountId);

      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
