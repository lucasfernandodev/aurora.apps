import { appManager } from "../controllers/appManager.js";
import { MenuPopup } from "./menu-popup.js";

export class CardApp extends HTMLElement {
  name = null;
  state = null;

  contextMenuHandle = (event) => {
    event.preventDefault()
  
    
    const menu = new MenuPopup({
      appName: this.name,
      state: this.state
    });

    document.body.appendChild(menu)
    menu.style.setProperty('--mouse-x', `${event.clientX}px`)
    menu.style.setProperty('--mouse-y', `${event.clientY}px`)
    menu.style.display = 'block'
  }

  onClickHandle = async (ev)  => {
    ev.preventDefault();
    const status = ev.target.getAttribute('data-status');
    const app = ev.target.getAttribute('data-app');
    const url = ev.target.getAttribute('href');
   
    if(url === '#') return; // not web interface

    ev.target.setAttribute('data-loading', "true")
    appManager.openAppWebGui({
      appName: app,
      status,
      url
    })
    ev.target.setAttribute('data-loading', "false")
  }


  constructor({ name, status, url, icon }) { 
    super();
    this.name = name;
    this.state = status;
    this.innerHTML =
      `
      <a 
        href="${url || '#'}"
        data-web-ui="${typeof url !== 'undefined'}"
        data-app="${name}" 
        data-status="${status}" 
        class="app" 
        target="_blank"
      >
        <div class="status" title="${status}"></div>
        <div class="icon">
          <img 
            src="${icon}" 
            alt="${name}" 
            onerror="if (this.src != './assets/images/error.svg') this.src = './assets/images/error.svg';" 
          />
        </div>
        <div class="title">
          <h3>${name}</h3>
        </div>
      </a>
      `
  }

  connectedCallback() {
    this.addEventListener('contextmenu', this.contextMenuHandle)
    const link = this.querySelector('a');
    link.addEventListener('click', this.onClickHandle)
  }

  disconnectedCallback() {
    this.removeEventListener('contextmenu', this.contextMenuHandle)
    const link = this.querySelector('a');
    link.removeEventListener('click', this.onClickHandle)
  }
}