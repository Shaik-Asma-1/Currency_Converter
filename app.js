let baseUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025-04-18/v1/currencies";


let selects=document.querySelectorAll("select");
let btn=document.querySelector(".xchange");
let input=document.querySelector("input");
let frominput=document.querySelector(".from-select select");
let toinput=document.querySelector(".to-select select");
let msg=document.querySelector(".msg");

selects.forEach(select=>{
  for(let currCode in countryList){
    let newOpt=document.createElement("option");
    newOpt.innerText=currCode;
    newOpt.value=currCode;
   
    if(select.name==="from" && currCode==="USD"){
      newOpt.selected="selected";
    }else if(select.name==="to" && currCode==="INR"){
      newOpt.selected="selected";
    }
    select.append(newOpt);

  }
  select.addEventListener("change",(eve)=>{
    console.log(eve);
    updateFlag(eve.target);
  })

})
function updateFlag(evt_target){
  let currCode=evt_target.value;
  let countryCode= countryList[currCode];
  console.log(currCode,countryCode);
  let newImg=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let oldImg=evt_target.parentElement.querySelector("img");
  oldImg.src=newImg;

}
async function exchangeRate(){
  let url=`${baseUrl}/${frominput.value.toLowerCase()}.json`;
  let resp= await fetch(url);
  let data= await resp.json();
  console.log(data);
  let fromCurr=frominput.value.toLowerCase();
  let toCurr=toinput.value.toLowerCase();

  let rate=amt*data[fromCurr][toCurr];
  console.log(rate);
  msg.innerText=`${amt} ${fromCurr.toUpperCase()}=${rate} ${toCurr.toUpperCase()}`;

  
}
btn.addEventListener("click",()=>{
  let val=input.value;
  if(val<=0 || val===""){
    val=1;
    amt=val;
  }else{
    amt=val;
  }
  console.log(amt);
  exchangeRate();

})

