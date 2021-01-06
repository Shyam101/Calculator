let queston = "";
let ans = "";

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
        queston += numValid(element.id);
        show(queston,query);
    })
});

/*
When inserting . 
    if nothing or operator insert 0.
    if have already dot or factorial return
when inserting fact
    if nothin or operator insert 0!
    if have already dot or fact return
when inserting operator
    if nothing return
    if last cahr is alreay operator replace
    check for zero divison in front
when delte last
    if nothing return

*/

operators.forEach(element => {
    element.addEventListener('click',()=>{
        let temp = optValid(element.id);
        queston+= temp;
        show(queston,query);
    })
})


ac.addEventListener('click',()=>{
    queston = "";
    ans = "";
    show(queston,query);
    show(ans,result);
});

c.addEventListener('click',()=>{
    if(queston.length==0)
        return;
    queston = queston.substr(0,queston.length-1);
    show(queston,query);
});

dot.addEventListener('click',()=>{
    queston += dotValid();
    show(queston,query);
})

factBtn.addEventListener('click',()=>{
    queston += factValid();
    show(queston,query);
})

//functions

function isnum(str) {
    return (/[0-9]/).test(str)
}


function show(str,element)
{
    element.textContent = str;
};


//calculate



//maintain proper format


/*
void infixToPostfix(string s) 
{ 

		else{ 
			while(st.top() != 'N' && prec(s[i]) <= 
								prec(st.top())) 
			{ 
				char c = st.top(); 
				st.pop(); 
				ns += c; 
			} 
			st.push(s[i]); 
		} 

	} 
*/


function calculate()
{

}

//check for divide by zero 
function optValid(opt)
{
    if(queston.length==0) return "";
    let i = queston.length -1;
    if(queston[i]=='+' || queston[i]=="x" || queston[i]=="-" || queston[i]=="/" || queston[i]=="^") //replace last opt
    {
        queston = queston.substr(0,queston.length-1);
        return opt;
    }

    for(i=queston.length-1; i>=0; --i)  //find last opt
    {
        if(queston[i]=='+' || queston[i]=="x" || queston[i]=="-" || queston[i]=="/" || queston[i]=="^" || queston[i]=='!')
            break;
    }

    if(i==-1) return opt;   //if no opt

    if(queston[i]=='/' && parseFloat(queston.substr(i+1))==0) //divide by zero happens
    {
        alert("Can not divide by zero");
        return "";
    }
    return opt;
    
}

function dotValid()
{
    for(let i=queston.length-1; i>=0; --i)
    {
        if(queston[i]=='+' || queston[i]=="x" || queston[i]=="-" || queston[i]=="/" || queston[i]=="^")
            return (i==queston.length-1?"0.":".");
        if(queston[i]=='!' || queston[i]==".")
            return "";
    }

    return queston.length==0?"0.":".";
}

function factValid(){

    for(let i=queston.length-1; i>=0; --i)
    {
        if(queston[i]=='+' || queston[i]=="x" || queston[i]=="-" || queston[i]=="/" || queston[i]=="^")
            return (i==queston.length-1?"0!":"!");
        if(queston[i]=='!' || queston[i]==".")
            return "";
    }

    return queston.length==0?"0!":"!";
}

function numValid(e)
{
    console.log(e);
    if(queston.length==0) return e;
    let i = queston.length -1;
    if(queston[i]!='!')
        return e;
    else  
        return "";
}