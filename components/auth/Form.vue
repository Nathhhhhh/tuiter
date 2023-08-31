<script setup>
const { login } = useAuth()

const form = reactive({
    password: '',
    username: ''
});

const handleLogin = async () => {
    await login({ username: form.username, password: form.password })
};

</script>
<template>
    <div>
        <div class="pt-5 space-y-6">
            <UIInput value="" label="Nom d'utilisateur" type="text" v-model="form.username" />
            <UIInput value="" label="Mot de passe" type="password" v-model="form.password" />
            <button @click="handleLogin" type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Se
                connecter</button>

        </div>
    </div>
</template>