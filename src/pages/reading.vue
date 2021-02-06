<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showmore="true"></common-header>
    <div class="page-content">
      <h1>{{data}}</h1>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
export default {
  data() {
    return {
      tittle: '详情',
      data: '',
      bookname: ''
    }
  },
  created() {
    console.log('load txt reading')
    this.bookname = sessionStorage.getItem('reading')
    let file = localStorage.getItem(this.bookname)
    console.log('file contenxt')
    console.log(file)
    const reader = new FileReader()
    if (typeof FileReader === 'undefined') {
      alert('您的浏览器不支持FileReader接口')
    }
    reader.onload = function(event) {
      // 加载完成后
      // console.log(event.target.result)
      console.log('导入成功')
      console.log(event.target.result)
      this.data = event.target.result
    }
    reader.readAsText(file, 'utf-8')
    // 使用readAsText会调用onload。加载文件file到对象reader.
  },
  components: {
    commonHeader
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
}
</style>
