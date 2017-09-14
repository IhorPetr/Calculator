/**
 * Created by Igor on 05.09.2017.
 */
function isCreditCardValid(input)
{
    if(CardValidator(input)) {
        return {
            valid: false,
            number: input,
            error: 'invalid characters'
        } ;
    }
    if(Check16Symbol(input)) {
        return {
            valid: false,
            number: input,
            error: 'More than 16 digit'
        } ;
    }
    if(CheckSameSymbol(input)) {
        return {
            valid: false,
            number: input,
            error: 'only one type of number'
        } ;
    }
    if(ChechSum(input)) {
        return {
            valid: false,
            number: input,
            error: 'Sum less than 16'
        } ;
    }
    if(CheckOddNumber(input)) {
        return {
            valid: false,
            number: input,
            error: 'odd final number'
        } ;
    }
    if(!LuhnAlgo(input)) {
        return {
            valid: false,
            number: input,
            error: 'Invalid by Luhno Algoritm'
        };
    }
    return {
        valid: true,
        number: input
    };

    function CardValidator(input) {
       return input.match(/[^\d\-]/g)!=null ? false : true;
    }
    function Check16Symbol(input){
        return input.match(/[\d]/g).length>16 ? false : true;
    }
    function CheckSameSymbol(input){
        return /^\D*(\d)(?:\D*|\1)*$/.test(input) ? false : true;
    }
    function CheckOddNumber(input){
        return input[input.length]%2!=0 ? false : true;
    }

    function ChechSum(input) {
        var string =  input.split('-').reduce((a,b)=>a+b,0);
        string = string.split('');
        var sum = 0;
        for (var i = 0; i < string.length; i++) {
            sum += parseInt(string[i],10);
        }
        return sum<16 ? false : true;
    }

    function LuhnAlgo(str) {
        debugger;
        var mytreest =  str.match(/[\d]/g);
        var last = mytreest.pop();
        mytreest.reverse();
        var count =0;
        mytreest.forEach(function (item) {
            if(item%2!=0)
            {
                item*=2;
                item = item>9 ? item-=9 : item;
            }
            count+=parseInt(item);
        });
        return count%10 == last ? true : false;
    }
}
