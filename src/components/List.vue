<template>
    <div id="mainDiv">
        <h1>Домашнее задание по {{lessonType=='math' ? 'математике':'русскому языку'}}</h1>
        
        
        <div class="divImg" >
            <img :src="curPhoto" alt="Картинка не найдена" class="bigImg">


            <transition-group name="fly2"
                leave-active-class="animated bounceOutRight">

                <div v-for="(num,index) in nums" :key=index class="flyDiv" v-show="calcCheckFly(index)" :style="{left: 60+index*235-num*235*5+'px', top: -90+num*147+80 +'px' } " 
                                @click="nextWord(index)" :class=" {fontMel:fontType==1, fontTahoma:fontType==2, flyMiddleOneStr:lessonType=='rusLng'}" >
                        {{exArr[index]}}
                        <input v-show="lessonType=='math'" v-model="answ[index]" class='answInput' :class="calcAnswerClass(index)" :disabled="checkFlag" >
                </div>


            </transition-group>

        </div>
        
        <!-- Кнопка Проверить -->
        <div class="Button pointerCursor" @click="checkTask" v-if="calcTablo.leftAnswer ==1 && checkFlag==0 || 1==0">Проверить </div>
        <div class="Button pointerCursor" @click="checkTask" v-if="checkFlag==1">Начать заново </div>
        <div class="Button stopCursor " v-if="calcTablo.leftAnswer>1">Осталось {{calcTablo.leftAnswer-1}} </div>

        <div class="FontButton Button " v-if="(lessonType=='rusLng')" @click="fontType= (fontType==1) ? 2 :1">Шрифт</div>

        <div id="resultDiv" v-if="checkFlag" >
            Правильно: {{calcTablo.goodAnswer}}, ошибок: {{calcTablo.wrongAnswer}}.
        </div>
        <!-- button @click="sendMail3"> mail </button -->
        
    </div>        

</template>

<script>
/* eslint-disable no-unused-vars */
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
            fontType:1,
            exArr:[],
            rusWords:[
                ['корова', 'карова' ],
                ['солнце','сонце'],
                ['винегрет','венегрет','винигрет'],
                ['сорока','сарока'],
                ['воробей','варабей'],
                ['окно','акно'],
                ['карандаш','корандаш','корондаш','карондаш'],
                ['забор','зобор'],
                ['молоко','малоко','молако'],
                ['валенки','валинки'],
                ['диван','деван'],
                ['фиолетовый','фиалетовый'],
                ['фамилия','фомилия'],
                ['абажур','обажур','абожур'],
                ['автомобиль','афтомобиль','овтамобиль','автамобиль'],
                ['корабль','карабль'],
                ['пальто','польто'],
                ['корзина','карзина'],
                ['пуговица','пугавица'],
                ['поролон','паралон','поралон'],
                ['апельсин','апильсин'],
                ['ягода','ягада'],
                ['облако','облоко'],
                ['яблоко','яблако'],
                ['аллея','оллея','алея'],
                ['окно','акно'],
                ['гражданин','граждонин'],
                ['носок','насок'],
                ['фонарь','фанарь'],
                ['портрет','партрет'],
                ['светофор','светафор'],
                ['вокруг','вакруг'],
                ['конфета','канфета'],
                ['снеговик','снегавик'],
                ['пирамида','перамида'],
                ['девочка','девачка'],
                ['столица','сталица'],
                ['дежурный','дижурный'],
                ['пенал','пинал'],
                ['осина','асина']
               
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
                if (this.checkFlag) {
                    if (this.lessonType=='math') {
                        let calc=this.ex1[index]+this.ex2[index]==this.answ[index];
                        return (this.checkFlag==1) ? !calc : 1;
                    }
                    else {
                        return (this.curWordY[index]==0) ? 0 :1
                    }
                }
                else
                    return 1
            }
        },

        calcTablo(){
            //Считаем количество правильный и неправильных ответов
            let goodAnswer=0,  wrongAnswer=0, leftAnswer=1, i=0;
            if (this.lessonType=='math') {
                for (i=0 ; i<this.ex1.length ; i++) {
                    leftAnswer= (this.ex1[i]+this.ex2[i]==this.answ[i]);
                    goodAnswer+=leftAnswer;
                    wrongAnswer+= (this.answ[i]>0 && !leftAnswer);
                }
                leftAnswer=this.ex1.length-goodAnswer-wrongAnswer
            }
            else {
                if (this.checkFlag==1 || 1==1) {
                    for (i=0 ; i<this.exArr.length ; i++) {
                        if (this.exArr[i]=='кликни')
                                leftAnswer++
                        else  {
                            if (this.curWordY[i]==0)
                                goodAnswer++
                            else 
                                wrongAnswer++;
                            
                        }

                    }
                }
            }
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
                this.makeWords();

            this.numPhoto=Math.round(Math.random()*18);
            this.curPhoto='./img/'+this.numPhoto+'.jpg'

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
                //this.exArr.push(this.rusWords[x][y]);
                this.curWordX.push(x);
                this.curWordY.push(y);

                this.exArr.push('кликни')
                //this.curWordY.push(-1);
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
            let body=`<b>Good answer</b> = ${this.calcTablo.goodAnswer}, <b>Errors</b> = ${this.calcTablo.wrongAnswer}
            , <b>Number photo</b> = ${this.numPhoto}, <b>Lesson</b>= ${this.lessonType}
                <br> <br>
                <b> ${ (this.calcTablo.goodAnswer>20) ? " :) " : " :( "} </b>`;
            //let photoPath=`c:\\temp\\math\\ ${this.numPhoto}.jpg`;
           myMail("vova@septima.ru;kirillnsk12@mail.ru","Fountain of knowledge",body,'');
           //myMail("vova@septima.ru","Fountain of knowledge",body,'');
        }

    },
    created:function(){
        let curDate=(new Date().getDate())+1;
        // По четным дням русский
        if (curDate % 2==1) {
            this.lessonType='rusLng';
            this.fontType=2;
        }
        else {
            this.lessonType='math';
            this.fontType=1;
        }
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

.fontMel {
    font-family: mel;
}

.fontTahoma {
    font-family: Tahoma;
}

.flyDiv {
    display: inline-block;
    position: absolute;
    color: #fff;
    font-weight: bold;
    text-shadow: 2px 2px 2px #555;
    background: #2a8d7b;
    font-size: 30px;
    margin: 10px;
    text-align: center;
    padding:20px;
    width: 192px;
    height:104px;
    border: solid 1px black;
    border-radius: 5px;
}

.flyMiddleOneStr {
    padding-top:50px;
    height:74px;
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

div.Button{
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

div.Button:hover {
    background-position: 0 0;
    color:#fff;
}

div.FontButton {
    margin-top:-45px;
    margin-right: 90px;
}

</style>