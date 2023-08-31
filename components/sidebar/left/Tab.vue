<script setup>
const { defaultTransition } = UseTailwindConfig();

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
});

const textClasses = computed(() => props.active ? 'font-semibold' : 'font-normal');

</script>

<template>
    <NuxtLink to="#" class="flex items-center p-3 rounded-full w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white" :class="defaultTransition">
        <div class="text-dark" >
            <slot name="icon"></slot>
        </div>
        <div class="hidden ml-4 text-xl xl:block" :class="textClasses">
            <slot name="name"></slot>
        </div>
    </NuxtLink>
</template>