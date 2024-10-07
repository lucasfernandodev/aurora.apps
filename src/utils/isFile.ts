import {  stat } from 'node:fs/promises';
export const isFileExist = async (file: string): Promise<boolean> => {
  try {
    const isFile = await stat(file);
    if (isFile) return true;
    return false;
  } catch (error) {
    return false;
  }
}