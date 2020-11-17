'use strict';Object.defineProperty(exports,'__esModule',{value:true});var ClickOutside=require('vue-click-outside');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var ClickOutside__default=/*#__PURE__*/_interopDefaultLegacy(ClickOutside);function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = {
  name: "VueTailwindcssTypeahead",
  directives: {
    ClickOutside: ClickOutside__default['default']
  },
  props: {
    lists: {
      type: Array,
      default: []
    },
    ignoredList: {
      type: Array,
      default: []
    },
    clearInputWhenClicked: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Search here...'
    },
    inputClass: {
      type: Array,
      default: ['w-full', 'px-5', 'py-3', 'border', 'border-gray-400', 'rounded-lg', 'outline-none', 'focus:shadow-outline']
    }
  },
  data: function data() {
    return {
      search: "",
      selectedItem: "",
      showSearchItems: false,
      isMouseOverList: false,
      searchItemList: this.lists
    };
  },
  computed: {
    filteredList: function filteredList() {
      var _this = this;

      return this.searchItemList.filter(function (item) {
        return item.name.toLowerCase().includes(_this.search.toLowerCase()) && !_this.checkIgnoreListItem(item.id);
      });
    },
    classProps: function classProps() {
      return _toConsumableArray(this.inputClass);
    }
  },
  methods: {
    selectSearchItem: function selectSearchItem(item) {
      this.search = item.name;
      this.selectedItem = item.name;
      this.showSearchItems = false;
      this.$emit('selected', item);

      if (this.clearInputWhenClicked) {
        this.search = '';
      }
    },
    checkIgnoreListItem: function checkIgnoreListItem(itemId) {
      if (this.ignoredList.length > 0) {
        var result = this.ignoredList.some(function (ignoreListItem) {
          return ignoreListItem == itemId;
        });
        return result;
      }

      return false;
    },
    hideMenu: function hideMenu() {
      if (this.showSearchItems == true) {
        this.showSearchItems = false;
      }
    }
  },
  created: function created() {
    var _this2 = this;

    if (this.selectedData != 0) {
      var selected = this.lists.filter(function (item) {
        if (item.id == _this2.selectedData) {
          return true;
        }

        return false;
      });
      this.selectedItem = selected[0].name;
      this.search = selected[0].name;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.hideMenu,
      expression: "hideMenu"
    }],
    staticClass: "w-full"
  }, [_vm._ssrNode("<div class=\"mt-1 flex rounded-md shadow-sm\"><input type=\"text\"" + _vm._ssrAttr("placeholder", _vm.placeholder) + " aria-label=\"Search\"" + _vm._ssrAttr("value", _vm.search) + _vm._ssrClass(null, _vm.classProps) + "></div> " + (_vm.filteredList.length > 0 && _vm.showSearchItems == true ? "<aside role=\"menu\" aria-labelledby=\"menu-heading\" class=\"absolute z-10 flex flex-col items-start w-64 bg-white border rounded-md shadow-md mt-1\"><ul class=\"flex flex-col w-full\">" + _vm._ssrList(_vm.filteredList, function (item, index) {
    return "<li class=\"px-2 py-3 space-x-2 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none \">" + _vm._ssrEscape(_vm._s(item.name)) + "</li>";
  }) + "</ul></aside>" : "<!---->"))]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-5b9e3e32";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);// Import vue component

var install = function installVueTailwindcssTypeahead(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueTailwindcssTypeahead', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;