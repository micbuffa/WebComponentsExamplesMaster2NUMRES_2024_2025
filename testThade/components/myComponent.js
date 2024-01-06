class MyComponent extends HTMLElement {
    constructor() {
        super();

        // create a shadow DOM
        this.attachShadow({mode:"open"});
        
    }

    // appelée quand le composant est affichée à l'écran dans la page
    // on dit qu'il est "connecté" au DOM
    connectedCallback() {
        console.log("Composant affiché");
        this.shadowRoot.innerHTML = "<h1 id='titre'>Hello</h1>"
    }
}

customElements.define("my-component", MyComponent);