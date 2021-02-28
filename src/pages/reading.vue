<template>
  <div class="content-box">
    <div id="setting1" style="display:none">
        <van-nav-bar :title="chapterName" left-text="返回" left-arrow  @click-left="onClickLeft"
  @click-right="onClickRight">
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
    </div>
    <div class="page-content" id="content" @click="showChapterList" :style="styles.style1">
      <p>{{data}}</p>
<!-- {{data}} -->
    </div>
<div id="ad" style="display:none">
        <button  @click="downsize">Aa-</button>
        <button  @click="creasesize">Aa+</button>
</div>
      <div id="setting2" style="display:none">

        <van-tabbar v-model="active">
          <van-tabbar-item icon="home-o" to="/Home/chapterList">目录</van-tabbar-item>
          <van-tabbar-item icon="search">进度</van-tabbar-item>
          <van-tabbar-item icon="friends-o" @click="setFont_size">设置</van-tabbar-item>
          <van-tabbar-item icon="setting-o" @click="goodnight">夜间</van-tabbar-item>
          </van-tabbar>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      bookname: '',
      active: 0,
      chapterName: '',
      fontSize: '',
      font_color: '',
      backgroud: '',
      styles: {
        style1: {color: '#000', 'font-size': '10px'}, // 黑色
        style2: {color: '#000', 'font-size': '15px'}, // 黑色
        style3: {color: '#000', 'font-size': '20px'}, // 黑色
        style4: {color: '#000', 'font-size': '25px'}, // 黑色
        style5: {color: '#000', 'font-size': '30px'}, // 黑色
        style6: {color: '#000', 'font-size': '35px'}, // 黑色
        style7: {color: '#000', 'font-size': '40px'}, // 黑色
        style8: {color: '#8f9894', 'font-size': '33px'}, // 灰色
        style9: {color: '#8f9894', 'font-size': '10px'}, // 灰色
        style10: {color: '#8f9894', 'font-size': '15px'}, // 黑灰色色
        style11: {color: '#8f9894', 'font-size': '20px'}, // 黑灰色色
        style12: {color: '#8f9894', 'font-size': '25px'}, // 灰色
        style13: {color: '#8f9894', 'font-size': '30px'}, // 灰色
        style14: {color: '#8f9894', 'font-size': '35px'}, // 灰色
        style15: {color: '#8f9894', 'font-size': '40px'} // 黑色
      }

    }
  },
  created() {
    this.reading()
  },
  computed: {
    newdata: function() {
      return this.data + 1
    }
  },
  methods: {
    tohome() {
      this.$router.goBack()
    },
    onClickLeft() {
      this.$router.push('/Home')
    },
    onClickRight() {
      // 无
    },
    downsize() {
      document.getElementById('content').style.fontSize = '20px'
    },
    creasesize() {
      document.getElementById('content').style.fontSize = '40px'
    },
    goodnight() {
      this.font_color = '#888888'
      this.backgroud = '#000'
    },
    add() {
      this.data++
    },
    reading() {
      // 获取记录上次/正在阅读的章节
      let bookname = sessionStorage.getItem('reading')
      let chapterName = localStorage.getItem(bookname + 'readingChapter')
      this.chapterName = chapterName
      console.log('得到的章节名：' + chapterName)
      // 获取内容
      this.getcontentDB(chapterName)
    },
    // 当前的小说章节名
    read(db, chapterName) {
      let that = this
      var transaction = db.transaction(['chapter'])
      var objectStore = transaction.objectStore('chapter')
      // get参数是主键名
      console.log('执行查询')
      var request = objectStore.get(chapterName.toString())
      request.onerror = function(event) {
        console.log('事务失败')
      }

      request.onsuccess = function(event) {
        if (request.result) {
          console.log('成功获取章节内容')
          let content = request.result

          that.data = JSON.stringify(content).toString().replace(/(\\r\\n)|({"chapterName":")|(","content":")/g, '\r\n  \r\n')
          // that.data.replace('{"chapterName":"', '')
          console.log(that.data)
          // that.data = '我爱你\s\n小宝宝'\r\n
          //
        } else {
          console.log('未获得数据记录')
        }
      }
    },
    // 当前的小说章节名
    getcontentDB(chapterName) {
      var db

      let that = this
      var request = indexedDB.open('MyindexedDB', 1)

      request.onerror = function (event) {
        console.log('error')
      }
      request.onsuccess = function (event) {
        console.log('success')
        db = request.result// 可以拿到数据库对象
        that.read(db, chapterName)
      }
    },
    showChapterList() {
      if (document.getElementById('setting1').style.display === 'none') {
        document.getElementById('setting1').style.display = ''
        document.getElementById('setting2').style.display = ''
        console.log('show')
      } else {
        document.getElementById('setting1').style.display = 'none'
        document.getElementById('setting2').style.display = 'none'
        document.getElementById('ad').style.display = 'none'
        console.log('hide')
      }
    },
    setFont_size() {
      console.log('set fontsize')
      if (document.getElementById('ad').style.display === 'none') {
        document.getElementById('ad').style.display = ''
      } else {
        document.getElementById('ad').style.display = 'none'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.page-content{
    word-wrap: break-word;
    word-break: break-all;
    overflow-y: auto;
text-align: left;
white-space: pre-wrap;//保留格式，使用换行符
 // width: 300px;
// overflow: hidden; /*自动隐藏文字*/
// text-overflow: ellipsis;/*文字隐藏后添加省略号*/
// white-space: nowrap;/*强制不换行*/
// width: 20em;/*不允许出现半汉字截断*/
background-image: url(../assets/imgs/backgroud.png);
// background-color: #c8c896;
}
#ad{

}

</style>
