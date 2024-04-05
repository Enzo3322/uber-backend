import crypto from "crypto";
import { validateCpf } from "./utils/validateCpf";
import { connection } from "./config/db";

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

export async function signup({
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
    await connection.query(
      "insert into account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [id, name, email, cpf, carPlate, !!isPassenger, !!isDriver]
    );

    return {
      account_id: id,
      name,
      email,
      cpf,
      car_plate: carPlate,
      is_passenger: !!isPassenger,
      is_driver: !!isDriver,
    };
  }

  await connection.query(
    "insert into account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
    [id, name, email, cpf, carPlate, !!isPassenger, isDriver]
  );

  return {
    account_id: id,
    name,
    email,
    cpf,
    car_plate: carPlate,
    is_passenger: !!isPassenger,
    is_driver: !!isDriver,
  };
}
