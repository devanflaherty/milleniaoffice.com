<template>
<footer class="footer">
  <svg class="seperator" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#20242c" width="100%" height="120" viewBox="0 0 4 0.266661" preserveAspectRatio="none" style="height: 120px;"><polygon class="fil0" points="4,0 4,0.266661 -0,0.266661 "></polygon></svg>
  
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h2 class="title">{{$prismic.asText(footer_title)}}</h2>
          <div class="rich-text" v-html="$prismic.asHtml(footer_content)"></div>
        </div>

        <!-- Form Column -->
        <div class="column">
          <form @submit.prevent="onSubmit">
            <!-- First Name -->
            <div class="field">
              <div class="control has-icons-right">
                <input class="input" type="text" v-model.lazy="contact.firstName" name="firstName" 
                  placeholder="First Name" 
                  v-validate="'required'" 
                  :class="{'is-danger': errors.has('firstName') }">
                <transition name="pop">
                  <span class="icon is-small is-right" v-if="fields.firstName.valid">
                    <i class="fa fa-check"></i>
                  </span>
                </transition>
              </div>
            </div>

            <!-- Last Name -->
            <div class="field">
              <!-- <label class="label">Last Name</label> -->
              <div class="control has-icons-right">
                <input class="input" type="text" v-model.lazy="contact.lastName" name="lastName" 
                  placeholder="Last Name" 
                  v-validate="'required'" 
                  :class="{'is-danger': errors.has('lastName') }">
                
                <transition name="pop">
                  <span class="icon is-small is-right" v-if="fields.lastName.valid">
                    <i class="fa fa-check"></i>
                  </span>
                </transition>
              </div>
            </div>

            <!-- EMAIL -->
            <div class="field">
              <!-- <label class="label">Email</label> -->
              <div class="control has-icons-right">
                <input class="input" type="email" v-model.lazy="contact.email" name="email" placeholder="Email"
                  v-validate="'required|email'"
                  :class="{'is-danger': errors.has('email') }">
                
                <transition name="pop">
                  <span class="icon is-small is-right is-check" v-if="fields.email.valid">
                    <i class="fa fa-check"></i>
                  </span>
                </transition>
              </div>
            </div>

            <!-- MESSAGE -->
            <div class="field">
              <!-- <label class="label">Comments</label> -->
              <div class="control">
                <textarea class="textarea" v-model.lazy="contact.message" name="message" placeholder="Comments"
                  v-validate="'required'"
                  :class="{'is-danger': errors.has('message') }">
                </textarea>
              </div>
            </div>

            <input type="text" name="_gotcha" style="display:none" />

            <!-- SUBMIT BUTTON -->
            <div class="field is-grouped">
              <div class="control">
                <button @click="onSubmit" class="button is-primary" :class="{'is-loading': sending}">
                  <transition name="fade-in">
                    <span class="icon is-small" v-if="sent">
                      <i class="fa fa-check white"></i>
                    </span>
                  </transition>
                  <span v-if="!sent">Submit</span>
                  <span v-else>Sent</span>
                </button>
              </div>
            </div>
            <!-- Feedback -->
            <div class="feedback">
              <p class="notice" v-if="sent">Thank you for reaching out, someone will be with you in the next 4 hours.</p>
              
              <transition name="fade-in">
                <ul class="form-errors" v-if="errors.any()">
                  <li>
                    <span>Please make sure the form is completely filled out.</span>
                  </li>
                  <li v-if="this.errors.has('email')"><span>{{this.errors.first('email')}}</span></li>
                </ul>
              </transition>
            </div>
          </form>
        </div>
        <!-- close form column -->
      </div>
    </div>
  </div>

  <div class="footer__companyInfo">
    <nuxt-link class="footer__companyInfo__logo" to="http://www.chesnutproperties.com/">
      <img src="~assets/img/chesnut.png" class="chesnut">
    </nuxt-link>
    <nuxt-link class="footer__companyInfo__logo" to="http://www.jll.com/">
      <img src="~assets/img/jll.png" class="jll">
    </nuxt-link>
    <div class="footer__companyInfo__socialLinks">
      <a v-for="(s, i) in social" :key="i" v-if="social.length > 0" :href="$prismic.asLink(s.social_url)" target="_blank"><i class="fa" :class="s.social_icon"></i></a>
    </div>
    <p><small>Copyright @ 2017 Millenia Office / San Diego</small></p>
  </div>
</footer>
</template>

<script>
import axios from '~/plugins/axios'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      sending: false,
      sent: false,
      contact: {
        firstName: null,
        lastName: null,
        email: null,
        message: null
      }
    }
  },
  computed: {
    fullName () {
      return this.contact.firstName + ' ' + this.contact.lastName
    },
    ...mapGetters('layout', ['themeSettings']),
    footer_title () {
      return this.themeSettings.footer_title
    },
    footer_content () {
      return this.themeSettings.footer_content
    },
    contact_email () {
      return this.themeSettings.contact_email
    },
    social () {
      return this.themeSettings.social
    }
  },
  methods: {
    onSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.post()
        }
      })
    },
    post () {
      this.sending = true
      axios.post('https://formspree.io/hello@devanflaherty.com', {
        'name': this.fullName,
        'email': this.contact.email,
        'message': this.contact.message,
        '_subject': 'Contact from' + this.fullName
      }).then(res => {
        this.sending = false
        this.sent = true
        this.clean()
      }).catch(err => {
        console.log(err)
      })
    },
    clean () {
      const clear = async () => {
        this.contact.firstName = null
        this.contact.lastName = null
        this.contact.email = null
        this.contact.message = null
      }
      clear().then(() => {
        this.$validator.reset()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.footer {
  background: none;
  padding: 0;
  position: relative;
  .seperator {
    margin-bottom: -8px;
  }
  .section {
    background: $dark-blue;
    color: $dark-blue-invert;
    h2 {
      color: $primary;
      font-size: 5rem;
    }
    p {
      margin-bottom: 1.5rem;
    }

    form {
      margin-top: 1.5rem;
      input, textarea {
        border-radius: 0;
        padding: 2rem 1rem;
        font-weight: 200;
        border: none;
        box-shadow: none;
      }
      textarea {
        padding: 1rem;
      }
      ::placeholder {
        color: $black;
      }
      .button {
        padding: 1rem 2rem;
      }
    }
  }
  &__companyInfo {
    padding-top: 4rem;
    padding-bottom: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: $dark-blue;
    color: $dark-blue-invert;
    &__logo {
      margin-bottom: 3rem;
      img {
        width: 100px;
      }
    }
    &__socialLinks {
      margin-bottom: 3rem;
      a {
        color: $primary;
        margin: 0 .5rem;
      }
    }
    p small {
      font-size: .66rem;
    }
  }
}
</style>

