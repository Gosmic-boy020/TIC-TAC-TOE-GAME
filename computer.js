import { messageToPage,sendSwitchingKeyResponse,themeChanger,arr1 } from "./publicFunctions.js";


let toss_winner='';
const person="X";
const computer="O";

const disPerson1=`<p class="logo-X">X</p>`;
const disPerson2=`<p class="logo-O">O</p>`;

let per1='';
let per2='';

let switchingKey=``;
let moves=0;
let gameEnd=false;

let camMove='';
let camWinMove=''
let finalComMove='';


let tosVal1;
let tossVal2;

const x=findValue("sound");

 export function toss(val1,val2){
  messageToPage('select-options',val1)
  moves=0;
  tosVal1=val1;
  tossVal2=val2;
  const html=`
  <h2>Try to Win the Toss to Make First Move</h2>
  <h2>CHOOSE ONE</h2>
 <button class="sty-btn head" data-hed="0">HEADS</button>
 <button class="sty-btn tail" data-tai="1">TAILS</button>
  `;
  document.querySelector('.toss-area').innerHTML=html;
  document.querySelectorAll('.sty-btn').forEach((item)=>{
    item.addEventListener('click',()=>{
      HTrandom(val1,val2,item);
    });
    
  })
 }

 function HTrandom(val1,val2,obj){
 const ranVal =Math.random();
 if(ranVal>=0 && ranVal<=1/2){
  toss_winner='X';
  switchingKey=person;
  messageToPage('select-options','<p class="mod-nam">You Won Toss</p>')
  messageToPage('toss-area','You have to place first--->>');

  setTimeout(()=>{
    themeChanger(disPerson2);
    botCellsDisplay(val1,val2);
    messageToPage('msg',`NOW ${per1} : ${person} `);
  },3000)
 }else if(ranVal>=1/2 && ranVal<=1){
  toss_winner='O';
  messageToPage('select-options','<p class="mod-nam">Bot Won Toss</p>');
  messageToPage('toss-area','Bot have to place first----<')
  setTimeout(()=>{
    botCellsDisplay(val1,val2);
    themeChanger(disPerson1)
    messageToPage('msg',`NOW ${per2} : ${computer} `);
    analyseGame();
  },3000)
 }

  
 }


 function botCellsDisplay(modNam,obj){

 console.log(obj.innerHTML);
  const modValue1=obj.dataset.mod;
  let presentGameMode='';

  if(modValue1=='1'){
    per1=arr1[2];
    per2=arr1[3];
    presentGameMode=modValue1;
  }

messageToPage('select-options',modNam);
messageToPage('toss-area','');

messageToPage('msg',`NOW ${toss_winner=='X'?per1:per2}:${toss_winner}`)
const html=`
    <div class="X11 cell" data-cellname='X11'></div>    <div class="X12 cell" data-cellname='X12'></div>   <div class="X13 cell" data-cellname='X13'></div>

    <div class="X21 cell" data-cellname='X21'></div>   <div class="X22 cell" data-cellname='X22'></div>   <div class="X23 cell" data-cellname='X23'></div>

    <div class="X31 cell" data-cellname='X31'></div>    <div class="X32 cell" data-cellname='X32'></div>   <div class="X33 cell" data-cellname='X33'></div>
`;
document.querySelector('.game-Pad').innerHTML=html;
console.log('game started');

  

  

    document.querySelectorAll('.cell').forEach((item)=>{
      item.addEventListener('click',()=>{
        const cellValue=item.dataset.cellname;
        const htmlValue=item.innerHTML;
        //console.log(`cell: ${item.innerHTML} :clicked`);
        
        
        if(htmlValue==disPerson1 || htmlValue==disPerson2){
          if(gameEnd==false ){
              messageToPage('msg2','CHOOSE OTHER CELL 1');
              setTimeout(()=>{
                messageToPage('msg2','');
              },1500);
          }
          
        }else{
          if(htmlValue!=disPerson1 && htmlValue!==disPerson2 && gameEnd==false){
            console.log('cellvalue:',cellValue);
            console.log(moves);

            ////play game method////
            if(gameEnd==false && presentGameMode=='1'){
              playGame(cellValue,item);
            }
                  

          }else{
            if(gameEnd==false){
              messageToPage('msg2','CHOOSE OTHER CELL 2');
            setTimeout(()=>{
              messageToPage('msg2','');
            },1500);
            }
            
          }
          
        }
        

        //console.log('item:',item);
      });

      

    });

   
}



 function playGame(val1,obj){


  if(switchingKey=='X' && gameEnd==false){
    personMove(val1,obj);
    themeChanger(disPerson1);
    analyseGame(val1,obj);
  }
   
}

