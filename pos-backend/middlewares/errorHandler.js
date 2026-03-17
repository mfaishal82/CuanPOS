
async function errorHandler(error, req, res, next) {
  let status = error.status || 500
  let message = error.message || "Internal Server Error"

  // if (status === 500) {
  //   console.log("Error name:", error.name)
  //   console.log("Error object:", error)
  // }
  switch(error.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400
      message = error.errors[0].message
      break
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401
      message = "Invalid Token"
      break
    case "Unauthorized":
      status = 403
      message = "Forbidden"
      break
    case "NotFound":
      status = 404
      message = "Error not found"
      break
    case "InsufficientStock":
      status = 400
      message = "Product stock is not enough"
      break
    case "BadRequest":
      status = 400
      message = "Only PNG, JPG, JPEG, WEBP are allowed. Check your upload file"
  }

  res.status(status).json({ message })
}

module.exports = errorHandler
