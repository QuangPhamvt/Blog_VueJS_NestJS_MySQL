export interface IPostItem {
	id: number
	title: string
	categories: { id: number; category: string }[]
	createAt: Date
	user: {
		username: string
	} | null
}
export interface IPost {
	id?: number
	title?: string
	categories?: string[]
	content?: string
	user?: string
	createAt?: Date
}
export interface ICategory {
	id: number
	category: string
}
export interface IPostState {
	post?: IPost
	postList: IPostItem[]
	categories: ICategory[]
}
const postState = (): IPostState => ({
	post: undefined,
	postList: [],
	categories: [],
})
export default postState
