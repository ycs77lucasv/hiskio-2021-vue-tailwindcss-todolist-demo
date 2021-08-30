<template>
  <li class="flex justify-between items-center bg-white rounded-lg">
    <div class="flex px-5 py-2 flex-auto items-center select-none">
      <input
        type="checkbox"
        class="peer w-5 h-5 mr-2 text-indigo-600 border-indigo-200 rounded-full cursor-pointer focus:ring-0 focus:ring-offset-0 disabled:cursor-default"
        :checked="isDone"
        @change="toggleState"
        :disabled="isEditing"
      />

      <input
        v-if="isEditing"
        type="text"
        class="flex-auto p-1 text-indigo-700 border-0 rounded focus:ring-0"
        v-model="content"
        :ref="el => { if (el) el.focus() }"
        @blur="updateTodo"
        @keyup.enter="updateTodo"
        @keyup.esc="cancelEdit"
      />
      <div
        v-else
        class="flex-auto p-1 text-indigo-700 peer-checked:line-through peer-checked:text-indigo-300"
        @dblclick="editTodo"
      >
        {{ content }}
      </div>
    </div>

    <button
      v-if="isDone && !isEditing"
      @click="removeTodo"
      class="px-5 py-2 text-purple-200 hover:text-red-500 transition-colors"
    >
      <TrashIcon class="w-5 h-5" />
    </button>
  </li>
</template>

<script>
import { ref } from 'vue'
import { TrashIcon } from '@heroicons/vue/outline'

export default {
  components: {
    TrashIcon,
  },
  emits: ['toggle-state', 'update-todo', 'remove-todo'],
  props: {
    id: Number,
    content: String,
    isDone: Boolean,
  },
  setup(props, { emit }) {
    const content = ref(props.content)
    const isEditing = ref(false)
    const isCancel = ref(false)

    const toggleState = () => {
      emit('toggle-state', props.id)
    }

    const editTodo = () => {
      isEditing.value = true
    }

    const updateTodo = () => {
      if (isCancel.value) {
        isCancel.value = false
        return
      }

      if (!isEditing.value) return

      emit('update-todo', props.id, content.value)

      isEditing.value = false
    }

    const cancelEdit = () => {
      isCancel.value = true
      content.value = props.content
      isEditing.value = false
    }

    const removeTodo = () => {
      emit('remove-todo', props.id)
    }

    return {
      content,
      isEditing,
      toggleState,
      editTodo,
      updateTodo,
      cancelEdit,
      removeTodo,
    }
  },
}
</script>