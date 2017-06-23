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

module.exports = {wordMeaning};