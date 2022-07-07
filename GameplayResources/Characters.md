Characters in a sandbox game are entities that seem like people (or other kinds of creatures) and that the Protagonist may, at a minimum, observe.

For minimalist characters, when a character enters a location they will see a list of who is there, just presenting the character's names.

## MinimalCharacters must have:
* Name: A simple name (or a title for very simple characters, such as "Bartender"). This allows the player to identify them in a scene.
* SpawnLocation: A Location (see Locations.md) where this character is initially instantiated. This allows the player to find them in the game world. If this is "undefined" the character will not be findable before they are moved somewhere.
## MinimalCharacters may have:
* ShortDescription: This is a short text presented to the player when the character is examined.

## BasicCharacters must EXTEND MinimalCharacter and have:
* Gender: Either 'male' or 'female'.
* AgeGroup: One of 'teenager', 'young adult', 'adult', 'mature adult' or 'old'.
## BasicCharacters may have:
* NamesPossessive: The possessive form of the character's name.

## Protagonists must have:
* Character: A MinimalCharacter or better.
## Protagonists may have:
* Daring: How daring they are. Limits the actions the character may take considering the chance of failure and the fear the action causes in them. Characters can overcome this limit with Willpower.
* Pride: How proud they are. Limits the actions the character may take considering how humiliating the action is and how much it puts them in a submissive position. Characters can overcome this limit with Willpower.
* Empathy: How empathetic they are, how much they care about others. Limits the actions may take considering how much harm the action may cause to another.



* Schedule: This is a collection of ScheduledActivity objects (see Activities.md)