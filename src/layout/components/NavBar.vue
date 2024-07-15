<script lang="ts" setup>
  import { RouterLink, useRoute } from 'vue-router'
  import { ref, reactive, onMounted, onUnmounted, computed, watchEffect, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { t } from '@/locales/index'
  import { useUserStore } from '@/stores/user'
  import { useLocaleStore } from '@/stores/locale'
  import type { Menu, MenuItem, MobileMenu } from '@/@types/components/navBar'

  // declare
  const { locale } = useI18n()
  const store = useUserStore()
  const localeStore = useLocaleStore()
  const route = useRoute()

  const props = defineProps({
    show: Boolean,
  })
  const emit = defineEmits(['click'])

  // data
  const showUserMenu = ref(false)
  const showLangMenu = ref(false)
  const showMobileMenu = ref(false)
  const userBtn = ref<HTMLElement | null>(null)
  const langBtn = ref<HTMLElement | null>(null)
  const mobileBtn = ref<HTMLElement | null>(null)
  const routeName = computed(() => {
    return route.name
  })
  // const userMenu: MenuItem[] = reactive([
  //   { name: t('user.profile'), path: '/users/profile' },
  //   { name: t('user.changePassword'), path: '/users/changePassword' },
  //   { name: t('user.logout'), path: '/logout' },
  // ])
  const langMenu: MenuItem[] = reactive([
    { name: '繁體中文', value: 'zh' },
    { name: 'English', value: 'en' },
  ])
  const username = computed(() => store.user?.username || '')
  // const mobileMenu: MobileMenu[] = reactive([
  //   { name: t('language'), showChildren: false, children: langMenu },
  //   {
  //     name: `${t('hello')}，${username.value}`,
  //     showChildren: false,
  //     children: [],
  //   },
  // ])
  const mobileLangMenu = reactive({
    showChildren: false,
    children: langMenu,
  })

  // mobileMenu[1].name = `${t('hello')}，${username.value}`

  /* methods */
  // 切換語言
  const toggleLang = (value: 'zh' | 'en') => {
    locale.value = value
    localeStore.setLocale(value)
    if (showMobileMenu.value) {
      showMobileMenu.value = false
      mobileLangMenu.showChildren = false
    }
    // window.location.reload()
  }
  // 選單開關
  const toggleMenu = (menu?: Menu | MobileMenu): void => {
    if (menu === 'user') {
      showUserMenu.value = !showUserMenu.value
      showLangMenu.value = false
    } else if (menu === 'lang') {
      showLangMenu.value = !showLangMenu.value
      showUserMenu.value = false
    } else if (menu === 'mobile') {
      showMobileMenu.value = !showMobileMenu.value
      // mobileLangMenu.showChildren = false
      // mobileMenu.forEach((item) => {
      //   item.showChildren = false
      // })
    } else {
      // 手機版選單開關
      mobileLangMenu.showChildren = !mobileLangMenu.showChildren
    }
  }
  // 點擊選單外部則關閉選單
  const handleWindowClick = (e: Event) => {
    const target = e.target as HTMLElement
    const isUserMenuOutside = showUserMenu.value && userBtn.value && !userBtn.value.contains(target)
    const isLangMenuOutside = showLangMenu.value && langBtn.value && !langBtn.value.contains(target)
    const isMobileMenuOutside = computed(() => {
      // 如果選單沒開，並且點擊的是選單外部，則不關閉選單
      if (!showMobileMenu.value) {
        return false
      }
      return showMobileMenu.value && mobileBtn.value && !mobileBtn.value.contains(target)
    })

    if (isUserMenuOutside) {
      showUserMenu.value = false
    } else if (isLangMenuOutside) {
      showLangMenu.value = false
    } else if (isMobileMenuOutside.value) {
      showMobileMenu.value = false
    }
  }

  /* lifecycle */
  // 監聽視窗點擊事件，以便關閉選單
  onMounted(() => {
    document.addEventListener('click', handleWindowClick)
  })
  onUnmounted(() => {
    document.addEventListener('click', handleWindowClick)
  })

  watch(routeName, () => {
    showUserMenu.value = false
    showLangMenu.value = false
    showMobileMenu.value = false
  })
</script>

<template>
  <header
    class="fixed top-0 z-20 h-[50px] w-full bg-primary shadow-md transition-all duration-300 md:bg-white"
  >
    <div class="relative flex h-full justify-between">
      <!-- Logo -->
      <div
        class="grid h-[50px] place-content-center bg-primary text-white transition-all duration-300 hover:cursor-pointer lg:w-60"
        :class="props.show ? 'w-60' : 'w-0'"
      >
        <div class="flex-shrink-0">
          <span class="text-nowrap lg:block" :class="props.show ? 'block' : 'hidden'">R SHOP</span>
        </div>
      </div>
      <!-- hamburger -->
      <div
        class="grid place-content-center bg-primary px-3 text-white hover:cursor-pointer lg:hidden"
        :class="props.show && 'border-l-2 border-slate-900/20'"
        @click="emit('click')"
      >
        <div class="flex-shrink-0">
          <v-icon name="bi-list" class="block lg:hidden" scale="1.2" />
        </div>
      </div>
      <nav class="flex-1">
        <div class="flex h-full items-center justify-end">
          <div class="hidden items-center pr-5 md:flex">
            <!-- Language Config -->
            <div class="relative">
              <button type="button" ref="langBtn" class="mr-4" @click="toggleMenu('lang')">
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
                      class="inline-block w-full border-b px-2 py-1 hover:cursor-pointer hover:bg-gray-500 hover:text-white"
                      @click="item.value && toggleLang(item.value)"
                    >
                      {{ item.name }}
                    </span>
                  </li>
                </ul>
              </Transition>
            </div>
            <!-- User Config -->
            <div class="relative">
              <!-- 暫不開發 -->
              <!-- <button type="button" ref="userBtn" @click="toggleMenu('user')">
                <span>{{ t('hello') }}，{{ store.user?.username || '' }}</span>
                <v-icon name="hi-chevron-down" scale="0.8" />
              </button> -->
              <span>{{ t('hello') }}，{{ store.user?.username || '' }}</span>
              <!-- 下拉選單 -->
              <!-- <Transition name="slide-fade">
                <ul
                  v-show="showUserMenu"
                  class="absolute left-0 top-9 min-w-24 border border-b-0 bg-white text-sm shadow-lg"
                >
                  <li v-for="menu in userMenu" :key="menu.name">
                    <RouterLink
                      class="inline-block min-w-full border-b px-4 py-2 hover:bg-gray-500 hover:text-white"
                      :to="menu.path || ''"
                      >{{ menu.name }}</RouterLink
                    >
                  </li>
                </ul>
              </Transition> -->
            </div>
          </div>
          <!-- 手機版選單 -->
          <!-- TODO: 新增dropdown components -->
          <div class="text-white md:hidden" ref="mobileBtn">
            <button class="h-[50px] px-2 shadow-none" @click="toggleMenu('mobile')">
              <v-icon name="hi-dots-vertical" />
            </button>
            <!-- 選單 -->
            <ul
              v-show="showMobileMenu"
              class="absolute top-[50px] w-full bg-white text-slate-700 shadow-md transition-all duration-300"
              :class="props.show ? 'left-60' : 'left-0'"
            >
              <!-- 外層 -->
              <li>
                <div class="mobile-outside-menu" @click="toggleMenu()">
                  <span>{{ t('language') }}</span>
                  <v-icon name="hi-chevron-down" scale="0.8" />
                </div>
                <!-- 內層 -->
                <div
                  v-show="mobileLangMenu.showChildren"
                  class="mobile-inside-menu"
                  v-for="item in mobileLangMenu.children"
                  :key="item.name"
                  @click="toggleLang(item.value as 'zh' | 'en')"
                >
                  <span>{{ item.name }}</span>
                </div>
              </li>
              <li class="px-4 py-3 text-sm">{{ t('hello') }}， {{ username }}</li>
            </ul>
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

  .list-enter-active,
  .list-leave-active {
    transition: display 1s ease;
  }

  .mobile-outside-menu {
    @apply flex w-full items-center justify-between px-4 py-1 text-sm hover:cursor-pointer;
  }

  .mobile-inside-menu {
    @apply w-full bg-slate-900/70 px-4 py-3 text-left text-sm font-normal text-white transition-colors duration-150 hover:cursor-pointer hover:bg-slate-900/80;
  }
</style>
