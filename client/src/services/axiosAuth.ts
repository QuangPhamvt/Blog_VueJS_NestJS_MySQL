import axiosClient from "./axiosClient"

export enum Role {
	User = "User",
	Admin = "Admin",
}

export interface IAuth {
	username: string
	password: string
	role?: Role
}
const axiosAuth = {
	axiosPostLogin: (dto: IAuth) => axiosClient.post("auth/login", dto),
	axiosGetProfile: () => axiosClient.get("auth/profile"),
	axiosPostRegister: (dto: IAuth) =>
		axiosClient.post("auth/register", { ...dto, role: Role.User }),
}
export default axiosAuth
