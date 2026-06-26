# Travlr Getaways

## Full Stack Web Application

Travlr Getaways is a full stack travel booking web application developed as part of the CS 465 course. The project demonstrates the design and implementation of a modern web application using the **MEAN stack** (MongoDB, Express, Angular, and Node.js). It includes a customer-facing website for browsing travel packages and an administrator single-page application (SPA) for managing trip information securely.

---

## Technologies Used

- MongoDB
- Express.js
- Angular
- Node.js
- Mongoose
- Handlebars (HBS)
- Bootstrap
- TypeScript
- JSON Web Tokens (JWT)
- Git & GitHub
- Postman

---

# Module Eight Reflection

## Architecture

This project uses two different frontend architectures that serve different purposes.

The public customer-facing website was built using Express, Handlebars (HBS), HTML, CSS, and JavaScript. Pages are rendered on the server and sent to the browser whenever a user navigates to a different page. This approach works well for the public website because it is simple, reliable, and suitable for presenting travel information.

The administrator interface was built as an Angular single-page application (SPA). Instead of requesting an entirely new webpage after every interaction, Angular communicates directly with the REST API and updates only the parts of the page that change. This creates a faster and more responsive user experience, making it ideal for managing trip data.

MongoDB was selected as the backend database because it stores information as flexible JSON-like documents rather than fixed relational tables. Travel packages contain different combinations of destinations, dates, accommodations, prices, and descriptions, making MongoDB well suited for handling evolving application data. Mongoose simplified database interactions by providing schemas, validation, and object modeling.

---

## Functionality

Although JSON is derived from JavaScript object notation, it serves a different purpose. JavaScript is a programming language used to build application logic and user interaction, while JSON is a lightweight format used to exchange structured data between systems.

Throughout this project, JSON acted as the communication layer between Angular, Express, and MongoDB. API endpoints returned JSON responses that Angular consumed to display and update trip information dynamically.

Several portions of the application were refactored during development to improve maintainability and functionality. Static HTML pages were converted into reusable Handlebars templates that rendered dynamic JSON data. Later, the administrator application was refactored into reusable Angular components and services. Separating presentation, business logic, and data access reduced duplicated code, improved organization, simplified debugging, and made future enhancements easier to implement.

---

## Testing

Testing was performed throughout the development process using both the browser and Postman.

REST API endpoints were tested using the GET, POST, PUT, and DELETE HTTP methods to verify that requests correctly retrieved, created, updated, and removed trip data stored in MongoDB. Postman allowed each endpoint to be tested independently before integrating it with the Angular frontend.

After authentication was implemented, testing also included verifying security functionality. Valid administrator credentials generated JSON Web Tokens (JWTs), while unauthorized requests to protected endpoints correctly returned authentication errors. This confirmed that administrative operations could only be performed by authenticated users.

Testing both the frontend and backend independently made it much easier to isolate and resolve errors during development.

---

## Reflection

This course significantly strengthened my understanding of full stack web development by providing practical experience building a complete web application from start to finish.

Throughout the project I learned how the components of the MEAN stack work together, including Angular for the administrator SPA, Express for the backend server, MongoDB for data storage, and Node.js as the runtime environment. I also gained experience implementing MVC architecture, designing RESTful APIs, using Mongoose models and schemas, authenticating users with JWT, testing APIs with Postman, and managing source code using Git and GitHub.

Perhaps the most valuable lesson from this course was learning how individual technologies work together as a complete system rather than as separate tools. Building the Travlr Getaways application gave me confidence in designing, developing, debugging, testing, and securing a modern full stack web application.

These experiences have strengthened both my technical skills and my problem-solving abilities, making me more prepared for future software development projects and more competitive for full stack developer opportunities.

---

## Author

**Abimbola Alao**

Southern New Hampshire University

CS 465 – Full Stack Development I