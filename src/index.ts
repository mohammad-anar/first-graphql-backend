import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import createGqlServer from "./graphql/index.js";

const init = async () => {
  const port = Number(process.env.PORT) || 5000;
  const app = express();

  app.use(express.json());

 

  app.get("/", (req, res) =>
    res.json({ message: `Apollo graphql server is running` }),
  );

  app.use("/graphql", expressMiddleware(await createGqlServer()));

  app.listen(port, () => {
    console.log(`Apollo server is running on port ${port}`);
  });
};

init();
