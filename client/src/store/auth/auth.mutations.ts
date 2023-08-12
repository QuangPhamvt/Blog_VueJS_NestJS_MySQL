import { type IAuthDto } from "./auth.state"
const authMutations = {
	profile(state: IAuthDto, payload: IAuthDto) {
		const { id, username, role } = payload
		state.id = id
		state.username = username
		state.role = role
	},
	logout(state: IAuthDto) {
		state.id = null
		state.username = ""
		state.role = undefined
	},
	register(state: IAuthDto, payload: IAuthDto) {
		state = payload
	},
}
export default authMutations
