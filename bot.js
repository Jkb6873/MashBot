var twit = require('twit');
var config = require('./config');

var T = new twit(config);
var LincolnTweets = [];
var KanyeTweets = [];

T.get('statuses/user_timeline', {
	user_id: 592434464,
},
	function(err, data, response){
		LincolnTweets = data.map((item)=> item.text).filter(FilterRT);
		// if(LincolnTweets){
		// 	for(var i = 0; i < LincolnTweets.length; i++){
		// 		console.log(LincolnTweets[i], '\nTWEET NUMBER ', i, '\n');
		// 	}
		// }
		// else
		// 	console.log("ERROR");
	}
)

T.get('statuses/user_timeline', {
	user_id: 151136690,
},
	function(err, data, response){
		KanyeTweets = data.map((item)=> item.text).filter(FilterRT);
		// if(KanyeTweets){
		// 	for(var i = 0; i < KanyeTweets.length; i++){
		// 		console.log(KanyeTweets[i], '\nTWEET NUMBER ', i, '\n');
		// 	}
		// }
		// else
		// 	console.log("ERROR");
	}
)



function FilterRT(text){
	if (text.substring(0,2) == "RT")
		return false;
	else
		return true;
}

function combine(quote1, quote2){
	var length1 = parseInt(quote1.length/2);
	while(length1 > 0 && length1 < quote1.length && quote1[length1] !== ' '){
		quote1.length < quote2.length ? length1++ : length1--;
	}
	var length2 = parseInt(quote2.length/2);
	while(length2 > 0 && length2 < quote2.length && quote2[length2] !== ' '){
		quote1.length < quote2.length ? length2++ : length2--;
	}
	return quote1.substring(0, length1) + quote2.substring(length2, quote2.length);
}

function shaveQuote(quote){
	var start = 0;
	var end = quote.length;
	if (quote.search('\"') != -1 || quote.search('“') != -1){
		while(quote[start] != '\"' && quote[start] != '“' && start < quote.length){
			start++;
		}
	}
	while(quote[end] != '.' && quote[end] != '"' && quote[end] != '”' && end > start){
		end--;
	}
	return quote.substring(start, end);
}

function makeQuote(quoteList1, quoteList2){
	console.log("QL1 length: ", quoteList1.length);
	console.log("QL2 length: ", quoteList2.length);
	quote1 = shaveQuote(quoteList1[Math.floor(Math.random() * Math.floor(quoteList1.length))]);
	quote2 = shaveQuote(quoteList2[Math.floor(Math.random() * Math.floor(quoteList2.length))]);
	combined = combine(quote1, quote2);
	return combined + "\" -Abraham Lincoln/ Kanye West"
}

function wait(){
	//while(LincolnTweets.length == 0 || KanyeTweets.length == 0){}
	//await sleep (2000);
	setTimeout(function(){console.log(makeQuote(LincolnTweets, KanyeTweets));}, 2000);
	//console.log(MakeQuote(LincolnTweets, KanyeTweets));

}

wait();
/*
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})
*/

