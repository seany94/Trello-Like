import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import "../node_modules/@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import './card.js';

class MyApp extends PolymerElement {
  static get properties() {
    return {
      data: {
        type: Object,
        notify: true
      }
    };
  }

  ready() {
    super.ready();

    this._computeData();
  }

  _computeData() {
    this._getResource({
      url: './materials/db.json',

      onLoad(e) {
        this.set('data', JSON.parse(e.target.responseText));
      }

    });
  }

  _getResource(rq) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', rq.onLoad.bind(this));
    xhr.open('GET', rq.url);
    xhr.send();
  }

  static get template() {
    return html`

            <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
                <style>
                .col { width: 500px; }
                .col-header { display: block; background-color: teal; border-style: inset; padding: 10px; text-align: center; font-size: 20px; color: white;}
            </style>

                <div class="layout horizontal">
                    <template is="dom-repeat" items="{{data.columns}}">
                        <div class="col">
                            <div class="col-header">{{item.title}}</div>
                            <card-element></card-element>
                        </div>
                    </template>
                </div>
        `;
  }

}

customElements.define('my-app', MyApp);