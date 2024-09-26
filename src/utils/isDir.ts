import fs from 'node:fs'

export const isDir = (dir: string) => {
  try {
    fs.readdirSync(dir);
    return true
  } catch (error) {
    return false;
  }
}