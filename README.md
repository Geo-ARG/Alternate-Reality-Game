# Alternate-Reality-Game
A game based on React Native and Redux where you can socialize with others at certain area and certain time

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
