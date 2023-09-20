const PERMISSIONS = {
  CREATE_USER: "PERMISSION_CREATE_USER"
};
const PAYMENT_TYPES = {
  MERCADO_PAGO: "Mercado pago",
  PAYPAL: "Paypal",
  CASH: "Efectivo",
  TRANSFER: "Transferencia",
  CREDIT_CARD: "Tarjeta de credito",
  DEBIT_ACCOUNT: "Débito de cuenta",
  DEBIT_CARD: "Débito de tarjeta"
};
const LOG_PAYMENT_ACTIONS = {
  UPDATE: "UPDATE",
  CREATE: "CREATE",
  DELETE: "DELETE",
  VERIFICATION: "VERIFICATION",
};
const FIRST_USER_PASSWORD = "123";
const FIRST_USER_EMAIL = "email@email.com";
const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const CRITERIA_COURSES = {
  STUDENT: "student",
  PERCENTAGE: "percentage"
}

// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
const ALLOWED_SEQUELIZE_OPERATIONS = [
  "eq",
  "nq",
  "is",
  "not",
  "gt",
  "gte",
  "lt",
  "lte",
  "between",
  "notBetween",
  "in",
  "notIn",
  "like",
  "notLike",
  "startsWith",
  "endsWith",
  "substring",
];

const SPECIFICATION_VALUE_SEPARATOR = ":";
const SPECIFICATION_QUERY_SEPARATOR = ";";

export {
  PERMISSIONS,
  FIRST_USER_PASSWORD,
  FIRST_USER_EMAIL,
  ALLOWED_SEQUELIZE_OPERATIONS,
  SPECIFICATION_VALUE_SEPARATOR,
  SPECIFICATION_QUERY_SEPARATOR,
  PAYMENT_TYPES,
  DAYS,
  CRITERIA_COURSES,
  LOG_PAYMENT_ACTIONS,
};