<template>
  <!-- <div id="tree" ref="tree" /> -->
  <blocks-tree
    :data="treeData"
    :collapsable="true"
    :label-width="275"
  >
    <template #node="{ data }">
      <div>
        <div class="d-flex justify-content-between mb-3">
          <img :src="data.imgUrl" alt="" width="70">
          <p class="text-white">{{ data.titleJabatan }}</p>
        </div>
        <h6 class="text-white">{{ data.namaUser }}</h6>
      </div>
    </template>
  </blocks-tree>
  <div></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Tree',
  data() {
    return {
      nodes: [],
      treeData: {
        namaUser: '',
        titleJabatan: '',
        children: [],
        imgUrl: null,
      },
    }
  },
  computed: {
    ...mapState({
      userManagement: (state) => state.userManagement.data,
    }),
  },
  async mounted() {
    await this.fetchDataTree(this.userManagement.nodes[0])
  },
  methods: {
    ...mapActions('userManagement', ['viewTreeHierarchy']),
    async fetchDataTree({ namaUser, titleJabatan, children, imgUrl }) {
      this.treeData.namaUser = namaUser
      this.treeData.titleJabatan = titleJabatan
      this.treeData.children = children
      this.treeData.imgUrl = imgUrl
    },
  },
}
</script>

<style>
.org-tree-node-label {
  background: #b20838;
  border-radius: 10px;
}
.org-tree-node-label-inner {
  height: 125px;
}
.image-view {
  position: absolute;
  top: 0;
  left: 0;
}
</style>