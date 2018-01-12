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

      <div class="slice__tabPanel__tabContainer">
        <!-- {{activeTab}} -->
       <gallery :galleryID="activeTab.gallery.id" v-if="activeTab.gallery.id" />
       <img v-if="activeTab.image.url" :src="activeTab.image.large.url">
      </div>
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
      activeTab: this.slice.items[0]
    }
  },
  methods: {
    switchTab (i) {
      this.activeTab = this.tabs[i]
      this.activeIndex = i
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
  
  }
}
</style>

