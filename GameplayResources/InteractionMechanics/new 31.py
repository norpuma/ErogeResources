class SexualProfile(renp.store.object):
    INTERACTOR_TRAIT_BLOND = "BLOND"
    INTERACTOR_TRAIT_LARGE_BREASTS = "LARGE_BREASTS"
    INTERACTOR_TRAIT_CONVENTIONALLY_ATTRACTIVE_FEATURES = "CONVENTIONALLY_ATTRACTIVE_FEATURES" # Cute
    INTERACTOR_TRAIT_UNCONVENTIONALLY_ATTRACTIVE_FEATURES = "UNCONVENTIONALLY_ATTRACTIVE_FEATURES" # Exotic
    INTERACTOR_TRAIT_UNCOMMONLY_ATTRACTIVE_FEATURES = "UNCOMMONLY_ATTRACTIVE_FEATURES" # Beautiful
    INTERACTOR_TRAIT_EXTRAORDINARILY_ATTRACTIVE_FEATURES = "EXTRAORDINARILY_ATTRACTIVE_FEATURES" # Gorgeous
    INTERACTOR_TRAIT_PHYSICALLY_FIT = "PHYSICALLY_FIT"
    INTERACTOR_TRAIT_CHARMING = "CHARMING"
    INTERACTOR_TRAIT_ENTERTAINING = "ENTERTAINING"
    INTERACTOR_TRAIT_SMART = "SMART"
    INTERACTOR_TRAIT_OUT_OF_SHAPE = "OUT_OF_SHAPE"
    INTERACTOR_TRAIT_BALD = "BALD"
    INTERACTOR_TRAIT_OBNOXIOUS = "OBNOXIOUS"
    INTERACTOR_TRAIT_STUPID = "STUPID"
    INTERACTOR_TRAIT_WANKER = "WANKER"
    def __init__(self, attractionToMales, attractionToFemales):
        ##  How strong is the character's sex drive, how sexual they is and at what level Horny usually stabilizes.
        ##  See Horny (under feelings) for more information.
        ##  - This can be permanently changed by some factors.
        ##  Libido -50: Completely frigid. They is, usually, impossible to get into a sexually active state.
        ##  Libido -30: Frigid. Very, very hard to turn on.
        ##  Libido -10: Cool. Usually uninterested in sex.
        ##  Libido 0: Unusually stable.
        ##  Libido 10: Average adult.
        ##  Libido 20: Easily excitable. This is the Libido of most teenagers.
        ##  Libido 30: Usually excited. This is someone who can be seen as obsessing over sex as they are very often in a sexual state.
        ##  Libido 50: Uncontrollable sex maniac. Nymphomaniac, sex addict.
        self.libido = 10
        # Gender attraction:
        # Value -30: Absolute repulsion to gender, traits don't matter at all.
        # Value -20: Very strong repulsion to gender, traits will almost not matter.
        # Value -10: Repulsion to gender, only few traits will matter.
        # Value 0: No particular attraction to gender.
        # Value 10: Base attraction to gender, will be picky with traits.
        # Value 20: Very strong attraction to gender, will not be very picky with traits.
        # Value 30: Irrational attraction to gender, traits will almost not matter.
        self.attractionToMales = attractionToMales
        self.attractionToFemales = attractionToFemales
        # These are the turn on and turn offs for the character.
        # Character traits, demonstrations, circumstances and sex acts can be found there.
        self.libidoElements = _buildDefaultLibidoElements(self.attractionToMales, self.attractionToFemales) # A dict of LibidoElement.kind as keys to instances of LibidoElement.
        self.desireThresholds = DesireThresholds(self.libidoElements)
    
    def _buildDefaultLibidoElements(self, attractionToMales, attractionToFemales):
        res = {}
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_MALE, desireComponent = LimitedModifier(attractionToMales, 0, 0), hornyComponent = LimitedModifier(attractionToMales, 0, 0))
        res[element.kind] = element
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_FEMALE, desireComponent = LimitedModifier(attractionToFemales, 0, 0), hornyComponent = LimitedModifier(attractionToFemales, 0, 0))
        res[element.kind] = element
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_CONVENTIONALLY_ATTRACTIVE, desireComponent = LimitedModifier(10, 0, 10), hornyComponent = LimitedModifier(10, 0, 10))
        res[element.kind] = element
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_UNCOMMONLY_ATTRACTIVE_FEATURES, desireComponent = LimitedModifier(10, 0, 10), hornyComponent = LimitedModifier(15, 0, 15))
        res[element.kind] = element
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_EXTRAORDINARILY_ATTRACTIVE_FEATURES, desireComponent = LimitedModifier(20, 0, 10), hornyComponent = LimitedModifier(20, 0, 20))
        res[element.kind] = element
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_PHYSICALLY_FIT, desireComponent = LimitedModifier(10, 0, 10), hornyComponent = LimitedModifier(10, 0, 10))
        res[element.kind] = element
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_CHARMING, desireComponent = LimitedModifier(10, 0, 20), hornyComponent = LimitedModifier(10, 0, 10))
        res[element.kind] = element
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_ENTERTAINING, desireComponent = LimitedModifier(10, 0, 20), hornyComponent = LimitedModifier(10, 0, 10))
        res[element.kind] = element
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_OBNOXIOUS, desireComponent = LimitedModifier(-10, -10, 0), hornyComponent = LimitedModifier(-10, -10, 0))
        res[element.kind] = element
        element = LibidoElement(kind = SexualProfile.INTERACTOR_TRAIT_OUT_OF_SHAPE, desireComponent = LimitedModifier(-10, 0, 0), hornyComponent = LimitedModifier(-15, 0, 0))
        res[element.kind] = element
    
    def evaluateMoodForSexyActs(self, interactor):
        # Libido represents a starting point for Horny. A collection of stimulus the character exposed to socially and from which Horny does not move much.
        # Desire will present thresholds at which some actions may be taken. It will, usually, put a cap on Horny.
        # There are other elements that may change the cap on Horny (in particular, many days without climax and certain drugs).
        # Horny will determine what kind of action the character will take.
        positiveTraits, negativeTraits = self.findLibidoElements(interactor)
        if interactor.gender == "male":
            desire = self.checkDesire(self.attractionToMales, positiveTraits, negativeTraits) # Desire, here, should be a tuple (totalDesire, cappedAtMax, cappedAtMin, thresholdsMet)
        else:
            desire = self.checkDesire(self.attractionToFemales, interactor) # Desire, here, should be a tuple (totalDesire, cappedAtMax, cappedAtMin, thresholdsMet)
        horny = self.checkHorny(libido, desire, modifierToMaxHorny)
        return (desire, horny)

    def findLibidoElements(self, interactor):
        positiveElements = []
        negativeElements = []
        for element in self.libidoElements:
            if element.checkElement(interactor):
                if element.desireComponent.value > 0:
                    positiveElements.append(element)
                else:
                    negativeElements.append(element)
        return positiveElements, negativeElements

    def checkDesire(self, attractionToGender, positiveTraits, negativeTraits):
        if attractionToGender <= -30:
            return attractionToGener # At -30, the character will be cold. At -40 to -50 the character will feel terrible to be in the presence of someone like that.
        
        minimumDesirousTraitsToDesire = 0
        bonusToDesireRegardlessOfTraits = 0
        overallDesire = 0
        positiveElements = []
        negativeElements = []
        if attractionToGender <= -20:
            minimumDesirousTraitsToDesire = 50
        elif attractionToGender <= -10:
            minimumDesirousTraitsToDesire = 30
        elif attractionToGender <= 0:
            minimumDesirousTraitsToDesire = 10
        elif attractionToGender <= 30:
            bonusToDesireRegardlessOfTraits = 20
        else: # attractionToGender > 30:
            bonusToDesireRegardlessOfTraits = 50
        overallDesire += bonusToDesireRegardlessOfTraits
        for element in self.libidoElements:
            if element.checkElement(interactor):
                overallDesire = element.desireComponent.applyTo(overallDesire)
                if element.desireComponent.value > 0:
                    positiveElements.append(element)
                else:
                    negativeElements.append(element)
        
        self.desireThresholds.checkThresholds()
        return overallDesire, cappedMax, cappedMin

    def checkHornyFromDesire(self, libido, desire, modifierToMaxHorny = 0):
        overallHorny = 0
        # At this point, we already know all elements that were found in the interactor and that meet the character's requirements.
        foundElements = desire[1] + desire [2]
        for element in foundElements: # Checking positive elements
            overallHorny = element.hornyComponent.applyTo(overallHorny, modificationToMax = modifierToMaxHorny)
        return (overallHorny, desire[1], desire[2])

    def checkHorny(self, )


