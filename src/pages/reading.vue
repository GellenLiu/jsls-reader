<template>
  <div class="content-box">
    <div class="page-content" @click="showChapterList">
      <h1>{{data}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      bookname: ''
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
    add() {
      this.data++
    },
    reading() {
      // 获取记录上次/正在阅读的章节
      let bookname = sessionStorage.getItem('reading')
      let chapterName = localStorage.getItem(bookname + 'readingChapter')
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
          that.data = request.result
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
      this.$router.togo('/Home/chapterList')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.page-content{
    background-image: url(../assets/imgs/backgroud.png);
font-size: 30px;
word-wrap: break-word;
word-break: break-all;
overflow: auto;
// overflow: hidden; /*自动隐藏文字*/
// text-overflow: ellipsis;/*文字隐藏后添加省略号*/
// white-space: nowrap;/*强制不换行*/
// width: 20em;/*不允许出现半汉字截断*/

}
</style>
