<template>
  <header class="fixed top-0 z-20 h-[50px] w-full shadow-md">
    <div class="flex h-full justify-between">
      <div
        class="grid h-[50px] w-60 place-content-center border-b bg-primary text-white"
      >
        <div class="flex-shrink-0">IF SHOP</div>
      </div>
      <nav class="flex-1 bg-white px-5">
        <div class="flex h-full items-center justify-end">
          <div class="relative">
            <button type="button">你好，RubyChen</button>
            <ul
              class="absolute top-9 flex w-32 flex-col border bg-white text-sm"
            >
              <li>
                <a
                  class="inline-block w-full border-b px-4 py-2 hover:bg-gray-100/60"
                  href="#"
                  >更改密碼</a
                >
              </li>
              <li>
                <a class="inline-block w-full border-b px-4 py-2" href="#"
                  >登出</a
                >
              </li>
              <li>
                <a class="inline-block w-full px-4 py-2" href="#">個人資料</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.t {
  color: #363d4d;
}
</style>
