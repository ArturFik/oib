import {defineStore, acceptHMRUpdate} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)

    const setUser = async (userData) => user.value = userData

    const getUser = computed(() => user.value)

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

        return getUser.value?.username || 'Пользователь'
    })

    return {
        user,
        setUser,
        getUser,
        userName,
        getUserStatus
    }
})


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
