<script setup lang="ts">
	import HeaderComponent from "./components/HeaderComponent.vue"
	import { RouterView } from "vue-router"
</script>
<template>
	<HeaderComponent />
	<RouterView />
</template>
<style src="./scss/styles.scss" lang="scss"></style>
