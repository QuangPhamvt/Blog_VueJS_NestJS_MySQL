<script setup lang="ts">
	import { ref } from "vue"
	import { useStore } from "vuex"
	const store = useStore()

	const isShowProfile = ref(false)
	const register = () => {
		localStorage.removeItem("token")
		store.commit("auth/logout", { root: true })
	}
</script>
<template>
	<div class="profile">
		<button class="profile__btn" @click="isShowProfile = !isShowProfile">
			{{ store.state.auth.username }}
		</button>
		<ul class="profile__items" v-show="isShowProfile">
			<li class="profile__items--item" @click="register">Log Out</li>
		</ul>
	</div>
</template>
