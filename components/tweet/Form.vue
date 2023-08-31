<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const { postTweet } = useTweets()

const loading = ref(false)

const updateTweets = inject('updateTweets')

const handleForm = async (data) => {
    loading.value = true
    try {
        const response = await postTweet({
            content: data.content,
            mediaFiles: data.mediaFiles
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    } finally {
        await updateTweets()

        loading.value = false
    }
};
</script>

<template>
    <div v-if="loading" class="flex items-center justify-center py-5">
        <UISpinner />
    </div>

    <div v-else>
        <TweetFormInput :user="props.user" @on-submit="handleForm" />
    </div>
</template>