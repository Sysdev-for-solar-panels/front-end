import { useLoginCheckerStore } from '@/stores/loginChecker';
import router from '@/router'

const store = useLoginCheckerStore()

export const logout = async () => {
    await fetch('http://localhost:5235/api/logout', {
        mode: 'cors',
        method: "GET",
    })
    store.logout()
    store.setRole()
    router.push('/')
}