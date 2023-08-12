import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import WriteView from "@/views/WriteView.vue"
import ReadPostView from "@/views/ReadPostView.vue"
import { useStore } from "vuex"
import { Role } from "@/store/auth/auth.state"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Landing",
			component: HomeView,
		},
		{
			path: "/home",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue"),
		},
		{
			path: "/post",
			name: "post",
			children: [
				{
					path: "new",
					component: WriteView,
					meta: { requiresAuth: true },
					beforeEnter(to, from, next) {
						const store = useStore()
						console.log(store.state.auth.role)
						if (to.meta.requiresAuth && store.state.auth.role === Role.Admin)
							return next()
						else return next({ name: "Landing" })
					},
				},
				{
					path: "/post/:id",
					name: "read",
					component: ReadPostView,
				},
			],
		},
	],
})

export default router