class DesireRequirements(renpy.store.object):
    def __init__(self, minimumDesire, maximumDesire, oneOfRequirements, allOfRequirements, isInvertedThreshold = False):
        """An interactor must reach minimumDesire and have all of the required traits found in requirements  for the character to consider them appropriate for some threshold (see DesireThresholds). While the interactor meets those requirements, the character may reach a desire capped by maximumDesire."""
        # To meet a requirement all of the allOfRequirements must be met and at least one of the oneOfRequirements.
        self.minimumDesire = minimumDesire
        self.maximumDesire = maximumDesire
        self.oneOfRequirements = oneOfRequirements # A list of instances of LibidoElement, at least one of each must be met.
        self.allOfRequirements = allOfRequirements # A list of instances of LibidoElement, all of which must be met.
        self.isInvertedThreshold = isInvertedThreshold
    
    def checkRequirement(self):
        # To meet a requirement all of the allOfRequirements must be met and at least one of the oneOfRequirements.
        thresholdReached = False
        allRequirementsFound = True
        overallDesire = 0
        for requirement in desireRequirements.allOfRequirements:
            if requirement.checkElement(interactor):
                allRequirementsFound &= True
                overallDesire = element.desireComponent.applyTo(overallDesire)
            else:
                allRequirementsFound = False
        if allRequirementsFound:
            oneOfRequirementsFound = False
            if len(desireRequirements.oneOfRequirements) < 1:
                oneOfRequirementsFound = True
            for requirements in desireRequirements.oneOfRequirements:
                if requirement.checkElement(interactor):
                    oneOfRequirementsFound = True
            allRequirementsFound &= oneOfRequirementsFound
        if allRequirementsFound:
            return overallDesire



