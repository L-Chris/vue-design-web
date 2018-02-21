<template>
  <section class="block">
    <div v-for="(f, fname) in blocks" :key="fname">
      <v-subheader>{{fname}}</v-subheader>
      <v-layout row wrap>
        <v-flex xs4 v-for="_ in f" :key="_.id">
          <v-card class="mx-2 my-2" @drag.native="handleDrag(_)">
            <v-card-media height="52px" class="block-card-img">
              <img src="~@/assets/icon.jpg" style="width:52px;"/>
            </v-card-media>
            <p class="text-md-center">{{_.label}}</p>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import {SET_SELECTED_BLOCK} from '@/store/mutation-types'
export default {
  computed: {
    ...mapState(['blocks'])
  },
  methods: {
    handleDrag (_) {
      this.$store.commit(SET_SELECTED_BLOCK, _)
    }
  }
}
</script>

<style lang="scss">
.block {
  .card__media__content {
    justify-content: center;
  }
}
</style>
