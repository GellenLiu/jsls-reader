<template>
  <div class="setting">
fadf
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
export default {
  data () {
    return {
      tittle: 'setting',
      num: 0
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail() {
      this.$router.togo('/Home/setting')
    }
  },

  computed: {
    ...mapGetters([
      'number'
    ]),
    ...mapState({
      number: state => state.home.number
    })
  }
}
</script>

<style></style>
