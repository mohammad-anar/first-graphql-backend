import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { prisma } from "./lib/db.js";

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

        type Mutation {
          createUser(firstName: String!, lastName: String!, email: String!, password: String!, profileImageURL: String): Boolean
        }
    `,
    resolvers: {
      Query: {
        hello: () => `Hey there, I'm graphql server!`,
        say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`,
      },

      Mutation: {
        createUser: async (
          _,
          { firstName, lastName, email, password, profileImageURL },
        ) => {
          try {
            await prisma.user.create({
              data: {
                firstName,
                lastName,
                email,
                password,
                profileImageURL,
              },
            });
            return true;
          } catch (error) {
            console.error("Error creating user:", error);
            return false;
          }
        },
      },
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
