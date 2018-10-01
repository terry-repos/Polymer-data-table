import {
  html,
  PolymerElement
} from '../../../node_modules/@polymer/polymer/polymer-element.js';
import '../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';


/**
 * @customElement
 * @polymer
 */
class InputTextSelect extends PolymerElement {

  constructor() {
    super();
  }


  static get template() {
    return html `
      <style>

        input{
          background-color: #fffeee;
          border : solid 1px #ccc;
        }
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
          background-color:#eee;
        }

        div.optionsBox a:hover{
          background-color: #cce6ff;
        }

      </style>
      <input type="text" value="{{get_val(entry, key)}}" on-click="show_drop_down_options"
            on-blur="hide_drop_down_options"
            on-input="input_val_changing" class="inputBox" />

      <div class="optionsBox" style="display:none;" on-mouseout="enable_blur"
        on-mouseover="disable_blur" on-blur="hide_drop_down_options">
        <template is="dom-repeat" items="{{options}}" as="option">
          <a href="#" class="optionA" on-click="set_input_value">{{option}}</a>
        </template>
      </div>

    `;
  }


  static get properties() {
    return {
      entry: {
        notify: true
      },
      key: {
        type: Object,
        notify: true
      },
      option:{
        type: Object,
        notify: true
      }
    };
  }

  static get observers() {
    return [
      'handle_input_data_changed(inputData)'
      // 'handle_entry_changed(entry)'
    ]
  }


  get_val(entry, key) {
    return entry[key];
  }


  input_val_changing(ev) {
    // this.allowBlur = false;

    let shadowDom = ev.path[1];
    let el = shadowDom.querySelector('input');
    let currEntered = el.value;
    // console.log("currEntered: ", currEntered);
    let elOptions = shadowDom.querySelectorAll('.optionA');

    elOptions.forEach((el, i) => {
      // console.log(elOptions[i].innerText, " ", elOptions[i].innerText);
      if (elOptions[i].innerText) {
        if (elOptions[i].innerText.toLowerCase().indexOf(currEntered.toLowerCase()) < 0) {
          elOptions[i].style = "display: none;"
        } else {
          elOptions[i].style = "";
        }
      }
    });
    // console.log("input_val_changing: ", currEntered);
    // console.log("this.entry: ", this.entry);

    this.entry[this.key] = currEntered;

    this.option = currEntered;
  }

  set_input_value(ev) {

    this.allowBlur = false;
    // console.log("in set input val engine. ", ev);
    // console.log("ev: ", ev);
    let shadowDom = ev.path[2];
    let selectedText = ev.model.children[1].innerHTML;
    // let tdInputEl = ev.path[4];
    // console.log("selectedText: ", selectedText);
    // console.log("tdInputEl: ", tdInputEl);
    let inputEl = shadowDom.querySelector('input');
    inputEl.value = selectedText;

    let divEl = shadowDom.querySelector('div');
    divEl.style = "display:none";
    this.entry[this.key] = selectedText;
  }

  show_drop_down_options(ev) {
    console.log("show_drop_down_options")
    let shadowDom = ev.path[1];
    let el = shadowDom.querySelector('div');
    el.style = "";
    // console.log("shadowDom: ", shadowDom);
    // console.log("el: ", el);
    this.allowBlur = true;
  }

  hide_drop_down_options(ev) {
    if (this.allowBlur){
      let shadowDom = ev.path[1];

      let divDom = shadowDom.querySelector('div');
      divDom.style = "display:none";
    } else {
      this.allowBlur = true;
    }
  }

  enable_blur() {
    this.allowBlur = true;

  }

  disable_blur(ev) {
    this.allowBlur = false;

  }
  //
  //
  // create_input_text(newId, val) {
  //
  //   let inputBox = document.createElement('input');
  //   inputBox.setAttribute('type', 'text');
  //   inputBox.setAttribute('value', val);
  //   inputBox.addEventListener('onclick', 'showDropDownOptions()');
  //   inputBox.addEventListener('onblur', 'hideDropDownOptions()');
  //
  //   return inputBox;
  //
  // }
  //
  // create_input_cont(newId) {
  //
  //   let cont = document.createElement('div');
  //   return cont;
  // }
  //
  //
  // create_input_text(newId, val, opts) {
  //
  //   this.inputContainer = create_input_text(newId, val);
  //   this.inputBox = create_input_cont(newId);
  //
  //   elSearchBarInput = document.getElementById(searchBarId);
  //   elDropDownDiv = document.getElementById(dropDownDivId);
  //   optionsArray = opts;
  //
  //   elSearchBarInput.addEventListener("input", function(e) {
  //     searchBarValueChanged(this.value);
  //   });
  //
  //   optionsArray.forEach(function(opt) {
  //     let elOption = document.createElement('a');
  //
  //     elOption.setAttribute('href', '#');
  //     elOption.setAttribute('title', opt);
  //
  //     elOption.append(document.createTextNode(opt));
  //     elOption.classList.add("hide");
  //
  //     elDropDownDiv.append(elOption);
  //
  //   });
  //   elOptions = elDropDownDiv.childNodes;
  // }




}

window.customElements.define('input-text-select', InputTextSelect);
