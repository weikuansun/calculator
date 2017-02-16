/*
$(document).ready(function(){
    $('button').on('click', function(){
        document.getElementById('screen').style.fontSize="72px";
        document.getElementById('screen').innerHTML =$(this).text();
    });
});
*/
$(document).ready(apply_click_handlers);
var input_array = [''];
var input_index = 0;
var count=0;
var output="";
var d={
    0:"num",
    1:"num",
    2:"num",
    3:"num",
    4:"num",
    5:"num",
    6:"num",
    7:"num",
    8:"num",
    9:"num",
    "+":"operator",
    "-":"operator",
    "×":"operator",
    "÷":"operator",
    "=":"equalSign"
};
var previous=[];
function apply_click_handlers(){
    $('.operands > button').click(receive_operand);
    $('.operators > button').click(receive_operator);
    $('#equal').click(get_result);
    $('#C').click(function(){
        output="";
        input_array=[""];
        input_index=0;
        count=0;
        document.getElementById('screen').innerHTML =0;
    });
    $('#CE').click(function(){
        switch(input_array[input_array.length-1]){
            case "+":
            case "-":
            case "×":
            case "÷":
                document.getElementById('screen').innerHTML =0;
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                input_array.pop();
                document.getElementById('screen').innerHTML =0;
                break;
        }
    })

}
function receive_operand(){
    previous=[];
    console.log($(this).text());
    if($(this).text()==='.'&&input_array[input_array.length-1][input_array[input_array.length-1].length-1]==='.'){}
    else {
        input_array[input_index] += $(this).text();
    }
    output+=$(this).text();
    document.getElementById('screen').style.fontSize="72px";
    document.getElementById('screen').innerHTML =output;
    console.log('input_Array= ',input_array);
    count+=1;
}
function receive_operator(){
    if(count!==0) {
        previous = [];
        if (input_array[1] != undefined && input_array[2] != "")
            get_result();

        if (d[input_array[input_array.length - 2]] === "operator") {
            input_array[input_array.length - 2] = $(this).text();
        }
        else {
            input_index++;
            input_array[input_index] = $(this).text();
            console.log('input_Array= ', input_array);
            output = "";
            input_index++;
            input_array[input_index] = '';
            console.log(d[input_array[input_array.length - 2]]);
        }
    }
}
function get_result(){
    var result=0;
    console.log(input_array);
    if (count===0){
        input_array[0]=0;
        document.getElementById('screen').style.fontSize="72px";
        document.getElementById('screen').innerHTML =0;
        count+=1;
        return;
    }

    if(input_array[0]!=null&&input_array[1]!=null&&input_array[2]!=""){
        previous.push(input_array[1]);
        previous.push(input_array[2]);
        switch(input_array[1]){
            case "+":
                result=parseFloat(input_array[0])+parseFloat(input_array[2]);
                input_array=[];
                input_array[0]=result;
                document.getElementById('screen').innerHTML =result;
                break;
            case "-":
                result=parseFloat(input_array[0])-parseFloat(input_array[2]);
                input_array=[];
                input_array[0]=result;
                document.getElementById('screen').innerHTML =result;
                break;
            case "×":
                result=parseFloat(input_array[0])*parseFloat(input_array[2]);
                input_array=[];
                input_array[0]=result;
                document.getElementById('screen').innerHTML =result;
                break;
            case "÷":
                if (input_array[2]==='0'){
                    input_array=[];
                    document.getElementById('screen').innerHTML ="ERROR";
                }
                else{
                result=parseFloat(input_array[0])/parseFloat(input_array[2]);
                input_array=[];
                input_array[0]=result;
                document.getElementById('screen').innerHTML =result;
                }
                break;
        }
        input_index=0;
        console.log("input_array:",input_array);
        console.log("previous:",previous);
    }
    else if(input_array[2]==""){
        switch(input_array[1]) {
            case "+":
                result = parseFloat(input_array[0]) + parseFloat(input_array[0]);
                input_array = [];
                input_array[0] = result;
                document.getElementById('screen').innerHTML = result;
                break;
            case "-":
                result = parseFloat(input_array[0]) - parseFloat(input_array[0]);
                input_array = [];
                input_array[0] = result;
                document.getElementById('screen').innerHTML = result;
                break;
            case "×":
                result = parseFloat(input_array[0]) * parseFloat(input_array[0]);
                input_array = [];
                input_array[0] = result;
                document.getElementById('screen').innerHTML = result;
                break;
            case "÷":
                result = parseFloat(input_array[0]) / parseFloat(input_array[0]);
                input_array = [];
                input_array[0] = result;
                document.getElementById('screen').innerHTML = result;
                break;
        }
        input_index=0;
    }
    else if((input_array[0]!=null)&&(previous===[])){
        document.getElementById('screen').innerHTML =input_array[0];
        return;
    }
    else{
        input_array.push(previous[0]);
        input_array.push(previous[1]);
        previous=[];
        get_result();
    }
}