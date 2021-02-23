<template>
<div id="chapterList">
<div>
      <div class="left-icon">
        <span  @click="back" class="icon-back"></span>
      </div>
      <div class="header-tittle">
        <span >目录</span>
      </div>
<div>
<van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >

<van-cell
v-for="item in chapterList" :key="item" class="vancell" @click="goReading(item)">
{{item}}
</van-cell>
</van-list>
</div>
</template>

<script>

export default {
  data () {
    return {
      chapterList: [],
      loading: false,
      finished: false

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getchapterList()
    },
    back() {
      this.$router.goBack()
    },
    onLoad() {
      // 异步更新数据      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.finished = true
    },
    getchapterList() {
      let bookname = sessionStorage.getItem('reading')
      console.log('bookname:  ' + bookname)
      let chapterListt = JSON.parse(localStorage.getItem(bookname + 'chapterList'))
      console.log('chapterList:' + chapterListt)
      this.chapterList = chapterListt
    },
    reading() {

    },
    goReading(selectChapter) {
      // 设置记录的章节位置
      let bookname = sessionStorage.getItem('reading')
      localStorage.setItem(bookname + 'readingChapter', selectChapter)
      console.log('选择的章节' + selectChapter)
      this.$router.togo('/Home/reading')
    }

  }
}
</script>

<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";

  .left-icon{
    position: relative;
    flex: 1;
    .icon-back{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .left(25);
      .top(25);
      background-image: url("../assets/imgs/w-back.svg");
      background-size: cover;
    }
  }
  .header-tittle{
    flex: 3;
  }
</style>
