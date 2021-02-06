<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="false">
    </common-header>
    <div class="page-content">

<div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
<van-swipe-cell
v-for="item in fileList" :key="item" :title="item" right-width="65" class="vancell">
  <van-card
    num=""
    price="更新至xxx"
    desc="简介:七城战乱，邪神复苏的阴影笼罩在赤色大陆上空，家族争斗，对抗怪物，阶级跨越，人类一切的阴谋与仇恨，皆指向永夜传说，指向人与时间的诅咒。"
    :title="item"
    class="goods-card"
    thumb="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.edowning.net%2F2021%2F1%2F23%2F61ccdfbd-a6f2-490f-97c2-c39cadd94657.jpg&refer=http%3A%2F%2Fi-1.edowning.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615172546&t=3759087eb7a7c328c3d25e9c2f1c8f28"
    @click="reading(item)"
  />
  <template slot="right">
    <van-button square text="删除" type="danger"  class="delete-button" />
    <!-- <van-button square type="primary" text="收藏" /> -->
  </template>
</van-swipe-cell>
    <!--  <van-cell v-for="item in fileList" :key="item" :title="item" /> -->
    </van-list>
</div>
    <van-button round type="info" @click="txtbtn" id="loadtxtbtn">导入</van-button>
    <input type="file" ref="loadtxt" @change="loadTextFromFile" id="txt" style="display:none" />
    <div>{{text}}</div>

    </div>
<div>

</div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'

export default {
  data () {
    return {
      num: 0,
      tittle: '我的书架',
      fileList: ['filetxt1', 'filetest2'],
      text: 'text',
      novelName: '',
      loading: false,
      finished: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    testVuex() {
      this.$store.commit('SET_NUM', 1)
      console.log(this.$store.state.number)
    },
    init() {
      if (JSON.parse(localStorage.getItem('fileList')) === null) {
        let initdata = ['test1', 'test2']
        localStorage.setItem('fileList', JSON.stringify(initdata))
      } else {
        this.fileList = JSON.parse(localStorage.getItem('fileList'))
        console.log('init fileLIst')
        console.log(this.fileList)
      }
    },
    // vuextest() {
    //   // this.$store.commit('SET_NUM', 123)
    //   console.log('state的值')
    //   console.log(this.$store.state.number)
    // },
    onLoad() {
      // 异步更新数据      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.finished = true
    },
    plusReady () {
      var ws = plus.webview.currentWebview() // pw回车可输出plus.webview
      console.log('hello plus')
    },
    reading(bookname) {
      sessionStorage.setItem('reading', bookname)
      this.$router.togo('/Home/reading')
    },
    importBook() {
      console.log('improt book')
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      console.log(this.fileList)
    },
    // txt文本
    txtbtn() {
      console.log('txtbtn click')
      this.vuextest()
      document.getElementById('txt').click()
    },
    loadTextFromFile(e) {
      let that = this
      console.log('loadText click')
      const file = e.target.files[0]
      console.log(file.value)
      let name = file.name.split('.').splice(-1).toString()
      if (name !== 'txt') {
        this.$message.success('文件类型错误,请重新选择文件')
        return
      }
      let addfile = []
      addfile = JSON.parse(localStorage.getItem('fileList'))
      console.log('addfile打印')
      console.log(addfile)
      addfile.push(file.name)
      localStorage.setItem('fileList', JSON.stringify(addfile))

      plus.io.requestFileSystem(plus.io.PRIVATE_WWW, function(fs) {
        // 可通过fs进行文件操作
        fs.root.createReader()
        alert('Request file system success!')
      }, function (e) {
        alert('Request file system failed: ' + e.message)
      })

      const reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        alert('您的浏览器不支持FileReader接口')
      }
      reader.onload = function(event) {
        // 加载完成后
        // console.log(event.target.result)
        console.log('导入成功')
        // localStorage.setItem(file.name, event.target.result)
      }
      reader.readAsText(file, 'utf-8')

      // if (window.plus) {
      //   plus.storage.setItem(file.name, file)
      // } else {
      //   document.addEventListener('plusready', plusReady => { plus.storage.setItem(file.name, file) }, false)
      // }
      // console.log('file log')
      // console.log(file)

      // console.log('storage log')
      // console.log(plus.storage.getItem(file.name))
    },
    showNovelList() {
      // plus.storage.getItem()
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
    this.init()
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
 .goods-card {
    margin: 0;
    background-color: #CCCCCC;
  }

  .delete-button {
    height: 100%;
display: inline;
width: 65px;
height: 100%;
font-size: 15px;
line-height: 134px;
color: #fff;
text-align: center;
background-color: #f44;
  }

  .right {
display: inline;
width: 65px;
height: 100%;
font-size: 15px;
line-height: 134px;
color: #fff;
text-align: center;
background-color: #f44;
}
#loadtxtbtn{
position: fixed;
right: 0.4125rem;
bottom: 2.25rem;
}
.vancell{
margin-top: 10px;
margin-bottom: 10px;
}
</style>
