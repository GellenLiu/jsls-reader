<template>
  <div class="content-box">
    <common-header :showinput="false" :showback="false" :tittle="搜索" ></common-header>
      <div class="page-content">

<van-search class="search" v-model="value" shape="round" placeholder="请输入小说名/作者名"  @search="onSearch"
    @cancel="onCancel"></van-search>

    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
export default {
  data () {
    return {
      tittle: 'searchbook',
      value: '',
      num: 0,
      baidu: 'https://www.baidu.com/s?wd=',
      baidu2: '&rsv_spt=1&rsv_iqid=0xa2f1b8570002560d&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=62095104_19_oem_dg&rsv_enter=1&rsv_dl=tb&oq=%25E7%25AC%2594%25E8%25B6%25A3%25E9%2598%2581&rsv_btype=t&inputT=4670&rsv_t=2dedTc1rBmyJaJauiTWVqueSN%2BiRXL1wU7J%2FoINqa0KRpET3ZSdqeYZLJEetmJSEyJKpXGD2XAMA&rsv_sug3=27&rsv_sug1=20&rsv_sug7=100&rsv_pq=e5de8d7e0001ae27&rsv_sug2=0&rsv_sug4=9787'
    }
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    plusReady () {
      var ws = plus.webview.currentWebview() // pw回车可输出plus.webview
      console.log('hello plus')
    },
    todetail() {
      this.$router.togo('/Home/reading')
    },
    onSearch(val) {
      console.log('search')
      this.titleNViewWebview()
    },
    onCancel() {
      console.log('cancel')
    },
    titleNViewWebview() {
      let that = this
      // var webview = plus.webview.open(that.baidu + that.value, 'test',
      //   {'titleNView': {style: 'transparent',
      //     'backgroundColor': '#D74B28',
      //     'titleText': '网页',
      //     'titleColor': '#CCCCCC',
      //     autoBackButton: true
      //   }})

      var wsubPoint = plus.webview.create(that.baidu + that.value, 'baidu', {height: 530, bottom: 50, background: 'transparent'})
      plus.webview.currentWebview().append(wsubPoint)
      plus.key.addEventListener('backbutton', function() {
        // var ws = plus.webview.currentWebview()
        // ws.close()
        console.log('listen back')
        if (plus.webview.getWebviewById('baidu') !== null) {
          console.log('hide baidu')
          plus.webview.close('baidu')
        }
        let index = plus.webview.getLaunchWebview()
        plus.webview.show(index)
      })
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
  },
  created () {
    // 扩展API是否准备好，如果没有则监听“plusready"事件
    if (window.plus) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
    }
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
.search{
margin-top: 0.625rem;
margin-left: 0.3125rem;
margin-right: 5px;
}
</style>
