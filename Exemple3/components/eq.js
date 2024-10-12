/* create a web component with the name my-component,
that proposes to enter a keycode with button in a 3x3 matrix
*/
export class MyEQ extends HTMLElement {
  

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      
    </style>
    <!-- ici le html de l'équalizer -->
    `;
  }

  connectedCallback() {
    this.defineListeners();
    console.log("connected callback");

    
  }

  setContext(ctx) {
    this.ctx = ctx;
    //this.buildAudioGraph();
  }

  defineListeners() {
  }

  buildAudioGraph(ctx, sourceNode) {
    // on construit les 6 filtres
    this.filter1 = this.ctx.createBiquadFilter();
    this.filter2 = this.ctx.createBiquadFilter();
    this.filter3 = this.ctx.createBiquadFilter();
    this.filter4 = this.ctx.createBiquadFilter();
    this.filter5 = this.ctx.createBiquadFilter();
    this.filter6 = this.ctx.createBiquadFilter();
    // connect them in series for an eq
    sourceNode.connect(this.filter1);
    this.filter1.connect(this.filter2);
    this.filter2.connect(this.filter3);
    this.filter3.connect(this.filter4);
    this.filter4.connect(this.filter5);
    this.filter5.connect(this.filter6);

    // on definit le noeud de sortie
    this.inputNode = this.filter1;
    this.outputNode = this.filter6;
  }
}

customElements.define('my-eq', MyEQ);
