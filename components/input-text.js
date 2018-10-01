import {
  html,
  PolymerElement
} from '../../../node_modules/@polymer/polymer/polymer-element.js';
import '../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';


/**
 * @customElement
 * @polymer
 */
class InputText extends PolymerElement {

  constructor() {
    super();
  }

  static get template() {
    return html `
      <style>
      input{
        background-color: #fff;
        border : solid 1px #000;
        width: 90px;
      }

      </style>
      <input type="text" title={{header}} lass="inputBox" />
    `;
  }

  static get properties() {
    return {
      entry: {
        type: Object,
        notify: true
      },
      header: {
        type: Object,
        notify: true
      }
    };
  }


}

window.customElements.define('input-text', InputText);
