<script setup>
const { $swal } = useNuxtApp()

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['onSubmit'])

const fileInput = ref(null)


const form = ref({
    content: '',
    selectedFile: []
})

const inputImageUrls = ref([])



const handleForm = () => {

    emit('onSubmit', {
        content: form.value.content,
        mediaFiles: form.value.selectedFile
    })

};

const handleFileUpload = () => {
    fileInput.value.click()
};


const handleFileChange = (e) => {
    const files = e.target.files

    if (form.value.selectedFile.length > 4 || files.length > 4) {
        $swal.fire({
            title: 'Nombre d\'images limité à 4',
            icon: 'error',
        })
    } else {

        Array.from(files).forEach((file) => {
            form.value.selectedFile.push(file)

            const reader = new FileReader()

            reader.onload = (e) => {
                inputImageUrls.value.push(e.target.result)
            }
            reader.readAsDataURL(file)
        });
    }



};

</script>

<template>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
        <form class="w-full p-2" @submit.prevent="handleForm">
            <div class="flex flex-col">
                <div class="flex " :class="{'mb-5' : inputImageUrls.length > 0}">
                    <div class="flex items-start w-12">
                        <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full">
                    </div>
                    <textarea v-model="form.content" placeholder="Ecrire un tuit"
                        class="w-full h-10 overflow-y-hidden text-lg text-gray-900 bg-transparent border-0 placeholder:text-gray-400 focus:ring-0 dark:text-white"></textarea>

                </div>
                <UIImagesGallery :imagesUrls="inputImageUrls" />
            </div>
            <div class="flex justify-between p-2 mt-5">
                <div>
                    <div class="p-1 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800">
                        <Icon @click="handleFileUpload" name="iconamoon:file-image" class="w-5 h-5 " />
                        <input @change="handleFileChange" type="file" class="hidden" ref="fileInput"
                            accept="image/png, image/gif, image/jpeg" multiple>
                    </div>
                </div>
                <div class="">
                    <button type="submit" class="px-5 py-2 rounded-full bg-dim-100 dark:text-white">Tuiter</button>
                </div>
            </div>


        </form>
    </div>
</template>