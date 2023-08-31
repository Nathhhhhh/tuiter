<script setup>
const loading = ref(false);
const { useAuthUser } = useAuth();
const user = useAuthUser();

const { getHomeTweets } = useTweets()

const { defaultBorderColor } = UseTailwindConfig();

const homeTweets = ref(null);


const updateTweets = async () => {
    const { tweets } = await getHomeTweets()
    homeTweets.value = tweets
}

provide('updateTweets', updateTweets)

onBeforeMount(async () => {
    loading.value = true
    try {
        const { tweets } = await getHomeTweets()
        homeTweets.value = tweets
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
});
</script>

<template>
    <div>
        <MainSection title="Accueil" :loading="loading">

            <Head>
                <Title>Home - Tuiter</Title>
            </Head>
            <div class="border-b" :class="defaultBorderColor">
                <TweetForm :user="user" />
            </div>

            <TweetListFeed :tweets="homeTweets"></TweetListFeed>
        </MainSection>
    </div>
</template>