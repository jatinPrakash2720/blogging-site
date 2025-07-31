const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    console.log("running3");
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};
export { asyncHandler };
