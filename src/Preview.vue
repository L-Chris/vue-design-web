<template>
  <section id="app" @contextmenu.prevent="()=>{}" @mousedown="selectComponent" @drop="handleDrop" @dragover.prevent="()=>{}">
    <div ref="menu" :style="menu.style"/>
    <v-menu v-model="menu.visible" :activator="$refs['menu']">
      <v-list>
        <v-list-tile disabled>
          <v-list-tile-title>{{selectedComponent ? selectedComponent.label : ''}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-ripple="true" @mousedown="handleDeleteComponent">
          <v-list-tile-title>删除</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </section>
</template>

<script>
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
import {SET_SELECTED_COMPONENT, SET_SELECTED_BLOCK} from '@/store/mutation-types'
import {guid} from '@/utils'
export default {
  name: 'Preview',
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
  methods: {
    ...mapActions(['addComponent', 'deleteComponent']),
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
      let {tag, label, props: $props, setting} = this.selectedBlock
      let {id} = this.createdElement(e.target)
      this.updateComponent({id})
      let props = Object.entries($props).reduce((pre, [key, val]) => {
        pre[key] = val.default
        return pre
      }, {})
      let component = {id, tag, label, props, setting}
      this.addComponent(component)
      this.$store.commit(SET_SELECTED_BLOCK, null)
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
      this.deleteComponent(this.selectedComponent)
    }
  }
}
</script>

<style lang="scss">
@import './styles/reset';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  color: #2c3e50;
  font-size: 1.3rem;
  .menuable__content__active {
    z-index: 9999!important;
    background-color: #ffffff;
  }
}
</style>
