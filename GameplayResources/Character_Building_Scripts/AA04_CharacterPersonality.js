class CharacterOutlook {
    constructor(){
        this.happyOrSadMap = {}
        this.CalmOrAngryMap = {}
        this.SafeOrScarredMap = {}
        this.ExcitedOrBoredMap = {}
        this.HornyOrDisgustedMap = {}
        this.StimulatedOrTiredMap = {}
        this.EntitledOrIndebtedMap = {}
        this.EmbarrassedOrReassuredMap = {}
        this.GoalsAndAnxieties = {}
        this.DesiresAndDreads = {}
        this.RespectMap = {}
        this.PreferencesMap = {}
        this.MoralityMap = {}
    }
}

class CharacterPersonality {
    constructor(){
        this.prideOrShameElements = {}
        this.morality = 30
        this.moralConviction = 0
        this.dutiful = 30
        this.empathy = 0
        this.submission = 0
        this.liberated = 40
        this.sociability = 10
        this.irascibleThreshold = 30
        this.angerLoudness = 10
        this.melancholyThreshold = 30
        this.smarts = 10 // sharp
        this.courage = 0 // cautious
        this.jealousyThreshold = 30
        this.envyThreshold = 30

        this.outlook = new Outlook()
    }
}
