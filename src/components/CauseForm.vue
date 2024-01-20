<script setup>
import Input from './Input.vue';

import { useEventBus } from '../hooks/useEventBus';
import { ref } from 'vue';

const { emit } = useEventBus()

const props = defineProps({
    card: Object
})

const cause = ref(null)

const onSetCause = () => {
    emit('set-cause', props.card, cause)
}

</script>
<template>
    <form @submit.prevent="$emit('onSubmit')" class="space-y-4">
        <Input title="Cause" placeholder="Card cause" v-model="cause" />

        <button type="submit" @click="onSetCause"
            class="w-full px-3 py-1.5 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded text-white">
            Move
        </button>
    </form>
</template>