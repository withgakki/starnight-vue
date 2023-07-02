<template>
	<view>
    <Navbar :hideBtn="true" title="首页" bgColor="#fff" :h5Show="false" :fixed="false"></Navbar>
    
	</view>
</template>

<script>
import Navbar from '@/components/navbar/Navbar'

export default {
  components: {
    Navbar,
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
