<template>
  <div id="tree" ref="tree" />
</template>

<script>
import OrgChart from '@balkangraph/orgchart.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Tree',
  data() {
    return {
      nodes: [],
    }
  },
  computed: {
    ...mapState({
      userManagement: state => state.userManagement.data,
    }),
  },
  async mounted() {
    // await this.viewTreeHierarchy({
    //   idJabatan: this.$route.params.id_jabatan,
    // })
    await this.fetchDataTree()
  },
  methods: {
    ...mapActions('userManagement', ['viewTreeHierarchy']),
    mytree: function(domEl, x) {
      this.chart = new OrgChart(domEl, {
        nodes: x,
        nodeBinding: {
          field_0: 'name',
          field_1: 'title',
          img_0: 'img',
        },
        editForm: {
          buttons: {
            edit: null,
          },
          generateElementsFromFields: false,
          elements: [
            { type: 'textbox', label: 'Nama User', binding: 'name' },
            { type: 'textbox', label: 'Title Jabatan', binding: 'title' },
          ],
        },
      })
    },
    async fetchDataTree() {
      // this.userManagement.tree.map(row => {
      //   this.userManagement.nodes.push({
      //     id: row.idJabatan,
      //     pid: row.idAtasan,
      //     name: row.namaUser,
      //     title: row.titleJabatan,
      //     img: require('@/assets/images/users.png'),
      //     tags: ['main'],
      //   })
      // })
      this.mytree(this.$refs.tree, this.userManagement.nodes)
    },
  },
}
</script>

<style>
.main > rect {
  fill: #b20838 !important;
}
.edit-form.main .edit-form-header,
.edit-form.main .ba-img-button {
  background-color: #b20838 !important;
}
.edit-form.orange .ba-img-button:hover {
  background-color: #b20838 !important;
}
#tree {
  height: 75vh;
}
</style>
