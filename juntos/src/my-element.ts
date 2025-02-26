import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() private currentScreen: 'login' | 'cards' | 'counter' = 'login';
  @state() private isLoggedIn = false;

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
    }

    .screen-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-align: center;
    }

    .screen {
      display: none;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }

    .active {
      display: flex;
    }

    login-form {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    card-slider {
      flex-grow: 1;
    }

    my-counter {
      flex-grow: 1;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.currentScreen = 'cards'; // Cuando ya está logueado, ir directamente a las imágenes.
    }
  }

  private handleLogin() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    this.currentScreen = 'cards';
  }

  private handleFinishCounter() {
    this.currentScreen = 'login'; 
  }

  private handleLogout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    this.currentScreen = 'login';
  }

  render() {
    return html`
      <div class="screen-container">
        <div class="screen ${this.currentScreen === 'login' ? 'active' : ''}">
          <login-form @login-success="${this.handleLogin}"></login-form>
        </div>

        <div class="screen ${this.currentScreen === 'cards' ? 'active' : ''}">
          <card-slider @finish="${this.handleFinishCounter}"></card-slider>
        </div>

        <div class="screen ${this.currentScreen === 'counter' ? 'active' : ''}">
          <my-counter @finish-counter="${this.handleFinishCounter}"></my-counter>
        </div>
      </div>
    `;
  }
}

@customElement('login-form')
export class LoginForm extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      background: linear-gradient(135deg, #6a11cb, #2575fc);
    }

    form {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      width: 350px;
      text-align: center;
    }

    button:disabled {
      opacity: 0.5;
    }

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    }

    .error {
      color: red;
      font-size: 12px;
      margin-top: 5px;
    }
  `;

  @state() private email = '';
  @state() private password = '';
  @state() private emailValid = false;
  @state() private emailTouched = false;

  private validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private emailVacio(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email = target.value;
    this.emailValid = this.validarEmail(this.email);
    this.emailTouched = true;
  }

  private passwordVacio(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  private login() {
    if (this.emailValid && this.password) {
      this.dispatchEvent(new CustomEvent('login-success', { bubbles: true, composed: true }));
    }
  }

  render() {
    return html`
      <form>
        <h2>Iniciar Sesión</h2>
        <label>
          Correo electrónico:
          <input type="email" @input="${this.emailVacio}" placeholder="correo@ejemplo.com" />
          ${this.emailTouched && !this.emailValid ? html`<p class="error">Ingrese un correo válido</p>` : ''}
        </label>
        <label>
          Contraseña:
          <input type="password" @input="${this.passwordVacio}" placeholder="Contraseña" />
        </label>
        <button ?disabled="${!this.emailValid || !this.password}" @click="${this.login}">Login</button>
      </form>
    `;
  }
}

@customElement('my-counter')
export class MyCounter extends LitElement {
  @state() private count = 0;

  private increase() {
    this.count++;
  }

  private decrease() {
    this.count--;
  }

  render() {
    return html`
      <div>
        <h3>Contador: ${this.count}</h3>
        <div style="display: flex; justify-content: space-around; width: 100%;">
          <button @click="${this.increase}">+</button>
          <button @click="${this.decrease}">-</button>
        </div>
      </div>
    `;
  }
}

@customElement('card-slider')
export class CardSlider extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      background-color: black;
      color: white;
    }

    .card {
      margin-bottom: 20px;
    }

    button {
      margin-top: 10px;
    }
  `;

  @state() public cards: { title: string; image: string; description: string }[] = [];
  @state() private currentIndex = 0;

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
        <div style="display: flex; justify-content: space-around; width: 100%;">
          <button @click="${this.siguiente}">Siguiente</button>
        </div>
      ` : html`<p>Cargando...</p>`}
    `;
  }
}
