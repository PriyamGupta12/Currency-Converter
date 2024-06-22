const BASE_URL= "https://latest.currency-api.pages.dev/v1/currencies/usd.json";
const selectors = document.querySelectorAll(".selectors select");
let fromAmount = document.querySelector(".from input");
let toAmount = document.querySelector(".to input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
changeToAmount=async()=>{
    let response = await fetch(BASE_URL);
    let data = await response.json();
    let data1 = data["usd"];
    let data2 = data1[toCurr.value.toLowerCase()]/data1[fromCurr.value.toLowerCase()];
    toAmount.value=data2*fromAmount.value;
}

changeFromAmount=async()=>{
    let response = await fetch(BASE_URL);
    let data = await response.json();
    let data1 = data["usd"];
    let data2 = data1[fromCurr.value.toLowerCase()]/data1[toCurr.value.toLowerCase()];
    fromAmount.value=data2*toAmount.value;
}
for (select of selectors){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        select.append(newOption);
        if(select.name === "from-select" && code === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to-select" && code === "INR"){
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    });
    changeToAmount();
}

fromAmount.addEventListener("change",()=>{
    changeToAmount();
})

toAmount.addEventListener("change",()=>{
    changeFromAmount();
})

changeFlag = (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
}













// let codes = document.querySelector(countryList);
// console.log(codes);