class DesireThresholds(renpy.store.object):
    # DESIRE:
    ##  Desire is organized in elements. A character may want an interactor for any number of activities.
    ##  This indicates how much an interactor has made themself desirable, how much the character believe that a given activity with them will be pleasant.
    ##  - When a sexual circumstance is implied by the target character, Horny is capped by Desire, with exceptions.
    # Interactor must have LESS than this threshold and have at least all of these elements for the character not to feel sick when looking at them.
    ##  Desire -50: Repulsed (cannot tolerate to look at character)
    DIGUSTED_THRESHOLD_KEY = "DIGUSTED_THRESHOLD_KEY" # An INVERTED threshold.
    # Interactor must have LESS than this threshold and have at least all of these elements for the character to be UNwilling to talk to them.
    ##  Desire -30: Disgusted. Will be unwilling to talk to the interactor or to be part of most civilized interactions with them.
    CIVILIZED_INTERACTION_MADE_IMPOSSIBLE_THRESHOLD_KEY = "CIVILIZED_INTERACTION_MADE_IMPOSSIBLE_THRESHOLD_KEY"
    # Interactor must reach this threshold and have at least all of these elements for the character to consider making out with them.
    ##  Desire 10: The desire offered to most people of the preferred gender and, most of the time, a single Trait is enough for the character to be willing to make out.
    MAKING_OUT_THRESHOLD_KEY = "MAKING_OUT_THRESHOLD_KEY"
    # Interactor must reach this threshold and have at least all of these elements for the character to take the initiative to talk to them.
    ##  Desire 30: Acting on their feelings. Trying to seduce the target.
    TAKING_INITIATIVE_THRESHOLD_KEY = "TAKING_INITIATIVE_THRESHOLD_KEY"
    # Interactor must reach this threshold and have at least all of these elements for the character to consider having sex with them.
    ##  Desire 40: Down to fuck. This usually has more requirements than just having sufficient desire, but not always.
    SEX_THRESHOLD_KEY = "SEX_THRESHOLD_REQUIREMENTS_KEY"
    # Interactor must reach this threshold and have at least all of these elements for the character to consider having a secret relationship with them.
    ## This often requires the interactor to have demonstrated some qualities. More than can be gleaned in just a few minutes.
    SECRET_RELATIONSHIP_THRESHOLD_KEY = "SECRET_RELATIONSHIP_THRESHOLD_KEY"
    # Interactor must reach this threshold and have at least all of these elements for the character to consider having a public relationship with them.
    ## This often requires the interactor to have demonstrated some qualities. More than can be gleaned in just a few minutes.
    PUBLIC_RELATIONSHIP_THRESHOLD_KEY = "PUBLIC_RELATIONSHIP_THRESHOLD_KEY"
    # Interactor must reach this threshold and have at least all of these elements for the character to consider having a long-term relationship with them.
    ## This usually means marriage, or, at lest, moving in.
    ## This often requires the interactor to have demonstrated some qualities. More than can be gleaned in just a few minutes.
    LONG_TERM_RELATIONSHIP_THRESHOLD_KEY = "PUBLIC_RELATIONSHIP_THRESHOLD_KEY"
    # Interactor must reach this threshold and have at least all of these elements for the character to lose control over them. Overcoming taboos and the like.
    ## This goes way beyond most situations. Most of the time it will be reserved for interactors playing mind games, using drugs or some supernatural/super-science mean to manipulate/change the character.
    LOSING_CONTROL_THRESHOLD_KEY = "LOSING_CONTROL_THRESHOLD_KEY"
    def __init__(self, libidoElements = {}):
        self._thresholds = {} # This is a dict of string keys to instances of DesireRequirements.
        self._libidoElements = libidoElements
        ## This is, usually, kissing, groping and accepting limited physical contact. Flashing is often possible at this point too.
        self._buildDefaultMakingOutRequirements()
        ## Taking initiative means starting courtship on some level. This may be teasing or approaching to talk, using innuendo or leaning for a kiss, or bluntly asking if the interactor is interested in going further.
        self._buildDefaultTakeInitiativeRequirements()
        ## This often requires the interactor to have demonstrated some qualities. More than can be gleaned in just a few minutes.
        self._buildDefaultSexRequirements()
        self._buildDefaultLoseControlRequirements()
        return
    
    def _buildDefaultMakingOutRequirements(self):
        oneOfRequirements = [SexualProfile.CONVENTIONALLY_ATTRACTIVE_FEATURES, SexualProfile.PHYSICALLY_FIT, SexualProfile.CHARMING, SexualProfile.ENTERTAINING]
        allOfRequirements = []
        threshold = DesireRequirements(10, 20, oneOfRequirements = oneOfRequirements, allOfRequirements = allOfRequirements)
        self.addThreshold(self.MAKING_OUT_THRESHOLD_KEY, threshold)
        return
    
    def _buildDefaultTakeInitiativeRequirements(self):
        oneOfRequirements = [SexualProfile.CONVENTIONALLY_ATTRACTIVE_FEATURES, SexualProfile.PHYSICALLY_FIT, SexualProfile.CHARMING, SexualProfile.ENTERTAINING]
        allOfRequirements = []
        threshold = DesireRequirements(20, 30, oneOfRequirements = oneOfRequirements, allOfRequirements = allOfRequirements)
        self.addThreshold(self.TAKING_INITIATIVE_THRESHOLD_KEY, threshold)
        return
    
    def _buildDefaultSexRequirements(self):
        oneOfRequirements = [SexualProfile.CONVENTIONALLY_ATTRACTIVE_FEATURES, SexualProfile.PHYSICALLY_FIT, SexualProfile.CHARMING, SexualProfile.ENTERTAINING]
        allOfRequirements = []
        threshold = DesireRequirements(30, 40, oneOfRequirements = oneOfRequirements, allOfRequirements = allOfRequirements)
        self.addThreshold(self.SEX_THRESHOLD_REQUIREMENTS_KEY, threshold)
        return
    
    def _buildDefaultLoseControlRequirements(self):
        oneOfRequirements = []
        allOfRequirements = []
        threshold = DesireRequirements(70, 70, oneOfRequirements = oneOfRequirements, allOfRequirements = allOfRequirements)
        self.addThreshold(self.LOSING_CONTROL_THRESHOLD_KEY, threshold)
        return
    
    def getThresholdsKeys(self):
        return self._thresholds.keys()
    
    def addThreshold(self, thresholdKey, desireRequirements, overwriteExistingThreshold = False):
        foundThreshold = self._thresholds[thresholdKey]
        if (foundThreshold is not None) and not overwriteExistingThreshold:
            return False
        self._thresholds[thresholdKey] = desireRequirements
        return True
        
    
    def checkThreshold(self, desireRequirements, interactor):
        # To meet a requirement all of the allOfRequirements must be met and at least one of the oneOfRequirements.
        thresholdReached = False
        allRequirementsFound = Trye
        overallDesire = 0
        for requirement in desireRequirements.allOfRequirements:
            if requirement.checkElement(interactor):
                allRequirementsFound &= True
                overallDesire = element.desireComponent.applyTo(overallDesire)
            else:
                allRequirementsFound = False
        if allRequirementsFound:
            for requirements in desireRequirements.oneOfRequirements:
                if requirement.checkElement(interactor):
                    allRequirementsFound &= True
                
    def checkThresholdFromTraits(self, thresholdKey, positiveTraits, negativeTraits):
        desireRequirements = self._thresholds[thresholdKey]
        if desireRequirements is None:
            return False
        
        if not desireRequirements.isInvertedThreshold:
            #for libidoElement in desireRequirements
            pass

