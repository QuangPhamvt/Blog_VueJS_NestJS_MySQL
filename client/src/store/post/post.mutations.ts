import type { IPostState } from "./post.state"

const postMutations = {
	reset(state: IPostState) {
		state.post = undefined
		state.postList = []
	},
	postList(state: IPostState, payload: any) {
		if (payload) {
			state.postList = [...state.postList, payload]
		}
	},
	postById(state: IPostState, payload: any) {
		if (payload) {
			state.post = {
				id: payload.id,
				title: payload.title,
				categories: payload.categories,
				content: payload.post,
				createAt: payload.createAt,
			}
		}
	},
	categories(state: IPostState, payload: any) {
		if (payload) state.categories = payload
	},
}
export default postMutations
