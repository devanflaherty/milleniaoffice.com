export default function ({ store, route }) {
  store.dispatch('layout/toggleMobileNav', false)
  store.dispatch('layout/toggleNavVis', false)
}
