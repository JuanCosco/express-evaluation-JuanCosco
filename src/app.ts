import express from "express";
import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

// Rutas principales
app.use("/api", routes);

// Manejo centralizado de errores
app.use(errorMiddleware);

export default app;
