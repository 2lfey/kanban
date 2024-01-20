<script setup>

const props = defineProps({
    list: Array
})

</script>
<template>
    <div class="flex flex-col gap-4">
        <div v-for="(card, index) in list" :key="index" :class="card.isExpaired ? 'bg-red-600 dark:bg-red-600' : 'bg-gray-100 dark:bg-gray-800'"
            class="group/card relative flex flex-col items-end p-4 rounded-lg transition duration cursor-pointer">

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

		<h2 v-show="!list?.length" class="text-center font-bold text-xl">No starred cards</h2>
    </div>
</template>