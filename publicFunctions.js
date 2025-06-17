export const arr1=["PERSON I","PERSON II","YOU 🙎‍♂️","ROBO 🤖","PLAYER"];

export function messageToPage(cls,msg){
  document.querySelector(`.${cls}`).innerHTML=`${msg}`;
}

export function sendSwitchingKeyResponse(cellval,switchingKey){

document.querySelector(`.${cellval}`).innerHTML=switchingKey;

}


export function themeChanger(Key){
  if(Key=='X'){

    document.querySelector('.bod').classList.remove("only-body-red");
    document.querySelector('.bod').classList.add("only-body-blue");
    document.querySelectorAll('.cell').forEach((clsitem)=>{
    clsitem.classList.remove("body-blue");
    });
      document.querySelectorAll('.cell').forEach((clsitem1)=>{
      clsitem1.classList.add("add-list-red");
      });

  }else{
    if(Key=='O'){
      document.querySelector('.bod').classList.remove("only-body-blue");
      document.querySelector('.bod').classList.add("only-body-red");
      document.querySelectorAll('.cell').forEach((clsitem)=>{
      clsitem.classList.remove("add-list-red");
      });
        document.querySelectorAll('.cell').forEach((clsitem1)=>{
        clsitem1.classList.add("body-blue");
        });

    }
  };
}