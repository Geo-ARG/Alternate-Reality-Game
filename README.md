# Alternate-Reality-Game
A game based on React Native and Redux where you can socialize with others at certain area and certain time

## User Stories
* Game Master
    * I want to create event for public to join
    * I can create one or more quest on my event and set its reward/points
    * I can verify that users accomplish the quest
* User
    * I can login to this app using my Facebook or Google+ account
    * I want to know what this app can do at home screen so I can use this app
    * I want to get available event and its detailed information like date, location and it reward, in one view
    * I want to get available event near my current location so I can immediately join it
    * I want to get information about my achievement based of my previous event so I can brag about it
    * I want to know my current progress on event that I joined, so I can continue until finish
    * I want to know step by step quest so I can complete the event without feeling confused
    * I can find another players nearby that also participate in same event, so I can socialize and get help
    * I want to get notified when I enter the event location
    * I want to get notified when another players on certain radius around me

### Endpoints
 
| Endpoints            | HTTP   | Description                                                    |
|----------------------|--------|----------------------------------------------------------------|
| /auth/google         | POST   | Register user using googleOauth                                |
| /auth/facebook       | POST   | Register user using facebookOauth                              |
| /auth/users/:id      | GET    | Get user's data by userId                                      |
| /api/events          | GET    | Get event list sorted by time                                  |
| /api/maps            | GET    | Get event list viewed through Google Map                       |
| /api/scan            | GET    | Get list of nearby users and events                            |
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
