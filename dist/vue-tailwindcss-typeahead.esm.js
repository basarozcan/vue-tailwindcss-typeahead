import ClickOutside from 'vue-click-outside';

//

var script = {
  name: "VueTailwindcssTypeahead",
  directives: {
    ClickOutside
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

  data() {
    return {
      search: "",
      selectedItem: "",
      showSearchItems: false,
      isMouseOverList: false,
      searchItemList: this.lists
    };
  },

  computed: {
    filteredList() {
      return this.searchItemList.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase()) && !this.checkIgnoreListItem(item.id);
      });
    },

    classProps() {
      return [...this.inputClass];
    }

  },
  methods: {
    selectSearchItem(item) {
      this.search = item.name;
      this.selectedItem = item.name;
      this.showSearchItems = false;
      this.$emit('selected', item);

      if (this.clearInputWhenClicked) {
        this.search = '';
      }
    },

    checkIgnoreListItem(itemId) {
      if (this.ignoredList.length > 0) {
        const result = this.ignoredList.some(ignoreListItem => {
          return ignoreListItem == itemId;
        });
        return result;
      }

      return false;
    },

    hideMenu() {
      if (this.showSearchItems == true) {
        this.showSearchItems = false;
      }
    }

  },

  created() {
    if (this.selectedData != 0) {
      const selected = this.lists.filter(item => {
        if (item.id == this.selectedData) {
          return true;
        }

        return false;
      });
      this.selectedItem = selected[0].name;
      this.search = selected[0].name;
    }
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
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
  }, [_c('div', {
    staticClass: "mt-1 flex rounded-md shadow-sm"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    ref: "searchBox",
    class: _vm.classProps,
    attrs: {
      "type": "text",
      "placeholder": _vm.placeholder,
      "aria-label": "Search"
    },
    domProps: {
      "value": _vm.search
    },
    on: {
      "input": [function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.search = $event.target.value;
      }, function ($event) {
        _vm.showSearchItems = true;
      }]
    }
  })]), _vm._v(" "), _vm.filteredList.length > 0 && _vm.showSearchItems == true ? _c('aside', {
    staticClass: "absolute z-10 flex flex-col items-start w-64 bg-white border rounded-md shadow-md mt-1",
    attrs: {
      "role": "menu",
      "aria-labelledby": "menu-heading"
    }
  }, [_c('ul', {
    staticClass: "flex flex-col w-full"
  }, _vm._l(_vm.filteredList, function (item, index) {
    return _c('li', {
      key: index,
      staticClass: "px-2 py-3 space-x-2 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none ",
      on: {
        "click": function ($event) {
          _vm.selectSearchItem(item);

          _vm.showSearchItems = false;
        }
      }
    }, [_vm._v(_vm._s(item.name))]);
  }), 0)]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

// Import vue component

const install = function installVueTailwindcssTypeahead(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueTailwindcssTypeahead', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
