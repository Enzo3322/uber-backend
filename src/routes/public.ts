import { Router } from "express";
import { signup } from "../signup";
import { getByAccountId, getAll } from "../user";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, cpf, carPlate, isPassenger, isDriver } = req.body;

    const account = await signup({
      name,
      email,
      cpf,
      carPlate,
      isPassenger,
      isDriver,
    });

    res.status(201).json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await getAll();

    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/users/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;
    const user = await getByAccountId(accountId);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export { router };
