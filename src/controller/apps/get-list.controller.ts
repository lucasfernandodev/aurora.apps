import { readJson } from "@utils/readJson";
import { registerApps } from "@utils/register-apps";
import { localCompose } from "config";
import { v2 as compose } from "docker-compose";
import type { Request, Response } from "express";
import { appConfigScheme } from "schemes/app-config";

type ResponseType = {
  name: string;
  status: string;
  icon?: string;
  url?: string;
};

export class GetListAppsController {
  async handle(req: Request, res: Response) {
    const data: ResponseType[] = [];

    const apps = registerApps(localCompose);
    const keys = Object.keys(apps);

    for (const appName of keys) {
      const appPaths = apps[appName];
      const response = await compose.ps({
        cwd: appPaths.folder,
        commandOptions: [["--format", "json"]],
      });
      const services = response.data.services;
      const status = services.length === 0 ? "stoped" : services[0].state;

      const responseData = {
        name: appName,
        status,
      };

      if (!appPaths.configFile) {
        data.push(responseData);
        break;
      }

      const configFile = await readJson(appPaths.configFile);

      if (!configFile) {
        data.push(responseData);
        break;
      }

      const config = appConfigScheme.parse(configFile)

      // If icon existe, get the folder/file name;
      const isIcon = config?.icon
        ? `/assets/images/icons/${config?.icon}`
        : undefined;

      data.push({
        ...responseData,
        url: config?.url ? config?.url : undefined,
        icon: isIcon,
      });
    }

    return res.json({ success: true, apps: data });
  }
}
