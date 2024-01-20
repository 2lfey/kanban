<script setup>
import Board from './components/Board.vue';
import Header from './components/Header.vue';
import CreationForm from './components/CreationForm.vue';

import { ref } from 'vue'

import { useEventBus } from './hooks/useEventBus';
import CauseForm from './components/CauseForm.vue';

const isCreating = ref(false)

const card = ref(null)
const isCausing = ref(false)

const { on } = useEventBus()

on('show-card-creation', () => {
	isCreating.value = true
})

on('show-cause-form', val => {
	card.value = val
	isCausing.value = true
})

const closePopup = (e) => {
	if (e.target == e.currentTarget) {
		isCreating.value = false
		isCausing.value = false
	}
}

</script>

<template>
	<Header />

	<main class="flex-1 py-4 w-full">

		<Board />

		<div v-show="isCreating" @click="closePopup"
			class="flex items-center justify-center absolute top-0 left-0 w-screen min-h-screen bg-gray-300/50 dark:bg-gray-900/50">
			<div class="max-w-xs w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
				<CreationForm />
			</div>
		</div>


		<div v-show="isCausing" @click="closePopup"
			class="flex items-center justify-center absolute top-0 left-0 w-screen min-h-screen bg-gray-300/50 dark:bg-gray-900/50">
			<div class="max-w-xs w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
				<CauseForm @on-submit="isCausing = false" :card="card"/>
			</div>
		</div>
	</main>

	<footer class="py-4 w-full">
		<p class="text-center text-xs font-bold text-gray-500">&copy; Created by ilfey 2024</p>
	</footer>
</template>
