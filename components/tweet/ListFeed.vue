<script setup>
const props = defineProps({
    tweets: {
        type: Array,
        required: true
    }
});


</script>

<template>
    <div>

        <ul>
            <Tweet v-for="tweet in props.tweets" :key="tweet.id" :tweet="tweet" />
        </ul>
    </div>
</template>