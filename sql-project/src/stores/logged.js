import { defineStore } from 'pinia'

export const useLoggedStore = defineStore('logged', {
  state: () => ({
    logged: false //user is not logged in upon the site being loaded
  }),
  actions: {
    logOut() {
      this.logged = false //logout function sets the 'logged' state to false, effectively logging the user out
    }
  },
  persist: true //logged/logged-out state persists despite page refresh

})
