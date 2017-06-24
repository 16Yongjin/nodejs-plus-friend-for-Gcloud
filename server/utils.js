var request = require('request');

function wordMeaning (message, callback) {
    var word = message.substring(2).trim();
    var toSearch = encodeURIComponent(word);
    var url = `http://ac.dic.naver.net/ptdic/ac?q=${toSearch}&st=1111&r_lt=1111`;
    console.log('lets find word');
    var meaning = '';
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        
        if (!error && response.statusCode === 200) {
            body.items[0].forEach(function(element) {
                var query = element[0][0];
                if (query == word) {
                    if (meaning) {
                        meaning += '\n'
                    }
                    meaning += element[1][0];
                    
                }

            }, this);

            
        }
        callback(meaning);
    });
    
}

function translate (message, callback) {
    var word = message.substring(2).trim();
    var toTranslate = encodeURIComponent(word);
    var url = `https://translation.googleapis.com/language/translate/v2?q=${toTranslate}&target=pt&model=nmt&key=AIzaSyAQyEs8Bzbis98zoDJHVHjvcKDsP6b4-Es`
    var meaning = '';
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        
        if (!error && response.statusCode === 200) {
            meaning = body.data.translations[0].translatedText;
        }
        callback(meaning);
    });
}

module.exports = {wordMeaning, translate};