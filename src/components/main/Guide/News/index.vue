<template>
    <div>
        <img
            :src="guide_data[index - 1].image_src"
            :alt="guide_data[index - 1].title"
            class="d-block img-fluid img-pos"
        >
        <h4>{{guide_data[index - 1].title}}</h4>
        <p>{{guide_data[index - 1].content}}</p>
    </div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
        },
    },
    data() {
        return {
            guide_data: [
                {
                    image_src: 'https://img.freepik.com/free-vector/office-concept-illustration_114360-1248.jpg?size=626&ext=jpg',
                    title: 'CRM AksesToko',
                    content: 'Selamat datang di Solusi Digital Semen Indonesia',
                },
                {
                    image_src: 'https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=20&m=1139913278&s=612x612&w=0&h=Ue0Nh74fYCnNd5hfwBCLwJ2VeZqjXxnI5iEXqqTLXb8=',
                    title: 'Let\'s start with the basics',
                    content: 'Provide some basics information to help people discover your event',
                },
            ],
        }
    },
    mounted() {
        this.getGuideDataLength()
    },
    methods: {
        getGuideDataLength() {
            this.$emit('getData', this.guide_data.length)
        },
    },
}
</script>

<style scoped>
.img-pos {
    height: 250px;
    margin: auto;
}
</style>