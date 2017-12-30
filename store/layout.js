export const state = () => ({
  loading: true,
  navVis: false,
  mobileNav: false,
  breakpoint: 0,
  navigationMenu: {
    display_name: '',
    nav: []
  },
  themeSettings: {
    footer_title: [],
    footer_content: [],
    contact_email: null,
    location: [],
    contacts: [],
    social: []
  }
})

export const getters = {
  loading: state => {
    return state.loading
  },
  navVis: state => {
    return state.navVis
  },
  mobileNav: state => {
    return state.mobileNav
  },
  breakpoint: state => {
    return state.breakpoint
  },
  navigationMenu: state => {
    return state.navigationMenu
  },
  themeSettings: state => {
    return state.themeSettings
  }
}

export const mutations = {
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  TOGGLE_NAV_VIS (state, bool) {
    state.navVis = bool
  },
  TOGGLE_MOBILE_NAV (state, bool) {
    state.mobileNav = bool
  },
  CHANGE_BREAKPOINT (state, bp) {
    state.breakpoint = bp
  },
  SET_NAVIGATION_MENU (state, menu) {
    state.navigationMenu = menu
  },
  SET_THEME_SETTINGS (state, settings) {
    state.themeSettings = settings
  }
}

export const actions = {
  toggleLoading (context, bool) {
    context.commit('TOGGLE_LOADING', bool)
  },
  toggleNavVis (context, bool) {
    context.commit('TOGGLE_NAV_VIS', bool)
  },
  toggleMobileNav (context, bool) {
    context.commit('TOGGLE_MOBILE_NAV', bool)
  },
  changeBreakpoint (context, bp) {
    context.commit('CHANGE_BREAKPOINT', bp)
  },
  async getMenus (context) {
    this.$prismic.initApi().then((ctx) => {
      ctx.api.getSingle('menu').then((res) => {
        context.commit('SET_NAVIGATION_MENU', res.data)
      }).catch(err => {
        console.error(err)
      })
    })
  },
  async getSettings (context) {
    this.$prismic.initApi().then((ctx) => {
      ctx.api.getSingle('theme_settings').then((res) => {
        context.commit('SET_THEME_SETTINGS', res.data)
      }).catch(err => {
        console.error(err)
      })
    })
  }
}
