import "reflect-metadata";

import { globalError } from "./middlewares/globalError";

import { appServer } from "./app";

appServer.use(globalError);

appServer.listen(3333, () => {
  console.log("Server is Running");
});
