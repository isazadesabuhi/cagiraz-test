const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Add your cache-control middleware here
  server.use((req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    next();
  });

  // Your other server routes and configurations

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
