const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (code in countryList) {
    let newoption = document.createElement("option"); // ✅ FIXED
    newoption.innerText = code;
    newoption.value = code;
     if (select.name === "from" && code === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
  });
  
}

const updateFlag = (element) => {
  let code = element.value;
  let countryCode = countryList[code];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = Number(amount.value);
    if (!amtval || amtval < 1) {
    amtval = 1;
    amount.value = '1';
}

   const url = `https://api.frankfurter.app/latest?from=${fromCurr.value}&to=${toCurr.value}`;
    let response=await fetch(url);
    console.log(response);
    // let data=response.json();
    let data= await response.json();
    console.log(data)
   let rate = data.rates[toCurr.value]
   console.log(rate);
    let finalAmount = amtval * rate;
    let roundoff=Math.round(finalAmount)
    msg.innerText = `${amtval} ${fromCurr.value} = ${roundoff} ${toCurr.value}`;

});


