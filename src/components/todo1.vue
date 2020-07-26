<template>
  <div class="page lists-show">
    <!--头部模块,容器上半部分-->
    <nav>
      <!-- 当用户浏览车窗口尺寸小于40em时候，显示手机端的菜单图标。在菜单的图标调用action.js的updateMenu方法 -->
      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>
      <!-- 显示标题和数字模块 -->
      <h1 class="title-page">
        <span class="title-wrapper">{{todo.title}}</span>
        <span class="count-list">{{todo.count || 0}}</span>
      </h1>
      <!-- 右边显示删除图标和锁定图标的模块 -->
      <div class="nav-group right">
        <div class="options-web"> 
          <a class=" nav-item"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item"> <!-- 删除图标-->
            <span class="icon-trash">
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
      <div v-for="item in items" :key="item">
        <item :item="item"></item>
        <!--通过prop把数据传输给子组件 item-->
      </div>
      <!-- <item></item>测试已和item.vue -->
    </div>
  </div>
</template>

<script>
import item from './item'
import { getTodo,addRecord  } from '../api/api'
export default {
  data() {
    return {
      todo: { //详情内容
        title: '星期一',
        count: 12,
        locked: false
      },
      items: [ //代办单项列表
        // { checked: false, text: '新的一天', isDelete: false },
        // { checked: false, text: '新的一天', isDelete: false },
        // { checked: false, text: '新的一天', isDelete: false }
      ],
      text: '' //代办单项绑定的值
    }
  },
  created() {
  // created生命周期，在实例已经创建完成，页面还没渲染时调用init方法。
    this.init()
  },
  methods: {
    onAdd() {
      // this.items.push({
      //   checked: false, text: this.text, isDelete: false
      // }); // 当用户点击回车时候 ，给items的值新增一个对象，this.text 即输入框绑定的值
      // this.text = ''; //初始化输入框的值。
      const ID = this.$route.params.id  //当用户输入文字，并且回车时调用次方法。
      addRecord({ id: ID, text: this.text }).then(res => {
        this.text = ''
        this.init() //请求成功后初始化
      })
    },
    init() {
    // 获取到 $route下params下的id,即我们在menus.vue组件处传入的数据。
      const ID = this.$route.params.id;
      getTodo({ id: ID }).then(res => {
      
        let { id, title, count, isDelete, locked, record
        } = res.data.todo;
        // 请求成功，拿到res.data.todo;在将record 赋值到代办单项列表，其它数据赋值到todo对象
        this.items = record;
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        }
      })
    }
  },
  watch: {
    '$route.params.id'() {
    // 监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据。
      this.init();
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