import type { IPostState } from "./post.state"

const postGetters = {
	getPostList: (state: IPostState) => state.postList,
}
export default postGetters
