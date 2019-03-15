import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import "../node_modules/@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import './card.js';

class MyApp extends PolymerElement {
  constructor() {
    super();
  }

  static get template() {
    return html`
      <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
      <style>
        .col { width: 500px; }
      </style>
      <div class="layout horizontal center-center">
        <div class="col">
          Column 1
          <card-element></card-element>
        </div>
        <div class="col">
          Column 2
        </div>
      </div>
    `;
  }

}

customElements.define('my-app', MyApp);