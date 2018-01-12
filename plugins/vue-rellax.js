import Vue from 'vue'

let Rellax = require('rellax/rellax')

var myRellax = {
  install: function install (Vue) {
    Vue.prototype.$rellax = function (target, options) {
      const initRellax = (target, options) => {
        let rellax = new Rellax(target, options) // eslint-disable-line
      }

      initRellax(target, options)
    }
  }
}

Vue.use(myRellax)
