import { resolvers } from "@/lib/resolvers";
import { typeDefs } from "@/lib/typeDefs";
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

const apolloServer = new ApolloServer({ typeDefs, resolvers })
const handler = startServerAndCreateNextHandler(apolloServer)


export const GET = (request: NextRequest) => {
	return handler(request)
}


export const POST = (request: NextRequest) => {
	return handler(request)
}