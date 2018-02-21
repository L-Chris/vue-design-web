<template>
  <section>
    <ElTree :data="pages" @node-click="handleSelect" @node-contextmenu="handleDelete"/>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import {DEL_PAGE, SET_SELECTED_PAGE} from '@/store/mutation-types'
export default {
  computed: {
    ...mapState(['pages'])
  },
  methods: {
    handleSelect (e, _) {
      this.$store.commit(SET_SELECTED_PAGE, _.data)
    },
    handleDelete (e, _) {
      this.$store.commit(DEL_PAGE, _)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
