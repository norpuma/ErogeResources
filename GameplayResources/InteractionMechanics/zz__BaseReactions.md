Default reactions to different actions

    IMPERCEPTIBLY = -10
    INSIGNIFICANTLY = 5
    MILDLY = 10
    SLIGHTLY = 20
    MODERATELY = 30
    INORDINATELY = 40
    SEVERELY = 50
    STRIKINGLY = 60
    INTENSELY = 70
    EXCEPTIONALLY = 80
    EXCESSIVELY = 90

# Everyone
### During Conversation
#### Greeting
##### Actor
> Mandatory: +30 // MODERATELY
##### Target
> Happy: +5, max = 5
> Calm: +5, max = 5
> If actor is Superior
>> Emboldened: +1, max = -20
> If actor is not Scary
>> Safe: +2, max 10
> If actor is not Very Scary
>> Scarred: -2, max 0
> Trust: +1, max 10
> If Intimacy < 5
>> Relationship: Mood: Engaged: +1, max 5
##### Witness
> If Intimacy < 5
>> Relationship: Mood: Engaged: +1, max 5
#### Compliment - Smart, Non-Sexual
##### Actor
> If target is Inferior
>> Angry: +5, max = 30
>> Prompter: Relationship: Mood: Angry: +5, max = 50
>> Prompter: Relationship: Feelings: Hatred: +5, max = 50
>> Prompter: Relationship: Feelings: Entitled: +10
>> Embarrassed: +5, max = 20
>> Humiliated: +5, max = 20
> If target is not Interesting
>> Angry: +2, max = 20
>> Embarrassed: +1, max = 10
>> Humiliated: +1, max = 10
>> Relationship: Mood: Entitled: +5
> If target is Hated
>> Angry: +10, max = 50
>> Prompter: Relationship: Mood: Angry: +10, max = 50
>> Prompter: Relationship: Feelings: Hatred: +10, max = 50
>> Prompter: Relationship: Feelings: Entitled: +10
>> Embarrassed: +5, max = 30
>> Humiliated: +5, max = 30
>> And If Sincere
>>> Relationship: Target Model: Superior: +10
> If target has Trait higher than character
>> If Trait is motive of POSITIVE pride
>>> Humbled: +10, max = 30
##### Target
> If actor is Inferior
>> Mandatory: 5 // INSIGNIFICANTLY
> If character displayed Trait that is motive of pride
>> Mandatory: 30 // MODERATELY
> If actor is Superior
>> Happy: +10, max = 30
> If Trait is motive of POSITIVE pride
>> Happy: +10, max = 20
>> Calm: +10, max = 20
>> Safe: +5, max = 20
>> If actor is Inferior
>>> Bored: +5, max = 20
>> If actor is Superior
>>> Emboldened: +5, max = 20
> If Trait is NOT motive of NEGATIVE pride
>> Happy: +5, max = 10
>> Calm: +5, max = 10
>> Safe: +5, max = 20
>> If actor is inferior:
>>> Bored: +10, max = 30
>> If actor is Superior
>>> Emboldened: +10, max = 30
> If Trait is motive of NEGATIVE pride
>> Sad: +5, max = 10
>> Angry: +5, max = 10
>> Disgusted: +5, max = 10
>> Stimulated: +5, max = 10
>> Embarrassed: +10, max = 30
>> Humiliated: +10, max = 30
>> If actor is inferior:
>>> Embarrassed: +20, max = 40
>>> Humiliated: +20, max = 40
##### Witness
#### Compliment - Smart, Sexual
##### Actor
// Not attracted, not intimate, not romantic and not committed.
> Liberal: 70
> Forbidden: 10
> If Empathy + Love > 
> Safe or Scarred

> Happy or Sad
> Calm or Angry
> Excited or Bored
> Horny or Disgusted
> Stimulated or Tired
> Engaged or Disinterested
> Emboldened or Humiliated
> Humbled or Intimidated
> Embarrassed or Reassured
> Relationship: Trust or Fear
> Relationship: Love or Hatred
> Relationship: Entitled or Indebted
> Relationship: Intimacy
> Relationship: Superior or Inferior
> Relationship: Useful or Burden