class LimitedModifier(renpy.store.object):
    def __init__(self, modifierValue, minimumResultingValue = -999999, maximumResultingValue = 999999):
        self.value = modifierValue
        self.minimumResultingValue = minimumResultingValue
        self.maximumResultingValue = maximumResultingValue
    
    def applyTo(self, initialValue, modificationToMin = 0, modificationToMax = 0):
        result = initialValue + self.value
        localMax = self.maximumResultingValue + modificationToMax
        localMin = self.minimumResultingValue + modificationToMin
        if result > localMax:
            return localMax
        elif result < localMin:
            return localMin
        return result

class LibidoElement(renpy.store.object):
    def __init__(self, kind, desireComponent, hornyComponent, minimumTriggerValue = -999, maximumTriggerValue = 999):
        self.kind = kind # A Key that should correspond to a "Trait" in a character.
        self.minimumTriggerValue = minimumTriggerValue
        self.maximumTriggerValue = maximumTriggerValue
        self.extraConditions = [] # This is a list of LibidoElements
        # Minimum requirements to consider romantic/sexual:
        # Minimum requirements to 
        # Minimum Requirements to make intrigued
        
        # maximumResultingDesire 10: Finding the component will ensure that the target is desirous
        # maximumResultingDesire 20: 
        self.desireComponent = desireComponent # This is a LimitedModifier (desireModifier, minimumResultingDesire, maximumResultingDesire)
        self.hornyComponent = hornyComponent # This is a LimitedModifier (hornyModifier, minimumResultingDesire, maximumResultingDesire)
    
    def checkElement(self, interactor):
        foundTrait = interactor.findTrait(self.kind)
        if (foundTrait is None) or (foundTrait.value < self.minimumTriggerValue) or (foundTrait.value > self.maximumTriggerValue):
            return False
        for extraCondition in self.extraConditions:
            if not extraCondition.check(interactor):
                return False
        return True

