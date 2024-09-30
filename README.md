<img src="./docs/aurora.app-screenshot.png" alt="Aurora apps" />

<h1 align="center">Aurora.apps</h1>

Web interface to start/stop containers using docker-compose.

## Taks
- Removing alerts in front-end

### Requirements
- Node.js
- Install docker
- Install docker-compose

## Instalation

1. Clone this project
```bash
git clone https://github.com/lucasfernandodev/aurora.apps
cd aurora.apps
```

2. install node deps
```bash
pnpm install
```

3. Create a `.env` file with the two environment variables below:
```bash
PORT="3000" # Server Port
COMPOSE_FOLDER="./compose" # Specifies in which folder the apps will be located;
```

4. Inside the folder declared in the `.env` file, create a new folder with the name of your application.
Exemple:
```bash
mkdir -p ./compose/new-aplication
```

5. Inside your application's folder, add your `docker-compose.yml` file.
> Remember that the only thing the application does is start/pause the container. Do the rest manually.

<br />

6. If you want to add an icon for the application, remember to place it inside the `/public/images/icons` folder.
Create your folder and add the file there. For example: `/public/images/icons/code-server/icon.png`. To make the icon visible in your application, add a `config.json` file inside the app folder:
  ```JSON
  {
    "icon": "code-server/icon.png"
  }
  ```

7. If you want to open a web interface when clicking on the application, add your app's URL inside the `config.json` file. Example::
  ```JSON
  {
    "url": "https://code-server.aurora.apps"
  }
  ```

8. building and running the application:
```bash
pnpm run build && node ./dist/index.js
```

### Running using docker-compose

1. Build docker image:
```bash
docker-compose build
```

1. Next, running the container:
```bash
docker-compose up -d
```

- The port is exposed at address 7777


<br />
<br />

## References
- Package for docker-compose manager -> https://github.com/PDMLab/docker-compose;
- color -> https://colorffy.com/contrast-checker?colors=000000-18a861
- popup menu position -> https://mionskowski.pl/posts/positioning-a-context-menu-using-pure-css/
- Javascript custom element -> https://javascript.info/custom-elements
-https://web.dev/articles/offline-cookbook?hl=pt-br#stale-while-revalidate
https://stackoverflow.com/questions/39363959/javascript-service-worker-fetch-resource-from-cache-but-also-update-it?rq=4
https://developer.chrome.com/docs/workbox/caching-strategies-overview?hl=pt-br