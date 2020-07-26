<template>
<!-- 承载容器测试 -->
  <div class="list-todos"> <!--菜单容器-->
      <a class="list-todo list activeListClass" v-for="item in items" :key="item"> <!--单个菜单容器用 v-for 列表渲染-->
      <span class="icon-lock" v-if="item.locked"></span> <!--锁的图标用 v-if 条件渲染显隐-->
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span> <!--数字-->
      {{item.title}} <!-- 菜单内容，数据绑定-->
    </a>
    <a class=" link-list-new" > <!--新增菜单-->
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items:  //菜单的模拟数据
      [ { title: '星期一', count: 1, locked: true },
        { title: '星期二', count: 2, locked: true }, 
        { title: '星期三', count: 3, locked: false}
      ]
    }
  }
}
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>
