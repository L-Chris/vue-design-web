import Vue from 'vue'
import Vuex from 'vuex'
import {spliceIf, guid} from '@/utils'
import blocks from '@/blocks'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pages: [],
    components: [],
    blocks,
    selectedPage: null,
    selectedComponent: null,
    selectedBlock: null
  },
  getters: {
  },
  mutations: {
    [types.ADD_PAGE] (state, {id = guid(), label = `页面${state.pages.length + 1}`, children = []} = {}) {
      state.pages.push({id, label, children})
    },
    [types.DEL_PAGE] (state, {id}) {
      spliceIf(state.pages, _ => _.id === id)
    },
    [types.SET_PAGE] (state, pages) {
      state.pages = pages
    },
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
    [types.SET_SELECTED_PAGE] (state, page) {
      state.selectedPage = page
    },
    [types.SET_SELECTED_COMPONENT] (state, component) {
      state.selectedComponent = component
    },
    [types.SET_SELECTED_BLOCK] (state, block) {
      state.selectedBlock = block
    }
  },
  actions: {},
  modules: {}
  // strict: process.env.NODE_ENV !== 'production'
})
