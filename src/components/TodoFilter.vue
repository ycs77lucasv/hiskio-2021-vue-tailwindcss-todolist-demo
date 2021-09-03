<template>
  <div class="flex space-x-2">
    <!--
      class:
        `transition-colors`: 增加切換顏色時的過渡效果
    -->
    <button
      class="font-semibold transition-colors"
      :class="
        filter === 'all'
          ? 'text-indigo-500 hover:text-indigo-700'
          : 'text-indigo-200 hover:text-indigo-300'
      "
      @click="changeFilter('all')"
    >
      全部
    </button>

    <button
      class="font-semibold transition-colors"
      :class="
        filter === 'undone'
          ? 'text-indigo-500 hover:text-indigo-700'
          : 'text-indigo-200 hover:text-indigo-300'
      "
      @click="changeFilter('undone')"
    >
      未完成
    </button>

    <button
      class="font-semibold transition-colors"
      :class="
        filter === 'isdone'
          ? 'text-indigo-500 hover:text-indigo-700'
          : 'text-indigo-200 hover:text-indigo-300'
      "
      @click="changeFilter('isdone')"
    >
      已完成
    </button>
  </div>
</template>

<script>
export default {
  emits: ['chage-filter'],
  props: {
    filter: String,
  },
  setup(props, { emit }) {
    const changeFilter = filter => {
      emit('chage-filter', filter)
    }

    return { changeFilter }
  },
}
</script>
