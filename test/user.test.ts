import { jestE2E } from "./jest-e2e.config";

test("Should create an account for the passenger", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    isPassenger: true,
    carPlate: "",
  };
  const output = await jestE2E.post("/api/signup").send(input);
  expect(output.status).toBe(201);
});

test("Should create an account for the driver", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    isPassenger: false,
    carPlate: "ABC123",
  };
  const output = await jestE2E.post("/api/signup").send(input);
  expect(output.status).toBe(201);
});

test("Should return an array of users", async function () {
  const output = await jestE2E.get("/api/users");
  expect(output.status).toBe(200);
  expect(output.body).toBeInstanceOf(Array);
});

test("Should return a passenger by accountId", async function () {
  const users = await jestE2E.get("/api/users");
  expect(users.status).toBe(200);
  const [firstUser] = users.body;
  const output = await jestE2E.get(`/api/users/${firstUser.account_id}`);
  expect(output.status).toBe(200);
  expect(output.body).toMatchObject(output.body);
});
