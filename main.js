let queston = "";
let ans = "";
let dotted=false;
let factorial =false;

const allBtns = Array.prototype.slice.call(document.querySelectorAll(".box button"));
const query = document.querySelector("#query");
const result = document.querySelector("#result");
const numBtns = allBtns.filter((btn) => isnum(btn.id));
const operators = allBtns.filter((btn)=>(btn.id=="+" || btn.id=="-" || btn.id=="/" || btn.id=="x" || btn.id=="^"))
const AC = allBtns.find((btn)=> btn.id=="ac");
const factBtn = allBtns.find((btn) => btn.id=="!");
const d= allBtns.find((btn) => btn.id == "c");
const dot = allBtns.find((btn)=> btn.id == "dot");

//Event listeners
numBtns.forEach(element => {
    element.addEventListener('click',()=>{
        if(factorial) return;
        queston+=element.id;
        show(queston,query);
    })
});

operators.forEach(element => {
    element.addEventListener('click',()=>{
        if(queston.length==0)
            return;
        else if(isnum(queston[queston.length-1]) || queston[queston.length-1]=='!')
            queston+=element.id;
        else 
            queston = queston.substr(0,queston.length-1) + element.id;
        dotted=false;
        factorial=false;
        show(queston,query);
    })
})


ac.addEventListener('click',()=>{
    queston = "";
    ans = "";
    dotted=false;
    factorial=false;
    show(queston,query);
    show(ans,result);
});

c.addEventListener('click',()=>{
    if(queston[queston.length-1]=='.')
        dotted = false;
    if(queston[queston.length-1]=='!')
        factorial = false;
    queston = queston.substr(0,queston.length-1);
    show(queston,query);
});

dot.addEventListener('click',()=>{
    if(dotted || factorial) return;
   
    if(queston.length==0 || !isnum(queston[queston.length-1]))
        queston+="0.";
    else 
        queston+=".";
    dotted=true;
    show(queston,query);
})

factBtn.addEventListener('click',()=>{
    if(factorial || dotted) return;
    if(queston.length==0 || !isnum(queston[queston.length-1]))
        queston+="0!";
    else 
        queston+="!";
    factorial=true;
    show(queston,query);
})

//functions

function isnum(str) {
    return (/[0-9]/).test(str)
}


function show(str,element)
{
    element.textContent = str;
}

