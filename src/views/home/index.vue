<template>
  <v-app class="home" @contextmenu.native.prevent="()=>{}" tabindex="0" @keydown.native.prevent.ctrl.83="handleSave">
    <v-navigation-drawer app fixed clipped permanent width="240">
      <v-expansion-panel expand>
        <v-expansion-panel-content :value="true">
          <div slot="header">
            <v-flex d-flex justify-space-between align-center>
              <span>Pages</span>
              <v-icon style="flex: 0!important;" @click.stop="handleAddPage">add</v-icon>
            </v-flex>
          </div>
          <PageView/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="true">
          <div slot="header">Blocks</div>
          <BlockView/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-navigation-drawer>
    <v-navigation-drawer app fixed right clipped permanent width="360">
      <v-expansion-panel expand>
        <v-expansion-panel-content :value="true">
          <div slot="header">Inspector</div>
          <InspectorView/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="true">
          <div slot="header">Outline</div>
          <OutlineView/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left height="48px">
      <v-toolbar-title>vue-layout-demo</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <WorkspaceView/>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>GreedZone&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import WorkspaceView from './children/WorkspaceView'
import PageView from './children/PageView'
import BlockView from './children/BlockView'
import InspectorView from './children/InspectorView'
import OutlineView from './children/OutlineView'
import {ADD_PAGE} from '@/store/mutation-types'
export default {
  components: {
    WorkspaceView,
    PageView,
    BlockView,
    InspectorView,
    OutlineView
  },
  methods: {
    handleAddPage () {
      this.$store.commit(ADD_PAGE, {})
    },
    handleSave () {
      // todo save changes to file
      console.log('save')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
}
</style>
