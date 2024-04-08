import crypto from "crypto";
import { connection } from "./config/db";
import { validateCpf } from "./utils/validateCpf";

interface IAccount {
  accountId?: string;
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
}

async function checkUserAlreadyExists(email: string) {
  if (!email) throw new Error("Invalid email");

  const user = await connection.query(
    "select * from account where email = $1",
    [email]
  );

  if (user.length > 0) throw new Error("User already exists");
}

export async function getByAccountId(accountId: string) {
  try {
    const [user] = await connection.query(
      "select * from account where account_id = $1",
      [accountId]
    );
    return user;
  } catch (error) {
    throw new Error("Error getting user by account id");
  }
}

export async function getAll() {
  try {
    const users = await connection.query("select * from account");
    return users;
  } catch (error) {
    throw new Error("Error getting users");
  }
}

export async function create({
  name,
  email,
  cpf,
  carPlate,
  isPassenger,
  isDriver,
}: IAccount) {
  await checkUserAlreadyExists(email);
  const id = crypto.randomUUID();
  const isValidName = name.match(/[a-zA-Z] [a-zA-Z]+/);
  const cartPlateMatched = carPlate.match(/[A-Z]{3}[0-9]{4}/);
  if (!isValidName) throw new Error("Invalid name");
  if (!validateCpf(cpf)) throw new Error("Invalid CPF");
  if (isDriver && cartPlateMatched)
    throw new Error("Invalid car plate or driver status");

  if (!isDriver) {
    const [passengerAccount] = await connection.query(
      "insert into account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id, name, email, cpf, carPlate, !!isPassenger, !!isDriver]
    );

    return passengerAccount;
  }

  const [driverAccount] = await connection.query(
    "insert into account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [id, name, email, cpf, carPlate, !!isPassenger, isDriver]
  );

  return driverAccount;
}
