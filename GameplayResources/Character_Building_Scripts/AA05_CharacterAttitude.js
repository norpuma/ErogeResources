class CharacterAttitude {
    constructor(characterID){
        this.characterID = characterID
        // Characters can have different attitudes depending on circumstances. One set around friends and another at the workplace, for instance.
        this.circumstanceMaps = {} // This is a map of circumstances -> CharacterAttitudeDefaults
    }
}

class CharacterAttitudeDefaults {
    constructor(){
        // This is a map of default attitudes to a collection of roles. Attitudes are identified as a collection of traits.
        // stranger, acquaintance, equal, superior, inferior
        this.toStrangers = {}
        this.toAcquaintances = {}
        this.toEquals = {}
        this.toSuperiors = {}
        this.toInferiors = {}
    }
}
