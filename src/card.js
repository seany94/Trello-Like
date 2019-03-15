import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';

export class Card extends PolymerElement {
  static get template() {
    return html`
    <paper-card heading="Emmental" image="http://placehold.it/350x150/FFC107/000000" alt="Emmental">
      <div class="card-content">
        Emmentaler or Emmental is a yellow, medium-hard cheese that originated in the area around Emmental, Switzerland. It is one of the cheeses of Switzerland, and is sometimes known as Swiss cheese.
      </div>
      <div class="card-actions">
        <paper-button>Share</paper-button>
        <paper-button>Explore!</paper-button>
      </div>
    </paper-card>
    `;
  }
}
customElements.define('card-element', Card);