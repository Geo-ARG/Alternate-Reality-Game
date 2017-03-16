# Alternate-Reality-Game
To facilitate people socialize at certain area and time through something fun

### Endpoints
 
| Endpoints            | HTTP   | Description     |
|----------------------|--------|-----------------|
| /auth/google         | POST   | Register user   |
| /auth/facebook       | POST   | Register user   |
| /auth/users/:id      | GET    | GET user Data   |
| /api/events          | GET    | GET List Events |
| /api/maps            | GET    | GET map Event   |
| /api/scan            | POST   |                 |
| /api/verification    | POST   |                 |
| /api/admin/events    | GET    |                 |
| /api/admin/events    | POST   |                 |
| /api/admin/events/:id| PUT    |                 |
| /api/admin/events/:id| Delete |                 |

### Model
Users --> username, score, eventId(achievements), role
Events --> eventTitle, date, location, questId, rewards, description
Quests --> questTitle, tasks 
