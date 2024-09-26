import fs from 'node:fs'
import path from 'node:path'
import { isDir } from './isDir';

type AppFilesType = Record<string, {
  folder: string,
  composeFile: string,
  configFile?: string
}>

export function registerApps(composeFolder: string) {
  const appFiles = {
    compose: 'docker-compose.yml',
    config: 'config.json'
  }

  const apps: AppFilesType = {};

  function exec(composeFolder: string) {
    const result = [] as string[];


    if (!isDir(composeFolder)) {
      console.error('Docker-compose Folder not found ', composeFolder)
      return [];
    }

    const files = fs.readdirSync(composeFolder);

    for (let i = 0; i < files.length; i++) {
      const filename = path.join(composeFolder, files[i]);

      const stat = fs.lstatSync(filename);
      
      if (stat.isDirectory()) {
        apps[files[i]] = {} as { folder: string, composeFile: string, configFile: string }
        apps[files[i]].folder = filename;
        exec(filename); //recurse
      }

      else if (filename.indexOf(appFiles.compose) >= 0) {
        const appNname = filename.split("/")[1]
        apps[appNname].composeFile = filename
        result.push(filename);
      }

      else if (filename.indexOf(appFiles.config) >= 0) { 
        const appNname = filename.split("/")[1]
        apps[appNname].configFile = filename 
      }
    }

  }

  exec(composeFolder)

  return apps;
}
