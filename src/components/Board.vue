<script setup>
import Card from './Card.vue'

import { ref, reactive } from 'vue'

const planned = reactive([{
	title: 'Planned',
	description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
	createdAt: Date.now(),
	deadline: Date.now() + 360000
}])

const inProgress = reactive([{
	title: 'In Progress',
	description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
	createdAt: Date.now(),
	deadline: Date.now() + 360000
}])

const testing = reactive([{
	title: 'Testing',
	description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
	createdAt: Date.now(),
	deadline: Date.now() + 360000
}])

const completed = reactive([{
	title: 'Completed',
	description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
	createdAt: Date.now(),
	deadline: Date.now() + 360000
}])

const columns = {
	'Planned': planned,
	'In Progress': inProgress,
	'Testing': testing,
	'Completed': completed,
}

</script>

<template>
	<div class="grid grid-cols-4 gap-4">

		<section class="space-y-2" v-for="(cards, title) in columns">
			<h2 class="transition duration text-xl text-center font-bold">
				{{title}}
			</h2>

			<div class="flex flex-col gap-4">
				<Card v-for="(card, index) in cards" :key="index" :card="card" />
			</div>

		</section>

	</div>
</template>
