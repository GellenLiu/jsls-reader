<template>
  <div class="content-box">
    <common-header :showinput="false" :showback="false" :tittle="搜索" ></common-header>
      <div class="page-content">

<van-search class="search" v-model="value" shape="round" placeholder="请输入小说名/作者名"  @search="onSearch"
    @cancel="onCancel"></van-search>

    </div>
<!-- <iframe src="http://www.paoshuzw.com/xiaoshuodaquan/" id="iframe1"></iframe> -->
  </div>
</template>

<script>
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
      // this.$axios.post('/api/getcontext/').then(res => {
      //   console.log(res)
      // })
      // this.gethtml()
    },
    onCancel() {
      console.log('cancel')
    },
    titleNViewWebview() {
      let that = this
      // document.getElementsByClassName()
      // document.getElementById("main").innerHTML
      let spiderIndex = plus.webview.open('http://www.paoshuzw.com/xiaoshuodaquan/', 'spiderIndex')

      spiderIndex.evalJS('console.log("js执行成功")')
      spiderIndex.evalJS('let x = document.body.innerHTML;console.log(x)')
      // plus.webview.getWebviewById('spiderIndex')
    },
    gethtml() {
      var iframe = document.getElementById('iframe1')
      var iwindow = iframe.contentWindow
      var idoc = iwindow.document
      console.log('window', iwindow)// 获取iframe的window对象
      console.log('document', idoc) // 获取iframe的document
      console.log('html', idoc.documentElement)// 获取iframe的html
      console.log('head', idoc.head) // 获取head
      console.log('body', idoc.body) // 获取body
    }

  },
  components: {
    commonHeader
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
