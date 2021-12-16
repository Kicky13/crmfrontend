<template>
    <div id="tree" ref="tree" />
</template>

<script>
import OrgChart from '@balkangraph/orgchart.js'
import axios from 'axios';

export default {
    name: 'Tree',
    props: ['idJabatan'],
    data() {
        return {
            nodes: [],
        }
    },
    mounted(){
        this.fetchData()
        setTimeout(() => {
            this.mytree(this.$refs.tree, this.nodes)
        }, 500)
    },
    methods: {
        mytree: function(domEl, x) {
            this.chart = new OrgChart (domEl, {
                nodes: x,
                nodeBinding: {
                    field_0: "name",
                    field_1: "title",
                    img_0: "img",
                },
                editForm: {
                    buttons: {
                        edit: null,
                    },
                    generateElementsFromFields: false,
                    elements: [
                        { type: 'textbox', label: 'Nama User', binding: 'name'},
                        { type: 'textbox', label: 'Title Jabatan', binding: 'title'},
                    ],
                },
            });
        },
        fetchData() {
            axios
            .get(`http://localhost:3004/hirarkiTree/${this.idJabatan}`)
            .then(response => {
                response.data.data.map(row => {
                    this.nodes.push({
                        id: row.idJabatan,
                        pid: row.idAtasan,
                        name: row.namaUser,
                        title: row.titleJabatan,
                        img: row.imgUrl,
                        tags: ['main'],
                    })
                })
            })
        },
    },
}
</script>

<style>
.main>rect{
    fill: #b20838 !important;
}
.edit-form.main .edit-form-header,
.edit-form.main .ba-img-button{
    background-color: #b20838 !important;
}
.edit-form.orange .ba-img-button:hover{
    background-color: #b20838 !important;
}
#tree {
  height: 75vh;
}
</style>