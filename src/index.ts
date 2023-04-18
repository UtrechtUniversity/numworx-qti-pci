import { Configuration, IMSpci } from "@citolab/tspci";
import { TAOpci } from "@citolab/tspci-tao";
import * as ctx from "qtiCustomInteractionContext";
import configProps from "./config.json";
import outer from "./assets/outer.txt";
import inner from "./assets/inner.txt";
import heks  from "./assets/HeksGWT.txt";
type PropTypes = typeof configProps;

class Pci implements IMSpci<never>, TAOpci {
  typeIdentifier = "numworxIMSPCIplayer";
  shadowdom: HTMLElement;
  public config: Configuration<PropTypes>;
  frame: HTMLElement;
  state: string;
  
  constructor() {
    ctx && ctx.register(this); 
  }
  
  on: (value: any) => void;
  off: () => void;
  
  resetResponse = () => {
    // RESET RESPONSE HERE
  };
  setResponse = (response: any) => {
    // SET RESPONSE HERE, USE TO SHOW THE CORRECT ANSWER GIVEN BY THE ITEM-AUTHOR IN TAO CONSTRUCTION
  };
  
  trigger = (event: string, value: any) => {
    this.config.properties[event] = value;
    this.render();
  };

  oncompleted = () => {
    this.shadowdom.innerHTML = ''
  };


  api = () => {
     try {
    	var a =  this.frame.contentWindow.API_1484_11
       	if (a) return a;
     } catch(e) { }
       	return this;
  };

  getInstance = (dom: HTMLElement, config: Configuration<any>, state: string) => {
    config.properties = { ...configProps, ...config.properties }; // merge current props with incoming
    this.config = config;
    this.shadowdom = dom;
    this.state = state;
    this.render();
    this.frame = this.shadowdom.firstElementChild.firstElementChild;
    this.frame.srcdoc = outer;
    var self = this
    this.frame.addEventListener('load', function(ev) { 
        var i = self.config.properties.src.indexOf("?s=");
 	self.frame.contentWindow.altlocation = self.config.properties.src.substring(i+3);
	self.frame.contentWindow.inner = inner;
        self.frame.contentWindow.frameMap = { "HeksGWT.html": heks }
	self.api().SetValues(self.state)
        self.api().loading();
    } ) ;
    config.onready(this);
  };

  private resolve = (s:string) => { return "" + s; }
  private render = () => {
    var assetManager = this; // .config.assetManager;
    var config = this.config.properties;
    var src = assetManager.resolve("numworxIMSPCIplayer/runtime/assets/outer.html") + "?s=" + encodeURIComponent(config.sco) +
    				"&e=" + encodeURIComponent(config.engine) +
    				"&l=" + encodeURIComponent(config.locale) +
    				"&c=" + encodeURIComponent(config.css) +
    				"&m=" + encodeURIComponent(config.cas); 
    config.src = src;
    this.shadowdom.innerHTML = `<div class="numworxIMSPCIplayer"><iframe width='${config.width}' height='${config.height}' src='${src}'></iframe></div>`;
  };

  getResponse = () => { return null };

  getState = () => null;
}

export default new Pci();
