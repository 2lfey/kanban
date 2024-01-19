<script setup>
import Card from './Card.vue'

import { ref, reactive, onMounted, watch, onBeforeMount } from 'vue'

import { useEventBus } from '../hooks/useEventBus';

const { on } = useEventBus()

const board = reactive({
	planned: {
		title: 'Planned',
		items: []
	},
	inProgress: {
		title: 'In Progress',
		items: []
	},
	testing: {
		title: 'Testing',
		items: []
	},
	completed: {
		title: 'Completed',
		items: []
	}
})

const columns = Object.entries(board).map((entry) => {
	const col = entry[1]
	col.onUpdate = (val, newVal) => {
		const index = col.items.indexOf(val)
		col.items[index] = newVal
	}
	col.onDelete = (val) => {
		const index = col.items.indexOf(val)
		col.items.splice(index, 1)
	}

	return col
})

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

watch(board, val => {
	localStorage.setItem('plannedItems', JSON.stringify(val.planned.items))
	localStorage.setItem('inProgressItems', JSON.stringify(val.inProgress.items))
	localStorage.setItem('testingItems', JSON.stringify(val.testing.items))
	localStorage.setItem('completedItems', JSON.stringify(val.completed.items))
}, { deep: true })

on('create-card', (card) => {
	board.planned.items.push(card)
})

</script>

<template>
	<div class="grid grid-cols-4 gap-4">

		<section class="space-y-2" v-for="column in columns">
			<h2 class="transition duration text-xl text-center font-bold">
				{{ column.title }}
			</h2>

			<div class="flex flex-col gap-4">
				<Card v-for="(card, index) in column.items" @delete-card="column.onDelete" @update-card="column.onUpdate"
					:key="index" :card="card" />
			</div>
		</section>

	</div>
</template>
