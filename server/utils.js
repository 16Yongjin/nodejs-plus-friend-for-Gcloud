const request = require('request');
const cheerio = require('cheerio');
const client = require('cheerio-httpcli');
const async = require('async');

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

function getCafeteriaMenu(message, callback) {
    var place = message.split(" ")[0];
    var eatingTime = message.split(" ")[1];

    var today = new Date().toISOString().substring(0,10).replace(/-/g, '');
    today = '20170626';
    var url = `https://webs.hufs.ac.kr/jsp/HUFS/cafeteria/viewWeek.jsp?startDt=${today}&endDt=${today}`;
    
    if (place == '인문관')
        url += '&caf_id=h101';
    else
        url += '&caf_id=h102';

    var menus = '';

    var re;
    if (eatingTime == '점심')
         re = /중식.+?\d+원/g;
    else
         re = /석식.+?\d+원/g;


    client.fetch(url, {}, function (err, $, res) {
        if (err) {console.log('Error : ', err); return;}
        var menu = $('table').text().replace(/\s+/g, ' ');

        var match;

        while (match = re.exec(menu)) {
            menus += (match[0].replace(' Kcal', 'Kcal').replace(/\s+/g, '\n').replace(/(\d{2})(\d{2}~\d{2})(\d{2})/g, ' $1:$2:$3\n').replace('Kcal', ' Kcal') + '\n\n');
        }

        if (menus == '')
            callback('오늘 밥 안 나옴');
        else
            callback(menus);

    });
}


module.exports = {wordMeaning, translate, getCafeteriaMenu};