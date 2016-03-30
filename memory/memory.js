//var all = new Array(16);
var tile = [];
var all = 16;
var howmany = 0;
var position1, position2;
var howManyShowNow = 0;
var toClear = false;
var toEnd = 8; // 8 par do końca
var bestscorelabel = document.getElementById('howmanybest');
var resultFromCookie = parseInt(showCookies('best'));
var wasRed = false;



window.onload = start;


function start ()
{
	
	for(var i = 0; i < all; i++)
	{
		tile.push(Math.floor(i/2));
	}

	for (var i = all-1; i > 0; i--) {
	    var los = Math.floor(Math.random()*i);
	    var temp = tile[i]; 
	    tile[i] = tile[los]; 
	    tile[los] = temp; 
	} 
	/*
	for(var i = 0; i < all; i++)
	{
		document.getElementById('t' + i).innerHTML = '<img src="o'+tile[i]+'.png">';
	}
	*/
	document.getElementById('howmany').innerHTML = '0';
	if (!isNaN(resultFromCookie) && resultFromCookie > 0)
	{
		bestscorelabel.innerHTML = resultFromCookie;
	}
}

function setCookies(cname, chowmany, chowlong) {
    if (chowlong) {
        var cdate = new Date();
        cdate.setTime(cdate.getTime()+(chowlong*84600000));           
        var expires = "; expires="+cdate.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = cname+"=" + chowmany + expires + "; path=/";
}

function showCookies(nazwa) {
    if (document.cookie!="") { //jeżeli document.cookie w ogóle istnieje
        var cookies=document.cookie.split("; ");  //tworzymy z niego tablicę ciastek
        for (i=0; i<cookies.length; i++) { //i robimy po niej pętlę
            var nazwaCookie=cookies[i].split("=")[0]; //nazwa ciastka
            var wartoscCookie=cookies[i].split("=")[1]; //wartość ciastka
            if (nazwaCookie===nazwa) {
                return unescape(wartoscCookie) //jeżeli znaleźliśmy ciastko o danej nazwie, wtedy zwracamy jego wartość
            }
        }
    }
}

function deleteCookies(cname) {                
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function check(who)
{
	document.getElementById('howmany').innerHTML = ++howmany;
	if (howManyShowNow == 0)
	{
		if (toClear == true)
		{
			clear();
			toClear = false;
			var t1 = document.getElementById('t' + position1);
			t1.innerHTML = '';
			t1.setAttribute("onclick",";");
			t1.className = 'tileDark';
			var t2 = document.getElementById('t' + position2);
			t2.innerHTML = '';
			t2.setAttribute("onclick",";");
			t2.className = 'tileDark';
			position1 = position2 = undefined;
		}
		if (position1 != undefined)
		{
			
			var t1 = document.getElementById('t' + position1);
			t1.innerHTML = '<img src="ot.png">';
			var t2 = document.getElementById('t' + position2);
			t2.innerHTML = '<img src="ot.png">';
			position1 = position2 = undefined;

		}
		//
		var t = document.getElementById('t' + who);
		t.innerHTML = '<img src="o'+tile[who]+'.png">';
		t.setAttribute("onclick",";");
		t.style.cursor = 'default';
		howManyShowNow++;
		position1 = who;
	}
	else if (howManyShowNow == 1 && who != position1)
	{
		document.getElementById('t' + who).innerHTML = '<img src="o'+tile[who]+'.png">';
		howManyShowNow++;
		position2 = who;
		howManyShowNow = 0;
		//
		var t = document.getElementById('t' + position1);
		t.setAttribute("onclick","check("+position1+")");
		t.style.cursor = 'pointer';
		if(tile[position1] == tile[position2])
		{
			theSame();
			//var t1 = document.getElementById('t' + position1);
			var t2 = document.getElementById('t' + position2);
			t.setAttribute("onclick",";");
			t2.setAttribute("onclick",";");
			t.style.cursor = 'default';
			t2.style.cursor = 'default';
		}
		if (toEnd == 1)
		{
			var t1 = document.getElementById('t' + position1);
			t1.innerHTML = '';
			t1.setAttribute("onclick",";");
			t1.className = 'tileDark';
			var t2 = document.getElementById('t' + position2);
			t2.innerHTML = '';
			t2.setAttribute("onclick",";");
			t2.className = 'tileDark';
			alert('brawo');
			if (!isNaN(resultFromCookie) && howmany < resultFromCookie)
			{
				document.getElementById('howmany').style.color = 'lightgreen';
				setCookies('best', howmany, 365);
			}
				
    		
		}
	}
	if (!isNaN(resultFromCookie) && howmany > resultFromCookie)
	{
		wasRed = true;
		document.getElementById('howmany').style.color = 'red';
	}
}

function theSame()
{
	toClear = true;
}

function clear()
{
	document.getElementById('t' + position1).innerHTML = '';
	document.getElementById('t' + position2).innerHTML = '';
	toEnd--;
}

