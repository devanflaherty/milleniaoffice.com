export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
}

// import Vuex from 'vuex'

// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       primaryColor: '#000',
//       backgroundColor: '#fff',
//       loading: true,
//       navVis: false,
//       mobileNav: false,
//       breakpoint: 0,
//       navigationMenu: null,
//       connectMenu: null,
//       contact: {
//         newBusiness: null,
//         general: null
//       },
//       teamSlugs: null
//     },
//     getters: {
//       primaryColor: state => {
//         return state.primaryColor
//       },
//       backgroundColor: state => {
//         return state.backgroundColor
//       },
//       loading: state => {
//         return state.loading
//       },
//       navVis: state => {
//         return state.navVis
//       },
//       mobileNav: state => {
//         return state.mobileNav
//       },
//       breakpoint: state => {
//         return state.breakpoint
//       },
//       navigationMenu: state => {
//         return state.navigationMenu
//       },
//       connectMenu: state => {
//         return state.connectMenu
//       },
//       contact: state => {
//         return state.contact
//       },
//       teamSlugs: state => {
//         return state.teamSlugs
//       }
//     },
//     mutations: {
//       SET_PRIMARY_COLOR (state, color) {
//         state.primaryColor = color
//       },
//       SET_BACKGROUND_COLOR (state, color) {
//         state.backgroundColor = color
//       },
//       TOGGLE_LOADING (state, bool) {
//         state.loading = bool
//       },
//       TOGGLE_NAV_VIS (state, bool) {
//         state.navVis = bool
//       },
//       TOGGLE_MOBILE_NAV (state, bool) {
//         state.mobileNav = bool
//       },
//       CHANGE_BREAKPOINT (state, bp) {
//         state.breakpoint = bp
//       },
//       SET_NAVIGATION_MENU (state, menu) {
//         state.navigationMenu = menu
//       },
//       SET_CONNECT_MENU (state, menu) {
//         state.connectMenu = menu
//       },
//       SET_CONTACT (state, obj) {
//         state.contact = obj
//       },
//       SET_TEAM_SLUGS (state, array) {
//         state.teamSlugs = array
//       }
//     },
//     actions: {
//       setBackgroundColor (context, color) {
//         context.commit('SET_BACKGROUND_COLOR', color)
//         let el = document.querySelector('.bgSpan')

//         let updateBg = () => {
//           el.style.backgroundColor = color
//         }
//         window.requestAnimationFrame(updateBg)
//       },
//       setPrimaryColor (context, color) {
//         context.commit('SET_PRIMARY_COLOR', color)
//       },
//       toggleLoading (context, bool) {
//         context.commit('TOGGLE_LOADING', bool)
//       },
//       toggleNavVis (context, bool) {
//         context.commit('TOGGLE_NAV_VIS', bool)
//       },
//       toggleMobileNav (context, bool) {
//         context.commit('TOGGLE_MOBILE_NAV', bool)
//       },
//       changeBreakpoint (context, bp) {
//         context.commit('CHANGE_BREAKPOINT', bp)
//       },
//       async getMenus (context) {
//         this.$prismic.initApi().then((ctx) => {
//           ctx.api.getSingle('menu').then((res) => {
//             context.commit('SET_NAVIGATION_MENU', res.data.navigation_menu)
//             context.commit('SET_CONNECT_MENU', res.data.connect_menu)

//             let contact = {
//               newBusiness: res.data.new_business,
//               general: res.data.general
//             }
//             context.commit('SET_CONTACT', contact)
//           })
//         })
//       },
//       getTeamSlugs (context, slugs) {
//         context.commit('SET_TEAM_SLUGS', slugs)
//       }
//     }
//   })
// }

// export default createStore
