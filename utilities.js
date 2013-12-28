// console.save snippet
// Originally from https://github.com/bgrins/devtools-snippets/blob/master/snippets/console-save/console-save.js
// MIT Licensed
(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data');
            return;
        }

        if(!filename) filename = 'console.json';

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4);
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a');

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    };
})(console)

// ZAM Data Snippet
// Authored by kanbaric
// MIT Licensed
(function(window) {
    
    // Prepare card data for json.stringify, stripping any dom references and processing ids.
    window.parseZamHSCards = function (cardArray) {
        var hsCards = [];
        
        if (cardArray && cardArray.length && cardArray.length > 0) {
            for(var i = 0, length = cardArray.length; i < length; i++) {
                hsCards.push(
                    {
                        name: cardArray[i].name,
                        description: cardArray[i].description,
                        cost: cardArray[i].cost,
                        attack: cardArray[i].attack,
                        health: cardArray[i].health,
                        race: cardArray[i].race ? cardArray[i].race : null,
                        classs: cardArray[i].classs ? cardArray[i].classs : 0,
                        collectible: cardArray[i].collectible,
                        elite: cardArray[i].elite,
                        icon: cardArray[i].icon,
                        image: cardArray[i].image,
                        quality: cardArray[i].quality,
                        set: cardArray[i].set,
                        type: cardArray[i].type,
                        zamid: cardArray[i].id,
                        zampopularity: cardArray[i].popularity,
                    }
                );
            }
        }
        return hsCards;
    };
    
    // Todo: Produce key-value pairs for various data types
    //window.getClasses = function () {}
    //window.getRaces = function () {}
    //window.getTypes = function () {}
    //window.getSets = function () {}
    //window.getQualities = function () {}
    //window.getMechanics = function () {}

    // Todo: return all HS data
    //window.getZamHSData = function (cardArray) {
    //    return {
    //        cards: parseZamHSCards(cardArray),
    //        classes: []
    //    };
    //}

})(window);