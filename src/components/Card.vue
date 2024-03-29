<script setup>
import Input from './Input.vue';

import { computed, ref } from 'vue'

const props = defineProps({
	card: Object,
	canMoveLeft: Boolean,
	canMoveRight: Boolean,
})

const emit = defineEmits(['updateCard', 'deleteCard', 'moveLeft', 'moveRight', 'starCard'])

const cardCopy = ref(JSON.parse(JSON.stringify(props.card)))

const isEditing = ref(false)

const cancelEditing = () => {
	isEditing.value = false
	cardCopy.value = JSON.parse(JSON.stringify(props.card))
}

const saveCardCopy = () => {
	isEditing.value = false

	const now = new Date(Date.now())
	cardCopy.value.updatedAt = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

	emit('updateCard', props.card, cardCopy.value)
}

const time = computed(() => {
	if (props.card.updatedAt) {
		return `${props.card.updatedAt} / ${props.card.createdAt}`
	} else {
		return props.card.createdAt
	}
})
</script>

<template>
	<div  v-show="!isEditing" :class="card.isExpaired ? 'bg-red-600 dark:bg-red-600' : 'bg-gray-100 dark:bg-gray-800'"
		class="group/card relative flex flex-col items-end p-4 rounded-lg transition duration cursor-pointer">
		<div class="absolute hidden group-hover/card:flex top-2 right-2 rounded bg-gray-200 dark:bg-gray-700">

			<!-- move left -->

			<div v-show="canMoveLeft" @click="emit('moveLeft', card)"
				class="p-1.5 rounded hover:bg-gray-100 hover:dark:bg-gray-800">
				<svg class="w-4 h-4 text-primary-600 hover:text-primary-700" fill="currentColor" viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path clip-rule="evenodd" fill-rule="evenodd"
						d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z">
					</path>
				</svg>
			</div>

			<!-- star -->

			<div @click="emit('starCard', card)" class="p-1.5 rounded hover:bg-gray-100 hover:dark:bg-gray-800">
				<svg v-show="!card.isStarred" class="w-4 h-4 text-primary-600 hover:text-primary-700" fill="none"
					stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z">
					</path>
				</svg>

				<svg v-show="card.isStarred" class="w-4 h-4 text-primary-600 hover:text-primary-700" fill="currentColor"
					viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path clip-rule="evenodd" fill-rule="evenodd"
						d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z">
					</path>
				</svg>
			</div>

			<!-- delete -->

			<div @click="emit('deleteCard', card)" class="p-1.5 rounded hover:bg-gray-100 hover:dark:bg-gray-800">
				<svg class="w-4 h-4 text-primary-600 hover:text-primary-700" fill="currentColor" viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path clip-rule="evenodd" fill-rule="evenodd"
						d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z">
					</path>
				</svg>
			</div>

			<!-- edit -->

			<div @click="isEditing = true" class="p-1.5 rounded hover:bg-gray-100 hover:dark:bg-gray-800">
				<svg class="w-4 h-4 text-primary-600 hover:text-primary-700" fill="currentColor" viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path
						d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z">
					</path>
					<path
						d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z">
					</path>
				</svg>
			</div>

			<!-- move rigfht -->

			<div v-show="canMoveRight" @click="emit('moveRight', card)"
				class="p-1.5 rounded hover:bg-gray-100 hover:dark:bg-gray-800">
				<svg class="w-4 h-4 text-primary-600 hover:text-primary-700" fill="currentColor" viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path clip-rule="evenodd" fill-rule="evenodd"
						d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z">
					</path>
				</svg>
			</div>

		</div>
		<h2 class="w-full text-xl font-bold inline-flex items-center gap-1.5">
			{{ card.title }}
			<span v-show="!!card.deadline" class="text-sm px-1.5 py-0.5 bg-primary-700 rounded text-white">
				{{ card.deadline }}
			</span>
		</h2>

		<p v-show="!!card.cause" class="w-full mt-4 text-sm">{{ card.cause }}</p>

		<p class="mt-4 w-full">{{ card.description }}</p>

		<span class="mt-4 font-semibold text-xs text-gray-500">{{ time }}</span>
	</div>

	<div v-show="isEditing"
		class="flex flex-col items-center p-4 rounded-lg bg-gray-100 gap-4 dark:bg-gray-800 transition duration cursor-pointer">
		<div class="w-full space-y-2">
			<Input placeholder="Card title" title="Title" v-model="cardCopy.title" />
			<Input placeholder="Card description" title="Description" v-model="cardCopy.description" />

			<div class="space-y-2">
				<label className='block ml-3 text-sm font-bold text-gray-900 dark:text-white'>
					Deadline
				</label>
				<input type="date" v-model="cardCopy.deadline" required
					class='transition-colors duration-200 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none' />
			</div>
		</div>

		<div class="space-x-2">
			<button @click="cancelEditing"
				class="px-3 py-1 font-semibold text-sm text-primary-500 border-primary-500 border-2 hover:border-primary-700 hover:text-white hover:bg-primary-700 rounded">
				Cancel
			</button>
			<button @click="saveCardCopy"
				class="px-3 py-1.5 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded text-white">
				Save
			</button>
		</div>
	</div>
</template>