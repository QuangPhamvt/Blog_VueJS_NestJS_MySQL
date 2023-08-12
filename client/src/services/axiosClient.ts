import axios, {
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios"
import dayjs from "dayjs"
import jwtDecode, { type JwtPayload } from "jwt-decode"

const baseURL = import.meta.env.VITE_API_URL

const axiosClient = axios.create({
	baseURL,
	timeout: 10000,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
})

axiosClient.interceptors.request.use(async function (
	config: InternalAxiosRequestConfig<any>
): Promise<any> {
	const token = localStorage.getItem("token")
		? JSON.parse(localStorage.getItem("token"))
		: null

	if (!token) {
		return config
	}

	const exp = jwtDecode<JwtPayload>(token.access_token).exp || 0
	const isExpired = dayjs.unix(exp).diff(dayjs()) < 1
	if (!isExpired) {
		config.headers["Authorization"] = `Bearer ${token.access_token}`
		return config
	}

	const { data } = await axios.get(`${baseURL}/auth/refresh`, {
		headers: {
			Authorization: `Bearer ${token.refresh_token}`,
		},
	})
	localStorage.setItem("token", JSON.stringify(data.data[0]))
	config.headers["Authorization"] = `Bearer ${data.data[0].access_token}`
	return config
})

axiosClient.interceptors.response.use(function (response: AxiosResponse) {
	if (response && response.data) return response.data
	console.log(response)
	return response
})

export default axiosClient
