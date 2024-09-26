import { readFile, stat } from 'node:fs/promises';

const isJSON = (content: string): boolean => {
  try {
    JSON.parse(content);
    return true
  } catch (e) {
    return false;
  }
}

const isFileExist = async (file: string): Promise<boolean> => {
  try {
    const isFile = await stat(file);
    if (isFile) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export const readJson = async (path: string): Promise<Record<string, string> | null> => {
  try {
    const isFile = await isFileExist(path);
    if (!isFile) return null;

    const data = await readFile(path, 'utf-8');
    if (isJSON(data)) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error(`Error to reading ${path} file`, error)
    return null
  }
}