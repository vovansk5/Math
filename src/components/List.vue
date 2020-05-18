<template>
    <div>
        <!--
        <ul>
            <li v-for="(item,index) in exAll" :key="index"  class='exLabel' > {{item}}  
                <input v-model="answ[index]" class='answInput' :class="checkAnswer(index)" >
            </li>
        </ul>
        -->
        
        <div class="divImg">
            <img src="../assets/pic2.jpg" alt="Картинка не найдена" class="bigImg">
        </div>

        <transition name=fly>
            <div v-for="i in 5" :key=i>
                <div v-for="index in 5" :key=index class="flyDiv exLabel" v-show="checkFly(index+(i-1)*5)" :style="{left: (index-1)*275+'px', top: (i-1)*155+80 +'px' }" >
                    {{exAll[index+(i-1)*5]}}
                    <input v-model="answ[index+(i-1)*5]" class='answInput' :class="checkAnswer(index+(i-1)*5)" >
                </div>
            </div>
        <trasition>
        <br>
        <button @click="checkFlag=!checkFlag"> Проверить </button>
        <div v-if="test">
            {{checkFlag}}
        </div>
        <!--
        Правильных ответов {{checkResult.Ok}}, Ошибок {{checkResult.Wrang}}, Осталось {{checkResult.j}}
        -->


    </div>        

</template>



<script>
export default {
    props:['ex1','ex2'],
    data() {
        return {
            answ:[],
            ok:1,
            isA:1,
            isB:0,
            checkFlag:false,
            myTop:10
        }
    },
    computed: {
        exAll() {
            let mas=[];
            for(let i=0; i<this.ex1.length; i++) {
                mas.push(this.ex1[i]+' + '+this.ex2[i]+' = ');
            }
            return mas;
        },
        checkAnswer(){
            return (index) => {
                let calc=this.ex1[index]+this.ex2[index]==this.answ[index];
                return{
                    'answerOk' : calc,
                    'answerWrong' : !calc && this.answ[index]>0
                }
            }
        },

        checkAnswerFly(){
            return (index) => {
                let calc=this.ex1[index]+this.ex2[index]==this.answ[index];
                return{
                    'fly' : (this.checkFlag==1) ? calc : 0
                }
            }
        },

        test(){
            return 1;
        },
        checkFly(){
            return (index) => {
                let calc=this.ex1[index]+this.ex2[index]==this.answ[index];
                return (this.checkFlag==1) ? !calc : 1;
            }
        },

        checkResult(){
            let Ok=0,  Wrang=0, j
            for (let i=0 ; i<this.ex1.length ; i++) {
                j= (this.ex1[i]+this.ex2[i]==this.answ[i]);
                Ok+=j;
                Wrang+= (this.answ[i]>0 && !j);
            }
            j=this.ex1.length-Ok-Wrang
            return {Ok,Wrang,j}
        }
    },
    methods: {
        del(index) {
            this.$emit('del',index)
        }
    }

}
</script>


<style>

.divImg {
    padding:10px;
    width:1340px; 
    height:720px ; 
    text-align: center; 
    border: solid 1px black;
    margin-left: 5px;
}

.bigImg {
    /*background-size: cover;*/
    width:auto;
    
    height: 100%;
}

.answerOk {
    background: green;
}
.answerWrong {
    background: red;
}
.answInput {
    color: #fff;
    background:#2a8d7b;
    text-align: center;
    font-family: mel;
    font-size: 30px;
    font-weight: 300;
    line-height: 40px;
    margin: 0 5px 5px;
    width:70px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #555;
}

.flyDiv {
    display: inline-block;
    position: absolute;
    color: #fff;
    font-weight: bold;
    text-shadow: 2px 2px 2px #555;
    background: #2a8d7b;
    text-align: center;
    vertical-align: middle;
    line-height: 120px;
    font-family: mel;
    font-size: 30px;
    margin: 10px;
    width: 270px;
    height:150px;
    border: solid 1px black;
    border-radius: 5px;
}



.exLabelNotUse {
    color: #ffffff;
    font-size: 30px;
    font-weight: 300;
    line-height: 40px;
    margin: 0 5px 5px;
    text-shadow: #555 5px 5px;
}



.goo {
    font-size: 3rem;
    line-height: 1.35;
    display: inline;
    box-decoration-break: clone;
    background: var(--color-highlight);
    padding: 0.5rem 1rem;
    filter: url('#goo');
}


.C{
  width: 100%;
  text-align: center;
  position: absolute;
  font-size: 200px;
  margin: 0;
  color: black;
  text-shadow:
     4px  4px 120px rgba(256, 256, 256, 1),
    -4px -4px 120px rgba(256, 256, 256, 1),
    -4px  4px 120px rgba(256, 256, 256, 1),
     4px -4px 120px rgba(256, 256, 256, 1)
  ;
}

@keyframes anim {
  0%   { opacity: 0; filter: blur(28px)}
  10%  { opacity: 0; }
  90%  { opacity: 1; }
  100% { opacity: 1; filter: blur(6px)}
}
.A{
  animation: anim 5s infinite alternate-reverse;
}
.B{
  animation: anim 5s infinite alternate;
}

</style>