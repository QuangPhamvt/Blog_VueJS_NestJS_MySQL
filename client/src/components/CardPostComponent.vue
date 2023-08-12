<script setup lang="ts">
	import type { IPostItem } from "@/store/post/post.state"
	import { RouterLink } from "vue-router"
	import dayjs from "dayjs"
	import { toRefs } from "vue"
	const props = defineProps<{ post: IPostItem }>()
	const { post } = toRefs(props)
	const date = dayjs(post.value.createAt).format("DD/MM/YYYY")
</script>
<template>
	<article class="card__container">
		<h2>
			<RouterLink :to="`/post/${post.id}`">
				{{ post.title }}
			</RouterLink>
		</h2>
		<p>
			<span v-for="category in post.categories" v-bind:key="category.id">
				{{ category.category }}
			</span>
		</p>
		<h5>{{ date }}</h5>
	</article>
</template>
