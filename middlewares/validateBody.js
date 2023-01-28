const RequestError = require("../helpers/RequestError");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const [details] = error.details;
      next(
        RequestError(400, {
          message: `missing required ${details?.context.label} field`,
        })
      );
    }
    next();
  };
  return func;
};

module.exports = validateBody;
