# Blog Platform

## Introduction

The **Blog Platform** is a simple web application that allows users to manage blog posts with full **CRUD functionality**. Users can create, read, update, and delete blog posts while ensuring data persistence through a database. This application features a responsive design to enhance usability on both desktop and mobile devices.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Configuration](#configuration)
- [Optional Features](#optional-features)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Features
- **Create Blog Posts**: Users can create new blog posts by entering a title and content.
- **Read Blog Posts**: Display a list of all blog posts on the homepage, including titles and summaries. Allow viewing full content by selecting a post.
- **Update Blog Posts**: Users can edit existing posts, modifying the title or content.
- **Delete Blog Posts**: Users can delete posts, removing them from the database and UI.
- **Data Persistence**: Blog posts are stored in a database and dynamically fetched for display.
- **Responsive Design**: The application is optimized for both desktop and mobile devices.

### Optional Features
- **Timestamps**: Display creation or update timestamps for each post.
- **User Authentication**: Restrict blog post management (create, edit, delete) to authenticated users.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **HTTP Client**: Fetch API or Axios

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/hovnarek90/blog-platform.git
   cd blog-platform
   ```

2. Install dependencies for the server:
   ```bash
   cd server
   npm install
   ```

3. Install dependencies for the client (if applicable):
   ```bash
   cd client
   npm install
   ```

## Usage

### Starting the Server

1. Navigate to the root directory of the server:
   ```bash
   cd server
   ```
2. Start the server using Node.js:
   ```bash
   node app.js
   ```
3. The server will run at `http://localhost:3000` (or the configured port).

### Running the Client

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Open the `index.html` file using a live server or HTTP server:
   - **Option 1:** Use a live server extension in your code editor (e.g., Visual Studio Code).
   - **Option 2:** Use an HTTP server tool like `http-server`:
     ```bash
     npx http-server .
     ```
3. Access the client in your web browser at `http://127.0.0.1:8080` (or the address provided by your live server).

---

### Explanation:

- **`config.js`**: This file holds the real environment variables like API URLs. It can be used throughout your project.
- **`example.config.js`**: This is a template configuration file. When setting up the project for the first time, users can rename this file to `config.js` and fill it with their own values.


## File Structure

```
root/
|-- server/          # Backend code
|   |-- app.js       # Main server file
|   |-- package.json # Server dependencies
|
|-- client/          # Frontend code
|   |-- index.html   # Main HTML file
|   |-- styles.css   # Stylesheet
|   |-- script.js    # Client-side JavaScript
|
|-- README.md        # Documentation
```

## Configuration

- Ensure that the database connection string is properly configured in the server code.
- For Firebase integration, ensure you configure your Firebase project in the client-side code.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or features you want to add.

## License

This project is licensed under the MIT License. Feel free to use and modify it as per your needs.

