import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export default function useTodos() {
  // const todos = useLocalStorage('todos', [
  const todos = ref([
    { id: 3, content: '學 HTML', isDone: true },
    { id: 1, content: '學 Vue 3', isDone: false },
    { id: 2, content: '學 Tailwind CSS', isDone: false },
  ])

  const findTodoIndex = id => todos.value.findIndex(todo => todo.id === id)

  const addTodo = newTodo => {
    todos.value.push({
      id: new Date().getTime(),
      content: newTodo,
      isDone: false,
    })
  }

  const toggleState = id => {
    const index = findTodoIndex(id)
    todos.value[index].isDone = !todos.value[index].isDone
  }

  const updateTodo = (id, content) => {
    if (content) {
      todos.value[findTodoIndex(id)].content = content
    } else {
      removeTodo(id)
    }
  }

  const removeTodo = id => {
    todos.value.splice(findTodoIndex(id), 1)
  }

  return {
    todos,
    addTodo,
    toggleState,
    updateTodo,
    removeTodo,
  }
}
