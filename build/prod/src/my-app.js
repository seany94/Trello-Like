import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";
import "../node_modules/@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../node_modules/@polymer/paper-card/paper-card.js";
import "../node_modules/@polymer/paper-button/paper-button.js"; // import './card.js'

class MyApp extends PolymerElement {
  static get properties() {
    return {
      columns: {
        type: Object,
        notify: true
      },
      cards: {
        type: Object,
        notify: true
      }
    };
  }

  ready() {
    super.ready();
    var that = this;
    axios.get('http://localhost:3000/columns').then(function (response) {
      // handle success
      that.set('columns', JSON.parse(response.request.responseText));

      for (let i = 0; i < that.columns.length; i++) {
        axios.get(`http://localhost:3000/cards?columnId=${that.columns[i].id}`).then(function (response) {
          // handle success
          that.set('cards', JSON.parse(response.request.responseText));

          for (let j = 0; j < that.cards.length; j++) {
            var card = document.createElement('paper-card');
            card.setAttribute('class', 'card');
            card.id = that.cards[j].id;
            card.setAttribute('heading', that.cards[j].title);
            var cardCon = document.createElement('div');
            cardCon.setAttribute('class', 'card-content');
            cardCon.innerHTML = that.cards[j].description;
            card.appendChild(cardCon);
            var cardAct = document.createElement('div');
            cardAct.setAttribute('class', 'card-actions');
            card.appendChild(cardAct);
            var cardEdit = document.createElement('paper-button');
            cardEdit.innerHTML = "Edit";
            card.appendChild(cardEdit);
            var cardDel = document.createElement('paper-button');
            cardDel.innerHTML = "Delete";
            card.appendChild(cardDel);
            that.shadowRoot.querySelector(`#col-${that.columns[i].id}`).appendChild(card);
          }
        });
      }
    });
  }

  static get template() {
    return html`

            <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
            <style>
                .col { width: 500px; }
                .col-header { display: block; background-color: teal; border-style: inset; padding: 10px; text-align: center; font-size: 20px; color: white;}
                .flex-stretch-align {
                  @apply --layout-horizontal;
                  height: 120px;
                }
                .card { width: 500px; border-bottom: 5px solid teal;}
            </style>

            <div class="layout horizontal center-center flex-stretch-align">
                <div class="flex-stretch-align">
                    <template is="dom-repeat" items="{{columns}}">
                        <div class="col" id="col-{{item.id}}">
                            <div class="col-header">{{item.title}}</div>
                        </div>
                    </template>
                </div>
            </div>
        `;
  }

}

customElements.define('my-app', MyApp);

class Card extends customElements.get('my-app') {
  constructor() {
    super();
  }

  static get properties() {
    return {
      cards: {
        type: Object,
        notify: true
      }
    };
  }

  ready() {
    super.ready();
    var that = this;
    axios.get(`http://localhost:3000/cards`).then(function (response) {
      // handle success
      that.set('cards', JSON.parse(response.request.responseText));
    });
  }

  static get template() {
    return html`

            <style>
                .card { width: 500px; border-bottom: 5px solid teal;}
            </style>

            <template is="dom-repeat" items="{{cards}}">
                <paper-card class="card" heading="{{item.title}}">
                  <div class="card-content">
                    {{item.description}}
                    Column ID: {{item.columnId}}
                  </div>
                  <div class="card-actions">
                    <paper-button>Edit</paper-button>
                    <paper-button>Delete</paper-button>
                  </div>
                </paper-card>
            </template>
        `;
  }

}

customElements.define('card-element', Card);