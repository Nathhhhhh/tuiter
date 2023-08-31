
<script setup>
const darkMode = ref(true);
const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const isLoading = useAuthLoading()
const user = useAuthUser();
onBeforeMount(() => {
  initAuth()
});

</script>
<template>
  <div :class="{ 'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isLoading" />
      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>
          <main class="col-span-12 md:col-span-7 xl:col-span-6">
            <NuxtPage />
          </main>
          <div class="hidden md:block md:col-span-4">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <Auth v-else />
    </div>
  </div>
</template>
