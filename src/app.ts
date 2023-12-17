import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";


(async () => {
  main();
})();

function main() {
  // Server.start();
  // console.log({port: envs.PORT});
  // console.log({port: envs.MAILER_EMAIL});
  // console.log({port: envs.MAILER_SECRET_KEY});
  // console.log({port: envs.PROD});
}
