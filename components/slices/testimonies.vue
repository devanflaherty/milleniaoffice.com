<template>
  <article class="section testimonies">
    <div class="container">
      <h2 class="title testimonies__title has-text-primary has-text-centered"
        v-scroll-reveal="{distance: '100px'}">What people are saying.</h2>
      <hr>

      <blockquote id="quote" class="testimonies__quote"
        v-scroll-reveal="{distance: '100px', delay: '250'}">
        <div class="quote" v-html="$prismic.asHtml(activeQuote.quote)"></div>
        <p class="author">{{activeQuote.author}}</p>
      </blockquote>
    </div>
    
    <div class="testimonies__arrows">
      <a href="#" @click.prevent="changeTestimony('prev')" class="testimonies__arrows__arrow">
        <i class="fa fa-chevron-left"></i>
      </a>

      <a href="#" @click.prevent="changeTestimony('next')" class="testimonies__arrows__arrow">
        <i class="fa fa-chevron-right"></i>
      </a>
    </div>
  </article> 
</template>

<script>
import {TimelineMax} from 'gsap'

export default {
  props: ['quotes'],
  data () {
    return {
      activeIndex: 0,
      activeQuote: this.quotes[0],
      length: this.quotes.length
    }
  },
  methods: {
    animateQuote (dir) {
      let quoteTl = new TimelineMax()
      let quote = document.querySelector('.quote')
      let author = document.querySelector('.author')

      let anime = (offset) => {
        quoteTl
          .to(quote, 0.5, {
            x: offset,
            autoAlpha: 0
          })
          .to(author, 0.25, {
            y: 60,
            autoAlpha: 0
          }, 0)
          .addCallback(() => {
            this.activeQuote = this.quotes[this.activeIndex]
          })
          .set(quote, {
            x: offset * -1,
            autoAlpha: 0
          })
          .to(quote, 0.5, {
            x: 0,
            autoAlpha: 1
          })
          .to(author, 0.5, {
            y: 0,
            autoAlpha: 1
          }, 0.5)
      }
      if (dir === 'next') {
        anime(200)
      } else {
        anime(-200)
      }
    },
    changeTestimony (dir) {
      let lengthI = this.length - 1
      let vm = this
      async function setIndex () {
        let index = () => {
          if (dir === 'prev') {
            let prevIndex = vm.activeIndex - 1
            if (prevIndex >= 0) {
              return prevIndex
            } else if (prevIndex < 0) {
              return lengthI
            }
          }

          if (dir === 'next') {
            let nextIndex = vm.activeIndex + 1
            if (nextIndex <= lengthI) {
              return nextIndex
            } else {
              return 0
            }
          }
        }

        return {'index': index(), 'dir': dir}
      }

      setIndex().then((nav) => {
        console.log(nav.index)
        this.activeIndex = nav.index
        this.animateQuote(nav.dir)
        // Quote is updated in animation callback
      })
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins'; 
.testimonies {
  position: relative;
  padding: 6rem 0;
  hr {
    width: 6rem;
    height: .33rem;
    margin: 0 auto;
    background: $primary;
  }
  &__quote {
    .quote {
     font-size: 40px;
     text-align: center;
     font-weight: 400;
     line-height: 1.25;
     letter-spacing: .25px;
     width: 75%;
     margin: 2rem auto;
     @include mobile() {
      width: 90%;
      font-size: 1.66rem;
     }
     strong {
       font-weight: 400;
       position: relative;
       display: inline-block;
       &:before {
         z-index: -1;
         content: '';
         display: inline-block;
         background: $primary;
         height: 30px;
         width: 95%;
         position: absolute;
         top: 1.5rem;
         left: 2rem;
         @include mobile() {
           top: .75rem;
           height: 20px;
         }
       }
     }
    }
    .author {
      margin-top: 2rem;
      text-align: center;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 2px;
    }
  }
  &__arrows {
    position: absolute;
    padding: 0 2rem;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include mobile() {
      height: 95%;
      align-items: flex-end;
    }
    &__arrow {
      font-size: 2rem;
      color: $black;
      transition: all 0.5s ease;
      @include mobile() {
        font-size: 1.25rem;
      }
      &:hover {
        color: $primary;
        transform: scale(1.2);
      }
    }
  }
}
</style>


