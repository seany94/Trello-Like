// import {PolymerElement, html} from '@polymer/polymer';
// import '@polymer/paper-card/paper-card.js';
// import '@polymer/paper-button/paper-button.js';
// import './my-app.js'
// class Card extends customElements.get('my-app') {
//     constructor(){
//         super();
//     }
//     static get properties() {
//       return {
//         cards: {
//           type: Object,
//           notify: true
//         }
//       };
//     }
//     ready() {
//       super.ready();
//       var that = this
//       axios.get(`http://localhost:3000/cards?columnId=1`)
//       .then(function (response) {
//         // handle success
//         that.set('cards', JSON.parse(response.request.responseText));
//       console.log(that.cards);
//       console.log(that.columns);
//       })
//     }
//     static get template() {
//         return html`
//             <style>
//                 .card { width: 500px; border-bottom: 5px solid teal;}
//             </style>
//             <template is="dom-repeat" items="{{cards}}">
//                 <paper-card class="card" heading="{{item.title}}">
//                   <div class="card-content">
//                     {{item.description}}
//                     Column ID: {{item.columnId}}
//                   </div>
//                   <div class="card-actions">
//                     <paper-button>Edit</paper-button>
//                     <paper-button>Delete</paper-button>
//                   </div>
//                 </paper-card>
//             </template>
//         `;
//     }
// }
// customElements.define('card-element', Card);