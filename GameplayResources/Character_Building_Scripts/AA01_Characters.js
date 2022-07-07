State.variables.characters = {}

window.BaseCharacter = class {
    constructor(name, gender, style){
        // Check if copy constructor should be used.
        if (name instanceof BaseCharacter){
            let src = name
            this.name = src.name
            this.names = src.names
            gender = src.gender
            style = src.style
        } else {
            this.name = name
            this.names = new CharacterNames(name)
        }
        this.uniqueID = this.name + "_UniqueID_" + Math.floor(Math.random() * 1000000)
        State.variables.characters[this.uniqueID] = this
        this.lastUpdate = ( 0 , 0 , 0 )
        this.locationID = undefined
        if (gender !== undefined){
            BaseCharacter__setGender(this, gender)
        }
        if (style === undefined){
            BaseCharacter__setStyle(this, "common")
        } else {
            BaseCharacter__setStyle(this, style)
        }
    }
    toString(){
        return this.uniqueID
    }
}

window.BaseCharacter__setGender = function (baseCharacter, maleOrFemale){
    baseCharacter.gender = maleOrFemale
    if (baseCharacter.gender == "male"){
        baseCharacter.hisHer = "his"
        baseCharacter.hisHers = "his"
        baseCharacter.heShe = "he"
        baseCharacter.masterMistress = "master"
    } else {
        baseCharacter.hisHer = "her"
        baseCharacter.hisHers = "hers"
        baseCharacter.heShe = "she"
        baseCharacter.masterMistress = "mistress"
    }
}
window.BaseCharacter__setStyle = function (baseCharacter, style){
    baseCharacter.style = style
    baseCharacter.talk_style = style + "_talk"
}

window.BaseCharacter__talkFormatter = function (baseCharacter, talkText){
    let parts = talkText.split("")
    let formattedTalkText = ""
    let isStartingQuote = true
    for (let part of parts){
        if (part == '"'){
            if (isStartingQuote == true){
                formattedTalkText += '@@.' + baseCharacter.talk_style + ';' + part
            } else {
                formattedTalkText += part + '@@'
            }
            isStartingQuote = !isStartingQuote
        } else {
            formattedTalkText += part
        }
    }
    return formattedTalkText
}

Macro.add('speech', {
	tags     : null,
	handler  : function () {
		let char = this.args[0], name = char.names.first;
        if (this.args.length > 1) name = this.args[1];
        //let output = '<div class="speech"><span class="LittleSisterStyle"><span class="avatar"/>"Sasha"</span><hr>' + BaseCharacter__talkFormatter(char, this.payload[0].contents) + '</div>'
        let output = '<div class="speech">';
        output += '<span class="' + char.style + '"><span class="avatar"/>' + name + '</span>';
        output += '<hr>' + BaseCharacter__talkFormatter(char, this.payload[0].contents) + '</div>';
		$(this.output).wiki(output);
	}
});

window.CharacterNames = class {
    constructor(standardName){
        this.standard = standardName
        this.first = this.standard
        this.last = ""
        // honey, hun, sweetie, sugar, darling, dear, baby, sweetheart, lover, doll, babe, lover-boy, my love, cutie, beautiful, kid, kiddo, girlie, sweetness, princess.
        this.affectionateNames = []
        this.privateNames = []
        // dirtbag, asswipe, motherfucker, scum, degenerate, pig, pervert
        // bitch, cunt, 
        this.offensiveNames = []
        this.teasingNames = []
        // sir, master, madam
        this.respectfulNames = []
        //# master, boss, goddess, my queen, princess
        this.superiorNames = []
    }
}

window.BaseCharacter__goTo = function(baseCharacter, location){
    if (baseCharacter.locationID !== undefined){
        if (location.uniqueID == baseCharacter.locationID) {
            return
        }
        let prevLocation = State.variables.locations[baseCharacter.locationID]
        if (prevLocation !== undefined) {
            let prevLocationCharacters = prevLocation.characters
            let index = prevLocationCharacters.indexOf(baseCharacter.uniqueID)
            if (index > -1) {
                prevLocationCharacters.splice(index, 1)
            }
        }
    }
    baseCharacter.locationID = location.uniqueID
    State.variables.locations[baseCharacter.locationID].characters.push(baseCharacter)
}

State.variables.characterInitializationFunctions = []
State.variables.furtherCharacterInitializationFunctions = []

window.initializeCharacters = function(){
    for(let char of State.variables.characterInitializationFunctions){
        char()
    }
    delete State.variables.characterInitializationFunctions
}

window.furtherInitializeCharacters = function(){
    for(let char of State.variables.furtherCharacterInitializationFunctions){
        char()
    }
    delete State.variables.furtherCharacterInitializationFunctions
}
