const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

// Use CORS middleware with specified options
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));

const SB_EMBED_TOKEN = "YOUR_SB_EMBED_TOKEN"
app.get("/api/superblocks/token", async (req, res) => {
    const user = {
        email: "testuser@acme.com",
        name: "Test Embed User",
        metadata: {
            externalUserId: 12345,
            organizationId: 54321
        }
    }

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SB_EMBED_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    // NOTE: if you are using eu.superblocks.com, make sure to change it here
    fetch("https://app.superblocks.com/api/v1/public/token", options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error ("Superblocks Auth Failed");
            }
        })
        .then(token => res.json(token))
        .catch(err => {
            res.status(500).json({error: "Superblocks Auth Failed"});
        })

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
