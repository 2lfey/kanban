<script setup>
defineProps({
	title: String,
	placeholder: String
})

const model = defineModel()

</script>
<template>
	<div class="space-y-2">
		<label className='block ml-3 text-sm font-bold text-gray-900 dark:text-white'>
			{{ title }}
		</label>
		<input type="text" :placeholder="placeholder" v-model="model" required
			class='transition-colors duration-200 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none' />
	</div>
</template>