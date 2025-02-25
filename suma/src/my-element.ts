import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('my-counter')
export class MyCounter extends LitElement {
  @state()
  private count: number = 0;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      padding: 1rem;
      width: 100vw;
      height: 100vh;
      background-color: #ffcc00;
      color: #333;
      text-align: center;
    }
    .counter {
      font-size: 4rem;
      margin: 1rem;
    }
    .button-container {
      display: flex;
      gap: 1rem;
    }
    button {
      padding: 1rem 2rem;
      font-size: 2rem;
      cursor: pointer;
      border: none;
      border-radius: 8px;
    }
    .increase {
      background-color: #4caf50;
      color: white;
    }
    .decrease {
      background-color: #f44336;
      color: white;
    }
  `;

  private increase() {
    this.count++;
  }

  private decrease() {
    this.count--;
  }

  render() {
    return html`
      <div class="counter">${this.count}</div>
      <div class="button-container">
        <button class="increase" @click="${this.increase}">+</button>
        <button class="decrease" @click="${this.decrease}">-</button>
      </div>
    `;
  }
}
