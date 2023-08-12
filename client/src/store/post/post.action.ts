import axiosPost, {
	type ICreatePost,
	type IPostList,
} from "@/services/axiosPost"

const postActions = {
	postList: async (context: any, dto: IPostList) => {
		const payload = await axiosPost.axiosPostPostList(dto)
		context.commit("postList", payload.data[0])
	},
	createPost: async (context: any, dto: ICreatePost) => {
		try {
			const payload = await axiosPost.axiosPostCreatePost(dto)
			return payload
		} catch (error: any) {
			return error.response.data
		}
	},
	postById: async (context: any, dto: { id: number }) => {
		const payload = await axiosPost.axiosPostById(dto)
		context.commit("postById", payload.data)
	},
	findCategories: async (context: any, dto: { category: number }) => {
		const { data } = await axiosPost.axiosPostCategories(dto)
		context.commit("categories", data)
	},
}

export default postActions
