import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';

export class Card extends PolymerElement {

    constructor(){
        super();
    }

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

    id_check(columnId) {
        var data = this.get('data')
        console.log(data)
        console.log('project_check:');
        console.log(columnId);
        if(columnId === 1){
            return true
        }
        else{
            return false
        }
        //check if  projectID is accepted here.
        //return true or false to render or not the template.
    }

    static get template() {
        return html`

            <style>
                .card { width: 500px; border-bottom: 5px solid teal;}
            </style>

            <template is="dom-repeat" items="{{data.cards}}">
            <template is="dom-if" if="{{id_check(item.columnId)}}">
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
            </template>
        `;
    }
}
customElements.define('card-element', Card);