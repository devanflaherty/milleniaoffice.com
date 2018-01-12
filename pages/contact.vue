<template>
  <section class="contact-page">
    <header class="section page__header">
      <transition name="fade-in" appear>
        <div class="page__header__image rellax" v-if="contact.hero_image.url" :style="`background-image: url(${entry.hero_image.large.url}) `"
          data-rellax-speed="-4" data-rellax-percentage="0.5"></div>
      </transition>
      <div class="container rellax" data-rellax-speed="-2" data-rellax-percentage="0.5">
        <h2>{{$prismic.asText(contact.title)}}
        </h2>
        <div class="rich-text has-text-white" v-html="$prismic.asHtml(contact.description)"></div>
      </div>
      <div class="page__header__separator">
        <svg class="page__header__separator__polygon" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#fff" width="100%" height="120" viewBox="0 0 4 0.266661" preserveAspectRatio="none" style="height: 120px;"><polygon class="fil0" points="4,0 4,0.266661 -0,0.266661 "></polygon></svg>
      </div>
    </header>

    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <ul id="contacts">
              <li class="contact" v-for="(c, index) in contacts" :key="index" v-if="contacts">
                <h5 class="contact__title">{{c.contact_branch}}</h5>
                <div class="rich-text contact__text" v-html="$prismic.asHtml(c.contact_info)"></div>
              </li>
            </ul>
          </div>

          <div class="column">
            <div id="social" class="contact">
              <h5 class="contact__title">Follow Us</h5>
              <ul class="contact__social">
                <li class="contact__social__item" v-for="(s, index) in social" :key="index" v-if="social.length > 0">
                  <a :href="$prismic.asLink(s.social_url)" target="_blank"><i class="fa" :class="s.social_icon"></i></a>
                </li>
              </ul>
            </div>

            <div id="location" class="contact" v-if="location">
              <h5 class="contact__title">Location</h5>
              <div class="rich-text contact__text" v-html="$prismic.asHtml(location)"></div>
            </div>
          </div>
        </div><!-- close columns -->

      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
if (process.client) {
  let Rellax = require('rellax') // eslint-disable-line
}

export default {
  head () {
    return {
      title: 'Contact'
    }
  },
  asyncData ({ app, params, error }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getByUID('pages', 'contact').then((res) => {
        return {
          document: res,
          contact: res.data
        }
      })
    }).catch(err => {
      console.error(err)
      if (err) {
        error({statusCode: 404, message: 'The page you are looking for does not exist.'})
      }
    })
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
    if (this.document && this.themeSettings) {
      this.$store.dispatch('layout/toggleNavVis', true)
      this.$store.dispatch('layout/toggleLoading', false)

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })

      let rellax = new Rellax('.rellax') // eslint-disable-line
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';

.contact-page {
  margin-top: 100px;
  .contact {
    margin-bottom: 4rem;
    &__title {
      color: $primary;
      font-size: 1.5rem;
    }
    &__text {
      p {
        font-size: 2.75rem;
        line-height: 1.25;
        @include mobile () {
          font-size: 2.25rem;
        }
      }
      a {
        color: $black;
        font-weight: 500;
        transition: color 0.5s ease;
        &:hover {
          color: darken($primary, 20%)!important;
        }
        @include mobile () {
          font-size: 1.625rem;
        }
      }
    }
    &__social {
      display: flex;
      &__item {
        font-size: 2.75rem;
        margin-right: 2rem;
        i {
          color: $black;
        }
      }
    }
  }
}
</style>