> If relationship to target is Excited or Horny Stimulated
> If Trait has effect Excited or Horny Stimulated
> If Trait has effect Bored or Disgusted or Tired
> If target Trait is greater than the character's
>> If Trait is Pride




> If target is Intimate
> Liberal: -10
> Forbidden: -10
>> If relationship to target is Romantic
> Liberal: -10
> Forbidden: -5
>> If relationship to target is Committed
> Liberal: -10
##### Target
> If witnesses are not Trusted
>> Liberal: +10
>> Forbidden: +10
##### Witness
#### Compliment - Smooth, Non-Sexual
##### Actor
##### Target
##### Witness
#### Compliment - Smooth, Sexual
##### Actor
##### Target
##### Witness
#### Compliment - Crude, Non-Sexual
##### Actor
##### Target
##### Witness
#### Compliment - Crude, Sexual
##### Actor
##### Target
##### Witness

#### Wants (without saying)
#### Asks for
#### Does
#### Likes
#### Dislikes
### During Courting
#### Wants (without saying)
#### Asks for
#### Does
#### Likes
#### Dislikes
### During Sex
#### Wants (without saying)
#### Asks for
#### Does
#### Likes
#### Dislikes
### At Home
#### Wants (without saying)
#### Asks for
#### Does
#### Likes
#### Dislikes
### At School
#### Wants (without saying)
#### Asks for
#### Does
#### Likes
#### Dislikes
### At Work
#### Wants (without saying)
#### Asks for
#### Does
#### Likes
#### Dislikes
### In Public
#### Wants (without saying)
#### Asks for
#### Does
#### Likes
#### Dislikes

# ???
- Liberal
- Daring
- Mandatory or Forbidden
- Healing or Harming
# Reactions
* OBS: By default, Mood changes also affect Relationship: Mood.
> Happy or Sad
> Calm or Angry
> Safe or Scarred
> Excited or Bored
> Horny or Disgusted
> Stimulated or Tired
> Engaged or Disinterested
> Emboldened or Humiliated
> Humbled or Intimidated
> Embarrassed or Reassured
> Relationship: Trust or Fear
> Relationship: Love or Hatred
> Relationship: Entitled or Indebted
> Relationship: Intimacy
> Relationship: Superior or Inferior
> Relationship: Useful or Burden

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
        self.calmingOrScarryingValue = 0
        self.excitingValue = 0 # Increases or decreases horny (making 'cold' or 'disgusted').
        self.stimulatingValue = 0 # Increases or decreases stimulated (making bored).
        self.emboldeningOrHumiliatingValue = 0 # Increases pride or requires low pride.
        self.humblingOrIntimidatingValue = 0 # Decreases pride or requires high pride.
        self.embarrassingOrReassuringValue = 0 # Makes embarrassed or decreases embarrassment.
        self.engagingOrDisinterestingValue = 0 # Makes enthusiastic or disinterested (may underperform the act).


