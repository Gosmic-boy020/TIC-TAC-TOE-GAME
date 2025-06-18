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


