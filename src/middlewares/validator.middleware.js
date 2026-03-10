import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    {
      return next();
    }
  }

  const extractedErrors = {};
  errors.array().forEach((err) => {
    extractedErrors[err.path] = err.msg;
  });
  throw new ApiError(422, "Validation failed", extractedErrors);
};