// TODO: Add modifiers for specific scenarios and requirements to each of these reactions.
# Pleasantries
## Greeting
### Actor
- Mandatory: 10
### Target
- Mandatory: 10
## Compliment; Smart; Non-Sexual
### Actor
> Relationship: Entitled: 1
> Relationship: Superior: 1
### Target
> Happy: 10
> Calm: 10
> Engaged: 10
> Relationship: Trust: 2
> Relationship: Love: 1
> Relationship: Superior: 1
> Relationship: Useful: 1
## Compliment; Smart; Sexual
### Actor
- Liberal: 20
- Daring: 10
> Embarrassed: 10
> Relationship: Superior: 1
### Target
> Happy: 10
> Stimulated: 2
> Engaged: 10
> Embarrassed: 10
> Relationship: Useful: 1
## Compliment; Smooth; Non-Sexual
### Actor
> Emboldened: 2
> Relationship: Entitled: 2
### Target
> Happy: 10
> Calm: 10
> Safe: 5
> Engaged: 10
> Embarrassed: 5
> Relationship: Trust: 2
> Relationship: Love: 1
> Relationship: Indebted: 2
> Relationship: Useful: 1
## Compliment; Smooth; Sexual
### Actor
- Liberal: 20
- Daring: 10
> Relationship: Superior: 1
### Target
> Happy: 5
> Calm: 5
> Excited: 2
> Horny: 2
> Engaged: 10
> Embarrassed: 5
> Relationship: Love: 1
> Relationship: Useful: 1
## Compliment; Crude; Non-Sexual
### Actor
- Liberal: 5
- Daring: 5
- Forbidden: 5
> Scarred: 2
> Embarrassed: 5
> Relationship: Superior: 5
### Target
> Happy: 2
> Scarred: 2
> Excited: 5
> Disinterested: 5
> Embarrassed: 5
> Relationship: Inferior: 2
## Compliment; Crude; Sexual
### Actor
- Liberal: 25
- Daring: 10
- Forbidden: 10
> Scarred: 5
> Embarrassed: 10
### Target
> Happy: 5
> Calm: 2
> Scarred: 5
> Excited: 5
> Horny: 5
> Engaged: 5
> Embarrassed: 10
> Relationship: Inferior: 5
> Relationship: Useful: 5
## Gift, Minor
### Actor
> Relationship: Entitled: 5
### Target
> Happy: 5
> Calm: 10
> Engaged: 10
> Relationship: Trust: 2
> Relationship: Love: 1
> Relationship: Indebted: 5
> Relationship: Inferior: 2
> Relationship: Useful: 5
## Gift, Major
### Actor
> Relationship: Entitled: 20
### Target
> Happy: 10
> Calm: 15
> Engaged: 20
> Relationship: Trust: 2
> Relationship: Love: 2
> Relationship: Indebted: 15
> Relationship: Inferior: 5
> Relationship: Useful: 20

# Conversation
## Entertaining Conversation
### Actor
> Engaged: 2
> Emboldened: 10
### Target
> Happy or Sad
> Calm or Angry
> Safe or Scarred
> Excited or Bored
> Horny or Disgusted
> Stimulated or Tired
> Engaged or Disinterested
> Emboldened or Humiliated
> Intimidated or Humbled
> Embarrassed or Reassured
> Relationship: Trust or Fear
> Relationship: Love or Hatred
> Relationship: Entitled or Indebted
> Relationship: Intimacy
> Relationship: Superior or Inferior
> Relationship: Useful or Burden

- Reveal More about Self
- Learn More about Other

# Courting
- Suggesting/promising big dick.
- Pointing out big breasts.
- Pointing out notable butt.
- Boasting of a quality (smarts, muscles, wealth, power, influence, sexual prowess, etc).
- Offering demonstration of quality (smarts, muscles, wealth, power, influence, niceness, cruelty, confidence, humility, etc).
* Also see Exhibionism / Voyeurism

# Assume attitude/role-play.
- Take on arrogant attitude.
- Accept arrogant attitude.
- Take on inquisitive attitude.
- Accept inquisitive attitude.
- Take on devoted attitude.
- Accept devoted attitude.
- Take on dominant attitude.
- Accept dominant attitude.
- Take on submissive attitude.
- Accept submissive attitude.
- Take on innocent attitude.
- Accept innocent attitude.
- Take on slutty attitude.
- Accept slutty attitude.
- Take on teasing attitude.
- Accept teasing attitude.
- Take on pony attitude.
- Take on puppy attitude.
- Perform light humiliation (words and acts).
- Accept light humiliation (words and acts).
- Perform heavy humiliation (words and acts).
- Accept heavy humiliation (words and acts).
- Accept explicit sex talk (talking about penis, breasts, penetration, etc).
- Perform explicit sex talk (talking about penis, breasts, penetration, etc).

