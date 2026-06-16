import { defineStore } from 'pinia'

export const useWsStore = defineStore('wsStore', {
  state: () => ({
    message: '',
    senzori: {
      hranire: {
        label: 'Hrănire animale',
        interval: 12 * 60 * 60 * 1000,
        timeLeft: 12 * 60 * 60 * 1000,
        active: false
      },
      adapare: {
        label: 'Adăpare animale',
        interval: 8 * 60 * 60 * 1000,
        timeLeft: 8 * 60 * 60 * 1000,
        active: false
      },
      vaccin: {
        label: 'Vaccin animale',
        interval: 7 * 24 * 60 * 60 * 1000,
        timeLeft: 7 * 24 * 60 * 60 * 1000,
        active: false
      },
      test: {
        label: 'Test senzor (15 sec)',
        interval: 15 * 1000,
        timeLeft: 15 * 1000,
        active: false
      }
    }
  }),

  actions: {
    startAll() {
      setInterval(() => {
        for (const key in this.senzori) {
          const senzor = this.senzori[key]
          if (!senzor.active) {
            senzor.timeLeft -= 1000
            if (senzor.timeLeft <= 0) {
              senzor.active = true
              senzor.timeLeft = senzor.interval
            }
          }
        }
      }, 1000)
    },

    resetSenzor(key) {
      if (this.senzori[key]) {
        this.senzori[key].active = false
        this.senzori[key].timeLeft = this.senzori[key].interval
      }
    }
  }
})
