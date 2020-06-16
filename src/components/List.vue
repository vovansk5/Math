<template>
    <div id="mainDiv">
        <h1>Домашнее задание по {{lessonType=='math' ? 'математике':'русскому языку'}}</h1>
        
        
        <div class="divImg" >
            <img :src="curPhoto" alt="Картинка не найдена" class="bigImg">


            <transition-group name="fly2"
                leave-active-class="animated bounceOutRight">

                <div v-for="(num,index) in nums" :key=index class="flyDiv" v-show="calcCheckFly(index)" :style="{left: 60+index*235-num*235*5+'px', top: -90+num*147+80 +'px' } " @click="nextWord(index)" >
                        {{exArr[index]}}
                        <input v-show="lessonType=='math'" v-model="answ[index]" class='answInput' :class="calcAnswerClass(index)" :disabled="checkFlag" >
                </div>


            </transition-group>

        </div>
        
        <!-- Кнопка Проверить -->
        <div class="checkButton pointerCursor" @click="checkTask" v-if="calcTablo.leftAnswer ==1 && checkFlag==0 || 1==0">Ответить </div>
        <div class="checkButton pointerCursor" @click="checkTask" v-if="checkFlag==1">Начать заново </div>
        <div class="checkButton stopCursor " v-if="calcTablo.leftAnswer>1">Осталось {{calcTablo.leftAnswer-1}} </div>

        <div id="resultDiv" v-if="checkFlag" >
            Правильно: {{calcTablo.goodAnswer}}, ошибок: {{calcTablo.wrongAnswer}}.
        </div>
        
    </div>        

</template>

<script>

import {myMail} from "./MyMail.js"

export default {
    data() {
        return {
            lessonType:'rusLng', //math,rusLng
            answ:[],
            ok:1,
            ex1:[],
            ex2:[],
            checkFlag:false,
            nums:[0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4],
            curPhoto:'./img/1.jpg',
            numPhoto:1,
            exArr:[],
            rusWords:[
                ['1', '2' , '3'],
                ['11','12','13'],
                ['21','22']
            ],
            curWordX:[],
            curWordY:[]

        }
    },
    components:{
    },
    computed: {
        calcAnswerClass(){
            //Не используется, но возможно понадобится. Подсвечивает правильный ответ зеленым, неправильный красным
            return (index) => {
                let calc=this.ex1[index]+this.ex2[index]==this.answ[index];
                return{
                    'answerOk' : calc,
                    'answerWrong' : !calc && this.answ[index]>0
                }
            }
        },

        calcCheckFly(){
            return (index) => {
                let calc=this.ex1[index]+this.ex2[index]==this.answ[index];
                return (this.checkFlag==1) ? !calc : 1;
            }
        },

        calcTablo(){
            //Считаем количество правильный и неправильных ответов
            let goodAnswer=0,  wrongAnswer=0, leftAnswer
            for (let i=0 ; i<this.ex1.length ; i++) {
                leftAnswer= (this.ex1[i]+this.ex2[i]==this.answ[i]);
                goodAnswer+=leftAnswer;
                wrongAnswer+= (this.answ[i]>0 && !leftAnswer);
            }
            leftAnswer=this.ex1.length-goodAnswer-wrongAnswer
            return {goodAnswer,wrongAnswer,leftAnswer}
        }
    },
    methods: {
        checkTask() {
            if (this.checkFlag) {
                this.makeNewTask(); 
            }
            else {
                this.sendMail3();
            }
            this.checkFlag=!this.checkFlag
        },
        makeNewTask(){
            if (this.lessonType=='math') {
                this.makeNewMath()
            }
            else 
                this.makeWords()
        },         
        makeNewMath(){
            this.ex1.length=0;  
            this.ex2.length=0;
            this.answ.length=0;

            let max=9, min=5;

            for (let i=0 ; i<=25 ; i++) {
                this.ex1.push(Math.round(Math.random()*(max-min)+min));
                this.ex2.push(Math.round(Math.random()*(max-min)+min));
                this.exArr.push(this.ex1[i]+' + '+this.ex2[i]+' = ');
            }
            this.numPhoto=Math.round(Math.random()*18);
            this.curPhoto='./img/'+this.numPhoto+'.jpg'

        },     
        makeWords() {
            let i=0;
            let x,y;
            this.exArr.length=0;
            this.curWordX.length=0;
            this.curWordY.length=0;
            while (i++<25) {
                x=Math.floor(Math.random() * this.rusWords.length);
                y=Math.floor(Math.random() * this.rusWords[x].length) ;
                this.exArr.push(this.rusWords[x][y]);
                this.curWordX.push(x);
                this.curWordY.push(y);
            }
        },          

        nextWord(id) {
            let x=this.curWordX[id],
                y=this.curWordY[id];
            y=(y==this.rusWords[x].length-1)? 0 : y+1;
            console.log('id='+id+', x='+x+ ',y='+y);

            this.exArr.splice(id,1,this.rusWords[x][y]);
            this.curWordY[id]=y;

        },

        sendMail3(){
            let body;
            body=`<b>Good answer</b> = ${this.calcTablo.goodAnswer}, <b>Errors</b> = ${this.calcTablo.wrongAnswer}
            , <b>Number photo</b> = ${this.numPhoto}
                <br> <br>
                <b> ${ (this.calcTablo.goodAnswer>20) ? " :) " : " :( "} </b>`;
            myMail("vova@septima.ru;kirillnsk12@mail.ru","Fountain of knowledge",body);
        }

    },
    created:function(){
        this.makeNewTask(); 
    }


}
</script>



<style>
/**************************************************************************
                STYLE
**************************************************************************/
#mainDiv {
    border: solid 0px red;
    width:1340px;
    margin:auto;
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
    transition: all 2s;
}
.fly2-enter, .fly2-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}

.stopCursor {
    cursor:not-allowed
}

.pointerCursor {
    cursor: pointer;
}

div.checkButton{
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


div.checkButton:hover {
    background-position: 0 0;
    color:#fff;
}

</style>