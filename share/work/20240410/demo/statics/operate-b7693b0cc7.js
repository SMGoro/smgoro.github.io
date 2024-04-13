define("superman/components/top-right-operate/operate",["require","exports","superman/lib/extract_data","superman/lib/commonUtils"],function(require,_exports,_extract_data,_commonUtils){"use strict";Object.defineProperty(_exports,"__esModule",{value:true});_exports.RightTopOperate=void 0;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(
var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _defineProperty(obj,key,value){if(key in obj){
Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var CHANGE_PERIOD=7*24*60*60*1e3;var RightTopOperate=function(){function RightTopOperate(require){_classCallCheck(this,RightTopOperate);_defineProperty(this,"require",void 0);_defineProperty(this,"operateImage",{});_defineProperty(this,"operateAnimate",{});_defineProperty(this,"serverOptions","");_defineProperty(this,"period",0);_defineProperty(this,"commonFile","")
;_defineProperty(this,"darkFile","");_defineProperty(this,"isAnimateEntry","");_defineProperty(this,"isClicked",false);this.require=require;var rightTopOperateData=(0,_extract_data.extractData)("top-right-operate-data");var _rightTopOperateData$=rightTopOperateData.hasRightTop,hasRightTop=_rightTopOperateData$===void 0?"0":_rightTopOperateData$,_rightTopOperateData$2=rightTopOperateData.period,period=_rightTopOperateData$2===void 0?1:_rightTopOperateData$2,
_rightTopOperateData$3=rightTopOperateData.commonFile,commonFile=_rightTopOperateData$3===void 0?"":_rightTopOperateData$3,_rightTopOperateData$4=rightTopOperateData.darkFile,darkFile=_rightTopOperateData$4===void 0?"":_rightTopOperateData$4,_rightTopOperateData$5=rightTopOperateData.isAnimateEntry,isAnimateEntry=_rightTopOperateData$5===void 0?"1":_rightTopOperateData$5;if(hasRightTop!=="1"){return}this.isAnimateEntry=isAnimateEntry;this.commonFile=commonFile;this.darkFile=darkFile
;this.serverOptions=JSON.stringify(rightTopOperateData);var hasOptionsChanged=this.hasOptionsChanged();hasOptionsChanged&&this.resetStorageOptions();var isClicked=(0,_commonUtils.getStorage)("topRightOperateIsClicked")==="1";this.isClicked=isClicked;this.period=isClicked?CHANGE_PERIOD:period*24*60*60*1e3;this.operateImage=$(".operate-image");this.operateAnimate=$(".operate-animate");this.init();this.initHandleClick()}_createClass(RightTopOperate,[{key:"hasOptionsChanged",
value:function hasOptionsChanged(){var localOptions=(0,_commonUtils.getStorage)("rightTopOperateOptions");var serverOptions=this.serverOptions;return localOptions!==serverOptions}},{key:"resetStorageOptions",value:function resetStorageOptions(){localStorage.removeItem("rightTopOperateOptions");localStorage.removeItem("rightTopShowTime");localStorage.removeItem("topRightOperateIsClicked");(0,_commonUtils.setStorage)("rightTopOperateOptions",this.serverOptions)}},{key:"initLottieAndPlay",
value:function initLottieAndPlay(){var _this=this;var lottieFilePath=(0,_commonUtils.isDarkMode)()?this.darkFile:this.commonFile;this.require(["lottie-web"],function(lottie){var lottieIns=lottie.loadAnimation({container:$(".operate-animate")[0],renderer:"svg",loop:false,autoplay:false,path:lottieFilePath,rendererSettings:{progressiveLoad:true,hideOnTransparent:true}});lottieIns&&lottieIns.addEventListener("DOMLoaded",function(){_this.operateImage.hide()});lottieIns&&lottieIns.addEventListener(
"complete",function(){_this.operateImage.show();_this.operateAnimate.hide()});lottieIns.play()})}},{key:"initHandleClick",value:function initHandleClick(){$(".operate-wrapper").on("click",function(){(0,_commonUtils.sendMidLog)(175,10)});$(".operate-animate").on("click",function(){(0,_commonUtils.setStorage)("topRightOperateIsClicked","1")})}},{key:"init",value:function init(){if(this.isAnimateEntry!=="1"){return}var isClicked=this.isClicked;if(isClicked){this.operateAnimate.hide();return}
this.initLottieAndPlay()}}]);return RightTopOperate}();_exports.RightTopOperate=RightTopOperate});