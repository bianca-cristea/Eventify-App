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
  

<img width="1902" height="842" alt="image" src="https://github.com/user-attachments/assets/0f4aea11-ba9b-426e-9647-04b88354c1e9" />
<img width="1920" height="841" alt="image" src="https://github.com/user-attachments/assets/3c4a0290-b9ba-4a00-a95c-98b53b138ea5" />

<img width="1906" height="830" alt="image" src="https://github.com/user-attachments/assets/aefb2450-6e5d-42d9-b237-1663845e33c8" />


<img width="649" height="750" alt="image" src="https://github.com/user-attachments/assets/1f7490ff-4871-4aac-b8e9-e0983abebac6" />


<img width="1886" height="834" alt="image" src="https://github.com/user-attachments/assets/5e7f8d7e-7e40-4fe1-82bb-7f1859cf7f16" />

<img width="1897" height="854" alt="image" src="https://github.com/user-attachments/assets/4f1f8cee-3a9b-44d2-be9b-6dacfcf909ce" />

<img width="1881" height="848" alt="image" src="https://github.com/user-attachments/assets/3b6ae271-b0da-44bf-8006-0823edf2308c" />

<img width="1882" height="856" alt="image" src="https://github.com/user-attachments/assets/90aa5bff-3fba-4c49-93b8-9d4a6fd4d178" />

<img width="1887" height="847" alt="image" src="https://github.com/user-attachments/assets/fd0a5b5b-76a2-4c24-9ae2-f984f2c8dfd3" />

<img width="1878" height="833" alt="image" src="https://github.com/user-attachments/assets/563275df-391d-4d18-9f21-eda4a1edd896" />




### Organizer

- Organizer dashboard
- Create, update and delete personal events
- Manage bookings for owned events

<img width="1891" height="843" alt="image" src="https://github.com/user-attachments/assets/9a514e89-ac93-4ea6-8c98-b19bc06f1708" />



### Staff

- Staff dashboard
- Validate tickets using QR codes
- Manual ticket validation

  <img width="1885" height="848" alt="image" src="https://github.com/user-attachments/assets/5459c2d8-a4c1-43ea-9483-0cf2a4fa82c4" />


### Admin

- Admin dashboard
- Manage events
- Manage bookings
- Manage categories
- Manage organizers
- View analytics

<img width="1871" height="841" alt="image" src="https://github.com/user-attachments/assets/c6d71796-1fff-468b-9324-c4aca312fcb1" />


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

<img width="1139" height="827" alt="image" src="https://github.com/user-attachments/assets/07fbcd08-8718-4381-bc47-95ff8bb19b7e" />
<img width="1098" height="840" alt="image" src="https://github.com/user-attachments/assets/b0470942-f08d-40cd-a2a9-f480d6c1defa" />
<img width="1095" height="849" alt="image" src="https://github.com/user-attachments/assets/258f8c35-868a-4307-8ba2-dae211fa2efa" />
<img width="1106" height="794" alt="image" src="https://github.com/user-attachments/assets/83edcf65-b4d5-44f7-8b87-f68b8b9d0c4f" />


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
## Deployment diagram
<img width="663" height="739" alt="image" src="https://github.com/user-attachments/assets/afd3b54e-4fcd-4c37-9fe5-73a9dab8fb8a" />


# Deployment

The application is deployed and publicly accessible.

- **Frontend:** https://link-netlify
- **Backend:** https://link-render

## Infrastructure

The application components are hosted on dedicated cloud services:

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MySQL hosted on Oracle Cloud Infrastructure (OCI)
- **Image Storage:** Cloudinary

## Test Accounts

### Administrator

- Username: `admin`
- Password: `adminPass`

### Staff

- Username: `staff`
- Password: `staffPass`

These accounts were created manually. Participant and organizer accounts can be created through the application registration process.

## Stripe Test Payment

The application uses Stripe in **test mode**.

Use the following test card:

- **Card Number:** `4242 4242 4242 4242` 
- **Verification Code:** `000000`
 

## Notes

- The backend is hosted on Render's free plan. After a period of inactivity, the service may take some time to wake up on the first request.


# Future Improvements


- Kubernetes support
- Advanced analytics
- Event recommendation improvements
