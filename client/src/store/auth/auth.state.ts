export enum Role {
	User = "user",
	Admin = "admin",
}
export interface IAuthDto {
	id: number | null
	username: string
	role?: Role
}
const authState = (): IAuthDto => ({
	id: null,
	username: "",
	role: undefined,
})

export default authState