def horny():
    # HORNY:
    ##  This indicates how pressing is the character's need (the pressure) to find sexual release. This is the character's "Sex Urgency" or "Sex Pressure".
    ##  This statistic is driven by the Stimulated statistic.
    ##  - Will increase or decrease according to situations throughout the day and decrease or increase by 1 for each "time period" (usually 4 hours) towards Libido (see Sexual Profile).
    ##  - This may make a character distracted. He may lose "Focus" or "Willpower".
    ##  - A character exposed to lots of sexy situations will keep Horny higher than Libido due to circumstances.
    ##  - A character exposed to lots of unsexy situations will keep Horny lower than Libido due to circumstances.
    ##  - For most NPCs, Horny at any given scene will be determined by Libido + random modifier + story modifiers.
    ##  Horny -2: Disgusted. The thought of sex is disgusting. # She is closed and dry. / He is flaccid and shrunk.
    ##  Horny -1: Cool. The thought of sex seems uninteresting. # She is closed. / He is flaccid.
    ##  Horny 0: Sated/Satisfied. They are not thinking about sex at all. They are usually Happy and Focused at this point and a little less Excitable than usual, just after a climax.
    ##  Horny 1: Content. They react to excitement with a smile, appreciating it, but not overpowered by it. Still not too excitable at this point, usually. # She sometimes gets a distant stare. / He sometimes gets a distant stare.
    ##  Horny 2: Tingly/Bubbling. At this point, sex often intrudes on their minds. They also lose some Focus when this point is reached. # She bites her lower lip when daydreaming. / He sometimes gets a distracted smile.
    ##  Horny 3: Tempted/Pressing. They are often thinking about sex at this point, having trouble Focusing on anything else. # She is flushed. / Half-erection. He often adjusts his junk.
    ##  Horny 4: Excited/Intense. They can barely pay attention to anything else. No Focus at all. # She unconsciously brushes her nipples or her crotch. / Erection. He sometimes makes a little grunt and pulls on his trousers to accommodate his penis.
    ##  Horny 5: Overexcited/EXTREME. They NEED release. No Focus at all. # She masturbates if left alone; also, she finds some arousal with any stimulus to her breasts (or some secondary erogenous area; she may suck on a finger, for instance). / He has serious trouble concentrating and will masturbate at the first occasion. He will grunt at any contact with his erogenous zones, instinctively humping any contact.
    ##  Horny 6: Craving/UNBEARABLE. # She gets wet when servicing a partner without direct stimulation on her (e.g.: giving blowjobs). / Some pre-cum starts leaking. He may have a premature ejaculation.

    ##  Desire 30+: Flushes in the target's presence.
    ##  Desire 40+: When masturbating, she thinks of target.
    ##  Desire 70+: She admits her desire openly. If denied, she offers to "do stuff".
    ##  Desire 80+: She will overcome her "embarrassments" to get more of the target.
    ##  Desire 90+: She begs and humiliates herself for it. She may overcome a taboo.
    ##  Desire 100+: She begs for anything, any kind of attention is good enough for her (anal, humiliation, etc).

    self.horny = 1 # 0 to 10.
    return


# Unknown
    # See
    # Hear about
# Unmet
    #> Demonstrate
    #> Approach (often with an introduction)
    # Intrigue
    # Be forced to meet
# Acquaintance
# Well Known

# Good Company
# Friend
# Intimate Friend
# Counselor
# Lover
# Enemy
# Victim
# Tormentor

# Keep/Fascinate
# Overcome Boundary
# Transition
# 



# Approach or Intrigue or Be Forced
  ## Approach: She must have a non-negative or positive impression of you. She will end up with a positive, negative or neutral impression of you.
  ## Intrigue: She will approach you because you have some quality that she finds attractive. Or because you said or did something that piqued her interest or curiosity.
  ## Be Forced: Neither of you approach each other. Circumstances force you to interact.
# Buy or Charm or Tease
  ## Buy: Spend money on the girl and she will spend more time with you. This can also represent being really useful.
  ## Charm: You say just the right things and the girl is charmed. She will want to spend more time with you.
  ## Tease: You are something of jerk and the girl keeps coming back to you. It may seem it is out of revenge, but there is something more.
# Reassure or Excite
  ## Reassure: The girl feels safe around you. This is mostly about being non-threatening, which usually leads to friendzone.
  ## Excite: You do something that makes the girl excited. This is usually related to some exciting moment, like protecting her from physical threat, taking her somewhere unexpected, taking her somewhere expensive, doing some exhibitionism, pushing her beyond her limit, or plainly taking control of her and showing dominance.
# Test or Announcement
  ## Test: You test your relationship with the girl. It will determine your relationship from that point onward. This is asking a girl out on a date, trying to kiss her, declaring your feelings or threatening to go away and become unavailable. This may also threatening with blackmail to get submission.
  ## Announcement: The girl decides the relationship has reached a given status and announces it to you. This will have results similar to Test.
# Friendzone or Wait or Kiss or Date or Sex or Serious Relationship or Submit or Wimp-Servant or Submissive-Toy or Tease-Toy
  ## Friendzone: The girl makes it clear to you that she likes you but has no romantic or sexual feelings for you. There is very little chance of changing this status. Y?ou may come to see her naked, because she doesn't feel threatened, but you won't touch her. At most you will get a pity-fuck. This CAN be leveraged into blackmail.
  ## Wait: The result of a test being that she thinks things are too uncertain and suggests you wait a little longer before determining your relationship.
  ## Kiss: You test her and the result is a successful kiss. This is usually the start of official courtship. She knows you are interested and SHE will start testing you.
  ## Date: You test her and the result is that the two of you agree on going on a date. She will avoid further contact until the date and you have some time to prepare. The date will be a big test.
  ## Sex: You test her and the result is that she makes herself available for sex right then. This MAY lead to other opportunities for tests and for further sex. It may not lead to a serious relationship.
  ## Submit: You test her and the result is that she submits to you. This is, usually, the result of blackmail, but a lot of dominance can lead to this result situation as well. She becomes your sub. The relationship will only change if you show a lot of weakness in her presence or if she finds a way to escape your blackmail.
  ## Wimp-Servant: This is usually not the result of a test, but an announcement (although she may decide to announce it during a test). She decides that you must act like her submissive servant, confident that you are too weak to rebel. You will continue being useful and you may get a pity fuck (more likely to be handjob). You may be rewarded.
  ## Submissive-Toy: This is usually not the result of a test, but an announcement (although she may decide to announce it during a test). She decides that you will be her submissive toy. You are not as much useful as a tool for her amusement. She keeps you around to amuse herself (often at the expense of your suffering). You may be rewarded.
  ## Tease-Toy: This is usually not announced but decided intimately by the girl. She decides that she will only ever tease you and never more. She will keep dangling herself just out of your reach.


