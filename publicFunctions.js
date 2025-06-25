export const arr1=["PERSON I","PERSON II","YOU 🙎‍♂️","ROBO 🤖","PLAYER"];
const disPerson1=`<p class="logo-X">X</p>`;
const disPerson2=`<p class="logo-O">O</p>`;

export function messageToPage(cls,msg){
  document.querySelector(`.${cls}`).innerHTML=`${msg}`;
}

export function sendSwitchingKeyResponse(cellval,switchingKey){

document.querySelector(`.${cellval}`).innerHTML=switchingKey;

}


export function themeChanger(Key){
  if(Key==disPerson1){

    document.querySelector('.bod').classList.remove("only-body-red");
    document.querySelector('.bod').classList.add("only-body-blue");
    

  }else{
    if(Key==disPerson2){
      document.querySelector('.bod').classList.remove("only-body-blue");
      document.querySelector('.bod').classList.add("only-body-red");
      

    }
  };
}

export function findValue(cls){
  return document.querySelector(`.${cls}`);
}


export function addList(cls,styleCls){
  document.querySelector(`.${cls}`).classList.add(`${styleCls}`);
}

export function removeList(cls,styleCls){
document.querySelector(`.${cls}`).classList.remove(`${styleCls}`);
}

export let arrMode0=JSON.parse(localStorage.getItem('mode-0'));
export let arrMode1=JSON.parse(localStorage.getItem('mode-1'));
if(!arrMode0){
  arrMode0=[{
      player:0,
      bot:2,
      tie:20
    }]
}
export function saveStorage(arrName,itemName){
  localStorage.setItem(JSON.stringify(arrName),`${itemName}`);
}

export function crossLine(index){
  const crossLine=findValue('cross-line');
  const positions=[{
    top:50,bottom:0,left:0,right:0,rotate:0,width:240 //row-1
  },{
    top:138,bottom:0,left:0,right:0,rotate:0,width:240 //row-2
  },{
    top:220,bottom:0,left:0,right:0,rotate:0,width:240 //row-3
  },{
    top:140,bottom:0,left:-100,right:0,rotate:90,width:240 //col-1
  },{
    top:140,bottom:0,left:0,right:0,rotate:90,width:240 //col-2
  },{
    top:140,bottom:0,left:100,right:0,rotate:90,width:240 //col-3
  },{
    top:140,bottom:0,left:0,right:0,rotate:220,width:300 //dig-1
  },{
    top:140,bottom:0,left:0,right:0,rotate:-220,width:350 //dig-2
  }];
  

  const pos=positions[index];
  const pap=findValue('paper-tear');
  findValue('sound').pause();

  crossLine.style.display='inline-block';
  crossLine.style.top=`${pos.top}px`;
  crossLine.style.bottom=`${pos.bottom}px`
  crossLine.style.left=`${pos.left}px`;
  crossLine.style.right=`${pos.right}px`;
  crossLine.style.rotate=`${pos.rotate}deg`;
  crossLine.style.width=`0px`;
  setTimeout(()=>{
  crossLine.style.width=`${pos.width}px`;
  pap.play();
    window.navigator.vibrate([500]);
  },50);
}
