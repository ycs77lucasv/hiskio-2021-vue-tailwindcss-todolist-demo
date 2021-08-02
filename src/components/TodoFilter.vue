<template>
  <div class="flex space-x-2">
    <button
      v-for="filter in filters"
      class="text-sm font-semibold rounded transition-colors duration-150"
      :class="selected === filter.value ? 'text-indigo-500 hover:text-indigo-700' : 'text-indigo-200 hover:text-indigo-300'"
      @click="changeFilter(filter.value)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script>
export default {
  emits: ['chage-filter'],
  props: {
    selected: String,
  },
  setup(props, { emit }) {
    const filters = [
      { label: '全部', value: 'all' },
      { label: '未完成', value: 'undone' },
      { label: '已完成', value: 'done' },
    ]

    const changeFilter = filter => {
      emit('chage-filter', filter)
    }

    return { filters, changeFilter }
  },
}
</script>
