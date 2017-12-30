<template>
  <section>
    <h1>Contact</h1>
    <ul id="contacts">
      <li class="contact" v-for="(c, index) in contacts" :key="index" v-if="contacts">
        <h5 class="contact__title">{{c.contact_branch}}</h5>
        <div v-html="$prismic.asHtml(c.contact_info)"></div>
      </li>
    </ul>

    <div id="location" class="contact" v-if="location">
      <h5 class="contact__title">Location</h5>
      <div v-html="$prismic.asHtml(location)"></div>
    </div>

    <div id="social" class="contact">
      <h5 class="contact__title">Follow Us</h5>
      <ul class="contact__social">
        <li class="contact__social__item" v-for="(s, index) in social" :key="index" v-if="social.length > 0">
          <a :href="$prismic.asLink(s.social_url)" target="_blank"><i class="fa" :class="s.social_icon"></i></a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  head () {
    return {
      title: 'Contact'
    }
  },
  computed: {
    ...mapGetters('layout', ['themeSettings']),
    location () {
      return this.themeSettings.location
    },
    contacts () {
      return this.themeSettings.contacts
    },
    social () {
      return this.themeSettings.social
    }
  },
  created () {
    this.$store.dispatch('layout/toggleLoading', true)
  },
  mounted () {
    if (this.themeSettings) {
      this.$store.dispatch('layout/toggleNavVis', true)
      this.$store.dispatch('layout/toggleLoading', false)

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })
    }
  }
}
</script>
