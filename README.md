## Description

- Notes App Backend API
- NestJS (typescript)
- Prisma ORM (postgresql)
- JWT Authentication
- Docker && docker-compose

### Objectives

- Allow users to create, edit, delete, and organize notes
- Support tagging of notes for easy search and retrieval

### Functionality

##### User Management

- **Sign Up:** Users can create an account to save their notes
- **Login:** Users can login to access their saved notes

##### Note Management

- **Create Notes:** Users can create new notes
- **Edit and Delete Notes:** Users can edit or delete notes
- **Tag Notes:** Users can assign tags to notes for better searchability

### Endpoints

##### User Management

- POST /auth/register (public): Register a new user
- POST /auth/login (public): Authenticate a new user
- GET /auth/loggedInUser (protected): Get the currently logged in user
- GET /auth/email-confirmation (public): Confirm users email

##### Note Management

- POST /notes (protected): Create a new note
- GET /notes (protected): List all notes
- DELETE /notes/{id} (protected): Delete a note

##### Tag Management

- POST /tags (protected): Create a new tag
- GET /tags (protected): List all tags
- DELETE /tags/{id} (protected): Delete a tag
