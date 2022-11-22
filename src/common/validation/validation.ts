/** @format */
export const validate = (data, schema) => {
  const validationResult = schema.validate(data, {
    abortEarly: false,
  });
  if (validationResult.error) {
    throw validationResult.error;
  }
};

