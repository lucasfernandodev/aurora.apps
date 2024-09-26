import { CardApp } from "../components/card-app.js";
import { appManager } from "./appManager.js";

export const viewManager = {
	apps: () => {
		let applicationsList = null;

		const update = async () => {
			const container = document.querySelector(".container-apps");
			const appList = await appManager.list();

			if (JSON.stringify(appList) !== JSON.stringify(applicationsList)) {
				applicationsList = appList;
			} else {
				return;
			}

			if (
				applicationsList === null ||
				(applicationsList && applicationsList.length === 0)
			) {
				container.innerHTML = "<p>Nenhum aplicativo foi encontrado!</p>";
				return;
			}

			const cards = applicationsList.map((app) => {
				const props = {
					name: app.name,
					url: app.url,
					icon: app.icon,
					status: app.status.toLowerCase(),
				};
				const card = new CardApp(props);
				return card;
			});

			container.innerHTML = "";
			// biome-ignore lint/complexity/noForEach: <explanation>
			cards.forEach((card) => container.appendChild(card));
		};

		return {
			update,
		};
	},
};
