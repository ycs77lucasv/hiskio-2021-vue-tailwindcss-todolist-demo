<template>
  <form class="relative" @submit.prevent="addTodo">
    <input
      type="text"
      autofocus
      v-model="newTodo"
      class="w-full pl-5 pr-12 py-2 border-0 rounded-full shadow-lg focus:ring-indigo-600 focus:border-indigo-600 focus:shadow-none transition-shadow duration-100"
    />

    <button class="absolute inset-y-0 right-0 w-10 h-10 bg-gradient-to-t from-indigo-600 to-purple-500 text-white rounded-full opacity-100 hover:opacity-90 transition-opacity duration-100" type="submit">+</button>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['addTodo'],
  setup(props, { emit }) {
    const newTodo = ref('')

    const addTodo = () => {
      if (!newTodo.value) return

      emit('add-todo', newTodo.value)

      newTodo.value = ''
    }

    return { newTodo, addTodo }
  },
}
</script>
