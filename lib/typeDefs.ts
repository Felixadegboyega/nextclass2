import "server-only"
import gql from "graphql-tag";

export const typeDefs = gql`
	type Query {
		user: User
		posts: [Post!]
		post(id:ID!): Post
		product(_id:ID!): Product
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

	type Product {
		title: String!
		description: String!
		price: Float!
		_id: String
	}

	type Mutation {
		addPost(title:String!, description:String!): Post
		deletePost(id:ID!): Post
		addProduct(title:String!, description:String!, price:Float!): Product
		editProduct(title:String!, description:String!, price:Float!, _id:String!): Product
	}
`;