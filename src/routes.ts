import { GetListAppsController } from '@controllers/apps/get-list.controller';
import { GetStatusAppController } from '@controllers/apps/get-status.controller';
import { StartAppsController } from '@controllers/apps/start.controller';
import { StopAppController } from '@controllers/apps/stop.controller';
import { Router } from "express";

const getStatusAppController = new GetStatusAppController()
const listAppsController = new GetListAppsController();
const startAppController = new StartAppsController();
const stopAppController = new StopAppController();

const apiRouter = Router();

apiRouter.post("/api/:app/stop", stopAppController.handle)
apiRouter.post("/api/:app/start", startAppController.handle)
apiRouter.get("/api/:app/status", getStatusAppController.handle)
apiRouter.get("/api/apps", listAppsController.handle)

export { apiRouter }