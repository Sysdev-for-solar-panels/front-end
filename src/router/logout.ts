import { useLoginCheckerStore } from '@/stores/loginChecker';
import router from '@/router'

const store = useLoginCheckerStore()

export const logout = async () => {
    store.logout()
    store.setRole()
    await fetch('http://localhost:5235/api/logout', {
        method: "GET",
        credentials:"include",
        mode: "cors",
    })
    router.push('/')
}