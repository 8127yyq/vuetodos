<template>
<!--绑定点击事件goList),并且判断当todoId 时候 item.id时,文字高亮度-->
  <div class="list-todos">
  <!-- 绑定class，当items循环中的id等于我们设置的选中todoId时候,就会加上active这个calss,这样样式就会发生变化。-->
    <a @click="goList(item.id)" class="list-todo list activeListClass"
       :class="{'active': item.id === todoId}"
       v-for="(item,index) in todoList" :key="index"
    >
      <span class="icon-lock" v-if="item.locked"></span>
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
      {{item.title}}
    </a>
    <a class=" link-list-new" @click="addTodoList">
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>

<script>
import { getTodoList, addTodo } from '../api/api'
export default {
  data() {
    return {
      items: [], // 菜单数据
      todoId: '' // 默认选中id
    };
  },
  computed: {
    todoList() {
      return this.$store.getters.getTodoList
    }
  },
  created() { // 调用请求菜单列表数据的接口
    this.$store.dispatch('getTodo').then(() => {
      this.$nextTick(() => {
        this.goList(this.todoList[0].id)
      });
    })
  },
  methods: {
    goList(id) { // 点击菜单时候,替换选中id
      this.todoId = id
    },
    addTodoList() { // 点击新增按钮时候
    // 调用新增菜单的接口，在接口调用成功在请求数据
      addTodo({}).then(data => {
        this.$store.dispatch('getTodo').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.goList(this.todoList[this.todoList.length - 1].id)
            }, 100)
          })
        })
      })
    }
  },
  watch: {
    'todoId'(id) {
      this.$router.push({ name: 'todo', params: { id: id } });
      //监听到用户的点击todoId的变化在跳转路由
    }
  }
}
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>