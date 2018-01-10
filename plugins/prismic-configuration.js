import PrismicDOM from 'prismic-dom'
let Elements = PrismicDOM.RichText.Elements

export default {
  apiEndpoint: 'https://millenia.cdn.prismic.io/api/v2',
  accessToken: 'MC5XandlY3lzQUFLWExvR3FJ.77-977-9MUjvv73vv73vv710JFPvv73vv73vv73vv71PPRvvv70r77-977-9J--_ve-_ve-_ve-_vXTvv73vv73vv70d77-9',

  linkResolver (doc) {
    // Define the url depending on the document type
    if (doc.type === 'home') return '/'
    if (doc.type === 'pages') {
      // Find the campus tag
      let campus = doc.tags.find((tag) => {
        return tag === 'campus'
      })

      // if it exists
      if (campus) { 
        return '/campus/' + doc.uid
      } else {
        return '/' + doc.uid
      }
    }
    return '/' + doc.uid
  },
  htmlSerializer (element, content, children) {
    switch (element.type) {
      // Don't wrap images in a <p> tag
      case Elements.image:
        return '<img src="' + element.url + '" alt="' + element.alt + '">'
      // Add a class to hyperlinks
      case Elements.embed:
        return (`
          <div class="responsive-video" style="padding: 56.25% 0 0 0"
            data-oembed="${element.oembed.embed_url}"
            data-oembed-type="${element.oembed.type}"
            data-oembed-provider="${element.oembed.provider_name}"
          >
            <style>
              iframe { height: 100%; left: 0; position: absolute; top: 0; width: 100%;" }
            </style>
            ${element.oembed.html}
          </div>
        `)
      // Return null to stick with the default behavior
      default: return null
    }
  }
}
