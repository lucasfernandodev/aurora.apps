import { HTTP400Error } from "@errors/BadRequest";
import { isDir } from "@utils/isDir";
import { resolveAppFolder } from "@utils/resolve-app-folder";
import { zParse } from "@utils/zParse";
import { v2 as compose } from 'docker-compose';
import type { Request, Response } from "express"; 
import { stopAppScheme } from "schemes/apps/stop";

export class StopAppController {
  async handle(req: Request, res: Response) {
    const { app } = await zParse(stopAppScheme, req, 'params');
    const appFolder = resolveAppFolder(app)

    const isAppFolder = isDir(appFolder);
    if (!isAppFolder) throw new HTTP400Error('App not found');

    try {
      await compose.stop({ cwd: appFolder, log: true });
      res.json({success: true})
    } catch (err) {
      console.log('something went wrong:', err)
      res.json({success: false})
    }
  }
}