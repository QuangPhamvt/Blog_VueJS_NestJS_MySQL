<script setup lang="ts">
	import { onBeforeMount, onBeforeUpdate } from "vue"
	import { RouterLink } from "vue-router"
	import { useStore } from "vuex"
	import LoginRegisterComponent from "./AuthComponent/LoginRegisterComponent.vue"
	import ProfileComponent from "./AuthComponent/ProfileComponent.vue"

	const store = useStore()
	onBeforeMount(() => {
		store.dispatch("auth/authProfile", {}, { root: true })
	})
</script>
<template>
	<nav class="container grid-cols-2">
		<div>
			<img src="../assets/logo.png" class="nav__logo" />
			<div class="nav__follow">
				<h3 class="nav__follow--title">Follow</h3>
				<font-awesome-icon
					class="nav__follow--icon"
					icon="fa-brands fa-twitter"
					size="xl" />
				<font-awesome-icon
					class="nav__follow--icon"
					icon="fa-brands fa-instagram"
					size="xl" />
				<font-awesome-icon
					class="nav__follow--icon"
					icon="fa-brands fa-facebook"
					size="xl" />
			</div>
		</div>
		<div class="nav__link">
			<RouterLink class="nav__link--items" to="/home"> Home</RouterLink>
			<RouterLink class="nav__link--items" to="/about"> About</RouterLink>
			<RouterLink class="nav__link--items" to="/contact"> Contact</RouterLink>
			<RouterLink class="nav__link--items" to="/post/new">
				Create Post</RouterLink
			>
			<LoginRegisterComponent v-if="store.state.auth.id === null" />
			<ProfileComponent v-else />
		</div>
	</nav>
</template>
<style></style>
