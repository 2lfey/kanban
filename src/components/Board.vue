<script setup>
import Card from './Card.vue'

import { ref, reactive, watch, onBeforeMount } from 'vue'

import { useEventBus } from '../hooks/useEventBus';

const { emit, on } = useEventBus()

const board = reactive({
	planned: {
		title: 'Planned',
		items: []
	},
	inProgress: {
		title: 'In progress',
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

on('set-cause', (card, cause) => {
	board.testing.onDelete(card)
	card.cause = cause
	board.inProgress.items.push(card)
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

	col.onMoveLeft = val => {
		if (col.title === 'Planned') {
			return
		}

		if (col.title === 'In progress') {
			col.onDelete(val)
			board.planned.items.push(val)
		} else if (col.title === 'Testing') {

			emit('show-cause-form', val)
			
		} else { // if (col.title === 'Completed') {
			col.onDelete(val)

			delete val.isExpaired

			board.testing.items.push(val)
		}
	}

	col.onMoveRight = (val) => {
		if (col.title === 'Completed') {
			return
		}

		col.onDelete(val)

		if (col.title === 'Planned') {
			board.inProgress.items.push(val)
		} else if (col.title === 'In progress') {
			board.testing.items.push(val)
		} else { // if (col.title === 'Testing') {
			const [year, month, day] = val.deadline.split('-')
			const now = new Date(Date.now())

			console.log(year, month, day);
			console.log(now);

			if (Number(year) <= now.getFullYear() || (Number(month) <= now.getMonth() && Number(day) < now.getDay())) {
				val.isExpaired = true
			}

			board.completed.items.push(val)
		}
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
					@move-left="column.onMoveLeft" @move-right="column.onMoveRight" :can-move-left="column.title !== 'Planned'" :can-move-right="column.title !== 'Completed'"
					:key="index" :card="card" />
			</div>
		</section>

	</div>
</template>
