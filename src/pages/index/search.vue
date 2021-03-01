<template>
  <div class="content-box">
    <common-header :showinput="false" :showback="false" :tittle="搜索" ></common-header>
      <div class="page-content">

<van-search class="search" v-model="value" shape="round" placeholder="请输入小说名/作者名"  @search="onSearch"
    @cancel="onCancel"></van-search>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
<van-swipe-cell
v-for="item in result" :key="item" :title="item" right-width="65" class="vancell">
  <van-card
    num=""
    price="更新至"
    desc="简介:小说简介"
    :title="item"
    class="goods-card"
    thumb="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.edowning.net%2F2021%2F1%2F23%2F61ccdfbd-a6f2-490f-97c2-c39cadd94657.jpg&refer=http%3A%2F%2Fi-1.edowning.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615172546&t=3759087eb7a7c328c3d25e9c2f1c8f28"
  />
</van-swipe-cell>
    </van-list>
    </div>
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
      finished: false,
      loading: false,
      result: [],
      baidu: 'https://www.baidu.com/s?wd=',
      baidu2: '&rsv_spt=1&rsv_iqid=0xa2f1b8570002560d&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=62095104_19_oem_dg&rsv_enter=1&rsv_dl=tb&oq=%25E7%25AC%2594%25E8%25B6%25A3%25E9%2598%2581&rsv_btype=t&inputT=4670&rsv_t=2dedTc1rBmyJaJauiTWVqueSN%2BiRXL1wU7J%2FoINqa0KRpET3ZSdqeYZLJEetmJSEyJKpXGD2XAMA&rsv_sug3=27&rsv_sug1=20&rsv_sug7=100&rsv_pq=e5de8d7e0001ae27&rsv_sug2=0&rsv_sug4=9787'
    }
  },
  methods: {
    plusReady () {
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
      // let that = this
      // document.getElementsByClassName()
      // document.getElementById("main").innerHTML
      this.$toast('搜索开始')
      console.log('搜索开始')
      // 获取，保存，之后恢复
      let oua = plus.navigator.getUserAgent()
      // 设置成电脑网页版
      plus.navigator.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36')
      let spiderIndex = plus.webview.open('http://www.paoshuzw.com/xiaoshuodaquan/', 'spiderIndex')
      // spiderIndex.appendJsFile('../../../static/js/spider.js')A
      spiderIndex.evalJS('console.log("js执行成功")')
      spiderIndex.evalJS("let html = document.body.innerHTML;plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(success) {success.root.getFile('spiderIndex.txt', { create: true}, function(fileEntry) {var Path = fileEntry.toURL() ;console.log(Path, '当前路径');fileEntry.createWriter(function(data) { data.write(html);console.log('写入成功');this.$toast('文件写入成功')}, function(e) {console.log('写入失败');});console.log('创建了一个新的文件');});console.log('我已经进入了系统目录下');}, function(e) {console.log('我是调用失败的回调');})")
      // spiderIndex.evalJS('let x = document.body.innerHTML;console.log(x);plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(success) {success.root.getFile("spiderIndex.txt", {create: true}, function(fileEntry) {var Path = fileEntry.toURL(); console.log(Path, "当前路径");fileEntry.createWriter(function(data) {data.write("我写入成功d123");console.log("写入成功")}, function(e) {console.log("写入失败")});console.log("创建了一个新的文件")})console.log("我已经进入了系统目录下")}, function(e) {console.log("我是调用失败的回调")})')
      // spiderIndex.evalJS('console.log("js执行成功");document.execCommand("SaveAs", true, "./spiderIndex.txt");')
      // spiderIndex.getSettings().setUserAgent('Mozilla/5.0 (Linux; Android 10; COL-AL10 Build/HUAWEICOL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.116 Mobile Safari/537.36 Html5Plus/1.0')
      // plus.webview.getWebviewById('spiderIndex')
      // 读取spiderIndex的内容进行解析
      spiderIndex.hide()
      // 恢原来的UA
      plus.navigator.setUserAgent(oua)
      this.$toast('搜完成')
      // this.gethtml()
      // plus.io.resolveLocalFileSystemURL('_doc/spiderIndex.txt', function(entry) { entry.file(function(file) { var fileReader = new plus.io.FileReader(); fileReader.readAsText(file, 'utf-8'); fileReader.onloadend = function(evt) { console.log('内容:' + evt.target.result) } }) })
    },
    gethtml() {
      let that = this
      console.log('gethtml start')
      this.$toast('获取存储的数据 start')
      plus.io.resolveLocalFileSystemURL('_doc/spiderIndex.txt', function(entry) {
        entry.file(function(file) {
          var fileReader = new plus.io.FileReader()
          fileReader.readAsText(file, 'utf-8')
          fileReader.onloadend = function(evt) {
            console.log('file read')
            // console.log(evt.target.result.match(/(<a)(.*?)(a>)/g))
            let allnovel = evt.target.result
            let abc = allnovel.match(/(<a)(.*?)(a>)/g)
            // console.log(abc)
            for (let i = 0; i < abc.length; i++) {
              if (abc[i].match(that.value) !== null) {
                that.result.push(abc[i])
                that.$toast('获取存储的数据成功')
              }
            }
          }
        })
      })

      console.log('gethtml end')
    },
    onLoad() {
      this.gethtml()
      this.finished = true
    }

  },
  components: {
    commonHeader
  },
  created () {
    // 扩展API是否准备好，如果没有则监听“plusready"事件
    if (window.plus) {
      this.plusReady()
      plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(success) { success.root.getFile('spiderIndex.txt', {create: true}, function(fileEntry) { var Path = fileEntry.toURL(); console.log(Path, '当前路径') }); console.log('我已经进入了系统目录下') }, function(e) { console.log('我是调用失败的回调') })
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
