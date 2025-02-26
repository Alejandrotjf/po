import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface Card {
  title: string;
  image: string;
  description: string;
}

@customElement('card-slider')
export class CardSlider extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      background-color: black;
      color: white;
    }
    .card {
      width: 250px;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.1);
      overflow: hidden;
      text-align: center;
      background-color: #222;
      padding: 16px;
    }
    .card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .card h3 {
      margin: 8px 0;
    }
    .card p {
      font-size: 14px;
    }
    button {
      margin-top: 16px;
      padding: 8px 16px;
      border: none;
      background-color: #444;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #666;
    }
  `;

  @state()
  public cards: Card[] = [];

  @state()
  private currentIndex: number = 0;

  connectedCallback() {
    super.connectedCallback();
    this.fetchCards();
  }

  async fetchCards() {
    setTimeout(() => {
      this.cards = [
        { title: 'Masterchief 1', image: '/src/halo.jpg', description: 'halo verde' },
        { title: 'Souls', image: '/elden.jpg', description: 'El mejor juego que ha existido' },
        { title: 'Artur', image: '/red.jpg', description: 'Red dead' },
        { title: 'Gears', image: '/gears.jpg', description: '<3' },
        { title: 'R4', image: '/R.jpg', description: 'Detras de ti...' },
      ];
    }, 10000);
  }

  siguiente() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }

  render() {
    return html`
      ${this.cards.length > 0 ? html`
        <div class="card">
          <img src="${this.cards[this.currentIndex].image}" alt="${this.cards[this.currentIndex].title}" />
          <h3>${this.cards[this.currentIndex].title}</h3>
          <p>${this.cards[this.currentIndex].description}</p>
        </div>
        <button @click="${this.siguiente}">Siguiente</button>
      ` : html`<p>Cargando...</p>`}
    `;
  }
}
