// 定义所需的 mutations
const mutations = {
  EDITTODE(state, data) { // 定义名为 EDITTODE函数用作改变todoList的值
    state.todoList = data;
  },
  MENUOPEN(state) { // 定义名为 MENUOPEN函数用作改变menuOpen的值
    state.menuOpen = !state.menuOpen;
  }
}

export default mutations