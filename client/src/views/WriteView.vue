<script setup lang="ts">
	import { Marked } from "marked"
	import { onBeforeMount, reactive, ref } from "vue"
	import { useStore } from "vuex"
	import type { ICategory } from "@/store/post/post.state"
	const textarea = ref<HTMLTextAreaElement>(document.createElement("textarea"))
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
	const acceptBlog = ref<boolean>()
	const categories = ref<ICategory[]>()
	const resize = () => {
		textarea.value.style.height = "20px"
		textarea.value.style.height = textarea.value.scrollHeight + "px"
	}
	const reset = () => {
		post.title = ""
		post.markdown = ""
		post.categories = []
		textarea.value.style.height = "20px"
		acceptBlog.value = undefined
	}
	const handleSubmit = async (event: any) => {
		event.preventDefault()
		const { message } = await store.dispatch(
			"post/createPost",
			{
				title: post.title,
				post: post.markdown,
				categories: post.categories,
			},
			{
				root: true,
			}
		)
		reset()
		if (message === "Successfully") acceptBlog.value = true
		else acceptBlog.value = false
	}
	const handleCategories = (event: any) => {
		if (!post.categories.includes(event.target.textContent))
			post.categories = [...post.categories, event.target.textContent]
		else
			post.categories = post.categories.filter(
				(state) => state !== event.target.textContent
			)
	}
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
	<main class="write__main grid-cols-2">
		<article class="write__text">
			<form @submit="handleSubmit">
				<input
					type="text"
					placeholder="Tiêu đề của bài viết"
					v-model="post.title" />
				<textarea
					placeholder="write some thing in here"
					class="write__text--input"
					contenteditable="true"
					ref="textarea"
					v-model="post.markdown"
					@input="resize"></textarea>
				<p>
					<span
						v-for="item in categories"
						:key="item.id"
						:value="item.category"
						@click="handleCategories"
						v-theme="{
							isFocus: post.categories.includes(item.category),
							colorFocus: '#DFD7BF',
							colorNotFocus: '#F2EAD3',
						}">
						{{ item.category }}
					</span>
				</p>
				<div>
					<button @click="reset" type="reset">Reset</button>
					<button type="submit">Gửi</button>
				</div>
				<p v-if="acceptBlog === false">Có lỗi xảy ra rồi nè</p>
				<p v-else-if="acceptBlog === true">Tạo thành công rồi đó!</p>
			</form>
		</article>
		<article class="write__show" v-html="marked.parse(post.markdown)"></article>
	</main>
</template>
<style lang="scss"></style>
