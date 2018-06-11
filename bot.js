var twit = require('twit');
var config = require('./config');
var forismatic = require('forismatic-node')();

var T = new twit(config);
var quote1, quote2, author1, author2, finalQuote;

function findBreak(str){
	regx = /,|—|;|-|:/;
	return str.search(regx) + 1;
}

function cleanCombine(quote1, quote2){
	var frontHalf, endHalf, break1, break2;
	break1 = findBreak(quote1);
	break2 = findBreak(quote2);

	if (break1 == 0){
		break1 = parseInt(quote1.length/2);
		while(break1 > 0 && break1 < quote1.length && quote1[break1] !== ' '){
			quote1.length < quote2.length ? break1++ : break1--;
		}
	}
	frontHalf = quote1.substring(0, break1);
	
	if (break2 == 0){
		break2 = parseInt(quote2.length/2);
		while(break2 > 0 && break2 < quote2.length && quote2[break2] !== ' '){
			quote1.length < quote2.length ? break2++ : break2--;
		}
	}
	endHalf = quote2.substring(break2, quote2.length);
	
	return frontHalf + endHalf;
}

function makeQuote(){
	console.log(quote1);
	console.log(quote2);
	combined = cleanCombine(quote1, quote2);
	return "\"" + combined + "\" -" + author1 + "/ " + author2;
}

function postQuote(){
	finalQuote = makeQuote();
	T.post('statuses/update', { status: finalQuote});
}

function getQuotes(){
	forismatic.getQuote({
	    lang: 'en',
	    generateKey: true
	}, function (error, quote) {
	    if (!error) {
	    	quote1 = quote.quoteText;
	    	author1 = quote.quoteAuthor;
	        //console.log(quote);
	    } else {
	        console.error(error);
	    }
	});

	forismatic.getQuote({
	    lang: 'en',
	    generateKey: true
	}, function (error, quote) {
	    if (!error) {
	    	quote2 = quote.quoteText;
	    	author2 = quote.quoteAuthor;
	        //console.log(quote);
	    } else {
	        console.error(error);
	    }
	});
}

function repeatBot(){
	//every 5 minutes, 
	setTimeout(function(){
	setTimeout(getQuotes, 5000);
	setTimeout(postQuote, 10000);
		repeatBot();
	}, 30000);
}

repeatBot();