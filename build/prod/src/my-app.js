import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import "../node_modules/@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "../node_modules/@polymer/paper-card/paper-card.js";
import "../node_modules/@polymer/paper-button/paper-button.js";
import "../node_modules/@polymer/iron-pages/iron-pages.js";
import "../node_modules/@polymer/iron-form/iron-form.js";

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
    super.ready(); // if(this.shadowRoot.querySelector('.col') != null){
    //     console.log(this.shadowRoot.querySelectorAll('.col'))
    //     var col = this.shadowRoot.querySelectorAll('.col')
    //     for(let i = 0; i < col.length; i++){
    //         col[i].removeChild(this.shadowRoot.querySelector('paper-card'));
    //         console.log(col[i])
    //     }
    // }

    var that = this;
    this.shadowRoot.querySelector('#card-submit').addEventListener('click', function (event) {
      var cardInput = that.shadowRoot.querySelector('#cardForm').querySelectorAll('input');
      axios.get('http://localhost:3000/cards').then(function (response) {
        var cardsNum = JSON.parse(response.request.responseText);
        axios.post('http://localhost:3000/cards', {
          id: cardsNum.length + 1,
          title: cardInput[0].value,
          description: cardInput[1].value,
          columnId: cardInput[2].value
        }).then(function (response) {
          // Finding a better way to update element but set and push not working
          location.reload();
        });
      });
    });
    this.shadowRoot.querySelector('#col-submit').addEventListener('click', function (event) {
      var colInput = that.shadowRoot.querySelector('#colForm').querySelectorAll('input');
      axios.get('http://localhost:3000/columns').then(function (response) {
        var colsNum = JSON.parse(response.request.responseText);
        axios.post('http://localhost:3000/columns', {
          id: colsNum.length + 1,
          title: colInput[0].value
        }).then(function (response) {
          // Finding a better way to update element but set and push not working
          location.reload();
        });
      });
    });
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
                input {
                  width: 100%;
                  box-sizing: border-box;
                  font-size: 20px;
                }
                iron-form form input {
                  margin: 10px 0;
                }
                iron-pages {
                    width: 100%;
                    height: 350px;
                    font-size: 20px;
                    color: white;
                    text-align: center;
                    border-style: outset;
                    margin-bottom: 5px;
                }
                iron-pages div {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                iron-pages div:nth-child(1) {
                    background-color: teal;
                }
                iron-pages div:nth-child(2) {
                    background-color: teal;
                }
                [page-name=fallback] {
                  background-color: teal;
                  font-size: 20px;
                }
                .card { width: 500px; border-bottom: 5px solid teal;}
            </style>

            <dom-bind>
                <template is="dom-bind">
                    <input value="{{pageName::input}}" placeholder="Input 'card' or 'column'">
                    <iron-pages selected="[[pageName]]" attr-for-selected="page-name" fallback-selection="fallback">
                        <div page-name="column">
                            <iron-form id="colForm">
                              <form>
                                Column Form
                                <br>
                                Please fill in the form below
                                <br>
                                <br>
                                Column Title: <input type="text" title="title" placeholder="Input column title">
                                <paper-button raised id="col-submit">Submit</paper-button>
                              </form>
                            </iron-form>
                        </div>
                        <div page-name="card">
                            <iron-form id="cardForm">
                                <form>
                                    Card Form
                                    <br>
                                    Please fill in the form below
                                    <br>
                                    <br>
                                    Card Title: <input type="text" title="title" placeholder="Input card title">
                                    Card Description: <input type="text" description="desc" placeholder="Input card description">
                                    Column ID: <input type="number" columnid="coloumnid" placeholder="Input column id that exists currently else card will not appear" >
                                    <paper-button raised id="card-submit">Submit</paper-button>
                                </form>
                            </iron-form>
                        </div>
                        <div page-name="fallback">
                            Fill in the input box above if you want to add card or column and the respective form will appear
                        </div>
                    </iron-pages>
                </template>
            </dom-bind>

            <div class="container layout horizontal flex-stretch-align">
                <div class="flex-stretch-align">
                    <template is="dom-repeat" items="{{columns}}">
                        <div class="col" id="col-{{item.id}}">
                            <div class="col-header">Title: {{item.title}} ID: {{item.id}} <paper-button raised disabled id="col-edit{{item.id}}">Edit</paper-button><paper-button raised on-click="deleteCol" id="{{item.id}}">Delete</paper-button></div>
                        </div>
                    </template>
                </div>
            </div>
        `;
  } // deleteCol(event) {
  //     // console.log(event.target.getAttribute('id'), 'Ow!');
  //     axios.delete(`http://localhost:3000/columns?id=${event.target.getAttribute('id')}`, {
  //         data: { id: event.target.getAttribute('id') }
  //       })
  //       .then(response => {
  //         location.reload();
  //       });
  // }


}

customElements.define('my-app', MyApp);