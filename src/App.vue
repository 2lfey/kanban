<script setup>
import Board from './components/Board.vue';
import Header from './components/Header.vue';
import CreationForm from './components/CreationForm.vue';
import StarredList from './components/StarredList.vue';
import CauseForm from './components/CauseForm.vue';

import { ref, onBeforeMount } from 'vue'

import { useEventBus } from './hooks/useEventBus';

import { board, starred } from './board'


const isCreating = ref(false)
const showStarred = ref(false)
const card = ref(null)
const isCausing = ref(false)

onBeforeMount(() => {
	const plannedItems = JSON.parse(localStorage.getItem('plannedItems'))
	if (plannedItems) {
		board.planned.items = plannedItems
	}

	const inProgressItems = JSON.parse(localStorage.getItem('inProgressItems'))
	if (inProgressItems) {
		board.inProgress.items = inProgressItems
	}

	const testingItems = JSON.parse(localStorage.getItem('testingItems'))
	if (testingItems) {
		board.testing.items = testingItems
	}

	const completedItems = JSON.parse(localStorage.getItem('completedItems'))
	if (completedItems) {
		board.completed.items = completedItems
	}
})

// Listeners

const { on } = useEventBus()


on('show-card-creation', () => {
	isCreating.value = true
})

on('show-starred', () => {
	if (showStarred.value) {
		showStarred.value = false
	} else {
		showStarred.value = true
	}
})

on('show-cause-form', val => {
	card.value = val
	isCausing.value = true
})

on('set-cause', (card, cause) => {
	board.testing.onDelete(card)
	card.cause = cause
	board.inProgress.items.push(card)
})

// Handlers

const closePopup = (e) => {
	if (e.target == e.currentTarget) {
		isCreating.value = false
		isCausing.value = false
	}
}
</script>

<template>
	<Header />

	<div v-show="showStarred"
		class="absolute z-10 bg-gray-200 dark:bg-gray-900 top-0 left-0 max-w-xs w-full h-screen border-r border-gray-500 p-4 duration transition">
		<div class="overflow-y">
			<StarredList :list="starred" />
		</div>
	</div>

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
				<CauseForm @on-submit="isCausing = false" :card="card" />
			</div>
		</div>
	</main>

	<footer class="py-4 w-full">
		<p class="text-center text-xs font-bold text-gray-500">&copy; Created by ilfey 2024</p>
	</footer>
</template>
