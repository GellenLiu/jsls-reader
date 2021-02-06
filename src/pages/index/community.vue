<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="true"></common-header>

    <div class="page-content">

    <div>

<mt-button class="button" @click="change('起点中文网')">
<img class="icon" src="../../assets/imgs/qidian.png" height="100" width="100" slot="icon">
起点中文网
</mt-button>
<mt-button class="button" @click="change('笔趣阁')">
<img class="icon" src="../../assets/imgs/biquge.png" height="100" width="100" slot="icon">
笔趣阁
</mt-button>
<mt-button class="button" @click="change('17K小说网')">
<img class="icon" src="../../assets/imgs/17K.png" height="100" width="130" slot="icon">
17K小说网
</mt-button>

<div>
<mt-button class="button" @click="change('晋江文学城')">
<img class="icon" src="../../assets/imgs/jinjian.png" height="100" width="100" slot="icon">
晋江文学城
</mt-button>
</div>

<div>
<mt-button class="button" @click="change('笔下文学')">
<img class="icon" src="../../assets/imgs/bixia.png" height="100" width="110" slot="icon">
笔下文学
</mt-button>
</div>

<div>
<mt-button class="button" @click="change('顶点小说')">
<img class="icon" src="../../assets/imgs/dingdian.png" height="100" width="110" slot="icon">
顶点小说
</mt-button>
</div>

<div>
<mt-button class="button" @click="change('纵横中文网')">
<img class="icon" src="../../assets/imgs/zongheng.png" height="100" width="110" slot="icon">
纵横中文网
</mt-button>
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
      tittle: '社区',
      num: 0,
      url: '',
      id: ''

    }
  },

  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    tohome() {
      this.$router.goBack()
    },
    change(title) {
      if (title === '起点中文网') {
        this.url = 'https://www.qidian.com/'
      } else if (title === '笔趣阁') {
        this.url = 'http://www.paoshuzw.com/'
      } else if (title === '17K小说网') {
        this.url = 'https://www.17k.com/'
      } else if (title === '晋江文学城') {
        this.url = 'http://www.jjwxc.net/'
      } else if (title === '笔下文学') {
        this.url = 'https://www.bxwxorg.com/'
      } else if (title === '顶点小说') {
        this.url = 'https://www.23us.com/'
      } else if (title === '纵横中文网') {
        this.url = 'http://www.zongheng.com/'
      }

      this.titleNViewWebview()
      console.log('change click')
    },
    plusReady () {
      var ws = plus.webview.currentWebview() // pw回车可输出plus.webview
      console.log('hello plus')
    },
    website() {
      var web = plus.webview.open(this.url)
    },
    titleNViewWebview() {
      let that = this
      var webview = plus.webview.open(that.url, 'test',
        {'titleNView': {style: 'transparent',
          'backgroundColor': '#D74B28',
          'titleText': '网页',
          'titleColor': '#CCCCCC',
          autoBackButton: true
        }})
      plus.key.addEventListener('backbutton', function() {
        // var ws = plus.webview.currentWebview()
        // ws.close()
        console.log('listen back')
        let index = plus.webview.getLaunchWebview()
        plus.webview.show(index)
      })
    }

  },
  created () {
    // 扩展API是否准备好，如果没有则监听“plusready"事件
    if (window.plus) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
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
height: 3rem;
width: 100%;
}
.icon{
float: left;
}
</style>
