<template>
  <section>
    <ElTree :data="components" @node-click="handleSelect" @node-contextmenu="handleDelete"/>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import {spliceIf} from '@/utils'
import {DEL_COMPONENT, SET_SELECTED_COMPONENT} from '@/store/mutation-types'
export default {
  computed: {
    ...mapState(['components'])
  },
  methods: {
    handleSelect (e, _) {
      this.$store.commit(SET_SELECTED_COMPONENT, _.data)
    },
    handleDelete (e, _, node) {
      const children = node.parent.childNodes
      spliceIf(children, c => c.id === node.id)
      this.$store.commit(DEL_COMPONENT, _)
      this.$store.commit(SET_SELECTED_COMPONENT, null)
    }
  }
}
</script>
