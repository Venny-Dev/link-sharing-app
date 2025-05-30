const express = require("express");
const morgan = require("morgan");

const app = express();

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.use(express.json({ limit: "10kb" }));

app.all("*", (req, res, next) => {
  //   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));

  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});
