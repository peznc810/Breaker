<script lang="ts" setup>
  import { useUserStore } from '@/stores/user'
  import { reactive, ref } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'

  const store = useUserStore()
  const route = useRoute()

  const username = ref('123')
  const email = ref('456')
  const currentPassword = ref('789')
  const newPassword = ref('123')
  const confirmPassword = ref('456')
</script>

<template>
  <div class="grid h-full grid-cols-1 place-content-center">
    <div class="m-auto w-full max-w-[520px]">
      <div class="space-y-4 px-4 text-center">
        <!-- 編輯個人資訊 -->
        <template v-if="route.name === 'profile'">
          <div class="text-3xl font-normal text-white">編輯個人資訊</div>
          <el-input v-model="username"></el-input>
          <el-input v-model="email"></el-input>
          <el-button type="primary" class="w-full">
            儲存
            <v-icon name="bi-arrow-right-short" />
          </el-button>
          <RouterLink to="/users/changePassword" class="shortcut">
            <v-icon name="md-login-round" />
            <span class="ml-2">更改密碼</span>
          </RouterLink>
        </template>
        <!-- 更改密碼 -->
        <template v-else>
          <div class="text-3xl font-normal text-white">編輯個人資訊</div>
          <el-input v-model="currentPassword"></el-input>
          <el-input v-model="newPassword"></el-input>
          <el-input v-model="confirmPassword"></el-input>
          <RouterLink to="/users/profile" class="shortcut">
            <v-icon name="md-login-round" />
            <span class="ml-2">個人資料</span>
          </RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .el-input,
  .el-button {
    @apply h-12;
  }

  .shortcut {
    @apply mt-4 inline-block text-white;
  }
</style>
