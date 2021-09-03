<template>
  <div class="min-h-screen flex justify-center px-4 py-20 bg-gradient-to-tr from-indigo-600 to-purple-500 text-white">
    <div class="w-full max-w-sm">
      <h1 class="text-center text-5xl font-bold uppercase">Todolist</h1>

      <div class="mt-6 p-6 bg-indigo-50 text-gray-900 rounded-xl shadow-xl overflow-hidden">
        <TodoInput @add-todo="addTodo" />

        <TodoFilter
          v-if="todos.length"
          class="mt-6"
          :filter="filter"
          @chage-filter="changeFilter"
        />

        <TransitionGroup
          tag="ul"
          class="space-y-3"
          :class="filteredTodos.length ? 'mt-4' : ''"
          enter-active-class="transform transition"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transform transition"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <TodoItem
            v-for="todo in filteredTodos"
            :key="todo.id"
            v-bind="todo"
            @toggle-state="toggleState"
            @update-todo="updateTodo"
            @remove-todo="removeTodo"
          />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script>
import TodoInput from './components/TodoInput.vue'
import TodoItem from './components/TodoItem.vue'
import TodoFilter from './components/TodoFilter.vue'
import useTodos from './composables/useTodos'
import useFilteredTodos from './composables/useFilteredTodos'

export default {
  components: {
    TodoInput,
    TodoItem,
    TodoFilter,
  },
  setup() {
    const { todos, addTodo, toggleState, updateTodo, removeTodo } = useTodos()
    const { filter, filteredTodos, changeFilter } = useFilteredTodos(todos)

    return {
      todos,
      addTodo,
      toggleState,
      updateTodo,
      removeTodo,
      filter,
      filteredTodos,
      changeFilter,
    }
  },
}
</script>
