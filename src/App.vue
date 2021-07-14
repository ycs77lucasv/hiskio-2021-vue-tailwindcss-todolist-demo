<template>
  <div class="min-h-screen flex justify-center px-4 py-20 bg-gradient-to-tr from-indigo-600 to-purple-500 text-white">
    <div class="w-full max-w-sm">
      <TodoList />
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  components: {
    TodoList,
  },
}
</script>
