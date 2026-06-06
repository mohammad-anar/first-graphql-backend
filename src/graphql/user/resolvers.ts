import { prisma } from "../../lib/db.js"

const queries = {
    getUsers: async () => "Hello"
}
const mutations = {
    createUser: async (_:any, {firstName, lastName, email, password}: {firstName: string; lastName: string; email: string; password: string}) => {
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password
            }
        });

        return user.id
    }
}

export const resolvers = {queries, mutations}