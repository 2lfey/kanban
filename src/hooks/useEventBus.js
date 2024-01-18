import { ref } from "vue";

const bus = ref(new Map());

export const useEventBus = (key) => {
  const emit = (event, ...args) => {
    bus.value.set(event, args);
  };

  return {
    emit,
    bus,
  };
};
