import {defineStore, acceptHMRUpdate} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const token = ref(null)

    const setUser = async (userData) => user.value = userData

    const getUser = computed(() => user.value)

    const setToken = async (tokenData) => token.value = tokenData

    const getToken = computed(() => token.value)

    const getUserStatus = computed(() => {
        if(!getUser.value) {
            return getUser.value
        }

        return user.value?.is_backoffice_user
    })

    const userName = computed(() => {
        if(!getUser.value) {
            return getUser.value
        }

        return `${getUser.value?.name} ${getUser.value?.soname}`
    })

    return {
        user,
        setUser,
        getUser,
        userName,
        getUserStatus,
        token,
        setToken,
        getToken
    }
})


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
