import { createApp } from "./app.js";

const PORT = Number(process.env.PORT) || 5001;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
