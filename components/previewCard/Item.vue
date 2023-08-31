<script setup>

const {defaultBorderColor, defaultTransition} = UseTailwindConfig()

const classes = `${defaultBorderColor} ${defaultTransition}` 
</script>
<template>
    <div class="p-3 border-b hover:bg-gray-100 dark:hover:bg-dim-300" :class="classes">
        <slot></slot>
    </div>
</template>