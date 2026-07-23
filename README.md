# Eventify

Eventify is a full-stack Event Booking Platform that allows users to discover events, book tickets, make secure online payments, receive QR code tickets, and interact with an AI assistant for personalized event recommendations.

The application supports **four user roles**: **Participant, Organizer, Staff, and Admin**, each with specific permissions and functionalities.

---

## Features

### Authentication

- User registration
- User login
- JWT Authentication
- Role-based authorization

### Participant

- Discover available events
- Chat with an AI assistant to find suitable events
- Add tickets to the shopping cart
- Book tickets
- Pay securely with Stripe
- Receive QR code tickets
- View profile
- Change password
- Contact support through the Contact page

### Organizer

- Organizer dashboard
- Create, update and delete personal events
- Manage bookings for owned events

### Staff

- Staff dashboard
- Validate tickets using QR codes
- Manual ticket validation

### Admin

- Admin dashboard
- Manage events
- Manage bookings
- Manage categories
- Manage organizers
- View analytics

---

## Database Diagram

<p align="center">
<img width="1597" height="859" alt="Database Diagram" src="https://github.com/user-attachments/assets/4a5004dd-fb89-46f0-a137-f3236580a4c3" />
</p>

---

## Technologies

### Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL
- Stripe API
- OpenRouter API
- Swagger / OpenAPI

### Frontend

- React
- Redux
- Tailwind CSS
- Axios
- qrcode.react
- @yudiel/react-qr-scanner

### Database

- MySQL (Docker)

---

## API Documentation

Swagger UI:

<img width="1811" height="850" alt="image" src="https://github.com/user-attachments/assets/62064eb9-f9f2-4d7c-9580-81679cb7ac11" />

---

## AI Assistant

The platform includes an AI assistant integrated using the **OpenRouter API**.

Unlike a standard chatbot, the assistant answers users' questions **based only on the events stored in the application's database**.

#### How it works

1. The user asks a question, for example:

> *I want a theatre event based on Shakespeare's plays.*

2. React sends the request to the Spring Boot backend.

3. The backend retrieves the available events from the MySQL database.

4. The events are transformed into a prompt similar to:

```
Available events:
...

The user's question is:
...

Answer the user's question using only the available events.
```

5. The prompt is sent to the AI model through the OpenRouter API.

6. The AI returns a personalized response based on the available events.

---

## QR Code Ticket System

The application implements a complete QR Code ticket validation system.

- QR code generation using **qrcode.react**
- QR code scanning using **@yudiel/react-qr-scanner**
- Secure ticket validation
- Real-time backend validation
- Duplicate ticket prevention

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

## Backend

1. Open the backend project.
2. Reload Maven dependencies.
3. Configure the database.
4. Run `BackendApplication`.

## Frontend

```bash
npm install
npm run dev
```

---

# Future Improvements

 
- Mobile application
- Docker Compose deployment
- Kubernetes support
- Advanced analytics
- Event recommendation improvements
