import Vue from 'vue'

if (process.browser) {
  require('waypoints/lib/noframework.waypoints.js')
  require('waypoints/lib/shortcuts/inview.js')
}

var VueWaypoint = {
  install: function install (Vue) {
    Vue.directive('waypoint', function (el, binding, vnode) {
      var waypointType = 'waypoint'

      // Allows us to emit to the directive component
      var emit = (vnode, name, data) => {
        var handlers = (vnode.data && vnode.data.on) ||
          (vnode.componentOptions && vnode.componentOptions.listeners)

        if (handlers && handlers[name]) {
          handlers[name].fns(data)
        }
      }

      var options = binding.value || {}

      if (binding.modifiers) {
        if (binding.modifiers.inview) {
          waypointType = 'inview'
        }
        if (binding.modifiers.once) {
          options.destroy = true
        }
        if (binding.modifiers.down) {
          options.direction = 'down'
        }
        if (binding.modifiers.up) {
          options.direction = 'up'
        }
      }

      if (binding.value) {
        if (binding.value.offset) {
          options.offset = binding.value.offset
        } else {
          options.offset = 0
        }
      }

      /* eslint-disable  */
      if (waypointType === 'waypoint') {
        new Waypoint({
          element: el,
          handler: function (direction) {
            if (options.direction && options.direction == direction) {
              emit(vnode, 'collision', {el: el, direction: direction})        
            } else if (!options.direction) {
              emit(vnode, 'collision', {el: el, direction: direction})
            }
            if (options.destroy) {
              this.destroy()
            }
          },
          offset: options.offset
        })
      } else {
        new Waypoint.Inview({
          element: el,
          enter: function(direction) {
            if (options.direction && options.direction == direction) {
              emit(vnode, 'enter' , {el: el, direction: direction})
            } else {
              emit(vnode, 'enter' , {el: el, direction: direction})
            }
          },
          entered: function(direction) {
            if (options.direction && options.direction == direction) {
              emit(vnode, 'entered' , {el: el, direction: direction})
            } else {
              emit(vnode, 'entered' , {el: el, direction: direction})
            }
          },
          exit: function(direction) {
            if (options.direction && options.direction == direction) {
              emit(vnode, 'exit' , {el: el, direction: direction})
            } else {
              emit(vnode, 'exit' , {el: el, direction: direction})
            }
          },
          exited: function(direction) {
            if (options.direction && options.direction == direction) {
              emit(vnode, 'exited' , {el: el, direction: direction})
            } else {
              emit(vnode, 'exited' , {el: el, direction: direction})
            }
          },
          offset: options.offset
        })
      }
      /* eslint-enable */
    })
  }
}

/* eslint-disable */
Vue.use(VueWaypoint)

export default (ctx, inject) => {
  inject('waypoint', new Vue({
    methods: {
      destroyWaypoints () {
        Waypoint.destroyAll()
      }
    }
  }))
}
/* eslint-enable */
