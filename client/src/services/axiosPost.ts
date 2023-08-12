import axiosClient from "./axiosClient"

export interface IPostList {
	id?: number
	title?: string
	page?: number
	limit?: number
}
export interface ICreatePost {
	title: string
	post: string
	categories: string[]
}
const axiosPost = {
	axiosPostPostList: (dto: IPostList) => axiosClient.post("post", dto),
	axiosPostCreatePost: (dto: ICreatePost) =>
		axiosClient.post("post/create", dto),
	axiosPostById: (dto: { id: number }) => axiosClient.post("post/id", dto),
	axiosPostCategories: (dto: { category: number }) =>
		axiosClient.post("category", dto),
}
export default axiosPost
