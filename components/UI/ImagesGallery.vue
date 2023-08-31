<script setup>

const props = defineProps({
    imagesUrls: {
        type: Array,
        required: true
    }
})

const imageSelected = ref(null);

const fullscreenDiv = ref(null);

const displayImage = (url) => {
    console.log("image triggered")
    imageSelected.value = url
    fullscreenDiv.value.classList.remove('hidden')
    document.body.classList.add('overflow-hidden')

};

const closeImage = () => {
    imageSelected.value = null
    fullscreenDiv.value.classList.add('hidden')
    document.body.classList.remove('overflow-hidden')
};

</script>

<template>
    <!-- Div fullscreen for displaying images -->

    <div class="fixed top-0 left-0 z-50 flex items-center justify-center hidden w-screen h-screen overflow-hidden bg-black "
        ref="fullscreenDiv">
        <Icon @click="closeImage"
            class="absolute top-0 right-0 z-20 w-20 h-20 p-2 mt-5 mr-5 text-white bg-black rounded-full cursor-pointer"
            name="ci:close-lg" />
        <img :src="imageSelected" alt="">
    </div>
    <div v-if="imagesUrls.length === 1" class="relative z-20 flex items-center justify-center">
        <div v-for="(inputImageUrl, key) in imagesUrls" :key="key"
            class="flex items-center justify-center w-full overflow-hidden rounded-xl bg-dim-200">
            <img class="cursor-pointer " @click="displayImage(inputImageUrl)" :src="inputImageUrl"
                alt="">
        </div>

    </div>
    <div v-else class="relative z-20 grid grid-cols-2 gap-2 overflow-hidden rounded-xl">
        <div v-for="(inputImageUrl, key) in imagesUrls" :key="key"
            class="flex items-center justify-center overflow-hidden bg-dim-200">
            <img @click="displayImage(inputImageUrl)" :src="inputImageUrl" alt=""
                class="relative z-50 scale-150 cursor-pointer">
        </div>
    </div>
</template>
