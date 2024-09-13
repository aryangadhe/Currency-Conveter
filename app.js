
const fallback_url = "https://latest.currency-api.pages.dev/v1/currencies.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList1){
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList1[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const api_url = 
"https://latest.currency-api.pages.dev/v1/currencies";

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${api_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let str1 = fromCurr.value.toLowerCase();
    let str2 = toCurr.value.toLowerCase();
    let rate = data[str1][str2];
    // console.log(data);
    // console.log(rate);
    let finalAmount = amtVal*rate;
    msg.innerText = ` ${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})