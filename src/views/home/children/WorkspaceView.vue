<template>
  <section class="view" @mousedown="selectComponent" @drop="handleDrop" @dragover.prevent="()=>{}">
    <div ref="menu" :style="menu.style"/>
    <v-menu v-model="menu.visible" :activator="$refs['menu']">
      <v-list>
        <v-list-tile disabled>
          <v-list-tile-title>{{selectedComponent ? selectedComponent.label : ''}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-ripple="true" @click="handleDeleteComponent">
          <v-list-tile-title>删除</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </section>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'
import {ADD_COMPONENT, DEL_COMPONENT, UPDATE_COMPONENT, SET_SELECTED_COMPONENT, SET_SELECTED_BLOCK} from '@/store/mutation-types'
import {guid, getDefaultByType} from '@/utils'
export default {
  data () {
    return {
      menu: {
        visible: false,
        style: {}
      }
    }
  },
  computed: {
    ...mapState(['components', 'selectedComponent', 'selectedBlock'])
  },
  watch: {
    selectedComponent (val) {
      if (!val) {
        this.resetMenu()
      }
    }
  },
  methods: {
    resetMenu () {
      this.menu = {
        visible: false,
        style: {}
      }
    },
    createdElement (target) {
      let element = document.createElement('div')
      element.id = guid()
      target.appendChild(element)
      return element
    },
    updateComponent ({id, props}) {
      let that = this
      const instance = new Vue({
        el: document.getElementById(id),
        render (h) {
          let component = that.$store.state.components.find(_ => _.id === id)
          if (!component) return
          this.$el.id = id
          return h(component.tag, {props: props || component.props})
        }
      })
      return instance.$mount()
    },
    handleDrop (e) {
      if (!this.selectedBlock) return
      let {tag, label} = this.selectedBlock
      let $propsModel = this.$root.$options.components[tag].options.props
      let {id} = this.createdElement(e.target)
      const vm = this.updateComponent({id})
      let component = {id, $props: [], props: {}, tag, label}
      this.$store.commit(ADD_COMPONENT, component)
      this.$nextTick(() => {
        let props = vm.$children[0].$props
        let $props = Object.entries($propsModel).map(([key, val]) => ({
          ...val,
          $name: key,
          $value: props[key],
          default: getDefaultByType(val.type ? val.type.name : 'String'),
          type: val.type ? val.type.name : ''
        }))
        Object.assign(component, {$props, props})
        this.$store.commit(UPDATE_COMPONENT, component)
        this.$store.commit(SET_SELECTED_COMPONENT, component)
        this.$store.commit(SET_SELECTED_BLOCK, null)
      })
    },
    selectComponent (e) {
      // left or right click
      if (![0, 2].includes(e.button) || !e.path.length) return
      this.resetMenu()
      let component = null
      for (let element of e.path) {
        if (!element.id) continue
        component = this.components.find(_ => _.id === element.id)
        if (component) {
          this.$store.commit(SET_SELECTED_COMPONENT, component)
          break
        }
      }
      // if right click show menu
      if (!component || e.button === 0) return
      this.$nextTick(() => {
        this.menu = {
          visible: true,
          style: {
            position: 'fixed',
            left: `${e.x + 10}px`,
            top: `${e.y + 10}px`
          }
        }
      })
    },
    handleDeleteComponent () {
      this.$store.commit(DEL_COMPONENT, this.selectedComponent)
      this.$store.commit(SET_SELECTED_COMPONENT, null)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