function personMove(cellValue,obj){
  console.log('person moved',cellValue,obj);
  x.play();
  sendSwitchingKeyResponse(cellValue,disPerson1);
  moves+=1;
  messageToPage('msg',`NOW ${per2} : ${computer} `);
  checkGameStatus(switchingKey);
  
  switchingKey=computer;
  
}






function analyseGame(hisCellValue,obj1){

  if(gameEnd==false){

    const campi=findValue('select-options');
    campi.classList.add("bot-thinking");

 messageToPage('select-options','<p class="mod-nam">BOT THINKING...</p>');
 
  const row11=document.querySelector('.X11').innerHTML;
  const row12=document.querySelector('.X12').innerHTML;
  const row13=document.querySelector('.X13').innerHTML;

  const row21=document.querySelector('.X21').innerHTML;
  const row22=document.querySelector('.X22').innerHTML;
  const row23=document.querySelector('.X23').innerHTML;

  const row31=document.querySelector('.X31').innerHTML;
  const row32=document.querySelector('.X32').innerHTML;
  const row33=document.querySelector('.X33').innerHTML;

  let randomValue='';
  let thatcellValue='';

    function randomGene(){
    
    let ranValue= Math.random();

    if(ranValue>=0 && ranValue<=1/9){
      randomValue='X11';
    }else if(ranValue>=1/9 && ranValue<=2/9){
      randomValue='X12';
    }else if(ranValue>=2/9 && ranValue<=3/9){
      randomValue='X13';
    }else if(ranValue>=3/9 && ranValue<=4/9){
      randomValue='X21'
    }else if(ranValue>=4/9 && ranValue<=5/9){
      randomValue='X22';
    }else if(ranValue>=5/9 && ranValue<=6/9){
      randomValue='X23';
    }else if(ranValue>=6/9 && ranValue<=7/9){
      randomValue='X31';
    }else if(ranValue>=7/9 && ranValue<=8/9){
      randomValue='X32';
    }else if(ranValue>=8/9 && ranValue<=1){
      randomValue='X33';
    }
    
    thatcellValue=document.querySelector(`.${randomValue}`).innerHTML;
  }
  

  

if(toss_winner==person){
  thinking();
  thinkForWin();
  if(camMove!='' && camWinMove==''){
    finalComMove=camMove;
    console.log('Valu Added in PERSON')
  }else if(camWinMove!=''){
    finalComMove=camWinMove;
    console.log('Valu Added in PERSON')
  }
 
}else if(toss_winner==computer){
console.log('BOT TRYING TO Win>>');
  thinking();
  thinkForWin();
  if(camMove!='' && camWinMove==''){
    finalComMove=camMove;
    console.log('Valu Added in COMPUTER')
  }else if(camWinMove!=''){
    finalComMove=camWinMove;
    console.log('Valu Added in COMPUTER')
  }
  
  

 
  
}

function thinking(){
  if(row11==disPerson1 && row12==disPerson1 && row13==''){
    camMove='X13';
  }else if(row21==disPerson1 && row22==disPerson1 && row23==''){
      camMove='X23';
    }else if(row31==disPerson1 && row32==disPerson1 && row33==''){
        camMove='X33';
    }else if(row13==disPerson1 && row12==disPerson1 && row11==''){
      camMove='X11';
    }else if(row23==disPerson1 && row22==disPerson1 && row21==''){
      camMove='X21';
    }else if(row33==disPerson1 && row32==disPerson1 && row31==''){
      camMove='X31';
    }else if(row11==disPerson1 && row21==disPerson1 && row31==''){
      camMove='X31';
    }else if(row12==disPerson1 && row22==disPerson1 && row32==''){
      camMove='X32';
    }else if(row13==disPerson1 && row23==disPerson1 && row33==''){
      camMove='X33';
    }else if(row31==disPerson1 && row21==disPerson1 && row11==''){
      camMove='X11';
    }else if(row32==disPerson1 && row22==disPerson1 && row12==''){
      camMove='X12';
    }else if(row33==disPerson1 && row23==disPerson1 && row13==''){
      camMove='X13';
    }else if(row11==disPerson1 && row22==disPerson1 && row33==''){
      camMove='X33';
    }else if(row33==disPerson1 && row22==disPerson1 && row11==''){
      camMove='X11';
    }else if(row13==disPerson1 && row22==disPerson1 && row31==''){
      camMove='X31';
    }else if(row31==disPerson1 && row22==disPerson1 && row13==''){
      camMove='X13';
    }else if(row11==disPerson1 && row31==disPerson1 && row21==''){
      camMove='X21';
    }else if(row13==disPerson1 && row33==disPerson1 && row23==''){
      camMove='X23';
    }else if(row11==disPerson1 && row13==disPerson1 && row12==''){
      camMove='X12';
    }else if(row31==disPerson1 && row33==disPerson1 && row32==''){
      camMove='X32';
    }
    else {

      console.log('random value assigning in thinking...')
        if(row22=='' || row11==''){
          if(row11=='' && row22!=''){
            camMove='X11'
          }else{
            camMove='X22';
          }
          
        }else{
            randomGene();
            if(randomValue==hisCellValue){
              randomGene();
              thinking();
            }else {
              if(randomValue!=hisCellValue && thatcellValue!=''){
              randomGene();
              thinking();
            }else{
              if(randomValue!=hisCellValue && thatcellValue==''){
                camMove=randomValue;
              }
            }
          }
            console.log('random value assigned>>>>')
        }
        
        
    }
    
  


   
      
  
    

  }


  function thinkForWin(){

  if((row11==disPerson2 && row12==disPerson2 && row13=='')){
    camWinMove='X13';
  }else if((row21==disPerson2 && row22==disPerson2 && row23=='')){
      camWinMove='X23';
    }else if((row31==disPerson2 && row32==disPerson2 && row33=='')){
        camWinMove='X33';
    }else if((row13==disPerson2 && row12==disPerson2 && row11=='')){
      camWinMove='X11';
    }else if((row23==disPerson2 && row22==disPerson2 && row21=='')){
      camWinMove='X21';
    }else if((row33==disPerson2 && row32==disPerson2 && row31=='')){
      camWinMove='X31';
    }else if((row11==disPerson2 && row21==disPerson2 && row31=='')){
      camWinMove='X31';
    }else if((row12==disPerson2 && row22==disPerson2 && row32=='')){
      camWinMove='X32';
    }else if((row13==disPerson2 && row23==disPerson2 && row33=='')){
      camWinMove='X33';
    }else if((row31==disPerson2 && row21==disPerson2 && row11=='')){
      camWinMove='X11';
    }else if((row32==disPerson2 && row22==disPerson2 && row12=='')){
      camWinMove='X12';
    }else if((row33==disPerson2 && row23==disPerson2 && row13=='')){
      camWinMove='X13';
    }else if((row11==disPerson2 && row22==disPerson2 && row33=='')){
      camWinMove='X33';
    }else if((row33==disPerson2 && row22==disPerson2 && row11=='')){
      camWinMove='X11';
    }else if((row13==disPerson2 && row22==disPerson2 && row31=='')){
      camWinMove='X31';
    }else if((row31==disPerson2 && row22==disPerson2 && row13=='')){
      camWinMove='X13';
    }else if((row11==disPerson2 && row31==disPerson2 && row21=='')){
      camWinMove='X21';
    }else if((row13==disPerson2 && row33==disPerson2 && row23=='')){
      camWinMove='X23';
    }else if((row11==disPerson2 && row13==disPerson2 && row12=='')){
      camWinMove='X12';
    }else if((row31==disPerson2 && row33==disPerson2 && row32=='')){
      camWinMove='X32';
    }
    else {

      console.log('random value assigning in think For Win...');

        if(row22=='' || row11=='' ||row13=='' || row31==''|| row33==''){
          if(row22==''){
            camMove='X22';
          }else if(row11=='' && row22==computer){
            camMove='X11';
          }else if(row13=='' && row22==computer){
            camMove='X13';
          }else if(row31=='' && row22==computer){
            camMove='X31'
          }else if(row33=='' && row22==computer){
            camMove='X33'
          }
          
        }else{
            randomGene();
            if(randomValue==hisCellValue){
              randomGene();
              thinkForWin()
            }else {
              if(randomValue!=hisCellValue && thatcellValue!=''){
              randomGene();
              thinkForWin()
            }else{
              if(randomValue!=hisCellValue && thatcellValue==''){
                finalComMove=randomValue;
                
              }
            }
          }
            console.log('random value assigned>>>>')
        }
    }
    
  


   
      
  
    

  }




  setTimeout(()=>{
      themeChanger(disPerson2);
      console.log('computer moved',hisCellValue,obj1,camMove);
      sendSwitchingKeyResponse(finalComMove,disPerson2);
      x.play();
      moves+=1;
      messageToPage('msg',`NOW ${per1} : ${person} `);
      campi.classList.remove("bot-thinking");
      
      checkGameStatus(switchingKey)
      switchingKey=person;
      
      messageToPage('select-options',`<p class="mod-nam">${tossVal2.innerHTML}</p>`);
},2000)

  }


   
}


 


