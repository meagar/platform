import * as dotenv from "dotenv";
import * as express from "express";
import auth from "./lib/auth";
import authRoutes from "./routes/auth";
import TemplateEngine from "./lib/TemplateEngine";

dotenv.config();

const app: express.Application = express();
const port: any = process.env.PORT || 3001;

const passport = auth.init();

app.use(passport.initialize());

app.use("/auth", authRoutes);


const template = new TemplateEngine();

app.use("/login", (req, res) => {
  res.send(template.render('login', { locals: { name: 'bob' }}))
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
