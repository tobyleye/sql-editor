<template>
  <div class="menu" :class="{ collapsed: !isOpen }">
    <button class="menu-toggle" @click="isOpen = !isOpen">
      <span class="menu-toggle-icon">
        <fa :icon="['fas', 'angle-down']" />
      </span>
      {{ label }}
    </button>
    <div v-if="isOpen" class="menu-content">
      
        <slot />
     
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleMenu',
  props: {
    label: {
      type: String,
      required: true,
    },
    defaultIsOpen:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      isOpen: this.defaultIsOpen,
    }
  },
}
</script>

<style lang="scss" scoped>
.menu-toggle {
  @apply capitalize text-sm text-gray-500 mb-2;
}

.menu-toggle-icon {
  @apply inline-block mr-1;
  transition: 0.25s ease;
}

.menu-content {
  @apply ml-4 overflow-auto;
}

.menu.collapsed {
  .menu-toggle-icon {
    transform: rotate(-90deg);
  }
}
</style>
