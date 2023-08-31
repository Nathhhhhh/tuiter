<script setup>
import localizedFormat from 'dayjs/plugin/localizedFormat'
const dayjs = useDayjs()
dayjs.extend(localizedFormat)
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    replyTo: {
        type: Boolean,
        required: false
    },
    reply: {
        type: Boolean,
        required: false
    },
    tweetDetail: {
        type: Boolean,
        required: false,
        default: false
    }
});


const author = ref(props.tweet.author)

const mediaFilesUrl = ref(props.tweet.mediaFiles.map((file) => file.url))

const isTweetLikedByCurrentUser = ref([]);

const likesCount = ref(0)


const updateLike = async () => {
    isTweetLikedByCurrentUser.value = []
    isTweetLikedByCurrentUser.value.push(...await useFetchApi('/api/user/likes', {
        method: 'GET'
    }))
    likesCount.value = await useFetchApi(`/api/tweets/likes?tweetId=${props.tweet.id}`, {
        method: 'GET'
    })
}


const handleLike = async (e) => {
    if (e.target.classList.contains('heart-like')) {
        e.target.classList.remove('heart-like')
    } else {
        e.target.classList.add('is_animating')
    }
    const like = new Promise(async (resolve, reject) => {
        await useFetchApi('/api/user/likes', {
            method: 'POST',
            body: {
                tweetId: props.tweet.id
            }
        }).then((data) =>
            resolve(data)
        ).catch((err) => reject(err))

    })
    like.then((res) => {
        updateLike()
    })

}

onBeforeMount(async () => {
    await updateLike()
});

</script>

<template>
    <li class="relative px-10 hover:bg-gray-100 dark:hover:bg-dim-700"
        :class="{ 'border-b border-white dark:border-gray-700 pb-10': replyTo === false, 'pt-10': reply === false, 'pb-5': replyTo === true }">
        <NuxtLink :to="'tweets/' + props.tweet.id" class="absolute top-0 bottom-0 left-0 right-0 z-10" ref="link"
            v-if="!useRoute().params.id"></NuxtLink>
        <div v-if="replyTo" class="absolute top-0 bottom-0 z-10 w-10 mt-10 -translate-x-1/2 border-r-2 border-gray-400">
        </div>
        <div class="relative z-20 flex items-center">
            <div class="flex items-center w-full" :class="{'mb-5' : props.tweetDetail}">
                <img class="w-10 h-10 mr-4 rounded-full" :src="author.profileImage" alt="">
                <p class="w-auto font-light text-gray-800 dark:text-white" :class="{ 'flex flex-col': props.tweetDetail }">
                    <span class="mr-1">{{ author.name }}</span>
                    <span class="font-medium text-gray-400">{{ author.handle }}</span>
                </p>
                <p class="ml-auto text-gray-400"> {{ dayjs(props.tweet.createdAt).fromNow(true) }}</p>
            </div>
        </div>
        <div class="" :class="{ 'ml-0': props.tweetDetail, 'ml-14': !props.tweetDetail }">
            <p class="w-auto text-gray-800 dark:text-white" :class="{ 'mb-5': mediaFilesUrl.length > 0 }">
                {{ props.tweet.content }}
            </p>
            <div v-if="mediaFilesUrl.length > 0">
                <UIImagesGallery :images-urls="mediaFilesUrl" />
            </div>
        </div>
        <div v-if="props.tweetDetail" class="pb-2 mt-5 border-b border-white dark:border-gray-700">
            <span class="font-light text-gray-300">{{ dayjs(props.tweet.createdAt).format('LLL') }}</span>
        </div>
        <div v-if="props.tweetDetail" class="py-5 border-b border-white dark:border-gray-700">
            <div class="flex w-full gap-5 dark:text-white">
                <span> {{ likesCount }} <span class="font-light text-gray-300">J'aime</span></span>
                <span> {{ props.tweet.replies.length }}
                    <span v-if="props.tweet.replies.length <= 1" class="font-light text-gray-300">Réponse</span>
                    <span v-else class="font-light text-gray-300">Réponses</span>
                </span>
                <span> 14 <span class="font-light text-gray-300">Reposts</span></span>
                <span> 17 <span class="font-light text-gray-300">Signets</span></span>

            </div>
        </div>
        <div class="flex items-center pl-10"
            :class="{ 'border-b border-white dark:border-gray-700 py-2 ': props.tweetDetail, 'mt-5': !props.tweetDetail }">
            <div v-if="isTweetLikedByCurrentUser.find((like) => like.tweetId === props.tweet.id)"
                class="relative z-20 w-12 h-8 heart heart-like " @click="e => handleLike(e)"></div>
            <div v-else class="relative z-20 w-12 h-8 heart " @click="e => handleLike(e)"></div>
            <span class="dark:text-white" v-if="!props.tweetDetail"> {{ likesCount }}</span>
        </div>

    </li>
</template>

<style lang="scss">
.heart {
    cursor: pointer;
    background-image: url('https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
    background-position: left;
    background-repeat: no-repeat;
    background-size: 2900%;

    &.heart-like {
        background-position: right !important;
    }

    &:hover {
        background-position: right;
    }
}

.is_animating {
    animation: heart-burst .8s steps(28) 1;
}

@keyframes heart-burst {
    from {
        background-position: left;
    }

    to {
        background-position: right;
    }
}
</style>