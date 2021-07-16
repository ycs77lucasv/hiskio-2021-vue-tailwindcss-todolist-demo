import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export default function useFilteredTodos(todos) {
  // const filter = useLocalStorage('filter', 'all')
  const filter = ref('all')

  const filteredTodos = computed(() => {
    return {
      all: todos.value,
      unchecked: todos.value.filter(todo => !todo.checked),
      checked: todos.value.filter(todo => todo.checked),
    }[filter.value]
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
