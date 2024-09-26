import { env } from '../env';
export const resolveAppFolder = (app: string) => {
  const root = env.COMPOSE_FOLDER;
  const lastchar = root.substring(-1);
  if(lastchar === '/'){
    return `${root}${app}/`
  }

  return `${root}/${app}/`
}