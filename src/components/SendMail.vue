<template>
    <div>
        {{test}}
        {{hashTegs}}
        adsssssssssssssssss
    </div>
</template>

<script>

//import {HTTPtestBB} from './http-common';

export default {
    props:[
        'mailTo','mailForm','Subject','Body'
    ],
    data() {
        return {
            test:1242,
            hashTegs:[],
            postBodyBB:''
        }
    },
    methods:{
        sendMail() {
               alert(`Привет dddddd ${this.mailto}`)
        }
        /*,
        myPost() {
          HTTPtestBB.post(``,this.postBodyBB) 
          .then ((response)=> {
            this.webResponse=response.data;
          })
      },    */    

    },
    created() {
         this.sendMail()
    }
}

</script>

<style>

</style>