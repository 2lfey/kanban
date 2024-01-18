<script setup>
import { computed } from 'vue';

const props = defineProps({
	card: Object
})

const deadline = computed(() => {
	return new Date(props.card.deadline).toLocaleDateString()
})

const createdAt = computed(() => {
	return new Date(props.card.createdAt).toLocaleDateString()
})

</script>

<template>
	<div class="flex flex-col items-end p-4 rounded-lg bg-gray-100 dark:bg-gray-800 transition duration cursor-pointer">
		<h2 class="w-full text-xl font-bold inline-flex items-center gap-1.5">
			Heading 2
			<span class="text-sm px-1.5 py-0.5 bg-primary-700 rounded text-white">
				{{ deadline }}
			</span>
		</h2>

		<p class="mt-4">{{ card.description }}</p>

		<span class="mt-4 font-semibold text-xs text-gray-500">{{ createdAt }}</span>
	</div>
</template>