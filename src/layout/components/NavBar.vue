<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import { ref, reactive, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { t } from '@/locales/index'
  import { useUserStore } from '@/stores/user'

  const props = defineProps({
    show: Boolean,
  })
  const emit = defineEmits(['click'])

  // declare
  const { locale } = useI18n()
  const store = useUserStore()

  // data // TODO: 新增 path 路徑檔案
  const menus = reactive([
    { name: t('nav.profile'), path: '/profile' },
    { name: t('nav.changePassword'), path: '/changePassword' },
    { name: t('nav.logout'), path: '/logout' },
  ])

  const langMenu = reactive([
    { name: '繁體中文', value: 'zh' },
    { name: 'English', value: 'en' },
  ])

  // TODO: 點擊列表以外的地方關閉下拉選單
  const showUserMenu = ref(false)
  const showLangMenu = ref(false)
  const userBtn = ref<HTMLElement | null>(null)
  const langBtn = ref<HTMLElement | null>(null)

  // methods
  const toggleLang = (value: string) => {
    locale.value = value
  }
  // 使用者選單開關
  const toggleShowUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
    if (showLangMenu.value) {
      showLangMenu.value = false
    }
  }
  // 語言選單開關
  const toggleShowLangMenu = () => {
    showLangMenu.value = !showLangMenu.value
    if (showUserMenu.value) {
      showUserMenu.value = false
    }
  }
  // 點擊選單外部則關閉選單
  const handleWindowClick = (e: Event) => {
    const target = e.target as HTMLElement

    const isUserMenuOutside = showUserMenu.value && userBtn.value && !userBtn.value.contains(target)
    const isLangMenuOutside = showLangMenu.value && langBtn.value && !langBtn.value.contains(target)

    if (isUserMenuOutside) {
      showUserMenu.value = false
    } else if (isLangMenuOutside) {
      showLangMenu.value = false
    }
  }

  // lifecycle
  onMounted(() => {
    document.addEventListener('click', handleWindowClick)
  })

  onUnmounted(() => {
    document.addEventListener('click', handleWindowClick)
  })
</script>

<template>
  <header class="fixed top-0 z-20 h-[50px] w-full shadow-md">
    <div class="flex h-full justify-between">
      <div
        class="grid h-[50px] place-content-center border-b bg-primary text-white hover:cursor-pointer lg:w-60"
        :class="props.show ? 'w-60' : 'w-0'"
      >
        <div class="flex-shrink-0">
          <span class="lg:block" :class="props.show ? 'block' : 'hidden'">IF SHOP</span>
        </div>
      </div>
      <div
        class="grid h-[50px] w-10 place-content-center border-b bg-primary text-white hover:cursor-pointer lg:hidden"
        :class="props.show && 'border-l'"
        @click="emit('click')"
      >
        <div class="flex-shrink-0">
          <v-icon name="bi-list" class="block lg:hidden" scale="1.2" />
        </div>
      </div>
      <nav class="flex-1 bg-white px-5">
        <div class="flex h-full items-center justify-end">
          <!-- Language Btn -->
          <div class="relative">
            <button type="button" ref="langBtn" class="mr-4" @click="toggleShowLangMenu">
              <v-icon name="md-language" scale="0.8" />
            </button>
            <!-- 下拉選單 -->
            <Transition name="slide-fade">
              <ul
                v-show="showLangMenu"
                class="absolute -left-10 top-9 min-w-24 border border-b-0 bg-white text-sm shadow-lg"
              >
                <li v-for="item in langMenu" :key="item.name">
                  <span
                    class="inline-block w-full border-b px-4 py-2 hover:cursor-pointer hover:bg-gray-500 hover:text-white"
                    @click="toggleLang(item.value)"
                  >
                    {{ item.name }}
                  </span>
                </li>
              </ul>
            </Transition>
          </div>
          <div class="relative">
            <!-- User Btn -->
            <button type="button" ref="userBtn" @click="toggleShowUserMenu">
              <span>{{ t('hello') }}，{{ store.user?.username }}</span>
              <v-icon name="hi-chevron-down" scale="0.8" />
            </button>
            <!-- 下拉選單 -->
            <Transition name="slide-fade">
              <ul
                v-show="showUserMenu"
                class="absolute right-0 top-9 min-w-24 border border-b-0 bg-white text-sm shadow-lg"
              >
                <li v-for="menu in menus" :key="menu.name">
                  <RouterLink
                    class="inline-block min-w-full border-b px-4 py-2 hover:bg-gray-500 hover:text-white"
                    :to="menu.path"
                    >{{ menu.name }}</RouterLink
                  >
                </li>
              </ul>
            </Transition>
          </div>
        </div>
      </nav>
    </div>
  </header>
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
