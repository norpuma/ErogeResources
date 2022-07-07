window.setProtagonistFormToSystem = function(){
    let protagonist = new window.BaseCharacter(State.variables.protagonistForm.firstName, State.variables.protagonistForm.gender)
    protagonist.names.last = State.variables.protagonistForm.lastName
    protagonist.body = new CharacterBody(protagonist.toString(), protagonist.gender, State.variables.protagonistForm.age, State.variables.protagonistForm.ethnicity)

    protagonist.personality = new CharacterPersonality(protagonist.toString())
    protagonist.personality.prideOrShameElements = {"smart": 20, "nice": 10, "fitness<=20": -10, "fitness<=10": -10, "nerd": -10, "wealth<=dependent": -10}
    protagonist.personality.dutiful = 20
    protagonist.personality.empathy = 10
    protagonist.personality.submission = 10
    protagonist.personality.smarts = 20
    protagonist.personality.courage = -10

    protagonist.resources.fitness = 0
    protagonist.resources.knowledge = 20
    protagonist.resources.charm = 0

    protagonist.mood = new CharacterMood()

    protagonist.relationships = {}
    
    State.variables.protagonist = protagonist
}

window.setPennysQuestionsToSystem = function(){}
