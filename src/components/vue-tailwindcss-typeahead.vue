<template>
  <div class="w-full" v-click-outside="hideMenu">
      <div class="mt-1 flex rounded-md shadow-sm">
          <input
              type="text"
              :class="classProps"
              :placeholder="placeholder"
              aria-label="Search"
              v-model="search"
              @input="showSearchItems = true"
              ref="searchBox"
          />
      </div>
      <aside class="absolute z-10 flex flex-col items-start w-64 bg-white border rounded-md shadow-md mt-1"
             role="menu" aria-labelledby="menu-heading" v-if="filteredList.length > 0 && showSearchItems == true">
          <ul class="flex flex-col w-full">
              <li
                  class="px-2 py-3 space-x-2 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none "
                  v-for="(item, index) in filteredList"
                  :key="index"
                  @click="selectSearchItem(item); showSearchItems = false;">{{ item.name }}</li>
          </ul>
      </aside>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: "VueTwTypeahead",
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
        default: ['w-full','px-5','py-3','border','border-gray-400','rounded-lg','outline-none','focus:shadow-outline']
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
        return this.searchItemList.filter((item) => {
            return (item.name.toLowerCase().includes(this.search?.toLowerCase()) && !this.checkIgnoreListItem(item.id));
        });
      },

      classProps() {
        return [...this.inputClass]
      }
  },
  methods: {
      selectSearchItem(item) {
          this.search = item.name;
          this.selectedItem = item.name;
          this.showSearchItems = false;
          this.$emit('selected', item)
          if(this.clearInputWhenClicked){
              this.search = ''
          }
      },

      checkIgnoreListItem(itemId) {
          if(this.ignoredList.length > 0 ){
              const result = this.ignoredList.some(ignoreListItem => {
                  return ignoreListItem == itemId
              })
              return result
          }
          return false
      },

      hideMenu(){
          if(this.showSearchItems == true){
              this.showSearchItems = false
          }
      }

  },

  created() {
      if(this.selectedData != 0){
          const selected = this.lists.filter((item) => {
              if(item.id === this.selectedData){
                  return true
              }
              return false
          })

          this.selectedItem = selected[0]?.name
          this.search = selected[0]?.name
      }
  },

};
</script>

