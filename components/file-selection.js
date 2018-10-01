import {html, PolymerElement} from '../../../node_modules/@polymer/polymer/polymer-element.js';
import DataIO from '../../dat_manip/data_io.js';
import JsonCsvUtils from '../../dat_manip/json_csv_utils.js';

/**
 * @customElement
 * @polymer
 */
class FileSelection extends PolymerElement {
  constructor(){
    super();

  }

  static get template() {
    return html`
      <input type="file" id="inputFileElId" className="inputFileElClass"
        on-change="handle_change_input_file"></input>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'entry-app'
      },
      inputData: {
        type: Object,
        notify: true
      }
    };
  }

  handle_change_input_file(inEvent){
    // console.log(inEvent.srcElement.files);
    this.inputFile= inEvent.srcElement.files[0];
    this.parse_data( this.inputFile );

  }

  async parse_data(inFile){
    let fileReader = new FileReader();

    console.log(inFile);
    fileReader.onload = async (e) => {
      var outIndices = [];
      let outData = e.target.result;
      // console.log("outData: ", outData);
      try{
        this.inputData = JSON.parse(outData);
      } catch(err) {
        console.log(err);
        let jsonCsvUtils = new JsonCsvUtils();
        let outArray = await Promise.resolve(jsonCsvUtils.csv_data_to_array(outData));
        let outJson = await Promise.resolve(jsonCsvUtils.array_to_json(outArray));
        this.inputData = outJson;
      }
    };

    fileReader.readAsText(inFile);
  }
}

window.customElements.define('file-selection', FileSelection);
