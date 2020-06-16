<template>
    <div>
        Это русский язык <br>
        <div v-for="(item,id) in curArr" @click="nextWord(id)" :key=id>
            {{item}}
        </div>
        testWord={{testWord}}
        <br>
        <button @click="createWord"> Новый массив </button>
         <br>
        <button @click="nextWord(1)"> Следующее слово </button>
        {{curArr}}
    </div>
  
</template>

<script>
export default {
    data() {
        return {
            word:{
                word:'корова'
            },
            warr:[
                ['1', '2' , '3'],
                ['11','12','13'],
                ['21','22']
            ],
            x:0,
            y:0,
            testWord:'',
            curArr:[],
            curX:[],
            curY:[]
        }
    },
    methods: {
        createWord() {
            let i=0;
            let x,y;
            this.curArr.length=0;
            this.curX.length=0;
            this.curY.length=0;
            while (i++<3) {
                x=Math.floor(Math.random() * this.warr.length);
                y=Math.floor(Math.random() * this.warr[x].length) ;
                this.curArr.push(this.warr[x][y]);
                this.curX.push(x);
                this.curY.push(y);
            }


        },
        nextWord(id) {
            let x=this.curX[id],
                y=this.curY[id];
            y=(y==this.warr[x].length-1)? 0 : y+1;
            console.log('id='+id+', x='+x+ ',y='+y);

            this.curArr.splice(id,1,this.warr[x][y]);
            this.curY[id]=y;

        },
        testProc() {
            this.testWord='ddddddddddd';
            this.curArr.push(5);
        }
    }

}
</script>

<style>
    span {
        display: inline;
    }

</style>