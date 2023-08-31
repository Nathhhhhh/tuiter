<script setup>
const { defaultBorderColor, defaultTransition } = UseTailwindConfig()
const props = defineProps({
    title: {
        type: String,
        required: true
    }
});

</script>

<template>
    <div class="m-2 overflow-hidden bg-gray-200 border rounded-2xl dark:bg-dim-700" :class="defaultBorderColor">
        <h1 class="p-3 text-2xl font-extrabold text-gray-900 border-b dark:text-white " :class="defaultBorderColor"> {{ props.title }}</h1>
        <slot></slot>
        <div :class="defaultTransition" class="p-3 text-sm text-blue-400 hover:bg-gray-100 dark:hover:bg-dim-300">
            Voir plus
        </div>
    </div>
</template>  