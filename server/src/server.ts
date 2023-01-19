import Fantify from "fastify";

//Importando o CORS, do fantify,depois de instalado.
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = Fantify();

//para habilitar o cors, dessa forma qualquer pode acessar a api, com o 'origin', posso definir quais os locais que pode acessar.
app.register(cors);
app.register(appRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server running!");
  });
