<template>
<div>
<el-button>123</el-button>

	<viewer :images="images">
	   <img v-for="src in images" :src="src" :key="src" width="300">
	</viewer>
    </div>
</template>

<script >
    export default {
        name: "images",
        data() {
            return {
                images : []
            }
        },
        created() {
	        //图片是从后台查的
            this.getData()
        },
        methods: {
            getData() {
                this.images =[
       
        "./static/image/1-201905111052-5ec9095b.png",
        //   'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
    ]
            }
        }
    }
</script>