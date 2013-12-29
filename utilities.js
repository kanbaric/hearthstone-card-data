// To use this I currently use chrome dev tools to save and run these snippets, then
// at a specific breakpoint while browsing hearthhead's card listing, I run:
// `console.save(getZamHSData(this.data), 'cards.json');`
//
// This may change if hearthhead changes their js data structures.

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

    // Return all HS data
    function getZamHSData (cardArray) {
        return {
            _comment: "//Retrieved on " + new Date().toString(),
            cards: mapZamHSCards(cardArray),
            labels: {
                classes: getClasses(),
                races: getRaces(),
                types: getTypes(),
                sets: getSets(),
                quality: getQualities()
            }
        };
    }
    
    // Prepare card data for json.stringify, stripping any dom references and processing ids.
    function mapZamHSCards (cardArray) {
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
                        race: cardArray[i].race ? cardArray[i].race : 0,
                        classs: cardArray[i].classs ? cardArray[i].classs : 0,
                        collectible: cardArray[i].collectible,
                        elite: cardArray[i].elite,
                        icon: cardArray[i].icon,
                        image: cardArray[i].image,
                        quality: cardArray[i].quality,
                        set: cardArray[i].set ? cardArray[i].set : 0,
                        type: cardArray[i].type ? cardArray[i].type : 0,
                        zamid: cardArray[i].id,
                        zampopularity: cardArray[i].popularity,
                    }
                );
            }
        }
        return hsCards;
    }
    
    // Produce id:label pairs for various data ids
    function getClasses () {
        return { 0: "Neutral", 1: "Warrior", 2: "Paladin", 3: "Hunter", 4: "Rogue", 5: "Priest", 6: "Death Knight", 7: "Shaman", 8: "Mage", 9: "Warlock", 10: "Monk", 11: "Druid" };
    }

    function getRaces () {
        return { 0: "None", 14: "Murloc", 15: "Demon", 20: "Beast", 21: "Totem", 23: "Pirate", 24: "Dragon" };
    }

    function getTypes () {
        return { 0: "Unknown", 3: "Hero", 4: "Minion", 5: "Spell", 7: "Weapon", 10: "Hero Power" };
    }

    function getSets () {
        return { 0: "Unknown", 2: "Basic", 3: "Expert", 4: "Reward", 5: "Missions", 11: "Promotion" };
    }
    
    function getQualities () {
        return { 0: "Free", 1: "Common", 3: "Rare", 4: "Epic", 5: "Legendary" };
    }

    //function getMechanics () {}

    window.getZamHSData = getZamHSData;

})(window);