window.Protagonist = class extends BaseCharacter {
    constructor(baseCharacter){
        super(baseCharacter)
        BaseCharacter__setStyle(this, "protagonist")
        this.feelings = new CharacterFeelings()
        this.int = 1
        this.str = 1
        this.money = 1000
        this.mostRecentBreakfast = new Timestamp(0, 0, 0)
    }
}

window.Protagonist__goto = function(location){
    let protagonist = State.variables.protagonist
    protagonist.location = location
}

window.Protagonist__hornyDescriptorFromValue = function() {
    switch(State.variables.protagonist.feelings.horny){
        case -1:
            return "Pacified"
        case 0:
            return "Content"
        case 1:
            return "Satisfied"
        case 2:
            return "Bubbling"
        case 3:
            return "Pressing"
        case 4:
            return "Intense"
        case 5:
            return "EXTREME"
        case 6:
            return "UNBEARABLE"
        default:
            return "ERROR: " + this.State.variables.protagonist.horny + " is an unexpected value for horny."
    }
}

var protagonist = undefined