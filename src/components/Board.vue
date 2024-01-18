<script setup>
import Card from './Card.vue'

import { ref, reactive } from 'vue'

import { useEventBus } from '../hooks/useEventBus';

const board = reactive({
	planned: {
		title: 'Planned',
		items: []
	},
	inProgress: {
		title: 'In Progress',
		items: [{
			title: 'In Progress',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			createdAt: '',
			deadline: ''
		}]
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

const { on } = useEventBus()

on('create-card', (card) => {
	board.planned.items.push(card)
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

</script>

<template>
	<div class="grid grid-cols-4 gap-4">

		<section class="space-y-2" v-for="column in columns">
			<h2 class="transition duration text-xl text-center font-bold">
				{{ column.title }}
			</h2>

			<div class="flex flex-col gap-4">
				<Card v-for="(card, index) in column.items" @delete-card="column.onDelete"
					@update-card="column.onUpdate" :key="index" :card="card" />
			</div>
		</section>

	</div>
</template>
