import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import gql from "graphql-tag";
import { NextRequest } from "next/server";


const posts = [
	{
		title: "Post 1", description: "post 1 Desc", comments: [
			{ comment: "Nice" }
		]
	},
	{ title: "Post 2", description: "post 2 Desc" },
	{ title: "Post 3", description: "post 3 Desc" },
	{ title: "Post 4", description: "post 4 Desc" },
]

const typeDefs = gql`
	type Query {
		user: User
		posts: [Post!]

	}

	type User {
		name: String!
		email: String!
	}

	type Post {
		title: String
		description: String
		comments: [Comment]
	}

	type Comment {
		comment: String
	}
`;

const resolvers = {
	Query: {
		user: () => {
			return {
				name: "Felix",
				email: "felixadegboyega2019@gmail.com"
			}
		},

		posts: () => {
			return posts
		}


	}
};

const apolloServer = new ApolloServer({ typeDefs, resolvers })
const handler = startServerAndCreateNextHandler(apolloServer)


export const GET = (request: NextRequest) => {
	return handler(request)
}


export const POST = (request: NextRequest) => {
	return handler(request)
}