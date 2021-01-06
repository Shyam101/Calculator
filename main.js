const allBtns = Array.prototype.slice.call(document.querySelectorAll(".box button"));
const query = document.querySelector("#query");
const result = document.querySelector("#result");
const numBtns = allBtns.filter((btn) => isnum(btn.id));
const operators = allBtns.filter((btn)=>(btn.id=="+" || btn.id=="-" || btn.id=="/" || btn.id=="x" || btn.id=="^"))
const AC = allBtns.find((btn)=> btn.id=="ac");
const factBtn = allBtns.find((btn) => btn.id=="!");
const d= allBtns.find((btn) => btn.id == "c");
const dot = allBtns.find((btn)=> btn.id == "dot");
const equal = allBtns.find((btn)=> btn.id=="equal");
const plusminus = allBtns.find((btn)=> btn.id=="plusminus");

let dis1 = "",dis2 = "";
let opt = ""

plusminus.addEventListener('click',()=>{
    if(dis2.length==0)
        dis2 = "-";
    else 
    {
        if(dis2[0]=='-')
            dis2 = dis2.substr(1);
        else 
            dis2 = "-"+dis2;
    }
    show(dis2,result);
})

numBtns.forEach(element => {
    element.addEventListener('click',()=>{
        dis2+=element.id;
        show(dis2,result);
    })
});

equal.addEventListener('click',()=>{
    let temp;
    if(dis2.length==0)
        dis1 = ""+parseFloat(dis1);
    else 
        temp = evalute();
    if(temp==-1)
        dis2="";
    else{ 
        dis2=dis1;
        dis1="";
    }
    show(dis1,query);
    show(dis2,result);
});

dot.addEventListener('click',()=>{
    if(dis2.length==0)
        dis2 = "0.";
    else 
    {
        if(isdoted())
            return;
        dis2+=".";
    }
    show(dis2,result);
})

factBtn.addEventListener('click',()=>
{
    if(dis2.length==0)
        dis2="0"
    else 
    {
        if(isdoted())
            return;
    
        dis2 = fact(parseInt(dis2));
    }
    show(dis2,result);
})

function fact(n)
{
    if(n>12)
    {
        alert("too large factorial!");
        return n;
    }
    if(n==0 || n==1) return 1;
    else return n*fact(n-1);
}

ac.addEventListener('click',()=>{
    dis1="";
    dis2="";
    show(dis1,query);
    show(dis2,result);
});

c.addEventListener('click',()=>{
    dis2 = dis2.substr(0,dis2.length-1);
    show(dis2,result);
})

operators.forEach(element => {
    element.addEventListener('click',()=>{
        let temp;
        if(dis1.length>0 && dis2.length>0)
            temp = evalute();
        else if(dis1.length>0 && dis2.length==0)
            dis1 = dis1.substr(0,dis1.length-1);
        else 
        {
            dis1=dis2;
            dis2="";
        }
        if(temp==-1)
            dis2="";
        else {
            dis1 += element.id;
            opt = element.id;
        }
        show(dis1,query);
        show(dis2,result);
    })
})

function show(str,element)
{
    element.textContent = str;
};

function isnum(str) {
    return (/[0-9]/).test(str)
}

function evalute()
{
    let num1 = parseFloat(dis1.substr(0,dis1.length-1));
    let num2 = parseFloat(dis2);
    let res;
    switch (opt) {
        case "+":
            res = num1+num2;
            break;
        case "-":
            res = num1-num2;
            break;
        case "/":
            if(num2==0)
            {
                alert("OOPS! can not divide by zero");
                return -1;
            }
            res = num1/num2;
            break;
        case "x":
            res = num1*num2;
            break;
        case "^":
            res = Math.pow(num1,num2);
            break;
        default:
            break;
    }
    dis1 = (""+res).substr(0,10);
    dis2 = "";
}

function isdoted()
{
    for(let i=0;i<dis2.length;++i)
        if(dis2[i]=='.')
            return true;
    return false;
}