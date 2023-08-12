<script setup lang="ts">
	import { Marked } from "marked"
	import { onMounted, reactive } from "vue"
	import { useRoute } from "vue-router"
	import { useStore } from "vuex"
	const router = useRoute()
	const marked = new Marked({ headerIds: false })
	const store = useStore()
	const post = reactive<{
		title: string
		markdown: string
		categories: string[]
	}>({
		title: "",
		markdown: "",
		categories: [],
	})
	console.log(router.params.id)
	onMounted(async () => {
		await store.dispatch("post/postById", { id: router.params.id })
		const data = store.state.post.post
		post.title = data.title
		post.markdown = data.content
		post.categories = data.categories
	})
</script>
<template>
	<div class="container readPost">
		<h1>{{ post.title }}</h1>
		<article v-html="marked.parse(post.markdown)"></article>
	</div>
</template>
