import * as dotenv from "dotenv";
import * as express from "express";
import auth from "./lib/auth";
import authRoutes from "./routes/auth";

dotenv.config();

const app: express.Application = express();
const port: any = process.env.PORT || 3001;

const passport = auth.init();

app.use(passport.initialize());

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
