# Notesverse

Notesverse is a modern, feature-rich note-taking platform that allows users to manage their notes seamlessly. With functionalities such as login/signup, adding, updating, searching, and deleting notes, it provides an intuitive and efficient user experience. Built with the latest web technologies, Notesverse offers speed, scalability, and a sleek design.

---

## Features

- **User Authentication**: Secure login and signup system.
- **Create Notes**: Add new notes to organize your ideas and tasks.
- **Update Notes**: Edit and update existing notes easily.
- **Search Notes**: Quickly find notes using the search functionality.
- **Delete Notes**: Remove notes that are no longer needed.

---

## Technologies Used

### Frontend:
- **React**: For building the user interface.
- **Vite**: A fast development environment and build tool.
- **Tailwind CSS**: For modern, responsive, and customizable styling.

### Backend:
- **Node.js**: JavaScript runtime for server-side logic.
- **Express**: A web application framework for creating APIs and handling server requests.

### Database:
- **MongoDB**: A NoSQL database for storing and managing user data and notes.

---

## Installation and Setup

### Prerequisites:
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/)

### Steps to Run Locally:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd notesverse
   ```

2. **Backend Setup**:
   Navigate to the `backendd` directory:
   ```bash
   cd backendd
   ```
   Install dependencies:
   ```bash
   npm install
   ```
   Create a `.env` file and add the following variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   JWT_SECRET=<your-jwt-secret>
   ```
   Start the server:
   ```bash
   npm start
   ```

3. **Frontend Setup**:
   Navigate to the `frontendd/notesverse` directory:
   ```bash
   cd ../frontendd/notesverse
   ```
   Install dependencies:
   ```bash
   npm install
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   - Frontend: Open [http://localhost:5173/Login](http://localhost:5173/Login) in your browser.
   - Backend: The server runs on [http://localhost:8000](http://localhost:8000).


---

## Future Enhancements

- Add rich-text editor for formatting notes.
- Implement categories and tags for better organization.
- Introduce dark mode for improved accessibility.
- Add reminders and notifications for tasks and notes.

---

## Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

