import Vue from 'vue'
import SweetScroll from 'sweet-scroll'
/*
Options
{
  trigger: "[data-scroll]",       // Selector for trigger (must be a valid css selector)
  header: "[data-scroll-header]", // Selector for fixed header (must be a valid css selector)
  duration: 1000,                 // Specifies animation duration in integer
  delay: 0,                       // Specifies timer for delaying the execution of the scroll in milliseconds
  easing: "easeOutQuint",         // Specifies the pattern of easing
  offset: 0,                      // Specifies the value to offset the scroll position in pixels
  verticalScroll: true,           // Enable the vertical scroll
  horizontalScroll: false,        // Enable the horizontal scroll
  stopScroll: true,               // When fired wheel or touchstart events to stop scrolling
  updateURL: false,               // Update the URL hash on after scroll (true | false | "push" | "replace")
  preventDefault: true,           // Cancels the container element click event
  stopPropagation: true,          // Prevents further propagation of the container element click event in the bubbling phase
  outputLog: false,               // Specify level of output to log
  quickMode: false,               // Instantly scroll to the destination! (It's recommended to use it with `easeOutExpo`)

  // Callbacks
  beforeScroll: null,
  afterScroll: null,
  cancelScroll: null,
  completeScroll: null,
  stepScroll: null
}
*/

var defaultOptions = {
  duration: 1000,
  easing: 'easeOutExpo',
  offset: 0,
  stopScroll: true,
  preventDefault: true
}
var mySweetScroll = {
  install: function install (Vue) {
    Vue.prototype.$ss = function (el, options) {
      if (!options) {
        options = defaultOptions
      }
      const sweetScroll = new SweetScroll(options)
      return sweetScroll
    }
    Vue.mixin({
      methods: {
        scrollTo (el) {
          this.sweetScroll.to(el)
        }
      }
    })
    Vue.directive('sweet-scroll', {
      inserted: function inserted (el, binding) {
        let options = binding.value || {}
        if (!options) {
          options = defaultOptions
        }

        if (binding.modifiers) {
          if (binding.modifiers.reset) {
            options.reset = true
          }

          if (binding.modifiers.nomobile) {
            options.mobile = false
          }
        }

        // sr.reveal(el, options)
      }
    })
  }
}

Vue.use(mySweetScroll)
