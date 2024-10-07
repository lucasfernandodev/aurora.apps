import { execSync } from 'node:child_process'

export const isDockerCreated = (appName: string) => {
  const dockerpsout = execSync(`docker ps -a --no-trunc --format '{"name":"{{.Names}}", "status":"{{.Status}}"}'`, { encoding: 'utf8' })
  const formatted = dockerpsout.split("\n").filter(v => v)
    .map(v => v.split(","))
    .map(arr => arr.map(v => v.split(":")[1]
      .replaceAll('"', "")
      .replaceAll("'", "")
      .split(" ")[0]
    )).map(v => v.join(":"))

  const isCreatedContainer = formatted.filter(v => v.includes(appName));
  return isCreatedContainer.length > 0
}