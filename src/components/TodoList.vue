<template>
  <h1 class="text-center text-5xl font-bold uppercase">Todolist</h1>

  <div class="mt-6 bg-white text-gray-900 rounded-lg shadow-xl overflow-hidden">
    <TodoInput @addTodo="addTodo" />

    <TransitionGroup
      tag="ul"
      class="-space-y-px"
      :class="filteredTodos.length ? '-mb-px' : ''"
      enter-active-class="transform transition duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transform transition duration-300"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        v-bind="todo"
        @toggleChecked="toggleChecked"
        @updateTodo="updateTodo"
        @removeTodo="removeTodo"
      />
    </TransitionGroup>

    <TodoFilters
      v-if="todos.length"
      :filter="filter"
      :allFilteredTodos="allFilteredTodos"
      @updateFilter="updateFilter"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import TodoInput from './TodoInput.vue'
import TodoItem from './TodoItem.vue'
import TodoFilters from './TodoFilters.vue'

export default {
  components: {
    TodoInput,
    TodoItem,
    TodoFilters,
  },
  setup() {
    const todos = useLocalStorage('todos', [
      { id: 1, content: '學 Vue 3', checked: true },
      { id: 2, content: '學 Tailwind CSS', checked: false },
      { id: 3, content: '學 React', checked: false },
    ])

    const findTodoIndex = id => todos.value.findIndex(todo => todo.id === id)

    // Add todo
    const addTodo = content => {
      todos.value.push({
        id: new Date().getTime(),
        content,
        checked: false,
      })
    }

    // Edit todo
    const toggleChecked = id => {
      const index = findTodoIndex(id)
      todos.value[index].checked = !todos.value[index].checked
    }
    const updateTodo = (id, content) => {
      if (content) {
        todos.value[findTodoIndex(id)].content = content
      } else {
        removeTodo(id)
      }
    }

    // Remove todo
    const removeTodo = id => {
      todos.value.splice(findTodoIndex(id), 1)
    }

    // Filter todos
    const filter = ref('all')
    const allFilteredTodos = {
      all: computed(() => todos.value),
      unchecked: computed(() => todos.value.filter(todo => !todo.checked)),
      checked: computed(() => todos.value.filter(todo => todo.checked)),
    }
    const filteredTodos = computed(() => allFilteredTodos[filter.value].value)
    const updateFilter = newFilter => {
      filter.value = newFilter
    }

    return {
      todos,
      addTodo,

      toggleChecked,
      updateTodo,

      removeTodo,

      filter,
      allFilteredTodos,
      filteredTodos,
      updateFilter,
    }
  },
}
</script>
