# Savage Demo

A simple message board to practice full CRUD with Express and MongoDB.

**Live Demo:** [Live Site](https://savage-demof.onrender.com/)

---

## About

Users enter a name and a message to post it to the board. Each message can be given a thumbs up or thumbs down, which changes its vote count, and can be deleted with the trash icon. Everything is saved to MongoDB, so messages stay after a refresh.

---

## Built With

Node.js, Express, MongoDB, EJS

---

## Preview

![Savage Demo](public/demo.png)

---

## How It Works

- `server.js` connects to the `savageDemo` database and handles the routes
- `GET /` loads all messages and renders `views/index.ejs`
- `POST /messages` saves a new message
- `PUT /messages` and `PUT /down` change the vote count
- `DELETE /messages` removes a message
- `public/main.js` sends the vote and delete requests with fetch

---

## Run It Locally

```bash
git clone https://github.com/smayanja3/savage-demo.git
cd savage-demo
npm install
```

Create a `.env` file:

```
MONGO_URI=your-mongodb-connection-string
```

Then run `npm run savage` and open `http://localhost:3000`.
