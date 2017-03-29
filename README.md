# Alternate-Reality-Game
A game based on React Native and Redux where you can socialize with others at certain area and certain time

![Profile](https://raw.githubusercontent.com/Geo-ARG/Alternate-Reality-Game/development/src/assets/GeoArg.png)

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

## Endpoints

### Auth

| Endpoint              |  HTTP  | Description                                             |
|-----------------------|:------:|---------------------------------------------------------|
| /auth/users           |   GET  | Get all users data (including location, event and quest)|
| /auth/users/:id       |   GET  | Get user by UserId (including location, event and quest)|
| /auth/users           |  POST  | Create new user                                         |
| /auth/users/:id       |   PUT  | Update an user by UserId                                |
| /auth/users/:id       | DELETE | Delete an user by UserId                                |

### Api/Event

| Endpoint              |  HTTP  | Description                                            |
|-----------------------|:------:|--------------------------------------------------------|
| /api/events           |   GET  | Get list of events (including quest and user)          |
| /api/events/:id       |   GET  | Get event by EventId (including quest and user)        |
| /api/events           |  POST  | Create new event                                       |
| /api/events/:id       |   PUT  | Update an event by EventId                             |
| /api/events/:id       | DELETE | Delete an event by EventId                             |

### Api/Location

| Endpoint              |  HTTP  | Description                                            |
|-----------------------|:------:|--------------------------------------------------------|
| /api/locations        |   GET  | Get all locations data (including user)                |
| /api/locations/scan   |   GET  | Get user location and other players nearby             |
| /api/locations        |  POST  | Create new location                                    |
| /api/locations/:id    |   PUT  | Update a location by LocationId                        |
| /api/locations/:id    | DELETE | Delete a location by LocationId                        |

### Api/Quest

| Endpoint               |  HTTP  | Description                                            |
|------------------------|:------:|--------------------------------------------------------|
| /api/quests            |   GET  | Get all quests data                                    |
| /api/quests/:id        |   GET  | Get quest by QuestId                                   |
| /api/quests            |  POST  | Create new quest                                       |
| /api/quests/:id        |   PUT  | Update a quest by QuestId                              |
| /api/quests/:id        | DELETE | Delete a quest by QuestId                              |
| /api/quests/event/:id  | DELETE | Delete a quest by EventId                              |

### Api/UserEvent

| Endpoint                 |  HTTP  | Description                                            |
|--------------------------|:------:|--------------------------------------------------------|
| /api/userevents          |   GET  | Get all userevents data                                |
| /api/userevents/:id      |   GET  | Get userevent by UserEventId                           |
| /api/userevents          |  POST  | Create new userevent                                   |
| /api/userevents/:id      |   PUT  | Update an userevent by UserEventId                     |
| /api/userevents/:id      | DELETE | Delete an userevent by UserEventId                     |
| /api/userevents/event/:id| DELETE | Delete an userevent by EventId                         |

### Api/UserLocation

| Endpoint               |  HTTP  | Description                                            |
|------------------------|:------:|--------------------------------------------------------|
| /api/userlocations     |   GET  | Get all userlocations data                             |
| /api/userlocations/:id |   GET  | Get userlocation by UserLocationId                     |
| /api/userlocations     |  POST  | Create new userlocation                                |
| /api/userlocations/:id |   PUT  | Update an userlocation by UserLocationId               |
| /api/userlocations/:id | DELETE | Delete an userlocation by UserLocationId               |

### Admin

| Endpoint               |  HTTP  | Description                                            |
|------------------------|:------:|--------------------------------------------------------|
| /admins                |   GET  | Get list of admins                                     |
| /admins/:id            |   GET  | Get admin data by AdminId                              |
| /admins                |  POST  | Create new admin                                       |
| /admins/:id            |   PUT  | Update an admin by AdminId                             |
| /admins/:id            | DELETE | Delete an admin by AdminId                             |

## Models

![Schema](https://raw.githubusercontent.com/Geo-ARG/geo-arg-server/development/assets/ARG-Schema-Ver4.png)
