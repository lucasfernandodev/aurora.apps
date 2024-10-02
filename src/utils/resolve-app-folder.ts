import { localCompose } from 'config';
export const resolveAppFolder = (app: string) => {
  const root = localCompose;
  const lastchar = root.substring(-1);
  if(lastchar === '/'){
    return `${root}${app}/`
  }

  return `${root}/${app}/`
}