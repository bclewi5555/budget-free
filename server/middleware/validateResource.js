module.exports.validateResource = (resourceSchema) => {
  return async (req, res, next) => {
    try {
      const resource = req.body;
      await resourceSchema.validate(resource);
      next();
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.errors.join(', ')});
    }
  };
}