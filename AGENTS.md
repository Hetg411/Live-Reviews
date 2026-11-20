# AGENTS.md

## 1. Project Overview

Build a **Live Reviews** web application where users can create, view, edit, and delete reviews. The application must support real-time updates so that changes made by one user are reflected for other users without refreshing the page.

Keep the implementation simple, clean, maintainable, and suitable for a practical coding assignment.

---

## 2. Technology Stack

### Backend
- Node.js
- Express.js
- Socket.IO for real-time communication

### Database
- MongoDB
- Maintain a separate schema/model file for reviews.

### Frontend
- HTML
- CSS
- JavaScript when functionality is required.

**Important:** Start by building the frontend UI using only HTML and CSS. Do not begin API integration or real-time functionality until the basic UI is implemented.

---

## 3. Project Structure

Keep the project organized into separate folders.

- **Database folder:** MongoDB configuration and review schema/model.
- **Backend folder:** Server files, routes, controllers, middleware, Socket.IO configuration, and backend dependencies.
- **Frontend folder:** HTML, CSS, and JavaScript files responsible for the UI and client-side functionality.

Keep frontend and backend code separate. Do not mix database logic directly into frontend files.

Follow the existing folder structure. Do not introduce unnecessary files or folders.

---

## 4. Implementation Approach

Follow this implementation order:

1. Build the basic frontend UI using HTML and CSS.
2. Ensure the UI is clean, usable, and consistent across pages.
3. Implement backend setup and MongoDB connectivity.
4. Create the review schema/model.
5. Implement REST APIs for review operations.
6. Integrate the frontend with the backend APIs.
7. Implement real-time updates using Socket.IO.
8. Test the complete application.

Do not skip ahead to later stages when an earlier stage is still incomplete.

---

## 5. Functional Requirements

### Reviews List View

The default route is `/`.

- Display a button to create a new review.
- The button should navigate to `/new/`.
- Display all reviews in a table.
- The table must contain six columns:
  - #
  - Title
  - Content
  - Date-time
  - Edit
  - Delete
- Display each review in a separate row.
- Number rows sequentially, starting from 1.
- Display the latest reviews first.
- The Edit button should navigate to `/:id`.
- The Delete button should delete the corresponding review.
- The review list must support real-time updates through Socket.IO.
- Whenever a review is added, edited, or deleted, the list should update without requiring a page refresh.

### New Review

The route is `/new/`.

- Provide one input field for the review title.
- Provide one textarea for review content.
- Provide a Save button.
- Provide a Reset button.
- Provide a Cancel button.

Expected behavior:

- Save should create a review and redirect to `/`.
- Reset should clear the title and content fields.
- Cancel should redirect to `/` without saving.

### Edit Review

The route is `/:id`.

- Reuse the same form structure and UI as the New Review page.
- Load the existing review.
- Pre-fill the title and content.
- Allow the review to be updated.
- Provide a Delete button.
- After deletion, redirect the user to `/`.

---

## 6. Backend Requirements

- Use Node.js and Express.js.
- Use MongoDB for persistent data storage.
- Maintain a separate review schema/model.
- Implement REST APIs for CRUD operations.
- Keep routes, controllers, database logic, and server configuration organized.
- Use Socket.IO for real-time communication.
- Broadcast events whenever a review is created, updated, or deleted.
- Keep API logic simple and easy to understand.
- Avoid unnecessary abstractions and complex architectural patterns.

Each review should contain:

- ID
- Title
- Content
- Created date/time

The review date/time should be generated and stored consistently.

---

## 7. Coding Standards

- Write simple, readable, and maintainable code.
- Use meaningful variable, function, and file names.
- Prefer straightforward logic over unnecessarily complex solutions.
- Avoid overly complex functions.
- Keep functions focused on a single responsibility.
- Avoid duplicate code.
- Reuse code where it makes the implementation simpler.
- Do not introduce unnecessary design patterns or abstractions.
- Do not install unnecessary third-party libraries.
- Use async/await where appropriate.
- Handle asynchronous errors properly.
- Keep code properly formatted and organized.

---

## 8. Frontend Design Rules

## 8. Frontend Design Rules

- Start with basic HTML and CSS.
- Use modern JavaScript (ES6+) whenever frontend functionality is required.
- Prefer `const` and `let`, arrow functions, template literals, destructuring, and `async/await` where appropriate.
- Do not use outdated JavaScript syntax or patterns.
- Do not use React, Vue, Angular, or any other frontend framework.
- Do not use CSS frameworks such as Bootstrap or Tailwind.
- Do not use inline styles.
- Keep the UI clean, simple, and user-friendly.
- Use basic layouts, spacing, colors, borders, and typography.
- Prioritize functionality and usability over visual complexity.
- Do not build unnecessarily complex animations, components, or layouts.
- Maintain consistent styling across the list, new review, and edit review pages.

---

## 9. Input Validation and Security

- Validate all user inputs on the backend.
- Title and content must not be empty.
- Reject invalid or malformed input.
- Do not trust frontend validation alone.
- Prevent invalid data from being stored in MongoDB.
- Use safe handling of user-provided content when displaying it in the frontend.
- Avoid exposing sensitive information in error responses.

Keep validation simple and appropriate for the scope of this assignment.

---

## 10. Error Handling

- Return appropriate HTTP status codes.
- Include a clear and meaningful message with each error response.
- Handle invalid IDs and missing reviews.
- Handle database errors.
- Handle invalid request data.
- Avoid exposing internal stack traces or sensitive server details to the client.
- Keep error handling consistent across APIs.

---

## 11. API Guidelines

- Follow REST API conventions.
- Use appropriate HTTP methods:
  - GET for retrieving data.
  - POST for creating reviews.
  - PUT or PATCH for updating reviews.
  - DELETE for deleting reviews.
- Return meaningful JSON responses.
- Use appropriate status codes for success and failure.
- Keep API endpoints consistent and easy to understand.

---

## 12. Real-Time Communication

Use Socket.IO for real-time updates.

- Broadcast an event when a review is created.
- Broadcast an event when a review is updated.
- Broadcast an event when a review is deleted.
- Ensure the frontend listens for these events.
- Update the review list dynamically when an event is received.
- Do not require the user to refresh the page to see changes.

Avoid unnecessary Socket.IO complexity. Implement only what is required for this application.

---

## 13. Agent Restrictions

The agent must not:

- Add inline CSS styles.
- Use CSS frameworks.
- Use frontend frameworks.
- Install unnecessary dependencies.
- Over-engineer the application.
- Introduce unnecessarily complex functions or logic.
- Implement bonus features before completing the required functionality.
- Change the project's technology stack without permission.
- Skip the UI-first implementation approach.
- Modify unrelated files.
- Add functionality that is outside the assignment scope without approval.

---

## 14. Priority

Always follow this priority:

1. Basic HTML/CSS UI.
2. Core CRUD functionality.
3. Backend API correctness.
4. MongoDB integration.
5. Socket.IO real-time updates.
6. Error handling and validation.
7. Testing and final cleanup.

The goal is to deliver a **working, simple, well-structured, and maintainable application**, not an unnecessarily complicated one.
