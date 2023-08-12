<script setup lang="ts">
	import PostListComponent from "@/components/PostListComponetn.vue"
	import SidebarComponent from "@/components/SidebarComponent.vue"
</script>

<template>
	<main class="container main">
		<div class="main__header">
			<div class="grid-cols-2">
				<div class="main__header--content">
					<h2>What is Love!</h2>
					<span
						>Nếu là tình yêu, xin đừng ràng buộc. Dù là tình yêu, cũng đừng kỳ
						vọng. Hãy để tình yêu đó tự do. Chúng ta sẽ không muốn buộc mình vào
						một chiếc áo duy nhất, dù đó là một chiếc áo đẹp.</span
					>
				</div>
				<img
					class="main__header--img"
					src="../assets/nao.jpeg"
					height="460"
					width="320" />
			</div>
		</div>
		<div class="main__content grid-cols-3">
			<div class="main__content--post grid-cols-2 col-span-2">
				<PostListComponent />
			</div>
			<SidebarComponent />
		</div>
	</main>
</template>
