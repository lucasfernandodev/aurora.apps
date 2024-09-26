import { CardApp } from "./components/card-app.js";
import { MenuPopup } from "./components/menu-popup.js";
import { viewManager } from "./controllers/viewManager.js";

if ('customElements' in window) {
  customElements.define('card-app', CardApp);
  customElements.define('menu-popup', MenuPopup);
}

const viewApps = viewManager.apps();

const main = async () => {
  await viewApps.update()
  window.addEventListener('focus', async () => await viewApps.update())
}

main().catch(console.error)