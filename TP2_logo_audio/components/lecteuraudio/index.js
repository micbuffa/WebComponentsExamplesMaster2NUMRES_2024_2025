// web component LogoGenerator avec custom element <logo-generator>
export class MyAudioPlayer extends HTMLElement {
    constructor() {
      super();
      // on cree un shadom DOM
      this.shadowroot = this.attachShadow({ mode: 'open' });
  
      // on récupère le fichier audio à lire
      this.src = this.getAttribute('src');

      // on recupere l'audio context
        this.audioContext = new AudioContext();
    }
  
      connectedCallback() {
        let STYLE = `
        <style>
        </style>
        `;
  
        let HTML = `
          <h1>Lecteur audio custom</h1>
          <audio id="player"  src="${this.src}" crossorigin="anonymous"></audio>
          <br>

          <button id="play">Play</button>&nbsp;
          <button id="pause" disabled>Pause</button>&nbsp;
          <button id="stop" disabled>Stop</button>
          <br>
          <!-- slider pour le volume -->
            <input type="range" id="volume" min="0" max="2" 
                    step="0.01" value="1">

           <!-- progress pour la lecture -->
            <progress id="progress" value="0" max="100"></progress>

            <!-- slider pour la stereo -->
            <input type="range" id="stereo" min="-1" max="1" 
                    step="0.01" value="0">
          `;

          this.shadowroot.innerHTML = `${STYLE}${HTML}`;

          // on définit les différents écouteurs d'événements
          this.defineListeners();

          // on construit le graph audio
            this.buildAudioGraph();
      }
      
      buildAudioGraph() {
        // on recupere le lecteur audio sous forme de noeud
        let player = this.shadowroot.querySelector('#player');
        let source = this.audioContext.createMediaElementSource(player);
        // on cree un noeud pour la stereo
        this.stereoPanner = this.audioContext.createStereoPanner();

        // on connecte les noeuds
        source.connect(this.stereoPanner);
        this.stereoPanner.connect(this.audioContext.destination);
      }

      defineListeners() {
        // on récupère l'élément audio
        let player = this.shadowroot.querySelector('#player');
       
        // ecouteurs pour les boutons
        this.shadowroot.querySelector('#play').addEventListener('click', () => {
          player.play();
          // on resume l'audio context car il est en suspendu par defaut
          this.audioContext.resume();

          // on le disable et on enable les autres
            this.shadowroot.querySelector('#play').disabled = true;
            this.shadowroot.querySelector('#pause').disabled = false;
            this.shadowroot.querySelector('#stop').disabled = false;
        });

        this.shadowroot.querySelector('#pause').addEventListener('click', () => {
          player.pause();
          // on disable pause et on enable les autres
            this.shadowroot.querySelector('#play').disabled = false;
            this.shadowroot.querySelector('#pause').disabled = true;
            this.shadowroot.querySelector('#stop').disabled = false;
        });

        this.shadowroot.querySelector('#stop').addEventListener('click', () => {
          player.pause();
          player.currentTime = 0;
          // on disable stop et pause et on enable play
            this.shadowroot.querySelector('#play').disabled = false;
            this.shadowroot.querySelector('#pause').disabled = true;
            this.shadowroot.querySelector('#stop').disabled = true;
        });

        // ecouteur pour le slider de volume
        this.shadowroot.querySelector('#volume').addEventListener('input', () => {
          player.volume = this.shadowroot.querySelector('#volume').value;
        });

        // ecouteur pour la progression de la lecture
        player.addEventListener('timeupdate', () => {
          let progress = this.shadowroot.querySelector('#progress');
          progress.value = player.currentTime / player.duration * 100;
        });

        // ecouteur pour click sur la progression et positionner la lecture
        this.shadowroot.querySelector('#progress').addEventListener('click', (event) => {
          let progress = this.shadowroot.querySelector('#progress');
          let position = event.offsetX / progress.offsetWidth;
          player.currentTime = position * player.duration;
        });

        // ecouteur sur le slider de la stereo
        this.shadowroot.querySelector('#stereo').addEventListener('input', (event) => {
            let value = this.shadowroot.querySelector('#stereo').value;
            this.stereoPanner.pan.value = value;
          });
      }

  }
  
  // on definit le custom element <logo-generator>
  customElements.define('my-audio-player', MyAudioPlayer);