# Odin Clubhouse

Odin Clubhouse is an anonymous message board inspired by 4chan-style social media. Users can read posts without knowing authorship, while authenticated users can post, comment, and like messages.

## Features

* **Secret Access:** Users must enter a secret passphrase to access the website.
* **Anonymous Browsing:** Read posts without revealing authors.
* **Authentication:** Register and log in to see authors, post messages, like, and comment.
* **CRUD Functionality:** Create, read, update, and delete posts (update and delete for posts and comments coming soon).
* **Likes & Comments:** Interact with posts through likes and comments.

> **Secret Code for Access:** `blueflowerredflag`

## Tech Stack

* Node.js
* Express
* PostgreSQL
* EJS templating
* CSS (pure, modular design)

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/your-username/odin-clubhouse.git
cd odin-clubhouse
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DB_USER=your_postgres_user
DB_PASS=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=odin_clubhouse
SECRET_CODE=blueflowerredflag
```

4. Ensure PostgreSQL is running and the specified database exists.

5. Start the server:

```bash
npm run start
```

6. Open your browser and navigate to `http://localhost:3000`.

## Contribution

Contributions are welcome! Feel free to fork, submit pull requests, or report issues. This project is open for **non-commercial usage**.

## License

This project is licensed under the MIT License.
