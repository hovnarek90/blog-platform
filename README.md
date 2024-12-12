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
