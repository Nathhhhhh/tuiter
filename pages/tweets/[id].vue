<script setup>
const { getTweetById } = useTweets()

const loading = ref(false);
const { useAuthUser } = useAuth();
const user = useAuthUser();

const tweet = ref(null)


async function getTweet() {
    try {
        loading.value = true
        const response = await getTweetById(useRoute().params.id)
        tweet.value = response.tweet
        console.log(response)
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
onBeforeMount(async () => {
    await getTweet()
});
</script>

<template>
    <div>
        <MainSection title="Tweet" :loading="loading">

            <Head>
               
                <Title>  Tweet - Tuiter</Title>
            </Head>

            <ul>
                <TweetDetail :tweet="tweet" :user="user" v-if="loading === false" />
            </ul>
        </MainSection>
    </div>
</template>