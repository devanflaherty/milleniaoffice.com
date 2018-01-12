<template>
  <article class="slice__tabPanel section">
    <div class="container">
      <div class="tabs slice__tabPanel__tabs">
        <ul>
          <li v-for="(tab, i) in tabs" :key="i" :class="{'is-active': activeIndex === i}">
            <a :href="`#${tab.tab_label}`" @click.prevent="switchTab(i)">{{tab.tab_label}}</a>
          </li>
        </ul>
      </div>

      <transition name="fade-in" appear>
        <div v-if="tabsReady" class="slice__tabPanel__tabContainer" :style="`height: ${height}`"> 
          <div class="slice__tabPanel__tabContainer__wrap"
            :style="{'left': wrapPosition, 'width': wrapWidth}">
            <div class="slice__tabPanel__tabContainer__block" v-for="(tab, i) in tabs" :key="i" 
              :class="{'slice__tabPanel__tabContainer__block--is-active': activeIndex === i}"
              :style="flexWidth">
              <gallery :galleryID="tab.gallery.id" v-if="tab.gallery.id" />
              <img v-if="tab.image.url" :src="tab.image.large.url">
            </div>
          </div>
        </div>
      </transition>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      tabs: this.slice.items,
      activeIndex: 0,
      activeTab: this.slice.items[0],
      height: 0,
      wrapPosition: 0
    }
  },
  computed: {
    flexWidth () {
      let blockWidth = 100 / this.tabs.length
      return `flex: 1 0 ${blockWidth}%`
    },
    wrapWidth () {
      let wrapWidth = 100 * this.tabs.length
      return `${wrapWidth}%`
    },
    tabsReady () {
      if (this.wrapWidth) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    switchTab (i) {
      this.wrapPosition = `-${i * 100}%`
      this.activeTab = this.tabs[i]
      this.activeIndex = i
    }
  },
  mounted () {
    if (this.tabsReady) {
      let item = document.querySelector('.slice__tabPanel__tabContainer__block > *:first-child')
      if (item) {
        this.height = item.offsetHeight + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slice__tabPanel {
  &__tabs {
    a {
      transition: all 0.5s ease;
    }
  }
  &__tabContainer {
    width: 100%;
    display: flex;
    align-items: flex-start;
    overflow: hidden;
    position: relative;
    &__wrap {
      left: 0;
      top: 0;
      width: 100%;
      position: absolute;
      display: flex;
      align-items: flex-start;
    }
    &__block {
      visibility: hidden;
      opacity: 0;
      &--is-active {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>

