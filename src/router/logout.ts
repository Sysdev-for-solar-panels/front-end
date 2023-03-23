import { useLoginCheckerStore } from '@/stores/loginChecker';
import router from '@/router'
import { RouterView } from 'vue-router';

const store = useLoginCheckerStore()

export const logout = () => {
    store.logout()
    store.setRole()
    router.push('/')
    
}