# Punishment
- Prepare for Punishment (known or unknown).
- Berate (words of disapproval).
- Accept beration (disapproving words).
- Impose Timeout (time looking at a wall in isolation and silence).
- Accept Timeout (time looking at a wall in isolation and silence).
- Perform Spanking (more humiliating than painful; for more intense pain, see Inflict Pain).
- Accept Spanking (more humiliating than painful; for more intense pain, see Accept Pain).
- Inflict Pain (electric shock, slap, lashing).
- Accept Pain (electric shock, slap, lashing).
- Impose Bondage (without sex elements).
- Accept Bondage (without sex elements).
- Impose Sex as punishment (rape).
- Accept Sex as punishment.
- Impose Humiliation (humiliating words, imposing humiliating clothes or demand words of self-humiliation).
- Accept Humiliation (humiliating words, accepting humiliating clothes or proferring words of self-humiliation).
- Impose Decreased Accomodations (living standard).
- Accept Decreased Accomodations (living standard).
- Impose Confinement.
- Accept Confinement.
- Deny pleasure (promised treat, promised gift, chastity, no contact with friends).
- Accept pleasure denial (promised treat, promised gift, chastity, no contact with friends).

# Resistance
- Attempt escape.
- Attempt physical attack.
- Disrespect/Offend.

### Obligations
- Perform Chore
- Study
- Standard Job Shift
- Extra Job Shift

# Assingments
- Accept taking class (class may be on cooking, on fellatio or anything else; it is the same as an assignment of similar kind).
- Accept training a skill (evaluated as assignment of similar kind).
- Cleaning.
- Cookng.
- Style.
- Work out (physical exercise/gym).
- Waiting on tables (waiter/waitress).
- Dancing.
- Massage.
- Seducing.
- Whoring (select required sex acts and evaluate as least acceptable sex acts with modifier for considering unnattractive clients).
## -- ??? other slave training (ponyplay, puppyplay...)

# Exhibionism / Voyeurism
## ??? Dressing provocatiely
## ??? Dressing slutty
- Dress Sexily
- Covered breast display
- Covered butt display
- Covered crotch display (bulge or cameltoe)
- Flash Underwear
- Undress to Lingerie
- Flash breasts
- Flash Crotch
- Flash Backside
- Undress to Nude
- Exhibitionism
- Voyeurism

# Physical Sensual Interaction
--> Careful vs. Rough
- Kiss

- Masturbate
- Suck on Own Fingers

- Accept breasts groping.
- Perform breasts groping.
- Accept butt groping.
- Perform butt groping.
- Accept crotch groping.
- Perform pussy groping.
- Perform cock groping.
- Accept Fingers/Toys to Suck
- Accept Handjob
- Accept Vaginal Fingering/Toying
- Accept Anal Fingering/Toying
- Perform Handjob
- Perform Titjob.
- Accept Titjob.
- Perform Vaginal Fingering
- Perform Anal Fingering
- Accept Fellatio
- Accept Cunnilingus
- Accept Analingus
- Perform Fellatio
- Perform Cunnilingus
- Perform Analingus
- Perform Oral Penetration
- Perform Vaginal Penetration
- Perform Anal Penetration
- Accept Vaginal Penetration
- Accept Anal Penetration

## -- scissoring (vulva-to-vulva stimulation)
## -- 69 (mutual oral stimulation)

- Taste Cum / Semen (own or another's)
- Taste Pussy Juices (own or another's)
- Ass-to-Mouth (finger/toy or cock).
- Swallow Cum
- Perform Deepthroat

# Sexual Extremes and Limitations
- Pain Infliction
- Orgasm Denial
- Chastity Device
- Pain Acceptance
- Chating on Partner
- Accept Cheating Partner
## -- worship breasts
## -- worship pussy
## -- worship ass
## -- worship dick
## -- worship feet

## Prepare to service me (massage, handjob, titjob, blowjob).
## -- massage
## -- washing
## -- handjob
## -- titjob
## -- blowjob

# During Sex
- Pampering
- Public Place
- Exhibitionism
- Witnessed Masturbation
- Breast Play
- Impregnation
* Also see Physical Sensual Interaction (cunnilingus, vaginal penetration, etc).
* Also see Humiliation.
* Also see Pain.
* Also see Attitudes.