def turnOns():
    # During Sex Turn-Ons: SEXUAL_COMPLIMENTS, PAMPERING, SEXUAL_EXPOSURE (others aware of her masturbating or having sex), WITNESSED_MASTURBATION, WITNESSING_SEXUALITY (a voyeur), CUNNILINGUS, FELATIO, HER_BI_SEXUALITY, PAIN, LIGHT_HUMILIATION, HEAVY_HUMILIATION, SUBMITTING, DOMINATING, HUMILIATING, BIG_DICKS, BIG_BREASTS, BREAST_PLAY, IMPREGNATION, SEX_WITH_STRANGERS, PUSSY_JUICE_TASTING (if she is not attracted to women, will mean she will taste her own), ANAL_SEX (She will be excited by it. If not properly trained, it will painful and hard and she may not cum - still turned on by it. If trained, she will cum. If embarassed by it, she will resist, although clearly exicted.), FETISH_SEX (including cosplay and role-play), SEX_TOYS, MONEY (turned on by thinking how much she will get / how much she is worth), INCESTUAL_EXPOSURE, INCESTUAL_SEX, SEMEN_TASTING, SEMEN_COVERING (in degrees: belly/back/stomach; breasts/buttocks; face), SEMEN_SWALLOWING, ASS_TO_MOUTH, CREAMPIES, CUCKOLDING, BEING_CUCKOLDED
    self.sex_acts_turn_ons = []
    # Common Packages:
    ## Daddy complex: "OLDER_PARTNERS", "PROTECTIVE_PARTNERS" or "DOMINATING_PARTNERS", "CONFIDENT_PARTNERS"
    self.partner_sexual_turn_on = [] # See "Partner Traits"
    return


def turnOffs():
            # During Sex Turn-Offs: WITNESSED_MASTURBATION, SEX_TOYS, AFFECTIONATE_SERVICE_SEX (non-intercourse sex, such as handjobs, blowjobs, etc.), ANAL_SEX, PAID_SEX, LIGHT_HUMILIATION (starting with name calling ("whore")), HEAVY_HUMILIATION, INCESTUAL_EXPOSURE, SEMEN (in a condom only, never touching skin), SEMEN_TASTING, PUSSY_JUICE_TASTING, SEMEN_COVERING (in degrees: belly/back/stomach; breasts/buttocks; face), SEMEN_SWALLOWING, PAIN, CUNNILINGUS, SUBMISSION, DOMINATION, ASS_TO_MOUTH
    return

def conclusions(self, interactor, circumstances):
    
    # Scenario 1:
    # He is an adult male and he meets and beautiful woman, she is a blonde and he has a thing for blondes. She has big boobs and he has a thing for big boobs.
    # He is confident and daring, he should approach the woman.
    #
    self.attractionToWomen = 10 # Base attraction to gender.
    interactor = renpy.store.object
    interactor.libidoElements = {}
    libidoElements[LibidoElements.CONVENTIONALLY_ATTRACTIVE] = LibidoElements(kind = LibidoElements.CONVENTIONALLY_ATTRACTIVE, LimitedModifier(10, 0, 10), LimitedModifier(10, 0, 10))
    libidoElements[LibidoElements.BLOND] = LibidoElements(kind = LibidoElements.BLOND, LimitedModifier(10, 0, 20), LimitedModifier(10, 0, 20))
    libidoElements[LibidoElements.LARGE_BREASTS] = LibidoElements(kind = LibidoElements.LARGE_BREASTS, LimitedModifier(10, 0, 20), LimitedModifier(10, 0, 20))
    modifierToMaxHorny = 0
    if self.isAttractedToWomen:
        # She being a woman and him feeling attracted to women triggers a check to horny and to desire.
        desire = self.checkDesire(self.attractionToWomen, interactor) # Desire, here, should be 
        horny = self.checkHorny(libido, desire, modifierToMaxHorny)
    # His libido is 10; average for an adult.
    # She being beautiful increases his desire.
    
    # Scenario 2:
    # He is a horny teenager and he meets a hot cheerleader and he has a thing for cheerleaders, she is a blonde and he has a thing for blondes. She has big boobs and he has a thing for big boobs.
    # He should feel very horny and an urge to go masturbate, but it shouldn't be uncontrollable.
    
    # Scenario 3:
    # He is an adult male and he meets a hot nurse. She is attractive, but not smoking hot. He has a thing for nurses.
    # He should feel attracted to her, but he would not approach her if he had other considerations at the time.
    
    # Scenario 4:
    # He is a horny teenager. He hasn't climaxed in several days. He meets a hot brunette, with big boobs in a bikini. He has a thing for brunettes. He has a thing for big boobs. She is in a bikini.
    # He should squirm in place and be desperate to find a place to jerk off in peace.
    return









