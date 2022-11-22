<template>
  <div class="hello">
    <van-empty
        :image="require('@/assets/img/success.png')"
        image-size="100"
        description="保存成功"
    />
    <div type="default" class="download" @click="download">点击下载活动安排</div>
  </div>
</template>

<script>
export default {
  name: "successS",
  methods: {
    download() {
      var a = document.createElement('a') // 创建一个<a></a>标签
      a.href = 'http://xqyqh.zime.edu.cn/校庆当天活动安排.docx'
      a.download = '校庆当天活动安排.docx' // 设置下载文件文件名
      a.style.display = 'none' // 隐藏a标签
      document.body.appendChild(a) // 将a标签追加到文档对象中
      a.click() // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
      a.remove() // 一次性的，用完就删除a标签
    }
  }
}
</script>

<style scoped>
  .hello{
    padding-top: 80px;
  }
  /deep/.van-empty__description{
    font-size: 16px;
  }
  .download{
    text-align: center;
    font-size: 14px;
    color: #3b54dd;
  }
</style>