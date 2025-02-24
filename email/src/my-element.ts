import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('login-form')
export class LoginForm extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; 
      width: 100vw;
      background: linear-gradient(135deg, #6a11cb, #2575fc); 
    }
    
    form {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 320px;
      text-align: center;
    }

    h2 {
      color: #333;
      margin-bottom: 10px;
    }

    label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 14px;
      font-weight: bold;
      color: #444;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      width: 100%;
      transition: border-color 0.3s;
    }

    input:focus {
      border-color: #2575fc;
      outline: none;
    }

    .error {
      color: red;
      font-size: 12px;
      text-align: left;
      margin-top: 5px;
    }

    button {
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #2575fc;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:disabled {
      background-color: gray;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background-color: #1a5cd8;
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

  render() {
    return html`
      <form>
        <h2>Iniciar Sesión</h2>
        
        <label>
          Correo electrónico:
          <input 
            type="email" 
            @input="${this.emailVacio}" 
            @blur="${() => (this.emailTouched = true)}"
            placeholder="correo@ejemplo.com"
          />
          ${this.emailTouched && !this.emailValid 
            ? html`<p class="error">Ingrese un correo válido</p>` 
            : ''}
        </label>

        <label>
          Contraseña:
          <input 
            type="password" 
            @input="${this.passwordVacio}" 
            placeholder="Contraseña"
          />
        </label>

        <button ?disabled="${!this.emailValid || !this.password}">
          Login
        </button>
      </form>
    `;
  }
}
