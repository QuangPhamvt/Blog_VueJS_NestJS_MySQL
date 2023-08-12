<script setup lang="ts">
	import { onMounted, reactive, ref } from "vue"
	import { useStore } from "vuex"

	const isWrong = ref(false)
	const store = useStore()
	const form = reactive<{
		name: "Register" | "Login"
		username: string
		password: string
		againPassword: string
	}>({ name: "Login", username: "", password: "", againPassword: "" })

	onMounted(() => {
		const data = document.addEventListener("click", (event: any) => {
			const model: any = <any>document.getElementById("Dialog")
			if (event.target.id === "showDialog") model.showModal()
			if (event.target.id === "Dialog") model.close()
		})
		document.removeEventListener("click", () => data)
	})
	const handle = async (event: any) => {
		event.preventDefault()
		const { againPassword, name, ...payload } = form
		try {
			if (name === "Login") {
				await store.dispatch("auth/authLogin", payload, { root: true })
			} else if (name === "Register" && form.password === againPassword) {
				await store.dispatch("auth/authRegister", payload, { root: true })
			} else isWrong.value = true
		} catch (error) {
			console.log(error)
			isWrong.value = true
		}
	}
</script>
<template>
	<button id="showDialog" class="login__btn">Login</button>
	<dialog ref="target" id="Dialog" class="form">
		<form class="login__form" @submit="handle">
			<img src="../../assets/login.png" alt="loading" height="80" width="80" />
			<label class="login__form--label"> {{ form.name }}</label>
			<input
				v-model="form.username"
				class="login__form--input"
				type="text"
				placeholder="Tên Đăng Nhập" />
			<input
				v-model="form.password"
				class="login__form--input"
				type="password"
				placeholder="password" />
			<input
				v-model="form.againPassword"
				v-show="form.name === 'Register'"
				class="login__form--input"
				type="password"
				placeholder="nhập lại passpass" />
			<button class="login__form--btn" type="submit">
				{{ form.name }}
			</button>
			<span v-show="isWrong" class="login__form--wrong"
				>sai một số thông tin</span
			>
			<div class="login__form--note">
				<h5 v-if="form.name === 'Login'">
					Nếu chưa có tài khoản vui lòng
					<span @click="form.name = 'Register'">Đăng Ký</span>
				</h5>
				<h5 v-else>
					Quay trở lại <span @click="form.name = 'Login'">Đăng Nhập</span>
				</h5>
			</div>
		</form>
	</dialog>
</template>
