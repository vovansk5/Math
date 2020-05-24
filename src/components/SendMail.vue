<template>
    <div>
        {{test}}
        {{hashTegs}}
    </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
export default {
    props:[
        'mailTo','mailForm','Subject','Body'
    ],
    data() {
        return {
            test:1242,
            hashTegs:[]
        }
    },
    methods:{
        sendMail() {
            this.test=51;
            console.log(this.test);
            axios.get('https://dka-develop.ru/api?type=hashtag').then ((response)=>{
                this.hashTegs = response.data;
                console.log(response.data);

            })

        }
    },
    created() {
        this.sendMail();
    }
}

</script>

<style>

</style>