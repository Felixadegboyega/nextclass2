import "server-only"
import gql from "graphql-tag";

export const typeDefs = gql`
	type Query {
		user: User
		posts: [Post!]
		post(id:ID!): Post
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

	enum Status {
		PENDING
		SUCCESS
		FAILED
		REVERSED
	}

	type Mutation {
		addPost(title:String!, description:String!): Post
		deletePost(id:ID!): Post
	}
`;