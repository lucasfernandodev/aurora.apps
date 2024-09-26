import { appManager } from "../controllers/appManager.js";
import { viewManager } from "../controllers/viewManager.js";

export class MenuPopup extends HTMLElement {
	appName = null;
	state = null;
	viewApps = viewManager.apps();

	onClickHandle = async (ev) => {
		const button = ev.target;
		const command = button.getAttribute("data-command");
		const cardApp = document.querySelector(`.app[data-app="${this.appName}"]`);

		// Button disabled
		if (cardApp && button.getAttribute("disabled")) return;

		// Invalid appName
		if (!this.appName || this.appName === "") return;

		cardApp.setAttribute("data-loading", "true");
		if (command === "stop") {
			await appManager.stop(this.appName);
		}

    if(command === 'start'){
      await appManager.start(this.appName)
    }

    cardApp.setAttribute("data-loading", "true");
    await this.viewApps.update();
	};

	removeSelf = () => {
		const menus = document.querySelectorAll(".popup-menu");
		for (const el of menus) {
			document.body.removeChild(el);
		}
	};

	constructor({ appName, state }) {
		super();
		this.appName = appName;
		this.state = state;
		this.innerHTML = `
    <ul>
      <li>
        <button data-command="start" ${state !== "running" ? "" : 'disabled="disabled"'}>
          Iniciar Aplicativo
        </button>
        <button data-command="stop" ${state === "running" ? "" : 'disabled="disabled"'}>
          Pausar Aplicativo
        </button>
      </li>
    </ul>
    `;
		this.classList.add("popup-menu");
		this.removeSelf();
	}

	connectedCallback() {
		const buttons = this.querySelectorAll("button");
		for (const el of buttons) {
			el.addEventListener("click", this.onClickHandle);
		}

		window.addEventListener("click", this.removeSelf);
	}

	disconnectedCallback() {
		const buttons = this.querySelectorAll("button");
		for (const el of buttons) {
			el.removeEventListener("click", this.onClickHandle);
		}

		window.removeEventListener("click", this.removeSelf);
	}
}
