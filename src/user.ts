import { connection } from "./config/db";

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
