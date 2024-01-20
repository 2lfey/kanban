<script setup>
import Card from './Card.vue'

import draggable from "vuedraggable";

import { columns } from '../board';

import { ref } from 'vue'

const props = defineProps({
	board: Object,
})

const dragging = ref(false)

</script>

<template>
	<div class="grid grid-cols-4 gap-4">

		<section class="space-y-2" v-for="column in columns">
			<h2 class="transition duration text-xl text-center font-bold">
				{{ column.title }}
			</h2>

			<draggable :move="() => {}" :list="column.items" item-key="title" @start="dragging = true" @end="dragging = false" class="flex flex-col gap-4">
				<template #item="{ element }">
					<div class="">
	<Card @delete-card="column.onDelete" @update-card="column.onUpdate" @move-left="column.onMoveLeft"
							@star-card="column.onStar" @move-right="column.onMoveRight"
							:can-move-left="column.title !== 'Planned'" :can-move-right="column.title !== 'Completed'" :card="element" />
					</div>
					
				</template>
			</draggable>

		</section>

	</div>
</template>
