/* create a web component with the name my-component,
that proposes to enter a keycode with button in a 3x3 matrix
*/
export class MyPlayer extends HTMLElement {
  

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      
    </style>
    <audio id="player" src="./assets/audio/CleanGuitarRiff.mp3" controls></audio>
    `;

    this.ctx = new AudioContext();
  }

  connectedCallback() {
    this.player = this.shadowRoot.querySelector('#player');

    this.defineListeners();
    console.log("connected callback");

    this.buildAudioGraph();
  }

  defineListeners() {
  }

  buildAudioGraph() {
    this.source = this.ctx.createMediaElementSource(this.player);
    this.pannerNode = this.ctx.createPanner();

    this.source.connect(this.pannerNode);
    this.pannerNode.connect(this.ctx.destination);

    this.lastNode = this.pannerNode;
  }

  connect(inputNode, outputNode) {
    // ex: inputNode est le premier d'une equalizer
    // et outputNode est le dernier d'un equalizer
    this.lastNode.connect(inputNode);
    outputNode.connect(this.ctx.destination);
    
  }

  getContext() {
    return this.ctx;
  }
}

customElements.define('my-player', MyPlayer);
