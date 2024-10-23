import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "./middlewares/errors";
import rootRouter from "./routes";
import { PORT } from "./secrets";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
