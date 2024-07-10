<script lang="ts" setup>
  import { computed, onMounted, ref, onUnmounted } from 'vue'
  import type { SelectItem, SelectList } from '@/@types/components/select'

  /** Props
   *  @param data:[]
   *  @param icon?:string
   */
  const props = defineProps<SelectList>()
  const emit = defineEmits(['input', 'click'])

  // Data
  const isClick = ref(false) // 顯示下拉選單
  const sortValue = ref(1) // 選單選擇: 預設

  // Computed
  /** 用computed locale才會響應 */
  const sortLabel = computed(() => {
    const sortOption = props.data.find((option) => option.value === sortValue.value)
    return sortOption ? sortOption.label : props.data[0].label
  })
  // Methods
  const toggleMenu = () => {
    isClick.value = !isClick.value
  }
  const handleWindowClick = (e: Event) => {
    const target = e.target as HTMLElement

    const isMenuOutside = isClick.value && !target.classList.contains('group')

    if (isMenuOutside) {
      isClick.value = false
    }
  }

  // 控制選擇
  const handleOption = (item?: SelectItem) => {
    if (item && item.value) {
      sortValue.value = item.value
      emit('input', sortValue.value)
    }
    emit('click')
    isClick.value = false // 關閉下拉選單
  }

  // lifecycle
  onMounted(() => {
    document.addEventListener('click', handleWindowClick)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleWindowClick)
  })
</script>

<template>
  <div class="relative inline-block">
    <button
      type="button"
      class="group rounded-md bg-white px-3 py-2 text-sm font-medium shadow-md"
      @click="toggleMenu"
    >
      {{ sortLabel }}
      <v-icon
        name="hi-chevron-down"
        scale="0.8"
        :class="{ 'group-focus:-rotate-180': isClick }"
        class="origin-center transition-transform duration-300 group-hover:text-blue-500"
        @click.stop="toggleMenu"
      />
    </button>
    <Transition name="slide-fade">
      <ul
        v-show="isClick"
        class="absolute right-0 top-10 text-nowrap rounded-md bg-white text-sm shadow-lg"
      >
        <!-- 保留客製化 -->
        <slot name="menu">
          <li v-for="item in props.data" :key="item.label" @click="handleOption(item)">
            <span class="inline-block w-full px-4 py-2 hover:cursor-pointer hover:bg-blue-500/5">
              {{ item.label }}
            </span>
          </li>
        </slot>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
  }
</style>
