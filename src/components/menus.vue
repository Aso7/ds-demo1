<template>
  <el-tree :data="menu" :props="defaultProps" @node-click="handleNodeClick">
  </el-tree>
</template>
<script>
import { mapState, mapActions } from "vuex"
console.log(...mapState(['menu']))
export default {
  name: "menus",
  data() {
    return {
      defaultProps: {
        children: 'submenus',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapState(['menu'])
    
  },
  methods: {
    handleNodeClick(menu) {
      console.log(menu);
    },
    ...mapActions(['fetchMenu'])
  },
  mounted() {
    this.fetchMenu()
  }
}
</script>
<style>
.el-tree{
  width: 200px;
  background:#E9EEF3
}
</style>
