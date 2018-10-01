import {html, PolymerElement} from '../../../node_modules/@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class SaveButton extends PolymerElement {
  static get template() {
    return html`
      <a href="pipeline.json" download title="save" id='savePipelineBtn'><i class="fa fa-save"></i></a>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'entry-app'
      }
    };
  }
}

window.customElements.define('save-button', SaveButton);
