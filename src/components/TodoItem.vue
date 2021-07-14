<template>
  <li class="flex justify-between items-center border-t border-b border-gray-200">
    <div class="flex px-5 py-3 flex-auto items-center select-none">
      <input
        type="checkbox"
        class="peer w-5 h-5 mr-2 text-indigo-600 border-indigo-200 rounded-full cursor-pointer focus:ring-0 focus:ring-offset-0 disabled:cursor-default"
        :checked="checked"
        @change="toggleChecked"
        :disabled="isEditing"
      />

      <input
        v-if="isEditing"
        type="text"
        class="flex-auto p-1 rounded focus:border-indigo-600 focus:ring-0"
        v-model="content"
        :ref="el => { if (el) inlineInputRef = el }"
        @blur="updateTodo"
        @keyup.enter="updateTodo"
        @keyup.esc="cancelEdit"
      />
      <div
        v-else
        class="flex-auto p-1 border border-transparent peer-checked:line-through peer-checked:text-gray-300"
        @dblclick="editTodo"
      >
        {{ content }}
      </div>
    </div>

    <button
      v-if="checked && !isEditing"
      @click="removeTodo"
      class="px-5 py-4 text-purple-200 hover:text-red-500 transition-colors"
    >
      <TrashIcon class="w-5 h-5" />
    </button>
  </li>
</template>

<script>
import { ref, watch } from 'vue'
import { TrashIcon } from '@heroicons/vue/outline'

export default {
  components: {
    TrashIcon,
  },
  emits: ['toggleChecked', 'updateTodo', 'removeTodo'],
  props: {
    index: Number,
    id: Number,
    content: String,
    checked: Boolean,
  },
  setup(props, { emit }) {
    const content = ref(props.content)
    const isEditing = ref(false)
    const isCancel = ref(false)

    const inlineInputRef = ref(null)
    watch(inlineInputRef, el => {
      if (el) el.focus()
    })

    const toggleChecked = () => {
      emit('toggleChecked', props.id)
    }

    const editTodo = () => {
      isEditing.value = true
    }

    const updateTodo = () => {
      if (isCancel.value) {
        isCancel.value = false
        return
      }

      emit('updateTodo', props.id, content.value)
      isEditing.value = false
    }

    const cancelEdit = () => {
      isCancel.value = true
      content.value = props.content
      isEditing.value = false
    }

    const removeTodo = () => {
      emit('removeTodo', props.id)
    }

    return {
      content,
      isEditing,
      inlineInputRef,

      toggleChecked,
      editTodo,
      updateTodo,
      cancelEdit,
      removeTodo,
    }
  },
}
</script>