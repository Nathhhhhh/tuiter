<script setup>

const {defaultBorderColor} = UseTailwindConfig()

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
});

</script>


<template>
    <div class="border-x" :class="defaultBorderColor">
        <div class="sticky top-0 z-30 flex items-center gap-5 px-4 py-3 bg-white/80 backdrop-blur-md dark:bg-dim-900/80">
            <Icon class="text-2xl cursor-pointer dark:text-white" name="ooui:arrow-previous-ltr" @click="this.$router.go(-1)" />
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100"> {{ props.title }}</h2>
        </div>
        <div v-if="props.loading" class="flex items-center justify-center p-4 mt-5 border-b" :class="defaultBorderColor">
            <UISpinner/>
        </div>
        <div v-else>
        </div>
        <slot>

        </slot>
    </div>
</template>