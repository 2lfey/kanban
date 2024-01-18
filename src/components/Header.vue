<script setup>

import { ref } from 'vue'

const theme = ref(localStorage.getItem('theme'))

const toggleTheme = () => {
	theme.value = theme.value === 'dark' ? 'light' : 'dark'
	document.documentElement.classList.toggle('dark')
	localStorage.setItem('theme', theme.value)
}

</script>

<template>
	<header class="py-4 w-full">

		<div class="flex gap-4 items-center justify-end">

			<button class="px-3 py-1.5 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded text-white">
				New card
			</button>
			

			<button @click="toggleTheme" :class="{ 'bg-primary-500': theme === 'dark' }"
				class="h-6 transition-colors border-2 border-primary-500 rounded-full w-11">
				<span :class="{ 'left-5': theme === 'dark' }"
					class="block relative z-10 bg-white w-5 h-5 rounded-full transition-[left] duration-200 left-0"></span>
			</button>

		</div>

	</header>
</template>