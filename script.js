var MyDiv = document.getElementById("textDiv");
var started = false;
var counter = 0;
var Memory = '';
document.addEventListener('paste', function(event){
    $("<sp>"+event.clipboardData.getData('Text')+"</sp>").appendTo('#textDiv');
    Memory = Memory + event.clipboardData.getData('Text');
    event.preventDefault(); // We are already handling the data from the clipboard, we do not want it inserted into the document
});
window.addEventListener("keydown",function(keyEvent){
    if(started == false){
        if(keyEvent.key == "Backspace"){ //delete last character
            MyDiv.lastChild.remove();
            Memory = Memory.slice(0, -1);
        }
        else if(keyEvent.key == "Shift" || keyEvent.key == "Alt" || keyEvent.key == "Control"){}//ignore shift, otherwise capitals print with shift infront!
        else if(!keyEvent.ctrlKey && !keyEvent.metaKey && !keyEvent.altKey){
            Memory = Memory + keyEvent.key;
            $("<sp>"+keyEvent.key+"</sp>").appendTo('#textDiv');
        }
    }
    else{
        if(keyEvent.key == "Shift" || keyEvent.key == "Alt" || keyEvent.key == "Control"){}//ignore shift, otherwise capitals print with shift infront!
        else if(keyEvent.ctrlKey || keyEvent.metaKey || keyEvent.altKey){}

        else if(keyEvent.key == Memory[counter] && $('#Start').html() == '<sp>Good luck!</sp>'){
            if(counter <(Memory.length))
                counter = counter + 1;
            $("<sp>"+keyEvent.key+"</sp>").appendTo('#textDiv');
        }
        else {
            $('#textDiv').html('You failed! Click to show answer.');
            $('#Start').html('<sp>Continue!</sp>');
        }
        if(counter == Memory.length){
            $('#textDiv').html('You passed!');
            $('#Start').html('<sp>Start new test!</sp>');
        }
    }
}); 
function button(){
    if($('#Start').html() == "<sp>Memorize!</sp>"){
        started = true;
        $('#textDiv').html('');
        counter = 0;
        $('#Start').html('<sp>Good luck!</sp>');
    }
    else if ($('#Start').html() == "<sp>Continue!</sp>"){
        $('#Start').html('<sp>Good luck!</sp>');
        $('#textDiv').html(Memory.slice(0,counter-Memory.length));
    }
    else if ($('#Start').html() == "<sp>Start new test!</sp>"){
        started = false;
        Memory = '';
        $('#textDiv').html('');
        $('#Start').html('<sp>Memorize!</sp>');
    }
}
function show(){
    if($('#textDiv').html() == 'You failed! Click to show answer.'){
        $('#textDiv').html('');
        $("<sp>"+Memory.slice(0,counter-Memory.length)+"</sp>").appendTo('#textDiv');
        $("<sp id ='error'>"+Memory.slice(counter,counter+1)+"</sp>").appendTo('#textDiv');
        $("<sp>"+Memory.slice(counter+1,Memory.length)+"</sp>").appendTo('#textDiv');
        $('#Start').html("<sp>Start new test!</sp>")
    }
}
