<template>
  <div class="page lists-show" v-show="!todo.isDelete">
    <!--头部模块,容器上半部分-->
    <nav>
      <!-- 当用户浏览车窗口尺寸小于40em时候，显示手机端的菜单图标。在菜单的图标调用action.js的updateMenu方法 -->
      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>
      <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
      <div class="form list-edit-form" v-show="isUpdate">
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
          <a class="nav-item" @click="isUpdate = false">
            <span class="icon-close">
            </span>
          </a>
        </div>
      </div>
      <!-- 显示标题和数字模块 -->
      <h1 class="title-page" v-show="!isUpdate" @click="isUpdate = true">
        <span class="title-wrapper">{{todo.title}}</span>
        <span class="count-list">{{todo.count || 0}}</span>
      </h1>
      <!-- 右边显示删除图标和锁定图标的模块 -->
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options-web"> 
          <a class="nav-item"  @click="onlock"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item"> <!-- 删除图标-->
            <span class="icon-trash" @click="onDelete">
            </span>
          </a>
        </div>
      </div>
      <!-- 用户新增代办事项的input模块 -->
      <div class=" form todo-new input-symbol"> <!-- 监听了disabled属性，在todo.locked为true的情况下无法编辑-->
        <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked" />
        <span class="icon-add"></span>
      </div>
    </nav>
    <!-- 列表主体模块,容器下半部分 -->
    <div class="content-scrollable list-items">
      <div v-for="(item,index) in items" :key="index">
        <item :item="item" :index="index" :id="todo.id" :init="init" :locked="todo.locked"></item>
      </div>
    </div>
  </div>
</template>

<script>
import item from './item'
import { getTodo,addRecord,editTodo } from '../api/api'
export default {
  data() {
    return {
      todo: { //详情内容
        title: '星期一',
        count: 12,
        locked: false
      },
      items: [], //代办单项列表
      text: '', //代办单项绑定的值
      isUpdate: false //修改状态
    }
  },
  created() {
  // created生命周期，在实例已经创建完成，页面还没渲染时调用init方法。
    this.init()
  },
  methods: {
    init() {
    // 获取到 $route下params下的id,即我们在menus.vue组件处传入的数据。
      const ID = this.$route.params.id
      getTodo({ id: ID }).then(res => {
        let { id, title, count, isDelete, locked, record } = res.data.todo
        // 请求成功，拿到res.data.todo;在将record 赋值到代办单项列表，其它数据赋值到todo对象
        this.items = record
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        }
      })
    },
    onAdd() {
      const ID = this.$route.params.id  //当用户输入文字，并且回车时调用次方法。
      addRecord({ id: ID, text: this.text }).then(res => {
        this.text = ''
        this.init() //请求成功后初始化
        this.$store.dispatch('getTodo')
      })
    },
    updateTodo() { //修改代办项标题
      let _this = this
      editTodo({
        todo: this.todo
      }).then(data => {
        // _this.init()
        _this.$store.dispatch('getTodo')
      })
    },
    updateTitle() { //修改代办项标题
      this.updateTodo()
      this.isUpdate = false
    },
    onlock() { //锁定代办项
      this.todo.locked = !this.todo.locked
      this.updateTodo()
    },
    onDelete() { //删除代办项
      this.todo.isDelete = true
      this.updateTodo()
    }
  },
  watch: {
    '$route.params.id'() {
    // 监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据。
      this.init()
    }
  },
  components: {
      item
    }
}
</script>

<style lang = "less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>