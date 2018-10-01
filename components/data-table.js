import {
  html,
  PolymerElement
} from '../../../node_modules/@polymer/polymer/polymer-element.js';
import DictArrUtils from '../../dat_manip/dict_array_utils.js';
import DataSelect from '../../dat_manip/data_select.js';

import '../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import './input-text-select.js';
import './input-text.js';



class DataTable extends PolymerElement {
  constructor() {
    super();
    this.da = new DictArrUtils();
    this.ds = new DataSelect();
    this.itemId = 0;

  }



  static get template() {
    return html `
    <style>
    div.optionsBox {
      max-height: 140px;
      min-width: 50px;
      overflow-y: scroll;
      z-index: 20;
      position: absolute;
      background: #fff;
      border: solid 1px #ccc;
    }

    div.optionsBox a{
      color: black;
      padding: 2px;
      text-decoration: none;
      display: block;
      border: none;
      cursor: pointer;
      text-align: left;
      white-space: normal;
      width: 100%;
      font-size:10px;
    }

    div.optionsBox a:hover{
      background-color: #cce6ff;
    }

    th{
      font-size:10px;
      text-align: left;
    }
    </style>

    <table>
      <thead>
      <tr>
      <template is="dom-repeat" items="{{headers}}" as="header">
        <th>{{header}}<br />
           <input-text title="{{header}}" on-input="input_val_changing"></input-text>
        </th>
      </template>
      </tr>
      </thead>

      <template is="dom-repeat" items="{{inputData}}" as="entry" filter="filter_from_header" mutable-data delay=0>
      <tr>
        <template is="dom-repeat" items="{{headers}}" as="key">
        <td>
         <input-text-select entry={{entry}} key={{key}} options={{get_options(key)}}></input-text-select>
         </td>
        </template>
      </template>
      </tr>

    </table>
    `;
  }

  filter_from_header(entry){

    if (this.currEntered && this.currEntered!=="" && entry[this.currHeader]){
      return entry[this.currHeader].toLowerCase().indexOf(this.currEntered.toLowerCase()) > -1;
    } else {
      return true;
    }
  }

  input_val_changing(v){
    console.log("starting input_val_changing");
    this.currEntered = v.path[0].value;
    this.currHeader = v.path[2].title;
    console.log("slicing");
    this.inputData = this.inputData.slice();
    console.log("finished slicing");
    console.log(this.entry);
  }



  get_options(key) {
    return this.options[key];
  }

  select_key(obj, key) {
    return obj[key];
  }


  static get properties() {
    return {
      inputData: {
        type: Object,
        notify: true
      },
      currEntered: {
        type: String,
        notify: true
      },
      entry:{
        notify: true
      }
    };
  }

  // Observe the name sub-property on the user object
  static get observers() {
    return [
      'handle_input_data_changed(inputData)'
    ]
  }

  handle_input_data_changed() {
    console.log("handle_input_data_changed");
    if (this.inputData) {
      this.headers = this.da.get_all_keys(this.inputData);
      this.propertiesSelect = {};
      this.propertiesSelect['only_vals'] = true;
      this.propertiesSelect['as_single_array'] = true;
      this.propertiesSelect['only_uniques'] = true;
      this.options = {};

      _.each((this.headers), header => {
        this.propertiesSelect['keys_to_select'] = _.clone(header);
        this.options[header] = this.ds.select_subset_of_keys_from_arr(this.inputData, this.propertiesSelect);
        this.options[header] = this.ds.select_subset_of_keys_from_arr(this.inputData, this.propertiesSelect);

      });


      if (_.isPlainObject(this.inputData)) {
        this.inputData = _.values(this.inputData);
      } else if (_.isArray(this.inputData)) {
        // console.log("they have a cave troll.");
      }

      // this.notifyPath('inputData');
      // this.notifySplices('inputData');
      // this.create_table(this.headers, this.inputData);
    }
  }

  create_table() {

  }
}

window.customElements.define('data-table', DataTable);
