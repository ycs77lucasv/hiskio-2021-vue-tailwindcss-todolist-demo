import { computed, ref } from 'vue'

export default function useFilteredTodos(todos) {
  const filter = ref('all')

  // 用 `object` 取代 `if/else`，讓程式碼比較整潔
  const filteredTodos = computed(() => {
    return {
      all: todos.value,
      isdone: todos.value.filter(todo => todo.isDone),
      undone: todos.value.filter(todo => !todo.isDone),
    }[filter.value]

    // // 上面寫法和以下是相等的結果
    // if (filter.value === 'isdone') {
    //   return todos.value.filter(todo => todo.isDone)
    // } else if (filter.value === 'undone') {
    //   return todos.value.filter(todo => !todo.isDone)
    // }
    // return todos.value
  })

  const changeFilter = newFilter => {
    filter.value = newFilter
  }

  return {
    filter,
    filteredTodos,
    changeFilter,
  }
}
