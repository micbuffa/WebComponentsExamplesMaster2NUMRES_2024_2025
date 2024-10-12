// web component LogoGenerator avec custom element <logo-generator>
export class LogoGenerator extends HTMLElement {
  constructor() {
    super();
    // on cree un shadom DOM
    this.shadowroot = this.attachShadow({ mode: 'open' });

    // on récupère l'attribut "text" de l'élément
    this.text = this.getAttribute('text');
    // on recupère l'attribut color de l'élément
    this.color = this.getAttribute('color');
  }

    connectedCallback() {
      let STYLE = `
      <style>
      h1 {
        color: ${this.color};
      }
      </style>
      `;

      let HTML = `
        <h1>${this.text}</h1>
        `
        this.shadowroot.innerHTML = `${STYLE}${HTML}`;
    }
}

// on definit le custom element <logo-generator>
customElements.define('logo-generator', LogoGenerator);