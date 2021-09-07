<template>
  <li class="flex justify-between items-center bg-white rounded-lg">
    <div class="flex px-5 py-2 flex-auto items-center select-none">

      <input
        type="checkbox"
        class="
          w-5 h-5
          mr-2
          text-indigo-600
          border-indigo-200 rounded-full
          cursor-pointer
          focus:ring-0 focus:ring-offset-0
          disabled:cursor-default
        "
        :checked="isDone"
        @change="toggleState"
        :disabled="isEditing"
      />

      <!--
        class:
          `flex-auto`: 自動延伸 flex 空間剩下可分配的區域

        事件:
          @blur         編輯完可以點其他任意處，觸發 blur 事件更新 todo
          @keyup.enter  點 Enter 一樣可以更新 todo
          @keyup.esc    取消編輯 1: 點 ESC 取消編輯

        開始編輯時自動focus 1:
          ref="editInput"  (下方 39 行)
          命名編輯框為 `editInput`
      -->
      <input
        v-if="isEditing"
        type="text"
        class="flex-auto p-1 text-indigo-700 border-0 rounded focus:ring-0"
        v-model="content"
        ref="editInput"
        @blur="updateTodo"
        @keyup.enter="updateTodo"
        @keyup.esc="cancelEdit"
      />

      <!--
        class:
          `flex-auto`: 自動延伸 flex 空間剩下可分配的區域
      -->
      <div
        v-else
        class="flex-auto p-1 text-indigo-700"
        :class="isDone ? 'line-through text-indigo-300' : ''"
        @dblclick="editTodo"
      >
        {{ content }}
      </div>
    </div>

    <!-- 只在 `已完成` 和 `不可編輯` 狀態下才可點選 -->
    <button
      v-if="isDone && !isEditing"
      @click="removeTodo"
      class="
        px-5 py-2
        text-purple-200 hover:text-red-500
        transition-colors
      "
    >
      <!-- Heroicons 3. 使用 icon -->
      <TrashIcon class="w-5 h-5" />
    </button>
  </li>
</template>

<script>
import { nextTick, ref } from 'vue'

// Heroicons 1. 安裝
// 可以安裝 `npm i @heroicons/vue` 來使用 Heroicons 上的 icon
// Heroicons：https://heroicons.com/
import { TrashIcon } from '@heroicons/vue/outline'

export default {
  components: {
    // Heroicons 2. 註冊
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

    // 開始編輯時自動focus 2:
    //   在 HTML 裡設定了 ref="editInput"
    //   這裡就可以設一個變數 editInput 為 `ref(null)`
    //   並使用 editInput.value 取得該元素
    const editInput = ref(null)

    // 取消編輯 2: 取消編輯狀態
    const isCancel = ref(false)

    const toggleState = () => {
      emit('toggle-state', props.id)
    }

    const editTodo = () => {
      isEditing.value = true

      // 開始編輯時自動focus 3:
      //   因為上面修改了當前項目為編輯狀態 (isEditing.value = true)
      //   如果這裡要操作 DOM 就必須要使用 `nextTick()`，等待 Vue 更新完 DOM (記得要引入 `nextTick()`)
      nextTick(() => {
        // 聚焦輸入框
        editInput.value.focus()
      })
    }

    const updateTodo = () => {
      // 取消編輯 5:
      //   在點擊 ESC 後觸發的 `updateTodo()` 時，
      //   要跳過這次更新 todo 操作。
      if (isCancel.value) {
        isCancel.value = false
        return
      }

      if (!isEditing.value) return

      emit('update-todo', props.id, content.value)

      isEditing.value = false
    }

    // 處理取消編輯 (點 ESC 鍵觸發)
    const cancelEdit = () => {
      // 取消編輯 3:
      //   點擊 ESC 後，會先觸發 keyup 事件，然後觸發輸入框的 blur 事件，
      //   但後面觸發的 blur 事件，同時會執行 cancelEdit()，不是我們要的預期操作，
      //   所以要在 cancelEdit() 中加一個鎖 (isCancel) 來控制。
      //
      // 示意：
      //   點擊 ESC 後 ↓
      //      觸發 keyup.esc - cancelEdit() ... O
      //      觸發 blur      - updateTodo() ... X
      //
      isCancel.value = true

      // 重設內容為編輯前的狀態
      // 因為沒有把新編輯(content.value)的內容傳出去
      // 外部的內容(props.content)還是舊的內容
      content.value = props.content

      // 關閉編輯狀態
      isEditing.value = false
    }

    const removeTodo = () => {
      emit('remove-todo', props.id)
    }

    return {
      content,
      isEditing,
      editInput,
      toggleState,
      editTodo,
      updateTodo,
      cancelEdit, // 取消編輯 4: 導出 function
      removeTodo,
    }
  },
}
</script>