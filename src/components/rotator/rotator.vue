<template>

    <i
      :class="{'is-active':isActive}"
     
      class="hamburger lgui-menu"

      @click="toggleClick"/>
     
  
</template>

<script>
export default {
  name: 'rotator',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
	display: inline-block;
	cursor: pointer;
	width: 20px;
	height: 20px;
	transform: rotate(90deg);
	transition: .38s;
	transform-origin: 50% 50%;
}
.hamburger.is-active {
	transform: rotate(0deg);
}
</style>
