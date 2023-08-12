<script setup lang="ts">
	import { ref, onBeforeMount } from "vue"
	import { useStore } from "vuex"
	import type { ICategory } from "@/store/post/post.state"
	const store = useStore()
	const categories = ref<ICategory[]>()

	onBeforeMount(async () => {
		await store.dispatch(
			"post/findCategories",
			{ category: "" },
			{ root: true }
		)
		categories.value = store.state.post.categories
	})
</script>
<template>
	<aside class="sidebar">
		<p>
			<span v-for="item in categories" :key="item.id" :value="item.category">
				{{ item.category }}
			</span>
		</p>
	</aside>
</template>
<style lang="scss"></style>
