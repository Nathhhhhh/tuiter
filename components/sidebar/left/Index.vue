<script setup>
const transition = 'transition ease-in-out duration-350';
</script>

<template>
    <div class="flex flex-col h-screen">
        <div :class="transition" class="p-2 my-2 rounded-full w-min hover:bg-blue-50 dark:hover:bg-white/20">
            <NuxtLink to="/">
                <Icon name="logos:twitter" class="[&>*]:fill-dim-50 dark:[&>*]:fill-white w-8 h-8" />
            </NuxtLink>
        </div>
        <div class="mt-2 space-y-3">
            <SidebarLeftTab active>
                <template v-slot:icon>
                    <Icon class="w-6 h-6 " name="heroicons-solid:home"></Icon>
                </template>
                <template v-slot:name>
                    Accueil
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <Icon class="w-6 h-6 " name="heroicons-solid:hashtag"></Icon>
                </template>
                <template v-slot:name>
                    Explore
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <Icon class="w-6 h-6 " name="heroicons-solid:bell"></Icon>
                </template>
                <template v-slot:name>
                    Notifications
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <Icon class="w-6 h-6 " name="heroicons-solid:inbox"></Icon>
                </template>
                <template v-slot:name>
                    Messages
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <Icon class="w-6 h-6 " name="heroicons-solid:bookmark"></Icon>
                </template>
                <template v-slot:name>
                    Signets
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <Icon class="w-6 h-6 " name="heroicons-solid:document-text"></Icon>
                </template>
                <template v-slot:name>
                    Listes
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <Icon class="w-6 h-6 " name="heroicons-solid:user"></Icon>
                </template>
                <template v-slot:name>
                    Profil
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <Icon class="w-6 h-6 " name="heroicons-solid:dots-circle-horizontal"></Icon>
                </template>
                <template v-slot:name>
                    Plus
                </template>
            </SidebarLeftTab>
        </div>

    </div>
</template>
