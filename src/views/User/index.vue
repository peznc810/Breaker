<script setup></script>

<template>
  <div class="users-bg">
    <RouterView />
  </div>
</template>

<style scoped>
  .users-bg {
    @apply h-screen w-full bg-primary;
    background-image: url('@/assets/images/bg--overlay.png');
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
  }
</style>
