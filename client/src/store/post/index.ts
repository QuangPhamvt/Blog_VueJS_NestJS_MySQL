import postState from "./post.state"
import postGetters from "./post.getters"
import postActions from "./post.action"
import postMutations from "./post.mutations"

const postModule = {
	namespaced: true,
	state: postState,
	getters: postGetters,
	actions: postActions,
	mutations: postMutations,
}
export default postModule
