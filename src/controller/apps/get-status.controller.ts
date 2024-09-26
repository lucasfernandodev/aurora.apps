import { HTTP400Error } from "@errors/BadRequest";
import { isDir } from "@utils/isDir";
import { resolveAppFolder } from "@utils/resolve-app-folder";
import { zParse } from "@utils/zParse";
import { v2 as compose } from 'docker-compose';
import type { Request, Response } from "express";
import { getStatusScheme } from "schemes/apps/get-status";

export class GetStatusAppController {
  async handle(req: Request, res: Response) {
    const { app } = await zParse(getStatusScheme, req, "params");
    const composeFolder = resolveAppFolder(app)
    const isComposeApp = isDir(composeFolder);

    if (!isComposeApp) throw new HTTP400Error('App not found');

    try {
      const response = await compose.ps({ cwd: composeFolder, commandOptions: [["--format", "json"]] });
      const services = response.data.services
      const status = services.length === 0 ? 'stoped' : services[0].state;
      res.json({
        success: true,
        status
      })
    } catch (error) {
      console.error(`Error for stoping '${app}' with the problem -> `, error)
      res.json({ success: false })
    }
  }
}