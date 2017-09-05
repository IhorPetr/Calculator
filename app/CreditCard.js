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
}