<template>
  <input
    type="text"
    autofocus
    v-model="newTodo"
    @keyup.enter="addTodo"
    class="w-full px-5 py-4 border-0 placeholder-gray-400 focus:ring-0 focus:placeholder-gray-300"
    placeholder="請輸入待辦事項..."
  />
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['addTodo'],
  setup(props, { emit }) {
    const newTodo = ref('')

    const addTodo = () => {
      if (!newTodo.value) return
      emit('addTodo', newTodo.value)
      newTodo.value = ''
    }

    return { newTodo, addTodo }
  },
}
</script>
