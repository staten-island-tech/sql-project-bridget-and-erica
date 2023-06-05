import { defineStore } from 'pinia'
import {supabase} from '../clients/supabase'

export const useLoggedStore = defineStore('logged', {
  state: () => ({
    logged: false //user is not logged in upon the site being loaded
  }),
  actions: {
    async logOut() {
      this.logged = false //logout function sets the 'logged' state to false, effectively logging the user out
      const {error} = await supabase.auth.signOut()
    }
  },
  persist: true //logged/logged-out state persists despite page refresh

})