export function findValue(cls){
  return document.querySelector(`.${cls}`);
}



///CHECKING GAME STATUS AND FINALISE WINNER/////
export function checkGameStatus(recentMove){
  const row11=document.querySelector('.X11').innerHTML;
  const row12=document.querySelector('.X12').innerHTML;
  const row13=document.querySelector('.X13').innerHTML;

  const row21=document.querySelector('.X21').innerHTML;
  const row22=document.querySelector('.X22').innerHTML;
  const row23=document.querySelector('.X23').innerHTML;

  const row31=document.querySelector('.X31').innerHTML;
  const row32=document.querySelector('.X32').innerHTML;
  const row33=document.querySelector('.X33').innerHTML;

  if(row11==disPerson1 && row12==disPerson1 && row13==disPerson1){
    gameOver(recentMove);
  }else{
    if(row11==disPerson2 && row12==disPerson2 && row13==disPerson2){
      
      gameOver(recentMove);
    }else{
      if(row21==disPerson1 && row22==disPerson1 && row23==disPerson1){
        gameOver(recentMove);
      }else{
        if(row21==disPerson2 && row22==disPerson2 && row23==disPerson2){
          gameOver(recentMove);
        }else{
          if(row31==disPerson1 && row32==disPerson1 && row33==disPerson1){
            gameOver(recentMove);
          }else{
            if(row31==disPerson2 && row32==disPerson2 && row33==disPerson2){
              gameOver(recentMove);
            }else{
              if(row11==disPerson1 && row21==disPerson1 && row31==disPerson1){
                gameOver(recentMove);
              }else{
                if(row11==disPerson2 && row21==disPerson2 && row31==disPerson2){
                  console.log('winner here')
                  gameOver(recentMove);
                }else{
                  if(row12==disPerson1 && row22==disPerson1 && row32==disPerson1){
                    gameOver(recentMove);
                  }else{
                    if(row12==disPerson2 && row22==disPerson2 && row32==disPerson2){
                      gameOver(recentMove);
                    }else{
                      if(row13==disPerson1 && row23==disPerson1 && row33==disPerson1){
                        gameOver(recentMove);
                      }else{
                        if(row13==disPerson2 && row23==disPerson2 && row33==disPerson2){
                          gameOver(recentMove);
                        }else{
                          if(row11==disPerson1 && row22==disPerson1 && row33==disPerson1){
                            gameOver(recentMove);
                          }else{
                            if(row11==disPerson2 && row22==disPerson2 && row33==disPerson2){
                              gameOver(recentMove);
                            }else{
                              if(row13==disPerson1 && row22==disPerson1 && row31==disPerson1){
                                gameOver(recentMove);
                              }else{
                                if(row13==disPerson2 && row22==disPerson2 && row31==disPerson2){
                                  gameOver(recentMove);
                                }else{
                                  
                                  if(moves>=9){
                                    gameOver('MATCH TIE');
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  console.log(row11,row12,row13);
  console.log(row21,row22,row23);
  console.log(row31,row32,row33);
  console.log(moves);

}

function gameOver(recentMove){
  gameEnd=true;
 
  messageToPage('msg','');
  if(recentMove=='MATCH TIE'){
    
    messageToPage('msg',`<button class='replay'>${recentMove} SO RETRY</button><br>`)
  }else if(recentMove=='X' || recentMove=='O'){
    recentMove==computer?themeChanger(disPerson1):themeChanger(disPerson2);
    document.querySelector('.msg').innerHTML=`${recentMove=='X'?`${per1}`:`${per2}`} '${recentMove}' WINNER 👑${moves}<p><button class='replay'>REPLAY</button></p>`;
    
  }
  if(recentMove==undefined){
    messageToPage('game-Pad','');
    messageToPage('msg','GAME...ENDED...BY...SCRIPT..CHECK....ONCE ')
  }
  console.log('GAME OVER......')
   document.querySelectorAll('.replay').forEach((item)=>{
    item.addEventListener('click',()=>{
      messageToPage('game-pad','');
      messageToPage('msg','');
      gameEnd=false;
      toss(tosVal1,tossVal2);
    })
   })

    moves=0;
    camMove='';
    camWinMove='';
    finalComMove='';
}
