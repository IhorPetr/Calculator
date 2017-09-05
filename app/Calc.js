/**
 * Created by Igor on 04.09.2017.
 */
var Calculator=
    function Calculate(input)
{
    if(Vakidator(input)) {

        let output = GetExpression(input);
        // let y = evaluate(output);
        let result = Counting(output);
        return Number((result).toFixed(2));
    }
    return undefined;

    function Vakidator(input)
    {
        var regexp = /[\+\-\*\(\)\./]/ig;
        var skob1=0,skob2=0;
        if(input.match(/[^\d\s\+\-\*\(\)\./]/g)!=null)
        {
             return false;
        }
        while (result = regexp.exec(input)) {
            skob1 =result[0]=='(' ? ++skob1 : skob1;
            skob2= result[0]==')' ? ++skob2 : skob2;
            if(IsOperator(input[result.index+1]) &&
                input[result.index]!='(' && input[result.index]!=')')
            {
                return false;
            }
        }
        if(skob1!=0 || skob2!=0) {
            if (skob1 != skob2) {
                return false;
            }
        }

        return true;
    }


    function GetExpression(input)
    {
        let output = "";
        let operStack= [];
        for(let i=0;i<input.length;i++)
        {
            if(IsDelimeter(input[i]))
                continue;
            if(isFinite(input[i]) && !IsDelimeter(input[i]))
            {
                while (!IsDelimeter(input[i]) && !IsOperator(input[i]))
                {
                    output += input[i];
                    i++;

                    if (i == input.length) break;
                }
                output += " ";
                i--;
            }
            if(isFinite(input[i+1]) && !IsDelimeter(input[i+1]) && input[i]=='-')
            {
                output += input[i];
                i++;
                while (!IsDelimeter(input[i]) && !IsOperator(input[i]))
                {
                    output += input[i];
                    i++;

                    if (i == input.length) break;
                }
                output += " ";
                i--;
            }


            if (IsOperator(input[i])) {
                if (input[i] == '(') {
                    //output += input[i];
                    operStack.push(input[i]);
                }
                else if (input[i] == ')')
                {
                    let s = operStack.pop();

                    while (s != '(')
                    {
                        output += s + ' ';
                        s = operStack.pop();
                    }
                   // output += input[i];
                }
                else
                {
                    if (operStack.length > 0)
                        if (GetPriority(input[i]) <= GetPriority(operStack[operStack.length-1]))
                            output += operStack.pop() + " ";

                    operStack.push(input[i]);
                }
            }
        }
        while (operStack.length > 0)
            output += operStack.pop() + " ";

        return output;
    }
    function Counting(input)
    {
        let result=0;
        let temp=[];
        for(let i=0;i<input.length;i++)
        {
            if(isFinite(input[i]) && !IsDelimeter(input[i]))
            {
                let a = "";
                while (!IsDelimeter(input[i]) && !IsOperator(input[i]))
                {
                    a += input[i]; //Добавляем
                    i++;
                    if (i == input.length) break;
                }
                temp.push(parseFloat(a));
                i--;
            }
            if(isFinite(input[i+1]) && !IsDelimeter(input[i+1]) && input[i]=='-')
            {
                let a = "";
                a += input[i]; //Добавляем
                i++;
                while (!IsDelimeter(input[i]) && !IsOperator(input[i]))
                {
                    a += input[i]; //Добавляем
                    i++;
                    if (i == input.length) break;
                }
                temp.push(parseFloat(a));
                i--;
            }
            else if (IsOperator(input[i]))
            {
                let a = temp.pop();
                let b = temp.pop();

                switch (input[i])
                {
                    case '+': result = b + a; break;
                    case '-': result = b - a; break;
                    case '*': result = b * a; break;
                    case '/': result = b / a; break;
                }
                temp.push(result);
            }
        }
        if(temp.length>1)
        {
            while (temp.length > 0)
            {
                result+=parseFloat(temp.pop());
            }
            temp.push(result);
        }
        return temp[temp.length-1];
    }
    function IsDelimeter(c)
    {
        let delim = " =".indexOf(c);
        return delim!=-1 ? true : false;
    }
    function IsOperator(c)
    {
        let delim = "+-/*()".indexOf(c);
        return delim!=-1 ? true : false;
    }
    function GetPriority(s)
    {
        switch (s)
        {
            case '(': return 0;
            case ')': return 1;
            case '+': return 2;
            case '-': return 3;
            case '*': return 4;
            case '/': return 5;
            default: return 6;
        }
    }

};

module.exports=Calculator;
