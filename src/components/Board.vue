<script setup>
import Card from './Card.vue'
import { columns } from '../board';

const props = defineProps({
	board: Object,
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
					@move-left="column.onMoveLeft" @star-card="column.onStar" @move-right="column.onMoveRight" :can-move-left="column.title !== 'Planned'" :can-move-right="column.title !== 'Completed'"
					:key="index" :card="card" />
			</div>
		</section>

	</div>
</template>
