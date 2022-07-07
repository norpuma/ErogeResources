/*
## Overall:
* These indicate the character's overall mood. They are formed by elements that decay over time.
- Happy or Sad Elements
- Calm or Angry Elements
- Safe or Scarred Elements
- Excited or Bored Elements
- Horny or Disgusted Elements // At the midpoint the character is just "cold"
- Stimulated or Tired Elements
## Reactions:
* These indicate how the character feels in a particular situation. They all reset at the end of the scene.
- Engaged or Disinterested Elements
- Emboldened or Humiliated Elements
- Intimidated or Humbled Elements
- Embarrassed or Reassured Elements
*/

class CharacterMood {
    constructor(characterID){
        this.characterID = characterID

        this.happyOrSadElements = {}
        this.calmOrAngryElements = {}
        this.safeOrScarredElements = {}
        this.excitedOrBoredElements = {}
        this.hornyOrDisgustyElements = {}
        this.stimulatedOrTiredElements = {}

        this.reactions = new CharacterReactions()
    }
}

class CharacterReactions {
    constructor(){
        this.engagedOrDisengagedElements = {}
        this.emboldenedOrHumiliatedElements = {}
        this.intimidatedOrHumbledElements = {}
        this.embarrassedOrReassuredElements = {}
    }
}
