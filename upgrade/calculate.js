function isopt(c){
    return ["+","-","/","*","^","!"].includes(c);
}

function getpriority(c) // + - * / ^ !
{
    if(c=="!")
    return 4;
    else if(c == '^') 
    return 3; 
    else if(c == '*' || c == '/') 
    return 2; 
    else if(c == '+' || c == '-') 
    return 1; 
    else
    return -1;
}

function infixToPostfix(s)
{
    let stack = [];
    stack.push('N');
    let n = s.length;
    let ans = ""

    for(let i=0; i<n; ++i)
    {
        if(!isopt(s[i]))
            ans+=s[i];
        else 
        {
            while(stack[stack.length-1] != 'N' && getpriority(s[i])>=getpriority(stack[stack.length-1]))
            {
                let c = stack.pop();
                ans += c;
            }
            stack.push(s[i]);
        }
    }

    while(stack[stack.length-1]!='N')
        ans+=stack.pop();

    return ans;
}

console.log(infixToPostfix("1+2*3"));