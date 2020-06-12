<template>
    <div id="mainDiv">
        <!--
        <button @click='myhide=!myhide'> Спрятать </button> -->
        <h1>Домашнее задание по математике</h1>
        
        
        <div class="divImg" v-if="myhide">
            <img :src="curPhoto" alt="Картинка не найдена" class="bigImg">


            <transition-group name="fly3"
                leave-active-class="animated bounceOutRight">

                <div v-for="(num,index) in nums" :key=index class="flyDiv" v-show="checkFly(index)" :style="{left: 60+index*235-num*235*5+'px', top: -90+num*147+80 +'px' }"  >
                        {{exAll[index]}}
                        <input v-model="answ[index]" class='answInput' :class="checkAnswer(index)" :disabled="checkFlag" >
                </div>


            </transition-group>

        </div>

        <div class="glo pointerCursor" @click="check" v-if="checkResult.j==1&&checkFlag==0">Ответить </div>
        <div class="glo pointerCursor" @click="check" v-if="checkFlag==1">Начать заново </div>
        <div class="stopCursor glo" v-if="checkResult.j>1">Осталось {{checkResult.j-1}} </div>

        <div id="resultDiv" v-if="checkFlag" >
        Правильно: {{checkResult.Ok}}, ошибок: {{checkResult.Wrang}}.
        </div>
        
    </div>        

</template>

<script>

import {myMail} from "./MyMail.js"

export default {
    data() {
        return {
            answ:[],
            ok:1,
            isA:1,
            isB:0,
            ex1:[],
            ex2:[],
            checkFlag:false,
            myTop:10,
            myhide:1,
            nums:[0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4],
            curPhoto:'./img/1.jpg',
            numPhoto:1
        }
    },
    components:{
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
        check() {
            if (this.checkFlag) {
                this.makeNewEx(); 
            }
            else {
                this.sendMail3();
            }
            this.checkFlag=!this.checkFlag
        },
        makeNewEx(){
            this.ex1.length=0;  
            this.ex2.length=0;
            this.answ.length=0;

            let max=9, min=5;

            for (let i=0 ; i<=25 ; i++) {
            this.ex1.push(Math.round(Math.random()*(max-min)+min));
            this.ex2.push(Math.round(Math.random()*(max-min)+min));

            this.numPhoto=Math.round(Math.random()*18);
            this.curPhoto='./img/'+this.numPhoto+'.jpg'
            }
        },       
        sendMail3(){
            let body;
            body=`<b>Good answer</b> = ${this.checkResult.Ok}, <b>Errors</b> = ${this.checkResult.Wrang}
            , <b>Number photo</b> = ${this.numPhoto}
                <br> <br>
                <b> ${ (this.checkResult.Ok>20) ? " :) " : " :( "} </b>`;
            myMail("vova@septima.ru;kirillnsk12@mail.ru","Fountain of knowledge",body);
        },
        sendMail4(){
            // let body;
            // body=`In Englist По русски`;
            // myMail("vovansk5@gmail.com;vova@septima.ru","TestRus",body);
            localStorage.SeePhoto=this.numPhoto;
        }

    },
    created:function(){
        this.makeNewEx(); 
    }


}
</script>


<style>
#mainDiv {
    border: solid 0px red;
    width:1340px;
    margin:auto;
}

#centerDiv {

}

h1 {
    text-align: center;
    white-space: nowrap;
}

.divImg {
    position:relative;
    padding:10px;
    width:1300px; 
    height:720px ; 
    text-align: center; 
    border: solid 0px black;
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
    border: none;
    margin: 0 5px 5px;
    width:70px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px #555;
}

#resultDiv {
    margin:-41px 150px;
}

.flyDiv {
    display: inline-block;
    position: absolute;
    color: #fff;
    font-weight: bold;
    text-shadow: 2px 2px 2px #555;
    background: #2a8d7b;
    font-family: mel;
    font-size: 30px;
    margin: 10px;
    text-align: center;
    padding:20px;
    width: 192px;
    height:104px;
    border: solid 1px black;
    border-radius: 5px;
}


.fly2-enter-active, .fly2-leave-active {
  transition: all 1s;
}
.fly2-enter, .fly2-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
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

.stopCursor {
  cursor:not-allowed
}

.pointerCursor {
  cursor: pointer;
}

div.glo{
 color:#fff;
 padding: 10px 20px;
 top:850px;
 width:130px;
 text-decoration:none;
 text-align:center;
 margin:auto;
 display: block;
 background-image: linear-gradient(to left,transparent,transparent 50%,#00c6ff 50%,#00c6ff);
 background-position: 100% 0;
 background-size: 200% 100%;
 transition: all .25s ease-in;
 font: 400 18px tahoma;
 border: 1px solid #fff;
}
div.glo:hover {
background-position: 0 0;
color:#fff;
}

</style>