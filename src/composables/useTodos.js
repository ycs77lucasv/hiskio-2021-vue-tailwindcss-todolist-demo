import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export default function useTodos() {
  const todos = useLocalStorage('todos', [
    { id: 1, content: '學 HTML', isDone: true },
    { id: 2, content: '學 Vue 3', isDone: false },
    { id: 3, content: '學 Tailwind CSS', isDone: false },
  ])

  // 新增函式用於尋找 todo 的 index
  const findTodoIndex = id => todos.value.findIndex(todo => todo.id === id)

  const addTodo = newTodo => {
    todos.value.push({
      id: new Date().getTime(),
      content: newTodo,
      isDone: false,
    })
  }

  const toggleState = id => {
    // 更新 `findTodoIndex()` 1
    const index = findTodoIndex(id)
    if (index === -1) return

    todos.value[index].isDone = !todos.value[index].isDone
  }

  const updateTodo = (id, content) => {
    // 更新 `findTodoIndex()` 2
    const index = findTodoIndex(id)
    if (index === -1) return

    if (content) {
      todos.value[index].content = content
    } else {
      // 如果在編輯狀態下儲存空字串，就刪除該 todo
      removeTodo(id)
    }
  }

  const removeTodo = id => {
    // 更新 `findTodoIndex()` 3
    const index = findTodoIndex(id)
    if (index === -1) return

    todos.value.splice(index, 1)
  }

  return {
    todos,
    addTodo,
    toggleState,
    updateTodo,
    removeTodo,
  }
}
