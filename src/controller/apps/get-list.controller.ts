
import { readJson } from "@utils/readJson";
import { registerApps } from "@utils/register-apps";
import { localCompose } from "config";
import { v2 as compose } from "docker-compose";
import type { Request, Response } from "express";
import { appConfigScheme } from "schemes/app-config";
import { getIcon } from "service/get-icon";
import { isDockerCreated } from "service/is-docker-created";

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
      let appStatus = 'Not installed';
      let icon = undefined;

      const response = await compose.ps({
        cwd: appPaths.folder,
        commandOptions: [["--format", "json"]],
      });
      
    
      const services = response.data.services;

      if(services.length === 0){
        const isDockerOldCreatead = isDockerCreated(appName)
        if(isDockerOldCreatead){
          appStatus = 'stopped';
        }
      } else{
        appStatus = services[0].state
      }
 
      console.log(`[/list] > The app ${appName} status is '${appStatus}'.`)

      const responseData = {
        name: appName,
        status: appStatus,
      };

      // Não existe um config file
      if (!appPaths.configFile) {
        data.push(responseData);
        break;
      }

      // Existe - Tenta carregar
      const configFile = await readJson(appPaths.configFile);

      // Config file não existe ou não foi carregado
      if (!configFile) {
        data.push(responseData);
        break;
      }

      // Checa se é valido
      const config = appConfigScheme.parse(configFile)

      // Vê se o icone existe e tanta baixar
      const isIconStored = await getIcon(appName); 

      if(isIconStored){
        icon = `/icons/${appName.toLowerCase()}.png`;
      }
 
      data.push({
        ...responseData,
        url: config?.url ? config?.url : undefined,
        icon: icon,
      });
    }

    return res.json({ success: true, apps: data });
  }
}
