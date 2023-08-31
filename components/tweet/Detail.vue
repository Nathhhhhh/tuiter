<script setup>
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    }
});

</script>


<template>
    <div>
        <!-- {{  props.tweet.author }} -->
        <TweetItem :tweet="props.tweet" :tweet-detail="true" />
        <TweetItem v-for="tweet in props.tweet.replies" :key="tweet.id" :tweet="tweet" />
    </div>
</template>