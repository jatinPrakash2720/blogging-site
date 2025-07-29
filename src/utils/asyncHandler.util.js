const asyncHandler = (requestHandled) => {
  return (res, req, next) => {
    Promise.resolve(requestHandled(res, req, next)).catch((err) => next(err));
  };
};
export { asyncHandler };
