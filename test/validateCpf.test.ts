import { validate } from "../src/application/validateCpf";

test.each(["97456321558", "71428793860", "87748248800"])(
  "Should test if the CPF is valid: %s",
  function (cpf: string) {
    const isValid = validate(cpf);
    expect(isValid).toBe(true);
  }
);

test.each(["8774824880", null, undefined, "11111111111"])(
  "Should test if the CPF is invalid: %s",
  function (cpf: any) {
    const isValid = validate(cpf);
    expect(isValid).toBe(false);
  }
);
