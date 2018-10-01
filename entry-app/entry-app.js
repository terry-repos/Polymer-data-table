// Transpile all code following this line with babel and use 'env' (aka ES6) preset.

// 'use strict';
import {html, PolymerElement} from '../../../node_modules/@polymer/polymer/polymer-element.js';
import '../components/file-selection.js';
import '../components/data-table.js';
import '../components/save-button.js';
import DataIO from '../../dat_manip/data_io.js';
import 'lodash';

class EntryApp extends PolymerElement {
  constructor(){
    super();
    console.log("this far");
    let dummyFile;
    dummyFile = "../../data/semantic-data/cellml/clancy_model_variables.json";
    dummyFile = "../../data/semantic-data/cellml/clancy_model_variables_readable.csv";

    if (!this.inputData){
      this.init_data(dummyFile);
    }
  }

  async init_data(fileAndPath){
    if (!this.inputData){
      this.io = new DataIO();
      this.inputData = await Promise.resolve(this.io.load_file(fileAndPath));
    }
  }

  static get template() {
    return html`
      <style>
        .main{
          padding: 10px;
        }

        #saveBtn{
          text-align: right;
          height: 10px;
          display: block;
          float: right;
          text-decoration: none;
          font-size: 10px;
          padding-right: 10px;

        }
      </style>
      <div class="main">
      <file-selection input-data={{inputData}}></file-selection>
      <a href="new_data_file.json" download title="save" id='saveBtn' on-click="save_btn_click">save</a>
      <br />      <br />
      <data-table input-data={{inputData}}></data-table>
      </div>
    `;
  }



  save_btn_click(ev){
    this.inputData = this.inputData.slice();
    console.log("in save btn click: ", this.inputData);
    console.log("ev: ", ev);
    let saveAsBtn = ev.path[0];
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent( JSON.stringify( this.inputData ) );
    saveAsBtn.setAttribute( 'href', dataStr );
    saveAsBtn.setAttribute( 'download', 'new_data_file.json');
  }

}

window.customElements.define('entry-app', EntryApp);
