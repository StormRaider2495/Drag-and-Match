var fruit = ["Banana","Apple","Pear","Guava","Mango"];
var flower = ["Rose","Marigold","Hibiscus","Lily","Jasmine"];
var len = fruit.length+flower.length;
var rand,res,used=[],useLoc=0,type,tries,present;
var wrong='<span class="wrong"><b>x</b></span>';
var right='<span class="right"><b>o</b></span>';

/* --- This function generates the names in the drag tab randomly --- */
function generate(){
	
	present=false,tries=0; // initializing present and tries on generate() call
	
	document.getElementById("drag").draggable=true; // To make the drag object draggable on every go
	
    if(used.length != len){
        rand = Math.floor((Math.random() * len) + 1);
        //console.log(rand);
        if(rand>fruit.length){
            res=flower[rand-fruit.length-1];
            type="flower";
        }
        else{
            res=fruit[rand-1];
            type="fruit";
        }
        //console.log(res);
        document.getElementById("drag").innerHTML=res;
       
       for(var i in used){
            if(res === used[i]){
                present=true;
                break;
            }
       }
        if(present === false){
           used[useLoc]=res;
           useLoc++;
        //   console.log(used);
        }
        else{
            generate();
        }
    }
    else{
        document.getElementById("drag").innerHTML="All Elements sorted";
		document.getElementById("drag").draggable=false;
        type="status";
		document.getElementById("drag").remove();
    }
}

function score(){
	var marks = document.getElementById("score").innerHTML;
	if(marks === ""){
		marks=0;
	}
	if(tries===1){		
		marks= parseInt(marks,10) + 10;
	}
	else if(tries===2){
		marks= parseInt(marks,10) + 5;
	}
	document.getElementById("score").innerHTML=marks;
}

/* -- Drop function --*/
function allowDrop(ev) {

        ev.preventDefault();
}

/* -- Drag function -- */
function drag(ev) {

        ev.dataTransfer.setData("text", ev.target.id);
}


/* -- Drop function to drop object on the droppable -- */
function drop(ev) {
		
		tries++; //incrementing count of tries on each drop of individual element.
		document.getElementById("drag").draggable=false;
		
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        
        var nodeCopy = document.getElementById(data).cloneNode(true);
        nodeCopy.id=nodeCopy.innerHTML;
		nodeCopy.draggable=false;
		
        if(ev.target.getAttribute('type') == type){
        //    console.log("in"+type+" "+ev.target.getAttribute("type"));
            ev.target.appendChild(nodeCopy);
			score();
            generate();
        }
        else{	
			
			
				nodeCopy.insertAdjacentHTML( 'beforeend', wrong );
				ev.target.appendChild(nodeCopy);
				setTimeout(function(){
					document.getElementById("drag")
					var parent = document.getElementById(ev.target.id);
					parent.removeChild( document.getElementById(ev.target.id).lastChild);
					document.getElementById("drag").draggable=true;
				},2000);
				
			//checking if no tries is more than 2, if so the node is inserted automatically.			
				if(tries>2){
				nodeCopy.removeChild(nodeCopy.lastChild);
				nodeCopy.insertAdjacentHTML( 'beforeend', right );
				document.getElementsByClassName(type)[0].appendChild(nodeCopy);
				generate();
			}
					

        }
}




