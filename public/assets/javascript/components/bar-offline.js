export class BarOffline extends HTMLElement {
	constructor() {
		super();

    this.innerHTML = `
      <div class="bar-offline">
        Você está offline ou o servidor não está funcionando
      </div>
    `
	}

	connectedCallback() {}

	disconnectedCallback() {}
}
