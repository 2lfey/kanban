<script setup>
import Input from './Input.vue';

import { useEventBus } from '../hooks/useEventBus';

const { emit } = useEventBus()

const model = defineModel()

const onSetCause = () => {
    emit('setCause', model)
}

</script>
<template>
    <div class="">
        <Input title="Cause" placeholder="Card cause" v-model="model" />

        <button @click="onSetCause"
            class="px-3 py-1.5 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded text-white">
            Move
        </button>
    </div>
</template>