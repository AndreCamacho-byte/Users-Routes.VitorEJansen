import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.route.js";
import jogoRoutes from "./routes/jogoRoute.js";
import playerRoutes from "./routes/playerRoute.js";
import partidaRoutes from "./routes/partidasRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/usuarios", usuarioRoutes);
app.use("/jogos", jogoRoutes);
app.use("/players", playerRoutes);
app.use("/partidas", partidaRoutes);

export default app;