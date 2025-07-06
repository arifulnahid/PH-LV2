# Book Management System 📚

Welcome to the Book Management System! This application provides a comprehensive solution for managing your book inventory, including listing, adding, editing, deleting, and tracking borrowed books.

## Features ✨

This system offers the following core functionalities:

### 1. Book List Table

A central dashboard displaying all books in a clear, tabular format.

- **Columns:** Title, Author, Genre, ISBN, Copies, Availability, and Actions.
- **Action Buttons/Icons:**
  - **Edit Book:** Opens a form pre-filled with the book's existing data. Upon submission, updates are sent via API and instantly reflected in the UI.
    - **Business Logic:** If the 'Copies' field is set to `0`, the book will automatically be marked as 'Unavailable'.
  - **Delete Book:** Triggers a confirmation dialog to prevent accidental removal before sending a delete request to the API.
  - **Borrow Book:** Initiates the book borrowing process by opening a dedicated form.

### 2. Add New Book

A dedicated interface for adding new titles to your collection.

- **Trigger:** Accessible via an "Add New Book" button in the Navbar or on the main book list page.
- **Fields:** Title, Author, Genre, ISBN, Description, Copies, Available (optional, defaults to `true`).
- **Workflow:** After successful creation, the user is redirected to the book list, and the new book appears immediately.

### 3. Borrow Book Functionality

Streamlined process for lending out books.

- **Trigger:** Activated from the "Borrow" button within the book list table.
- **Fields:** Quantity (number), Due Date (date).
- **Business Logic:**
  - The specified quantity cannot exceed the current number of available copies.
  - If the available quantity of a book reaches `0` after a borrow operation, the book is marked as 'Unavailable'.
- **Workflow:** Submission is handled via API. Upon success, a confirmation message is displayed, and the user is redirected to the Borrow Summary page.

### 4. Borrow Summary

A clear overview of all borrowed books.

- **Data Source:** Information is retrieved from an aggregated API endpoint.
- **Columns:** Book Title, ISBN, Total Quantity Borrowed.

## Landing Page Components 🖥️

The main interface of the application is designed for intuitive navigation and data display:

- **Navbar:** A simple and accessible navigation bar containing links to:
  - **All Books:** Navigates to the comprehensive book list table.
  - **Add Book:** Directs to the form for creating a new book.
  - **Borrow Summary:** Leads to the aggregated list of borrowed books.
- **Book Table/List/Grid:** The primary display area on the landing page, showcasing all books with their associated actions.
- **Footer:** A standard footer containing site information or credits.

## Page List 🗺️

The application uses the following routes (you can choose between full-page views or modals for these functionalities based on UI/UX preferences):

- `/books` – The main page, displaying a list of all books with options to view, edit, delete, and borrow.
- `/create-book` – The form interface for adding a new book to the system.
- `/books/:id` – A detailed view of a single book's information.
- `/edit-book/:id` – The interface to update an existing book’s details.
- `/borrow/:bookId` – The form to borrow a selected book, with `:bookId` being the identifier of the book to be borrowed.
- `/borrow-summary` – The page displaying an aggregated summary of all borrowed books.

---

## Getting Started 🚀

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd book-management-system
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Set up environment variables (if any, e.g., for API endpoints). You might need a `.env` file in the root directory.

### Running the Application

```bash
npm start
# or
yarn start
```
