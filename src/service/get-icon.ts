import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises';
import type * as streamWeb from "node:stream/web";
import { isDir } from "@utils/isDir";
import { isFileExist } from '@utils/isFile';

export const getIcon = async (applicationName: string) => {
  const appNameParsed = applicationName.trim().toLocaleLowerCase()
  const encodedURL = encodeURIComponent(`${appNameParsed}-light`);
  const apiURL = 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/';

  const downloadApplicationIcon = async (url: string, directory: string) => {
    const isValidPath = isDir(directory);
    if (!isValidPath) {
      console.log('Error getIcon/DownloadApplicationIcon: ', 'invalid directory')
      return false;
    }


    const destination = path.resolve(directory, `${applicationName}.png`)

    if (await isFileExist(destination)) {
      return true;
    }


    let res = await fetch(url);

    if (res.status !== 200) {
      const encodedURL = encodeURIComponent(`${appNameParsed}`);
      const apiURL = 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/';

      const fetchNormal = await fetch(`${apiURL + encodedURL}.png`);

      if (fetchNormal.status !== 200) {
        console.log(`[get-icon] > The app ${appNameParsed} is not found.`)
        return false
      }

      res = fetchNormal;
    }

    if (res.body === null) {
      console.log(`[get-icon] > The app ${appNameParsed} is downloaded.`)
      return false
    };



    const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
    await finished(Readable.fromWeb(res.body as streamWeb.ReadableStream).pipe(fileStream));
    console.log(`[get-icon] > The app ${appNameParsed} is downloaded.`)
    return true;
  }

  const icon = await downloadApplicationIcon(`${apiURL + encodedURL}.png`, 'public/icons');
  return icon
}