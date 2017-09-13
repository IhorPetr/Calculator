/**
 * Created by Igor on 04.09.2017.
 */
var Calculator=
function (input) {

    if(Validator(input)) {
        let output = GetExpression(input);
        let result = CountingExpression(output);
        return Number((result).toFixed(2));
    }
    return undefined;

    function Validator(input) {

        var regexp = /[\+\-\*\(\)\./]/ig;
        var bracket1=0,bracket2=0;

        if(input.match(/[^\d\s\+\-\*\(\)\./]/g)!=null) {
             return false;
        }
        while (result = regexp.exec(input)) {
            bracket1 =result[0]=='(' ? ++bracket1 : bracket1;
            bracket2= result[0]==')' ? ++bracket2 : bracket2;
            if(IsOperator(input[result.index+1]) &&
                input[result.index]!='(' && input[result.index]!=')') {
                return false;
            }
        }
        if(bracket1!=0 || bracket2!=0) {
            if (bracket1 != bracket2) {
                return false;
            }
        }
        return true;
    }

    function GetExpression(input) {
        let expression= input.match(/-?\d+(\.\d+)?|\+|\-|\*|\(|\)|\//g);
        let output = [];
        let operStack= [];

        for(let i=0;i<expression.length;i++) {

            if(isFinite(expression[i])) {
                output.push(expression[i]);
            }

            if (IsOperator(expression[i])) {
                if (expression[i] == '(') {
                    operStack.push(expression[i]);
                }
                else if (expression[i] == ')') {
                    let s = operStack.pop();

                    while (s != '(') {
                        output.push(s);
                        s = operStack.pop();
                    }
                } else {

                    if (operStack.length > 0)
                        if (GetPriority(expression[i]) <= GetPriority(operStack[operStack.length-1]))
                            output.push(operStack.pop());

                    operStack.push(expression[i]);
                }
            }
        }
        while (operStack.length > 0)
            output.push(operStack.pop());

        return output;
    }

    function CountingExpression(input) {
        let result=0;
        let temp=[];

        for(let i=0;i<input.length;i++) {

            if(isFinite(input[i])) {
                temp.push(parseFloat(input[i]));
            }
            else if (IsOperator(input[i])) {
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
        if(temp.length>1) {
            while (temp.length > 0) {
                result+=parseFloat(temp.pop());
            }
            temp.push(result);
        }
        return temp[temp.length-1];
    }

    function IsOperator(c) {
        let delim = "+-/*()".indexOf(c);
        return delim!=-1 ? true : false;
    }
    function GetPriority(s) {
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

