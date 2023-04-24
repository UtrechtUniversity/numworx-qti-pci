import { Configuration, IMSpci } from "@citolab/tspci";
import { TAOpci } from "@citolab/tspci-tao";
import * as ctx from "qtiCustomInteractionContext";
import configProps from "./config.json";
import outer from "./assets/outer.txt";
import inner from "./assets/inner.txt";
import heks  from "./assets/HeksGWT.txt";
import nabouwen from "./assets/NabouwenAanzichtenGWT.txt";
import tekenveelvlak from "./assets/TekenVeelvlakGWT.txt";
type PropTypes = typeof configProps;

class Pci implements IMSpci<PropTypes>, TAOpci {
  typeIdentifier = "numworxIMSPCIplayer";
  shadowdom: HTMLElement;
  public config: Configuration<PropTypes>;
  frame: HTMLIFrameElement;
  state: string;
  src: string;
  
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
    this.state = state||"{}";
    this.render();
    this.frame = this.shadowdom.firstElementChild.firstElementChild;
    this.frame.srcdoc = outer;
    var self = this
    this.frame.addEventListener('load', function(ev) { 
        var l = "locale="+ self.config.properties.locale;
        var i = self.src.indexOf("?s=");
 		self.frame.contentWindow.altlocation = self.src.substring(i+3);
		self.frame.contentWindow.inner = inner.replace("locale=fr", l);
        self.frame.contentWindow.frameMap = {
		 "HeksGWT.html": heks.replace("locale=fr", l),
		 "NabouwenAanzichtenGWT.html": nabouwen.replace("locale=fr", l),
		 "TekenVeelvlakGWT.html": tekenveelvlak.replace("locale=fr", l)
		}
		self.setSerializedState(JSON.parse(self.state))
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
    this.src = src;
    this.shadowdom.innerHTML = `<div class="numworxIMSPCIplayer"><iframe width='${config.width}' height='${config.height}' src='${src}'></iframe></div>`;
  };

  getResponse = () => { 
	var score = parseInt("0" + this.api().GetValue("cmi.score.raw"));
    var success = score >= 100;
    var log = this.api().GetLog();
    var response = { "success": success, "score": score, "log": log };
    var value = JSON.stringify(response);
    return {'base' : {'string' : value}};
 };

  getState = () => {
	return JSON.stringify(this.getSerializedState());	
  };

  /**
   * Restore the state of the interaction from the serializedState.
   *
   * @param {Object} serializedState - json format
   */
   setSerializedState = (state: { [x: string]: any; }) => {
   	 if (state['cmi.suspend_data'])
    	this.api().SetValue("cmi.suspend_data", state['cmi.suspend_state']);
     if (state['cmi.total_time'])
    	this.api().SetValue("cmi.total_time", state['cmi.total_time']);
     if (state['cmi.suspend_data'])
    	this.api().SetValue("cmi.location", state['cmi.location']);
   };

   /**
    * Get the current state of the interaction as a object.
    * It enables saving the state for later usage.
    *
    * @returns json format
    */
   getSerializedState = () => {
    	            return {
    	            	"cmi.suspend_data":
    	            		this.api().GetValue("cmi.suspend_data"),
    	            	"cmi.location":
    	            		this.api().GetValue("cmi.location"),
    	            	"cmi.total_time":
    	            		this.api().GetValue("cmi.total_time")
    	            }
    	        };
 


}

export default new Pci();
