Activities are template actions that the Protagonist and many NPCs will take as time progresses. These, typically update the character statistics allowing them to keep or improve some Trait.

A typical Activity is "Work out: Jogging" which will allow a character to keep or improve their Fitness trait.

## Activities must have the following:
* Identifier: This is used by other functions to check a character's current activity.
* Actor: The character taking the activity. This is used for functions that need to check or update a character.
## Activities may have the following:
* Tags: These may be used to group or categorize Activities (e.g.: The following Activities could have the "Sleeping" tag: "Sleeping", "SleepingIn", "ExhaustedSleeping", "SleepingWhileDrunk").
* Metadata: This is an untyped object that can contain extra data needed by the Activity functions.
* ConsequencesFunction: A function to be called once the Activity is performed. This will, typically, update the character's location, statistics and the calendar. Consequence functions should only be called when the duration has elapsed.



## ActivityForProtagonist may have the following:
* PreconditionsFunction: A function that must return a boolean indicating if this activity should be offered to the player. This typically checks the Protagonist's location, the location of other characters and the calendar's weekday and time.
* Event: This is an Event object (see Events.md) to be called when the Protagonist initiates the Activity.


# ActivityObservations
Observable activities allows the player to observe them.

Most NPC activities are instances of ObservableActivity, allowing the player to be aware of what a character is doing when they encounter them. This makes it seem that NPCs aren't just standing around waiting for the Protagonist to start interacting with them.

## ActivityObservations must have the following:
* ShortDescription: This is a short text to present to the player when they observe an NPC performing or engaged in the activity. This is often used to describe the NPCs condition when the player enters the area where they can be found.
* ShortDescriptionCallable: This is like ShortDescription but calls a game component to allow direct interaction (typically a passage on Twine or a label on Renpy).
## ActivityObservations may have the following:
* OstensiveObservationDescription: This is a lengthier text than ShortDescription, presented to the player when they pay additional attention to observe the NPC performing the activity. Variables can often be used to refer to the actor. This is only used when the Protagonist is not trying to conceal themselves as they observe the activity.
* OstensiveObservationDescriptionCallable: This is like OstensiveObservationDescription but calls a game component to allow direct interaction (typically a passage on Twine or a label on Renpy).
* UnseenInspectionDescription: This is a text to present to the player when they observe the NPC performing the activity when unseen, either through indirect means (e.g.: using a camera or some clarvoyance magic) or when hiding.
* UnseenInspectionDescriptionCallable: This is like UnseenInspectionDescription but calls a game component to allow direct interaction (typically a passage on Twine or a label on Renpy).
