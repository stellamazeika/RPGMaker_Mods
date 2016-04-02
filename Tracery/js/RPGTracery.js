/**
 * @author Jo
 */

(function() {

var TraceryGrammar = null;
var TraceryJSON = null;
var loadTraceryData = function(src) {
    var xhr = new XMLHttpRequest();
    var url = 'data/Tracery.json';
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        if (xhr.status < 400) {
            TraceryJSON = JSON.parse(xhr.responseText);
        }
    };
    xhr.onerror = function() {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    TraceryJSON = null;
    xhr.send();
};
var loadTracery = function(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'js/plugins/Tracery.js';
	script.async = false;
	script._url = 'js/plugins/Tracery.js';
	document.body.appendChild(script);
	//Load the tracery grammar file
	TraceryJSON = loadTraceryData();
};

loadTracery();

var cleanJSON = function(T_JSON)
{
	for (var i in T_JSON)
	{
		for (var j = 0; j < T_JSON[i].length; j++)
		{
			var mod_text = T_JSON[i][j];
			//Escape out backslashes sufficiently.
			//Escape out the [ so that Tracery doesn't hijack them.
			mod_text = mod_text.replace(/\\/g,"\\\\");
			mod_text = mod_text.replace(/\\/g,"\\\\");
			mod_text = mod_text.replace(/V\[/g,"V\\[");
			mod_text = mod_text.replace(/N\[/g,"N\\[");
			mod_text = mod_text.replace(/C\[/g,"C\\[");
			mod_text = mod_text.replace(/I\[/g,"I\\[");
			T_JSON[i][j] = mod_text;
		}
	}
	return T_JSON;
};

 Window_Base.prototype.convertEscapeCharacters = function(text){
 	//Do Tracery Things Here
 	if (TraceryGrammar === null)
 	{
 		TraceryJSON = cleanJSON(TraceryJSON);
 		TraceryGrammar = tracery.createGrammar(TraceryJSON);
 	}
 	console.log("Traceify!");
 	console.log(text);
 	text = text.replace(/\\/g,"\\\\");
 	console.log(text);
 	text = text.replace(/V\[/g,"\\\\V\\[");
	text = text.replace(/N\[/g,"\\\\N\\[");
	text = text.replace(/C\[/g,"\\\\C\\[");
	text = text.replace(/I\[/g,"\\\\I\\[");
 	console.log(text);
 	text = TraceryGrammar.flatten(text);
 	console.log(text);
 	text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    console.log(text);
 	return text;
 };
})();