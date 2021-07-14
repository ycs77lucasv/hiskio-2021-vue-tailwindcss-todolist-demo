<template>
  <div class="min-h-screen flex justify-center px-4 py-20 bg-gradient-to-tr from-indigo-600 to-purple-500 text-white">
    <div class="w-full max-w-sm">
      <h1 class="text-center text-5xl font-bold uppercase">Todolist</h1>
      <div class="mt-6 bg-white text-gray-900 rounded-lg shadow-xl overflow-hidden">
        <input
          type="text"
          autofocus
          v-model="newTodo"
          @keyup.enter="addTodo"
          class="w-full px-5 py-4 border-0 placeholder-gray-400 focus:ring-0 focus:placeholder-gray-300"
          placeholder="請輸入待辦事項..."
        />

        <TransitionGroup
          tag="ul"
          class="-space-y-px -mb-px"
          enter-active-class="transform transition duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transform transition duration-300"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <li
            v-for="(todo, index) in todos"
            :key="todo.id"
            class="flex justify-between items-center border-t border-b border-gray-200"
          >
            <div class="px-5 py-2 flex flex-auto items-center select-none">
              <input
                type="checkbox"
                v-model="todo.checked"
                class="peer text-indigo-600 border-indigo-200 rounded mr-2 cursor-pointer focus:ring-0 focus:ring-offset-0 disabled:text-gray-200 disabled:border-gray-200 disabled:cursor-default"
                :disabled="isEditing(index)"
              />

              <input
                v-if="isEditing(index)"
                type="text"
                class="flex-auto p-2 border-0 focus:ring-0"
                v-model="todo.content"
                :ref="el => { if (el) el.focus() }"
                @blur="updateEdit"
                @keyup.enter="updateEdit"
                @keyup.esc="cancelEdit"
              />
              <div
                v-else
                class="flex-auto p-2 peer-checked:line-through peer-checked:text-gray-300"
                @dblclick="editTodo(index)"
              >
                {{ todo.content }}
              </div>
            </div>

            <button
              v-if="!isEditing(index)"
              @click="removeTodo(index)"
              class="px-5 py-4 text-purple-200 hover:text-red-500 transition-colors"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </li>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { TrashIcon } from '@heroicons/vue/outline'

export default {
  components: {
    TrashIcon,
  },
  setup() {
    const todos = useLocalStorage('todos', [
      { id: 0, content: '學 Vue3', checked: true },
      { id: 1, content: '學 Tailwind CSS', checked: false },
      { id: 2, content: '學 React', checked: false },
    ])
    let uid = todos.value[todos.value.length - 1]?.id + 1 || 0

    // Add todo
    const newTodo = ref('')
    const addTodo = () => {
      if (!newTodo.value) return
      todos.value.push({
        id: uid++,
        content: newTodo.value,
        checked: false,
      })
      newTodo.value = ''
    }

    // Edit todo
    const editTodoId = ref(null)
    let editTodoCache = null
    const editTodo = index => {
      editTodoId.value = index
      editTodoCache = todos.value[index].content
    }
    const updateEdit = () => {
      if (!todos.value[editTodoId.value].content) {
        removeTodo(editTodoId.value)
      }
      editTodoId.value = null
    }
    const cancelEdit = () => {
      todos.value[editTodoId.value].content = editTodoCache
      editTodoId.value = null
    }
    const isEditing = index => index === editTodoId.value

    // Remove todo
    const removeTodo = index => {
      todos.value.splice(index, 1)
    }

    return {
      todos,
      newTodo,
      addTodo,
      editTodo,
      updateEdit,
      cancelEdit,
      isEditing,
      removeTodo,
    }
  },
}
</script>
