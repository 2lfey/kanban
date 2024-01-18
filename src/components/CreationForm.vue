<script setup>
import { ref, reactive } from 'vue';
import { useEventBus } from '../hooks/useEventBus';
import Input from './Input.vue';

const { emit } = useEventBus()

const card = reactive({})

const onSubmit = () => {
	const now = new Date(Date.now())
	card.createdAt = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

	emit('create-card', { ...card })

	card.title = null
	card.createdAt = null
	card.deadline = null
	card.description = null
}
</script>

<template>
	<form @submit.prevent="onSubmit" class="space-y-6">

		<Input placeholder="Card title" title="Title" v-model="card.title" />
		<Input placeholder="Card description" title="Description" v-model="card.description" />

		<div class="space-y-2">
			<label className='block ml-3 text-sm font-bold text-gray-900 dark:text-white'>
				Deadline
			</label>
			<input type="date" v-model="card.deadline" required
				class='transition-colors duration-200 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none' />
		</div>

		<button type="submit"
			class="w-full px-3 py-1.5 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded text-white">
			Create
		</button>
	</form>
</template>