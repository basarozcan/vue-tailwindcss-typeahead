<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {VueTwTypeahead} from './components/'

export default {
  name: 'ServeDev',
  components: {
    VueTwTypeahead
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "Amsterdam",
        },
        {
          id: 2,
          name: "Berlin",
        },
        {
          id: 3,
          name: "Istanbul",
        },
      ],
      selectedItemIds: [],
      selectedItem: null
    };
  },
  methods: {
    selectedData(value) {
      this.selectedItem = value
      console.log(value);
    },
  },
}
</script>

<template>
  <div>
    <div class="h-screen font-sans text-gray-900 bg-gray-300 border-box">
      <div class="flex justify-center max-w-lg mx-auto">
          <div
              class="flex flex-col items-start justify-between w-4/5 h-auto my-20 overflow-hidden bg-white rounded-lg shadow-xl">
              <div class="flex flex-row items-baseline justify-around w-full p-4 pb-0 mb-3">
                  <h2 class="mr-auto text-lg font-semibold tracking-wide">Typeahead</h2>
              </div>
              <div class="w-full p-4 pt-0 text-gray-800 bg-gray-100 divide-y divide-gray-400">
                  <div class="flex flex-row items-center justify-between py-4">
                      <div class="w-full">
                        <vue-tw-typeahead 
                          :lists="list"
                          @selected="selectedData"
                          :ignoredList="selectedItemIds"
                          :clearInputWhenClicked="false"
                          :inputClass="['w-full','px-3','py-2','border','border-gray-300','rounded-lg','outline-none','focus:shadow-outline']"
                          placeholder="Please write a city name"></vue-tw-typeahead>
                      </div>
                    </div>
                    <div class="w-full px-2 py-4">
                      <p class="font-semibold">Selected: </p>
                      <p>{{selectedItem}}</p>
                    </div>
              </div>
          </div>
      </div>
    </div>    
  </div>
</template>
