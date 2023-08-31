<script setup>

const props = defineProps({
    tweet: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="hover:bg-gray-100 dark:hover:bg-dim-700">
        <TweetItem :tweet="props.tweet" v-if="props.tweet.replyTo?.length === 0" />
    </div>
    <div class="" v-if="props.tweet.replyTo.length > 0">
        <TweetItem :tweet="props.tweet.replyTo[0]" :replyTo="true"/>
        <TweetItem :tweet="props.tweet" :reply="true"/>
    </div>
</template>