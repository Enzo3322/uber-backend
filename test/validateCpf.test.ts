import { validateCpf } from "../src/utils/validateCpf";

test.each(["97456321558", "71428793860", "87748248800"])(
  "Should test if the CPF is valid: %s",
  function (cpf: string) {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(true);
  }
);

test.each(["8774824880", null, undefined, "11111111111"])(
  "Should test if the CPF is invalid: %s",
  function (cpf: any) {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(false);
  }
);
