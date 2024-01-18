import { ref, watch } from "vue";

const bus = ref(new Map());

export const useEventBus = () => {
  const emit = (event, ...args) => bus.value.set(event, args);

  const on = (event, callback) =>
    watch(
      () => bus.value.get(event),
      (val) => callback(...val)
    );

  return {
    emit,
    on,
  };
};
