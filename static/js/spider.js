function savefile(){
console.log("savefile start")
plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(success) {
        success.root.getFile('gongyongchao.txt', { // 查找gongyongchao这个文件，有就打开，没有就创建一个
          create: true
        }, function(fileEntry) {
          var Path = fileEntry.toURL() // 获取当前文件的路径
          console.log(Path, '当前路径')
          fileEntry.createWriter(function(data) { // 对文件进行写入操作
            data.write('我写入成功')
            console.log('写入成功')
          }, function(e) {
            console.log('写入失败')
          })
          console.log('创建了一个新的文件')
        })
        console.log('我已经进入了系统目录下')
      }, function(e) {
        console.log('我是调用失败的回调') // 失败的回调
      })
}
savefile();