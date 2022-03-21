<template>
  <nav class="flex items-center mb-2 border-b border-gray-200">
    <div class="tab-list flex gap-1 flex-nowrap w-full overflow-auto">
      <button
        v-for="(tab, index) of tabs"
        :key="index"
        class="relative flex-shrink-0 px-2 py-2 pr-6"
        :class="{ 'bg-gray-200': index === activeIndex }"
        @click="changeTab(index)"
      >
        {{ tab.title }}
        <span
          v-if="index > 0"
          class="absolute top-0 right-0 bottom-0 top-0 px-2 inline-grid place-items-center text-gray-600 text-base font-bold"
          title="close tab"
          @click.stop="closeTab(index)"
        >
          &times;
        </span>
      </button>
    </div>
    <div>
      <button class="text-gray-500 text-xl" @click="$emit('new-tab')">
        &plus;
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'EditorTabs',
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    closeTab(index) {
      let newActiveTabIndex;
      if (index === this.activeIndex && index === this.tabs.length) {
        newActiveTabIndex = this.activeIndex - 2;
      } else {
        newActiveTabIndex = this.activeIndex - 1
      }
      this.$emit('change', newActiveTabIndex)
      this.$emit('close-tab', index)
    },
    changeTab(index) {
      this.$emit('change', index)
    },
  },
}
</script>

<style lang="scss" scoped></style>
