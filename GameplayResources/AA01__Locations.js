State.variables.locations = {}

window.BaseLocation = class {
    constructor(name, examinePassage){
        // Check if copy constructor should be used.
        if (name instanceof BaseLocation){
            let src = name
            this.name = src.name
            this.examinePassage = src.examinePassage
        } else {
            this.name = name
            this.examinePassage = examinePassage
        }
        this.uniqueID = this.name + "_UniqueID_" + Math.floor(Math.random() * 1000000)
        State.variables.locations[this.uniqueID] = this
        this.characters = []
    }
    toString(){
        return this
    }
}

State.variables.locationInitializationFunctions = []
State.variables.furtherLocationInitializationFunctions = []

window.initializeLocations = function(){
    for(let loc of State.variables.locationInitializationFunctions){
        loc()
    }
    delete State.variables.locationInitializationFunctions
}

window.furtherInitializeLocations = function(){
    for(let loc of State.variables.furtherLocationInitializationFunctions){
        loc()
    }
    delete State.variables.furtherLocationInitializationFunctions
}
