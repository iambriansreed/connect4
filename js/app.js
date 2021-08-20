/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  text-align: center;\n}\n\n#template {\n  display: none;\n}\n\n#board {\n  position: relative;\n  height: 81vmin;\n  width: 72vmin;\n  margin: 5vh auto 2vh;\n  display: flex;\n  flex-wrap: wrap;\n}\n#board .wrap {\n  position: relative;\n  height: 72vmin;\n  width: 72vmin;\n  display: flex;\n  flex-wrap: wrap;\n}\n#board .wrap .left,\n#board .wrap .right {\n  position: absolute;\n  background: blue;\n  width: 0.85vmin;\n  height: 72vmin;\n}\n#board .wrap .bottom {\n  position: absolute;\n  background: blue;\n  bottom: -0.75vmin;\n  left: -0.75vmin;\n  height: 0.95vmin;\n  width: 73.5vmin;\n}\n#board .wrap .left {\n  top: 0;\n  left: -0.75vmin;\n}\n#board .wrap .right {\n  top: 0;\n  right: -0.75vmin;\n}\n#board .grid {\n  height: 9vmin;\n  width: 9vmin;\n  position: relative;\n  z-index: 2;\n}\n#board .grid.space {\n  position: relative;\n  background: radial-gradient(ellipse at center, rgba(0, 0, 255, 0) 1%, rgba(0, 0, 255, 0) 51%, rgba(0, 0, 255, 0.3) 52%, rgba(0, 0, 255, 0.5) 54%, blue 55%, blue 100%);\n}\n#board .grid.space.player1 {\n  background: radial-gradient(ellipse at center, rgba(0, 0, 255, 0) 1%, rgba(0, 0, 255, 0) 51%, rgba(0, 0, 255, 0.3) 52%, rgba(0, 0, 255, 0.5) 54%, blue 55%, blue 100%), red;\n}\n#board .grid.space.player2 {\n  background: radial-gradient(ellipse at center, rgba(0, 0, 255, 0) 1%, rgba(0, 0, 255, 0) 51%, rgba(0, 0, 255, 0.3) 52%, rgba(0, 0, 255, 0.5) 54%, blue 55%, blue 100%), #eeee03;\n}\n#board .grid.button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n#board .grid.button button {\n  outline: none !important;\n  cursor: pointer;\n  padding: 0;\n  border-radius: 9vmin;\n  background: #eee;\n  display: block;\n  width: 70%;\n  height: 70%;\n}\n#board .checker {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 9vmin;\n  height: 9vmin;\n}\n#board .checker div {\n  width: 7.2vmin;\n  height: 7.2vmin;\n  border-radius: 9vmin;\n  box-shadow: inset 0 0 10px #000;\n  font-weight: bold;\n  line-height: 7vmin;\n  font-size: 5vmin;\n  text-shadow: rgba(0, 0, 0, 0.05) 1px 0 3px;\n}\n#board .checker.player1 div {\n  background: red;\n  color: #ff2929;\n}\n#board .checker.player2 div {\n  background: #eeee03;\n  color: #f3f303;\n}\n#board.turn-player1 button:hover {\n  background: red;\n}\n#board.turn-player2 button:hover {\n  background: #eeee03;\n}\n#board .blocker {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 2;\n}\n\n#game-tie,\n#game-over,\n#game-start {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100;\n  background-color: rgba(0, 0, 0, 0.75);\n}\n#game-tie .modal,\n#game-over .modal,\n#game-start .modal {\n  background: #fff;\n  position: absolute;\n  z-index: 101;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.75);\n  padding: 3vmin 5vmin;\n  border-radius: 2vmin;\n}\n#game-tie .modal p,\n#game-over .modal p,\n#game-start .modal p {\n  margin-bottom: 2vmin;\n}\n#game-tie .modal h1,\n#game-over .modal h1,\n#game-start .modal h1 {\n  font-size: 3rem;\n  margin-bottom: 2vmin;\n}\n\n.btn {\n  background: #eee;\n  border: solid 1px #aaa;\n  border-radius: 2vmin;\n  padding: 1.125vmin 1.25vmin;\n  font: inherit;\n  cursor: pointer;\n  font-size: 110%;\n  font-weight: 500;\n}", "",{"version":3,"sources":["webpack://./src/reset.css","webpack://./src/style.scss"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAiFE,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;ACCF;;ADEA;EACE,sBAAA;ACCF;;AA1FA;EACI,0JAAA;EAEA,kBAAA;AA4FJ;;AAxEA;EACI,aAAA;AA2EJ;;AAxEA;EACI,kBAAA;EACA,cAAA;EACA,aAAA;EACA,oBAAA;EACA,aAAA;EACA,eAAA;AA2EJ;AA1EI;EACI,kBAAA;EACA,cAAA;EACA,aAAA;EACA,aAAA;EACA,eAAA;AA4ER;AAxEQ;;EAEI,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;AA0EZ;AAvEQ;EACI,kBAAA;EACA,gBAAA;EACA,iBAAA;EACA,eAAA;EACA,gBAAA;EACA,eAAA;AAyEZ;AAtEQ;EACI,MAAA;EACA,eAAA;AAwEZ;AAtEQ;EACI,MAAA;EACA,gBAAA;AAwEZ;AApEI;EACI,aA/DD;EAgEC,YAhED;EAiEC,kBAAA;EACA,UAAA;AAsER;AArEQ;EACI,kBAAA;EACA,sKAnEK;AA0IjB;AAtEY;EA1DR,2KAAA;AAmIJ;AAtEY;EA7DR,+KAAA;AAsIJ;AArEQ;EACI,aAAA;EACA,mBAAA;EACA,uBAAA;AAuEZ;AAtEY;EACI,wBAAA;EACA,eAAA;EACA,UAAA;EACA,oBArFT;EAsFS,gBAAA;EACA,cAAA;EACA,UAAA;EACA,WAAA;AAwEhB;AAnEI;EACI,kBAAA;EACA,MAAA;EACA,OAAA;EACA,UAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAtGD;EAuGC,aAvGD;AA4KP;AAnEQ;EACI,cAAA;EACA,eAAA;EACA,oBA5GL;EA6GK,+BAAA;EAEA,iBAAA;EACA,kBAAA;EACA,gBAAA;EACA,0CAAA;AAoEZ;AAjEY;EACI,eAxHD;EAyHC,cAAA;AAmEhB;AA/DY;EACI,mBA7HD;EA8HC,cAAA;AAiEhB;AA3DQ;EACI,eAtIG;AAmMf;AApDQ;EACI,mBA/IG;AAqMf;AA9CI;EACI,aAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,UAAA;AAgDR;;AAjCA;;;EAGI,aAAA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,qCAAA;AAoCJ;AAnCI;;;EACI,gBAAA;EACA,kBAAA;EACA,YAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,wCAAA;EACA,oBAAA;EACA,oBAAA;AAuCR;AAtCQ;;;EACI,oBAAA;AA0CZ;AAxCQ;;;EACI,eAAA;EACA,oBAAA;AA4CZ;;AAvCA;EACI,gBAAA;EACA,sBAAA;EACA,oBAAA;EACA,2BAAA;EACA,aAAA;EACA,eAAA;EACA,eAAA;EACA,gBAAA;AA0CJ","sourcesContent":["html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n* {\n  box-sizing: border-box;\n}","@import \"reset\";\nbody {\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif,\n        \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n    text-align: center;\n}\n\n$player1color: red;\n$player2color: rgb(238, 238, 3);\n$size: 9vmin;\n\n$gradientCircle: radial-gradient(\n    ellipse at center,\n    rgba(0, 0, 255, 0) 1%,\n    rgba(0, 0, 255, 0) 51%,\n    rgba(0, 0, 255, 0.3) 52%,\n    rgba(0, 0, 255, 0.5) 54%,\n    rgba(0, 0, 255, 1) 55%,\n    rgba(0, 0, 255, 1) 100%\n);\n@mixin space-bg($checker) {\n    background: $gradientCircle, $checker;\n}\n\n#template {\n    display: none;\n}\n\n#board {\n    position: relative;\n    height: $size * 9;\n    width: $size * 8;\n    margin: 5vh auto 2vh;\n    display: flex;\n    flex-wrap: wrap;\n    .wrap {\n        position: relative;\n        height: 9vmin * 8;\n        width: 9vmin * 8;\n        display: flex;\n        flex-wrap: wrap;\n\n        $wrap: 0.75vmin;\n\n        .left,\n        .right {\n            position: absolute;\n            background: blue;\n            width: $wrap + 0.1vmin;\n            height: 9vmin * 8;\n        }\n\n        .bottom {\n            position: absolute;\n            background: blue;\n            bottom: -($wrap);\n            left: -$wrap;\n            height: $wrap + 0.2vmin;\n            width: (9vmin * 8) + ($wrap * 2);\n        }\n\n        .left {\n            top: 0;\n            left: -($wrap);\n        }\n        .right {\n            top: 0;\n            right: -$wrap;\n        }\n    }\n\n    .grid {\n        height: $size;\n        width: $size;\n        position: relative;\n        z-index: 2;\n        &.space {\n            position: relative;\n            background: $gradientCircle;\n            &.player1 {\n                @include space-bg($player1color);\n            }\n            &.player2 {\n                @include space-bg($player2color);\n            }\n        }\n        &.button {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            button {\n                outline: none !important;\n                cursor: pointer;\n                padding: 0;\n                border-radius: $size;\n                background: #eee;\n                display: block;\n                width: 70%;\n                height: 70%;\n            }\n        }\n    }\n\n    .checker {\n        position: absolute;\n        top: 0;\n        left: 0;\n        z-index: 1;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: $size;\n        height: $size;\n\n        div {\n            width: $size - 1.8vmin;\n            height: $size - 1.8vmin;\n            border-radius: $size;\n            box-shadow: inset 0 0 10px #000;\n\n            font-weight: bold;\n            line-height: 7vmin;\n            font-size: 5vmin;\n            text-shadow: rgb(0 0 0 / 5%) 1px 0 3px;\n        }\n        &.player1 {\n            div {\n                background: $player1color;\n                color: lighten($player1color, 8%);\n            }\n        }\n        &.player2 {\n            div {\n                background: $player2color;\n                color: lighten($player2color, 1%);\n            }\n        }\n    }\n\n    &.turn-player1 {\n        button:hover {\n            background: $player1color;\n        }\n        // .checker {\n        //     div {\n        //         background: $player1color;\n        //     }\n        // }\n    }\n    &.turn-player2 {\n        button:hover {\n            background: $player2color;\n        }\n        // .checker {\n        //     div {\n        //         background: $player2color;\n        //     }\n        // }\n    }\n    .blocker {\n        display: none;\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        right: 0;\n        z-index: 2;\n    }\n\n    // .spaces {\n    //     position: relative;\n    //     z-index: 2;\n    //     border: solid 10px blue;\n    //     overflow: hidden;\n    //     width: ($size * 8) + 20px;\n    //     height: ($size * 8) + 20px;\n\n    //     }\n    // }\n}\n\n#game-tie,\n#game-over,\n#game-start {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 100;\n    background-color: rgba(0, 0, 0, 0.75);\n    .modal {\n        background: #fff;\n        position: absolute;\n        z-index: 101;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.75);\n        padding: 3vmin 5vmin;\n        border-radius: 2vmin;\n        p {\n            margin-bottom: 2vmin;\n        }\n        h1 {\n            font-size: 3rem;\n            margin-bottom: 2vmin;\n        }\n    }\n}\n\n.btn {\n    background: #eee;\n    border: solid 1px #aaa;\n    border-radius: 2vmin;\n    padding: 1.125vmin 1.25vmin;\n    font: inherit;\n    cursor: pointer;\n    font-size: 110%;\n    font-weight: 500;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomMinMax": () => (/* binding */ getRandomMinMax),
/* harmony export */   "showElements": () => (/* binding */ showElements),
/* harmony export */   "hideElements": () => (/* binding */ hideElements),
/* harmony export */   "getRanges": () => (/* binding */ getRanges),
/* harmony export */   "getPossibleMatchSets": () => (/* binding */ getPossibleMatchSets),
/* harmony export */   "wait": () => (/* binding */ wait),
/* harmony export */   "listToArray": () => (/* binding */ listToArray)
/* harmony export */ });
function getRandomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function showElements(...elements) {
    elements.forEach((el) => (el.style.display = 'inherit'));
}
function hideElements(...elements) {
    elements.forEach((el) => (el.style.display = 'none'));
}
function getRanges(x, y) {
    return {
        VerticalBottomToTop: () => {
            const range = [];
            let testY = y + 0, maxRange = 3;
            // 3 up
            while (--testY > -1 && range.length < maxRange) {
                range.push([x, testY]);
            }
            range.reverse();
            range.push([x, y]);
            testY = y + 0;
            maxRange = range.length + 3;
            // 3 down
            while (++testY < 8 && range.length < maxRange) {
                range.push([x, testY]);
            }
            return range;
        },
        HorizontalLeftToRight: () => {
            const range = [];
            let testX = x + 0, maxRange = 3;
            // 3 left
            while (--testX > -1 && range.length < maxRange) {
                range.push([testX, y]);
            }
            range.reverse();
            range.push([x, y]);
            testX = x + 0;
            maxRange = range.length + 3;
            // 3 right
            while (++testX < 8 && range.length < maxRange) {
                range.push([testX, y]);
            }
            return range;
        },
        DiagonalBottomLeftToTopRight: () => {
            const range = [];
            let testX = x + 0, testY = y + 0, maxRange = 3;
            // 3 left
            while (--testX > -1 && --testY > -1 && range.length < maxRange) {
                range.push([testX, testY]);
            }
            range.reverse();
            range.push([x, y]);
            testX = x + 0;
            testY = y + 0;
            maxRange = range.length + 3;
            // 3 right
            while (++testX < 8 && ++testY < 8 && range.length < maxRange) {
                range.push([testX, testY]);
            }
            return range;
        },
        DiagonalTopLeftToBottomRight: () => {
            const range = [];
            let testX = x + 0, testY = y + 0, maxRange = 3;
            // 3 left
            while (--testX > -1 && ++testY < 8 && range.length < maxRange) {
                range.push([testX, testY]);
            }
            range.reverse();
            range.push([x, y]);
            testX = x + 0;
            testY = y + 0;
            maxRange = range.length + 3;
            // 3 right
            while (++testX < 8 && --testY > -1 && range.length < maxRange) {
                range.push([testX, testY]);
            }
            return range;
        },
    };
}
function getPossibleMatchSets(x, y) {
    const rangeTypes = getRanges(x, y);
    return [
        rangeTypes.DiagonalBottomLeftToTopRight(),
        rangeTypes.DiagonalTopLeftToBottomRight(),
        rangeTypes.HorizontalLeftToRight(),
        rangeTypes.VerticalBottomToTop(),
    ]
        .filter((points) => points.length >= 4)
        .reduce((sets, range) => {
        if (range.length > 4) {
            sets.push(range.slice(0, 4));
            sets.push(range.reverse().slice(0, 4).reverse());
        }
        else {
            sets.push(range);
        }
        return sets;
    }, []);
}
function wait(time, willReject = false) {
    return new Promise((resolve, reject) => setTimeout(() => (willReject ? reject() : resolve()), time));
}
function listToArray(list) {
    return Array.prototype.slice.call(list);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");


const Players = {
    player1: "player1",
    player2: "player2",
};
const config = {
    dropSpeed: 300,
    defaultState: {
        currentPlayer: Players.player1,
        aiPlayers: [Players.player2],
        history: [],
    },
};
Object.freeze(Players);
Object.freeze(config);
function Connect4() {
    const app = initialize();
    const state = Object.assign({}, config.defaultState);
    function initialize() {
        const getElements = (selector) => Array.from(document.querySelectorAll(selector));
        const getElement = (selector) => getElements(selector)[0];
        const app = {
            board: getElement("#board"),
            blocker: getElement("#board .blocker"),
            gameOver: getElement("#game-over"),
            gameTie: getElement("#game-tie"),
            gameStart: getElement("#game-start"),
            resetBtns: getElements(".reset-btn"),
            startBtn: getElement("#start-btn"),
            buttons: getElements("#board button"),
            spacesWrapper: getElements("#board .spaces"),
            turnColor: getElements(".turn-color"),
            checkerTemplate: getElement("#template .checker"),
        };
        // const resizeBoard = () => {
        //     let h = app.board.offsetHeight;
        //     let w = app.board.offsetWidth;
        //     const smallestSize = Math.min(h, w);
        //     const grid = (smallestSize - (smallestSize % 9)) / 9;
        //     h = grid * 9;
        //     w = grid * 8;
        //     app.board.style.width = `${w}px`;
        //     app.board.style.height = `${h}px`;
        // };
        // resizeBoard();
        app.startBtn.onclick = start;
        app.resetBtns.forEach((button) => (button.onclick = reset));
        app.buttons.forEach((button, x) => (button.onclick = () => dropChecker(x)));
        Object.freeze(app);
        return app;
    }
    function start() {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.hideElements)(app.gameStart);
        app.board.className = "turn-" + state.currentPlayer;
    }
    function reset() {
        const oldCheckers = Array.from(document.getElementsByClassName("checker"));
        oldCheckers.forEach((c) => (c.style.top = window.outerHeight + window.outerHeight / 2 + "px"));
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(1000).then(() => oldCheckers.forEach((c) => c.remove()));
        updateState(config.defaultState);
        app.board.className = "turn-" + state.currentPlayer;
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.hideElements)(app.gameOver);
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.hideElements)(app.gameTie);
    }
    function getPlayer(x, y) {
        return (state.history.find((p) => p.x === x && p.y === y) || {}).player;
    }
    function setChecker(x, y, player) {
        updateState({
            history: [...state.history, { x, y, player }],
        });
    }
    function updateState(update) {
        return Object.assign(state, update);
    }
    function checkForWin(x, y) {
        const sets = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPossibleMatchSets)(x, y);
        return sets.some((set) => set.every((pos) => getPlayer(...pos) === state.currentPlayer));
        return false;
    }
    function checkForTie() {
        return state.history.length === 64;
    }
    function dropChecker(x) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.showElements)(app.blocker);
        const y = getAvailableY(x);
        if (y < 0)
            return;
        return animateChecker(x, y).then(() => {
            setChecker(x, y, state.currentPlayer);
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.hideElements)(app.blocker);
            if (checkForWin(x, y)) {
                return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(250).then(() => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.showElements)(app.gameOver));
            }
            if (checkForTie()) {
                return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(250).then(() => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.showElements)(app.gameTie));
            }
            toggleTurn();
            if (state.aiPlayers.includes(state.currentPlayer)) {
                return aiMove();
            }
            return Promise.resolve();
        });
    }
    function animateChecker(x, y) {
        y = Math.abs(y - 7) + 1;
        const ms = (config.dropSpeed / 4) * y;
        const clone = app.checkerTemplate.cloneNode(true);
        app.board.appendChild(clone);
        const o = app.board.lastChild;
        o.classList.add(state.currentPlayer);
        setTimeout(() => {
            o.style.transition = "";
        }, ms + 100);
        o.style.transition = `top ${ms}ms linear`;
        o.style.left = x * 9 + "vmin";
        o.style.display = "";
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(50).then(() => {
            o.style.top = y * 9 + "vmin";
            return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(ms + 300);
        });
    }
    function getAvailableY(x) {
        for (let y = 0; y < 8; y++) {
            if (!getPlayer(x, y))
                return y;
        }
        return -1;
    }
    function aiMove() {
        const lastPos = state.history[state.history.length - 1];
        const sortFilterSets = (matchSets, player) => matchSets
            .map((set) => ({
            matches: set.filter((pos) => getPlayer(...pos) === player).length,
            moves: set.filter((pos) => getAvailableY(pos[0]) === pos[1]),
        }))
            .filter((moveSets) => moveSets.moves.length > 0)
            .sort((a, b) => {
            if (a.matches === b.matches) {
                if (a.moves > b.moves)
                    return -1;
                if (a.moves < b.moves)
                    return 1;
                return 0;
            }
            if (a.matches > b.matches)
                return -1;
            if (a.matches < b.matches)
                return 1;
            return 0;
        });
        const possibleMatchSets = state.history.length ? (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPossibleMatchSets)(lastPos.x, lastPos.y) : [];
        let x = null;
        const offensiveMovesSets = sortFilterSets(possibleMatchSets, state.currentPlayer);
        // TODO: check for easy 3 matches and
        // looks for any oponent matches and makes blocking move recomendations
        const defensiveMovesSets = sortFilterSets(possibleMatchSets, lastPos.player);
        if (defensiveMovesSets.length) {
            // defensive
            defensiveMovesSets.some((defensiveMovesSet) => {
                let defensiveMove = defensiveMovesSet.moves[0];
                // check if defensiveMove has a follow up win
                // check if next y exists if it doesn't don't wory about it
                if (defensiveMove[1] === 7) {
                    x = defensiveMove[0];
                    return true;
                }
                // check if the next y move has 3 in a row
                const predictiveMove = [defensiveMove[0], defensiveMove[1] + 1];
                const predictiveMatchSets = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPossibleMatchSets)(predictiveMove[0], predictiveMove[1])
                    .map((set) => ({
                    matches: set.filter((pos) => getPlayer(...pos) === lastPos.player).length,
                }))
                    .sort((a, b) => {
                    if (a.matches > b.matches)
                        return -1;
                    if (a.matches < b.matches)
                        return 1;
                    return 0;
                });
                if (predictiveMatchSets.every((predictiveMatchSet) => predictiveMatchSet.matches < 3)) {
                    x = defensiveMove[0];
                    return true;
                }
            });
        }
        if (!x) {
            x = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomMinMax)(0, 7);
            while (getAvailableY(x) === -1) {
                if (++x > 7)
                    x = 0;
            }
        }
        return dropChecker(x);
    }
    function toggleTurn() {
        const currentPlayer = state.currentPlayer === Players.player1 ? Players.player2 : Players.player1;
        updateState({ currentPlayer });
        const currentPlayerName = currentPlayer[0].toUpperCase() + currentPlayer.substr(1);
        app.board.className = "turn-" + currentPlayer;
        app.turnColor.forEach((el) => (el.innerText = currentPlayerName));
        return Promise.resolve();
    }
}
Connect4();

})();

/******/ })()
;
//# sourceMappingURL=app.js.map