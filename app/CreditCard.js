/**
 * Created by Igor on 05.09.2017.
 */
function isCreditCardValid(input)
{
    if(input.match(/[^\d\-]/g)!=null)
    {
        return {
            valid: false,
            number: input,
            error: 'invalid characters'
        } ;
    }
    if(input.match(/[\d]/g).length>16)
    {
        return {
            valid: false,
            number: input,
            error: 'More than 16 digit'
        } ;
    }
    if(/^\D*(\d)(?:\D*|\1)*$/.test(input))
    {
        return {
            valid: false,
            number: input,
            error: 'only one type of number'
        } ;
    }

    if(add(input.split('-').reduce((a,b)=>a+b,0))<16)
    {
        return {
            valid: false,
            number: input,
            error: 'Sum less than 16'
        } ;
    }
    if(input[input.length]%2!=0)
    {
        return {
            valid: false,
            number: input,
            error: 'odd final number'
        } ;
    }
    if(!LuhnAlgo(input))
    {
        return {
            valid: false,
            number: input,
            error: 'Invalid by Luhno Algoritm'
        } ;
    }
    return {
        valid: true,
        number: input
    };
    function add(string) {
        string = string.split('');
        var sum = 0;
        for (var i = 0; i < string.length; i++) {
            sum += parseInt(string[i],10);
        }
        return sum;
    }
    function LuhnAlgo(str) {
        debugger;
        var mytreest =  str.match(/[\d]/g);
        var last = mytreest.pop();
        mytreest.reverse();
        mytreest.forEach(function (item) {
            if(item%2!=0)
            {
                item*=2;
                item = item>9 ? item-=9 : item;
            }
        });
        var count =0;
        mytreest.forEach(function (item) {
            count+=parseInt(item);
        });
        return count%10 == last ? true : false;
    }
}
