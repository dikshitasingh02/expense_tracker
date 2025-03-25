const balance = document.getElementById("balance"),
moneyPlus = document.getElementById("moneyPlus"),
moneyMinus = document.getElementById("moneyMinus"),
list = document.getElementById("list"),
form = document.getElementById("form"),
text = document.getElementById("text"),
amount = document.getElementById("amount");

let transactions = [];

form.addEventListener("submit", addTrasaction);
function addTrasaction(e){
    e.preventDefault();

    const transtaion = { id:generateID(), text: text.value, amount: amount.value};
    addTrsactionDOM(transtaion)
    transactions.push(transtaion);
    updateTransaction();
    text.value = "";
    amount.value = "";
    init();
    // console.log(transactions);
}

function generateID(){
    return Math.floor(Math.random() * 100000000);
}

function addTrsactionDOM(transtaion){
    const sign = transtaion.amount < 0 ?"-":"+";
    const item = document.createElement("li");

    item.classList.add(transtaion.amount<0?"minus":"plus");

    item.innerHTML = `${transtaion.text} <div><span>${sign} $${Math.abs(transtaion.amount)}</span>
    <button class="delete" onclick="removeTrsaction(${transtaion.id})">x<button>`;
    list.appendChild(item);
}

function removeTrsaction(id){
    transactions=transactions.filter((transaction) => transaction.id!==id);
    init();
}

function init(){
    list.innerHTML="";
    if(transactions.length==0){
        const item=document.createElement("li");
        item.innerHTML = "No Transaction";
        list.appendChild(item);
    }
    transactions.forEach(addTrsactionDOM);
    updateTransaction();
}

function updateTransaction(){
    const amounts = transactions.map((transaction) => Number(transaction.amount)).filter((num) => !isNaN(num));
    // Check if amounts array is empty to prevent reduce() error
    const total = amounts.length > 0 ? amounts.reduce((acc, item) => acc + item, 0).toFixed(2) : "0.00";
    const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);
    // const amounts = transactions.map((transaction) => transaction.amount);
    // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // const income = amounts.filter((item)=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    // const expense = (amounts.filter((item)=>item<0).reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);
    balance.innerText=`$${total}`;
    moneyPlus.innerText=`$${income}`;
    moneyMinus.innerText=`$${expense}`;
    console.log(total,income,expense)
}