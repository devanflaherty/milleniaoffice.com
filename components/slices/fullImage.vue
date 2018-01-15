<template>
  <article class="slice__fullWidthImage" :class="slicePosition" v-if="fullImage.full_image.large.url">
    <img :src="fullImage.full_image.large.url" :alt="fullImage.full_image.alt"
      v-scroll-reveal="{distance: '100px', delay: '250'}">
  </article>
</template>

<script>
export default {
  props: ['slice', 'position', 'total'],
  data () {
    return {
      fullImage: this.slice.primary
    }
  },
  computed: {
    slicePosition () {
      return {
        'pull-to-footer': this.position === this.total
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.pull-to-footer {
  margin-bottom: -10%;
  @include mobile () {
    margin-bottom: -35%;
  }
  @include tablet () {
    margin-bottom: -20%;
  }
}
</style>
