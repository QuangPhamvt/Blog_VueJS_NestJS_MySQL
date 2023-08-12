import axiosAuth from "@/services/axiosAuth"
import { type IAuth } from "@/services/axiosAuth"

const authActions = {
	authLogin: async (context: any, dto: IAuth) => {
		const payload = await axiosAuth.axiosPostLogin(dto)
		console.log(payload)
		if (payload?.data) {
			localStorage.setItem("token", JSON.stringify(payload.data[0]))
			await context.dispatch("authProfile")
		}
	},
	authProfile: async (context: any) => {
		const token = localStorage.getItem("token")
		if (token) {
			const payload = await axiosAuth.axiosGetProfile()
			context.commit("profile", payload.data[0])
		}
	},
	authLogout: (context: any) => {
		context.commit("logout")
	},
	authRegister: async (context: any, dto: IAuth) => {
		const payload = await axiosAuth.axiosPostRegister(dto)
		console.log(payload)
		if (payload?.message) await context.dispatch("authLogin", dto)
	},
}
export default authActions
