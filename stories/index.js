// import Vue from 'vue'

import { storiesOf } from '@storybook/vue'

import highlight from '../components/slices/highlight.vue'
let slice = {
  'highlight_thumbnail': {},
  'highlight_caption': [],
  'highlight_embed': {
    'version': '1.0',
    'type': 'video',
    'html': '<iframe src="https://fast.wistia.net/embed/iframe/ab1gguez86?action=show&controller=embed%2Fiframe&controlsVisibleOnLoad=true&id=ab1gguez86&pageUrl=&playerColor=3d434c&version=v1" title="Wistia video player" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="960" height="400"></iframe>\n<script src="https://fast.wistia.net/assets/external/E-v1.js" async></script>',
    'width': 960,
    'height': 400,
    'provider_name': 'Wistia, Inc.',
    'provider_url': 'https://wistia.com',
    'title': '0804_ScaleFlexibility_Online_V1',
    'thumbnail_url': 'https://embed-ssl.wistia.com/deliveries/5ae8df8c1a447b43d64b09f6f824ea68e682bbc0.jpg?image_crop_resized=960x400',
    'thumbnail_width': 960,
    'thumbnail_height': 400,
    'duration': 60.634,
    'embed_url': 'http://fast.wistia.com/embed/iframe/ab1gguez86?version=v1&controlsVisibleOnLoad=true&playerColor=3d434c'
  },
  'highlight_body': [
    {
      'type': 'heading3',
      'text': 'Scale & Flexibility.',
      'spans': []
    },
    {
      'type': 'paragraph',
      'text': 'Millenia Office represents the dawn of the next major business movement in California, situated on 28 acres with huge entitlements of over 2.5 million square feet in place. These entitlements, brought forward by motivated city officials will allow for a major business region to be established where other markets around California are struggling to find space and affordability in desirable locations.',
      'spans': []
    }
  ],
  'highlight_placement': 'Left'
}

storiesOf('highlight', module)
  .add('story as a template', () => `<highlight :slice="${slice}">story as a function template</highlight>`)
  .add('story as a component', () => ({
    components: { highlight },
    template: `<highlight :slice="${slice}">rounded</highlight>`
  }))
