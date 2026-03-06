import express from "express";
import usuarioRoutes from "./routes/usuario.route.js"
import cors from "cors";
const app = express();


app.use(express.json());
app.use(cors());

app.use("/usuarios", usuarioRoutes)
// app.use("/jogos", jogoRoutes);
// app.use("/player", playerRoutes)
// app.use("/partidas", partidasRoutes)

export default app;