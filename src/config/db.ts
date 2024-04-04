import pgp from "pg-promise";

export const connection = pgp()(
  "postgres://postgres:postgres@localhost:5432/cccat16"
);
