<template>
  <div class="flex px-5 py-3 border-t border-gray-200 space-x-2">
    <button
      v-for="key in Object.keys(options)"
      class="px-2 py-0.5 text-sm border rounded transition-colors duration-75"
      :class="filter === key
        ? 'text-indigo-600 bg-indigo-50 border-indigo-400'
        : 'text-gray-400 border-gray-200'"
      @click="updateFilter(key)"
    >
      {{ options[key] }}
    </button>
  </div>
</template>

<script>
export default {
  emits: ['updateFilter'],
  props: {
    filter: String,
    allFilteredTodos: Object,
  },
  setup(props, { emit }) {
    const options = {
      all: '全部',
      unchecked: `未完成 (${props.allFilteredTodos.unchecked.value.length})`,
      checked: `已完成 (${props.allFilteredTodos.checked.value.length})`,
    }

    const updateFilter = filter => {
      emit('updateFilter', filter)
    }

    return { options, updateFilter }
  },
}
</script>
