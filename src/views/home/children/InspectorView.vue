<template>
  <v-container class="inspector" fluid>
    <template v-if="component.$props&&component.props">
      <span class="subheading">{{component.label}}</span>
      <v-layout v-for="_ in component.$props" :key="_.$name" row style="height:48px;">
        <v-flex xs6>
          <v-subheader>{{_.$name}}</v-subheader>
        </v-flex>
        <v-flex class="inspector-field" xs6>
          <v-text-field
            v-if="_.type==='Number'"
            v-model.number="component.props[_.$name]"
            :required="_.required"
            @change="handleChange"
            single-line
          />
          <v-switch v-else-if="_.type==='Boolean'" v-model="component.props[_.$name]" hide-details @change="handleChange"/>
          <v-text-field
            v-else
            v-model="component.props[_.$name]"
            :placeholder="_.default"
            :required="_.required"
            @change="handleChange"
            single-line
          />
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import {UPDATE_COMPONENT} from '@/store/mutation-types'
export default {
  data () {
    return {
      component: {}
    }
  },
  computed: {
    ...mapState(['selectedComponent'])
  },
  watch: {
    selectedComponent (val) {
      if (!val) {
        this.component = {}
      } else {
        this.component = JSON.parse(JSON.stringify(this.selectedComponent))
      }
    }
  },
  methods: {
    handleChange () {
      this.$store.commit(UPDATE_COMPONENT, this.component)
    }
  }
}
</script>

<style lang="scss">
.inspector {
  &-field {
    .switch {
      .input-group__details {
        display: none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.inspector {
  .subheader {
    align-items: flex-end;
  }
  &-field {
    .switch {
      height: 100%;
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
