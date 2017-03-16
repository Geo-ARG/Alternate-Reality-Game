# Alternate-Reality-Game
A game based on React Native and Redux where you can socialize with others at certain area and certain time

## User Stories
* Game Master
    * I can create an event to make the public come and interact with others and set it's rewards
    * I can create one or more quests in the event
    * I can verify whenever users accomplish the quest (or event)
* User
    * I can login to the app using my Facebook or Google+ account
    * I want to know the app features on home screen
    * I want to know the list of available events and it's detailed informations
    * I want to know the events near my current location
    * I want to get information about the list of events that I already completed
    * I want to know the list of quests in the event that I need to accomplished in order to complete the event
    * I want to know the current progress of the event that I joined, so I know how far I am until it's finished
    * I can find another players nearby who also participate in same event, so I can ask and get help from them
    * I want to get notified whenever I enter an event
    * I want to get notified whenever another players are around me

### Endpoints
 
| Endpoints            | HTTP   | Description                                                    |
|----------------------|--------|----------------------------------------------------------------|
| /auth/google         | POST   | Register user using googleOauth                                |
| /auth/facebook       | POST   | Register user using facebookOauth                              |
| /auth/users/:id      | GET    | Get user's data by userId                                      |
| /api/events          | GET    | Get event list sorted by time                                  |
| /api/scan            | GET    | Get list of nearby users                                       |
| /api/location        | POST   | Post user's location                                           |
| /api/verification    | POST   | Verificate data that submitted by user after completing a quest|
| /api/admin/events    | GET    | Show event list sorted by time for admin purpose               |
| /api/admin/events    | POST   | Create a new event                                             |
| /api/admin/events/:id| PUT    | Update an event by eventId                                     |
| /api/admin/events/:id| Delete | Delete an event by eventId                                     |

### Models
```
Users --> username, role, location, score, eventId 
Events --> eventTitle, description, date, location, rewards, questId
Quests --> questTitle, task
Locations --> latitude, longitude, userId
```
