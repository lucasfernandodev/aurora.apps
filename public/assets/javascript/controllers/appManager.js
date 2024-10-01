import { config } from "../config.js";

export const appManager = {
	start: async (app) => {
		const url = `${config.apiURL}${app}/start`;
		try {
			const response = await fetch(url, { method: "POST" });
			const data = await response.json();
			return data.success;
		} catch (error) {
			console.error("[appManager->start] :: ", error);
			return false;
		}
	},

	stop: async (app) => {
		const url = `${config.apiURL}${app}/stop`;
		try {
			const response = await fetch(url, { method: "POST" });
			const data = await response.json();
			return data.success;
		} catch (error) {
			console.error("[appManager->stop] :: ", error);
			return false;
		}
	},

	openAppWebGui: ({ appName, status, url }) => {
		if (status === "running") {
			window.open(url, "_blank");
			return;
		}

		alert(`The ${appName} not is running`)
	},

	list: async () => {
		
		const url = `${config.apiURL}apps`;

		try {
			const response = await fetch(url);
			const data = await response.json();
			if (data.success) return data.apps
		} catch (error) {
			console.error("[appManager->list] :: ", error);
			return null;
		} 
	},
};
