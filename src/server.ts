/** @format */

import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // Notify the developer
  console.log(`The service has been started successfully on port ${port}!`);
  // List all routes
  app._router.stack
    .filter((r) => r.route)
    .map((r) => {
      const method = Object.keys(r.route.methods)[0];
      const path = `http://localhost:${port}${r.route.path}`;
      const formatString = "\x1b[36m%s\x1b[0m\t\x1b[33m%s\x1b[0m";
      console.log(formatString, method, path);
    });
});
