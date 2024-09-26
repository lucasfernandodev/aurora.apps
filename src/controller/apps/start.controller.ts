import { HTTP400Error } from "@errors/BadRequest";
import { isDir } from "@utils/isDir";
import { resolveAppFolder } from "@utils/resolve-app-folder";
import { zParse } from "@utils/zParse";
import {v2 as compose} from 'docker-compose';
import type { Request, Response } from "express"; 
import { startAppSCheme } from "schemes/apps/start";

export class StartAppsController {
  async handle(req: Request, res: Response) {
    const { app } = await zParse(startAppSCheme, req, 'params');
    const appFolder = resolveAppFolder(app);
    const isAppFolder = isDir(appFolder);

    if(!isAppFolder) throw new HTTP400Error('App not found');

    try {
      await compose.upAll({ cwd: appFolder, log: true, })
      res.json({success: true})
    } catch (err) {
      console.log('something went wrong:', err)
      res.json({success: false})
    }
  }
}