def stimulated():
            # STIMULATED:
            ##  This indicates how close the character is to an orgasm (see Climax Threshold).
            ##  - When sex starts, Horny is added to this value.
            ##  - The value reached when the character actually *crosses into* their orgasm indicates orgasm potency (which may exceed Climax Threshold).
            ##  - This assumes a character starts sex with Horny=3 and gets 3 points of stimulus before climaxing.
            ##  Stimulated 1+: She is aware of erotic stimulation (physical or mental). / He is aware of erotic stimulation (physical or mental).
            ##  Stimulated 2+: She feels a little moist. / He is unfolding.
            ##  Stimulated 3+: She is flushed and her nipples ar hard. / Half-erection. He often adjusts his junk.
            ##  Stimulated 4+: Her nether lips are partially open and glistening wet. She unconsciously brushes her nipples or her crotch. / Erection. He sometimes makes a little grunt and pulls on his trousers to accommodate his penis.
            ##  Stimulated 5+: Her nether lips are partially open and glistening wet. Her panties get a wet spot. She masturbates if left alone; also, she finds some arousal with any stimulus to her breasts (or some secondary erogenous area; she may suck on a finger, for instance). / He has serious trouble concentrating and will masturbate at the first occasion. He will grunt at any contact with his erogenous zones, instinctively humping any contact.
            ##  Stimulated 6+: She is wet enough to leak. Any sex act will further stimulate her. She gets wet when giving blowjobs. / Some pre-cum starts leaking. He may have a premature ejaculation.
            ##  Stimulated 7+: She humps stuff is prevented from masturbating; also, she plays with her asshole when masturbating (or some third erogenous area; she may give herself pain (breast pinching, pussy slapping, etc.), for instance). / He is desperate for stimulus and a climax. He humps the air if prevented from touching himself. Leaks pre-cum continuously. Secondary erogenous zones (like nipples) may cause a climax if over-stimulated.
            ##  Stimulated 8+: She craves sexual stimulus and will attempt to flee a scene to masturbate - if prevented from doing it, she may admit her craving. / Any sexual stimulus will cause a near immediate climax.
            ##  Stimulated 9+: She is driven crazy by need and will beg for a chance of release. / He will do anything to get release. He is long past begging.
            ##  Stimulated 10+: She can cum from almost any kind of stimulus (no need to touch pussy and; anal, humiliating words, breast stimulus, tasting cum...). / Unbearable. A creature of sex. Cannot think or do anything outside seeking release.
            self.stimulated = 0
    return

def sexTurnOns():
    return

def sexTurnOffs():
    return


                ## Willpower can decrease the reaction by 1 level.
                ## Reactions: physically ill (vomiting), psychologically scaring, physically very uncomfortable (dry heaving just after), psychologically uncomfortable (grimacing), turned off, avoids, cold, appreciates, pleasant/interesting, occasionally/frequently/continually seeks/needs.
                ## Interactions may be light sexually (kissing, groping, receiving oral) or intense sexually (performing oral, penetratitive sex). Thinking about and talking about (in private have a different level than in public).
                ## Value -5:
                #### Talking about in intensely negative terms.
                #### Thinking about is abhorrent and psychologically uncomfortable.
                #### Light interactions are physically very uncomfortable. Intense interactions are physically very uncomfortable and leave psychological scars.
                ## Value -4:
                #### Talking is psychologically uncomfortable.
                #### Thinking about is a turn off.
                #### Light interactions are physically uncomfortable.
                #### Intense interactions are physically very uncomfortable and leave psychological scars.
                ## Value -3:
                #### Talking is a turn off.
                #### Thinking about is avoided.
                #### Light interactions are psychologically uncomfortable.
                #### Intense interactions are physically very uncomfortable and leave psychological scars.
                ## Value -2:
                #### Talking about is avoided.
                #### Thinking about can be clinical and cold.
                #### Light interactions are a turn off. Intense interactions are psychologically uncomfortable.
                ## Value -1:
                #### Talking about can be clinical and cold.
                #### Thinking about can be clinical and cold.
                #### Light interactions are avoided. Intense interactions are a turn off.
                ## Value 0:
                #### Talking about can be clinical and cold.
                #### Thinking about can be clinical and cold.
                #### Light interactions are can be cold and clinical.
                #### Intense interactions are avoided.
                ## Value 1:
                #### Talking about can be clinical and cold.
                #### Thinking about is appreciated.
                #### Light interactions are appreciated with partner.
                #### Intense interactions can be clinical and cold.
                ## Value 2:
                #### Talking about is appreciated.
                #### Thinking about is considered pleasant and interesting and occasionally sought (looks for mental stimulus).
                #### Light interactions are pleasant and interesting and frequently sought with partner, occasionally sought solo.
                #### Intense interactions can be appreciated with partner.
                ## Value 3: turned on
                #### Talking about is appreciated.
                #### Thinking about is considered pleasant and interesting and frquently sought (looks for mental stimulus).
                #### Light interactions are frequently sought with partner, occasionally sought solo and occasionally sought with strangers.
                #### Intense interactions are frequently sought with partner, occasionally sought solo.
                ## Value 4: very interested
                #### Talking about is frequently sought (seeks to talk about sex) with others, but continually sought with partner (obsessed about talking about sex with partner).
                #### Thinking about is continually sought (obsessed for mental stimulus/porn).
                #### Light interactions are continually sought with partner, frequently sought solo and frequently sought with strangers.
                #### Intense interactions are continually sought with partner, frequently sought solo and occasionally sought with strangers.
                ## Value 5: obssessed
                #### Talking about is continually sought with partner and strangers (obsessed about talking about sex).
                #### Thinking about is continually sought (obsessed for mental stimulus/porn).
                #### Light interactions are continually sought with partner, continually sought solo and continually sought with strangers.
                #### Intense interactions are continually sought with partner, continually sought solo and frequently sought with strangers.






