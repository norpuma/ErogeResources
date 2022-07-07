Locations establish limits to POV and interactions.

Locations can contain characters (NPCs) and items, they can be examined and locked/unlocked as well as allow passage to other locations and interactions with the location itself.

# Locations

## The Root Location
All locations are placed in a hierarchy from the "root" location. The root has passages to all of its descendant locations. No passage has an automatic passage to the root, those must be explicitly described.

## Referring to Locations
Locations may be referred to in other objects. A location reference can be built using the -> operator (e.g.: $emily.home -> bedroom). In this case, the string is interpreted as a list separated by '->' and each member of the list is concatenated (elements starting with a '$' are evaluated using eval()) and concatenated before searching for it as a fully qualified identifier from root. This allows for variables and functions to be used to create a location.

## Locations must have the following:
- LocalIdentifier: This must be a one word (accepts '_') identifier used to create the name hierarchy from the root. This may be used by descendants to identify ancestor locations. It must be unique within a ancestor line.
- Name: This is often shown in a "navigation" panel. Short names should be preferred, like "Kitchen" or "Living Room".
- ParentLocation: All locations must derived from another existing passage or have "root" as their parent.
- FirstDescription: This is a text to be displayed the first time the character enters the location.
- ExaminationDescription: This is what should be described when the character examines the location. Alternatively, ExaminationDescriptionCallable may be used.
## Locations may have the following:
- Tags: A list of tags that may be used to categorize locations. e.g.: "restaurant".
- ShortDescription: This is how a location is described when the character enters it after the first time. This defaults to "name".
- ExaminationDescriptionCallable: This is a callable (Ren'Py label or Twine passage) to be used in place of ExaminationDescription. This supersedes ExaminationDescription.
- Interactions: A list of interactions the POV may take at the location.
- Passages: Passages link two locations. These are ALWAYS 1-to-1 relationships. Passages are NOT automatically created between parent and descendant locations. As a rule of thumb, descendants should create passages back to their parents with "IsBiDirectional" set to true.
- SubLocations: A list of Location objects. These receive an automatic bidirectional passage to their parent.

# Passages:
Passages link 2 locations. To the player, the passage often looks like the location itself.

Passages may be created dynamically to represent new paths, new accesses and passages newly discovered (hidden by magic or simply by ignorance that they could be taken).

Passages may also be used to represent a character discovering a location after exploration.

## Basic Locations:
Most Locations will be very simple adn will have Passages leading to and from their parent Location.
To do this, descendant Locations should declare Passages back to their parent Locations with "IsBiDirectional" set to true.

## Shunt Locations:
When a Location is locked, it may be interesting to send the POV to a shunt location instead. For instance, when a Protagonist goes to a friend's home, if the frame is not there, the Protagonist may be sent to the friend's home's porch, instead. The porch may be otherwise inaccessible, if it is not an interesting place.

## Passages must have:
- Source: This must be fully qualified name in the form of a fully qualified identifier (a hierarchical list of Locations from "root"). Passages are not bi-directionaly by default. Defaults to the Location where the passage is located if it is within one, otherwise an error is raised if this was left empty. This may be "CurrentLocation" or "ParentLocation" for ease of use.
- Destination: This must be fully qualified name in the form of a fully qualified identifier (a hierarchical list of Locations from "root"). Passages are not bi-directionaly by default. Defaults to the Location where the passage is located if it is within one, otherwise an error is raised if this was left empty. This may be "CurrentLocation" or "ParentLocation" for ease of use.
## Passages may have:
- IsBidirectional: This is used for simple passages that act the same way with the source and the destination. Default to false.
- IsLockedStatement: This is evaluated (using eval()) to determine if a character can gain access to a Destination. This often checks a character's inventory or history for the possession of a key or a different kind of access. This must return a text to be used to describe the passage when it is locked. If an empty string is returned, the passage is not shown. If false is returned, the "LOCKED" string is used instead.
- DestinationShortDescription: This is used in place of the destination Location ShortDescription. This is often used when the destination cannot be fully identified from one side of the passage. This supersedes DestinationDescriptionFunction.
- DestinationDescriptionStatement: This may be used when a rule is necessary to describe a destination. This often used to describe the destination through the eyes of different POV characters.
- LockedDescription: This is shown when the POV tries to navigate to a locked location. This is may be as simple as "The restaurant is not yet available" or "The gym is only open between 10:00 and 22:00". This supersedes LockedDescriptionCallable.
- LockedDescriptionCallable: This can be used for an interaction when a location is locked. "You find that Chris is not home. Looking at the door, you find a note. Read the note? Wait for Chris for 1 hour? Go back?"
