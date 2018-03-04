import Vue from 'vue'
import Vuex from 'vuex'
import {tranfer, wrapMutations} from '@/plugins/vuex-iframe-sync'
import {spliceIf} from '@/utils'
import blocks from '@/blocks'
import * as types from './mutation-types'

Vue.use(Vuex)

const config = {
  state: {
    components: [],
    blocks,
    selectedPage: null,
    selectedComponent: null,
    selectedBlock: null
  },
  getters: {},
  mutations: {
    [types.ADD_COMPONENT] (state, components) {
      if (Array.isArray(components)) {
        state.components = state.components.concat(components)
      } else {
        state.components.push(components)
      }
    },
    [types.DEL_COMPONENT] (state, {id}) {
      spliceIf(state.components, _ => _.id === id)
    },
    [types.SET_COMPONENT] (state, components) {
      state.components = components
    },
    [types.UPDATE_COMPONENT] (state, options) {
      const {id} = options
      const index = state.components.findIndex(_ => _.id === id)
      if (index < 0) return
      state.components[index] = Object.assign(state.components[index], options)
    },
    [types.SET_SELECTED_COMPONENT] (state, component) {
      state.selectedComponent = component
    },
    [types.SET_SELECTED_BLOCK] (state, block) {
      state.selectedBlock = block
    }
  },
  actions: {
    selectBlock ({commit, state}, block) {
      if (state.selectedComponent) {
        commit(types.SET_SELECTED_COMPONENT, null)
      }
      commit(types.SET_SELECTED_BLOCK, block)
    },
    addComponent ({commit, state}, component) {
      commit(types.ADD_COMPONENT, component)
      commit(types.SET_SELECTED_COMPONENT, component)
    },
    deleteComponent ({commit}, component) {
      commit(types.DEL_COMPONENT, component)
      commit(types.SET_SELECTED_COMPONENT, null)
    }
  },
  plugins: [
    tranfer(window.parent.vm)
  ]
  // strict: process.env.NODE_ENV !== 'production'
}

config.mutations = wrapMutations(window.parent.vm, config.mutations)

const store = new Vuex.Store(config)

export default store
