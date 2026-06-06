import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

const init = async () => {

    const port = Number(process.env.PORT) || 5000;
  const app = express();

  app.use(express.json());

  //   create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
    `,
    resolvers: {
        Query: {
            hello: () => `Hey there, I'm graphql server!`,
            say: (_, {name}: {name: string}) => `Hey ${name}, How are you?`
        }
    },
  });

  await gqlServer.start();


  app.get("/", (req, res) =>
    res.json({ message: `Apollo graphql server is running` }),
  );

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(port, () => {
    console.log(`Apollo server is running on port ${port}`);
  });

};

init();