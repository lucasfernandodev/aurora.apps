import { BarOffline } from "./components/bar-offline.js";
import { CardAppSkeleton } from "./components/card-app-skeleton.js";
import { CardApp } from "./components/card-app.js";
import { MenuPopup } from "./components/menu-popup.js";
import { config } from "./config.js";
import { viewManager } from "./controllers/viewManager.js";

if ("customElements" in window) {
	customElements.define("card-app", CardApp);
	customElements.define("menu-popup", MenuPopup);
	customElements.define("bar-offline", BarOffline);
	customElements.define("card-skeleton", CardAppSkeleton);
}

if ("serviceWorker" in navigator) {
	console.log("service");
	window.addEventListener("load", () => {
		initServiceWorker();
	});
}

function initServiceWorker() {
	navigator.serviceWorker
		.register("sw.js")
		.then(() => console.log("Service worker is registered successfully"))
		.catch((error) =>
			console.error(`failed to register service worker, error: ${error}`),
		);
}

const main = async () => {
	try {
		const response = await fetch(`${config.apiURL}server-status`);
		if (response.status !== 200) {
			document.body.appendChild(new BarOffline());
			return;
		}

		const isBarOffline = document.querySelector(".bar-offline");
		isBarOffline?.parentNode.removeChild(isBarOffline);

		const viewApps = viewManager.apps();
		await viewApps.update();


		window.addEventListener("offline", () => {
			document.body.appendChild(new BarOffline());
		});

		window.addEventListener("online", () => {
			const isBarOffline = document.querySelector(".bar-offline");
			isBarOffline?.parentNode.removeChild(isBarOffline);
		});
	} catch (error) {
		document.body.appendChild(new BarOffline());
		return;
	}
};
window.addEventListener("focus", async () => await main());
main().catch(console.error);
