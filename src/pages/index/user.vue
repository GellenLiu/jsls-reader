<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="false"></common-header>
    <div class="page-content">
<div>
<div id="avator">
<van-image
  round
  width="2rem"
  height="2rem"
  src="https://img01.yzcdn.cn/vant/cat.jpeg"
/>
</div>
<div id="info">
jsls资深书迷
<br>
ID:1042382110
</div>

<div>
<van-cell class="cell" icon="cart-o"  title="个人账户" @click="Toast" is-link size="large"/>
<van-cell class="cell" icon="paid" title="收藏" is-link @click="Toast" size="large"/>
<van-cell class="cell" icon="clock-o" title="浏览历史" @click="Toast" is-link size="large"/>
<van-cell class="cell" icon="notes-o" title="我是作者" @click="Toast" is-link size="large"/>
<van-cell class="cell" icon="setting-o" title="设置" @click="Toast" is-link size="large"/>
</div>
  </div>
  </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
export default {
  data () {
    return {
      tittle: '个人中心',
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
    },
    Toast() {
      this.$toast('联系开发者：1042382110')
    }

  },
  components: {
    commonHeader
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.page-content{
  .mb(98);
}
.button{
height: 20px;
width: 100%;
float: left;
}
.icon{
float: left;
}
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
#avator{
float: left;
margin-top: 10px;
margin-bottom: 10px;
margin-left: 0.625rem;
margin-right: 10px;

}
#info{
float: right;
font-size: 14px;
margin-top: 10px;
margin-bottom: 10px;
margin-left: 0.625rem;
margin-right: 30%;
}
.nameid{
float: right;
}
.user_info{
    width: auto;
}
.tooldiv{
  display: block;
  margin-top: 20px;
}
.hr{
  height: 1.5px;
  background-color: #d8d8d8;
  margin: 4px 20px 4px 20px;
}
.cell{
height: 40px;
text-align: left;
  margin-bottom: 3px;
}
</style>
