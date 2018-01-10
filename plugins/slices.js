import Vue from 'vue'

import responsiveMedia from '~/components/slices/responsiveMedia'
import interactiveExperience from '~/components/slices/interactiveExperience'
import highlight from '~/components/slices/highlight'
import campusSelector from '~/components/slices/campusSelector'
import testimonies from '~/components/slices/testimonies'
import columnedContent from '~/components/slices/columnedContent'
import banner from '~/components/slices/banner'
import fullImage from '~/components/slices/fullImage'
import gallery from '~/components/slices/gallery'
import richText from '~/components/slices/richText'
// import quote from '~/components/slices/quote'

// Utilities
import videoEmbed from '~/components/utilities/videoEmbed'
// import captionedImage from '~/components/utilities/captionedImage'
// import heroLoader from '~/components/utilities/heroLoader'
// import blurLoader from '~/components/utilities/blurLoader'

Vue.component('responsiveMedia', responsiveMedia)
Vue.component('interactiveExperience', interactiveExperience)
Vue.component('highlight', highlight)
Vue.component('campusSelector', campusSelector)
Vue.component('testimonies', testimonies)
Vue.component('columnedContent', columnedContent)
Vue.component('banner', banner)
Vue.component('fullImage', fullImage)
Vue.component('gallery', gallery)
Vue.component('richText', richText)
// Vue.component('quote', quote)

Vue.component('videoEmbed', videoEmbed)
// Vue.component('captionedImage', captionedImage)
// Vue.component('heroLoader', heroLoader)
// Vue.component('blurLoader', blurLoader)
