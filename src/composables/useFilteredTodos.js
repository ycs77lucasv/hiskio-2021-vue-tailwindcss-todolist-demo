import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export default function useFilteredTodos(todos) {
  // const filter = useLocalStorage('filter', 'all')
  const filter = ref('all')

  const filters = [
    { label: '全部', value: 'all' },
    { label: '未完成', value: 'undone' },
    { label: '已完成', value: 'done' },
  ]

  const filteredTodos = computed(() => {
    return {
      all: todos.value,
      undone: todos.value.filter(todo => !todo.isDone),
      done: todos.value.filter(todo => todo.isDone),
    }[filter.value]
  })

  const changeFilter = newFilter => {
    filter.value = newFilter
  }

  return {
    filter,
    filters,
    filteredTodos,
    changeFilter,
  }
}
