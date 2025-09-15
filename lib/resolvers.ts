import "server-only"

const posts = [
	{
		id: 1, status: "ACTIVE",
		title: "Post 1", description: "post 1 Desc", comments: [
			{ comment: "Nice" }
		]
	},
	{ id: 2, title: "Post 2", description: "post 2 Desc" },
	{ id: 3, title: "Post 3", description: "post 3 Desc" },
	{ id: 4, title: "Post 4", description: "post 4 Desc" },
]


interface NewPost {
	title: string, description: string
}


export const resolvers = {
	Query: {
		user: () => {
			return {
				name: "Felix",
				email: "felixadegboyega2019@gmail.com"
			}
		},

		posts: () => {
			return posts
		},

		post: (_parent: null, { id }: { id: number }) => {
			return posts.find(post => post.id == id);
		}
	},

	Mutation: {
		addPost: (_parent: null, post: NewPost) => {
			posts.push({
				...post,
				id: posts.length + 1
			});
			return post
		},


		deletePost: (_parent: null, { id }: { id: number }) => {
			const postIndex = posts.findIndex(each => each.id == id);
			const post = posts[postIndex];
			posts.splice(postIndex, 1);
			return post;
		}
	}
};