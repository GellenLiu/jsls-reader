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
    price="更新至"
    desc="简介。"
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

    </div>
<div>

</div>
  </div>
</template>

<script>
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
    onLoad() {
      // 异步更新数据      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.finished = true
    },
    plusReady () {
      console.log('hello plus')
    },
    reading(bookname) {
      sessionStorage.setItem('reading', bookname)
      this.$router.togo('/Home/reading')
    },
    // txt文本
    txtbtn() {
      console.log('txtbtn click')
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
      localStorage.setItem('reading', file.name)
      // 有一个全部已加入小说的列表。
      // 所有章节名放一个列表，每个章节放一个localstorage,key是小说名+章节名
      // 小说名(信息)-->章节列表-->小说名+章节名-->找到内容
      const reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        alert('您的浏览器不支持FileReader接口')
      }
      reader.onload = function(event) {
        // 加载完成后
        // console.log(event.target.result)
        console.log('导入成功')
        // 匹配规则
        let pest = /([第][一二三四五六七八九十百千0-9]{1,8}[章][^\\n]{1,15}[\n|\s|\r])/g

        let content = event.target.result
        let split_chapter = content.split(pest)
        let chapterList = []
        let len = split_chapter.length
        for (let i = 1; i < len - 1; i += 2) {
          // console.log(split_chapter[i])
          // console.log(split_chapter[i + 1])

          // 加入章节列表
          chapterList.push(split_chapter[i])

          // 对应章节内容缓存
          that.storegeDB(split_chapter[i], split_chapter[i + 1])
          // localStorage.setItem(file.name + split_chapter[i], split_chapter[i + 1])
        }
        localStorage.setItem(file.name + 'chapterList', JSON.stringify(chapterList))
        // localStorage.setItem(file.name, event.target.result)
        that.$toast('导入成功')
        that.init()
      }
      reader.readAsText(file, 'utf-8')
    },
    add(db, chapterName, content) {
      let that = this
      var request = db.transaction(['chapter'], 'readwrite')
        .objectStore('chapter')
        .add({chapterName, content})

      request.onsuccess = function (event) {
        console.log('数据写入成功')
      }

      request.onerror = function (event) {
        console.log('数据写入失败')
      }
    },
    storegeDB(chapterName, content) {
      var db
      var objectStore
      let that = this
      var request = indexedDB.open('MyindexedDB')

      request.onerror = function (event) {
        console.log('连接数据库失败')
      }
      request.onsuccess = function (event) {
        console.log('连接数据库成功')
        db = request.result// 可以拿到数据库对象
        that.add(db, chapterName, content)
      }
      // 如果指定的版本号，创建/大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded
      request.onupgradeneeded = function (event) {
        db = event.target.result
        console.log('更新数据库')
        if (!db.objectStoreNames.contains('chapter')) { // 判断是否存在
          objectStore = db.createObjectStore('chapter', { keyPath: 'chapterName' })
        }
        // 新建索引，参数索引名称、索引所在的属性、配置对象
        objectStore.createIndex('chapterName', 'chapterName', { unique: true })
      }
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
