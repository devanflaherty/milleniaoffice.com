require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(3);





var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

app.set('port', port);

// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */]);

// Import and Set Nuxt.js options
var config = __webpack_require__(5);
config.dev = !("development" === 'production');

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__(4);




var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__users__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);


var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Mock Users
var users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users);
});

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Jarvis = __webpack_require__(6);
var UglifyJSWebpackPlugin = __webpack_require__(7);

var url = 'https://milleniaoffice.co';
var title = 'Millenia Office';
var desc = 'Millenia Office is an amenity rich cluster of three world-class campuses designed to facilitate a new paradigm of how and where people want to work.';
var unfurl = url + '/unfurl.jpg';

module.exports = {
  /*
  ** Headers of the page
  */
  analyze: true,
  extractCSS: true,
  head: {
    titleTemplate: '%s - Millenia Office',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'theme-color', content: '#ffffff' }, { name: 'robots', content: 'all' }, { hid: 'description', name: 'description', content: desc }, { hid: 'og:url', property: 'og:url', content: url }, { hid: 'og:image', property: 'og:image', content: unfurl }, { hid: 'og:title', property: 'og:title', content: title }, { hid: 'og:description', property: 'og:description', content: desc }, { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }, { hid: 'twitter:domain', name: 'twitter:domain', value: url }, { hid: 'twitter:title', name: 'twitter:title', value: title }, { hid: 'twitter:description', name: 'twitter:description', value: desc }, { hid: 'twitter:image', name: 'twitter:image', content: unfurl }, { hid: 'twitter:url', name: 'twitter:url', value: url }],
    link: [{ hid: 'image_src', rel: 'image_src', href: unfurl }],
    script: [{
      src: 'https://fast.wistia.com/assets/external/E-v1.js',
      async: true
    }, {
      src: 'http://www.youtube.com/player_api'
    }]
  },
  loading: { color: '#bcdae7', height: '4px' },
  /*
  ** Global CSS
  */
  css: [{ src: '~assets/styles/main.scss', lang: 'scss' }],
  modules: ['@nuxtjs/pwa', '@nuxtjs/font-awesome'
  // ['@nuxtjs/google-analytics', { ua: 'UA-108368424-1' }]
  ],
  plugins: [{ src: '~plugins/vue-rellax', ssr: false }, { src: '~plugins/vue-lazyload', ssr: false }, { src: '~plugins/vue-youtube-embed', ssr: false }, { src: '~plugins/vue-sweet-scroll', ssr: false }, { src: '~plugins/vue-scroll-reveal', ssr: false }, { src: '~plugins/vue-swiper', ssr: false }, { src: '~plugins/vee-validate', ssr: false }, { src: '~mixins/utilities' }, { src: '~plugins/slices' }, { src: '~plugins/prismic' }],
  router: {
    middleware: ['toggleNav'],
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
      // savedPosition is only available for popstate navigations.
      if (savedPosition) {
        return savedPosition;
      } else {
        var position = {};
        // if no children detected
        if (to.matched.length < 2) {}
        // scroll to the top of the page
        // position = { x: 0, y: 0 }

        // if link has anchor,  scroll to anchor by returning the selector
        if (to.hash) {
          // let hash = this.$route.hash
          // this.scrollTo(hash, 100)
          position = { selector: to.hash };
        }
        return position;
      }
    }
  },
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'sweet-scroll', 'scrollreveal'],
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    },
    // plugins: [
    //   new UglifyJSWebpackPlugin()
    // ],
    extend: function extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.plugins.push(new Jarvis());
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("webpack-jarvis");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("uglifyjs-webpack-plugin");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map