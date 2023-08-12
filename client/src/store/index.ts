import { createStore } from "vuex"
import authModule from "./auth"
import postModule from "./post"

export default createStore({
	modules: {
		auth: authModule,
		post: postModule,
	},
})