# Accept to talk to interactor
# Want to talk to interactor
# Accept to talk about sex with interactor
# Want to talk about sex with interactor
# Accept to kiss
# Want to kiss
# Accept to expose self (sensual clothing, showing skin / bikini (in bikini-appropriate context), underwear only (or bikini out of context), sexy lingerie, naked breasts, naked pussy, buck naked).
# Want to expose self.
# Accept to perform manual stimulation (handjob/fingering)
# Accept to receive manual stimulation (handjob/fingering)
# Want to perform manual stimulation (handjob/fingering)
# Want to receive manual stimulation (handjob/fingering)
### Accept to perform
### Accept to receive
### Want to perform
### Want to receive

# To determine *want*:
## Check how liberal the act seems to be.
## Check how liberal the character is.
## Check mood.
## Check level of relationship.
## Check if the interactor is stimulating (LibidoElements with Horny components associated with the interactor).
## Check if the act is a turn on (or a turn off) (LibidoElements with Horny components associated with the act).
## Check if the act WILL BE stimulating (or repulsive) (LibidoElements with Stimulating components associated with the act).
## Check circumstances (in public, with witnesses, etc.).

# To determine accept:
## Check if interactor is Begging/Requesting
## Check if interactor is Suggesting
## Check if interactor is Commanding
## Check if interactor is Acting


# - convictions
# casualness_to_sex # "ROMANTIC_SEX_ONLY", "COMMITED_SEX_ONLY", "CASUAL_SEX_OK", "PAID_SEX_OK", "CASUAL_SEX_ONLY", "PAID_SEX_ONLY"
# taboos
# addictions
# relationship.isRomantic
# sexual experience



# To determine accept Begging/Requesting: # Interactor is saying "Please, if you would, could you do X" / "I would like you to do X"
## Check *want*.
## Check empathy.
## Check satisfaction with interactor.
## Check gratitude to interactor.
## Check love for interactor.
## Check compensation (promises).

# To determine accept Suggesting: # Interactor is saying "I think it would be a good idea to do X"
## Check *want*.
## Check trust for interactor.
## Check respect for interactor.

# To determine accept Commanding: # Interactor is saying "I [command you to/demand that you] do X"
## Check *want*.
## Check trust for interactor.
## Check respect for interactor.
## Check fear of interactor.
## Check gratitude for interactor.
## Check threats (promises).
## Check compensation (promises).

# To determine Acting: # Interactor is not saying anything, just expecting the character to not resist.
## Check *want*.
## Check trust for interactor.
## Check respect for interactor.
## Check fear of interactor.
## Check gratitude for interactor.
## Check threats (promises).


# Reactions:
## Comply
## Resist

## Enthusiastically
## Reluctantly/Grudgingly

## Want
## Comply
## Resist
## Complain
## Protest
## Resist

# Angry
# Upset
# Happy
# Satisfied
# Horny
# Scarred
# Stimulated
# Disgusted
# Humiliated
# Hurt
# Underperform

# (Upsetting) Angry, Upset / Happy
# (Satisfying) Dissatisfied / Satisfied with interactor
# (Scary) Scarred / Calm
# (Tempting) Desirous / Disgusted
# (Exciting) Horny / Cold
# (Stimulating) Stimulated / Bored
# (Humiliating) Humiliated / Proud
# (Hurting) Hurt / Healthy
# (Engaging) Disinterested / Engaged
# (Embarrassing) Embarrassed / Emboldened

class ActionValues(renpy.store.object):
    """Models how an action will make a character feel."""
    def __init__(self):
        # Concerns the morality of the act.
        # Acts are "Taboo" because they are either disgusting or forbidden
        # This indicates how comfortable the character must be with the situation to consider the act. The higher the liberalValue, the greater the character must be comfortable.
        self.liberalValue = 0 # this is directly related to the "liberated" Personality trait. Modified by desire and "partner".
        self.mandatoryOrForbiddenValue = 0 # Positive for mandatory and negative for forbidden acts.
        # Concerns the physical danger of the act.
        self.healingOrHarmingValue = 0 # Negative values represent harming.
        # Concerns the effects on the characters feelings and relationships.
        self.gladdeningOrUpsettingValue = 0 # Makes happy or sad/angry. This can be negative when it is boring, uncomfortable or other.
        self.satisfyingValue = 0 # Increases or decreases satisfaction with prompter.
        self.calmingOrScarryingValue = 0
        self.temptingValue = 0 # Is a desirable element (increases Desire) or is disgusting (decreases desire).
        self.excitingValue = 0 # Increases or decreases horny (making 'cold').
        self.stimulatingValue = 0 # Increases or decreases stimulated (making bored).
        self.emboldeningOrHumiliatingValue = 0 # Increases pride or requires low pride.
        self.intimidatingOrHumblingValue = 0 # Decreases pride or requires high pride.
        self.embarrassingOrReassuringValue = 0 # Makes embarrassed or decreases embarrassment.
        self.engagingOrDisinterestingValue = 0 # Makes enthusiastic or disinterested (may underperform the act).


                stimulatingValue: SLIGHTLY_NEGATIVE
                satisfyingValue: INORDINATELY_NEGATIVE
                liberalValue: STRIKINGLY
                embarrassingValue: SLIGHTLY_NEGATIVE
                humiliating: 0,
                disgusting: SEVERELY
                forbidden: SEVERELY
