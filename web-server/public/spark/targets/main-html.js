(function () { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = true;
IntIterator.prototype = {
	__class__: IntIterator
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = true;
IMap.prototype = {
	__class__: IMap
};
Math.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(js_Boot.isClass(f) || js_Boot.isEnum(f));
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.instance = function(value,c) {
	if((value instanceof c)) return value; else return null;
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,toString: function() {
		return this.b;
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.isEof = function(c) {
	return c != c;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !js_Boot.isClass(cl)) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !js_Boot.isEnum(e)) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		return false;
	}
	return true;
};
Type.enumParameters = function(e) {
	return e.slice(2);
};
Type.enumIndex = function(e) {
	return e[1];
};
var XmlType = $hxClasses["XmlType"] = { __ename__ : true, __constructs__ : [] };
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = true;
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe_ds_StringMap();
	r.set_nodeName(name);
	return r;
};
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
};
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
};
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
};
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
};
Xml.prototype = {
	get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.remove(att);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.keys();
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n = this.x[k1];
				k1 += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k1;
					return n;
				}
			}
			return null;
		}};
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n1 = this.x[k1];
				k1++;
				if(n1.nodeType == Xml.Element && n1._nodeName == name) {
					this.cur = k1;
					return n1;
				}
			}
			return null;
		}};
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,removeChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		var b = HxOverrides.remove(this._children,x);
		if(b) x._parent = null;
		return b;
	}
	,insertChild: function(x,pos) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.splice(pos,0,x);
	}
	,toString: function() {
		if(this.nodeType == Xml.PCData) return StringTools.htmlEscape(this._nodeValue);
		if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
		if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
		if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
		if(this.nodeType == Xml.ProcessingInstruction) return "<?" + this._nodeValue + "?>";
		var s = new StringBuf();
		if(this.nodeType == Xml.Element) {
			s.add("<");
			s.add(this._nodeName);
			var $it0 = this._attributes.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				s.add(" ");
				s.add(k);
				s.add("=\"");
				s.add(this._attributes.get(k));
				s.add("\"");
			}
			if(this._children.length == 0) {
				s.add("/>");
				return s.toString();
			}
			s.add(">");
		}
		var $it1 = this.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			s.add(x.toString());
		}
		if(this.nodeType == Xml.Element) {
			s.add("</");
			s.add(this._nodeName);
			s.add(">");
		}
		return s.toString();
	}
	,__class__: Xml
};
var flambe_util_Disposable = function() { };
$hxClasses["flambe.util.Disposable"] = flambe_util_Disposable;
flambe_util_Disposable.__name__ = true;
flambe_util_Disposable.prototype = {
	__class__: flambe_util_Disposable
};
var flambe_Component = function() {
	this._flags = 0;
	this.next = null;
	this.owner = null;
};
$hxClasses["flambe.Component"] = flambe_Component;
flambe_Component.__name__ = true;
flambe_Component.__interfaces__ = [flambe_util_Disposable];
flambe_Component.prototype = {
	onAdded: function() {
	}
	,onRemoved: function() {
	}
	,onStart: function() {
	}
	,onStop: function() {
	}
	,onUpdate: function(dt) {
	}
	,dispose: function() {
		if(this.owner != null) this.owner.remove(this);
	}
	,get_name: function() {
		return null;
	}
	,__class__: flambe_Component
};
var flambe_Entity = function() {
	this.firstComponent = null;
	this.next = null;
	this.firstChild = null;
	this.parent = null;
	this._compMap = { };
};
$hxClasses["flambe.Entity"] = flambe_Entity;
flambe_Entity.__name__ = true;
flambe_Entity.__interfaces__ = [flambe_util_Disposable];
flambe_Entity.prototype = {
	add: function(component) {
		if(component.owner != null) component.owner.remove(component);
		var name = component.get_name();
		var prev = this.getComponent(name);
		if(prev != null) this.remove(prev);
		this._compMap[name] = component;
		var tail = null;
		var p = this.firstComponent;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		if(tail != null) tail.next = component; else this.firstComponent = component;
		component.owner = this;
		component.next = null;
		component.onAdded();
		return this;
	}
	,remove: function(component) {
		var prev = null;
		var p = this.firstComponent;
		while(p != null) {
			var next = p.next;
			if(p == component) {
				if(prev == null) this.firstComponent = next; else {
					prev.owner = this;
					prev.next = next;
				}
				delete(this._compMap[p.get_name()]);
				if(flambe_util_BitSets.contains(p._flags,1)) {
					p.onStop();
					p._flags = flambe_util_BitSets.remove(p._flags,1);
				}
				p.onRemoved();
				p.owner = null;
				p.next = null;
				return true;
			}
			prev = p;
			p = next;
		}
		return false;
	}
	,getComponent: function(name) {
		return this._compMap[name];
	}
	,addChild: function(entity,append) {
		if(append == null) append = true;
		if(entity.parent != null) entity.parent.removeChild(entity);
		entity.parent = this;
		if(append) {
			var tail = null;
			var p = this.firstChild;
			while(p != null) {
				tail = p;
				p = p.next;
			}
			if(tail != null) tail.next = entity; else this.firstChild = entity;
		} else {
			entity.next = this.firstChild;
			this.firstChild = entity;
		}
		return this;
	}
	,removeChild: function(entity) {
		var prev = null;
		var p = this.firstChild;
		while(p != null) {
			var next = p.next;
			if(p == entity) {
				if(prev == null) this.firstChild = next; else prev.next = next;
				p.parent = null;
				p.next = null;
				return;
			}
			prev = p;
			p = next;
		}
	}
	,disposeChildren: function() {
		while(this.firstChild != null) this.firstChild.dispose();
	}
	,dispose: function() {
		if(this.parent != null) this.parent.removeChild(this);
		while(this.firstComponent != null) this.firstComponent.dispose();
		this.disposeChildren();
	}
	,toString: function() {
		return this.toStringImpl("");
	}
	,toStringImpl: function(indent) {
		var output = "";
		var p = this.firstComponent;
		while(p != null) {
			output += p.get_name();
			if(p.next != null) output += ", ";
			p = p.next;
		}
		output += "\n";
		var u2514 = String.fromCharCode(9492);
		var u241c = String.fromCharCode(9500);
		var u2500 = String.fromCharCode(9472);
		var u2502 = String.fromCharCode(9474);
		var p1 = this.firstChild;
		while(p1 != null) {
			var last = p1.next == null;
			output += indent + (last?u2514:u241c) + u2500 + u2500 + " ";
			output += p1.toStringImpl(indent + (last?" ":u2502) + "   ");
			p1 = p1.next;
		}
		return output;
	}
	,__class__: flambe_Entity
};
var flambe_util_PackageLog = function() { };
$hxClasses["flambe.util.PackageLog"] = flambe_util_PackageLog;
flambe_util_PackageLog.__name__ = true;
var flambe_platform_Platform = function() { };
$hxClasses["flambe.platform.Platform"] = flambe_platform_Platform;
flambe_platform_Platform.__name__ = true;
flambe_platform_Platform.prototype = {
	__class__: flambe_platform_Platform
};
var flambe_platform_html_HtmlPlatform = function() {
};
$hxClasses["flambe.platform.html.HtmlPlatform"] = flambe_platform_html_HtmlPlatform;
flambe_platform_html_HtmlPlatform.__name__ = true;
flambe_platform_html_HtmlPlatform.__interfaces__ = [flambe_platform_Platform];
flambe_platform_html_HtmlPlatform.prototype = {
	init: function() {
		var _g = this;
		flambe_platform_html_HtmlUtil.fixAndroidMath();
		var canvas = null;
		try {
			canvas = js_Browser.get_window().flambe.canvas;
		} catch( error ) {
		}
		flambe_util_Assert.that(canvas != null,"Could not find a Flambe canvas! Are you embedding with flambe.js?");
		canvas.setAttribute("tabindex","0");
		canvas.style.outlineStyle = "none";
		canvas.style.webkitTapHighlightColor = "transparent";
		this._stage = new flambe_platform_html_HtmlStage(canvas);
		this._pointer = new flambe_platform_BasicPointer();
		this._mouse = new flambe_platform_html_HtmlMouse(this._pointer,canvas);
		this._renderer = this.createRenderer(canvas);
		this.mainLoop = new flambe_platform_MainLoop();
		this.musicPlaying = false;
		this._canvas = canvas;
		this._container = canvas.parentElement;
		this._container.style.overflow = "hidden";
		this._container.style.position = "relative";
		this._container.style.msTouchAction = "none";
		var lastTouchTime = 0;
		var onMouse = function(event) {
			if(event.timeStamp - lastTouchTime < 1000) return;
			var bounds = canvas.getBoundingClientRect();
			var x = _g.getX(event,bounds);
			var y = _g.getY(event,bounds);
			var _g1 = event.type;
			switch(_g1) {
			case "mousedown":
				if(event.target == canvas) {
					event.preventDefault();
					_g._mouse.submitDown(x,y,event.button);
					canvas.focus();
				}
				break;
			case "mousemove":
				_g._mouse.submitMove(x,y);
				break;
			case "mouseup":
				_g._mouse.submitUp(x,y,event.button);
				break;
			case "mousewheel":case "DOMMouseScroll":
				var velocity;
				if(event.type == "mousewheel") velocity = event.wheelDelta / 40; else velocity = -event.detail;
				if(_g._mouse.submitScroll(x,y,velocity)) event.preventDefault();
				break;
			}
		};
		js_Browser.get_window().addEventListener("mousedown",onMouse,false);
		js_Browser.get_window().addEventListener("mousemove",onMouse,false);
		js_Browser.get_window().addEventListener("mouseup",onMouse,false);
		canvas.addEventListener("mousewheel",onMouse,false);
		canvas.addEventListener("DOMMouseScroll",onMouse,false);
		canvas.addEventListener("contextmenu",function(event1) {
			event1.preventDefault();
		},false);
		var standardTouch = typeof(js_Browser.get_window().ontouchstart) != "undefined";
		var msTouch = 'msMaxTouchPoints' in window.navigator && (window.navigator.msMaxTouchPoints > 1);
		if(standardTouch || msTouch) {
			var basicTouch = new flambe_platform_BasicTouch(this._pointer,standardTouch?4:js_Browser.get_navigator().msMaxTouchPoints);
			this._touch = basicTouch;
			var onTouch = function(event2) {
				var changedTouches;
				if(standardTouch) changedTouches = event2.changedTouches; else changedTouches = [event2];
				var bounds1 = event2.target.getBoundingClientRect();
				lastTouchTime = event2.timeStamp;
				var _g2 = event2.type;
				switch(_g2) {
				case "touchstart":case "MSPointerDown":case "pointerdown":
					event2.preventDefault();
					if(flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) flambe_platform_html_HtmlUtil.hideMobileBrowser();
					var _g11 = 0;
					while(_g11 < changedTouches.length) {
						var touch = changedTouches[_g11];
						++_g11;
						var x1 = _g.getX(touch,bounds1);
						var y1 = _g.getY(touch,bounds1);
						var id = Std["int"](standardTouch?touch.identifier:touch.pointerId);
						basicTouch.submitDown(id,x1,y1);
					}
					break;
				case "touchmove":case "MSPointerMove":case "pointermove":
					event2.preventDefault();
					var _g12 = 0;
					while(_g12 < changedTouches.length) {
						var touch1 = changedTouches[_g12];
						++_g12;
						var x2 = _g.getX(touch1,bounds1);
						var y2 = _g.getY(touch1,bounds1);
						var id1 = Std["int"](standardTouch?touch1.identifier:touch1.pointerId);
						basicTouch.submitMove(id1,x2,y2);
					}
					break;
				case "touchend":case "touchcancel":case "MSPointerUp":case "pointerup":
					var _g13 = 0;
					while(_g13 < changedTouches.length) {
						var touch2 = changedTouches[_g13];
						++_g13;
						var x3 = _g.getX(touch2,bounds1);
						var y3 = _g.getY(touch2,bounds1);
						var id2 = Std["int"](standardTouch?touch2.identifier:touch2.pointerId);
						basicTouch.submitUp(id2,x3,y3);
					}
					break;
				}
			};
			if(standardTouch) {
				canvas.addEventListener("touchstart",onTouch,false);
				canvas.addEventListener("touchmove",onTouch,false);
				canvas.addEventListener("touchend",onTouch,false);
				canvas.addEventListener("touchcancel",onTouch,false);
			} else {
				canvas.addEventListener("MSPointerDown",onTouch,false);
				canvas.addEventListener("MSPointerMove",onTouch,false);
				canvas.addEventListener("MSPointerUp",onTouch,false);
			}
		} else this._touch = new flambe_platform_DummyTouch();
		var oldErrorHandler = js_Browser.get_window().onerror;
		js_Browser.get_window().onerror = function(message,url,line) {
			flambe_System.uncaughtError.emit(message);
			if(oldErrorHandler != null) return oldErrorHandler(message,url,line); else return false;
		};
		var hiddenApi = flambe_platform_html_HtmlUtil.loadExtension("hidden",js_Browser.get_document());
		if(hiddenApi.value != null) {
			var onVisibilityChanged = function(_) {
				flambe_System.hidden.set__(Reflect.field(js_Browser.get_document(),hiddenApi.field));
			};
			onVisibilityChanged(null);
			js_Browser.get_document().addEventListener(hiddenApi.prefix + "visibilitychange",onVisibilityChanged,false);
		} else {
			var onPageTransitionChange = function(event3) {
				flambe_System.hidden.set__(event3.type == "pagehide");
			};
			js_Browser.get_window().addEventListener("pageshow",onPageTransitionChange,false);
			js_Browser.get_window().addEventListener("pagehide",onPageTransitionChange,false);
		}
		flambe_System.hidden.get_changed().connect(function(hidden,_1) {
			if(!hidden) _g._skipFrame = true;
		});
		this._skipFrame = false;
		this._lastUpdate = flambe_platform_html_HtmlUtil.now();
		var requestAnimationFrame = flambe_platform_html_HtmlUtil.loadExtension("requestAnimationFrame").value;
		if(requestAnimationFrame != null) {
			var performance = js_Browser.get_window().performance;
			var hasPerfNow = performance != null && flambe_platform_html_HtmlUtil.polyfill("now",performance);
			if(hasPerfNow) this._lastUpdate = performance.now(); else flambe_Log.warn("No monotonic timer support, falling back to the system date");
			var updateFrame = null;
			updateFrame = function(now) {
				_g.update(hasPerfNow?performance.now():now);
				requestAnimationFrame(updateFrame,canvas);
			};
			requestAnimationFrame(updateFrame,canvas);
		} else {
			flambe_Log.warn("No requestAnimationFrame support, falling back to setInterval");
			js_Browser.get_window().setInterval(function() {
				_g.update(flambe_platform_html_HtmlUtil.now());
			},16);
		}
		new flambe_platform_DebugLogic(this);
		if(flambe_platform_html_HtmlCatapultClient.canUse()) this._catapult = new flambe_platform_html_HtmlCatapultClient(); else this._catapult = null;
		flambe_Log.info("Initialized HTML platform",["renderer",this._renderer.get_type()]);
	}
	,loadAssetPack: function(manifest) {
		return new flambe_platform_html_HtmlAssetPackLoader(this,manifest).promise;
	}
	,getStage: function() {
		return this._stage;
	}
	,createLogHandler: function(tag) {
		if(flambe_platform_html_HtmlLogHandler.isSupported()) return new flambe_platform_html_HtmlLogHandler(tag);
		return null;
	}
	,getCatapultClient: function() {
		return this._catapult;
	}
	,update: function(now) {
		var dt = (now - this._lastUpdate) / 1000;
		this._lastUpdate = now;
		if(flambe_System.hidden.get__()) return;
		if(this._skipFrame) {
			this._skipFrame = false;
			return;
		}
		this.mainLoop.update(dt);
		tools_spark_framework_platform_html_flambe2_$5_Subgraphics.onRender();
	}
	,getPointer: function() {
		return this._pointer;
	}
	,getKeyboard: function() {
		var _g1 = this;
		if(this._keyboard == null) {
			this._keyboard = new flambe_platform_BasicKeyboard();
			var onKey = function(event) {
				var _g = event.type;
				switch(_g) {
				case "keydown":
					if(_g1._keyboard.submitDown(event.keyCode)) event.preventDefault();
					break;
				case "keyup":
					_g1._keyboard.submitUp(event.keyCode);
					break;
				}
			};
			this._canvas.addEventListener("keydown",onKey,false);
			this._canvas.addEventListener("keyup",onKey,false);
		}
		return this._keyboard;
	}
	,getExternal: function() {
		if(this._external == null) this._external = new flambe_platform_html_HtmlExternal();
		return this._external;
	}
	,getRenderer: function() {
		return this._renderer;
	}
	,getX: function(event,bounds) {
		return (event.clientX - bounds.left) * this._stage.get_width() / bounds.width;
	}
	,getY: function(event,bounds) {
		return (event.clientY - bounds.top) * this._stage.get_height() / bounds.height;
	}
	,createRenderer: function(canvas) {
		try {
			var gl = js_html__$CanvasElement_CanvasUtil.getContextWebGL(canvas,{ depth : false, failIfMajorPerformanceCaveat : true});
			if(gl != null) {
				if(flambe_platform_html_HtmlUtil.detectSlowDriver(gl)) flambe_Log.warn("Detected a slow WebGL driver, falling back to canvas"); else return new flambe_platform_html_WebGLRenderer(this._stage,gl);
			}
		} catch( _ ) {
		}
		return new flambe_platform_html_CanvasRenderer(canvas);
		flambe_Log.error("No renderer available!");
		return null;
	}
	,__class__: flambe_platform_html_HtmlPlatform
};
var flambe_util_Value = function(value,listener) {
	this._value = value;
	if(listener != null) this._changed = new flambe_util_Signal2(listener); else this._changed = null;
};
$hxClasses["flambe.util.Value"] = flambe_util_Value;
flambe_util_Value.__name__ = true;
flambe_util_Value.prototype = {
	watch: function(listener) {
		listener(this._value,this._value);
		return this.get_changed().connect(listener);
	}
	,get__: function() {
		return this._value;
	}
	,set__: function(newValue) {
		var oldValue = this._value;
		if(newValue != oldValue) {
			this._value = newValue;
			if(this._changed != null) this._changed.emit(newValue,oldValue);
		}
		return newValue;
	}
	,get_changed: function() {
		if(this._changed == null) this._changed = new flambe_util_Signal2();
		return this._changed;
	}
	,toString: function() {
		return "" + Std.string(this._value);
	}
	,__class__: flambe_util_Value
};
var flambe_util_SignalConnection = function(signal,listener) {
	this._next = null;
	this._signal = signal;
	this._listener = listener;
	this.stayInList = true;
};
$hxClasses["flambe.util.SignalConnection"] = flambe_util_SignalConnection;
flambe_util_SignalConnection.__name__ = true;
flambe_util_SignalConnection.__interfaces__ = [flambe_util_Disposable];
flambe_util_SignalConnection.prototype = {
	once: function() {
		this.stayInList = false;
		return this;
	}
	,dispose: function() {
		if(this._signal != null) {
			this._signal.disconnect(this);
			this._signal = null;
		}
	}
	,__class__: flambe_util_SignalConnection
};
var flambe_util_SignalBase = function(listener) {
	if(listener != null) this._head = new flambe_util_SignalConnection(this,listener); else this._head = null;
	this._deferredTasks = null;
};
$hxClasses["flambe.util.SignalBase"] = flambe_util_SignalBase;
flambe_util_SignalBase.__name__ = true;
flambe_util_SignalBase.prototype = {
	hasListeners: function() {
		return this._head != null;
	}
	,connectImpl: function(listener,prioritize) {
		var _g = this;
		var conn = new flambe_util_SignalConnection(this,listener);
		if(this.dispatching()) this.defer(function() {
			_g.listAdd(conn,prioritize);
		}); else this.listAdd(conn,prioritize);
		return conn;
	}
	,disconnect: function(conn) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.listRemove(conn);
		}); else this.listRemove(conn);
	}
	,defer: function(fn) {
		var tail = null;
		var p = this._deferredTasks;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		var task = new flambe_util__$SignalBase_Task(fn);
		if(tail != null) tail.next = task; else this._deferredTasks = task;
	}
	,willEmit: function() {
		flambe_util_Assert.that(!this.dispatching());
		var snapshot = this._head;
		this._head = flambe_util_SignalBase.DISPATCHING_SENTINEL;
		return snapshot;
	}
	,didEmit: function(head) {
		this._head = head;
		var snapshot = this._deferredTasks;
		this._deferredTasks = null;
		while(snapshot != null) {
			snapshot.fn();
			snapshot = snapshot.next;
		}
	}
	,listAdd: function(conn,prioritize) {
		if(prioritize) {
			conn._next = this._head;
			this._head = conn;
		} else {
			var tail = null;
			var p = this._head;
			while(p != null) {
				tail = p;
				p = p._next;
			}
			if(tail != null) tail._next = conn; else this._head = conn;
		}
	}
	,listRemove: function(conn) {
		var prev = null;
		var p = this._head;
		while(p != null) {
			if(p == conn) {
				var next = p._next;
				if(prev == null) this._head = next; else prev._next = next;
				return;
			}
			prev = p;
			p = p._next;
		}
	}
	,dispatching: function() {
		return this._head == flambe_util_SignalBase.DISPATCHING_SENTINEL;
	}
	,__class__: flambe_util_SignalBase
};
var flambe_util_Signal2 = function(listener) {
	flambe_util_SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal2"] = flambe_util_Signal2;
flambe_util_Signal2.__name__ = true;
flambe_util_Signal2.__super__ = flambe_util_SignalBase;
flambe_util_Signal2.prototype = $extend(flambe_util_SignalBase.prototype,{
	connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,emit: function(arg1,arg2) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl(arg1,arg2);
		}); else this.emitImpl(arg1,arg2);
	}
	,emitImpl: function(arg1,arg2) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1,arg2);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,__class__: flambe_util_Signal2
});
var flambe_util_Signal1 = function(listener) {
	flambe_util_SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal1"] = flambe_util_Signal1;
flambe_util_Signal1.__name__ = true;
flambe_util_Signal1.__super__ = flambe_util_SignalBase;
flambe_util_Signal1.prototype = $extend(flambe_util_SignalBase.prototype,{
	connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,emit: function(arg1) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl(arg1);
		}); else this.emitImpl(arg1);
	}
	,emitImpl: function(arg1) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,__class__: flambe_util_Signal1
});
var flambe_animation_AnimatedFloat = function(value,listener) {
	this._behavior = null;
	flambe_util_Value.call(this,value,listener);
};
$hxClasses["flambe.animation.AnimatedFloat"] = flambe_animation_AnimatedFloat;
flambe_animation_AnimatedFloat.__name__ = true;
flambe_animation_AnimatedFloat.__super__ = flambe_util_Value;
flambe_animation_AnimatedFloat.prototype = $extend(flambe_util_Value.prototype,{
	set__: function(value) {
		this._behavior = null;
		return flambe_util_Value.prototype.set__.call(this,value);
	}
	,update: function(dt) {
		if(this._behavior != null) {
			flambe_util_Value.prototype.set__.call(this,this._behavior.update(dt));
			if(this._behavior.isComplete()) this._behavior = null;
		}
	}
	,__class__: flambe_animation_AnimatedFloat
});
var flambe_System = function() { };
$hxClasses["flambe.System"] = flambe_System;
flambe_System.__name__ = true;
flambe_System.init = function() {
	if(!flambe_System._calledInit) {
		flambe_System._platform.init();
		flambe_System._calledInit = true;
	}
};
flambe_System.loadAssetPack = function(manifest) {
	flambe_System.assertCalledInit();
	return flambe_System._platform.loadAssetPack(manifest);
};
flambe_System.createLogger = function(tag) {
	return new flambe_util_Logger(flambe_System._platform.createLogHandler(tag));
};
flambe_System.get_stage = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getStage();
};
flambe_System.get_pointer = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getPointer();
};
flambe_System.get_keyboard = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getKeyboard();
};
flambe_System.get_external = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getExternal();
};
flambe_System.assertCalledInit = function() {
	flambe_util_Assert.that(flambe_System._calledInit,"You must call System.init() first");
};
var flambe_util_Logger = function(handler) {
	this._handler = handler;
};
$hxClasses["flambe.util.Logger"] = flambe_util_Logger;
flambe_util_Logger.__name__ = true;
flambe_util_Logger.prototype = {
	info: function(text,fields) {
		this.log(flambe_util_LogLevel.Info,text,fields);
	}
	,warn: function(text,fields) {
		this.log(flambe_util_LogLevel.Warn,text,fields);
	}
	,error: function(text,fields) {
		this.log(flambe_util_LogLevel.Error,text,fields);
	}
	,log: function(level,text,fields) {
		if(this._handler == null) return;
		if(text == null) text = "";
		if(fields != null) text = flambe_util_Strings.withFields(text,fields);
		this._handler.log(level,text);
	}
	,__class__: flambe_util_Logger
};
var flambe_Log = function() { };
$hxClasses["flambe.Log"] = flambe_Log;
flambe_Log.__name__ = true;
flambe_Log.info = function(text,args) {
	flambe_Log.logger.info(text,args);
};
flambe_Log.warn = function(text,args) {
	flambe_Log.logger.warn(text,args);
};
flambe_Log.error = function(text,args) {
	flambe_Log.logger.error(text,args);
};
flambe_Log.__super__ = flambe_util_PackageLog;
flambe_Log.prototype = $extend(flambe_util_PackageLog.prototype,{
	__class__: flambe_Log
});
var flambe_SpeedAdjuster = function() {
	this._realDt = 0;
};
$hxClasses["flambe.SpeedAdjuster"] = flambe_SpeedAdjuster;
flambe_SpeedAdjuster.__name__ = true;
flambe_SpeedAdjuster.__super__ = flambe_Component;
flambe_SpeedAdjuster.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "SpeedAdjuster_5";
	}
	,onUpdate: function(dt) {
		if(this._realDt > 0) {
			dt = this._realDt;
			this._realDt = 0;
		}
		this.scale.update(dt);
	}
	,__class__: flambe_SpeedAdjuster
});
var flambe_animation_Behavior = function() { };
$hxClasses["flambe.animation.Behavior"] = flambe_animation_Behavior;
flambe_animation_Behavior.__name__ = true;
flambe_animation_Behavior.prototype = {
	__class__: flambe_animation_Behavior
};
var flambe_asset_Asset = function() { };
$hxClasses["flambe.asset.Asset"] = flambe_asset_Asset;
flambe_asset_Asset.__name__ = true;
flambe_asset_Asset.__interfaces__ = [flambe_util_Disposable];
flambe_asset_Asset.prototype = {
	__class__: flambe_asset_Asset
};
var flambe_asset_AssetFormat = $hxClasses["flambe.asset.AssetFormat"] = { __ename__ : true, __constructs__ : ["WEBP","JXR","PNG","JPG","GIF","DDS","PVR","PKM","MP3","M4A","OPUS","OGG","WAV","Data"] };
flambe_asset_AssetFormat.WEBP = ["WEBP",0];
flambe_asset_AssetFormat.WEBP.toString = $estr;
flambe_asset_AssetFormat.WEBP.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.JXR = ["JXR",1];
flambe_asset_AssetFormat.JXR.toString = $estr;
flambe_asset_AssetFormat.JXR.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.PNG = ["PNG",2];
flambe_asset_AssetFormat.PNG.toString = $estr;
flambe_asset_AssetFormat.PNG.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.JPG = ["JPG",3];
flambe_asset_AssetFormat.JPG.toString = $estr;
flambe_asset_AssetFormat.JPG.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.GIF = ["GIF",4];
flambe_asset_AssetFormat.GIF.toString = $estr;
flambe_asset_AssetFormat.GIF.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.DDS = ["DDS",5];
flambe_asset_AssetFormat.DDS.toString = $estr;
flambe_asset_AssetFormat.DDS.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.PVR = ["PVR",6];
flambe_asset_AssetFormat.PVR.toString = $estr;
flambe_asset_AssetFormat.PVR.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.PKM = ["PKM",7];
flambe_asset_AssetFormat.PKM.toString = $estr;
flambe_asset_AssetFormat.PKM.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.MP3 = ["MP3",8];
flambe_asset_AssetFormat.MP3.toString = $estr;
flambe_asset_AssetFormat.MP3.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.M4A = ["M4A",9];
flambe_asset_AssetFormat.M4A.toString = $estr;
flambe_asset_AssetFormat.M4A.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.OPUS = ["OPUS",10];
flambe_asset_AssetFormat.OPUS.toString = $estr;
flambe_asset_AssetFormat.OPUS.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.OGG = ["OGG",11];
flambe_asset_AssetFormat.OGG.toString = $estr;
flambe_asset_AssetFormat.OGG.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.WAV = ["WAV",12];
flambe_asset_AssetFormat.WAV.toString = $estr;
flambe_asset_AssetFormat.WAV.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.Data = ["Data",13];
flambe_asset_AssetFormat.Data.toString = $estr;
flambe_asset_AssetFormat.Data.__enum__ = flambe_asset_AssetFormat;
var flambe_asset_AssetEntry = function(name,url,format,bytes) {
	this.name = name;
	this.url = url;
	this.format = format;
	this.bytes = bytes;
};
$hxClasses["flambe.asset.AssetEntry"] = flambe_asset_AssetEntry;
flambe_asset_AssetEntry.__name__ = true;
flambe_asset_AssetEntry.prototype = {
	__class__: flambe_asset_AssetEntry
};
var flambe_asset_AssetPack = function() { };
$hxClasses["flambe.asset.AssetPack"] = flambe_asset_AssetPack;
flambe_asset_AssetPack.__name__ = true;
flambe_asset_AssetPack.__interfaces__ = [flambe_util_Disposable];
flambe_asset_AssetPack.prototype = {
	__class__: flambe_asset_AssetPack
};
var flambe_asset_File = function() { };
$hxClasses["flambe.asset.File"] = flambe_asset_File;
flambe_asset_File.__name__ = true;
flambe_asset_File.__interfaces__ = [flambe_asset_Asset];
flambe_asset_File.prototype = {
	__class__: flambe_asset_File
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = true;
js_Browser.get_window = function() {
	return window;
};
js_Browser.get_document = function() {
	return window.document;
};
js_Browser.get_location = function() {
	return window.location;
};
js_Browser.get_navigator = function() {
	return window.navigator;
};
var flambe_asset_Manifest = function() {
	this._remoteBase = null;
	this._localBase = null;
	this._entries = [];
};
$hxClasses["flambe.asset.Manifest"] = flambe_asset_Manifest;
flambe_asset_Manifest.__name__ = true;
flambe_asset_Manifest.inferFormat = function(url) {
	var extension = flambe_util_Strings.getUrlExtension(url);
	if(extension != null) {
		var _g = extension.toLowerCase();
		switch(_g) {
		case "gif":
			return flambe_asset_AssetFormat.GIF;
		case "jpg":case "jpeg":
			return flambe_asset_AssetFormat.JPG;
		case "jxr":case "wdp":
			return flambe_asset_AssetFormat.JXR;
		case "png":
			return flambe_asset_AssetFormat.PNG;
		case "webp":
			return flambe_asset_AssetFormat.WEBP;
		case "dds":
			return flambe_asset_AssetFormat.DDS;
		case "pvr":
			return flambe_asset_AssetFormat.PVR;
		case "pkm":
			return flambe_asset_AssetFormat.PKM;
		case "m4a":
			return flambe_asset_AssetFormat.M4A;
		case "mp3":
			return flambe_asset_AssetFormat.MP3;
		case "ogg":
			return flambe_asset_AssetFormat.OGG;
		case "opus":
			return flambe_asset_AssetFormat.OPUS;
		case "wav":
			return flambe_asset_AssetFormat.WAV;
		}
	} else flambe_Log.warn("No file extension for asset, it will be loaded as data",["url",url]);
	return flambe_asset_AssetFormat.Data;
};
flambe_asset_Manifest.prototype = {
	add: function(name,url,bytes,format) {
		if(bytes == null) bytes = 0;
		if(format == null) format = flambe_asset_Manifest.inferFormat(url);
		var entry = new flambe_asset_AssetEntry(name,url,format,bytes);
		this._entries.push(entry);
		return entry;
	}
	,iterator: function() {
		return HxOverrides.iter(this._entries);
	}
	,getFullURL: function(entry) {
		var basePath;
		if(this.get_remoteBase() != null && flambe_asset_Manifest._supportsCrossOrigin) basePath = this.get_remoteBase(); else basePath = this.get_localBase();
		if(basePath != null) return flambe_util_Strings.joinPath(basePath,entry.url); else return entry.url;
	}
	,get_localBase: function() {
		return this._localBase;
	}
	,get_remoteBase: function() {
		return this._remoteBase;
	}
	,__class__: flambe_asset_Manifest
};
var flambe_display_BlendMode = $hxClasses["flambe.display.BlendMode"] = { __ename__ : true, __constructs__ : ["Normal","Add","Multiply","Screen","Mask","Copy"] };
flambe_display_BlendMode.Normal = ["Normal",0];
flambe_display_BlendMode.Normal.toString = $estr;
flambe_display_BlendMode.Normal.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Add = ["Add",1];
flambe_display_BlendMode.Add.toString = $estr;
flambe_display_BlendMode.Add.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Multiply = ["Multiply",2];
flambe_display_BlendMode.Multiply.toString = $estr;
flambe_display_BlendMode.Multiply.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Screen = ["Screen",3];
flambe_display_BlendMode.Screen.toString = $estr;
flambe_display_BlendMode.Screen.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Mask = ["Mask",4];
flambe_display_BlendMode.Mask.toString = $estr;
flambe_display_BlendMode.Mask.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Copy = ["Copy",5];
flambe_display_BlendMode.Copy.toString = $estr;
flambe_display_BlendMode.Copy.__enum__ = flambe_display_BlendMode;
var flambe_math_Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["flambe.math.Point"] = flambe_math_Point;
flambe_math_Point.__name__ = true;
flambe_math_Point.prototype = {
	toString: function() {
		return "(" + this.x + "," + this.y + ")";
	}
	,__class__: flambe_math_Point
};
var flambe_display_Sprite = function() {
	this.scissor = null;
	this.blendMode = null;
	var _g = this;
	flambe_Component.call(this);
	this._flags = flambe_util_BitSets.add(this._flags,2 | 4 | 16 | 32);
	this._localMatrix = new flambe_math_Matrix();
	var dirtyMatrix = function(_,_1) {
		_g._flags = flambe_util_BitSets.add(_g._flags,8 | 16);
	};
	this.x = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.y = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.rotation = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.scaleX = new flambe_animation_AnimatedFloat(1,dirtyMatrix);
	this.scaleY = new flambe_animation_AnimatedFloat(1,dirtyMatrix);
	this.anchorX = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.anchorY = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.alpha = new flambe_animation_AnimatedFloat(1);
};
$hxClasses["flambe.display.Sprite"] = flambe_display_Sprite;
flambe_display_Sprite.__name__ = true;
flambe_display_Sprite.hitTest = function(entity,x,y) {
	var sprite;
	var component = entity.getComponent("Sprite_2");
	sprite = component;
	if(sprite != null) {
		if(!flambe_util_BitSets.containsAll(sprite._flags,2 | 4)) return null;
		if(sprite.getLocalMatrix().inverseTransform(x,y,flambe_display_Sprite._scratchPoint)) {
			x = flambe_display_Sprite._scratchPoint.x;
			y = flambe_display_Sprite._scratchPoint.y;
		}
		var scissor = sprite.scissor;
		if(scissor != null && !scissor.contains(x,y)) return null;
	}
	var result = flambe_display_Sprite.hitTestBackwards(entity.firstChild,x,y);
	if(result != null) return result;
	if(sprite != null && sprite.containsLocal(x,y)) return sprite; else return null;
};
flambe_display_Sprite.getBounds = function(entity,result) {
	if(result == null) result = new flambe_math_Rectangle();
	result.set(1.79769313486231e+308,1.79769313486231e+308,-1.79769313486231e+308,-1.79769313486231e+308);
	flambe_display_Sprite.getBoundsImpl(entity,null,result);
	result.width -= result.x;
	result.height -= result.y;
	return result;
};
flambe_display_Sprite.render = function(entity,g) {
	var sprite;
	var component = entity.getComponent("Sprite_2");
	sprite = component;
	if(sprite != null) {
		var alpha = sprite.alpha.get__();
		if(!sprite.get_visible() || alpha <= 0) return;
		g.save();
		if(alpha < 1) g.multiplyAlpha(alpha);
		if(sprite.blendMode != null) g.setBlendMode(sprite.blendMode);
		var matrix = sprite.getLocalMatrix();
		var m02 = matrix.m02;
		var m12 = matrix.m12;
		if(sprite.get_pixelSnapping()) {
			m02 = Math.round(m02);
			m12 = Math.round(m12);
		}
		g.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,m02,m12);
		var scissor = sprite.scissor;
		if(scissor != null) g.applyScissor(scissor.x,scissor.y,scissor.width,scissor.height);
		sprite.draw(g);
	}
	var director;
	var component1 = entity.getComponent("Director_3");
	director = component1;
	if(director != null) {
		var scenes = director.occludedScenes;
		var _g = 0;
		while(_g < scenes.length) {
			var scene = scenes[_g];
			++_g;
			flambe_display_Sprite.render(scene,g);
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe_display_Sprite.render(p,g);
		p = next;
	}
	if(sprite != null) g.restore();
};
flambe_display_Sprite.hitTestBackwards = function(entity,x,y) {
	if(entity != null) {
		var result = flambe_display_Sprite.hitTestBackwards(entity.next,x,y);
		if(result != null) return result; else return flambe_display_Sprite.hitTest(entity,x,y);
	}
	return null;
};
flambe_display_Sprite.getBoundsImpl = function(entity,matrix,result) {
	var sprite;
	var component = entity.getComponent("Sprite_2");
	sprite = component;
	if(sprite != null) {
		if(matrix != null) matrix = flambe_math_Matrix.multiply(matrix,sprite.getLocalMatrix()); else matrix = sprite.getLocalMatrix();
		var x1 = 0.0;
		var y1 = 0.0;
		var x2 = sprite.getNaturalWidth();
		var y2 = sprite.getNaturalHeight();
		if(x2 > x1 && y2 > y1) {
			flambe_display_Sprite.extendRect(matrix,x1,y1,result);
			flambe_display_Sprite.extendRect(matrix,x2,y1,result);
			flambe_display_Sprite.extendRect(matrix,x2,y2,result);
			flambe_display_Sprite.extendRect(matrix,x1,y2,result);
		}
	}
	var director;
	var component1 = entity.getComponent("Director_3");
	director = component1;
	if(director != null) {
		var scenes = director.occludedScenes;
		var ii = 0;
		var ll = scenes.length;
		while(ii < ll) {
			flambe_display_Sprite.getBoundsImpl(scenes[ii],matrix,result);
			++ii;
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe_display_Sprite.getBoundsImpl(p,matrix,result);
		p = next;
	}
};
flambe_display_Sprite.extendRect = function(matrix,x,y,rect) {
	var p = matrix.transform(x,y,flambe_display_Sprite._scratchPoint);
	x = p.x;
	y = p.y;
	if(x < rect.x) rect.x = x;
	if(y < rect.y) rect.y = y;
	if(x > rect.width) rect.width = x;
	if(y > rect.height) rect.height = y;
};
flambe_display_Sprite.__super__ = flambe_Component;
flambe_display_Sprite.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Sprite_2";
	}
	,getNaturalWidth: function() {
		return 0;
	}
	,getNaturalHeight: function() {
		return 0;
	}
	,containsLocal: function(localX,localY) {
		return localX >= 0 && localX < this.getNaturalWidth() && localY >= 0 && localY < this.getNaturalHeight();
	}
	,getLocalMatrix: function() {
		if(flambe_util_BitSets.contains(this._flags,8)) {
			this._flags = flambe_util_BitSets.remove(this._flags,8);
			this._localMatrix.compose(this.x.get__(),this.y.get__(),this.scaleX.get__(),this.scaleY.get__(),flambe_math_FMath.toRadians(this.rotation.get__()));
			this._localMatrix.translate(-this.anchorX.get__(),-this.anchorY.get__());
		}
		return this._localMatrix;
	}
	,setAlpha: function(alpha) {
		this.alpha.set__(alpha);
		return this;
	}
	,onAdded: function() {
		if(flambe_util_BitSets.contains(this._flags,64)) this.connectHover();
	}
	,onRemoved: function() {
		if(this._hoverConnection != null) {
			this._hoverConnection.dispose();
			this._hoverConnection = null;
		}
	}
	,onUpdate: function(dt) {
		this.x.update(dt);
		this.y.update(dt);
		this.rotation.update(dt);
		this.scaleX.update(dt);
		this.scaleY.update(dt);
		this.alpha.update(dt);
		this.anchorX.update(dt);
		this.anchorY.update(dt);
	}
	,draw: function(g) {
	}
	,getParentSprite: function() {
		if(this.owner == null) return null;
		var entity = this.owner.parent;
		while(entity != null) {
			var sprite;
			var component = entity.getComponent("Sprite_2");
			sprite = component;
			if(sprite != null) return sprite;
			entity = entity.parent;
		}
		return null;
	}
	,get_pointerDown: function() {
		if(this._pointerDown == null) this._pointerDown = new flambe_util_Signal1();
		return this._pointerDown;
	}
	,get_pointerMove: function() {
		if(this._pointerMove == null) this._pointerMove = new flambe_util_Signal1();
		return this._pointerMove;
	}
	,get_pointerIn: function() {
		if(this._pointerIn == null) this._pointerIn = new flambe_util_Signal1();
		return this._pointerIn;
	}
	,get_pointerOut: function() {
		if(this._pointerOut == null) this._pointerOut = new flambe_util_Signal1();
		return this._pointerOut;
	}
	,connectHover: function() {
		var _g = this;
		if(this._hoverConnection != null) return;
		this._hoverConnection = flambe_System.get_pointer().move.connect(function(event) {
			var hit = event.hit;
			while(hit != null) {
				if(hit == _g) return;
				hit = hit.getParentSprite();
			}
			if(_g._pointerOut != null && flambe_util_BitSets.contains(_g._flags,64)) _g._pointerOut.emit(event);
			_g._flags = flambe_util_BitSets.remove(_g._flags,64);
			_g._hoverConnection.dispose();
			_g._hoverConnection = null;
		});
	}
	,get_visible: function() {
		return flambe_util_BitSets.contains(this._flags,2);
	}
	,set_visible: function(visible) {
		this._flags = flambe_util_BitSets.set(this._flags,2,visible);
		return visible;
	}
	,set_pointerEnabled: function(pointerEnabled) {
		this._flags = flambe_util_BitSets.set(this._flags,4,pointerEnabled);
		return pointerEnabled;
	}
	,get_pixelSnapping: function() {
		return flambe_util_BitSets.contains(this._flags,32);
	}
	,onPointerDown: function(event) {
		this.onHover(event);
		if(this._pointerDown != null) this._pointerDown.emit(event);
	}
	,onPointerMove: function(event) {
		this.onHover(event);
		if(this._pointerMove != null) this._pointerMove.emit(event);
	}
	,onHover: function(event) {
		if(flambe_util_BitSets.contains(this._flags,64)) return;
		this._flags = flambe_util_BitSets.add(this._flags,64);
		if(this._pointerIn != null || this._pointerOut != null) {
			if(this._pointerIn != null) this._pointerIn.emit(event);
			this.connectHover();
		}
	}
	,onPointerUp: function(event) {
		{
			var _g = event.source;
			switch(Type.enumIndex(_g)) {
			case 1:
				var point = _g[2];
				if(this._pointerOut != null && flambe_util_BitSets.contains(this._flags,64)) this._pointerOut.emit(event);
				this._flags = flambe_util_BitSets.remove(this._flags,64);
				if(this._hoverConnection != null) {
					this._hoverConnection.dispose();
					this._hoverConnection = null;
				}
				break;
			default:
			}
		}
		if(this._pointerUp != null) this._pointerUp.emit(event);
	}
	,__class__: flambe_display_Sprite
});
var flambe_display_FillSprite = function(color,width,height) {
	flambe_display_Sprite.call(this);
	this.color = color;
	this.width = new flambe_animation_AnimatedFloat(width);
	this.height = new flambe_animation_AnimatedFloat(height);
};
$hxClasses["flambe.display.FillSprite"] = flambe_display_FillSprite;
flambe_display_FillSprite.__name__ = true;
flambe_display_FillSprite.__super__ = flambe_display_Sprite;
flambe_display_FillSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	draw: function(g) {
		g.fillRect(this.color,0,0,this.width.get__(),this.height.get__());
	}
	,getNaturalWidth: function() {
		return this.width.get__();
	}
	,getNaturalHeight: function() {
		return this.height.get__();
	}
	,setSize: function(width,height) {
		this.width.set__(width);
		this.height.set__(height);
		return this;
	}
	,onUpdate: function(dt) {
		flambe_display_Sprite.prototype.onUpdate.call(this,dt);
		this.width.update(dt);
		this.height.update(dt);
	}
	,__class__: flambe_display_FillSprite
});
var flambe_display_Graphics = function() { };
$hxClasses["flambe.display.Graphics"] = flambe_display_Graphics;
flambe_display_Graphics.__name__ = true;
flambe_display_Graphics.prototype = {
	__class__: flambe_display_Graphics
};
var flambe_display_ImageSprite = function(texture) {
	flambe_display_Sprite.call(this);
	this.texture = texture;
};
$hxClasses["flambe.display.ImageSprite"] = flambe_display_ImageSprite;
flambe_display_ImageSprite.__name__ = true;
flambe_display_ImageSprite.__super__ = flambe_display_Sprite;
flambe_display_ImageSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	draw: function(g) {
		if(this.texture != null) g.drawTexture(this.texture,0,0);
	}
	,getNaturalWidth: function() {
		if(this.texture != null) return this.texture.get_width(); else return 0;
	}
	,getNaturalHeight: function() {
		if(this.texture != null) return this.texture.get_height(); else return 0;
	}
	,__class__: flambe_display_ImageSprite
});
var flambe_display_Orientation = $hxClasses["flambe.display.Orientation"] = { __ename__ : true, __constructs__ : ["Portrait","Landscape"] };
flambe_display_Orientation.Portrait = ["Portrait",0];
flambe_display_Orientation.Portrait.toString = $estr;
flambe_display_Orientation.Portrait.__enum__ = flambe_display_Orientation;
flambe_display_Orientation.Landscape = ["Landscape",1];
flambe_display_Orientation.Landscape.toString = $estr;
flambe_display_Orientation.Landscape.__enum__ = flambe_display_Orientation;
var flambe_display_Texture = function() { };
$hxClasses["flambe.display.Texture"] = flambe_display_Texture;
flambe_display_Texture.__name__ = true;
flambe_display_Texture.__interfaces__ = [flambe_asset_Asset];
flambe_display_Texture.prototype = {
	__class__: flambe_display_Texture
};
var flambe_display_SubTexture = function() { };
$hxClasses["flambe.display.SubTexture"] = flambe_display_SubTexture;
flambe_display_SubTexture.__name__ = true;
flambe_display_SubTexture.__interfaces__ = [flambe_display_Texture];
var flambe_input_Key = $hxClasses["flambe.input.Key"] = { __ename__ : true, __constructs__ : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Number0","Number1","Number2","Number3","Number4","Number5","Number6","Number7","Number8","Number9","Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","NumpadAdd","NumpadDecimal","NumpadDivide","NumpadEnter","NumpadMultiply","NumpadSubtract","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","Left","Up","Right","Down","Alt","Backquote","Backslash","Backspace","CapsLock","Comma","Command","Control","Delete","End","Enter","Equals","Escape","Home","Insert","LeftBracket","Minus","PageDown","PageUp","Period","Quote","RightBracket","Semicolon","Shift","Slash","Space","Tab","Menu","Search","Unknown"] };
flambe_input_Key.A = ["A",0];
flambe_input_Key.A.toString = $estr;
flambe_input_Key.A.__enum__ = flambe_input_Key;
flambe_input_Key.B = ["B",1];
flambe_input_Key.B.toString = $estr;
flambe_input_Key.B.__enum__ = flambe_input_Key;
flambe_input_Key.C = ["C",2];
flambe_input_Key.C.toString = $estr;
flambe_input_Key.C.__enum__ = flambe_input_Key;
flambe_input_Key.D = ["D",3];
flambe_input_Key.D.toString = $estr;
flambe_input_Key.D.__enum__ = flambe_input_Key;
flambe_input_Key.E = ["E",4];
flambe_input_Key.E.toString = $estr;
flambe_input_Key.E.__enum__ = flambe_input_Key;
flambe_input_Key.F = ["F",5];
flambe_input_Key.F.toString = $estr;
flambe_input_Key.F.__enum__ = flambe_input_Key;
flambe_input_Key.G = ["G",6];
flambe_input_Key.G.toString = $estr;
flambe_input_Key.G.__enum__ = flambe_input_Key;
flambe_input_Key.H = ["H",7];
flambe_input_Key.H.toString = $estr;
flambe_input_Key.H.__enum__ = flambe_input_Key;
flambe_input_Key.I = ["I",8];
flambe_input_Key.I.toString = $estr;
flambe_input_Key.I.__enum__ = flambe_input_Key;
flambe_input_Key.J = ["J",9];
flambe_input_Key.J.toString = $estr;
flambe_input_Key.J.__enum__ = flambe_input_Key;
flambe_input_Key.K = ["K",10];
flambe_input_Key.K.toString = $estr;
flambe_input_Key.K.__enum__ = flambe_input_Key;
flambe_input_Key.L = ["L",11];
flambe_input_Key.L.toString = $estr;
flambe_input_Key.L.__enum__ = flambe_input_Key;
flambe_input_Key.M = ["M",12];
flambe_input_Key.M.toString = $estr;
flambe_input_Key.M.__enum__ = flambe_input_Key;
flambe_input_Key.N = ["N",13];
flambe_input_Key.N.toString = $estr;
flambe_input_Key.N.__enum__ = flambe_input_Key;
flambe_input_Key.O = ["O",14];
flambe_input_Key.O.toString = $estr;
flambe_input_Key.O.__enum__ = flambe_input_Key;
flambe_input_Key.P = ["P",15];
flambe_input_Key.P.toString = $estr;
flambe_input_Key.P.__enum__ = flambe_input_Key;
flambe_input_Key.Q = ["Q",16];
flambe_input_Key.Q.toString = $estr;
flambe_input_Key.Q.__enum__ = flambe_input_Key;
flambe_input_Key.R = ["R",17];
flambe_input_Key.R.toString = $estr;
flambe_input_Key.R.__enum__ = flambe_input_Key;
flambe_input_Key.S = ["S",18];
flambe_input_Key.S.toString = $estr;
flambe_input_Key.S.__enum__ = flambe_input_Key;
flambe_input_Key.T = ["T",19];
flambe_input_Key.T.toString = $estr;
flambe_input_Key.T.__enum__ = flambe_input_Key;
flambe_input_Key.U = ["U",20];
flambe_input_Key.U.toString = $estr;
flambe_input_Key.U.__enum__ = flambe_input_Key;
flambe_input_Key.V = ["V",21];
flambe_input_Key.V.toString = $estr;
flambe_input_Key.V.__enum__ = flambe_input_Key;
flambe_input_Key.W = ["W",22];
flambe_input_Key.W.toString = $estr;
flambe_input_Key.W.__enum__ = flambe_input_Key;
flambe_input_Key.X = ["X",23];
flambe_input_Key.X.toString = $estr;
flambe_input_Key.X.__enum__ = flambe_input_Key;
flambe_input_Key.Y = ["Y",24];
flambe_input_Key.Y.toString = $estr;
flambe_input_Key.Y.__enum__ = flambe_input_Key;
flambe_input_Key.Z = ["Z",25];
flambe_input_Key.Z.toString = $estr;
flambe_input_Key.Z.__enum__ = flambe_input_Key;
flambe_input_Key.Number0 = ["Number0",26];
flambe_input_Key.Number0.toString = $estr;
flambe_input_Key.Number0.__enum__ = flambe_input_Key;
flambe_input_Key.Number1 = ["Number1",27];
flambe_input_Key.Number1.toString = $estr;
flambe_input_Key.Number1.__enum__ = flambe_input_Key;
flambe_input_Key.Number2 = ["Number2",28];
flambe_input_Key.Number2.toString = $estr;
flambe_input_Key.Number2.__enum__ = flambe_input_Key;
flambe_input_Key.Number3 = ["Number3",29];
flambe_input_Key.Number3.toString = $estr;
flambe_input_Key.Number3.__enum__ = flambe_input_Key;
flambe_input_Key.Number4 = ["Number4",30];
flambe_input_Key.Number4.toString = $estr;
flambe_input_Key.Number4.__enum__ = flambe_input_Key;
flambe_input_Key.Number5 = ["Number5",31];
flambe_input_Key.Number5.toString = $estr;
flambe_input_Key.Number5.__enum__ = flambe_input_Key;
flambe_input_Key.Number6 = ["Number6",32];
flambe_input_Key.Number6.toString = $estr;
flambe_input_Key.Number6.__enum__ = flambe_input_Key;
flambe_input_Key.Number7 = ["Number7",33];
flambe_input_Key.Number7.toString = $estr;
flambe_input_Key.Number7.__enum__ = flambe_input_Key;
flambe_input_Key.Number8 = ["Number8",34];
flambe_input_Key.Number8.toString = $estr;
flambe_input_Key.Number8.__enum__ = flambe_input_Key;
flambe_input_Key.Number9 = ["Number9",35];
flambe_input_Key.Number9.toString = $estr;
flambe_input_Key.Number9.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad0 = ["Numpad0",36];
flambe_input_Key.Numpad0.toString = $estr;
flambe_input_Key.Numpad0.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad1 = ["Numpad1",37];
flambe_input_Key.Numpad1.toString = $estr;
flambe_input_Key.Numpad1.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad2 = ["Numpad2",38];
flambe_input_Key.Numpad2.toString = $estr;
flambe_input_Key.Numpad2.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad3 = ["Numpad3",39];
flambe_input_Key.Numpad3.toString = $estr;
flambe_input_Key.Numpad3.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad4 = ["Numpad4",40];
flambe_input_Key.Numpad4.toString = $estr;
flambe_input_Key.Numpad4.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad5 = ["Numpad5",41];
flambe_input_Key.Numpad5.toString = $estr;
flambe_input_Key.Numpad5.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad6 = ["Numpad6",42];
flambe_input_Key.Numpad6.toString = $estr;
flambe_input_Key.Numpad6.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad7 = ["Numpad7",43];
flambe_input_Key.Numpad7.toString = $estr;
flambe_input_Key.Numpad7.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad8 = ["Numpad8",44];
flambe_input_Key.Numpad8.toString = $estr;
flambe_input_Key.Numpad8.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad9 = ["Numpad9",45];
flambe_input_Key.Numpad9.toString = $estr;
flambe_input_Key.Numpad9.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadAdd = ["NumpadAdd",46];
flambe_input_Key.NumpadAdd.toString = $estr;
flambe_input_Key.NumpadAdd.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadDecimal = ["NumpadDecimal",47];
flambe_input_Key.NumpadDecimal.toString = $estr;
flambe_input_Key.NumpadDecimal.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadDivide = ["NumpadDivide",48];
flambe_input_Key.NumpadDivide.toString = $estr;
flambe_input_Key.NumpadDivide.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadEnter = ["NumpadEnter",49];
flambe_input_Key.NumpadEnter.toString = $estr;
flambe_input_Key.NumpadEnter.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadMultiply = ["NumpadMultiply",50];
flambe_input_Key.NumpadMultiply.toString = $estr;
flambe_input_Key.NumpadMultiply.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadSubtract = ["NumpadSubtract",51];
flambe_input_Key.NumpadSubtract.toString = $estr;
flambe_input_Key.NumpadSubtract.__enum__ = flambe_input_Key;
flambe_input_Key.F1 = ["F1",52];
flambe_input_Key.F1.toString = $estr;
flambe_input_Key.F1.__enum__ = flambe_input_Key;
flambe_input_Key.F2 = ["F2",53];
flambe_input_Key.F2.toString = $estr;
flambe_input_Key.F2.__enum__ = flambe_input_Key;
flambe_input_Key.F3 = ["F3",54];
flambe_input_Key.F3.toString = $estr;
flambe_input_Key.F3.__enum__ = flambe_input_Key;
flambe_input_Key.F4 = ["F4",55];
flambe_input_Key.F4.toString = $estr;
flambe_input_Key.F4.__enum__ = flambe_input_Key;
flambe_input_Key.F5 = ["F5",56];
flambe_input_Key.F5.toString = $estr;
flambe_input_Key.F5.__enum__ = flambe_input_Key;
flambe_input_Key.F6 = ["F6",57];
flambe_input_Key.F6.toString = $estr;
flambe_input_Key.F6.__enum__ = flambe_input_Key;
flambe_input_Key.F7 = ["F7",58];
flambe_input_Key.F7.toString = $estr;
flambe_input_Key.F7.__enum__ = flambe_input_Key;
flambe_input_Key.F8 = ["F8",59];
flambe_input_Key.F8.toString = $estr;
flambe_input_Key.F8.__enum__ = flambe_input_Key;
flambe_input_Key.F9 = ["F9",60];
flambe_input_Key.F9.toString = $estr;
flambe_input_Key.F9.__enum__ = flambe_input_Key;
flambe_input_Key.F10 = ["F10",61];
flambe_input_Key.F10.toString = $estr;
flambe_input_Key.F10.__enum__ = flambe_input_Key;
flambe_input_Key.F11 = ["F11",62];
flambe_input_Key.F11.toString = $estr;
flambe_input_Key.F11.__enum__ = flambe_input_Key;
flambe_input_Key.F12 = ["F12",63];
flambe_input_Key.F12.toString = $estr;
flambe_input_Key.F12.__enum__ = flambe_input_Key;
flambe_input_Key.F13 = ["F13",64];
flambe_input_Key.F13.toString = $estr;
flambe_input_Key.F13.__enum__ = flambe_input_Key;
flambe_input_Key.F14 = ["F14",65];
flambe_input_Key.F14.toString = $estr;
flambe_input_Key.F14.__enum__ = flambe_input_Key;
flambe_input_Key.F15 = ["F15",66];
flambe_input_Key.F15.toString = $estr;
flambe_input_Key.F15.__enum__ = flambe_input_Key;
flambe_input_Key.Left = ["Left",67];
flambe_input_Key.Left.toString = $estr;
flambe_input_Key.Left.__enum__ = flambe_input_Key;
flambe_input_Key.Up = ["Up",68];
flambe_input_Key.Up.toString = $estr;
flambe_input_Key.Up.__enum__ = flambe_input_Key;
flambe_input_Key.Right = ["Right",69];
flambe_input_Key.Right.toString = $estr;
flambe_input_Key.Right.__enum__ = flambe_input_Key;
flambe_input_Key.Down = ["Down",70];
flambe_input_Key.Down.toString = $estr;
flambe_input_Key.Down.__enum__ = flambe_input_Key;
flambe_input_Key.Alt = ["Alt",71];
flambe_input_Key.Alt.toString = $estr;
flambe_input_Key.Alt.__enum__ = flambe_input_Key;
flambe_input_Key.Backquote = ["Backquote",72];
flambe_input_Key.Backquote.toString = $estr;
flambe_input_Key.Backquote.__enum__ = flambe_input_Key;
flambe_input_Key.Backslash = ["Backslash",73];
flambe_input_Key.Backslash.toString = $estr;
flambe_input_Key.Backslash.__enum__ = flambe_input_Key;
flambe_input_Key.Backspace = ["Backspace",74];
flambe_input_Key.Backspace.toString = $estr;
flambe_input_Key.Backspace.__enum__ = flambe_input_Key;
flambe_input_Key.CapsLock = ["CapsLock",75];
flambe_input_Key.CapsLock.toString = $estr;
flambe_input_Key.CapsLock.__enum__ = flambe_input_Key;
flambe_input_Key.Comma = ["Comma",76];
flambe_input_Key.Comma.toString = $estr;
flambe_input_Key.Comma.__enum__ = flambe_input_Key;
flambe_input_Key.Command = ["Command",77];
flambe_input_Key.Command.toString = $estr;
flambe_input_Key.Command.__enum__ = flambe_input_Key;
flambe_input_Key.Control = ["Control",78];
flambe_input_Key.Control.toString = $estr;
flambe_input_Key.Control.__enum__ = flambe_input_Key;
flambe_input_Key.Delete = ["Delete",79];
flambe_input_Key.Delete.toString = $estr;
flambe_input_Key.Delete.__enum__ = flambe_input_Key;
flambe_input_Key.End = ["End",80];
flambe_input_Key.End.toString = $estr;
flambe_input_Key.End.__enum__ = flambe_input_Key;
flambe_input_Key.Enter = ["Enter",81];
flambe_input_Key.Enter.toString = $estr;
flambe_input_Key.Enter.__enum__ = flambe_input_Key;
flambe_input_Key.Equals = ["Equals",82];
flambe_input_Key.Equals.toString = $estr;
flambe_input_Key.Equals.__enum__ = flambe_input_Key;
flambe_input_Key.Escape = ["Escape",83];
flambe_input_Key.Escape.toString = $estr;
flambe_input_Key.Escape.__enum__ = flambe_input_Key;
flambe_input_Key.Home = ["Home",84];
flambe_input_Key.Home.toString = $estr;
flambe_input_Key.Home.__enum__ = flambe_input_Key;
flambe_input_Key.Insert = ["Insert",85];
flambe_input_Key.Insert.toString = $estr;
flambe_input_Key.Insert.__enum__ = flambe_input_Key;
flambe_input_Key.LeftBracket = ["LeftBracket",86];
flambe_input_Key.LeftBracket.toString = $estr;
flambe_input_Key.LeftBracket.__enum__ = flambe_input_Key;
flambe_input_Key.Minus = ["Minus",87];
flambe_input_Key.Minus.toString = $estr;
flambe_input_Key.Minus.__enum__ = flambe_input_Key;
flambe_input_Key.PageDown = ["PageDown",88];
flambe_input_Key.PageDown.toString = $estr;
flambe_input_Key.PageDown.__enum__ = flambe_input_Key;
flambe_input_Key.PageUp = ["PageUp",89];
flambe_input_Key.PageUp.toString = $estr;
flambe_input_Key.PageUp.__enum__ = flambe_input_Key;
flambe_input_Key.Period = ["Period",90];
flambe_input_Key.Period.toString = $estr;
flambe_input_Key.Period.__enum__ = flambe_input_Key;
flambe_input_Key.Quote = ["Quote",91];
flambe_input_Key.Quote.toString = $estr;
flambe_input_Key.Quote.__enum__ = flambe_input_Key;
flambe_input_Key.RightBracket = ["RightBracket",92];
flambe_input_Key.RightBracket.toString = $estr;
flambe_input_Key.RightBracket.__enum__ = flambe_input_Key;
flambe_input_Key.Semicolon = ["Semicolon",93];
flambe_input_Key.Semicolon.toString = $estr;
flambe_input_Key.Semicolon.__enum__ = flambe_input_Key;
flambe_input_Key.Shift = ["Shift",94];
flambe_input_Key.Shift.toString = $estr;
flambe_input_Key.Shift.__enum__ = flambe_input_Key;
flambe_input_Key.Slash = ["Slash",95];
flambe_input_Key.Slash.toString = $estr;
flambe_input_Key.Slash.__enum__ = flambe_input_Key;
flambe_input_Key.Space = ["Space",96];
flambe_input_Key.Space.toString = $estr;
flambe_input_Key.Space.__enum__ = flambe_input_Key;
flambe_input_Key.Tab = ["Tab",97];
flambe_input_Key.Tab.toString = $estr;
flambe_input_Key.Tab.__enum__ = flambe_input_Key;
flambe_input_Key.Menu = ["Menu",98];
flambe_input_Key.Menu.toString = $estr;
flambe_input_Key.Menu.__enum__ = flambe_input_Key;
flambe_input_Key.Search = ["Search",99];
flambe_input_Key.Search.toString = $estr;
flambe_input_Key.Search.__enum__ = flambe_input_Key;
flambe_input_Key.Unknown = function(keyCode) { var $x = ["Unknown",100,keyCode]; $x.__enum__ = flambe_input_Key; $x.toString = $estr; return $x; };
var flambe_input_KeyboardEvent = function() {
	this.init(0,null);
};
$hxClasses["flambe.input.KeyboardEvent"] = flambe_input_KeyboardEvent;
flambe_input_KeyboardEvent.__name__ = true;
flambe_input_KeyboardEvent.prototype = {
	init: function(id,key) {
		this.id = id;
		this.key = key;
	}
	,__class__: flambe_input_KeyboardEvent
};
var flambe_input_MouseButton = $hxClasses["flambe.input.MouseButton"] = { __ename__ : true, __constructs__ : ["Left","Middle","Right","Unknown"] };
flambe_input_MouseButton.Left = ["Left",0];
flambe_input_MouseButton.Left.toString = $estr;
flambe_input_MouseButton.Left.__enum__ = flambe_input_MouseButton;
flambe_input_MouseButton.Middle = ["Middle",1];
flambe_input_MouseButton.Middle.toString = $estr;
flambe_input_MouseButton.Middle.__enum__ = flambe_input_MouseButton;
flambe_input_MouseButton.Right = ["Right",2];
flambe_input_MouseButton.Right.toString = $estr;
flambe_input_MouseButton.Right.__enum__ = flambe_input_MouseButton;
flambe_input_MouseButton.Unknown = function(buttonCode) { var $x = ["Unknown",3,buttonCode]; $x.__enum__ = flambe_input_MouseButton; $x.toString = $estr; return $x; };
var flambe_input_MouseCursor = $hxClasses["flambe.input.MouseCursor"] = { __ename__ : true, __constructs__ : ["Default","Button","None"] };
flambe_input_MouseCursor.Default = ["Default",0];
flambe_input_MouseCursor.Default.toString = $estr;
flambe_input_MouseCursor.Default.__enum__ = flambe_input_MouseCursor;
flambe_input_MouseCursor.Button = ["Button",1];
flambe_input_MouseCursor.Button.toString = $estr;
flambe_input_MouseCursor.Button.__enum__ = flambe_input_MouseCursor;
flambe_input_MouseCursor.None = ["None",2];
flambe_input_MouseCursor.None.toString = $estr;
flambe_input_MouseCursor.None.__enum__ = flambe_input_MouseCursor;
var flambe_input_MouseEvent = function() {
	this.init(0,0,0,null);
};
$hxClasses["flambe.input.MouseEvent"] = flambe_input_MouseEvent;
flambe_input_MouseEvent.__name__ = true;
flambe_input_MouseEvent.prototype = {
	init: function(id,viewX,viewY,button) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.button = button;
	}
	,__class__: flambe_input_MouseEvent
};
var flambe_input_EventSource = $hxClasses["flambe.input.EventSource"] = { __ename__ : true, __constructs__ : ["Mouse","Touch"] };
flambe_input_EventSource.Mouse = function(event) { var $x = ["Mouse",0,event]; $x.__enum__ = flambe_input_EventSource; $x.toString = $estr; return $x; };
flambe_input_EventSource.Touch = function(point) { var $x = ["Touch",1,point]; $x.__enum__ = flambe_input_EventSource; $x.toString = $estr; return $x; };
var flambe_input_PointerEvent = function() {
	this.init(0,0,0,null,null);
};
$hxClasses["flambe.input.PointerEvent"] = flambe_input_PointerEvent;
flambe_input_PointerEvent.__name__ = true;
flambe_input_PointerEvent.prototype = {
	init: function(id,viewX,viewY,hit,source) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.hit = hit;
		this.source = source;
		this._stopped = false;
	}
	,__class__: flambe_input_PointerEvent
};
var flambe_input_TouchPoint = function(id) {
	this.id = id;
	this._source = flambe_input_EventSource.Touch(this);
};
$hxClasses["flambe.input.TouchPoint"] = flambe_input_TouchPoint;
flambe_input_TouchPoint.__name__ = true;
flambe_input_TouchPoint.prototype = {
	init: function(viewX,viewY) {
		this.viewX = viewX;
		this.viewY = viewY;
	}
	,__class__: flambe_input_TouchPoint
};
var flambe_math_FMath = function() { };
$hxClasses["flambe.math.FMath"] = flambe_math_FMath;
flambe_math_FMath.__name__ = true;
flambe_math_FMath.toRadians = function(degrees) {
	return degrees * 3.141592653589793 / 180;
};
flambe_math_FMath.max = function(a,b) {
	if(a > b) return a; else return b;
};
flambe_math_FMath.min = function(a,b) {
	if(a < b) return a; else return b;
};
var flambe_math_Matrix = function() {
	this.identity();
};
$hxClasses["flambe.math.Matrix"] = flambe_math_Matrix;
flambe_math_Matrix.__name__ = true;
flambe_math_Matrix.multiply = function(lhs,rhs,result) {
	if(result == null) result = new flambe_math_Matrix();
	var a = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10;
	var b = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11;
	var c = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02;
	result.m00 = a;
	result.m01 = b;
	result.m02 = c;
	a = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10;
	b = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11;
	c = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12;
	result.m10 = a;
	result.m11 = b;
	result.m12 = c;
	return result;
};
flambe_math_Matrix.prototype = {
	set: function(m00,m10,m01,m11,m02,m12) {
		this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
	}
	,identity: function() {
		this.set(1,0,0,1,0,0);
	}
	,compose: function(x,y,scaleX,scaleY,rotation) {
		var sin = Math.sin(rotation);
		var cos = Math.cos(rotation);
		this.set(cos * scaleX,sin * scaleX,-sin * scaleY,cos * scaleY,x,y);
	}
	,translate: function(x,y) {
		this.m02 += this.m00 * x + this.m01 * y;
		this.m12 += this.m11 * y + this.m10 * x;
	}
	,invert: function() {
		var det = this.determinant();
		if(det == 0) return false;
		this.set(this.m11 / det,-this.m01 / det,-this.m10 / det,this.m00 / det,(this.m01 * this.m12 - this.m11 * this.m02) / det,(this.m10 * this.m02 - this.m00 * this.m12) / det);
		return true;
	}
	,transform: function(x,y,result) {
		if(result == null) result = new flambe_math_Point();
		result.x = x * this.m00 + y * this.m01 + this.m02;
		result.y = x * this.m10 + y * this.m11 + this.m12;
		return result;
	}
	,transformArray: function(points,length,result) {
		var ii = 0;
		while(ii < length) {
			var x = points[ii];
			var y = points[ii + 1];
			result[ii++] = x * this.m00 + y * this.m01 + this.m02;
			result[ii++] = x * this.m10 + y * this.m11 + this.m12;
		}
	}
	,determinant: function() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	}
	,inverseTransform: function(x,y,result) {
		var det = this.determinant();
		if(det == 0) return false;
		x -= this.m02;
		y -= this.m12;
		result.x = (x * this.m11 - y * this.m01) / det;
		result.y = (y * this.m00 - x * this.m10) / det;
		return true;
	}
	,clone: function(result) {
		if(result == null) result = new flambe_math_Matrix();
		result.set(this.m00,this.m10,this.m01,this.m11,this.m02,this.m12);
		return result;
	}
	,toString: function() {
		return this.m00 + " " + this.m01 + " " + this.m02 + " \\ " + this.m10 + " " + this.m11 + " " + this.m12;
	}
	,__class__: flambe_math_Matrix
};
var flambe_math_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.set(x,y,width,height);
};
$hxClasses["flambe.math.Rectangle"] = flambe_math_Rectangle;
flambe_math_Rectangle.__name__ = true;
flambe_math_Rectangle.prototype = {
	set: function(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	,contains: function(x,y) {
		x -= this.x;
		if(this.width >= 0) {
			if(x < 0 || x > this.width) return false;
		} else if(x > 0 || x < this.width) return false;
		y -= this.y;
		if(this.height >= 0) {
			if(y < 0 || y > this.height) return false;
		} else if(y > 0 || y < this.height) return false;
		return true;
	}
	,clone: function(result) {
		if(result == null) result = new flambe_math_Rectangle();
		result.set(this.x,this.y,this.width,this.height);
		return result;
	}
	,equals: function(other) {
		return this.x == other.x && this.y == other.y && this.width == other.width && this.height == other.height;
	}
	,toString: function() {
		return "(" + this.x + "," + this.y + " " + this.width + "x" + this.height + ")";
	}
	,__class__: flambe_math_Rectangle
};
var flambe_platform_BasicAsset = function() {
	this._reloadCount = null;
	this._disposed = false;
};
$hxClasses["flambe.platform.BasicAsset"] = flambe_platform_BasicAsset;
flambe_platform_BasicAsset.__name__ = true;
flambe_platform_BasicAsset.__interfaces__ = [flambe_asset_Asset];
flambe_platform_BasicAsset.prototype = {
	assertNotDisposed: function() {
		flambe_util_Assert.that(!this._disposed,"Asset cannot be used after being disposed");
	}
	,reload: function(asset) {
		this.dispose();
		this._disposed = false;
		this.copyFrom(asset);
		var _g = this.get_reloadCount();
		_g.set__(_g.get__() + 1);
	}
	,dispose: function() {
		if(!this._disposed) {
			this._disposed = true;
			this.onDisposed();
		}
	}
	,copyFrom: function(asset) {
		flambe_util_Assert.fail();
	}
	,onDisposed: function() {
		flambe_util_Assert.fail();
	}
	,get_reloadCount: function() {
		if(this._reloadCount == null) this._reloadCount = new flambe_util_Value(0);
		return this._reloadCount;
	}
	,__class__: flambe_platform_BasicAsset
};
var flambe_platform_BasicAssetPackLoader = function(platform,manifest) {
	var _g = this;
	this.manifest = manifest;
	this._platform = platform;
	this.promise = new flambe_util_Promise();
	this._bytesLoaded = new haxe_ds_StringMap();
	this._pack = new flambe_platform__$BasicAssetPackLoader_BasicAssetPack(manifest,this);
	var entries = Lambda.array(manifest);
	if(entries.length == 0) this.handleSuccess(); else {
		var groups = new haxe_ds_StringMap();
		var _g1 = 0;
		while(_g1 < entries.length) {
			var entry = entries[_g1];
			++_g1;
			var group = groups.get(entry.name);
			if(group == null) {
				group = [];
				groups.set(entry.name,group);
			}
			group.push(entry);
		}
		this._assetsRemaining = Lambda.count(groups);
		var $it0 = groups.iterator();
		while( $it0.hasNext() ) {
			var group1 = $it0.next();
			var group2 = [group1];
			this.pickBestEntry(group2[0],(function(group2) {
				return function(bestEntry) {
					if(bestEntry != null) {
						var url = manifest.getFullURL(bestEntry);
						try {
							_g.loadEntry(url,bestEntry);
						} catch( error ) {
							_g.handleError(bestEntry,"Unexpected error: " + Std.string(error));
						}
						var _g11 = _g.promise;
						_g11.set_total(_g11.get_total() + bestEntry.bytes);
					} else {
						var badEntry = group2[0][0];
						if(flambe_platform_BasicAssetPackLoader.isAudio(badEntry.format)) {
							flambe_Log.warn("Could not find a supported audio format to load",["name",badEntry.name]);
							_g.handleLoad(badEntry,flambe_platform_DummySound.getInstance());
						} else _g.handleError(badEntry,"Could not find a supported format to load");
					}
				};
			})(group2));
		}
	}
	var catapult = this._platform.getCatapultClient();
	if(catapult != null) catapult.add(this);
};
$hxClasses["flambe.platform.BasicAssetPackLoader"] = flambe_platform_BasicAssetPackLoader;
flambe_platform_BasicAssetPackLoader.__name__ = true;
flambe_platform_BasicAssetPackLoader.removeUrlParams = function(url) {
	var query = url.indexOf("?");
	if(query > 0) return HxOverrides.substr(url,0,query); else return url;
};
flambe_platform_BasicAssetPackLoader.isAudio = function(format) {
	switch(Type.enumIndex(format)) {
	case 8:case 9:case 10:case 11:case 12:
		return true;
	default:
		return false;
	}
};
flambe_platform_BasicAssetPackLoader.prototype = {
	reload: function(url) {
		var _g = this;
		var baseUrl = flambe_platform_BasicAssetPackLoader.removeUrlParams(url);
		var foundEntry = null;
		var $it0 = this.manifest.iterator();
		while( $it0.hasNext() ) {
			var entry = $it0.next();
			if(baseUrl == flambe_platform_BasicAssetPackLoader.removeUrlParams(entry.url)) {
				foundEntry = entry;
				break;
			}
		}
		if(foundEntry != null) this.getAssetFormats(function(formats) {
			if(formats.indexOf(foundEntry.format) >= 0) {
				var entry1 = new flambe_asset_AssetEntry(foundEntry.name,url,foundEntry.format,0);
				_g.loadEntry(_g.manifest.getFullURL(entry1),entry1);
			}
		});
	}
	,onDisposed: function() {
		var catapult = this._platform.getCatapultClient();
		if(catapult != null) catapult.remove(this);
	}
	,pickBestEntry: function(entries,fn) {
		var onFormatsAvailable = function(formats) {
			var _g = 0;
			while(_g < formats.length) {
				var format = formats[_g];
				++_g;
				var _g1 = 0;
				while(_g1 < entries.length) {
					var entry = entries[_g1];
					++_g1;
					if(entry.format == format) {
						fn(entry);
						return;
					}
				}
			}
			fn(null);
		};
		this.getAssetFormats(onFormatsAvailable);
	}
	,loadEntry: function(url,entry) {
		flambe_util_Assert.fail();
	}
	,getAssetFormats: function(fn) {
		flambe_util_Assert.fail();
	}
	,handleLoad: function(entry,asset) {
		if(this._pack.disposed) return;
		this.handleProgress(entry,entry.bytes);
		var map;
		var _g = entry.format;
		switch(Type.enumIndex(_g)) {
		case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
			map = this._pack.textures;
			break;
		case 8:case 9:case 10:case 11:case 12:
			map = this._pack.sounds;
			break;
		case 13:
			map = this._pack.files;
			break;
		}
		var oldAsset = map.get(entry.name);
		if(oldAsset != null) {
			flambe_Log.info("Reloaded asset",["url",entry.url]);
			oldAsset.reload(asset);
		} else {
			map.set(entry.name,asset);
			this._assetsRemaining -= 1;
			if(this._assetsRemaining == 0) this.handleSuccess();
		}
	}
	,handleProgress: function(entry,bytesLoaded) {
		this._bytesLoaded.set(entry.name,bytesLoaded);
		var bytesTotal = 0;
		var $it0 = this._bytesLoaded.iterator();
		while( $it0.hasNext() ) {
			var bytes = $it0.next();
			bytesTotal += bytes;
		}
		this.promise.set_progress(bytesTotal);
	}
	,handleSuccess: function() {
		this.promise.set_result(this._pack);
	}
	,handleError: function(entry,message) {
		flambe_Log.warn("Error loading asset pack",["error",message,"url",entry.url]);
		this.promise.error.emit(flambe_util_Strings.withFields(message,["url",entry.url]));
	}
	,handleTextureError: function(entry) {
		this.handleError(entry,"Failed to create texture. Is the GPU context unavailable?");
	}
	,__class__: flambe_platform_BasicAssetPackLoader
};
var flambe_platform__$BasicAssetPackLoader_BasicAssetPack = function(manifest,loader) {
	this.disposed = false;
	this._manifest = manifest;
	this.loader = loader;
	this.textures = new haxe_ds_StringMap();
	this.sounds = new haxe_ds_StringMap();
	this.files = new haxe_ds_StringMap();
};
$hxClasses["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = flambe_platform__$BasicAssetPackLoader_BasicAssetPack;
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.__name__ = true;
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.__interfaces__ = [flambe_asset_AssetPack];
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.warnOnExtension = function(path) {
	var ext = flambe_util_Strings.getFileExtension(path);
	if(ext != null && ext.length == 3) flambe_Log.warn("Requested asset \"" + path + "\" should not have a file extension," + " did you mean \"" + flambe_util_Strings.removeFileExtension(path) + "\"?");
};
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.prototype = {
	getTexture: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		flambe_platform__$BasicAssetPackLoader_BasicAssetPack.warnOnExtension(name);
		var texture = this.textures.get(name);
		if(texture == null && required) throw flambe_util_Strings.withFields("Missing texture",["name",name]);
		return texture;
	}
	,getSound: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		flambe_platform__$BasicAssetPackLoader_BasicAssetPack.warnOnExtension(name);
		var sound = this.sounds.get(name);
		if(sound == null && required) throw flambe_util_Strings.withFields("Missing sound",["name",name]);
		return sound;
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		var file = this.files.get(name);
		if(file == null && required) throw flambe_util_Strings.withFields("Missing file",["name",name]);
		return file;
	}
	,dispose: function() {
		if(!this.disposed) {
			this.disposed = true;
			var $it0 = this.textures.iterator();
			while( $it0.hasNext() ) {
				var texture = $it0.next();
				texture.dispose();
			}
			this.textures = null;
			var $it1 = this.sounds.iterator();
			while( $it1.hasNext() ) {
				var sound = $it1.next();
				sound.dispose();
			}
			this.sounds = null;
			var $it2 = this.files.iterator();
			while( $it2.hasNext() ) {
				var file = $it2.next();
				file.dispose();
			}
			this.files = null;
			this.loader.onDisposed();
		}
	}
	,assertNotDisposed: function() {
		flambe_util_Assert.that(!this.disposed,"AssetPack cannot be used after being disposed");
	}
	,__class__: flambe_platform__$BasicAssetPackLoader_BasicAssetPack
};
var flambe_platform_BasicFile = function(content) {
	flambe_platform_BasicAsset.call(this);
	this._content = content;
};
$hxClasses["flambe.platform.BasicFile"] = flambe_platform_BasicFile;
flambe_platform_BasicFile.__name__ = true;
flambe_platform_BasicFile.__interfaces__ = [flambe_asset_File];
flambe_platform_BasicFile.__super__ = flambe_platform_BasicAsset;
flambe_platform_BasicFile.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	toString: function() {
		this.assertNotDisposed();
		return this._content;
	}
	,copyFrom: function(that) {
		this._content = that._content;
	}
	,onDisposed: function() {
		this._content = null;
	}
	,__class__: flambe_platform_BasicFile
});
var flambe_subsystem_KeyboardSystem = function() { };
$hxClasses["flambe.subsystem.KeyboardSystem"] = flambe_subsystem_KeyboardSystem;
flambe_subsystem_KeyboardSystem.__name__ = true;
flambe_subsystem_KeyboardSystem.prototype = {
	__class__: flambe_subsystem_KeyboardSystem
};
var flambe_platform_BasicKeyboard = function() {
	this.down = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
	this.backButton = new flambe_util_Signal0();
	this._keyStates = new haxe_ds_IntMap();
};
$hxClasses["flambe.platform.BasicKeyboard"] = flambe_platform_BasicKeyboard;
flambe_platform_BasicKeyboard.__name__ = true;
flambe_platform_BasicKeyboard.__interfaces__ = [flambe_subsystem_KeyboardSystem];
flambe_platform_BasicKeyboard.prototype = {
	isDown: function(key) {
		return this.isCodeDown(flambe_platform_KeyCodes.toKeyCode(key));
	}
	,isCodeDown: function(keyCode) {
		return this._keyStates.exists(keyCode);
	}
	,submitDown: function(keyCode) {
		if(keyCode == 16777238) {
			if(this.backButton.hasListeners()) {
				this.backButton.emit();
				return true;
			}
			return false;
		}
		if(!this.isCodeDown(keyCode)) {
			this._keyStates.set(keyCode,true);
			flambe_platform_BasicKeyboard._sharedEvent.init(flambe_platform_BasicKeyboard._sharedEvent.id + 1,flambe_platform_KeyCodes.toKey(keyCode));
			this.down.emit(flambe_platform_BasicKeyboard._sharedEvent);
		}
		return true;
	}
	,submitUp: function(keyCode) {
		if(this.isCodeDown(keyCode)) {
			this._keyStates.remove(keyCode);
			flambe_platform_BasicKeyboard._sharedEvent.init(flambe_platform_BasicKeyboard._sharedEvent.id + 1,flambe_platform_KeyCodes.toKey(keyCode));
			this.up.emit(flambe_platform_BasicKeyboard._sharedEvent);
		}
	}
	,__class__: flambe_platform_BasicKeyboard
};
var flambe_subsystem_MouseSystem = function() { };
$hxClasses["flambe.subsystem.MouseSystem"] = flambe_subsystem_MouseSystem;
flambe_subsystem_MouseSystem.__name__ = true;
var flambe_platform_BasicMouse = function(pointer) {
	this._pointer = pointer;
	this._source = flambe_input_EventSource.Mouse(flambe_platform_BasicMouse._sharedEvent);
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
	this.scroll = new flambe_util_Signal1();
	this._x = 0;
	this._y = 0;
	this._cursor = flambe_input_MouseCursor.Default;
	this._buttonStates = new haxe_ds_IntMap();
};
$hxClasses["flambe.platform.BasicMouse"] = flambe_platform_BasicMouse;
flambe_platform_BasicMouse.__name__ = true;
flambe_platform_BasicMouse.__interfaces__ = [flambe_subsystem_MouseSystem];
flambe_platform_BasicMouse.prototype = {
	submitDown: function(viewX,viewY,buttonCode) {
		if(!this.isCodeDown(buttonCode)) {
			this._buttonStates.set(buttonCode,true);
			this.prepare(viewX,viewY,flambe_platform_MouseCodes.toButton(buttonCode));
			this._pointer.submitDown(viewX,viewY,this._source);
			this.down.emit(flambe_platform_BasicMouse._sharedEvent);
		}
	}
	,submitMove: function(viewX,viewY) {
		this.prepare(viewX,viewY,null);
		this._pointer.submitMove(viewX,viewY,this._source);
		this.move.emit(flambe_platform_BasicMouse._sharedEvent);
	}
	,submitUp: function(viewX,viewY,buttonCode) {
		if(this.isCodeDown(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,flambe_platform_MouseCodes.toButton(buttonCode));
			this._pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(flambe_platform_BasicMouse._sharedEvent);
		}
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this._x = viewX;
		this._y = viewY;
		if(!this.scroll.hasListeners()) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,isCodeDown: function(buttonCode) {
		return this._buttonStates.exists(buttonCode);
	}
	,prepare: function(viewX,viewY,button) {
		this._x = viewX;
		this._y = viewY;
		flambe_platform_BasicMouse._sharedEvent.init(flambe_platform_BasicMouse._sharedEvent.id + 1,viewX,viewY,button);
	}
	,__class__: flambe_platform_BasicMouse
};
var flambe_subsystem_PointerSystem = function() { };
$hxClasses["flambe.subsystem.PointerSystem"] = flambe_subsystem_PointerSystem;
flambe_subsystem_PointerSystem.__name__ = true;
flambe_subsystem_PointerSystem.prototype = {
	__class__: flambe_subsystem_PointerSystem
};
var flambe_platform_BasicPointer = function(x,y,isDown) {
	if(isDown == null) isDown = false;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
	this._x = x;
	this._y = y;
	this._isDown = isDown;
};
$hxClasses["flambe.platform.BasicPointer"] = flambe_platform_BasicPointer;
flambe_platform_BasicPointer.__name__ = true;
flambe_platform_BasicPointer.__interfaces__ = [flambe_subsystem_PointerSystem];
flambe_platform_BasicPointer.prototype = {
	get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,isDown: function() {
		return this._isDown;
	}
	,submitDown: function(viewX,viewY,source) {
		if(this._isDown) return;
		this.submitMove(viewX,viewY,source);
		this._isDown = true;
		var chain = [];
		var hit = flambe_display_Sprite.hitTest(flambe_System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite;
				var component = entity.getComponent("Sprite_2");
				sprite = component;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite1 = chain[_g];
			++_g;
			sprite1.onPointerDown(flambe_platform_BasicPointer._sharedEvent);
			if(flambe_platform_BasicPointer._sharedEvent._stopped) return;
		}
		this.down.emit(flambe_platform_BasicPointer._sharedEvent);
	}
	,submitMove: function(viewX,viewY,source) {
		if(viewX == this._x && viewY == this._y) return;
		var chain = [];
		var hit = flambe_display_Sprite.hitTest(flambe_System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite;
				var component = entity.getComponent("Sprite_2");
				sprite = component;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite1 = chain[_g];
			++_g;
			sprite1.onPointerMove(flambe_platform_BasicPointer._sharedEvent);
			if(flambe_platform_BasicPointer._sharedEvent._stopped) return;
		}
		this.move.emit(flambe_platform_BasicPointer._sharedEvent);
	}
	,submitUp: function(viewX,viewY,source) {
		if(!this._isDown) return;
		this.submitMove(viewX,viewY,source);
		this._isDown = false;
		var chain = [];
		var hit = flambe_display_Sprite.hitTest(flambe_System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite;
				var component = entity.getComponent("Sprite_2");
				sprite = component;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite1 = chain[_g];
			++_g;
			sprite1.onPointerUp(flambe_platform_BasicPointer._sharedEvent);
			if(flambe_platform_BasicPointer._sharedEvent._stopped) return;
		}
		this.up.emit(flambe_platform_BasicPointer._sharedEvent);
	}
	,prepare: function(viewX,viewY,hit,source) {
		this._x = viewX;
		this._y = viewY;
		flambe_platform_BasicPointer._sharedEvent.init(flambe_platform_BasicPointer._sharedEvent.id + 1,viewX,viewY,hit,source);
	}
	,__class__: flambe_platform_BasicPointer
};
var flambe_platform_BasicTexture = function(root,width,height) {
	this._y = 0;
	this._x = 0;
	this._parent = null;
	this.rootY = 0;
	this.rootX = 0;
	flambe_platform_BasicAsset.call(this);
	this.root = root;
	this._width = width;
	this._height = height;
};
$hxClasses["flambe.platform.BasicTexture"] = flambe_platform_BasicTexture;
flambe_platform_BasicTexture.__name__ = true;
flambe_platform_BasicTexture.__interfaces__ = [flambe_display_SubTexture];
flambe_platform_BasicTexture.__super__ = flambe_platform_BasicAsset;
flambe_platform_BasicTexture.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	copyFrom: function(that) {
		this.root._disposed = false;
		this.root.copyFrom(that.root);
		this._width = that._width;
		this._height = that._height;
		flambe_util_Assert.that(this.rootX == that.rootX && this.rootY == that.rootY && this._x == that._x && this._y == that._y);
	}
	,onDisposed: function() {
		if(this._parent == null) this.root.dispose();
	}
	,get_reloadCount: function() {
		return this.root.get_reloadCount();
	}
	,get_width: function() {
		return this._width;
	}
	,get_height: function() {
		return this._height;
	}
	,__class__: flambe_platform_BasicTexture
});
var flambe_subsystem_TouchSystem = function() { };
$hxClasses["flambe.subsystem.TouchSystem"] = flambe_subsystem_TouchSystem;
flambe_subsystem_TouchSystem.__name__ = true;
var flambe_platform_BasicTouch = function(pointer,maxPoints) {
	if(maxPoints == null) maxPoints = 4;
	this._pointer = pointer;
	this._maxPoints = maxPoints;
	this._pointMap = new haxe_ds_IntMap();
	this._points = [];
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
};
$hxClasses["flambe.platform.BasicTouch"] = flambe_platform_BasicTouch;
flambe_platform_BasicTouch.__name__ = true;
flambe_platform_BasicTouch.__interfaces__ = [flambe_subsystem_TouchSystem];
flambe_platform_BasicTouch.prototype = {
	submitDown: function(id,viewX,viewY) {
		if(!this._pointMap.exists(id)) {
			var point = new flambe_input_TouchPoint(id);
			point.init(viewX,viewY);
			this._pointMap.set(id,point);
			this._points.push(point);
			if(this._pointerTouch == null) {
				this._pointerTouch = point;
				this._pointer.submitDown(viewX,viewY,point._source);
			}
			this.down.emit(point);
		}
	}
	,submitMove: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			if(this._pointerTouch == point) this._pointer.submitMove(viewX,viewY,point._source);
			this.move.emit(point);
		}
	}
	,submitUp: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			this._pointMap.remove(id);
			HxOverrides.remove(this._points,point);
			if(this._pointerTouch == point) {
				this._pointerTouch = null;
				this._pointer.submitUp(viewX,viewY,point._source);
			}
			this.up.emit(point);
		}
	}
	,__class__: flambe_platform_BasicTouch
};
var flambe_platform_CatapultClient = function() {
	this._loaders = [];
};
$hxClasses["flambe.platform.CatapultClient"] = flambe_platform_CatapultClient;
flambe_platform_CatapultClient.__name__ = true;
flambe_platform_CatapultClient.prototype = {
	add: function(loader) {
		if(loader.manifest.get_localBase() == "assets") this._loaders.push(loader);
	}
	,remove: function(loader) {
		HxOverrides.remove(this._loaders,loader);
	}
	,onError: function(cause) {
		flambe_Log.warn("Unable to connect to Catapult",["cause",cause]);
	}
	,onMessage: function(message) {
		var message1 = JSON.parse(message);
		var _g = message1.type;
		switch(_g) {
		case "file_changed":
			var url = message1.name + "?v=" + message1.md5;
			url = StringTools.replace(url,"\\","/");
			var _g1 = 0;
			var _g2 = this._loaders;
			while(_g1 < _g2.length) {
				var loader = _g2[_g1];
				++_g1;
				loader.reload(url);
			}
			break;
		case "restart":
			this.onRestart();
			break;
		}
	}
	,onRestart: function() {
		flambe_util_Assert.fail();
	}
	,__class__: flambe_platform_CatapultClient
};
var flambe_platform_DebugLogic = function(platform) {
	var _g = this;
	this._platform = platform;
	platform.getKeyboard().down.connect(function(event) {
		if(event.key == flambe_input_Key.O && platform.getKeyboard().isDown(flambe_input_Key.Control)) {
			if(_g.toggleOverdrawGraphics()) flambe_Log.info("Enabled overdraw visualizer, press Ctrl-O again to disable");
		}
	});
};
$hxClasses["flambe.platform.DebugLogic"] = flambe_platform_DebugLogic;
flambe_platform_DebugLogic.__name__ = true;
flambe_platform_DebugLogic.prototype = {
	toggleOverdrawGraphics: function() {
		var renderer = this._platform.getRenderer();
		if(this._savedGraphics != null) {
			renderer.graphics = this._savedGraphics;
			this._savedGraphics = null;
		} else if(renderer.graphics != null) {
			this._savedGraphics = renderer.graphics;
			renderer.graphics = new flambe_platform_OverdrawGraphics(this._savedGraphics);
			return true;
		}
		return false;
	}
	,__class__: flambe_platform_DebugLogic
};
var flambe_sound_Sound = function() { };
$hxClasses["flambe.sound.Sound"] = flambe_sound_Sound;
flambe_sound_Sound.__name__ = true;
flambe_sound_Sound.__interfaces__ = [flambe_asset_Asset];
flambe_sound_Sound.prototype = {
	__class__: flambe_sound_Sound
};
var flambe_platform_DummySound = function() {
	flambe_platform_BasicAsset.call(this);
	this._playback = new flambe_platform_DummyPlayback(this);
};
$hxClasses["flambe.platform.DummySound"] = flambe_platform_DummySound;
flambe_platform_DummySound.__name__ = true;
flambe_platform_DummySound.__interfaces__ = [flambe_sound_Sound];
flambe_platform_DummySound.getInstance = function() {
	if(flambe_platform_DummySound._instance == null) flambe_platform_DummySound._instance = new flambe_platform_DummySound();
	return flambe_platform_DummySound._instance;
};
flambe_platform_DummySound.__super__ = flambe_platform_BasicAsset;
flambe_platform_DummySound.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	play: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,copyFrom: function(asset) {
	}
	,onDisposed: function() {
	}
	,__class__: flambe_platform_DummySound
});
var flambe_sound_Playback = function() { };
$hxClasses["flambe.sound.Playback"] = flambe_sound_Playback;
flambe_sound_Playback.__name__ = true;
flambe_sound_Playback.__interfaces__ = [flambe_util_Disposable];
var flambe_platform_DummyPlayback = function(sound) {
	this._sound = sound;
	this.volume = new flambe_animation_AnimatedFloat(0);
	this._complete = new flambe_util_Value(true);
};
$hxClasses["flambe.platform.DummyPlayback"] = flambe_platform_DummyPlayback;
flambe_platform_DummyPlayback.__name__ = true;
flambe_platform_DummyPlayback.__interfaces__ = [flambe_sound_Playback];
flambe_platform_DummyPlayback.prototype = {
	dispose: function() {
	}
	,__class__: flambe_platform_DummyPlayback
};
var flambe_platform_DummyTouch = function() {
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
};
$hxClasses["flambe.platform.DummyTouch"] = flambe_platform_DummyTouch;
flambe_platform_DummyTouch.__name__ = true;
flambe_platform_DummyTouch.__interfaces__ = [flambe_subsystem_TouchSystem];
flambe_platform_DummyTouch.prototype = {
	__class__: flambe_platform_DummyTouch
};
var flambe_platform_EventGroup = function() {
	this._entries = [];
};
$hxClasses["flambe.platform.EventGroup"] = flambe_platform_EventGroup;
flambe_platform_EventGroup.__name__ = true;
flambe_platform_EventGroup.__interfaces__ = [flambe_util_Disposable];
flambe_platform_EventGroup.prototype = {
	addListener: function(dispatcher,type,listener) {
		dispatcher.addEventListener(type,listener,false);
		this._entries.push(new flambe_platform__$EventGroup_Entry(dispatcher,type,listener));
	}
	,addDisposingListener: function(dispatcher,type,listener) {
		var _g = this;
		this.addListener(dispatcher,type,function(event) {
			_g.dispose();
			listener(event);
		});
	}
	,dispose: function() {
		var _g = 0;
		var _g1 = this._entries;
		while(_g < _g1.length) {
			var entry = _g1[_g];
			++_g;
			entry.dispatcher.removeEventListener(entry.type,entry.listener,false);
		}
		this._entries = [];
	}
	,__class__: flambe_platform_EventGroup
};
var flambe_platform__$EventGroup_Entry = function(dispatcher,type,listener) {
	this.dispatcher = dispatcher;
	this.type = type;
	this.listener = listener;
};
$hxClasses["flambe.platform._EventGroup.Entry"] = flambe_platform__$EventGroup_Entry;
flambe_platform__$EventGroup_Entry.__name__ = true;
flambe_platform__$EventGroup_Entry.prototype = {
	__class__: flambe_platform__$EventGroup_Entry
};
var flambe_platform_InternalGraphics = function() { };
$hxClasses["flambe.platform.InternalGraphics"] = flambe_platform_InternalGraphics;
flambe_platform_InternalGraphics.__name__ = true;
flambe_platform_InternalGraphics.__interfaces__ = [flambe_display_Graphics];
flambe_platform_InternalGraphics.prototype = {
	__class__: flambe_platform_InternalGraphics
};
var flambe_subsystem_RendererSystem = function() { };
$hxClasses["flambe.subsystem.RendererSystem"] = flambe_subsystem_RendererSystem;
flambe_subsystem_RendererSystem.__name__ = true;
flambe_subsystem_RendererSystem.prototype = {
	__class__: flambe_subsystem_RendererSystem
};
var flambe_platform_InternalRenderer = function() { };
$hxClasses["flambe.platform.InternalRenderer"] = flambe_platform_InternalRenderer;
flambe_platform_InternalRenderer.__name__ = true;
flambe_platform_InternalRenderer.__interfaces__ = [flambe_subsystem_RendererSystem];
flambe_platform_InternalRenderer.prototype = {
	__class__: flambe_platform_InternalRenderer
};
var flambe_platform_KeyCodes = function() { };
$hxClasses["flambe.platform.KeyCodes"] = flambe_platform_KeyCodes;
flambe_platform_KeyCodes.__name__ = true;
flambe_platform_KeyCodes.toKey = function(keyCode) {
	switch(keyCode) {
	case 65:
		return flambe_input_Key.A;
	case 66:
		return flambe_input_Key.B;
	case 67:
		return flambe_input_Key.C;
	case 68:
		return flambe_input_Key.D;
	case 69:
		return flambe_input_Key.E;
	case 70:
		return flambe_input_Key.F;
	case 71:
		return flambe_input_Key.G;
	case 72:
		return flambe_input_Key.H;
	case 73:
		return flambe_input_Key.I;
	case 74:
		return flambe_input_Key.J;
	case 75:
		return flambe_input_Key.K;
	case 76:
		return flambe_input_Key.L;
	case 77:
		return flambe_input_Key.M;
	case 78:
		return flambe_input_Key.N;
	case 79:
		return flambe_input_Key.O;
	case 80:
		return flambe_input_Key.P;
	case 81:
		return flambe_input_Key.Q;
	case 82:
		return flambe_input_Key.R;
	case 83:
		return flambe_input_Key.S;
	case 84:
		return flambe_input_Key.T;
	case 85:
		return flambe_input_Key.U;
	case 86:
		return flambe_input_Key.V;
	case 87:
		return flambe_input_Key.W;
	case 88:
		return flambe_input_Key.X;
	case 89:
		return flambe_input_Key.Y;
	case 90:
		return flambe_input_Key.Z;
	case 48:
		return flambe_input_Key.Number0;
	case 49:
		return flambe_input_Key.Number1;
	case 50:
		return flambe_input_Key.Number2;
	case 51:
		return flambe_input_Key.Number3;
	case 52:
		return flambe_input_Key.Number4;
	case 53:
		return flambe_input_Key.Number5;
	case 54:
		return flambe_input_Key.Number6;
	case 55:
		return flambe_input_Key.Number7;
	case 56:
		return flambe_input_Key.Number8;
	case 57:
		return flambe_input_Key.Number9;
	case 96:
		return flambe_input_Key.Numpad0;
	case 97:
		return flambe_input_Key.Numpad1;
	case 98:
		return flambe_input_Key.Numpad2;
	case 99:
		return flambe_input_Key.Numpad3;
	case 100:
		return flambe_input_Key.Numpad4;
	case 101:
		return flambe_input_Key.Numpad5;
	case 102:
		return flambe_input_Key.Numpad6;
	case 103:
		return flambe_input_Key.Numpad7;
	case 104:
		return flambe_input_Key.Numpad8;
	case 105:
		return flambe_input_Key.Numpad9;
	case 107:
		return flambe_input_Key.NumpadAdd;
	case 110:
		return flambe_input_Key.NumpadDecimal;
	case 111:
		return flambe_input_Key.NumpadDivide;
	case 108:
		return flambe_input_Key.NumpadEnter;
	case 106:
		return flambe_input_Key.NumpadMultiply;
	case 109:
		return flambe_input_Key.NumpadSubtract;
	case 112:
		return flambe_input_Key.F1;
	case 113:
		return flambe_input_Key.F2;
	case 114:
		return flambe_input_Key.F3;
	case 115:
		return flambe_input_Key.F4;
	case 116:
		return flambe_input_Key.F5;
	case 117:
		return flambe_input_Key.F6;
	case 118:
		return flambe_input_Key.F7;
	case 119:
		return flambe_input_Key.F8;
	case 120:
		return flambe_input_Key.F9;
	case 121:
		return flambe_input_Key.F10;
	case 122:
		return flambe_input_Key.F11;
	case 123:
		return flambe_input_Key.F12;
	case 37:
		return flambe_input_Key.Left;
	case 38:
		return flambe_input_Key.Up;
	case 39:
		return flambe_input_Key.Right;
	case 40:
		return flambe_input_Key.Down;
	case 18:
		return flambe_input_Key.Alt;
	case 192:
		return flambe_input_Key.Backquote;
	case 220:
		return flambe_input_Key.Backslash;
	case 8:
		return flambe_input_Key.Backspace;
	case 20:
		return flambe_input_Key.CapsLock;
	case 188:
		return flambe_input_Key.Comma;
	case 15:
		return flambe_input_Key.Command;
	case 17:
		return flambe_input_Key.Control;
	case 46:
		return flambe_input_Key.Delete;
	case 35:
		return flambe_input_Key.End;
	case 13:
		return flambe_input_Key.Enter;
	case 187:
		return flambe_input_Key.Equals;
	case 27:
		return flambe_input_Key.Escape;
	case 36:
		return flambe_input_Key.Home;
	case 45:
		return flambe_input_Key.Insert;
	case 219:
		return flambe_input_Key.LeftBracket;
	case 189:
		return flambe_input_Key.Minus;
	case 34:
		return flambe_input_Key.PageDown;
	case 33:
		return flambe_input_Key.PageUp;
	case 190:
		return flambe_input_Key.Period;
	case 222:
		return flambe_input_Key.Quote;
	case 221:
		return flambe_input_Key.RightBracket;
	case 186:
		return flambe_input_Key.Semicolon;
	case 16:
		return flambe_input_Key.Shift;
	case 191:
		return flambe_input_Key.Slash;
	case 32:
		return flambe_input_Key.Space;
	case 9:
		return flambe_input_Key.Tab;
	case 16777234:
		return flambe_input_Key.Menu;
	case 16777247:
		return flambe_input_Key.Search;
	}
	return flambe_input_Key.Unknown(keyCode);
};
flambe_platform_KeyCodes.toKeyCode = function(key) {
	switch(Type.enumIndex(key)) {
	case 0:
		return 65;
	case 1:
		return 66;
	case 2:
		return 67;
	case 3:
		return 68;
	case 4:
		return 69;
	case 5:
		return 70;
	case 6:
		return 71;
	case 7:
		return 72;
	case 8:
		return 73;
	case 9:
		return 74;
	case 10:
		return 75;
	case 11:
		return 76;
	case 12:
		return 77;
	case 13:
		return 78;
	case 14:
		return 79;
	case 15:
		return 80;
	case 16:
		return 81;
	case 17:
		return 82;
	case 18:
		return 83;
	case 19:
		return 84;
	case 20:
		return 85;
	case 21:
		return 86;
	case 22:
		return 87;
	case 23:
		return 88;
	case 24:
		return 89;
	case 25:
		return 90;
	case 26:
		return 48;
	case 27:
		return 49;
	case 28:
		return 50;
	case 29:
		return 51;
	case 30:
		return 52;
	case 31:
		return 53;
	case 32:
		return 54;
	case 33:
		return 55;
	case 34:
		return 56;
	case 35:
		return 57;
	case 36:
		return 96;
	case 37:
		return 97;
	case 38:
		return 98;
	case 39:
		return 99;
	case 40:
		return 100;
	case 41:
		return 101;
	case 42:
		return 102;
	case 43:
		return 103;
	case 44:
		return 104;
	case 45:
		return 105;
	case 46:
		return 107;
	case 47:
		return 110;
	case 48:
		return 111;
	case 49:
		return 108;
	case 50:
		return 106;
	case 51:
		return 109;
	case 52:
		return 112;
	case 53:
		return 113;
	case 54:
		return 114;
	case 55:
		return 115;
	case 56:
		return 116;
	case 57:
		return 117;
	case 58:
		return 118;
	case 59:
		return 119;
	case 60:
		return 120;
	case 61:
		return 121;
	case 62:
		return 122;
	case 63:
		return 123;
	case 64:
		return 124;
	case 65:
		return 125;
	case 66:
		return 126;
	case 67:
		return 37;
	case 68:
		return 38;
	case 69:
		return 39;
	case 70:
		return 40;
	case 71:
		return 18;
	case 72:
		return 192;
	case 73:
		return 220;
	case 74:
		return 8;
	case 75:
		return 20;
	case 76:
		return 188;
	case 77:
		return 15;
	case 78:
		return 17;
	case 79:
		return 46;
	case 80:
		return 35;
	case 81:
		return 13;
	case 82:
		return 187;
	case 83:
		return 27;
	case 84:
		return 36;
	case 85:
		return 45;
	case 86:
		return 219;
	case 87:
		return 189;
	case 88:
		return 34;
	case 89:
		return 33;
	case 90:
		return 190;
	case 91:
		return 222;
	case 92:
		return 221;
	case 93:
		return 186;
	case 94:
		return 16;
	case 95:
		return 191;
	case 96:
		return 32;
	case 97:
		return 9;
	case 98:
		return 16777234;
	case 99:
		return 16777247;
	case 100:
		var keyCode = key[2];
		return keyCode;
	}
};
var flambe_platform_MainLoop = function() {
	this._tickables = [];
};
$hxClasses["flambe.platform.MainLoop"] = flambe_platform_MainLoop;
flambe_platform_MainLoop.__name__ = true;
flambe_platform_MainLoop.updateEntity = function(entity,dt) {
	var speed;
	var component = entity.getComponent("SpeedAdjuster_5");
	speed = component;
	if(speed != null) {
		speed._realDt = dt;
		dt *= speed.scale.get__();
		if(dt <= 0) {
			speed.onUpdate(dt);
			return;
		}
	}
	var p = entity.firstComponent;
	while(p != null) {
		var next = p.next;
		if(!flambe_util_BitSets.contains(p._flags,1)) {
			p._flags = flambe_util_BitSets.add(p._flags,1);
			p.onStart();
		}
		p.onUpdate(dt);
		p = next;
	}
	var p1 = entity.firstChild;
	while(p1 != null) {
		var next1 = p1.next;
		flambe_platform_MainLoop.updateEntity(p1,dt);
		p1 = next1;
	}
};
flambe_platform_MainLoop.prototype = {
	update: function(dt) {
		if(dt <= 0) {
			flambe_Log.warn("Zero or negative time elapsed since the last frame!",["dt",dt]);
			return;
		}
		if(dt > 1) dt = 1;
		var ii = 0;
		while(ii < this._tickables.length) {
			var t = this._tickables[ii];
			if(t == null || t.update(dt)) this._tickables.splice(ii,1); else ++ii;
		}
		flambe_System.volume.update(dt);
		flambe_platform_MainLoop.updateEntity(flambe_System.root,dt);
	}
	,addTickable: function(t) {
		this._tickables.push(t);
	}
	,__class__: flambe_platform_MainLoop
};
var flambe_platform_MathUtil = function() { };
$hxClasses["flambe.platform.MathUtil"] = flambe_platform_MathUtil;
flambe_platform_MathUtil.__name__ = true;
flambe_platform_MathUtil.nextPowerOfTwo = function(n) {
	var p = 1;
	while(p < n) p <<= 1;
	return p;
};
var flambe_platform_MouseCodes = function() { };
$hxClasses["flambe.platform.MouseCodes"] = flambe_platform_MouseCodes;
flambe_platform_MouseCodes.__name__ = true;
flambe_platform_MouseCodes.toButton = function(buttonCode) {
	switch(buttonCode) {
	case 0:
		return flambe_input_MouseButton.Left;
	case 1:
		return flambe_input_MouseButton.Middle;
	case 2:
		return flambe_input_MouseButton.Right;
	}
	return flambe_input_MouseButton.Unknown(buttonCode);
};
var flambe_platform_OverdrawGraphics = function(impl) {
	this._impl = impl;
};
$hxClasses["flambe.platform.OverdrawGraphics"] = flambe_platform_OverdrawGraphics;
flambe_platform_OverdrawGraphics.__name__ = true;
flambe_platform_OverdrawGraphics.__interfaces__ = [flambe_platform_InternalGraphics];
flambe_platform_OverdrawGraphics.prototype = {
	save: function() {
		this._impl.save();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._impl.transform(m00,m10,m01,m11,m02,m12);
	}
	,multiplyAlpha: function(factor) {
	}
	,setBlendMode: function(blendMode) {
	}
	,applyScissor: function(x,y,width,height) {
		this._impl.applyScissor(x,y,width,height);
	}
	,restore: function() {
		this._impl.restore();
	}
	,drawTexture: function(texture,destX,destY) {
		this.drawRegion(destX,destY,texture.get_width(),texture.get_height());
	}
	,fillRect: function(color,x,y,width,height) {
		this.drawRegion(x,y,width,height);
	}
	,willRender: function() {
		this._impl.willRender();
		this._impl.save();
		this._impl.setBlendMode(flambe_display_BlendMode.Add);
	}
	,didRender: function() {
		this._impl.restore();
		this._impl.didRender();
	}
	,onResize: function(width,height) {
		this._impl.onResize(width,height);
	}
	,drawRegion: function(x,y,width,height) {
		this._impl.fillRect(1052680,x,y,width,height);
	}
	,__class__: flambe_platform_OverdrawGraphics
};
var flambe_platform_TextureRoot = function() { };
$hxClasses["flambe.platform.TextureRoot"] = flambe_platform_TextureRoot;
flambe_platform_TextureRoot.__name__ = true;
var flambe_platform_Tickable = function() { };
$hxClasses["flambe.platform.Tickable"] = flambe_platform_Tickable;
flambe_platform_Tickable.__name__ = true;
flambe_platform_Tickable.prototype = {
	__class__: flambe_platform_Tickable
};
var flambe_platform_html_CanvasGraphics = function(canvas,alpha) {
	this._firstDraw = false;
	this._canvasCtx = canvas.getContext("2d",{ alpha : alpha});
};
$hxClasses["flambe.platform.html.CanvasGraphics"] = flambe_platform_html_CanvasGraphics;
flambe_platform_html_CanvasGraphics.__name__ = true;
flambe_platform_html_CanvasGraphics.__interfaces__ = [flambe_platform_InternalGraphics];
flambe_platform_html_CanvasGraphics.prototype = {
	save: function() {
		this._canvasCtx.save();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._canvasCtx.transform(m00,m10,m01,m11,m02,m12);
	}
	,restore: function() {
		this._canvasCtx.restore();
	}
	,drawTexture: function(texture,destX,destY) {
		this.drawSubTexture(texture,destX,destY,0,0,texture.get_width(),texture.get_height());
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawSubTexture(texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		var root = texture1.root;
		root.assertNotDisposed();
		this._canvasCtx.drawImage(root.image,Std["int"](texture1.rootX + sourceX),Std["int"](texture1.rootY + sourceY),Std["int"](sourceW),Std["int"](sourceH),Std["int"](destX),Std["int"](destY),Std["int"](sourceW),Std["int"](sourceH));
	}
	,fillRect: function(color,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.fillRect(color,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var hex = (16777215 & color).toString(16);
		while(hex.length < 6) hex = "0" + Std.string(hex);
		this._canvasCtx.fillStyle = "#" + Std.string(hex);
		this._canvasCtx.fillRect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
	}
	,multiplyAlpha: function(factor) {
		this._canvasCtx.globalAlpha *= factor;
	}
	,setBlendMode: function(blendMode) {
		var op;
		switch(Type.enumIndex(blendMode)) {
		case 0:
			op = "source-over";
			break;
		case 1:
			op = "lighter";
			break;
		case 2:
			op = "multiply";
			break;
		case 3:
			op = "screen";
			break;
		case 4:
			op = "destination-in";
			break;
		case 5:
			op = "copy";
			break;
		}
		this._canvasCtx.globalCompositeOperation = op;
	}
	,applyScissor: function(x,y,width,height) {
		this._canvasCtx.beginPath();
		this._canvasCtx.rect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
		this._canvasCtx.clip();
	}
	,willRender: function() {
		this._firstDraw = true;
	}
	,didRender: function() {
	}
	,onResize: function(width,height) {
	}
	,__class__: flambe_platform_html_CanvasGraphics
};
var flambe_platform_html_CanvasRenderer = function(canvas) {
	this.graphics = new flambe_platform_html_CanvasGraphics(canvas,true);
	this._hasGPU = new flambe_util_Value(true);
};
$hxClasses["flambe.platform.html.CanvasRenderer"] = flambe_platform_html_CanvasRenderer;
flambe_platform_html_CanvasRenderer.__name__ = true;
flambe_platform_html_CanvasRenderer.__interfaces__ = [flambe_platform_InternalRenderer];
flambe_platform_html_CanvasRenderer.prototype = {
	get_type: function() {
		return flambe_subsystem_RendererType.Canvas;
	}
	,createTextureFromImage: function(image) {
		var root = new flambe_platform_html_CanvasTextureRoot(flambe_platform_html_CanvasRenderer.CANVAS_TEXTURES?flambe_platform_html_HtmlUtil.createCanvas(image):image);
		return root.createTexture(root.width,root.height);
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createCompressedTexture: function(format,data) {
		flambe_util_Assert.fail();
		return null;
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,__class__: flambe_platform_html_CanvasRenderer
};
var flambe_platform_html_CanvasTexture = function(root,width,height) {
	flambe_platform_BasicTexture.call(this,root,width,height);
};
$hxClasses["flambe.platform.html.CanvasTexture"] = flambe_platform_html_CanvasTexture;
flambe_platform_html_CanvasTexture.__name__ = true;
flambe_platform_html_CanvasTexture.__super__ = flambe_platform_BasicTexture;
flambe_platform_html_CanvasTexture.prototype = $extend(flambe_platform_BasicTexture.prototype,{
	__class__: flambe_platform_html_CanvasTexture
});
var flambe_platform_html_CanvasTextureRoot = function(image) {
	this._graphics = null;
	this.updateCount = 0;
	flambe_platform_BasicAsset.call(this);
	this.image = image;
	this.width = image.width;
	this.height = image.height;
};
$hxClasses["flambe.platform.html.CanvasTextureRoot"] = flambe_platform_html_CanvasTextureRoot;
flambe_platform_html_CanvasTextureRoot.__name__ = true;
flambe_platform_html_CanvasTextureRoot.__interfaces__ = [flambe_platform_TextureRoot];
flambe_platform_html_CanvasTextureRoot.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_CanvasTextureRoot.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	createTexture: function(width,height) {
		return new flambe_platform_html_CanvasTexture(this,width,height);
	}
	,dirtyContents: function() {
		++this.updateCount;
	}
	,copyFrom: function(that) {
		this.image = that.image;
		this._graphics = that._graphics;
		this.dirtyContents();
	}
	,onDisposed: function() {
		this.image = null;
		this._graphics = null;
	}
	,__class__: flambe_platform_html_CanvasTextureRoot
});
var flambe_platform_html_HtmlAssetPackLoader = function(platform,manifest) {
	flambe_platform_BasicAssetPackLoader.call(this,platform,manifest);
};
$hxClasses["flambe.platform.html.HtmlAssetPackLoader"] = flambe_platform_html_HtmlAssetPackLoader;
flambe_platform_html_HtmlAssetPackLoader.__name__ = true;
flambe_platform_html_HtmlAssetPackLoader.detectImageFormats = function(fn) {
	var formats = [flambe_asset_AssetFormat.PNG,flambe_asset_AssetFormat.JPG,flambe_asset_AssetFormat.GIF];
	var formatTests = 2;
	var checkRemaining = function() {
		--formatTests;
		if(formatTests == 0) fn(formats);
	};
	var webp;
	var _this = js_Browser.get_document();
	webp = _this.createElement("img");
	webp.onload = webp.onerror = function(_) {
		if(webp.width == 1) formats.unshift(flambe_asset_AssetFormat.WEBP);
		checkRemaining();
	};
	webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	var jxr;
	var _this1 = js_Browser.get_document();
	jxr = _this1.createElement("img");
	jxr.onload = jxr.onerror = function(_1) {
		if(jxr.width == 1) formats.unshift(flambe_asset_AssetFormat.JXR);
		checkRemaining();
	};
	jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
};
flambe_platform_html_HtmlAssetPackLoader.detectAudioFormats = function() {
	var audio;
	var _this = js_Browser.get_document();
	audio = _this.createElement("audio");
	if(audio == null || $bind(audio,audio.canPlayType) == null) {
		flambe_Log.warn("Audio is not supported at all in this browser!");
		return [];
	}
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Android|Windows Phone)\\b","");
	var userAgent = js_Browser.get_navigator().userAgent;
	if(!flambe_platform_html_WebAudioSound.get_supported() && blacklist.match(userAgent)) {
		flambe_Log.warn("HTML5 audio is blacklisted for this browser",["userAgent",userAgent]);
		return [];
	}
	var types = [{ format : flambe_asset_AssetFormat.M4A, mimeType : "audio/mp4; codecs=mp4a"},{ format : flambe_asset_AssetFormat.MP3, mimeType : "audio/mpeg"},{ format : flambe_asset_AssetFormat.OPUS, mimeType : "audio/ogg; codecs=opus"},{ format : flambe_asset_AssetFormat.OGG, mimeType : "audio/ogg; codecs=vorbis"},{ format : flambe_asset_AssetFormat.WAV, mimeType : "audio/wav"}];
	var result = [];
	var _g = 0;
	while(_g < types.length) {
		var type = types[_g];
		++_g;
		var canPlayType = "";
		try {
			canPlayType = audio.canPlayType(type.mimeType);
		} catch( _ ) {
		}
		if(canPlayType != "") result.push(type.format);
	}
	return result;
};
flambe_platform_html_HtmlAssetPackLoader.supportsBlob = function() {
	if(flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport) {
		flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport = false;
		if(new EReg("\\bSilk\\b","").match(js_Browser.get_navigator().userAgent)) return false;
		if(js_Browser.get_window().Blob == null) return false;
		var xhr = new XMLHttpRequest();
		xhr.open("GET",".",true);
		if(xhr.responseType != "") return false;
		xhr.responseType = "blob";
		if(xhr.responseType != "blob") return false;
		flambe_platform_html_HtmlAssetPackLoader._URL = flambe_platform_html_HtmlUtil.loadExtension("URL").value;
	}
	return flambe_platform_html_HtmlAssetPackLoader._URL != null && flambe_platform_html_HtmlAssetPackLoader._URL.createObjectURL != null;
};
flambe_platform_html_HtmlAssetPackLoader.__super__ = flambe_platform_BasicAssetPackLoader;
flambe_platform_html_HtmlAssetPackLoader.prototype = $extend(flambe_platform_BasicAssetPackLoader.prototype,{
	loadEntry: function(url,entry) {
		var _g1 = this;
		var _g = entry.format;
		switch(Type.enumIndex(_g)) {
		case 0:case 1:case 2:case 3:case 4:
			var image;
			var _this = js_Browser.get_document();
			image = _this.createElement("img");
			var events = new flambe_platform_EventGroup();
			events.addDisposingListener(image,"load",function(_) {
				if(image.width > 1024 || image.height > 1024) flambe_Log.warn("Images larger than 1024px on a side will prevent GPU acceleration" + " on some platforms (iOS)",["url",url,"width",image.width,"height",image.height]);
				if(flambe_platform_html_HtmlAssetPackLoader.supportsBlob()) flambe_platform_html_HtmlAssetPackLoader._URL.revokeObjectURL(image.src);
				var texture = _g1._platform.getRenderer().createTextureFromImage(image);
				if(texture != null) _g1.handleLoad(entry,texture); else _g1.handleTextureError(entry);
			});
			events.addDisposingListener(image,"error",function(_1) {
				_g1.handleError(entry,"Failed to load image");
			});
			if(flambe_platform_html_HtmlAssetPackLoader.supportsBlob()) this.downloadBlob(url,entry,function(blob) {
				image.src = flambe_platform_html_HtmlAssetPackLoader._URL.createObjectURL(blob);
			}); else image.src = url;
			break;
		case 5:case 6:case 7:
			this.downloadArrayBuffer(url,entry,function(buffer) {
				var texture1 = _g1._platform.getRenderer().createCompressedTexture(entry.format,null);
				if(texture1 != null) _g1.handleLoad(entry,texture1); else _g1.handleTextureError(entry);
			});
			break;
		case 8:case 9:case 10:case 11:case 12:
			if(flambe_platform_html_WebAudioSound.get_supported()) this.downloadArrayBuffer(url,entry,function(buffer1) {
				flambe_platform_html_WebAudioSound.ctx.decodeAudioData(buffer1,function(decoded) {
					_g1.handleLoad(entry,new flambe_platform_html_WebAudioSound(decoded));
				},function() {
					flambe_Log.warn("Couldn't decode Web Audio, ignoring this asset",["url",url]);
					_g1.handleLoad(entry,flambe_platform_DummySound.getInstance());
				});
			}); else {
				var audio;
				var _this1 = js_Browser.get_document();
				audio = _this1.createElement("audio");
				audio.preload = "auto";
				var ref = ++flambe_platform_html_HtmlAssetPackLoader._mediaRefCount;
				if(flambe_platform_html_HtmlAssetPackLoader._mediaElements == null) flambe_platform_html_HtmlAssetPackLoader._mediaElements = new haxe_ds_IntMap();
				flambe_platform_html_HtmlAssetPackLoader._mediaElements.set(ref,audio);
				var events1 = new flambe_platform_EventGroup();
				events1.addDisposingListener(audio,"canplaythrough",function(_2) {
					flambe_platform_html_HtmlAssetPackLoader._mediaElements.remove(ref);
					_g1.handleLoad(entry,new flambe_platform_html_HtmlSound(audio));
				});
				events1.addDisposingListener(audio,"error",function(_3) {
					flambe_platform_html_HtmlAssetPackLoader._mediaElements.remove(ref);
					var code = audio.error.code;
					if(code == 3 || code == 4) {
						flambe_Log.warn("Couldn't decode HTML5 audio, ignoring this asset",["url",url,"code",code]);
						_g1.handleLoad(entry,flambe_platform_DummySound.getInstance());
					} else _g1.handleError(entry,"Failed to load audio: " + audio.error.code);
				});
				events1.addListener(audio,"progress",function(_4) {
					if(audio.buffered.length > 0 && audio.duration > 0) {
						var progress = audio.buffered.end(0) / audio.duration;
						_g1.handleProgress(entry,Std["int"](progress * entry.bytes));
					}
				});
				audio.src = url;
				audio.load();
			}
			break;
		case 13:
			this.downloadText(url,entry,function(text) {
				_g1.handleLoad(entry,new flambe_platform_BasicFile(text));
			});
			break;
		}
	}
	,getAssetFormats: function(fn) {
		var _g = this;
		if(flambe_platform_html_HtmlAssetPackLoader._supportedFormats == null) {
			flambe_platform_html_HtmlAssetPackLoader._supportedFormats = new flambe_util_Promise();
			flambe_platform_html_HtmlAssetPackLoader.detectImageFormats(function(imageFormats) {
				flambe_platform_html_HtmlAssetPackLoader._supportedFormats.set_result(_g._platform.getRenderer().getCompressedTextureFormats().concat(imageFormats).concat(flambe_platform_html_HtmlAssetPackLoader.detectAudioFormats()).concat([flambe_asset_AssetFormat.Data]));
			});
		}
		flambe_platform_html_HtmlAssetPackLoader._supportedFormats.get(fn);
	}
	,downloadArrayBuffer: function(url,entry,onLoad) {
		this.download(url,entry,"arraybuffer",onLoad);
	}
	,downloadBlob: function(url,entry,onLoad) {
		this.download(url,entry,"blob",onLoad);
	}
	,downloadText: function(url,entry,onLoad) {
		this.download(url,entry,"text",onLoad);
	}
	,download: function(url,entry,responseType,onLoad) {
		var _g = this;
		var xhr = null;
		var start = null;
		var intervalId = 0;
		var hasInterval = false;
		var clearRetryInterval = function() {
			if(hasInterval) {
				hasInterval = false;
				js_Browser.get_window().clearInterval(intervalId);
			}
		};
		var retries = 3;
		var maybeRetry = function() {
			--retries;
			if(retries >= 0) {
				flambe_Log.warn("Retrying asset download",["url",entry.url]);
				start();
				return true;
			}
			return false;
		};
		start = function() {
			clearRetryInterval();
			if(xhr != null) xhr.abort();
			xhr = new XMLHttpRequest();
			xhr.open("GET",url,true);
			xhr.responseType = responseType;
			var lastProgress = 0.0;
			xhr.onprogress = function(event) {
				if(!hasInterval) {
					hasInterval = true;
					intervalId = js_Browser.get_window().setInterval(function() {
						if(xhr.readyState != 4 && flambe_platform_html_HtmlUtil.now() - lastProgress > 5000) {
							if(!maybeRetry()) {
								clearRetryInterval();
								_g.handleError(entry,"Download stalled");
							}
						}
					},1000);
				}
				lastProgress = flambe_platform_html_HtmlUtil.now();
				_g.handleProgress(entry,event.loaded);
			};
			xhr.onerror = function(_) {
				if(xhr.status != 0 || !maybeRetry()) {
					clearRetryInterval();
					_g.handleError(entry,"HTTP error " + xhr.status);
				}
			};
			xhr.onload = function(_1) {
				var response = xhr.response;
				if(response == null) response = xhr.responseText;
				clearRetryInterval();
				onLoad(response);
			};
			xhr.send();
		};
		start();
	}
	,__class__: flambe_platform_html_HtmlAssetPackLoader
});
var flambe_platform_html_HtmlCatapultClient = function() {
	var _g = this;
	flambe_platform_CatapultClient.call(this);
	this._socket = new WebSocket("ws://" + js_Browser.get_location().host);
	this._socket.onerror = function(event) {
		_g.onError("unknown");
	};
	this._socket.onopen = function(event1) {
		flambe_Log.info("Catapult connected");
	};
	this._socket.onmessage = function(event2) {
		_g.onMessage(event2.data);
	};
};
$hxClasses["flambe.platform.html.HtmlCatapultClient"] = flambe_platform_html_HtmlCatapultClient;
flambe_platform_html_HtmlCatapultClient.__name__ = true;
flambe_platform_html_HtmlCatapultClient.canUse = function() {
	return Reflect.hasField(js_Browser.get_window(),"WebSocket");
};
flambe_platform_html_HtmlCatapultClient.__super__ = flambe_platform_CatapultClient;
flambe_platform_html_HtmlCatapultClient.prototype = $extend(flambe_platform_CatapultClient.prototype,{
	onRestart: function() {
		js_Browser.get_window().top.location.reload();
	}
	,__class__: flambe_platform_html_HtmlCatapultClient
});
var flambe_subsystem_ExternalSystem = function() { };
$hxClasses["flambe.subsystem.ExternalSystem"] = flambe_subsystem_ExternalSystem;
flambe_subsystem_ExternalSystem.__name__ = true;
flambe_subsystem_ExternalSystem.prototype = {
	__class__: flambe_subsystem_ExternalSystem
};
var flambe_platform_html_HtmlExternal = function() {
};
$hxClasses["flambe.platform.html.HtmlExternal"] = flambe_platform_html_HtmlExternal;
flambe_platform_html_HtmlExternal.__name__ = true;
flambe_platform_html_HtmlExternal.__interfaces__ = [flambe_subsystem_ExternalSystem];
flambe_platform_html_HtmlExternal.prototype = {
	call: function(name,params) {
		if(params == null) params = [];
		var object = js_Browser.get_window();
		var method = object;
		var _g = 0;
		var _g1 = name.split(".");
		while(_g < _g1.length) {
			var fieldName = _g1[_g];
			++_g;
			object = method;
			method = Reflect.field(object,fieldName);
		}
		return Reflect.callMethod(object,method,params);
	}
	,__class__: flambe_platform_html_HtmlExternal
};
var flambe_util_LogHandler = function() { };
$hxClasses["flambe.util.LogHandler"] = flambe_util_LogHandler;
flambe_util_LogHandler.__name__ = true;
flambe_util_LogHandler.prototype = {
	__class__: flambe_util_LogHandler
};
var flambe_platform_html_HtmlLogHandler = function(tag) {
	this._tagPrefix = tag + ": ";
};
$hxClasses["flambe.platform.html.HtmlLogHandler"] = flambe_platform_html_HtmlLogHandler;
flambe_platform_html_HtmlLogHandler.__name__ = true;
flambe_platform_html_HtmlLogHandler.__interfaces__ = [flambe_util_LogHandler];
flambe_platform_html_HtmlLogHandler.isSupported = function() {
	return typeof console == "object" && console.info != null;
};
flambe_platform_html_HtmlLogHandler.prototype = {
	log: function(level,message) {
		message = this._tagPrefix + message;
		switch(Type.enumIndex(level)) {
		case 0:
			console.info(message);
			break;
		case 1:
			console.warn(message);
			break;
		case 2:
			console.error(message);
			break;
		}
	}
	,__class__: flambe_platform_html_HtmlLogHandler
};
var flambe_platform_html_HtmlMouse = function(pointer,canvas) {
	flambe_platform_BasicMouse.call(this,pointer);
	this._canvas = canvas;
};
$hxClasses["flambe.platform.html.HtmlMouse"] = flambe_platform_html_HtmlMouse;
flambe_platform_html_HtmlMouse.__name__ = true;
flambe_platform_html_HtmlMouse.__super__ = flambe_platform_BasicMouse;
flambe_platform_html_HtmlMouse.prototype = $extend(flambe_platform_BasicMouse.prototype,{
	__class__: flambe_platform_html_HtmlMouse
});
var flambe_platform_html_HtmlSound = function(audioElement) {
	flambe_platform_BasicAsset.call(this);
	this.audioElement = audioElement;
};
$hxClasses["flambe.platform.html.HtmlSound"] = flambe_platform_html_HtmlSound;
flambe_platform_html_HtmlSound.__name__ = true;
flambe_platform_html_HtmlSound.__interfaces__ = [flambe_sound_Sound];
flambe_platform_html_HtmlSound.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_HtmlSound.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	play: function(volume) {
		if(volume == null) volume = 1.0;
		this.assertNotDisposed();
		return new flambe_platform_html__$HtmlSound_HtmlPlayback(this,volume,false);
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		this.assertNotDisposed();
		return new flambe_platform_html__$HtmlSound_HtmlPlayback(this,volume,true);
	}
	,copyFrom: function(that) {
		this.audioElement = that.audioElement;
	}
	,onDisposed: function() {
		this.audioElement = null;
	}
	,__class__: flambe_platform_html_HtmlSound
});
var flambe_platform_html__$HtmlSound_HtmlPlayback = function(sound,volume,loop) {
	var _g = this;
	this._sound = sound;
	this._tickableAdded = false;
	var _this = js_Browser.get_document();
	this._clonedElement = _this.createElement("audio");
	this._clonedElement.loop = loop;
	this._clonedElement.src = sound.audioElement.src;
	this.volume = new flambe_animation_AnimatedFloat(volume,function(_,_1) {
		_g.updateVolume();
	});
	this.updateVolume();
	this._complete = new flambe_util_Value(false);
	this.playAudio();
	if(flambe_System.hidden.get__()) this.set_paused(true);
};
$hxClasses["flambe.platform.html._HtmlSound.HtmlPlayback"] = flambe_platform_html__$HtmlSound_HtmlPlayback;
flambe_platform_html__$HtmlSound_HtmlPlayback.__name__ = true;
flambe_platform_html__$HtmlSound_HtmlPlayback.__interfaces__ = [flambe_platform_Tickable,flambe_sound_Playback];
flambe_platform_html__$HtmlSound_HtmlPlayback.prototype = {
	get_paused: function() {
		return this._clonedElement.paused;
	}
	,set_paused: function(paused) {
		if(this._clonedElement.paused != paused) {
			if(paused) this._clonedElement.pause(); else this.playAudio();
		}
		return paused;
	}
	,update: function(dt) {
		this.volume.update(dt);
		this._complete.set__(this._clonedElement.ended);
		if(this._complete.get__() || this.get_paused()) {
			this._tickableAdded = false;
			this._volumeBinding.dispose();
			this._hideBinding.dispose();
			return true;
		}
		return false;
	}
	,dispose: function() {
		this.set_paused(true);
		this._complete.set__(true);
	}
	,playAudio: function() {
		var _g = this;
		this._clonedElement.play();
		if(!this._tickableAdded) {
			flambe_platform_html_HtmlPlatform.instance.mainLoop.addTickable(this);
			this._tickableAdded = true;
			this._volumeBinding = flambe_System.volume.get_changed().connect(function(_,_1) {
				_g.updateVolume();
			});
			this._hideBinding = flambe_System.hidden.get_changed().connect(function(hidden,_2) {
				if(hidden) {
					_g._wasPaused = _g.get_paused();
					_g.set_paused(true);
				} else _g.set_paused(_g._wasPaused);
			});
		}
	}
	,updateVolume: function() {
		this._clonedElement.volume = flambe_System.volume.get__() * this.volume.get__();
	}
	,__class__: flambe_platform_html__$HtmlSound_HtmlPlayback
};
var flambe_subsystem_StageSystem = function() { };
$hxClasses["flambe.subsystem.StageSystem"] = flambe_subsystem_StageSystem;
flambe_subsystem_StageSystem.__name__ = true;
flambe_subsystem_StageSystem.prototype = {
	__class__: flambe_subsystem_StageSystem
};
var flambe_platform_html_HtmlStage = function(canvas) {
	var _g = this;
	this._canvas = canvas;
	this.resize = new flambe_util_Signal0();
	this.scaleFactor = flambe_platform_html_HtmlStage.computeScaleFactor();
	if(this.scaleFactor != 1) {
		flambe_Log.info("Reversing device DPI scaling",["scaleFactor",this.scaleFactor]);
		flambe_platform_html_HtmlUtil.setVendorStyle(this._canvas,"transform-origin","top left");
		flambe_platform_html_HtmlUtil.setVendorStyle(this._canvas,"transform","scale(" + 1 / this.scaleFactor + ")");
	}
	if(flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) {
		js_Browser.get_window().addEventListener("orientationchange",function(_) {
			flambe_platform_html_HtmlUtil.callLater($bind(_g,_g.hideMobileBrowser),200);
		},false);
		this.hideMobileBrowser();
	}
	js_Browser.get_window().addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.onWindowResize(null);
	this.orientation = new flambe_util_Value(null);
	if(js_Browser.get_window().orientation != null) {
		js_Browser.get_window().addEventListener("orientationchange",$bind(this,this.onOrientationChange),false);
		this.onOrientationChange(null);
	}
	this.fullscreen = new flambe_util_Value(false);
	flambe_platform_html_HtmlUtil.addVendorListener(js_Browser.get_document(),"fullscreenchange",function(_1) {
		_g.updateFullscreen();
	},false);
	flambe_platform_html_HtmlUtil.addVendorListener(js_Browser.get_document(),"fullscreenerror",function(_2) {
		flambe_Log.warn("Error when requesting fullscreen");
	},false);
	this.updateFullscreen();
};
$hxClasses["flambe.platform.html.HtmlStage"] = flambe_platform_html_HtmlStage;
flambe_platform_html_HtmlStage.__name__ = true;
flambe_platform_html_HtmlStage.__interfaces__ = [flambe_subsystem_StageSystem];
flambe_platform_html_HtmlStage.computeScaleFactor = function() {
	var devicePixelRatio = js_Browser.get_window().devicePixelRatio;
	if(devicePixelRatio == null) devicePixelRatio = 1;
	var canvas;
	var _this = js_Browser.get_document();
	canvas = _this.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var backingStorePixelRatio = flambe_platform_html_HtmlUtil.loadExtension("backingStorePixelRatio",ctx).value;
	if(backingStorePixelRatio == null) backingStorePixelRatio = 1;
	var scale = devicePixelRatio / backingStorePixelRatio;
	var screenWidth = js_Browser.get_window().screen.width;
	var screenHeight = js_Browser.get_window().screen.height;
	if(scale * screenWidth > 1136 || scale * screenHeight > 1136) return 1;
	return scale;
};
flambe_platform_html_HtmlStage.prototype = {
	get_width: function() {
		return this._canvas.width;
	}
	,get_height: function() {
		return this._canvas.height;
	}
	,onWindowResize: function(_) {
		var container = this._canvas.parentElement;
		var rect = container.getBoundingClientRect();
		this.resizeCanvas(rect.width,rect.height);
	}
	,resizeCanvas: function(width,height) {
		var scaledWidth = this.scaleFactor * width;
		var scaledHeight = this.scaleFactor * height;
		if(this._canvas.width == scaledWidth && this._canvas.height == scaledHeight) return false;
		this._canvas.width = Std["int"](scaledWidth);
		this._canvas.height = Std["int"](scaledHeight);
		this.resize.emit();
		return true;
	}
	,hideMobileBrowser: function() {
		var _g = this;
		var mobileAddressBar = 100;
		var htmlStyle = js_Browser.get_document().documentElement.style;
		htmlStyle.height = js_Browser.get_window().innerHeight + mobileAddressBar + "px";
		htmlStyle.width = js_Browser.get_window().innerWidth + "px";
		htmlStyle.overflow = "visible";
		flambe_platform_html_HtmlUtil.callLater(function() {
			flambe_platform_html_HtmlUtil.hideMobileBrowser();
			flambe_platform_html_HtmlUtil.callLater(function() {
				htmlStyle.height = js_Browser.get_window().innerHeight + "px";
				_g.onWindowResize(null);
			},100);
		});
	}
	,onOrientationChange: function(_) {
		var value = flambe_platform_html_HtmlUtil.orientation(js_Browser.get_window().orientation);
		this.orientation.set__(value);
	}
	,updateFullscreen: function() {
		var state = flambe_platform_html_HtmlUtil.loadFirstExtension(["fullscreen","fullScreen","isFullScreen"],js_Browser.get_document()).value;
		this.fullscreen.set__(state == true);
	}
	,__class__: flambe_platform_html_HtmlStage
};
var flambe_platform_html_HtmlUtil = function() { };
$hxClasses["flambe.platform.html.HtmlUtil"] = flambe_platform_html_HtmlUtil;
flambe_platform_html_HtmlUtil.__name__ = true;
flambe_platform_html_HtmlUtil.callLater = function(func,delay) {
	if(delay == null) delay = 0;
	js_Browser.get_window().setTimeout(func,delay);
};
flambe_platform_html_HtmlUtil.hideMobileBrowser = function() {
	js_Browser.get_window().scrollTo(1,0);
};
flambe_platform_html_HtmlUtil.loadExtension = function(name,obj) {
	if(obj == null) obj = js_Browser.get_window();
	var extension = Reflect.field(obj,name);
	if(extension != null) return { prefix : "", field : name, value : extension};
	var capitalized = name.charAt(0).toUpperCase() + HxOverrides.substr(name,1,null);
	var _g = 0;
	var _g1 = flambe_platform_html_HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		var field = prefix + capitalized;
		var extension1 = Reflect.field(obj,field);
		if(extension1 != null) return { prefix : prefix, field : field, value : extension1};
	}
	return { prefix : null, field : null, value : null};
};
flambe_platform_html_HtmlUtil.loadFirstExtension = function(names,obj) {
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		var extension = flambe_platform_html_HtmlUtil.loadExtension(name,obj);
		if(extension.field != null) return extension;
	}
	return { prefix : null, field : null, value : null};
};
flambe_platform_html_HtmlUtil.polyfill = function(name,obj) {
	if(obj == null) obj = js_Browser.get_window();
	var value = flambe_platform_html_HtmlUtil.loadExtension(name,obj).value;
	if(value == null) return false;
	Reflect.setField(obj,name,value);
	return true;
};
flambe_platform_html_HtmlUtil.setVendorStyle = function(element,name,value) {
	var style = element.style;
	var _g = 0;
	var _g1 = flambe_platform_html_HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		style.setProperty("-" + prefix + "-" + name,value);
	}
	style.setProperty(name,value);
};
flambe_platform_html_HtmlUtil.addVendorListener = function(dispatcher,type,listener,useCapture) {
	var _g = 0;
	var _g1 = flambe_platform_html_HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		dispatcher.addEventListener(prefix + type,listener,useCapture);
	}
	dispatcher.addEventListener(type,listener,useCapture);
};
flambe_platform_html_HtmlUtil.orientation = function(angle) {
	switch(angle) {
	case -90:case 90:
		return flambe_display_Orientation.Landscape;
	default:
		return flambe_display_Orientation.Portrait;
	}
};
flambe_platform_html_HtmlUtil.now = function() {
	return Date.now();
};
flambe_platform_html_HtmlUtil.createEmptyCanvas = function(width,height) {
	var canvas;
	var _this = js_Browser.get_document();
	canvas = _this.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	return canvas;
};
flambe_platform_html_HtmlUtil.createCanvas = function(source) {
	var canvas = flambe_platform_html_HtmlUtil.createEmptyCanvas(source.width,source.height);
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.globalCompositeOperation = "copy";
	ctx.drawImage(source,0,0);
	ctx.restore();
	return canvas;
};
flambe_platform_html_HtmlUtil.detectSlowDriver = function(gl) {
	var windows = js_Browser.get_navigator().platform.indexOf("Win") >= 0;
	if(windows) {
		var chrome = js_Browser.get_window().chrome != null;
		if(chrome) {
			var _g = 0;
			var _g1 = gl.getSupportedExtensions();
			while(_g < _g1.length) {
				var ext = _g1[_g];
				++_g;
				if(ext.indexOf("WEBGL_compressed_texture") >= 0) return false;
			}
			return true;
		}
	}
	return false;
};
flambe_platform_html_HtmlUtil.fixAndroidMath = function() {
	if(js_Browser.get_navigator().userAgent.indexOf("Linux; U; Android 4") >= 0) {
		flambe_Log.warn("Monkey patching around Android sin/cos bug");
		var sin = Math.sin;
		var cos = Math.cos;
		Math.sin = function(x) {
			if(x == 0) return 0; else return sin(x);
		};
		Math.cos = function(x1) {
			if(x1 == 0) return 1; else return cos(x1);
		};
	}
};
var flambe_platform_html_WebAudioSound = function(buffer) {
	flambe_platform_BasicAsset.call(this);
	this.buffer = buffer;
};
$hxClasses["flambe.platform.html.WebAudioSound"] = flambe_platform_html_WebAudioSound;
flambe_platform_html_WebAudioSound.__name__ = true;
flambe_platform_html_WebAudioSound.__interfaces__ = [flambe_sound_Sound];
flambe_platform_html_WebAudioSound.get_supported = function() {
	if(flambe_platform_html_WebAudioSound._detectSupport) {
		flambe_platform_html_WebAudioSound._detectSupport = false;
		var AudioContext = flambe_platform_html_HtmlUtil.loadExtension("AudioContext").value;
		if(AudioContext != null) {
			flambe_platform_html_WebAudioSound.ctx = new AudioContext();
			flambe_platform_html_WebAudioSound.gain = flambe_platform_html_WebAudioSound.createGain();
			flambe_platform_html_WebAudioSound.gain.connect(flambe_platform_html_WebAudioSound.ctx.destination);
			flambe_System.volume.watch(function(volume,_) {
				flambe_platform_html_WebAudioSound.gain.gain.value = volume;
			});
		}
	}
	return flambe_platform_html_WebAudioSound.ctx != null;
};
flambe_platform_html_WebAudioSound.createGain = function() {
	if(flambe_platform_html_WebAudioSound.ctx.createGain != null) return flambe_platform_html_WebAudioSound.ctx.createGain(); else return flambe_platform_html_WebAudioSound.ctx.createGainNode();
};
flambe_platform_html_WebAudioSound.start = function(node,time) {
	if(node.start != null) node.start(time); else node.noteOn(time);
};
flambe_platform_html_WebAudioSound.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_WebAudioSound.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	play: function(volume) {
		if(volume == null) volume = 1.0;
		this.assertNotDisposed();
		return new flambe_platform_html__$WebAudioSound_WebAudioPlayback(this,volume,false);
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		this.assertNotDisposed();
		return new flambe_platform_html__$WebAudioSound_WebAudioPlayback(this,volume,true);
	}
	,get_duration: function() {
		this.assertNotDisposed();
		return this.buffer.duration;
	}
	,copyFrom: function(that) {
		this.buffer = that.buffer;
	}
	,onDisposed: function() {
		this.buffer = null;
	}
	,__class__: flambe_platform_html_WebAudioSound
});
var flambe_platform_html__$WebAudioSound_WebAudioPlayback = function(sound,volume,loop) {
	var _g = this;
	this._sound = sound;
	this._head = flambe_platform_html_WebAudioSound.gain;
	this._complete = new flambe_util_Value(false);
	this._sourceNode = flambe_platform_html_WebAudioSound.ctx.createBufferSource();
	this._sourceNode.buffer = sound.buffer;
	this._sourceNode.loop = loop;
	this._sourceNode.onended = function() {
		_g._complete.set__(true);
	};
	flambe_platform_html_WebAudioSound.start(this._sourceNode,0);
	this.playAudio();
	this.volume = new flambe_animation_AnimatedFloat(volume,function(v,_) {
		_g.setVolume(v);
	});
	if(volume != 1) this.setVolume(volume);
	if(flambe_System.hidden.get__()) this.set_paused(true);
};
$hxClasses["flambe.platform.html._WebAudioSound.WebAudioPlayback"] = flambe_platform_html__$WebAudioSound_WebAudioPlayback;
flambe_platform_html__$WebAudioSound_WebAudioPlayback.__name__ = true;
flambe_platform_html__$WebAudioSound_WebAudioPlayback.__interfaces__ = [flambe_platform_Tickable,flambe_sound_Playback];
flambe_platform_html__$WebAudioSound_WebAudioPlayback.prototype = {
	get_paused: function() {
		return this._pausedAt >= 0;
	}
	,set_paused: function(paused) {
		if(paused != this.get_paused()) {
			if(paused) {
				this._sourceNode.disconnect();
				this._pausedAt = this.get_position();
			} else this.playAudio();
		}
		return paused;
	}
	,get_position: function() {
		if(this._complete.get__()) return this._sound.get_duration(); else if(this.get_paused()) return this._pausedAt; else {
			var elapsed = flambe_platform_html_WebAudioSound.ctx.currentTime - this._startedAt;
			return elapsed % this._sound.get_duration();
		}
	}
	,update: function(dt) {
		this.volume.update(dt);
		if(this._sourceNode.playbackState == 3) this._complete.set__(true);
		if(this._complete.get__() || this.get_paused()) {
			this._tickableAdded = false;
			this._hideBinding.dispose();
			return true;
		}
		return false;
	}
	,dispose: function() {
		this.set_paused(true);
		this._complete.set__(true);
	}
	,setVolume: function(volume) {
		if(this._gainNode == null) {
			this._gainNode = flambe_platform_html_WebAudioSound.createGain();
			this.insertNode(this._gainNode);
		}
		this._gainNode.gain.value = volume;
	}
	,insertNode: function(head) {
		if(!this.get_paused()) {
			this._sourceNode.disconnect();
			this._sourceNode.connect(head);
		}
		head.connect(this._head);
		this._head = head;
	}
	,playAudio: function() {
		var _g = this;
		this._sourceNode.connect(this._head);
		this._startedAt = flambe_platform_html_WebAudioSound.ctx.currentTime;
		this._pausedAt = -1;
		if(!this._tickableAdded) {
			flambe_platform_html_HtmlPlatform.instance.mainLoop.addTickable(this);
			this._tickableAdded = true;
			this._hideBinding = flambe_System.hidden.get_changed().connect(function(hidden,_) {
				if(hidden) {
					_g._wasPaused = _g.get_paused();
					_g.set_paused(true);
				} else _g.set_paused(_g._wasPaused);
			});
		}
	}
	,__class__: flambe_platform_html__$WebAudioSound_WebAudioPlayback
};
var flambe_platform_html_WebGLBatcher = function(gl) {
	this._backbufferHeight = 0;
	this._backbufferWidth = 0;
	this._dataOffset = 0;
	this._maxQuads = 0;
	this._quads = 0;
	this._pendingSetScissor = false;
	this._currentRenderTarget = null;
	this._currentTexture = null;
	this._currentShader = null;
	this._currentBlendMode = null;
	this._lastScissor = null;
	this._lastTexture = null;
	this._lastShader = null;
	this._lastRenderTarget = null;
	this._lastBlendMode = null;
	this._gl = gl;
	gl.clearColor(0,0,0,0);
	gl.enable(3042);
	gl.pixelStorei(37441,1);
	this._vertexBuffer = gl.createBuffer();
	gl.bindBuffer(34962,this._vertexBuffer);
	this._quadIndexBuffer = gl.createBuffer();
	gl.bindBuffer(34963,this._quadIndexBuffer);
	this._drawTextureShader = new flambe_platform_shader_DrawTextureGL(gl);
	this._drawPatternShader = new flambe_platform_shader_DrawPatternGL(gl);
	this._fillRectShader = new flambe_platform_shader_FillRectGL(gl);
	this.resize(16);
};
$hxClasses["flambe.platform.html.WebGLBatcher"] = flambe_platform_html_WebGLBatcher;
flambe_platform_html_WebGLBatcher.__name__ = true;
flambe_platform_html_WebGLBatcher.prototype = {
	resizeBackbuffer: function(width,height) {
		this._gl.viewport(0,0,width,height);
		this._backbufferWidth = width;
		this._backbufferHeight = height;
	}
	,willRender: function() {
		this._gl.clear(16384);
	}
	,didRender: function() {
		this.flush();
	}
	,bindTexture: function(texture) {
		this.flush();
		this._lastTexture = null;
		this._currentTexture = null;
		this._gl.bindTexture(3553,texture);
	}
	,deleteTexture: function(texture) {
		if(this._lastTexture != null && this._lastTexture.root == texture) {
			this.flush();
			this._lastTexture = null;
			this._currentTexture = null;
		}
		this._gl.deleteTexture(texture.nativeTexture);
	}
	,deleteFramebuffer: function(texture) {
		if(texture == this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = null;
			this._currentRenderTarget = null;
		}
		this._gl.deleteFramebuffer(texture.framebuffer);
	}
	,prepareDrawTexture: function(renderTarget,blendMode,scissor,texture) {
		if(texture != this._lastTexture) {
			this.flush();
			this._lastTexture = texture;
		}
		return this.prepareQuad(5,renderTarget,blendMode,scissor,this._drawTextureShader);
	}
	,prepareFillRect: function(renderTarget,blendMode,scissor) {
		return this.prepareQuad(6,renderTarget,blendMode,scissor,this._fillRectShader);
	}
	,prepareQuad: function(elementsPerVertex,renderTarget,blendMode,scissor,shader) {
		if(renderTarget != this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = renderTarget;
		}
		if(blendMode != this._lastBlendMode) {
			this.flush();
			this._lastBlendMode = blendMode;
		}
		if(shader != this._lastShader) {
			this.flush();
			this._lastShader = shader;
		}
		if(scissor != null || this._lastScissor != null) {
			if(scissor == null || this._lastScissor == null || !this._lastScissor.equals(scissor)) {
				this.flush();
				if(scissor != null) this._lastScissor = scissor.clone(this._lastScissor); else this._lastScissor = null;
				this._pendingSetScissor = true;
			}
		}
		if(this._quads >= this._maxQuads) this.resize(2 * this._maxQuads);
		++this._quads;
		var offset = this._dataOffset;
		this._dataOffset += 4 * elementsPerVertex;
		return offset;
	}
	,flush: function() {
		if(this._quads < 1) return;
		if(this._lastRenderTarget != this._currentRenderTarget) this.bindRenderTarget(this._lastRenderTarget);
		if(this._lastBlendMode != this._currentBlendMode) {
			var _g = this._lastBlendMode;
			switch(Type.enumIndex(_g)) {
			case 0:
				this._gl.blendFunc(1,771);
				break;
			case 1:
				this._gl.blendFunc(1,1);
				break;
			case 2:
				this._gl.blendFunc(774,771);
				break;
			case 3:
				this._gl.blendFunc(1,769);
				break;
			case 4:
				this._gl.blendFunc(0,770);
				break;
			case 5:
				this._gl.blendFunc(1,0);
				break;
			}
			this._currentBlendMode = this._lastBlendMode;
		}
		if(this._pendingSetScissor) {
			if(this._lastScissor != null) {
				this._gl.enable(3089);
				this._gl.scissor(Std["int"](this._lastScissor.x),Std["int"](this._lastScissor.y),Std["int"](this._lastScissor.width),Std["int"](this._lastScissor.height));
			} else this._gl.disable(3089);
			this._pendingSetScissor = false;
		}
		if(this._lastTexture != this._currentTexture) {
			this._gl.bindTexture(3553,this._lastTexture.root.nativeTexture);
			this._currentTexture = this._lastTexture;
		}
		if(this._lastShader != this._currentShader) {
			this._lastShader.useProgram();
			this._lastShader.prepare();
			this._currentShader = this._lastShader;
		}
		if(this._lastShader == this._drawPatternShader) {
			var texture = this._lastTexture;
			var root = texture.root;
			this._drawPatternShader.setRegion(texture.rootX / root.width,texture.rootY / root.height,texture.get_width() / root.width,texture.get_height() / root.height);
		}
		this._gl.bufferData(34962,this.data.subarray(0,this._dataOffset),35040);
		this._gl.drawElements(4,6 * this._quads,5123,0);
		this._quads = 0;
		this._dataOffset = 0;
	}
	,resize: function(maxQuads) {
		this.flush();
		if(maxQuads > 1024) return;
		this._maxQuads = maxQuads;
		this.data = new Float32Array(maxQuads * 4 * 6);
		this._gl.bufferData(34962,this.data.length * 4,35040);
		var indices = new Uint16Array(6 * maxQuads);
		var _g = 0;
		while(_g < maxQuads) {
			var ii = _g++;
			indices[ii * 6 + 0] = ii * 4 + 0;
			indices[ii * 6 + 1] = ii * 4 + 1;
			indices[ii * 6 + 2] = ii * 4 + 2;
			indices[ii * 6 + 3] = ii * 4 + 2;
			indices[ii * 6 + 4] = ii * 4 + 3;
			indices[ii * 6 + 5] = ii * 4 + 0;
		}
		this._gl.bufferData(34963,indices,35044);
	}
	,bindRenderTarget: function(texture) {
		if(texture != null) {
			this._gl.bindFramebuffer(36160,texture.framebuffer);
			this._gl.viewport(0,0,texture.width,texture.height);
		} else {
			this._gl.bindFramebuffer(36160,null);
			this._gl.viewport(0,0,this._backbufferWidth,this._backbufferHeight);
		}
		this._currentRenderTarget = texture;
		this._lastRenderTarget = texture;
	}
	,resetLastStateVars: function() {
		this._gl.enable(3042);
		this._gl.disable(2960);
		this._gl.disable(2929);
		this._gl.bindBuffer(34962,this._vertexBuffer);
		this._gl.bindBuffer(34963,this._quadIndexBuffer);
		if(this._lastRenderTarget != null) this.bindRenderTarget(this._lastRenderTarget);
		this._gl.blendFunc(1,771);
		if(this._lastTexture != null) this._gl.bindTexture(3553,this._lastTexture.root.nativeTexture);
		if(this._lastShader != null) {
			this._lastShader.useProgram();
			this._lastShader.prepare();
		}
	}
	,__class__: flambe_platform_html_WebGLBatcher
};
var flambe_platform_html_WebGLGraphics = function(batcher,renderTarget) {
	this._stateList = null;
	this._inverseProjection = null;
	if(flambe_platform_html_WebGLGraphics._scratchQuadArray == null) flambe_platform_html_WebGLGraphics._scratchQuadArray = new Float32Array(8);
	this._batcher = batcher;
	this._renderTarget = renderTarget;
};
$hxClasses["flambe.platform.html.WebGLGraphics"] = flambe_platform_html_WebGLGraphics;
flambe_platform_html_WebGLGraphics.__name__ = true;
flambe_platform_html_WebGLGraphics.__interfaces__ = [flambe_platform_InternalGraphics];
flambe_platform_html_WebGLGraphics.prototype = {
	save: function() {
		var current = this._stateList;
		var state = this._stateList.next;
		if(state == null) {
			state = new flambe_platform_html__$WebGLGraphics_DrawingState();
			state.prev = current;
			current.next = state;
		}
		current.matrix.clone(state.matrix);
		state.alpha = current.alpha;
		state.blendMode = current.blendMode;
		if(current.scissor != null) state.scissor = current.scissor.clone(state.scissor); else state.scissor = null;
		this._stateList = state;
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		var state = this.getTopState();
		flambe_platform_html_WebGLGraphics._scratchMatrix.set(m00,m10,m01,m11,m02,m12);
		flambe_math_Matrix.multiply(state.matrix,flambe_platform_html_WebGLGraphics._scratchMatrix,state.matrix);
	}
	,restore: function() {
		flambe_util_Assert.that(this._stateList.prev != null,"Can't restore without a previous save");
		this._stateList = this._stateList.prev;
	}
	,drawTexture: function(texture,x,y) {
		this._batcher.resetLastStateVars();
		this.drawSubTexture(texture,x,y,0,0,texture.get_width(),texture.get_height());
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		var state = this.getTopState();
		var texture1 = texture;
		var root = texture1.root;
		root.assertNotDisposed();
		var pos = this.transformQuad(destX,destY,sourceW,sourceH);
		var rootWidth = root.width;
		var rootHeight = root.height;
		var u1 = (texture1.rootX + sourceX) / rootWidth;
		var v1 = (texture1.rootY + sourceY) / rootHeight;
		var u2 = u1 + sourceW / rootWidth;
		var v2 = v1 + sourceH / rootHeight;
		var alpha = state.alpha;
		var offset = this._batcher.prepareDrawTexture(this._renderTarget,state.blendMode,state.scissor,texture1);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = u1;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = u2;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = u2;
		data[++offset] = v2;
		data[++offset] = alpha;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = u1;
		data[++offset] = v2;
		data[++offset] = alpha;
	}
	,fillRect: function(color,x,y,width,height) {
		var state = this.getTopState();
		var pos = this.transformQuad(x,y,width,height);
		var r = (color & 16711680) / 16711680;
		var g = (color & 65280) / 65280;
		var b = (color & 255) / 255;
		var a = state.alpha;
		var offset = this._batcher.prepareFillRect(this._renderTarget,state.blendMode,state.scissor);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
	}
	,multiplyAlpha: function(factor) {
		this.getTopState().alpha *= factor;
	}
	,setBlendMode: function(blendMode) {
		this.getTopState().blendMode = blendMode;
	}
	,applyScissor: function(x,y,width,height) {
		var state = this.getTopState();
		var rect = flambe_platform_html_WebGLGraphics._scratchQuadArray;
		rect[0] = x;
		rect[1] = y;
		rect[2] = x + width;
		rect[3] = y + height;
		state.matrix.transformArray(rect,4,rect);
		this._inverseProjection.transformArray(rect,4,rect);
		x = rect[0];
		y = rect[1];
		width = rect[2] - x;
		height = rect[3] - y;
		if(width < 0) {
			x += width;
			width = -width;
		}
		if(height < 0) {
			y += height;
			height = -height;
		}
		state.applyScissor(x,y,width,height);
	}
	,willRender: function() {
		this._batcher.resetLastStateVars();
		this._batcher.willRender();
	}
	,didRender: function() {
		this._batcher.resetLastStateVars();
		this._batcher.didRender();
	}
	,onResize: function(width,height) {
		this._stateList = new flambe_platform_html__$WebGLGraphics_DrawingState();
		var flip;
		if(this._renderTarget != null) flip = -1; else flip = 1;
		this._stateList.matrix.set(2 / width,0,0,flip * -2 / height,-1,flip);
		this._inverseProjection = new flambe_math_Matrix();
		this._inverseProjection.set(2 / width,0,0,2 / height,-1,-1);
		this._inverseProjection.invert();
	}
	,getTopState: function() {
		return this._stateList;
	}
	,transformQuad: function(x,y,width,height) {
		var x2 = x + width;
		var y2 = y + height;
		var pos = flambe_platform_html_WebGLGraphics._scratchQuadArray;
		pos[0] = x;
		pos[1] = y;
		pos[2] = x2;
		pos[3] = y;
		pos[4] = x2;
		pos[5] = y2;
		pos[6] = x;
		pos[7] = y2;
		this.getTopState().matrix.transformArray(pos,8,pos);
		return pos;
	}
	,__class__: flambe_platform_html_WebGLGraphics
};
var flambe_platform_html__$WebGLGraphics_DrawingState = function() {
	this.next = null;
	this.prev = null;
	this.scissor = null;
	this.matrix = new flambe_math_Matrix();
	this.alpha = 1;
	this.blendMode = flambe_display_BlendMode.Normal;
};
$hxClasses["flambe.platform.html._WebGLGraphics.DrawingState"] = flambe_platform_html__$WebGLGraphics_DrawingState;
flambe_platform_html__$WebGLGraphics_DrawingState.__name__ = true;
flambe_platform_html__$WebGLGraphics_DrawingState.prototype = {
	applyScissor: function(x,y,width,height) {
		if(this.scissor != null) {
			var x1 = flambe_math_FMath.max(this.scissor.x,x);
			var y1 = flambe_math_FMath.max(this.scissor.y,y);
			var x2 = flambe_math_FMath.min(this.scissor.x + this.scissor.width,x + width);
			var y2 = flambe_math_FMath.min(this.scissor.y + this.scissor.height,y + height);
			x = x1;
			y = y1;
			width = x2 - x1;
			height = y2 - y1;
		} else this.scissor = new flambe_math_Rectangle();
		this.scissor.set(Math.round(x),Math.round(y),Math.round(width),Math.round(height));
	}
	,__class__: flambe_platform_html__$WebGLGraphics_DrawingState
};
var flambe_platform_html_WebGLRenderer = function(stage,gl) {
	var _g = this;
	this._hasGPU = new flambe_util_Value(true);
	this.gl = gl;
	gl.canvas.addEventListener("webglcontextlost",function(event) {
		event.preventDefault();
		flambe_Log.warn("WebGL context lost");
		_g._hasGPU.set__(false);
	},false);
	gl.canvas.addEventListener("webglcontextrestore",function(event1) {
		flambe_Log.warn("WebGL context restored");
		_g.init();
		_g._hasGPU.set__(true);
	},false);
	stage.resize.connect($bind(this,this.onResize));
	this.init();
};
$hxClasses["flambe.platform.html.WebGLRenderer"] = flambe_platform_html_WebGLRenderer;
flambe_platform_html_WebGLRenderer.__name__ = true;
flambe_platform_html_WebGLRenderer.__interfaces__ = [flambe_platform_InternalRenderer];
flambe_platform_html_WebGLRenderer.prototype = {
	get_type: function() {
		return flambe_subsystem_RendererType.WebGL;
	}
	,createTextureFromImage: function(image) {
		if(this.gl.isContextLost()) return null;
		var root = new flambe_platform_html_WebGLTextureRoot(this,image.width,image.height);
		root.uploadImageData(image);
		return root.createTexture(image.width,image.height);
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createCompressedTexture: function(format,data) {
		if(this.gl.isContextLost()) return null;
		flambe_util_Assert.fail();
		return null;
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,onResize: function() {
		var width = this.gl.canvas.width;
		var height = this.gl.canvas.height;
		this.batcher.resizeBackbuffer(width,height);
		this.graphics.onResize(width,height);
	}
	,init: function() {
		this.batcher = new flambe_platform_html_WebGLBatcher(this.gl);
		this.graphics = new flambe_platform_html_WebGLGraphics(this.batcher,null);
		this.onResize();
	}
	,__class__: flambe_platform_html_WebGLRenderer
};
var flambe_platform_html_WebGLTexture = function(root,width,height) {
	flambe_platform_BasicTexture.call(this,root,width,height);
};
$hxClasses["flambe.platform.html.WebGLTexture"] = flambe_platform_html_WebGLTexture;
flambe_platform_html_WebGLTexture.__name__ = true;
flambe_platform_html_WebGLTexture.__super__ = flambe_platform_BasicTexture;
flambe_platform_html_WebGLTexture.prototype = $extend(flambe_platform_BasicTexture.prototype,{
	__class__: flambe_platform_html_WebGLTexture
});
var flambe_platform_html_WebGLTextureRoot = function(renderer,width,height) {
	this._graphics = null;
	this.framebuffer = null;
	flambe_platform_BasicAsset.call(this);
	this._renderer = renderer;
	this.width = flambe_math_FMath.max(2,flambe_platform_MathUtil.nextPowerOfTwo(width));
	this.height = flambe_math_FMath.max(2,flambe_platform_MathUtil.nextPowerOfTwo(height));
	var gl = renderer.gl;
	this.nativeTexture = gl.createTexture();
	renderer.batcher.bindTexture(this.nativeTexture);
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	gl.texParameteri(3553,10240,9729);
	gl.texParameteri(3553,10241,9728);
};
$hxClasses["flambe.platform.html.WebGLTextureRoot"] = flambe_platform_html_WebGLTextureRoot;
flambe_platform_html_WebGLTextureRoot.__name__ = true;
flambe_platform_html_WebGLTextureRoot.__interfaces__ = [flambe_platform_TextureRoot];
flambe_platform_html_WebGLTextureRoot.drawBorder = function(canvas,width,height) {
	var ctx = canvas.getContext("2d");
	ctx.drawImage(canvas,width - 1,0,1,height,width,0,1,height);
	ctx.drawImage(canvas,0,height - 1,width,1,0,height,width,1);
};
flambe_platform_html_WebGLTextureRoot.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_WebGLTextureRoot.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	createTexture: function(width,height) {
		return new flambe_platform_html_WebGLTexture(this,width,height);
	}
	,uploadImageData: function(image) {
		this.assertNotDisposed();
		if(this.width != image.width || this.height != image.height) {
			var resized = flambe_platform_html_HtmlUtil.createEmptyCanvas(this.width,this.height);
			resized.getContext("2d").drawImage(image,0,0);
			flambe_platform_html_WebGLTextureRoot.drawBorder(resized,image.width,image.height);
			image = resized;
		}
		this._renderer.batcher.bindTexture(this.nativeTexture);
		var gl = this._renderer.gl;
		gl.texImage2D(3553,0,6408,6408,5121,image);
	}
	,copyFrom: function(that) {
		this.nativeTexture = that.nativeTexture;
		this.framebuffer = that.framebuffer;
		this.width = that.width;
		this.height = that.height;
		this._graphics = that._graphics;
	}
	,onDisposed: function() {
		var batcher = this._renderer.batcher;
		batcher.deleteTexture(this);
		if(this.framebuffer != null) batcher.deleteFramebuffer(this);
		this.nativeTexture = null;
		this.framebuffer = null;
		this._graphics = null;
	}
	,__class__: flambe_platform_html_WebGLTextureRoot
});
var flambe_platform_shader_ShaderGL = function(gl,vertSource,fragSource) {
	fragSource = ["#ifdef GL_ES","precision mediump float;","#endif"].join("\n") + "\n" + fragSource;
	this._gl = gl;
	this._program = gl.createProgram();
	gl.attachShader(this._program,flambe_platform_shader_ShaderGL.createShader(gl,35633,vertSource));
	gl.attachShader(this._program,flambe_platform_shader_ShaderGL.createShader(gl,35632,fragSource));
	gl.linkProgram(this._program);
	gl.useProgram(this._program);
	if(!gl.getProgramParameter(this._program,35714)) flambe_Log.error("Error linking shader program",["log",gl.getProgramInfoLog(this._program)]);
};
$hxClasses["flambe.platform.shader.ShaderGL"] = flambe_platform_shader_ShaderGL;
flambe_platform_shader_ShaderGL.__name__ = true;
flambe_platform_shader_ShaderGL.createShader = function(gl,type,source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader,35713)) {
		var typeName;
		if(type == 35633) typeName = "vertex"; else typeName = "fragment";
		flambe_Log.error("Error compiling " + typeName + " shader",["log",gl.getShaderInfoLog(shader)]);
	}
	return shader;
};
flambe_platform_shader_ShaderGL.prototype = {
	useProgram: function() {
		this._gl.useProgram(this._program);
	}
	,prepare: function() {
		flambe_util_Assert.fail("abstract");
	}
	,getAttribLocation: function(name) {
		var loc = this._gl.getAttribLocation(this._program,name);
		flambe_util_Assert.that(loc >= 0,"Missing attribute",["name",name]);
		return loc;
	}
	,getUniformLocation: function(name) {
		var loc = this._gl.getUniformLocation(this._program,name);
		flambe_util_Assert.that(loc != null,"Missing uniform",["name",name]);
		return loc;
	}
	,__class__: flambe_platform_shader_ShaderGL
};
var flambe_platform_shader_DrawPatternGL = function(gl) {
	flambe_platform_shader_ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","uniform mediump vec4 u_region;","void main (void) {","gl_FragColor = texture2D(u_texture, u_region.xy + mod(v_uv, u_region.zw)) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.u_region = this.getUniformLocation("u_region");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawPatternGL"] = flambe_platform_shader_DrawPatternGL;
flambe_platform_shader_DrawPatternGL.__name__ = true;
flambe_platform_shader_DrawPatternGL.__super__ = flambe_platform_shader_ShaderGL;
flambe_platform_shader_DrawPatternGL.prototype = $extend(flambe_platform_shader_ShaderGL.prototype,{
	setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,setRegion: function(x,y,width,height) {
		this._gl.uniform4f(this.u_region,x,y,width,height);
	}
	,prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,__class__: flambe_platform_shader_DrawPatternGL
});
var flambe_platform_shader_DrawTextureGL = function(gl) {
	flambe_platform_shader_ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","void main (void) {","gl_FragColor = texture2D(u_texture, v_uv) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawTextureGL"] = flambe_platform_shader_DrawTextureGL;
flambe_platform_shader_DrawTextureGL.__name__ = true;
flambe_platform_shader_DrawTextureGL.__super__ = flambe_platform_shader_ShaderGL;
flambe_platform_shader_DrawTextureGL.prototype = $extend(flambe_platform_shader_ShaderGL.prototype,{
	setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,__class__: flambe_platform_shader_DrawTextureGL
});
var flambe_platform_shader_FillRectGL = function(gl) {
	flambe_platform_shader_ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute lowp vec3 a_rgb;","attribute lowp float a_alpha;","varying lowp vec4 v_color;","void main (void) {","v_color = vec4(a_rgb*a_alpha, a_alpha);","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying lowp vec4 v_color;","void main (void) {","gl_FragColor = v_color;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_rgb = this.getAttribLocation("a_rgb");
	this.a_alpha = this.getAttribLocation("a_alpha");
};
$hxClasses["flambe.platform.shader.FillRectGL"] = flambe_platform_shader_FillRectGL;
flambe_platform_shader_FillRectGL.__name__ = true;
flambe_platform_shader_FillRectGL.__super__ = flambe_platform_shader_ShaderGL;
flambe_platform_shader_FillRectGL.prototype = $extend(flambe_platform_shader_ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_rgb);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 6 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_rgb,3,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,5 * bytesPerFloat);
	}
	,__class__: flambe_platform_shader_FillRectGL
});
var flambe_scene_Director = function() {
	this._transitor = null;
};
$hxClasses["flambe.scene.Director"] = flambe_scene_Director;
flambe_scene_Director.__name__ = true;
flambe_scene_Director.__super__ = flambe_Component;
flambe_scene_Director.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Director_3";
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,onRemoved: function() {
		this.completeTransition();
		var _g = 0;
		var _g1 = this.scenes;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			scene.dispose();
		}
		this.scenes = [];
		this.occludedScenes = [];
		this._root.dispose();
	}
	,onUpdate: function(dt) {
		if(this._transitor != null && this._transitor.update(dt)) this.completeTransition();
	}
	,get_topScene: function() {
		var ll = this.scenes.length;
		if(ll > 0) return this.scenes[ll - 1]; else return null;
	}
	,show: function(scene) {
		var events;
		var component = scene.getComponent("Scene_4");
		events = component;
		if(events != null) events.shown.emit();
	}
	,invalidateVisibility: function() {
		var ii = this.scenes.length;
		while(ii > 0) {
			var scene = this.scenes[--ii];
			var comp;
			var component = scene.getComponent("Scene_4");
			comp = component;
			if(comp == null || comp.opaque) break;
		}
		if(this.scenes.length > 0) this.occludedScenes = this.scenes.slice(ii,this.scenes.length - 1); else this.occludedScenes = [];
		var scene1 = this.get_topScene();
		if(scene1 != null) this.show(scene1);
	}
	,completeTransition: function() {
		if(this._transitor != null) {
			this._transitor.complete();
			this._transitor = null;
			this.invalidateVisibility();
		}
	}
	,__class__: flambe_scene_Director
});
var flambe_scene__$Director_Transitor = function() { };
$hxClasses["flambe.scene._Director.Transitor"] = flambe_scene__$Director_Transitor;
flambe_scene__$Director_Transitor.__name__ = true;
flambe_scene__$Director_Transitor.prototype = {
	update: function(dt) {
		return this._transition.update(dt);
	}
	,complete: function() {
		this._transition.complete();
		this._onComplete();
	}
	,__class__: flambe_scene__$Director_Transitor
};
var flambe_scene_Scene = function() { };
$hxClasses["flambe.scene.Scene"] = flambe_scene_Scene;
flambe_scene_Scene.__name__ = true;
flambe_scene_Scene.__super__ = flambe_Component;
flambe_scene_Scene.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Scene_4";
	}
	,__class__: flambe_scene_Scene
});
var flambe_scene_Transition = function() { };
$hxClasses["flambe.scene.Transition"] = flambe_scene_Transition;
flambe_scene_Transition.__name__ = true;
flambe_scene_Transition.prototype = {
	update: function(dt) {
		return true;
	}
	,complete: function() {
	}
	,__class__: flambe_scene_Transition
};
var flambe_subsystem_RendererType = $hxClasses["flambe.subsystem.RendererType"] = { __ename__ : true, __constructs__ : ["Stage3D","WebGL","Canvas"] };
flambe_subsystem_RendererType.Stage3D = ["Stage3D",0];
flambe_subsystem_RendererType.Stage3D.toString = $estr;
flambe_subsystem_RendererType.Stage3D.__enum__ = flambe_subsystem_RendererType;
flambe_subsystem_RendererType.WebGL = ["WebGL",1];
flambe_subsystem_RendererType.WebGL.toString = $estr;
flambe_subsystem_RendererType.WebGL.__enum__ = flambe_subsystem_RendererType;
flambe_subsystem_RendererType.Canvas = ["Canvas",2];
flambe_subsystem_RendererType.Canvas.toString = $estr;
flambe_subsystem_RendererType.Canvas.__enum__ = flambe_subsystem_RendererType;
var flambe_util_Arrays = function() { };
$hxClasses["flambe.util.Arrays"] = flambe_util_Arrays;
flambe_util_Arrays.__name__ = true;
flambe_util_Arrays.resize = function(arr,length) {
	arr.length = length;
};
var flambe_util_Assert = function() { };
$hxClasses["flambe.util.Assert"] = flambe_util_Assert;
flambe_util_Assert.__name__ = true;
flambe_util_Assert.that = function(condition,message,fields) {
	if(!condition) flambe_util_Assert.fail(message,fields);
};
flambe_util_Assert.fail = function(message,fields) {
	var error = "Assertion failed!";
	if(message != null) error += " " + message;
	if(fields != null) error = flambe_util_Strings.withFields(error,fields);
	throw error;
};
var flambe_util_BitSets = function() { };
$hxClasses["flambe.util.BitSets"] = flambe_util_BitSets;
flambe_util_BitSets.__name__ = true;
flambe_util_BitSets.add = function(bits,mask) {
	return bits | mask;
};
flambe_util_BitSets.remove = function(bits,mask) {
	return bits & ~mask;
};
flambe_util_BitSets.contains = function(bits,mask) {
	return (bits & mask) != 0;
};
flambe_util_BitSets.containsAll = function(bits,mask) {
	return (bits & mask) == mask;
};
flambe_util_BitSets.set = function(bits,mask,enabled) {
	if(enabled) return flambe_util_BitSets.add(bits,mask); else return flambe_util_BitSets.remove(bits,mask);
};
var flambe_util_LogLevel = $hxClasses["flambe.util.LogLevel"] = { __ename__ : true, __constructs__ : ["Info","Warn","Error"] };
flambe_util_LogLevel.Info = ["Info",0];
flambe_util_LogLevel.Info.toString = $estr;
flambe_util_LogLevel.Info.__enum__ = flambe_util_LogLevel;
flambe_util_LogLevel.Warn = ["Warn",1];
flambe_util_LogLevel.Warn.toString = $estr;
flambe_util_LogLevel.Warn.__enum__ = flambe_util_LogLevel;
flambe_util_LogLevel.Error = ["Error",2];
flambe_util_LogLevel.Error.toString = $estr;
flambe_util_LogLevel.Error.__enum__ = flambe_util_LogLevel;
var flambe_util_Pool = function(allocator) {
	this._capacity = 2147483647;
	this._allocator = allocator;
	this._freeObjects = [];
};
$hxClasses["flambe.util.Pool"] = flambe_util_Pool;
flambe_util_Pool.__name__ = true;
flambe_util_Pool.prototype = {
	take: function() {
		if(this._freeObjects.length > 0) return this._freeObjects.pop();
		var object = this._allocator();
		flambe_util_Assert.that(object != null);
		return object;
	}
	,put: function(object) {
		flambe_util_Assert.that(object != null);
		if(this._freeObjects.length < this._capacity) this._freeObjects.push(object);
	}
	,setSize: function(size) {
		if(this._freeObjects.length > size) flambe_util_Arrays.resize(this._freeObjects,size); else {
			var needed = size - this._freeObjects.length;
			var _g = 0;
			while(_g < needed) {
				var ii = _g++;
				var object = this._allocator();
				flambe_util_Assert.that(object != null);
				this._freeObjects.push(object);
			}
		}
		return this;
	}
	,__class__: flambe_util_Pool
};
var flambe_util_Promise = function() {
	this.success = new flambe_util_Signal1();
	this.error = new flambe_util_Signal1();
	this.progressChanged = new flambe_util_Signal0();
	this.hasResult = false;
	this._progress = 0;
	this._total = 0;
};
$hxClasses["flambe.util.Promise"] = flambe_util_Promise;
flambe_util_Promise.__name__ = true;
flambe_util_Promise.prototype = {
	set_result: function(result) {
		if(this.hasResult) throw "Promise result already assigned";
		this._result = result;
		this.hasResult = true;
		this.success.emit(result);
		return result;
	}
	,get: function(fn) {
		if(this.hasResult) {
			fn(this._result);
			return null;
		}
		return this.success.connect(fn).once();
	}
	,get_progress: function() {
		return this._progress;
	}
	,set_progress: function(progress) {
		if(this._progress != progress) {
			this._progress = progress;
			this.progressChanged.emit();
		}
		return progress;
	}
	,set_total: function(total) {
		if(this._total != total) {
			this._total = total;
			this.progressChanged.emit();
		}
		return total;
	}
	,get_total: function() {
		return this._total;
	}
	,__class__: flambe_util_Promise
};
var flambe_util_Signal0 = function(listener) {
	flambe_util_SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal0"] = flambe_util_Signal0;
flambe_util_Signal0.__name__ = true;
flambe_util_Signal0.__super__ = flambe_util_SignalBase;
flambe_util_Signal0.prototype = $extend(flambe_util_SignalBase.prototype,{
	connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,emit: function() {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl();
		}); else this.emitImpl();
	}
	,emitImpl: function() {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener();
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,__class__: flambe_util_Signal0
});
var flambe_util__$SignalBase_Task = function(fn) {
	this.next = null;
	this.fn = fn;
};
$hxClasses["flambe.util._SignalBase.Task"] = flambe_util__$SignalBase_Task;
flambe_util__$SignalBase_Task.__name__ = true;
flambe_util__$SignalBase_Task.prototype = {
	__class__: flambe_util__$SignalBase_Task
};
var flambe_util_Strings = function() { };
$hxClasses["flambe.util.Strings"] = flambe_util_Strings;
flambe_util_Strings.__name__ = true;
flambe_util_Strings.getFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	if(dot > 0) return HxOverrides.substr(fileName,dot + 1,null); else return null;
};
flambe_util_Strings.removeFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	if(dot > 0) return HxOverrides.substr(fileName,0,dot); else return fileName;
};
flambe_util_Strings.getUrlExtension = function(url) {
	var question = url.lastIndexOf("?");
	if(question >= 0) url = HxOverrides.substr(url,0,question);
	var slash = url.lastIndexOf("/");
	if(slash >= 0) url = HxOverrides.substr(url,slash + 1,null);
	return flambe_util_Strings.getFileExtension(url);
};
flambe_util_Strings.joinPath = function(base,relative) {
	if(base.length > 0 && StringTools.fastCodeAt(base,base.length - 1) != 47) base += "/";
	return base + relative;
};
flambe_util_Strings.withFields = function(message,fields) {
	var ll = fields.length;
	if(ll > 0) {
		if(message.length > 0) message += " ["; else message += "[";
		var ii = 0;
		while(ii < ll) {
			if(ii > 0) message += ", ";
			var name = fields[ii];
			var value = fields[ii + 1];
			if(Std["is"](value,Error)) {
				var stack = value.stack;
				if(stack != null) value = stack;
			}
			message += name + "=" + Std.string(value);
			ii += 2;
		}
		message += "]";
	}
	return message;
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_crypto_Crc32 = function() { };
$hxClasses["haxe.crypto.Crc32"] = haxe_crypto_Crc32;
haxe_crypto_Crc32.__name__ = true;
haxe_crypto_Crc32.make = function(data) {
	var init = -1;
	var crc = init;
	var b = data.getData();
	var _g1 = 0;
	var _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tmp = (crc ^ haxe_io_Bytes.fastGet(b,i)) & 255;
		var _g2 = 0;
		while(_g2 < 8) {
			var j = _g2++;
			if((tmp & 1) == 1) tmp = tmp >>> 1 ^ -306674912; else tmp >>>= 1;
		}
		crc = crc >>> 8 ^ tmp;
	}
	return crc ^ init;
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = true;
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return true; else if(c < 0) node = node.left; else node = node.right;
		}
		return false;
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = true;
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = true;
haxe_ds_EnumValueMap.__interfaces__ = [IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = Type.enumIndex(k1) - Type.enumIndex(k2);
		if(d != 0) return d;
		var p1 = Type.enumParameters(k1);
		var p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if(Std["is"](v1,Array) && Std["is"](v2,Array)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
$hxClasses["haxe.ds.GenericCell"] = haxe_ds_GenericCell;
haxe_ds_GenericCell.__name__ = true;
haxe_ds_GenericCell.prototype = {
	__class__: haxe_ds_GenericCell
};
var haxe_ds_GenericStack = function() {
};
$hxClasses["haxe.ds.GenericStack"] = haxe_ds_GenericStack;
haxe_ds_GenericStack.__name__ = true;
haxe_ds_GenericStack.prototype = {
	add: function(item) {
		this.head = new haxe_ds_GenericCell(item,this.head);
	}
	,pop: function() {
		var k = this.head;
		if(k == null) return null; else {
			this.head = k.next;
			return k.elt;
		}
	}
	,isEmpty: function() {
		return this.head == null;
	}
	,__class__: haxe_ds_GenericStack
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [IMap];
haxe_ds_ObjectMap.assignId = function(obj) {
	return obj.__id__ = ++haxe_ds_ObjectMap.count;
};
haxe_ds_ObjectMap.getId = function(obj) {
	return obj.__id__;
};
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || haxe_ds_ObjectMap.assignId(key);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[haxe_ds_ObjectMap.getId(key)];
	}
	,exists: function(key) {
		return this.h.__keys__[haxe_ds_ObjectMap.getId(key)] != null;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe_io_Bytes(length,a);
};
haxe_io_Bytes.ofString = function(s) {
	var a = new Array();
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(a.length,a);
};
haxe_io_Bytes.fastGet = function(b,pos) {
	return b[pos];
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe_io_Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,getData: function() {
		return this.b;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_BytesBuffer = function() {
	this.b = new Array();
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	addByte: function($byte) {
		this.b.push($byte);
	}
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(this.b.length,this.b);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = true;
haxe_io_Input.prototype = {
	readByte: function() {
		throw "Not implemented";
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.getData();
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe_io_Error.OutsideBounds;
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,readString: function(len) {
		var b = haxe_io_Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,__class__: haxe_io_Input
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw haxe_io_Error.OutsideBounds;
	this.b = b.getData();
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe_io_BytesInput;
haxe_io_BytesInput.__name__ = true;
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
		if(this.len == 0) throw new haxe_io_Eof();
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe_io_Error.OutsideBounds;
		if(this.len == 0 && len > 0) throw new haxe_io_Eof();
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.getData();
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe_io_BytesInput
});
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = true;
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
$hxClasses["haxe.io.BytesOutput"] = haxe_io_BytesOutput;
haxe_io_BytesOutput.__name__ = true;
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(c) {
		this.b.addByte(c);
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_StringInput = function(s) {
	haxe_io_BytesInput.call(this,haxe_io_Bytes.ofString(s));
};
$hxClasses["haxe.io.StringInput"] = haxe_io_StringInput;
haxe_io_StringInput.__name__ = true;
haxe_io_StringInput.__super__ = haxe_io_BytesInput;
haxe_io_StringInput.prototype = $extend(haxe_io_BytesInput.prototype,{
	__class__: haxe_io_StringInput
});
var haxe_xml_Filter = $hxClasses["haxe.xml.Filter"] = { __ename__ : true, __constructs__ : ["FInt","FBool","FEnum","FReg"] };
haxe_xml_Filter.FInt = ["FInt",0];
haxe_xml_Filter.FInt.toString = $estr;
haxe_xml_Filter.FInt.__enum__ = haxe_xml_Filter;
haxe_xml_Filter.FBool = ["FBool",1];
haxe_xml_Filter.FBool.toString = $estr;
haxe_xml_Filter.FBool.__enum__ = haxe_xml_Filter;
haxe_xml_Filter.FEnum = function(values) { var $x = ["FEnum",2,values]; $x.__enum__ = haxe_xml_Filter; $x.toString = $estr; return $x; };
haxe_xml_Filter.FReg = function(matcher) { var $x = ["FReg",3,matcher]; $x.__enum__ = haxe_xml_Filter; $x.toString = $estr; return $x; };
var haxe_xml_Attrib = $hxClasses["haxe.xml.Attrib"] = { __ename__ : true, __constructs__ : ["Att"] };
haxe_xml_Attrib.Att = function(name,filter,defvalue) { var $x = ["Att",0,name,filter,defvalue]; $x.__enum__ = haxe_xml_Attrib; $x.toString = $estr; return $x; };
var haxe_xml_Rule = $hxClasses["haxe.xml.Rule"] = { __ename__ : true, __constructs__ : ["RNode","RData","RMulti","RList","RChoice","ROptional"] };
haxe_xml_Rule.RNode = function(name,attribs,childs) { var $x = ["RNode",0,name,attribs,childs]; $x.__enum__ = haxe_xml_Rule; $x.toString = $estr; return $x; };
haxe_xml_Rule.RData = function(filter) { var $x = ["RData",1,filter]; $x.__enum__ = haxe_xml_Rule; $x.toString = $estr; return $x; };
haxe_xml_Rule.RMulti = function(rule,atLeastOne) { var $x = ["RMulti",2,rule,atLeastOne]; $x.__enum__ = haxe_xml_Rule; $x.toString = $estr; return $x; };
haxe_xml_Rule.RList = function(rules,ordered) { var $x = ["RList",3,rules,ordered]; $x.__enum__ = haxe_xml_Rule; $x.toString = $estr; return $x; };
haxe_xml_Rule.RChoice = function(choices) { var $x = ["RChoice",4,choices]; $x.__enum__ = haxe_xml_Rule; $x.toString = $estr; return $x; };
haxe_xml_Rule.ROptional = function(rule) { var $x = ["ROptional",5,rule]; $x.__enum__ = haxe_xml_Rule; $x.toString = $estr; return $x; };
var haxe_xml__$Check_CheckResult = $hxClasses["haxe.xml._Check.CheckResult"] = { __ename__ : true, __constructs__ : ["CMatch","CMissing","CExtra","CElementExpected","CDataExpected","CExtraAttrib","CMissingAttrib","CInvalidAttrib","CInvalidData","CInElement"] };
haxe_xml__$Check_CheckResult.CMatch = ["CMatch",0];
haxe_xml__$Check_CheckResult.CMatch.toString = $estr;
haxe_xml__$Check_CheckResult.CMatch.__enum__ = haxe_xml__$Check_CheckResult;
haxe_xml__$Check_CheckResult.CMissing = function(r) { var $x = ["CMissing",1,r]; $x.__enum__ = haxe_xml__$Check_CheckResult; $x.toString = $estr; return $x; };
haxe_xml__$Check_CheckResult.CExtra = function(x) { var $x = ["CExtra",2,x]; $x.__enum__ = haxe_xml__$Check_CheckResult; $x.toString = $estr; return $x; };
haxe_xml__$Check_CheckResult.CElementExpected = function(name,x) { var $x = ["CElementExpected",3,name,x]; $x.__enum__ = haxe_xml__$Check_CheckResult; $x.toString = $estr; return $x; };
haxe_xml__$Check_CheckResult.CDataExpected = function(x) { var $x = ["CDataExpected",4,x]; $x.__enum__ = haxe_xml__$Check_CheckResult; $x.toString = $estr; return $x; };
haxe_xml__$Check_CheckResult.CExtraAttrib = function(att,x) { var $x = ["CExtraAttrib",5,att,x]; $x.__enum__ = haxe_xml__$Check_CheckResult; $x.toString = $estr; return $x; };
haxe_xml__$Check_CheckResult.CMissingAttrib = function(att,x) { var $x = ["CMissingAttrib",6,att,x]; $x.__enum__ = haxe_xml__$Check_CheckResult; $x.toString = $estr; return $x; };
haxe_xml__$Check_CheckResult.CInvalidAttrib = function(att,x,f) { var $x = ["CInvalidAttrib",7,att,x,f]; $x.__enum__ = haxe_xml__$Check_CheckResult; $x.toString = $estr; return $x; };
haxe_xml__$Check_CheckResult.CInvalidData = function(x,f) { var $x = ["CInvalidData",8,x,f]; $x.__enum__ = haxe_xml__$Check_CheckResult; $x.toString = $estr; return $x; };
haxe_xml__$Check_CheckResult.CInElement = function(x,r) { var $x = ["CInElement",9,x,r]; $x.__enum__ = haxe_xml__$Check_CheckResult; $x.toString = $estr; return $x; };
var haxe_xml_Check = function() { };
$hxClasses["haxe.xml.Check"] = haxe_xml_Check;
haxe_xml_Check.__name__ = true;
haxe_xml_Check.isBlank = function(x) {
	return x.nodeType == Xml.PCData && haxe_xml_Check.blanks.match(x.get_nodeValue()) || x.nodeType == Xml.Comment;
};
haxe_xml_Check.filterMatch = function(s,f) {
	switch(Type.enumIndex(f)) {
	case 0:
		return haxe_xml_Check.filterMatch(s,haxe_xml_Filter.FReg(new EReg("[0-9]+","")));
	case 1:
		return haxe_xml_Check.filterMatch(s,haxe_xml_Filter.FEnum(["true","false","0","1"]));
	case 2:
		var values = f[2];
		var _g = 0;
		while(_g < values.length) {
			var v = values[_g];
			++_g;
			if(s == v) return true;
		}
		return false;
	case 3:
		var r = f[2];
		return r.match(s);
	}
};
haxe_xml_Check.isNullable = function(r) {
	switch(Type.enumIndex(r)) {
	case 2:
		var one = r[3];
		var r1 = r[2];
		return one != true || haxe_xml_Check.isNullable(r1);
	case 3:
		var rl = r[2];
		var _g = 0;
		while(_g < rl.length) {
			var r2 = rl[_g];
			++_g;
			if(!haxe_xml_Check.isNullable(r2)) return false;
		}
		return true;
	case 4:
		var rl1 = r[2];
		var _g1 = 0;
		while(_g1 < rl1.length) {
			var r3 = rl1[_g1];
			++_g1;
			if(haxe_xml_Check.isNullable(r3)) return true;
		}
		return false;
	case 1:
		return false;
	case 0:
		return false;
	case 5:
		return true;
	}
};
haxe_xml_Check.check = function(x,r) {
	switch(Type.enumIndex(r)) {
	case 0:
		var childs = r[4];
		var attribs = r[3];
		var name = r[2];
		if(x.nodeType != Xml.Element || x.get_nodeName() != name) return haxe_xml__$Check_CheckResult.CElementExpected(name,x);
		var attribs1;
		if(attribs == null) attribs1 = new Array(); else attribs1 = attribs.slice();
		var $it0 = x.attributes();
		while( $it0.hasNext() ) {
			var xatt = $it0.next();
			var found = false;
			var _g = 0;
			while(_g < attribs1.length) {
				var att = attribs1[_g];
				++_g;
				{
					var filter = att[3];
					var name1 = att[2];
					if(xatt != name1) continue;
					if(filter != null && !haxe_xml_Check.filterMatch(x.get(xatt),filter)) return haxe_xml__$Check_CheckResult.CInvalidAttrib(name1,x,filter);
					HxOverrides.remove(attribs1,att);
					found = true;
				}
			}
			if(!found) return haxe_xml__$Check_CheckResult.CExtraAttrib(xatt,x);
		}
		var _g1 = 0;
		while(_g1 < attribs1.length) {
			var att1 = attribs1[_g1];
			++_g1;
			{
				var defvalue = att1[4];
				var name2 = att1[2];
				if(defvalue == null) return haxe_xml__$Check_CheckResult.CMissingAttrib(name2,x);
			}
		}
		if(childs == null) childs = haxe_xml_Rule.RList([]);
		var m = haxe_xml_Check.checkList(x.iterator(),childs);
		if(m != haxe_xml__$Check_CheckResult.CMatch) return haxe_xml__$Check_CheckResult.CInElement(x,m);
		var _g2 = 0;
		while(_g2 < attribs1.length) {
			var att2 = attribs1[_g2];
			++_g2;
			{
				var defvalue1 = att2[4];
				var name3 = att2[2];
				x.set(name3,defvalue1);
			}
		}
		return haxe_xml__$Check_CheckResult.CMatch;
	case 1:
		var filter1 = r[2];
		if(x.nodeType != Xml.PCData && x.nodeType != Xml.CData) return haxe_xml__$Check_CheckResult.CDataExpected(x);
		if(filter1 != null && !haxe_xml_Check.filterMatch(x.get_nodeValue(),filter1)) return haxe_xml__$Check_CheckResult.CInvalidData(x,filter1);
		return haxe_xml__$Check_CheckResult.CMatch;
	case 4:
		var choices = r[2];
		if(choices.length == 0) throw "No choice possible";
		var _g3 = 0;
		while(_g3 < choices.length) {
			var c = choices[_g3];
			++_g3;
			if(haxe_xml_Check.check(x,c) == haxe_xml__$Check_CheckResult.CMatch) return haxe_xml__$Check_CheckResult.CMatch;
		}
		return haxe_xml_Check.check(x,choices[0]);
	case 5:
		var r1 = r[2];
		return haxe_xml_Check.check(x,r1);
	default:
		throw "Unexpected " + Std.string(r);
	}
};
haxe_xml_Check.checkList = function(it,r) {
	switch(Type.enumIndex(r)) {
	case 3:
		var ordered = r[3];
		var rules = r[2];
		var rules1 = rules.slice();
		while( it.hasNext() ) {
			var x = it.next();
			if(haxe_xml_Check.isBlank(x)) continue;
			var found = false;
			var _g = 0;
			while(_g < rules1.length) {
				var r1 = rules1[_g];
				++_g;
				var m = haxe_xml_Check.checkList(HxOverrides.iter([x]),r1);
				if(m == haxe_xml__$Check_CheckResult.CMatch) {
					found = true;
					switch(Type.enumIndex(r1)) {
					case 2:
						var one = r1[3];
						var rsub = r1[2];
						if(one) {
							var i;
							var _g2 = 0;
							var _g1 = rules1.length;
							while(_g2 < _g1) {
								var i1 = _g2++;
								if(rules1[i1] == r1) rules1[i1] = haxe_xml_Rule.RMulti(rsub);
							}
						}
						break;
					default:
						HxOverrides.remove(rules1,r1);
					}
					break;
				} else if(ordered && !haxe_xml_Check.isNullable(r1)) return m;
			}
			if(!found) return haxe_xml__$Check_CheckResult.CExtra(x);
		}
		var _g3 = 0;
		while(_g3 < rules1.length) {
			var r2 = rules1[_g3];
			++_g3;
			if(!haxe_xml_Check.isNullable(r2)) return haxe_xml__$Check_CheckResult.CMissing(r2);
		}
		return haxe_xml__$Check_CheckResult.CMatch;
	case 2:
		var one1 = r[3];
		var r3 = r[2];
		var found1 = false;
		while( it.hasNext() ) {
			var x1 = it.next();
			if(haxe_xml_Check.isBlank(x1)) continue;
			var m1 = haxe_xml_Check.checkList(HxOverrides.iter([x1]),r3);
			if(m1 != haxe_xml__$Check_CheckResult.CMatch) return m1;
			found1 = true;
		}
		if(one1 && !found1) return haxe_xml__$Check_CheckResult.CMissing(r3);
		return haxe_xml__$Check_CheckResult.CMatch;
	default:
		var found2 = false;
		while( it.hasNext() ) {
			var x2 = it.next();
			if(haxe_xml_Check.isBlank(x2)) continue;
			var m2 = haxe_xml_Check.check(x2,r);
			if(m2 != haxe_xml__$Check_CheckResult.CMatch) return m2;
			found2 = true;
			break;
		}
		if(!found2) switch(Type.enumIndex(r)) {
		case 5:
			break;
		default:
			return haxe_xml__$Check_CheckResult.CMissing(r);
		}
		while( it.hasNext() ) {
			var x3 = it.next();
			if(haxe_xml_Check.isBlank(x3)) continue;
			return haxe_xml__$Check_CheckResult.CExtra(x3);
		}
		return haxe_xml__$Check_CheckResult.CMatch;
	}
};
haxe_xml_Check.makeWhere = function(path) {
	if(path.length == 0) return "";
	var s = "In ";
	var first = true;
	var _g = 0;
	while(_g < path.length) {
		var x = path[_g];
		++_g;
		if(first) first = false; else s += ".";
		s += x.get_nodeName();
	}
	return s + ": ";
};
haxe_xml_Check.makeString = function(x) {
	if(x.nodeType == Xml.Element) return "element " + x.get_nodeName();
	var s = x.get_nodeValue().split("\r").join("\\r").split("\n").join("\\n").split("\t").join("\\t");
	if(s.length > 20) return HxOverrides.substr(s,0,17) + "...";
	return s;
};
haxe_xml_Check.makeRule = function(r) {
	switch(Type.enumIndex(r)) {
	case 0:
		var name = r[2];
		return "element " + name;
	case 1:
		return "data";
	case 2:
		var r1 = r[2];
		return haxe_xml_Check.makeRule(r1);
	case 3:
		var rules = r[2];
		return haxe_xml_Check.makeRule(rules[0]);
	case 4:
		var choices = r[2];
		return haxe_xml_Check.makeRule(choices[0]);
	case 5:
		var r2 = r[2];
		return haxe_xml_Check.makeRule(r2);
	}
};
haxe_xml_Check.makeError = function(m,path) {
	if(path == null) path = new Array();
	switch(Type.enumIndex(m)) {
	case 0:
		throw "assert";
		break;
	case 1:
		var r = m[2];
		return haxe_xml_Check.makeWhere(path) + "Missing " + haxe_xml_Check.makeRule(r);
	case 2:
		var x = m[2];
		return haxe_xml_Check.makeWhere(path) + "Unexpected " + haxe_xml_Check.makeString(x);
	case 3:
		var x1 = m[3];
		var name = m[2];
		return haxe_xml_Check.makeWhere(path) + haxe_xml_Check.makeString(x1) + " while expected element " + name;
	case 4:
		var x2 = m[2];
		return haxe_xml_Check.makeWhere(path) + haxe_xml_Check.makeString(x2) + " while data expected";
	case 5:
		var x3 = m[3];
		var att = m[2];
		path.push(x3);
		return haxe_xml_Check.makeWhere(path) + "unexpected attribute " + att;
	case 6:
		var x4 = m[3];
		var att1 = m[2];
		path.push(x4);
		return haxe_xml_Check.makeWhere(path) + "missing required attribute " + att1;
	case 7:
		var x5 = m[3];
		var att2 = m[2];
		path.push(x5);
		return haxe_xml_Check.makeWhere(path) + "invalid attribute value for " + att2;
	case 8:
		var x6 = m[2];
		return haxe_xml_Check.makeWhere(path) + "invalid data format for " + haxe_xml_Check.makeString(x6);
	case 9:
		var m1 = m[3];
		var x7 = m[2];
		path.push(x7);
		return haxe_xml_Check.makeError(m1,path);
	}
};
haxe_xml_Check.checkNode = function(x,r) {
	var m = haxe_xml_Check.checkList(HxOverrides.iter([x]),r);
	if(m == haxe_xml__$Check_CheckResult.CMatch) return;
	throw haxe_xml_Check.makeError(m);
};
var haxe_xml__$Fast_NodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeAccess"] = haxe_xml__$Fast_NodeAccess;
haxe_xml__$Fast_NodeAccess.__name__ = true;
haxe_xml__$Fast_NodeAccess.prototype = {
	resolve: function(name) {
		var x = this.__x.elementsNamed(name).next();
		if(x == null) {
			var xname;
			if(this.__x.nodeType == Xml.Document) xname = "Document"; else xname = this.__x.get_nodeName();
			throw xname + " is missing element " + name;
		}
		return new haxe_xml_Fast(x);
	}
	,__class__: haxe_xml__$Fast_NodeAccess
};
var haxe_xml__$Fast_AttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.AttribAccess"] = haxe_xml__$Fast_AttribAccess;
haxe_xml__$Fast_AttribAccess.__name__ = true;
haxe_xml__$Fast_AttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		var v = this.__x.get(name);
		if(v == null) throw this.__x.get_nodeName() + " is missing attribute " + name;
		return v;
	}
	,__class__: haxe_xml__$Fast_AttribAccess
};
var haxe_xml__$Fast_HasAttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasAttribAccess"] = haxe_xml__$Fast_HasAttribAccess;
haxe_xml__$Fast_HasAttribAccess.__name__ = true;
haxe_xml__$Fast_HasAttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		return this.__x.exists(name);
	}
	,__class__: haxe_xml__$Fast_HasAttribAccess
};
var haxe_xml__$Fast_HasNodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasNodeAccess"] = haxe_xml__$Fast_HasNodeAccess;
haxe_xml__$Fast_HasNodeAccess.__name__ = true;
haxe_xml__$Fast_HasNodeAccess.prototype = {
	resolve: function(name) {
		return this.__x.elementsNamed(name).hasNext();
	}
	,__class__: haxe_xml__$Fast_HasNodeAccess
};
var haxe_xml__$Fast_NodeListAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeListAccess"] = haxe_xml__$Fast_NodeListAccess;
haxe_xml__$Fast_NodeListAccess.__name__ = true;
haxe_xml__$Fast_NodeListAccess.prototype = {
	resolve: function(name) {
		var l = new List();
		var $it0 = this.__x.elementsNamed(name);
		while( $it0.hasNext() ) {
			var x = $it0.next();
			l.add(new haxe_xml_Fast(x));
		}
		return l;
	}
	,__class__: haxe_xml__$Fast_NodeListAccess
};
var haxe_xml_Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + Std.string(x.nodeType);
	this.x = x;
	this.node = new haxe_xml__$Fast_NodeAccess(x);
	this.nodes = new haxe_xml__$Fast_NodeListAccess(x);
	this.att = new haxe_xml__$Fast_AttribAccess(x);
	this.has = new haxe_xml__$Fast_HasAttribAccess(x);
	this.hasNode = new haxe_xml__$Fast_HasNodeAccess(x);
};
$hxClasses["haxe.xml.Fast"] = haxe_xml_Fast;
haxe_xml_Fast.__name__ = true;
haxe_xml_Fast.prototype = {
	get_name: function() {
		if(this.x.nodeType == Xml.Document) return "Document"; else return this.x.get_nodeName();
	}
	,get_elements: function() {
		var it = this.x.elements();
		return { hasNext : $bind(it,it.hasNext), next : function() {
			var x = it.next();
			if(x == null) return null;
			return new haxe_xml_Fast(x);
		}};
	}
	,__class__: haxe_xml_Fast
};
var haxe_xml_Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser;
haxe_xml_Parser.__name__ = true;
haxe_xml_Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = StringTools.fastCodeAt(str,p);
	var buf = new StringBuf();
	while(!StringTools.isEof(c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.toString() + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && StringTools.fastCodeAt(str,p + 1) == 93 && StringTools.fastCodeAt(str,p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(StringTools.fastCodeAt(str,p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(StringTools.fastCodeAt(str,p + 1) == 68 || StringTools.fastCodeAt(str,p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(StringTools.fastCodeAt(str,p + 1) != 45 || StringTools.fastCodeAt(str,p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!haxe_xml_Parser.isValidChar(c)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!haxe_xml_Parser.isValidChar(c)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == StringTools.fastCodeAt(str,start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!haxe_xml_Parser.isValidChar(c)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && StringTools.fastCodeAt(str,p + 1) == 45 && StringTools.fastCodeAt(str,p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && StringTools.fastCodeAt(str,p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(StringTools.fastCodeAt(s,0) == 35) {
					var i;
					if(StringTools.fastCodeAt(s,1) == 120) i = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else i = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.add(String.fromCharCode(i));
				} else if(!haxe_xml_Parser.escapes.exists(s)) buf.add("&" + s + ";"); else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.toString() + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
};
haxe_xml_Parser.isValidChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45;
};
var hscript_Const = $hxClasses["hscript.Const"] = { __ename__ : true, __constructs__ : ["CInt","CFloat","CString"] };
hscript_Const.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = hscript_Const; $x.toString = $estr; return $x; };
hscript_Const.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = hscript_Const; $x.toString = $estr; return $x; };
hscript_Const.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = hscript_Const; $x.toString = $estr; return $x; };
var hscript_Expr = $hxClasses["hscript.Expr"] = { __ename__ : true, __constructs__ : ["EConst","EIdent","EVar","EParent","EBlock","EField","EBinop","EUnop","ECall","EIf","EWhile","EFor","EBreak","EContinue","EFunction","EReturn","EArray","EArrayDecl","ENew","EThrow","ETry","EObject","ETernary","ESwitch"] };
hscript_Expr.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EIdent = function(v) { var $x = ["EIdent",1,v]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EVar = function(n,t,e) { var $x = ["EVar",2,n,t,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EParent = function(e) { var $x = ["EParent",3,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EBlock = function(e) { var $x = ["EBlock",4,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EField = function(e,f) { var $x = ["EField",5,e,f]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EBinop = function(op,e1,e2) { var $x = ["EBinop",6,op,e1,e2]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EUnop = function(op,prefix,e) { var $x = ["EUnop",7,op,prefix,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ECall = function(e,params) { var $x = ["ECall",8,e,params]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EIf = function(cond,e1,e2) { var $x = ["EIf",9,cond,e1,e2]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EWhile = function(cond,e) { var $x = ["EWhile",10,cond,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EFor = function(v,it,e) { var $x = ["EFor",11,v,it,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EBreak = ["EBreak",12];
hscript_Expr.EBreak.toString = $estr;
hscript_Expr.EBreak.__enum__ = hscript_Expr;
hscript_Expr.EContinue = ["EContinue",13];
hscript_Expr.EContinue.toString = $estr;
hscript_Expr.EContinue.__enum__ = hscript_Expr;
hscript_Expr.EFunction = function(args,e,name,ret) { var $x = ["EFunction",14,args,e,name,ret]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EReturn = function(e) { var $x = ["EReturn",15,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EArray = function(e,index) { var $x = ["EArray",16,e,index]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EArrayDecl = function(e) { var $x = ["EArrayDecl",17,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ENew = function(cl,params) { var $x = ["ENew",18,cl,params]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EThrow = function(e) { var $x = ["EThrow",19,e]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ETry = function(e,v,t,ecatch) { var $x = ["ETry",20,e,v,t,ecatch]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.EObject = function(fl) { var $x = ["EObject",21,fl]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ETernary = function(cond,e1,e2) { var $x = ["ETernary",22,cond,e1,e2]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
hscript_Expr.ESwitch = function(e,cases,defaultExpr) { var $x = ["ESwitch",23,e,cases,defaultExpr]; $x.__enum__ = hscript_Expr; $x.toString = $estr; return $x; };
var hscript_CType = $hxClasses["hscript.CType"] = { __ename__ : true, __constructs__ : ["CTPath","CTFun","CTAnon","CTParent"] };
hscript_CType.CTPath = function(path,params) { var $x = ["CTPath",0,path,params]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
hscript_CType.CTFun = function(args,ret) { var $x = ["CTFun",1,args,ret]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
hscript_CType.CTAnon = function(fields) { var $x = ["CTAnon",2,fields]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
hscript_CType.CTParent = function(t) { var $x = ["CTParent",3,t]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
var hscript_Error = $hxClasses["hscript.Error"] = { __ename__ : true, __constructs__ : ["EInvalidChar","EUnexpected","EUnterminatedString","EUnterminatedComment","EUnknownVariable","EInvalidIterator","EInvalidOp","EInvalidAccess"] };
hscript_Error.EInvalidChar = function(c) { var $x = ["EInvalidChar",0,c]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EUnexpected = function(s) { var $x = ["EUnexpected",1,s]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EUnterminatedString = ["EUnterminatedString",2];
hscript_Error.EUnterminatedString.toString = $estr;
hscript_Error.EUnterminatedString.__enum__ = hscript_Error;
hscript_Error.EUnterminatedComment = ["EUnterminatedComment",3];
hscript_Error.EUnterminatedComment.toString = $estr;
hscript_Error.EUnterminatedComment.__enum__ = hscript_Error;
hscript_Error.EUnknownVariable = function(v) { var $x = ["EUnknownVariable",4,v]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EInvalidIterator = function(v) { var $x = ["EInvalidIterator",5,v]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EInvalidOp = function(op) { var $x = ["EInvalidOp",6,op]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
hscript_Error.EInvalidAccess = function(f) { var $x = ["EInvalidAccess",7,f]; $x.__enum__ = hscript_Error; $x.toString = $estr; return $x; };
var hscript__$Interp_Stop = $hxClasses["hscript._Interp.Stop"] = { __ename__ : true, __constructs__ : ["SBreak","SContinue","SReturn"] };
hscript__$Interp_Stop.SBreak = ["SBreak",0];
hscript__$Interp_Stop.SBreak.toString = $estr;
hscript__$Interp_Stop.SBreak.__enum__ = hscript__$Interp_Stop;
hscript__$Interp_Stop.SContinue = ["SContinue",1];
hscript__$Interp_Stop.SContinue.toString = $estr;
hscript__$Interp_Stop.SContinue.__enum__ = hscript__$Interp_Stop;
hscript__$Interp_Stop.SReturn = function(v) { var $x = ["SReturn",2,v]; $x.__enum__ = hscript__$Interp_Stop; $x.toString = $estr; return $x; };
var hscript_Interp = function() {
	this.variables = new haxe_ds_StringMap();
	this.locals = new haxe_ds_StringMap();
	this.variables.set("null",null);
	this.variables.set("true",true);
	this.variables.set("false",false);
	this.variables.set("trace",function(e) {
		haxe_Log.trace(Std.string(e),{ fileName : "hscript", lineNumber : 0});
	});
	this.initOps();
};
$hxClasses["hscript.Interp"] = hscript_Interp;
hscript_Interp.__name__ = true;
hscript_Interp.prototype = {
	initOps: function() {
		var me = this;
		this.binops = new haxe_ds_StringMap();
		this.binops.set("+",function(e1,e2) {
			return me.expr(e1) + me.expr(e2);
		});
		this.binops.set("-",function(e11,e21) {
			return me.expr(e11) - me.expr(e21);
		});
		this.binops.set("*",function(e12,e22) {
			return me.expr(e12) * me.expr(e22);
		});
		this.binops.set("/",function(e13,e23) {
			return me.expr(e13) / me.expr(e23);
		});
		this.binops.set("%",function(e14,e24) {
			return me.expr(e14) % me.expr(e24);
		});
		this.binops.set("&",function(e15,e25) {
			return me.expr(e15) & me.expr(e25);
		});
		this.binops.set("|",function(e16,e26) {
			return me.expr(e16) | me.expr(e26);
		});
		this.binops.set("^",function(e17,e27) {
			return me.expr(e17) ^ me.expr(e27);
		});
		this.binops.set("<<",function(e18,e28) {
			return me.expr(e18) << me.expr(e28);
		});
		this.binops.set(">>",function(e19,e29) {
			return me.expr(e19) >> me.expr(e29);
		});
		this.binops.set(">>>",function(e110,e210) {
			return me.expr(e110) >>> me.expr(e210);
		});
		this.binops.set("==",function(e111,e211) {
			return me.expr(e111) == me.expr(e211);
		});
		this.binops.set("!=",function(e112,e212) {
			return me.expr(e112) != me.expr(e212);
		});
		this.binops.set(">=",function(e113,e213) {
			return me.expr(e113) >= me.expr(e213);
		});
		this.binops.set("<=",function(e114,e214) {
			return me.expr(e114) <= me.expr(e214);
		});
		this.binops.set(">",function(e115,e215) {
			return me.expr(e115) > me.expr(e215);
		});
		this.binops.set("<",function(e116,e216) {
			return me.expr(e116) < me.expr(e216);
		});
		this.binops.set("||",function(e117,e217) {
			return me.expr(e117) == true || me.expr(e217) == true;
		});
		this.binops.set("&&",function(e118,e218) {
			return me.expr(e118) == true && me.expr(e218) == true;
		});
		this.binops.set("=",$bind(this,this.assign));
		this.binops.set("...",function(e119,e219) {
			return new IntIterator(me.expr(e119),me.expr(e219));
		});
		this.assignOp("+=",function(v1,v2) {
			return v1 + v2;
		});
		this.assignOp("-=",function(v11,v21) {
			return v11 - v21;
		});
		this.assignOp("*=",function(v12,v22) {
			return v12 * v22;
		});
		this.assignOp("/=",function(v13,v23) {
			return v13 / v23;
		});
		this.assignOp("%=",function(v14,v24) {
			return v14 % v24;
		});
		this.assignOp("&=",function(v15,v25) {
			return v15 & v25;
		});
		this.assignOp("|=",function(v16,v26) {
			return v16 | v26;
		});
		this.assignOp("^=",function(v17,v27) {
			return v17 ^ v27;
		});
		this.assignOp("<<=",function(v18,v28) {
			return v18 << v28;
		});
		this.assignOp(">>=",function(v19,v29) {
			return v19 >> v29;
		});
		this.assignOp(">>>=",function(v110,v210) {
			return v110 >>> v210;
		});
	}
	,assign: function(e1,e2) {
		var v = this.expr(e2);
		{
			var _g = this.edef(e1);
			switch(Type.enumIndex(_g)) {
			case 1:
				var id = _g[2];
				var l = this.locals.get(id);
				if(l == null) this.variables.set(id,v); else l.r = v;
				break;
			case 5:
				var f = _g[3];
				var e = _g[2];
				v = this.set(this.expr(e),f,v);
				break;
			case 16:
				var index = _g[3];
				var e3 = _g[2];
				this.expr(e3)[this.expr(index)] = v;
				break;
			default:
				this.error(hscript_Error.EInvalidOp("="));
			}
		}
		return v;
	}
	,assignOp: function(op,fop) {
		var me = this;
		this.binops.set(op,function(e1,e2) {
			return me.evalAssignOp(op,fop,e1,e2);
		});
	}
	,evalAssignOp: function(op,fop,e1,e2) {
		var v;
		{
			var _g = this.edef(e1);
			switch(Type.enumIndex(_g)) {
			case 1:
				var id = _g[2];
				var l = this.locals.get(id);
				v = fop(this.expr(e1),this.expr(e2));
				if(l == null) this.variables.set(id,v); else l.r = v;
				break;
			case 5:
				var f = _g[3];
				var e = _g[2];
				var obj = this.expr(e);
				v = fop(this.get(obj,f),this.expr(e2));
				v = this.set(obj,f,v);
				break;
			case 16:
				var index = _g[3];
				var e3 = _g[2];
				var arr = this.expr(e3);
				var index1 = this.expr(index);
				v = fop(arr[index1],this.expr(e2));
				arr[index1] = v;
				break;
			default:
				return this.error(hscript_Error.EInvalidOp(op));
			}
		}
		return v;
	}
	,increment: function(e,prefix,delta) {
		switch(Type.enumIndex(e)) {
		case 1:
			var id = e[2];
			var l = this.locals.get(id);
			var v;
			if(l == null) v = this.variables.get(id); else v = l.r;
			if(prefix) {
				v += delta;
				if(l == null) {
					var value = v;
					this.variables.set(id,value);
				} else l.r = v;
			} else if(l == null) {
				var value1 = v + delta;
				this.variables.set(id,value1);
			} else l.r = v + delta;
			return v;
		case 5:
			var f = e[3];
			var e1 = e[2];
			var obj = this.expr(e1);
			var v1 = this.get(obj,f);
			if(prefix) {
				v1 += delta;
				this.set(obj,f,v1);
			} else this.set(obj,f,v1 + delta);
			return v1;
		case 16:
			var index = e[3];
			var e2 = e[2];
			var arr = this.expr(e2);
			var index1 = this.expr(index);
			var v2 = arr[index1];
			if(prefix) {
				v2 += delta;
				arr[index1] = v2;
			} else arr[index1] = v2 + delta;
			return v2;
		default:
			return this.error(hscript_Error.EInvalidOp(delta > 0?"++":"--"));
		}
	}
	,execute: function(expr) {
		this.depth = 0;
		this.locals = new haxe_ds_StringMap();
		this.declared = new Array();
		return this.exprReturn(expr);
	}
	,exprReturn: function(e) {
		try {
			return this.expr(e);
		} catch( e1 ) {
			if( js_Boot.__instanceof(e1,hscript__$Interp_Stop) ) {
				switch(Type.enumIndex(e1)) {
				case 0:
					throw "Invalid break";
					break;
				case 1:
					throw "Invalid continue";
					break;
				case 2:
					var v = e1[2];
					return v;
				}
			} else throw(e1);
		}
		return null;
	}
	,duplicate: function(h) {
		var h2 = new haxe_ds_StringMap();
		var $it0 = h.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var value = h.get(k);
			h2.set(k,value);
		}
		return h2;
	}
	,restore: function(old) {
		while(this.declared.length > old) {
			var d = this.declared.pop();
			this.locals.set(d.n,d.old);
		}
	}
	,edef: function(e) {
		return e;
	}
	,error: function(e) {
		throw e;
		return null;
	}
	,resolve: function(id) {
		var l = this.locals.get(id);
		if(l != null) return l.r;
		var v = this.variables.get(id);
		if(v == null && !this.variables.exists(id)) this.error(hscript_Error.EUnknownVariable(id));
		return v;
	}
	,expr: function(e) {
		switch(Type.enumIndex(e)) {
		case 0:
			var c = e[2];
			switch(Type.enumIndex(c)) {
			case 0:
				var v = c[2];
				return v;
			case 1:
				var f = c[2];
				return f;
			case 2:
				var s = c[2];
				return s;
			}
			break;
		case 1:
			var id = e[2];
			return this.resolve(id);
		case 2:
			var e1 = e[4];
			var n = e[2];
			this.declared.push({ n : n, old : this.locals.get(n)});
			var value = { r : e1 == null?null:this.expr(e1)};
			this.locals.set(n,value);
			return null;
		case 3:
			var e2 = e[2];
			return this.expr(e2);
		case 4:
			var exprs = e[2];
			var old = this.declared.length;
			var v1 = null;
			var _g = 0;
			while(_g < exprs.length) {
				var e3 = exprs[_g];
				++_g;
				v1 = this.expr(e3);
			}
			this.restore(old);
			return v1;
		case 5:
			var f1 = e[3];
			var e4 = e[2];
			return this.get(this.expr(e4),f1);
		case 6:
			var e21 = e[4];
			var e11 = e[3];
			var op = e[2];
			var fop = this.binops.get(op);
			if(fop == null) this.error(hscript_Error.EInvalidOp(op));
			return fop(e11,e21);
		case 7:
			var e5 = e[4];
			var prefix = e[3];
			var op1 = e[2];
			switch(op1) {
			case "!":
				return this.expr(e5) != true;
			case "-":
				return -this.expr(e5);
			case "++":
				return this.increment(e5,prefix,1);
			case "--":
				return this.increment(e5,prefix,-1);
			case "~":
				return ~this.expr(e5);
			default:
				this.error(hscript_Error.EInvalidOp(op1));
			}
			break;
		case 8:
			var params = e[3];
			var e6 = e[2];
			var args = new Array();
			var _g1 = 0;
			while(_g1 < params.length) {
				var p = params[_g1];
				++_g1;
				args.push(this.expr(p));
			}
			{
				var _g2 = this.edef(e6);
				switch(Type.enumIndex(_g2)) {
				case 5:
					var f2 = _g2[3];
					var e7 = _g2[2];
					var obj = this.expr(e7);
					if(obj == null) this.error(hscript_Error.EInvalidAccess(f2));
					return this.fcall(obj,f2,args);
				default:
					return this.call(null,this.expr(e6),args);
				}
			}
			break;
		case 9:
			var e22 = e[4];
			var e12 = e[3];
			var econd = e[2];
			if(this.expr(econd) == true) return this.expr(e12); else if(e22 == null) return null; else return this.expr(e22);
			break;
		case 10:
			var e8 = e[3];
			var econd1 = e[2];
			this.whileLoop(econd1,e8);
			return null;
		case 11:
			var e9 = e[4];
			var it = e[3];
			var v2 = e[2];
			this.forLoop(v2,it,e9);
			return null;
		case 12:
			throw hscript__$Interp_Stop.SBreak;
			break;
		case 13:
			throw hscript__$Interp_Stop.SContinue;
			break;
		case 15:
			var e10 = e[2];
			throw hscript__$Interp_Stop.SReturn(e10 == null?null:this.expr(e10));
			break;
		case 14:
			var name = e[4];
			var fexpr = e[3];
			var params1 = e[2];
			var capturedLocals = this.duplicate(this.locals);
			var me = this;
			var hasOpt = false;
			var minParams = 0;
			var _g3 = 0;
			while(_g3 < params1.length) {
				var p1 = params1[_g3];
				++_g3;
				if(p1.opt) hasOpt = true; else minParams++;
			}
			var f3 = function(args1) {
				if(args1.length != params1.length) {
					if(args1.length < minParams) {
						var str = "Invalid number of parameters. Got " + args1.length + ", required " + minParams;
						if(name != null) str += " for function '" + name + "'";
						throw str;
					}
					var args2 = [];
					var extraParams = args1.length - minParams;
					var pos = 0;
					var _g4 = 0;
					while(_g4 < params1.length) {
						var p2 = params1[_g4];
						++_g4;
						if(p2.opt) {
							if(extraParams > 0) {
								args2.push(args1[pos++]);
								extraParams--;
							} else args2.push(null);
						} else args2.push(args1[pos++]);
					}
					args1 = args2;
				}
				var old1 = me.locals;
				var depth = me.depth;
				me.depth++;
				me.locals = me.duplicate(capturedLocals);
				var _g11 = 0;
				var _g5 = params1.length;
				while(_g11 < _g5) {
					var i = _g11++;
					me.locals.set(params1[i].name,{ r : args1[i]});
				}
				var r = null;
				try {
					r = me.exprReturn(fexpr);
				} catch( e13 ) {
					me.locals = old1;
					me.depth = depth;
					throw e13;
				}
				me.locals = old1;
				me.depth = depth;
				return r;
			};
			var f4 = Reflect.makeVarArgs(f3);
			if(name != null) {
				if(this.depth == 0) this.variables.set(name,f4); else {
					this.declared.push({ n : name, old : this.locals.get(name)});
					var ref = { r : f4};
					this.locals.set(name,ref);
					capturedLocals.set(name,ref);
				}
			}
			return f4;
		case 17:
			var arr = e[2];
			var a = new Array();
			var _g6 = 0;
			while(_g6 < arr.length) {
				var e14 = arr[_g6];
				++_g6;
				a.push(this.expr(e14));
			}
			return a;
		case 16:
			var index = e[3];
			var e15 = e[2];
			return this.expr(e15)[this.expr(index)];
		case 18:
			var params2 = e[3];
			var cl = e[2];
			var a1 = new Array();
			var _g7 = 0;
			while(_g7 < params2.length) {
				var e16 = params2[_g7];
				++_g7;
				a1.push(this.expr(e16));
			}
			return this.cnew(cl,a1);
		case 19:
			var e17 = e[2];
			throw this.expr(e17);
			break;
		case 20:
			var ecatch = e[5];
			var n1 = e[3];
			var e18 = e[2];
			var old2 = this.declared.length;
			try {
				var v3 = this.expr(e18);
				this.restore(old2);
				return v3;
			} catch( $e0 ) {
				if( js_Boot.__instanceof($e0,hscript__$Interp_Stop) ) {
					var err = $e0;
					throw err;
				} else {
				var err1 = $e0;
				this.restore(old2);
				this.declared.push({ n : n1, old : this.locals.get(n1)});
				this.locals.set(n1,{ r : err1});
				var v4 = this.expr(ecatch);
				this.restore(old2);
				return v4;
				}
			}
			break;
		case 21:
			var fl = e[2];
			var o = { };
			var _g8 = 0;
			while(_g8 < fl.length) {
				var f5 = fl[_g8];
				++_g8;
				this.set(o,f5.name,this.expr(f5.e));
			}
			return o;
		case 22:
			var e23 = e[4];
			var e19 = e[3];
			var econd2 = e[2];
			if(this.expr(econd2) == true) return this.expr(e19); else return this.expr(e23);
			break;
		case 23:
			var def = e[4];
			var cases = e[3];
			var e20 = e[2];
			var val = this.expr(e20);
			var match = false;
			var _g9 = 0;
			while(_g9 < cases.length) {
				var c1 = cases[_g9];
				++_g9;
				var _g12 = 0;
				var _g21 = c1.values;
				while(_g12 < _g21.length) {
					var v5 = _g21[_g12];
					++_g12;
					if(this.expr(v5) == val) {
						match = true;
						break;
					}
				}
				if(match) {
					val = this.expr(c1.expr);
					break;
				}
			}
			if(!match) if(def == null) val = null; else val = this.expr(def);
			return val;
		}
		return null;
	}
	,whileLoop: function(econd,e) {
		var old = this.declared.length;
		try {
			while(this.expr(econd) == true) try {
				this.expr(e);
			} catch( err ) {
				if( js_Boot.__instanceof(err,hscript__$Interp_Stop) ) {
					switch(Type.enumIndex(err)) {
					case 1:
						break;
					case 0:
						throw "__break__";
						break;
					case 2:
						throw err;
						break;
					}
				} else throw(err);
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		this.restore(old);
	}
	,makeIterator: function(v) {
		try {
			v = $iterator(v)();
		} catch( e ) {
		}
		if(v.hasNext == null || v.next == null) this.error(hscript_Error.EInvalidIterator(v));
		return v;
	}
	,forLoop: function(n,it,e) {
		var old = this.declared.length;
		this.declared.push({ n : n, old : this.locals.get(n)});
		var it1 = this.makeIterator(this.expr(it));
		try {
			while(it1.hasNext()) {
				var value = { r : it1.next()};
				this.locals.set(n,value);
				try {
					this.expr(e);
				} catch( err ) {
					if( js_Boot.__instanceof(err,hscript__$Interp_Stop) ) {
						switch(Type.enumIndex(err)) {
						case 1:
							break;
						case 0:
							throw "__break__";
							break;
						case 2:
							throw err;
							break;
						}
					} else throw(err);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		this.restore(old);
	}
	,get: function(o,f) {
		if(o == null) this.error(hscript_Error.EInvalidAccess(f));
		return Reflect.field(o,f);
	}
	,set: function(o,f,v) {
		if(o == null) this.error(hscript_Error.EInvalidAccess(f));
		Reflect.setField(o,f,v);
		return v;
	}
	,fcall: function(o,f,args) {
		return this.call(o,Reflect.field(o,f),args);
	}
	,call: function(o,f,args) {
		return Reflect.callMethod(o,f,args);
	}
	,cnew: function(cl,args) {
		var c = Type.resolveClass(cl);
		if(c == null) c = this.resolve(cl);
		return Type.createInstance(c,args);
	}
	,__class__: hscript_Interp
};
var hscript_Token = $hxClasses["hscript.Token"] = { __ename__ : true, __constructs__ : ["TEof","TConst","TId","TOp","TPOpen","TPClose","TBrOpen","TBrClose","TDot","TComma","TSemicolon","TBkOpen","TBkClose","TQuestion","TDoubleDot"] };
hscript_Token.TEof = ["TEof",0];
hscript_Token.TEof.toString = $estr;
hscript_Token.TEof.__enum__ = hscript_Token;
hscript_Token.TConst = function(c) { var $x = ["TConst",1,c]; $x.__enum__ = hscript_Token; $x.toString = $estr; return $x; };
hscript_Token.TId = function(s) { var $x = ["TId",2,s]; $x.__enum__ = hscript_Token; $x.toString = $estr; return $x; };
hscript_Token.TOp = function(s) { var $x = ["TOp",3,s]; $x.__enum__ = hscript_Token; $x.toString = $estr; return $x; };
hscript_Token.TPOpen = ["TPOpen",4];
hscript_Token.TPOpen.toString = $estr;
hscript_Token.TPOpen.__enum__ = hscript_Token;
hscript_Token.TPClose = ["TPClose",5];
hscript_Token.TPClose.toString = $estr;
hscript_Token.TPClose.__enum__ = hscript_Token;
hscript_Token.TBrOpen = ["TBrOpen",6];
hscript_Token.TBrOpen.toString = $estr;
hscript_Token.TBrOpen.__enum__ = hscript_Token;
hscript_Token.TBrClose = ["TBrClose",7];
hscript_Token.TBrClose.toString = $estr;
hscript_Token.TBrClose.__enum__ = hscript_Token;
hscript_Token.TDot = ["TDot",8];
hscript_Token.TDot.toString = $estr;
hscript_Token.TDot.__enum__ = hscript_Token;
hscript_Token.TComma = ["TComma",9];
hscript_Token.TComma.toString = $estr;
hscript_Token.TComma.__enum__ = hscript_Token;
hscript_Token.TSemicolon = ["TSemicolon",10];
hscript_Token.TSemicolon.toString = $estr;
hscript_Token.TSemicolon.__enum__ = hscript_Token;
hscript_Token.TBkOpen = ["TBkOpen",11];
hscript_Token.TBkOpen.toString = $estr;
hscript_Token.TBkOpen.__enum__ = hscript_Token;
hscript_Token.TBkClose = ["TBkClose",12];
hscript_Token.TBkClose.toString = $estr;
hscript_Token.TBkClose.__enum__ = hscript_Token;
hscript_Token.TQuestion = ["TQuestion",13];
hscript_Token.TQuestion.toString = $estr;
hscript_Token.TQuestion.__enum__ = hscript_Token;
hscript_Token.TDoubleDot = ["TDoubleDot",14];
hscript_Token.TDoubleDot.toString = $estr;
hscript_Token.TDoubleDot.__enum__ = hscript_Token;
var hscript_Parser = function() {
	this.uid = 0;
	this.line = 1;
	this.opChars = "+*/-=!><&|^%~";
	this.identChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	var priorities = [["%"],["*","/"],["+","-"],["<<",">>",">>>"],["|","&","^"],["==","!=",">","<",">=","<="],["..."],["&&"],["||"],["=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","|=","&=","^="]];
	this.opPriority = new haxe_ds_StringMap();
	this.opRightAssoc = new haxe_ds_StringMap();
	this.unops = new haxe_ds_StringMap();
	var _g1 = 0;
	var _g = priorities.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g2 = 0;
		var _g3 = priorities[i];
		while(_g2 < _g3.length) {
			var x = _g3[_g2];
			++_g2;
			this.opPriority.set(x,i);
			if(i == 9) this.opRightAssoc.set(x,true);
		}
	}
	var _g4 = 0;
	var _g11 = ["!","++","--","-","~"];
	while(_g4 < _g11.length) {
		var x1 = _g11[_g4];
		++_g4;
		this.unops.set(x1,x1 == "++" || x1 == "--");
	}
};
$hxClasses["hscript.Parser"] = hscript_Parser;
hscript_Parser.__name__ = true;
hscript_Parser.prototype = {
	error: function(err,pmin,pmax) {
		throw err;
	}
	,invalidChar: function(c) {
		this.error(hscript_Error.EInvalidChar(c),0,0);
	}
	,parseString: function(s) {
		this.line = 1;
		this.uid = 0;
		return this.parse(new haxe_io_StringInput(s));
	}
	,parse: function(s) {
		this.tokens = new haxe_ds_GenericStack();
		this["char"] = -1;
		this.input = s;
		this.ops = new Array();
		this.idents = new Array();
		var _g1 = 0;
		var _g = this.opChars.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.ops[HxOverrides.cca(this.opChars,i)] = true;
		}
		var _g11 = 0;
		var _g2 = this.identChars.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.idents[HxOverrides.cca(this.identChars,i1)] = true;
		}
		var a = new Array();
		while(true) {
			var tk = this.token();
			if(tk == hscript_Token.TEof) break;
			this.push(tk);
			a.push(this.parseFullExpr());
		}
		if(a.length == 1) return a[0]; else return this.mk(hscript_Expr.EBlock(a),0);
	}
	,unexpected: function(tk) {
		this.error(hscript_Error.EUnexpected(this.tokenString(tk)),0,0);
		return null;
	}
	,push: function(tk) {
		this.tokens.add(tk);
	}
	,ensure: function(tk) {
		var t = this.token();
		if(t != tk) this.unexpected(t);
	}
	,expr: function(e) {
		return e;
	}
	,pmin: function(e) {
		return 0;
	}
	,pmax: function(e) {
		return 0;
	}
	,mk: function(e,pmin,pmax) {
		return e;
	}
	,isBlock: function(e) {
		{
			var _g = this.expr(e);
			switch(Type.enumIndex(_g)) {
			case 4:case 21:case 23:
				return true;
			case 14:
				var e1 = _g[3];
				return this.isBlock(e1);
			case 2:
				var e2 = _g[4];
				return e2 != null && this.isBlock(e2);
			case 9:
				var e21 = _g[4];
				var e11 = _g[3];
				if(e21 != null) return this.isBlock(e21); else return this.isBlock(e11);
				break;
			case 6:
				var e3 = _g[4];
				return this.isBlock(e3);
			case 7:
				var e4 = _g[4];
				var prefix = _g[3];
				return !prefix && this.isBlock(e4);
			case 10:
				var e5 = _g[3];
				return this.isBlock(e5);
			case 11:
				var e6 = _g[4];
				return this.isBlock(e6);
			case 15:
				var e7 = _g[2];
				return e7 != null && this.isBlock(e7);
			default:
				return false;
			}
		}
	}
	,parseFullExpr: function() {
		var e = this.parseExpr();
		var tk = this.token();
		if(tk != hscript_Token.TSemicolon && tk != hscript_Token.TEof) {
			if(this.isBlock(e)) this.push(tk); else this.unexpected(tk);
		}
		return e;
	}
	,parseObject: function(p1) {
		var fl = new Array();
		try {
			while(true) {
				var tk = this.token();
				var id = null;
				switch(Type.enumIndex(tk)) {
				case 2:
					var i = tk[2];
					id = i;
					break;
				case 1:
					var c = tk[2];
					if(!this.allowJSON) this.unexpected(tk);
					switch(Type.enumIndex(c)) {
					case 2:
						var s = c[2];
						id = s;
						break;
					default:
						this.unexpected(tk);
					}
					break;
				case 7:
					throw "__break__";
					break;
				default:
					this.unexpected(tk);
				}
				this.ensure(hscript_Token.TDoubleDot);
				fl.push({ name : id, e : this.parseExpr()});
				tk = this.token();
				switch(Type.enumIndex(tk)) {
				case 7:
					throw "__break__";
					break;
				case 9:
					break;
				default:
					this.unexpected(tk);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return this.parseExprNext(this.mk(hscript_Expr.EObject(fl),p1));
	}
	,parseExpr: function() {
		var tk = this.token();
		switch(Type.enumIndex(tk)) {
		case 2:
			var id = tk[2];
			var e = this.parseStructure(id);
			if(e == null) e = this.mk(hscript_Expr.EIdent(id));
			return this.parseExprNext(e);
		case 1:
			var c = tk[2];
			return this.parseExprNext(this.mk(hscript_Expr.EConst(c)));
		case 4:
			var e1 = this.parseExpr();
			this.ensure(hscript_Token.TPClose);
			return this.parseExprNext(this.mk(hscript_Expr.EParent(e1),0,0));
		case 6:
			tk = this.token();
			switch(Type.enumIndex(tk)) {
			case 7:
				return this.parseExprNext(this.mk(hscript_Expr.EObject([]),0));
			case 2:
				var tk2 = this.token();
				this.push(tk2);
				this.push(tk);
				switch(Type.enumIndex(tk2)) {
				case 14:
					return this.parseExprNext(this.parseObject(0));
				default:
				}
				break;
			case 1:
				var c1 = tk[2];
				if(this.allowJSON) switch(Type.enumIndex(c1)) {
				case 2:
					var tk21 = this.token();
					this.push(tk21);
					this.push(tk);
					switch(Type.enumIndex(tk21)) {
					case 14:
						return this.parseExprNext(this.parseObject(0));
					default:
					}
					break;
				default:
					this.push(tk);
				} else this.push(tk);
				break;
			default:
				this.push(tk);
			}
			var a = new Array();
			while(true) {
				a.push(this.parseFullExpr());
				tk = this.token();
				if(tk == hscript_Token.TBrClose) break;
				this.push(tk);
			}
			return this.mk(hscript_Expr.EBlock(a),0);
		case 3:
			var op = tk[2];
			if(this.unops.exists(op)) return this.makeUnop(op,this.parseExpr());
			return this.unexpected(tk);
		case 11:
			var a1 = new Array();
			tk = this.token();
			while(tk != hscript_Token.TBkClose) {
				this.push(tk);
				a1.push(this.parseExpr());
				tk = this.token();
				if(tk == hscript_Token.TComma) tk = this.token();
			}
			if(a1.length == 1) {
				var _g = this.expr(a1[0]);
				switch(Type.enumIndex(_g)) {
				case 11:case 10:
					var tmp = "__a_" + this.uid++;
					var e2 = this.mk(hscript_Expr.EBlock([this.mk(hscript_Expr.EVar(tmp,null,this.mk(hscript_Expr.EArrayDecl([]),0)),0),this.mapCompr(tmp,a1[0]),this.mk(hscript_Expr.EIdent(tmp),0)]),0);
					return this.parseExprNext(e2);
				default:
				}
			}
			return this.parseExprNext(this.mk(hscript_Expr.EArrayDecl(a1),0));
		default:
			return this.unexpected(tk);
		}
	}
	,mapCompr: function(tmp,e) {
		var edef;
		{
			var _g = this.expr(e);
			switch(Type.enumIndex(_g)) {
			case 11:
				var e2 = _g[4];
				var it = _g[3];
				var v = _g[2];
				edef = hscript_Expr.EFor(v,it,this.mapCompr(tmp,e2));
				break;
			case 10:
				var e21 = _g[3];
				var cond = _g[2];
				edef = hscript_Expr.EWhile(cond,this.mapCompr(tmp,e21));
				break;
			case 9:
				var e22 = _g[4];
				var e1 = _g[3];
				var cond1 = _g[2];
				if(e22 == null) edef = hscript_Expr.EIf(cond1,this.mapCompr(tmp,e1),null); else edef = hscript_Expr.ECall(this.mk(hscript_Expr.EField(this.mk(hscript_Expr.EIdent(tmp),this.pmin(e),this.pmax(e)),"push"),this.pmin(e),this.pmax(e)),[e]);
				break;
			case 4:
				switch(_g[2].length) {
				case 1:
					var e3 = _g[2][0];
					edef = hscript_Expr.EBlock([this.mapCompr(tmp,e3)]);
					break;
				default:
					edef = hscript_Expr.ECall(this.mk(hscript_Expr.EField(this.mk(hscript_Expr.EIdent(tmp),this.pmin(e),this.pmax(e)),"push"),this.pmin(e),this.pmax(e)),[e]);
				}
				break;
			case 3:
				var e23 = _g[2];
				edef = hscript_Expr.EParent(this.mapCompr(tmp,e23));
				break;
			default:
				edef = hscript_Expr.ECall(this.mk(hscript_Expr.EField(this.mk(hscript_Expr.EIdent(tmp),this.pmin(e),this.pmax(e)),"push"),this.pmin(e),this.pmax(e)),[e]);
			}
		}
		return this.mk(edef,this.pmin(e),this.pmax(e));
	}
	,makeUnop: function(op,e) {
		{
			var _g = this.expr(e);
			switch(Type.enumIndex(_g)) {
			case 6:
				var e2 = _g[4];
				var e1 = _g[3];
				var bop = _g[2];
				return this.mk(hscript_Expr.EBinop(bop,this.makeUnop(op,e1),e2),this.pmin(e1),this.pmax(e2));
			case 22:
				var e3 = _g[4];
				var e21 = _g[3];
				var e11 = _g[2];
				return this.mk(hscript_Expr.ETernary(this.makeUnop(op,e11),e21,e3),this.pmin(e11),this.pmax(e3));
			default:
				return this.mk(hscript_Expr.EUnop(op,true,e),this.pmin(e),this.pmax(e));
			}
		}
	}
	,makeBinop: function(op,e1,e) {
		{
			var _g = this.expr(e);
			switch(Type.enumIndex(_g)) {
			case 6:
				var e3 = _g[4];
				var e2 = _g[3];
				var op2 = _g[2];
				if(this.opPriority.get(op) <= this.opPriority.get(op2) && !this.opRightAssoc.exists(op)) return this.mk(hscript_Expr.EBinop(op2,this.makeBinop(op,e1,e2),e3),this.pmin(e1),this.pmax(e3)); else return this.mk(hscript_Expr.EBinop(op,e1,e),this.pmin(e1),this.pmax(e));
				break;
			case 22:
				var e4 = _g[4];
				var e31 = _g[3];
				var e21 = _g[2];
				if(this.opRightAssoc.exists(op)) return this.mk(hscript_Expr.EBinop(op,e1,e),this.pmin(e1),this.pmax(e)); else return this.mk(hscript_Expr.ETernary(this.makeBinop(op,e1,e21),e31,e4),this.pmin(e1),this.pmax(e));
				break;
			default:
				return this.mk(hscript_Expr.EBinop(op,e1,e),this.pmin(e1),this.pmax(e));
			}
		}
	}
	,parseStructure: function(id) {
		switch(id) {
		case "if":
			var cond = this.parseExpr();
			var e1 = this.parseExpr();
			var e2 = null;
			var semic = false;
			var tk = this.token();
			if(tk == hscript_Token.TSemicolon) {
				semic = true;
				tk = this.token();
			}
			if(Type.enumEq(tk,hscript_Token.TId("else"))) e2 = this.parseExpr(); else {
				this.push(tk);
				if(semic) this.push(hscript_Token.TSemicolon);
			}
			return this.mk(hscript_Expr.EIf(cond,e1,e2),0,e2 == null?0:this.pmax(e2));
		case "var":
			var tk1 = this.token();
			var ident = null;
			switch(Type.enumIndex(tk1)) {
			case 2:
				var id1 = tk1[2];
				ident = id1;
				break;
			default:
				this.unexpected(tk1);
			}
			tk1 = this.token();
			var t = null;
			if(tk1 == hscript_Token.TDoubleDot && this.allowTypes) {
				t = this.parseType();
				tk1 = this.token();
			}
			var e = null;
			if(Type.enumEq(tk1,hscript_Token.TOp("="))) e = this.parseExpr(); else this.push(tk1);
			return this.mk(hscript_Expr.EVar(ident,t,e),0,e == null?0:this.pmax(e));
		case "while":
			var econd = this.parseExpr();
			var e3 = this.parseExpr();
			return this.mk(hscript_Expr.EWhile(econd,e3),0,this.pmax(e3));
		case "for":
			this.ensure(hscript_Token.TPOpen);
			var tk2 = this.token();
			var vname = null;
			switch(Type.enumIndex(tk2)) {
			case 2:
				var id2 = tk2[2];
				vname = id2;
				break;
			default:
				this.unexpected(tk2);
			}
			tk2 = this.token();
			if(!Type.enumEq(tk2,hscript_Token.TId("in"))) this.unexpected(tk2);
			var eiter = this.parseExpr();
			this.ensure(hscript_Token.TPClose);
			var e4 = this.parseExpr();
			return this.mk(hscript_Expr.EFor(vname,eiter,e4),0,this.pmax(e4));
		case "break":
			return this.mk(hscript_Expr.EBreak);
		case "continue":
			return this.mk(hscript_Expr.EContinue);
		case "else":
			return this.unexpected(hscript_Token.TId(id));
		case "function":
			var tk3 = this.token();
			var name = null;
			switch(Type.enumIndex(tk3)) {
			case 2:
				var id3 = tk3[2];
				name = id3;
				break;
			default:
				this.push(tk3);
			}
			this.ensure(hscript_Token.TPOpen);
			var args = new Array();
			tk3 = this.token();
			if(tk3 != hscript_Token.TPClose) {
				var done = false;
				while(!done) {
					var name1 = null;
					var opt = false;
					switch(Type.enumIndex(tk3)) {
					case 13:
						opt = true;
						tk3 = this.token();
						break;
					default:
					}
					switch(Type.enumIndex(tk3)) {
					case 2:
						var id4 = tk3[2];
						name1 = id4;
						break;
					default:
						this.unexpected(tk3);
					}
					tk3 = this.token();
					var arg = { name : name1};
					args.push(arg);
					if(opt) arg.opt = true;
					if(tk3 == hscript_Token.TDoubleDot && this.allowTypes) {
						arg.t = this.parseType();
						tk3 = this.token();
					}
					switch(Type.enumIndex(tk3)) {
					case 9:
						tk3 = this.token();
						break;
					case 5:
						done = true;
						break;
					default:
						this.unexpected(tk3);
					}
				}
			}
			var ret = null;
			if(this.allowTypes) {
				tk3 = this.token();
				if(tk3 != hscript_Token.TDoubleDot) this.push(tk3); else ret = this.parseType();
			}
			var body = this.parseExpr();
			return this.mk(hscript_Expr.EFunction(args,body,name,ret),0,this.pmax(body));
		case "return":
			var tk4 = this.token();
			this.push(tk4);
			var e5;
			if(tk4 == hscript_Token.TSemicolon) e5 = null; else e5 = this.parseExpr();
			return this.mk(hscript_Expr.EReturn(e5),0,e5 == null?0:this.pmax(e5));
		case "new":
			var a = new Array();
			var tk5 = this.token();
			switch(Type.enumIndex(tk5)) {
			case 2:
				var id5 = tk5[2];
				a.push(id5);
				break;
			default:
				this.unexpected(tk5);
			}
			var next = true;
			while(next) {
				tk5 = this.token();
				switch(Type.enumIndex(tk5)) {
				case 8:
					tk5 = this.token();
					switch(Type.enumIndex(tk5)) {
					case 2:
						var id6 = tk5[2];
						a.push(id6);
						break;
					default:
						this.unexpected(tk5);
					}
					break;
				case 4:
					next = false;
					break;
				default:
					this.unexpected(tk5);
				}
			}
			var args1 = this.parseExprList(hscript_Token.TPClose);
			return this.mk(hscript_Expr.ENew(a.join("."),args1),0);
		case "throw":
			var e6 = this.parseExpr();
			return this.mk(hscript_Expr.EThrow(e6),0,this.pmax(e6));
		case "try":
			var e7 = this.parseExpr();
			var tk6 = this.token();
			if(!Type.enumEq(tk6,hscript_Token.TId("catch"))) this.unexpected(tk6);
			this.ensure(hscript_Token.TPOpen);
			tk6 = this.token();
			var vname1;
			switch(Type.enumIndex(tk6)) {
			case 2:
				var id7 = tk6[2];
				vname1 = id7;
				break;
			default:
				vname1 = this.unexpected(tk6);
			}
			this.ensure(hscript_Token.TDoubleDot);
			var t1 = null;
			if(this.allowTypes) t1 = this.parseType(); else {
				tk6 = this.token();
				if(!Type.enumEq(tk6,hscript_Token.TId("Dynamic"))) this.unexpected(tk6);
			}
			this.ensure(hscript_Token.TPClose);
			var ec = this.parseExpr();
			return this.mk(hscript_Expr.ETry(e7,vname1,t1,ec),0,this.pmax(ec));
		case "switch":
			var e8 = this.parseExpr();
			var def = null;
			var cases = [];
			this.ensure(hscript_Token.TBrOpen);
			try {
				while(true) {
					var tk7 = this.token();
					switch(Type.enumIndex(tk7)) {
					case 2:
						switch(tk7[2]) {
						case "case":
							var c = { values : [], expr : null};
							cases.push(c);
							try {
								while(true) {
									var e9 = this.parseExpr();
									c.values.push(e9);
									tk7 = this.token();
									switch(Type.enumIndex(tk7)) {
									case 9:
										break;
									case 14:
										throw "__break__";
										break;
									default:
										this.unexpected(tk7);
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							var exprs = [];
							try {
								while(true) {
									tk7 = this.token();
									this.push(tk7);
									switch(Type.enumIndex(tk7)) {
									case 2:
										switch(tk7[2]) {
										case "case":case "default":
											throw "__break__";
											break;
										default:
											exprs.push(this.parseFullExpr());
										}
										break;
									case 7:
										throw "__break__";
										break;
									default:
										exprs.push(this.parseFullExpr());
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							if(exprs.length == 1) c.expr = exprs[0]; else if(exprs.length == 0) c.expr = this.mk(hscript_Expr.EBlock([]),0,0); else c.expr = this.mk(hscript_Expr.EBlock(exprs),this.pmin(exprs[0]),this.pmax(exprs[exprs.length - 1]));
							break;
						case "default":
							if(def != null) this.unexpected(tk7);
							this.ensure(hscript_Token.TDoubleDot);
							var exprs1 = [];
							try {
								while(true) {
									tk7 = this.token();
									this.push(tk7);
									switch(Type.enumIndex(tk7)) {
									case 2:
										switch(tk7[2]) {
										case "case":case "default":
											throw "__break__";
											break;
										default:
											exprs1.push(this.parseFullExpr());
										}
										break;
									case 7:
										throw "__break__";
										break;
									default:
										exprs1.push(this.parseFullExpr());
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							if(exprs1.length == 1) def = exprs1[0]; else if(exprs1.length == 0) def = this.mk(hscript_Expr.EBlock([]),0,0); else def = this.mk(hscript_Expr.EBlock(exprs1),this.pmin(exprs1[0]),this.pmax(exprs1[exprs1.length - 1]));
							break;
						default:
							this.unexpected(tk7);
						}
						break;
					case 7:
						throw "__break__";
						break;
					default:
						this.unexpected(tk7);
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			return this.mk(hscript_Expr.ESwitch(e8,cases,def),0,0);
		default:
			return null;
		}
	}
	,parseExprNext: function(e1) {
		var tk = this.token();
		switch(Type.enumIndex(tk)) {
		case 3:
			var op = tk[2];
			if(this.unops.get(op)) {
				if(this.isBlock(e1) || (function($this) {
					var $r;
					var _g = $this.expr(e1);
					$r = (function($this) {
						var $r;
						switch(Type.enumIndex(_g)) {
						case 3:
							$r = true;
							break;
						default:
							$r = false;
						}
						return $r;
					}($this));
					return $r;
				}(this))) {
					this.push(tk);
					return e1;
				}
				return this.parseExprNext(this.mk(hscript_Expr.EUnop(op,false,e1),this.pmin(e1)));
			}
			return this.makeBinop(op,e1,this.parseExpr());
		case 8:
			tk = this.token();
			var field = null;
			switch(Type.enumIndex(tk)) {
			case 2:
				var id = tk[2];
				field = id;
				break;
			default:
				this.unexpected(tk);
			}
			return this.parseExprNext(this.mk(hscript_Expr.EField(e1,field),this.pmin(e1)));
		case 4:
			return this.parseExprNext(this.mk(hscript_Expr.ECall(e1,this.parseExprList(hscript_Token.TPClose)),this.pmin(e1)));
		case 11:
			var e2 = this.parseExpr();
			this.ensure(hscript_Token.TBkClose);
			return this.parseExprNext(this.mk(hscript_Expr.EArray(e1,e2),this.pmin(e1)));
		case 13:
			var e21 = this.parseExpr();
			this.ensure(hscript_Token.TDoubleDot);
			var e3 = this.parseExpr();
			return this.mk(hscript_Expr.ETernary(e1,e21,e3),this.pmin(e1),this.pmax(e3));
		default:
			this.push(tk);
			return e1;
		}
	}
	,parseType: function() {
		var t = this.token();
		switch(Type.enumIndex(t)) {
		case 2:
			var v = t[2];
			var path = [v];
			while(true) {
				t = this.token();
				if(t != hscript_Token.TDot) break;
				t = this.token();
				switch(Type.enumIndex(t)) {
				case 2:
					var v1 = t[2];
					path.push(v1);
					break;
				default:
					this.unexpected(t);
				}
			}
			var params = null;
			switch(Type.enumIndex(t)) {
			case 3:
				var op = t[2];
				if(op == "<") {
					params = [];
					try {
						while(true) {
							params.push(this.parseType());
							t = this.token();
							switch(Type.enumIndex(t)) {
							case 9:
								continue;
								break;
							case 3:
								var op1 = t[2];
								if(op1 == ">") throw "__break__";
								break;
							default:
							}
							this.unexpected(t);
						}
					} catch( e ) { if( e != "__break__" ) throw e; }
				}
				break;
			default:
				this.push(t);
			}
			return this.parseTypeNext(hscript_CType.CTPath(path,params));
		case 4:
			var t1 = this.parseType();
			this.ensure(hscript_Token.TPClose);
			return this.parseTypeNext(hscript_CType.CTParent(t1));
		case 6:
			var fields = [];
			try {
				while(true) {
					t = this.token();
					switch(Type.enumIndex(t)) {
					case 7:
						throw "__break__";
						break;
					case 2:
						var name = t[2];
						this.ensure(hscript_Token.TDoubleDot);
						fields.push({ name : name, t : this.parseType()});
						t = this.token();
						switch(Type.enumIndex(t)) {
						case 9:
							break;
						case 7:
							throw "__break__";
							break;
						default:
							this.unexpected(t);
						}
						break;
					default:
						this.unexpected(t);
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			return this.parseTypeNext(hscript_CType.CTAnon(fields));
		default:
			return this.unexpected(t);
		}
	}
	,parseTypeNext: function(t) {
		var tk = this.token();
		switch(Type.enumIndex(tk)) {
		case 3:
			var op = tk[2];
			if(op != "->") {
				this.push(tk);
				return t;
			}
			break;
		default:
			this.push(tk);
			return t;
		}
		var t2 = this.parseType();
		switch(Type.enumIndex(t2)) {
		case 1:
			var args = t2[2];
			args.unshift(t);
			return t2;
		default:
			return hscript_CType.CTFun([t],t2);
		}
	}
	,parseExprList: function(etk) {
		var args = new Array();
		var tk = this.token();
		if(tk == etk) return args;
		this.push(tk);
		try {
			while(true) {
				args.push(this.parseExpr());
				tk = this.token();
				switch(Type.enumIndex(tk)) {
				case 9:
					break;
				default:
					if(tk == etk) throw "__break__";
					this.unexpected(tk);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return args;
	}
	,incPos: function() {
	}
	,readChar: function() {
		this.incPos();
		try {
			return this.input.readByte();
		} catch( e ) {
			return 0;
		}
	}
	,readString: function(until) {
		var c = 0;
		var b = new haxe_io_BytesOutput();
		var esc = false;
		var old = this.line;
		var s = this.input;
		while(true) {
			try {
				this.incPos();
				c = s.readByte();
			} catch( e ) {
				this.line = old;
				this.error(hscript_Error.EUnterminatedString,0,0);
			}
			if(esc) {
				esc = false;
				switch(c) {
				case 110:
					b.writeByte(10);
					break;
				case 114:
					b.writeByte(13);
					break;
				case 116:
					b.writeByte(9);
					break;
				case 39:case 34:case 92:
					b.writeByte(c);
					break;
				case 47:
					if(this.allowJSON) b.writeByte(c); else this.invalidChar(c);
					break;
				case 117:
					if(!this.allowJSON) throw this.invalidChar(c);
					var code = null;
					try {
						this.incPos();
						this.incPos();
						this.incPos();
						this.incPos();
						code = s.readString(4);
					} catch( e1 ) {
						this.line = old;
						this.error(hscript_Error.EUnterminatedString,0,0);
					}
					var k = 0;
					var _g = 0;
					while(_g < 4) {
						var i = _g++;
						k <<= 4;
						var $char = HxOverrides.cca(code,i);
						switch($char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							k += $char - 48;
							break;
						case 65:case 66:case 67:case 68:case 69:case 70:
							k += $char - 55;
							break;
						case 97:case 98:case 99:case 100:case 101:case 102:
							k += $char - 87;
							break;
						default:
							this.invalidChar($char);
						}
					}
					if(k <= 127) b.writeByte(k); else if(k <= 2047) {
						b.writeByte(192 | k >> 6);
						b.writeByte(128 | k & 63);
					} else {
						b.writeByte(224 | k >> 12);
						b.writeByte(128 | k >> 6 & 63);
						b.writeByte(128 | k & 63);
					}
					break;
				default:
					this.invalidChar(c);
				}
			} else if(c == 92) esc = true; else if(c == until) break; else {
				if(c == 10) this.line++;
				b.writeByte(c);
			}
		}
		return b.getBytes().toString();
	}
	,token: function() {
		if(!this.tokens.isEmpty()) return this.tokens.pop();
		var $char;
		if(this["char"] < 0) $char = this.readChar(); else {
			$char = this["char"];
			this["char"] = -1;
		}
		while(true) {
			switch($char) {
			case 0:
				return hscript_Token.TEof;
			case 32:case 9:case 13:
				break;
			case 10:
				this.line++;
				break;
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				var n = ($char - 48) * 1.0;
				var exp = 0.;
				while(true) {
					$char = this.readChar();
					exp *= 10;
					switch($char) {
					case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
						n = n * 10 + ($char - 48);
						break;
					case 46:
						if(exp > 0) {
							if(exp == 10 && this.readChar() == 46) {
								this.push(hscript_Token.TOp("..."));
								var i = Std["int"](n);
								return hscript_Token.TConst(i == n?hscript_Const.CInt(i):hscript_Const.CFloat(n));
							}
							this.invalidChar($char);
						}
						exp = 1.;
						break;
					case 120:
						if(n > 0 || exp > 0) this.invalidChar($char);
						var n1 = 0;
						while(true) {
							$char = this.readChar();
							switch($char) {
							case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
								n1 = (n1 << 4) + $char - 48;
								break;
							case 65:case 66:case 67:case 68:case 69:case 70:
								n1 = (n1 << 4) + ($char - 55);
								break;
							case 97:case 98:case 99:case 100:case 101:case 102:
								n1 = (n1 << 4) + ($char - 87);
								break;
							default:
								this["char"] = $char;
								return hscript_Token.TConst(hscript_Const.CInt(n1));
							}
						}
						break;
					default:
						this["char"] = $char;
						var i1 = Std["int"](n);
						return hscript_Token.TConst(exp > 0?hscript_Const.CFloat(n * 10 / exp):i1 == n?hscript_Const.CInt(i1):hscript_Const.CFloat(n));
					}
				}
				break;
			case 59:
				return hscript_Token.TSemicolon;
			case 40:
				return hscript_Token.TPOpen;
			case 41:
				return hscript_Token.TPClose;
			case 44:
				return hscript_Token.TComma;
			case 46:
				$char = this.readChar();
				switch($char) {
				case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
					var n2 = $char - 48;
					var exp1 = 1;
					while(true) {
						$char = this.readChar();
						exp1 *= 10;
						switch($char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							n2 = n2 * 10 + ($char - 48);
							break;
						default:
							this["char"] = $char;
							return hscript_Token.TConst(hscript_Const.CFloat(n2 / exp1));
						}
					}
					break;
				case 46:
					$char = this.readChar();
					if($char != 46) this.invalidChar($char);
					return hscript_Token.TOp("...");
				default:
					this["char"] = $char;
					return hscript_Token.TDot;
				}
				break;
			case 123:
				return hscript_Token.TBrOpen;
			case 125:
				return hscript_Token.TBrClose;
			case 91:
				return hscript_Token.TBkOpen;
			case 93:
				return hscript_Token.TBkClose;
			case 39:
				return hscript_Token.TConst(hscript_Const.CString(this.readString(39)));
			case 34:
				return hscript_Token.TConst(hscript_Const.CString(this.readString(34)));
			case 63:
				return hscript_Token.TQuestion;
			case 58:
				return hscript_Token.TDoubleDot;
			default:
				if(this.ops[$char]) {
					var op = String.fromCharCode($char);
					while(true) {
						$char = this.readChar();
						if(!this.ops[$char]) {
							if(HxOverrides.cca(op,0) == 47) return this.tokenComment(op,$char);
							this["char"] = $char;
							return hscript_Token.TOp(op);
						}
						op += String.fromCharCode($char);
					}
				}
				if(this.idents[$char]) {
					var id = String.fromCharCode($char);
					while(true) {
						$char = this.readChar();
						if(!this.idents[$char]) {
							this["char"] = $char;
							return hscript_Token.TId(id);
						}
						id += String.fromCharCode($char);
					}
				}
				this.invalidChar($char);
			}
			$char = this.readChar();
		}
		return null;
	}
	,tokenComment: function(op,$char) {
		var c = HxOverrides.cca(op,1);
		var s = this.input;
		if(c == 47) {
			try {
				while($char != 10 && $char != 13) {
					this.incPos();
					$char = s.readByte();
				}
				this["char"] = $char;
			} catch( e ) {
			}
			return this.token();
		}
		if(c == 42) {
			var old = this.line;
			try {
				while(true) {
					while($char != 42) {
						if($char == 10) this.line++;
						this.incPos();
						$char = s.readByte();
					}
					this.incPos();
					$char = s.readByte();
					if($char == 47) break;
				}
			} catch( e1 ) {
				this.line = old;
				this.error(hscript_Error.EUnterminatedComment,0,0);
			}
			return this.token();
		}
		this["char"] = $char;
		return hscript_Token.TOp(op);
	}
	,constString: function(c) {
		switch(Type.enumIndex(c)) {
		case 0:
			var v = c[2];
			return Std.string(v);
		case 1:
			var f = c[2];
			return Std.string(f);
		case 2:
			var s = c[2];
			return s;
		}
	}
	,tokenString: function(t) {
		switch(Type.enumIndex(t)) {
		case 0:
			return "<eof>";
		case 1:
			var c = t[2];
			return this.constString(c);
		case 2:
			var s = t[2];
			return s;
		case 3:
			var s1 = t[2];
			return s1;
		case 4:
			return "(";
		case 5:
			return ")";
		case 6:
			return "{";
		case 7:
			return "}";
		case 8:
			return ".";
		case 9:
			return ",";
		case 10:
			return ";";
		case 11:
			return "[";
		case 12:
			return "]";
		case 13:
			return "?";
		case 14:
			return ":";
		}
	}
	,__class__: hscript_Parser
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if(Std["is"](o,Array)) return Array; else return o.__class__;
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (js_Boot.isClass(o) || js_Boot.isEnum(o))) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js_Boot.__string_rec(o[i],s); else str += js_Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = true;
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var spriter_definitions_TimelineKey = function(fast) {
	this.time = 0;
	if(fast != null) {
		if(fast.has.resolve("id")) this.id = Std.parseInt(fast.att.resolve("id")); else this.id = 0;
		if(fast.has.resolve("time")) this.time = Std.parseInt(fast.att.resolve("time")); else this.time = 0;
		if(fast.has.resolve("curve_type")) this.curveType = Type.createEnum(spriter_definitions_CurveType,fast.att.resolve("curve_type").toUpperCase()); else this.curveType = spriter_definitions_CurveType.LINEAR;
		if(fast.has.resolve("c1")) this.c1 = Std.parseFloat(fast.att.resolve("c1")); else this.c1 = 0;
		if(fast.has.resolve("c2")) this.c2 = Std.parseFloat(fast.att.resolve("c2")); else this.c2 = 0;
	}
};
$hxClasses["spriter.definitions.TimelineKey"] = spriter_definitions_TimelineKey;
spriter_definitions_TimelineKey.__name__ = true;
spriter_definitions_TimelineKey.prototype = {
	copy: function() {
		var copy = new spriter_definitions_TimelineKey();
		return this.clone(copy);
	}
	,clone: function(clone) {
		clone.id = this.id;
		clone.time = this.time;
		clone.curveType = this.curveType;
		clone.c1 = this.c1;
		clone.c2 = this.c2;
		return clone;
	}
	,interpolate: function(nextKey,nextKeyTime,currentTime) {
		this.linearKey(nextKey,this.getTWithNextKey(nextKey,nextKeyTime,currentTime));
	}
	,getTWithNextKey: function(nextKey,nextKeyTime,currentTime) {
		if(this.curveType == spriter_definitions_CurveType.INSTANT || this.time == nextKey.time) return 0;
		var t = (currentTime - this.time) / (nextKey.time - this.time);
		if(this.curveType == spriter_definitions_CurveType.LINEAR) return t; else if(this.curveType == spriter_definitions_CurveType.QUADRATIC) return this.quadratic(0.0,this.c1,1.0,t); else if(this.curveType == spriter_definitions_CurveType.CUBIC) return this.cubic(0.0,this.c1,this.c2,1.0,t);
		return 0;
	}
	,linear: function(a,b,t) {
		return (b - a) * t + a;
	}
	,linearKey: function(keyB,t) {
		haxe_Log.trace("Has to be overriden",{ fileName : "TimelineKey.hx", lineNumber : 89, className : "spriter.definitions.TimelineKey", methodName : "linearKey"});
		return null;
	}
	,angleLinear: function(angleA,angleB,spin,t) {
		if(spin == 0) return angleA;
		if(spin > 0) {
			if(angleB - angleA < 0) angleB += 360;
		} else if(spin < 0) {
			if(angleB - angleA > 0) angleB -= 360;
		}
		return this.linear(angleA,angleB,t);
	}
	,quadratic: function(a,b,c,t) {
		return this.linear(this.linear(a,b,t),this.linear(b,c,t),t);
	}
	,cubic: function(a,b,c,d,t) {
		return this.linear(this.quadratic(a,b,c,t),this.quadratic(b,c,d,t),t);
	}
	,__class__: spriter_definitions_TimelineKey
};
var spriter_definitions_SpatialTimelineKey = function(fast) {
	spriter_definitions_TimelineKey.call(this,fast);
	if(fast != null) {
		var spin;
		if(fast.has.resolve("spin")) spin = Std.parseInt(fast.att.resolve("spin")); else spin = 1;
		if(fast.hasNode.resolve("object")) fast = fast.node.resolve("object"); else fast = fast.node.resolve("bone");
		var x;
		if(fast.has.resolve("x")) x = Std.parseFloat(fast.att.resolve("x")); else x = 0;
		var y;
		if(fast.has.resolve("y")) y = Std.parseFloat(fast.att.resolve("y")); else y = 0;
		var angle;
		if(fast.has.resolve("angle")) angle = Std.parseFloat(fast.att.resolve("angle")); else angle = 0;
		var scale_x;
		if(fast.has.resolve("scale_x")) scale_x = Std.parseFloat(fast.att.resolve("scale_x")); else scale_x = 1;
		var scale_y;
		if(fast.has.resolve("scale_y")) scale_y = Std.parseFloat(fast.att.resolve("scale_y")); else scale_y = 1;
		var alpha;
		if(fast.has.resolve("a")) alpha = Std.parseFloat(fast.att.resolve("a")); else alpha = 1;
		this.info = new spriter_definitions_SpatialInfo(x,y,angle,scale_x,scale_y,alpha,spin);
	}
};
$hxClasses["spriter.definitions.SpatialTimelineKey"] = spriter_definitions_SpatialTimelineKey;
spriter_definitions_SpatialTimelineKey.__name__ = true;
spriter_definitions_SpatialTimelineKey.__super__ = spriter_definitions_TimelineKey;
spriter_definitions_SpatialTimelineKey.prototype = $extend(spriter_definitions_TimelineKey.prototype,{
	copy: function() {
		var copy = new spriter_definitions_SpatialTimelineKey();
		return this.clone(copy);
	}
	,clone: function(clone) {
		spriter_definitions_TimelineKey.prototype.clone.call(this,clone);
		var c = clone;
		c.info = this.info.copy();
		return c;
	}
	,linearSpatialInfo: function(infoA,infoB,spin,t) {
		this.info.x = this.linear(infoA.x,infoB.x,t);
		this.info.y = this.linear(infoA.y,infoB.y,t);
		this.info.angle = this.angleLinear(infoA.angle,infoB.angle,spin,t);
		this.info.scaleX = this.linear(infoA.scaleX,infoB.scaleX,t);
		this.info.scaleY = this.linear(infoA.scaleY,infoB.scaleY,t);
		this.info.a = this.linear(infoA.a,infoB.a,t);
	}
	,paint: function(pivotX,pivotY) {
		return new spriter_definitions_PivotInfo(pivotX,pivotY);
	}
	,__class__: spriter_definitions_SpatialTimelineKey
});
var spriter_definitions_BoneTimelineKey = function(fast) {
	this.paintDebugBones = true;
	if(fast != null) {
		if(fast.has.resolve("length")) this.length = Std.parseInt(fast.att.resolve("length")); else this.length = 200;
		if(fast.has.resolve("width")) this.width = Std.parseInt(fast.att.resolve("width")); else this.width = 10;
	}
	spriter_definitions_SpatialTimelineKey.call(this,fast);
};
$hxClasses["spriter.definitions.BoneTimelineKey"] = spriter_definitions_BoneTimelineKey;
spriter_definitions_BoneTimelineKey.__name__ = true;
spriter_definitions_BoneTimelineKey.__super__ = spriter_definitions_SpatialTimelineKey;
spriter_definitions_BoneTimelineKey.prototype = $extend(spriter_definitions_SpatialTimelineKey.prototype,{
	copy: function() {
		var copy = new spriter_definitions_BoneTimelineKey();
		return this.clone(copy);
	}
	,clone: function(clone) {
		spriter_definitions_SpatialTimelineKey.prototype.clone.call(this,clone);
		var c = clone;
		c.length = this.length;
		c.width = this.width;
		c.paintDebugBones = this.paintDebugBones;
		return c;
	}
	,paint: function(pivotX,pivotY) {
		if(this.paintDebugBones) {
			var drawLength = this.length * this.info.scaleX;
			var drawHeight = this.width * this.info.scaleY;
		}
		return new spriter_definitions_PivotInfo(pivotX,pivotY);
	}
	,linearKey: function(keyB,t) {
		if(!Std["is"](keyB,spriter_definitions_BoneTimelineKey)) throw "keyB must be BoneTimelineKeys";
		var keyBBone;
		keyBBone = js_Boot.__cast(keyB , spriter_definitions_BoneTimelineKey);
		this.linearSpatialInfo(this.info,keyBBone.info,this.info.spin,t);
		if(this.paintDebugBones) {
			this.length = Std["int"](this.linear(this.length,keyBBone.length,t));
			this.width = Std["int"](this.linear(this.width,keyBBone.width,t));
		}
	}
	,__class__: spriter_definitions_BoneTimelineKey
});
var spriter_definitions_CharacterMap = function(fast) {
	this.maps = new Array();
	this.id = Std.parseInt(fast.att.resolve("id"));
	this.name = fast.att.resolve("name");
	var $it0 = fast.nodes.resolve("map").iterator();
	while( $it0.hasNext() ) {
		var m = $it0.next();
		this.maps.push(new spriter_definitions_MapInstruction(m));
	}
};
$hxClasses["spriter.definitions.CharacterMap"] = spriter_definitions_CharacterMap;
spriter_definitions_CharacterMap.__name__ = true;
spriter_definitions_CharacterMap.prototype = {
	__class__: spriter_definitions_CharacterMap
};
var spriter_definitions_MainlineKey = function(fast) {
	this.boneRefs = new Array();
	this.objectRefs = new Array();
	this.id = Std.parseInt(fast.att.resolve("id"));
	if(fast.has.resolve("time")) this.time = Std.parseInt(fast.att.resolve("time")); else this.time = 0;
	var $it0 = fast.nodes.resolve("bone_ref").iterator();
	while( $it0.hasNext() ) {
		var br = $it0.next();
		this.boneRefs.push(new spriter_definitions_Ref(br));
	}
	var $it1 = fast.nodes.resolve("object_ref").iterator();
	while( $it1.hasNext() ) {
		var or = $it1.next();
		this.objectRefs.push(new spriter_definitions_Ref(or));
	}
};
$hxClasses["spriter.definitions.MainlineKey"] = spriter_definitions_MainlineKey;
spriter_definitions_MainlineKey.__name__ = true;
spriter_definitions_MainlineKey.prototype = {
	__class__: spriter_definitions_MainlineKey
};
var spriter_definitions_MapInstruction = function(fast) {
	this.folder = Std.parseInt(fast.att.resolve("folder"));
	this.file = Std.parseInt(fast.att.resolve("file"));
	if(fast.has.resolve("target_folder")) this.tarFolder = Std.parseInt(fast.att.resolve("target_folder")); else this.tarFolder = -1;
	if(fast.has.resolve("target_file")) this.tarFile = Std.parseInt(fast.att.resolve("target_file")); else this.tarFile = -1;
};
$hxClasses["spriter.definitions.MapInstruction"] = spriter_definitions_MapInstruction;
spriter_definitions_MapInstruction.__name__ = true;
spriter_definitions_MapInstruction.prototype = {
	__class__: spriter_definitions_MapInstruction
};
var spriter_definitions_ObjectTimelineKey = function(fast,objectType) {
	spriter_definitions_SpatialTimelineKey.call(this,fast);
	if(fast != null) {
		this.type = objectType;
		fast = fast.node.resolve("object");
		this.useDefaultPivot = !fast.has.resolve("pivot_x") && !fast.has.resolve("pivot_y");
		if(fast.has.resolve("pivot_x")) this.pivot_x = Std.parseFloat(fast.att.resolve("pivot_x")); else this.pivot_x = 0;
		if(fast.has.resolve("pivot_y")) this.pivot_y = Std.parseFloat(fast.att.resolve("pivot_y")); else this.pivot_y = 1;
	}
};
$hxClasses["spriter.definitions.ObjectTimelineKey"] = spriter_definitions_ObjectTimelineKey;
spriter_definitions_ObjectTimelineKey.__name__ = true;
spriter_definitions_ObjectTimelineKey.__super__ = spriter_definitions_SpatialTimelineKey;
spriter_definitions_ObjectTimelineKey.prototype = $extend(spriter_definitions_SpatialTimelineKey.prototype,{
	copy: function() {
		var copy = new spriter_definitions_ObjectTimelineKey();
		return this.clone(copy);
	}
	,clone: function(clone) {
		spriter_definitions_SpatialTimelineKey.prototype.clone.call(this,clone);
		var c = clone;
		c.useDefaultPivot = this.useDefaultPivot;
		c.pivot_x = this.pivot_x;
		c.pivot_y = this.pivot_y;
		c.type = this.type;
		return c;
	}
	,paint: function(pivotX,pivotY) {
		var paintPivotX;
		var paintPivotY;
		if(this.useDefaultPivot) {
			paintPivotX = pivotX;
			paintPivotY = pivotY;
		} else {
			paintPivotX = this.pivot_x;
			paintPivotY = this.pivot_y;
		}
		return new spriter_definitions_PivotInfo(paintPivotX,paintPivotY);
	}
	,linearKey: function(keyB,t) {
		if(!Std["is"](keyB,spriter_definitions_ObjectTimelineKey)) throw "keyB must be ObjectTimelineKey";
		var keyBSprite;
		keyBSprite = js_Boot.__cast(keyB , spriter_definitions_ObjectTimelineKey);
		this.linearSpatialInfo(this.info,keyBSprite.info,this.info.spin,t);
		if(!this.useDefaultPivot) {
			this.pivot_x = this.linear(this.pivot_x,keyBSprite.pivot_x,t);
			this.pivot_y = this.linear(this.pivot_y,keyBSprite.pivot_y,t);
		}
	}
	,__class__: spriter_definitions_ObjectTimelineKey
});
var spriter_definitions_PivotInfo = function(pivotX,pivotY) {
	if(pivotY == null) pivotY = 1;
	if(pivotX == null) pivotX = 0;
	this.pivotX = pivotX;
	this.pivotY = pivotY;
};
$hxClasses["spriter.definitions.PivotInfo"] = spriter_definitions_PivotInfo;
spriter_definitions_PivotInfo.__name__ = true;
spriter_definitions_PivotInfo.prototype = {
	__class__: spriter_definitions_PivotInfo
};
var spriter_definitions_Quadrilateral = function(p1,p2,p3,p4) {
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
	this.p4 = p4;
};
$hxClasses["spriter.definitions.Quadrilateral"] = spriter_definitions_Quadrilateral;
spriter_definitions_Quadrilateral.__name__ = true;
spriter_definitions_Quadrilateral.prototype = {
	__class__: spriter_definitions_Quadrilateral
};
var spriter_definitions_QuadPoint = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["spriter.definitions.QuadPoint"] = spriter_definitions_QuadPoint;
spriter_definitions_QuadPoint.__name__ = true;
spriter_definitions_QuadPoint.prototype = {
	__class__: spriter_definitions_QuadPoint
};
var spriter_definitions_Ref = function(fast) {
	this.id = Std.parseInt(fast.att.resolve("id"));
	if(fast.has.resolve("parent")) this.parent = Std.parseInt(fast.att.resolve("parent")); else this.parent = -1;
	this.timeline = Std.parseInt(fast.att.resolve("timeline"));
	this.key = Std.parseInt(fast.att.resolve("key"));
};
$hxClasses["spriter.definitions.Ref"] = spriter_definitions_Ref;
spriter_definitions_Ref.__name__ = true;
spriter_definitions_Ref.prototype = {
	__class__: spriter_definitions_Ref
};
var spriter_definitions_MetaDispatch = $hxClasses["spriter.definitions.MetaDispatch"] = { __ename__ : true, __constructs__ : ["ONCE","ONCE_PER_LOOP","ALWAYS"] };
spriter_definitions_MetaDispatch.ONCE = ["ONCE",0];
spriter_definitions_MetaDispatch.ONCE.toString = $estr;
spriter_definitions_MetaDispatch.ONCE.__enum__ = spriter_definitions_MetaDispatch;
spriter_definitions_MetaDispatch.ONCE_PER_LOOP = ["ONCE_PER_LOOP",1];
spriter_definitions_MetaDispatch.ONCE_PER_LOOP.toString = $estr;
spriter_definitions_MetaDispatch.ONCE_PER_LOOP.__enum__ = spriter_definitions_MetaDispatch;
spriter_definitions_MetaDispatch.ALWAYS = ["ALWAYS",2];
spriter_definitions_MetaDispatch.ALWAYS.toString = $estr;
spriter_definitions_MetaDispatch.ALWAYS.__enum__ = spriter_definitions_MetaDispatch;
var spriter_interfaces_IScml = function() { };
$hxClasses["spriter.interfaces.IScml"] = spriter_interfaces_IScml;
spriter_interfaces_IScml.__name__ = true;
spriter_interfaces_IScml.prototype = {
	__class__: spriter_interfaces_IScml
};
var spriter_definitions_ScmlObject = function(source) {
	this.metaDispatch = spriter_definitions_MetaDispatch.ONCE_PER_LOOP;
	this.endAnimRemoval = true;
	this.currentAnimation = "";
	this.currentEntity = "";
	if(source != null) {
		this.folders = new Array();
		this.entities = new haxe_ds_StringMap();
		var fast = new haxe_xml_Fast(source.firstElement());
		if(fast.att.resolve("scml_version") != "1.0") haxe_Log.trace("Warning, unsupported format.",{ fileName : "ScmlObject.hx", lineNumber : 62, className : "spriter.definitions.ScmlObject", methodName : "new"});
		var $it0 = fast.get_elements();
		while( $it0.hasNext() ) {
			var el = $it0.next();
			if(el.get_name() == "folder") this.folders.push(new spriter_definitions_SpriterFolder(el)); else if(el.get_name() == "entity") {
				var key = el.att.resolve("name");
				var value = new spriter_definitions_SpriterEntity(el);
				this.entities.set(key,value);
				if(el.att.resolve("id") == "0") {
					this.currentEntity = el.att.resolve("name");
					this.currentAnimation = el.node.resolve("animation").att.resolve("name");
				}
			} else if(el.get_name() == "tag_list") {
				if(this.tags == null) this.tags = [];
				var $it1 = el.get_elements();
				while( $it1.hasNext() ) {
					var t = $it1.next();
					this.tags.push(t.att.resolve("name"));
				}
			}
		}
		this.activeCharacterMap = this.copyFolders();
	}
};
$hxClasses["spriter.definitions.ScmlObject"] = spriter_definitions_ScmlObject;
spriter_definitions_ScmlObject.__name__ = true;
spriter_definitions_ScmlObject.__interfaces__ = [spriter_interfaces_IScml];
spriter_definitions_ScmlObject.prototype = {
	getPivots: function(folder,file) {
		var currentFile = this.activeCharacterMap[folder].files[file];
		if(currentFile != null) return new spriter_definitions_PivotInfo(currentFile.pivotX,currentFile.pivotY); else return new spriter_definitions_PivotInfo();
	}
	,getFileName: function(folder,file) {
		var currentFile = this.activeCharacterMap[folder].files[file];
		if(currentFile != null) return currentFile.name; else return null;
	}
	,onEndAnim: function() {
		if(this.endAnimCallback != null) {
			var tempCallback = this.endAnimCallback;
			if(this.endAnimRemoval) this.endAnimCallback = null;
			tempCallback();
		}
	}
	,onTag: function(tag) {
		if(this.tagCallback != null) this.tagCallback(this.tags[tag]);
	}
	,onVar: function(id,value) {
		var variable = this.entities.get(this.currentEntity).variables[id];
		if(variable.set(value)) {
			if(this.varChangeCallback != null) this.varChangeCallback(variable);
		}
	}
	,setCurrentTime: function(newTime,library,characterInfo) {
		var currentEnt = this.entities.get(this.currentEntity);
		var currentAnim = currentEnt.animations.get(this.currentAnimation);
		this.spriterSpatialInfo = characterInfo;
		currentAnim.setCurrentTime(newTime,library,this,currentEnt);
	}
	,copyFolders: function() {
		var newFolders = new Array();
		var _g1 = 0;
		var _g = this.folders.length;
		while(_g1 < _g) {
			var i = _g1++;
			newFolders[i] = this.folders[i].copy();
		}
		return newFolders;
	}
	,__class__: spriter_definitions_ScmlObject
};
var spriter_definitions_SpatialInfo = function(x,y,angle,scaleX,scaleY,a,spin) {
	if(spin == null) spin = 1;
	if(a == null) a = 1;
	if(scaleY == null) scaleY = 1;
	if(scaleX == null) scaleX = 1;
	if(angle == null) angle = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.spin = 1;
	this.a = 1;
	this.scaleY = 1;
	this.scaleX = 1;
	this.angle = 0;
	this.y = 0;
	this.x = 0;
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.scaleX = scaleX;
	this.scaleY = scaleY;
	this.a = a;
	this.spin = spin;
};
$hxClasses["spriter.definitions.SpatialInfo"] = spriter_definitions_SpatialInfo;
spriter_definitions_SpatialInfo.__name__ = true;
spriter_definitions_SpatialInfo.prototype = {
	unmapFromParent: function(parentInfo) {
		var unmapped_x;
		var unmapped_y;
		var unmapped_angle = this.angle + parentInfo.angle;
		var unmapped_scaleX = this.scaleX * parentInfo.scaleX;
		var unmapped_scaleY = this.scaleY * parentInfo.scaleY;
		var unmapped_alpha = this.a * parentInfo.a;
		if(this.x != 0 || this.y != 0) {
			var preMultX = this.x * parentInfo.scaleX;
			var preMultY = this.y * parentInfo.scaleY;
			var parentRad = spriter_util_SpriterUtil.toRadians(spriter_util_SpriterUtil.under360(parentInfo.angle));
			var s = Math.sin(parentRad);
			var c = Math.cos(parentRad);
			unmapped_x = preMultX * c - preMultY * s + parentInfo.x;
			unmapped_y = preMultX * s + preMultY * c + parentInfo.y;
		} else {
			unmapped_x = parentInfo.x;
			unmapped_y = parentInfo.y;
		}
		return new spriter_definitions_SpatialInfo(unmapped_x,unmapped_y,unmapped_angle,unmapped_scaleX,unmapped_scaleY,unmapped_alpha,this.spin);
	}
	,copy: function() {
		var c = new spriter_definitions_SpatialInfo(this.x,this.y,this.angle,this.scaleX,this.scaleY,this.a,this.spin);
		return c;
	}
	,__class__: spriter_definitions_SpatialInfo
};
var spriter_definitions_SpriteTimelineKey = function(fast) {
	spriter_definitions_ObjectTimelineKey.call(this,fast);
	if(fast != null) {
		fast = fast.node.resolve("object");
		if(fast.has.resolve("folder")) this.folder = Std.parseInt(fast.att.resolve("folder")); else this.folder = 0;
		if(fast.has.resolve("file")) this.file = Std.parseInt(fast.att.resolve("file")); else this.file = 0;
	}
};
$hxClasses["spriter.definitions.SpriteTimelineKey"] = spriter_definitions_SpriteTimelineKey;
spriter_definitions_SpriteTimelineKey.__name__ = true;
spriter_definitions_SpriteTimelineKey.__super__ = spriter_definitions_ObjectTimelineKey;
spriter_definitions_SpriteTimelineKey.prototype = $extend(spriter_definitions_ObjectTimelineKey.prototype,{
	copy: function() {
		var copy = new spriter_definitions_SpriteTimelineKey();
		return this.clone(copy);
	}
	,clone: function(clone) {
		spriter_definitions_ObjectTimelineKey.prototype.clone.call(this,clone);
		var c = clone;
		c.folder = this.folder;
		c.file = this.file;
		c.useDefaultPivot = this.useDefaultPivot;
		c.pivot_x = this.pivot_x;
		c.pivot_y = this.pivot_y;
		return c;
	}
	,__class__: spriter_definitions_SpriteTimelineKey
});
var spriter_definitions_LoopType = $hxClasses["spriter.definitions.LoopType"] = { __ename__ : true, __constructs__ : ["LOOPING","NO_LOOPING"] };
spriter_definitions_LoopType.LOOPING = ["LOOPING",0];
spriter_definitions_LoopType.LOOPING.toString = $estr;
spriter_definitions_LoopType.LOOPING.__enum__ = spriter_definitions_LoopType;
spriter_definitions_LoopType.NO_LOOPING = ["NO_LOOPING",1];
spriter_definitions_LoopType.NO_LOOPING.toString = $estr;
spriter_definitions_LoopType.NO_LOOPING.__enum__ = spriter_definitions_LoopType;
var spriter_definitions_SpriterAnimation = function(fast) {
	this.loop = 0;
	this.mainlineKeys = new Array();
	this.timelines = new Array();
	this.id = Std.parseInt(fast.att.resolve("id"));
	this.name = fast.att.resolve("name");
	this.length = Std.parseInt(fast.att.resolve("length"));
	if(fast.has.resolve("looping")) {
		if(fast.att.resolve("looping") == "true") this.loopType = spriter_definitions_LoopType.LOOPING; else this.loopType = spriter_definitions_LoopType.NO_LOOPING;
	} else this.loopType = spriter_definitions_LoopType.LOOPING;
	var $it0 = fast.node.resolve("mainline").nodes.resolve("key").iterator();
	while( $it0.hasNext() ) {
		var mk = $it0.next();
		this.mainlineKeys.push(new spriter_definitions_MainlineKey(mk));
	}
	var $it1 = fast.nodes.resolve("timeline").iterator();
	while( $it1.hasNext() ) {
		var t = $it1.next();
		this.timelines.push(new spriter_definitions_SpriterTimeline(t));
	}
	if(fast.hasNode.resolve("meta")) {
		fast = fast.node.resolve("meta");
		if(fast.hasNode.resolve("tagline")) {
			this.taglines = [];
			var $it2 = fast.node.resolve("tagline").nodes.resolve("key").iterator();
			while( $it2.hasNext() ) {
				var tag = $it2.next();
				this.taglines.push(new spriter_definitions_TaglineKey(tag));
			}
		}
		if(fast.hasNode.resolve("varline")) {
			this.varlines = [];
			var $it3 = fast.nodes.resolve("varline").iterator();
			while( $it3.hasNext() ) {
				var currVar = $it3.next();
				this.varlines.push(new spriter_definitions_Varline(currVar));
			}
		}
	}
};
$hxClasses["spriter.definitions.SpriterAnimation"] = spriter_definitions_SpriterAnimation;
spriter_definitions_SpriterAnimation.__name__ = true;
spriter_definitions_SpriterAnimation.prototype = {
	setCurrentTime: function(newTime,library,root,currentEntity) {
		var currentTime;
		var tempLoop;
		var _g = this.loopType;
		switch(Type.enumIndex(_g)) {
		case 0:
			tempLoop = this.loop;
			this.loop = Std["int"](newTime / this.length);
			currentTime = newTime % this.length;
			this.updateCharacter(this.mainlineKeyFromTime(currentTime),currentTime,library,root,currentEntity);
			if(root.metaDispatch == spriter_definitions_MetaDispatch.ONCE_PER_LOOP && tempLoop != this.loop) this.resetMetaDispatch();
			if(this.loop == 1 && tempLoop < 1) root.onEndAnim();
			break;
		case 1:
			currentTime = Std["int"](Math.min(newTime,this.length));
			this.updateCharacter(this.mainlineKeyFromTime(currentTime),currentTime,library,root,currentEntity);
			if(currentTime == this.length) root.onEndAnim();
			break;
		}
	}
	,updateCharacter: function(mainKey,newTime,library,root,currentEntity) {
		var transformedBoneKeys = new Array();
		var currentKey;
		var currentRef;
		var spatialInfo;
		var len = mainKey.boneRefs.length;
		var _g = 0;
		while(_g < len) {
			var b = _g++;
			currentRef = mainKey.boneRefs[b];
			currentKey = this.keyFromRef(currentRef,newTime);
			if(currentRef.parent >= 0) spatialInfo = transformedBoneKeys[currentRef.parent]; else spatialInfo = root.spriterSpatialInfo;
			spatialInfo = currentKey.info.unmapFromParent(spatialInfo);
			transformedBoneKeys.push(spatialInfo);
		}
		this.points = [];
		this.boxes = [];
		len = mainKey.objectRefs.length;
		var _g1 = 0;
		while(_g1 < len) {
			var o = _g1++;
			currentRef = mainKey.objectRefs[o];
			currentKey = this.keyFromRef(currentRef,newTime);
			if(currentRef.parent >= 0) spatialInfo = transformedBoneKeys[currentRef.parent]; else spatialInfo = root.spriterSpatialInfo;
			spatialInfo = currentKey.info.unmapFromParent(spatialInfo);
			var activePivots;
			if(Std["is"](currentKey,spriter_definitions_SpriteTimelineKey)) {
				var currentSpriteKey;
				currentSpriteKey = js_Boot.__cast(currentKey , spriter_definitions_SpriteTimelineKey);
				activePivots = root.getPivots(currentSpriteKey.folder,currentSpriteKey.file);
				activePivots = currentKey.paint(activePivots.pivotX,activePivots.pivotY);
				var currentKeyName = root.getFileName(currentSpriteKey.folder,currentSpriteKey.file);
				if(currentKeyName != null) library.addGraphic(root.spriterName,currentRef.timeline,currentRef.key,currentKeyName,spatialInfo,activePivots);
			} else {
				activePivots = new spriter_definitions_PivotInfo();
				activePivots = currentKey.paint(activePivots.pivotX,activePivots.pivotY);
				var currentObjectKey;
				currentObjectKey = js_Boot.__cast(currentKey , spriter_definitions_ObjectTimelineKey);
				if(currentObjectKey.type == spriter_definitions_ObjectType.POINT) this.points.push(library.compute(spatialInfo,activePivots,0,0)); else {
					var currentBox;
					var key = this.getTimelineName(currentRef.timeline);
					currentBox = currentEntity.boxes_info.get(key);
					this.boxes.push(library.computeRectCoordinates(spatialInfo,activePivots,currentBox.width,currentBox.height));
				}
			}
		}
		if(this.taglines != null) {
			var _g2 = 0;
			var _g11 = this.taglines;
			while(_g2 < _g11.length) {
				var tag = _g11[_g2];
				++_g2;
				if(tag.time == mainKey.time) {
					if(root.metaDispatch == spriter_definitions_MetaDispatch.ALWAYS) root.onTag(tag.id); else if(root.metaDispatch == spriter_definitions_MetaDispatch.ONCE_PER_LOOP && mainKey.time != tag.get_lastDispatched()) {
						tag.set_lastDispatched(mainKey.time);
						root.onTag(tag.id);
					} else if(root.metaDispatch == spriter_definitions_MetaDispatch.ONCE && !tag.get_dispatched()) {
						tag.set_lastDispatched(mainKey.time);
						root.onTag(tag.id);
					}
				}
			}
		}
		if(this.varlines != null) {
			var _g3 = 0;
			var _g12 = this.varlines;
			while(_g3 < _g12.length) {
				var _var = _g12[_g3];
				++_g3;
				var _g21 = 0;
				var _g31 = _var.keys;
				while(_g21 < _g31.length) {
					var keyVar = _g31[_g21];
					++_g21;
					if(keyVar.time == mainKey.time) {
						if(root.metaDispatch == spriter_definitions_MetaDispatch.ALWAYS) root.onVar(_var.id,keyVar.value); else if(root.metaDispatch == spriter_definitions_MetaDispatch.ONCE_PER_LOOP && mainKey.time != keyVar.get_lastDispatched()) {
							keyVar.set_lastDispatched(mainKey.time);
							root.onVar(_var.id,keyVar.value);
						} else if(root.metaDispatch == spriter_definitions_MetaDispatch.ONCE && !keyVar.get_dispatched()) {
							keyVar.set_lastDispatched(mainKey.time);
							root.onVar(_var.id,keyVar.value);
						}
					}
				}
			}
		}
	}
	,mainlineKeyFromTime: function(time) {
		var currentMainKey = 0;
		var len = this.mainlineKeys.length;
		var _g = 0;
		while(_g < len) {
			var m = _g++;
			if(this.mainlineKeys[m].time <= time) currentMainKey = m;
			if(this.mainlineKeys[m].time >= time) break;
		}
		return this.mainlineKeys[currentMainKey];
	}
	,keyFromRef: function(ref,newTime) {
		var timeline = this.timelines[ref.timeline];
		var keyA = timeline.keys[ref.key].copy();
		if(timeline.keys.length == 1 || keyA.curveType == spriter_definitions_CurveType.INSTANT) return keyA;
		var nextKeyIndex = ref.key + 1;
		if(nextKeyIndex >= timeline.keys.length) {
			if(this.loopType == spriter_definitions_LoopType.LOOPING) nextKeyIndex = 0; else return keyA;
		}
		var keyB = timeline.keys[nextKeyIndex].copy();
		var keyBTime = keyB.time;
		if(keyBTime < keyA.time) keyBTime = keyBTime + this.length;
		keyA.interpolate(keyB,keyBTime,newTime);
		return keyA;
	}
	,getTimelineName: function(id) {
		return this.timelines[id].name;
	}
	,resetMetaDispatch: function() {
		if(this.taglines != null) {
			var _g = 0;
			var _g1 = this.taglines;
			while(_g < _g1.length) {
				var tag = _g1[_g];
				++_g;
				tag.set_dispatched(false);
			}
		}
	}
	,__class__: spriter_definitions_SpriterAnimation
};
var spriter_definitions_SpriterBox = function(fast) {
	if(fast != null) {
		this.name = fast.att.resolve("name");
		if(fast.has.resolve("pivot_x")) this.pivotX = Std.parseFloat(fast.att.resolve("pivot_x")); else this.pivotX = 0;
		if(fast.has.resolve("pivot_y")) this.pivotY = Std.parseFloat(fast.att.resolve("pivot_y")); else this.pivotY = 0;
		if(fast.has.resolve("w")) this.width = Std.parseFloat(fast.att.resolve("w")); else this.width = 0;
		if(fast.has.resolve("h")) this.height = Std.parseFloat(fast.att.resolve("h")); else this.height = 0;
	}
};
$hxClasses["spriter.definitions.SpriterBox"] = spriter_definitions_SpriterBox;
spriter_definitions_SpriterBox.__name__ = true;
spriter_definitions_SpriterBox.prototype = {
	__class__: spriter_definitions_SpriterBox
};
var spriter_definitions_SpriterEntity = function(fast) {
	this.characterMaps = new haxe_ds_StringMap();
	this.animations = new haxe_ds_StringMap();
	this.variables = new Array();
	this.boxes_info = new haxe_ds_StringMap();
	this.id = Std.parseInt(fast.att.resolve("id"));
	this.name = fast.att.resolve("name");
	var $it0 = fast.nodes.resolve("character_map").iterator();
	while( $it0.hasNext() ) {
		var cm = $it0.next();
		var key = cm.att.resolve("name");
		var value = new spriter_definitions_CharacterMap(cm);
		this.characterMaps.set(key,value);
	}
	if(fast.hasNode.resolve("var_defs")) {
		var $it1 = fast.node.resolve("var_defs").get_elements();
		while( $it1.hasNext() ) {
			var v = $it1.next();
			var _g = v.att.resolve("type");
			switch(_g) {
			case "int":
				this.variables.push(new spriter_vars_VariableInt(v.att.resolve("name"),Std.parseInt(v.att.resolve("default"))));
				break;
			case "string":
				this.variables.push(new spriter_vars_VariableString(v.att.resolve("name"),Std.string(v.att.resolve("default"))));
				break;
			case "float":
				this.variables.push(new spriter_vars_VariableFloat(v.att.resolve("name"),Std.parseFloat(v.att.resolve("default"))));
				break;
			}
		}
	}
	var $it2 = fast.nodes.resolve("obj_info").iterator();
	while( $it2.hasNext() ) {
		var oi = $it2.next();
		var key1 = oi.att.resolve("name");
		var value1 = new spriter_definitions_SpriterBox(oi);
		this.boxes_info.set(key1,value1);
	}
	var $it3 = fast.nodes.resolve("animation").iterator();
	while( $it3.hasNext() ) {
		var a = $it3.next();
		var key2 = a.att.resolve("name");
		var value2 = new spriter_definitions_SpriterAnimation(a);
		this.animations.set(key2,value2);
	}
};
$hxClasses["spriter.definitions.SpriterEntity"] = spriter_definitions_SpriterEntity;
spriter_definitions_SpriterEntity.__name__ = true;
spriter_definitions_SpriterEntity.prototype = {
	__class__: spriter_definitions_SpriterEntity
};
var spriter_definitions_SpriterFile = function(fast) {
	if(fast != null) {
		this.id = Std.parseInt(fast.att.resolve("id"));
		this.name = fast.att.resolve("name");
		if(fast.has.resolve("pivot_x")) this.pivotX = Std.parseFloat(fast.att.resolve("pivot_x")); else this.pivotX = 0;
		if(fast.has.resolve("pivot_y")) this.pivotY = Std.parseFloat(fast.att.resolve("pivot_y")); else this.pivotY = 1;
		if(fast.has.resolve("width")) this.width = Std.parseFloat(fast.att.resolve("width")); else this.width = 0;
		if(fast.has.resolve("height")) this.height = Std.parseFloat(fast.att.resolve("height")); else this.height = 0;
	}
};
$hxClasses["spriter.definitions.SpriterFile"] = spriter_definitions_SpriterFile;
spriter_definitions_SpriterFile.__name__ = true;
spriter_definitions_SpriterFile.prototype = {
	copy: function() {
		var copy = new spriter_definitions_SpriterFile();
		copy.name = this.name;
		copy.id = this.id;
		copy.pivotX = this.pivotX;
		copy.pivotY = this.pivotY;
		copy.width = this.width;
		copy.height = this.height;
		return copy;
	}
	,__class__: spriter_definitions_SpriterFile
};
var spriter_definitions_SpriterFolder = function(fast) {
	this.name = "";
	this.files = new Array();
	if(fast != null) {
		this.id = Std.parseInt(fast.att.resolve("id"));
		if(fast.hasNode.resolve("name")) this.name = fast.att.resolve("name");
		var $it0 = fast.nodes.resolve("file").iterator();
		while( $it0.hasNext() ) {
			var f = $it0.next();
			this.files.push(new spriter_definitions_SpriterFile(f));
		}
	}
};
$hxClasses["spriter.definitions.SpriterFolder"] = spriter_definitions_SpriterFolder;
spriter_definitions_SpriterFolder.__name__ = true;
spriter_definitions_SpriterFolder.prototype = {
	copy: function() {
		var copy = new spriter_definitions_SpriterFolder();
		copy.name = this.name;
		copy.id = this.id;
		var _g1 = 0;
		var _g = this.files.length;
		while(_g1 < _g) {
			var i = _g1++;
			copy.files[i] = this.files[i].copy();
		}
		return copy;
	}
	,__class__: spriter_definitions_SpriterFolder
};
var spriter_definitions_ObjectType = $hxClasses["spriter.definitions.ObjectType"] = { __ename__ : true, __constructs__ : ["SPRITE","BONE","BOX","POINT","SOUND","ENTITY","VARIABLE"] };
spriter_definitions_ObjectType.SPRITE = ["SPRITE",0];
spriter_definitions_ObjectType.SPRITE.toString = $estr;
spriter_definitions_ObjectType.SPRITE.__enum__ = spriter_definitions_ObjectType;
spriter_definitions_ObjectType.BONE = ["BONE",1];
spriter_definitions_ObjectType.BONE.toString = $estr;
spriter_definitions_ObjectType.BONE.__enum__ = spriter_definitions_ObjectType;
spriter_definitions_ObjectType.BOX = ["BOX",2];
spriter_definitions_ObjectType.BOX.toString = $estr;
spriter_definitions_ObjectType.BOX.__enum__ = spriter_definitions_ObjectType;
spriter_definitions_ObjectType.POINT = ["POINT",3];
spriter_definitions_ObjectType.POINT.toString = $estr;
spriter_definitions_ObjectType.POINT.__enum__ = spriter_definitions_ObjectType;
spriter_definitions_ObjectType.SOUND = ["SOUND",4];
spriter_definitions_ObjectType.SOUND.toString = $estr;
spriter_definitions_ObjectType.SOUND.__enum__ = spriter_definitions_ObjectType;
spriter_definitions_ObjectType.ENTITY = ["ENTITY",5];
spriter_definitions_ObjectType.ENTITY.toString = $estr;
spriter_definitions_ObjectType.ENTITY.__enum__ = spriter_definitions_ObjectType;
spriter_definitions_ObjectType.VARIABLE = ["VARIABLE",6];
spriter_definitions_ObjectType.VARIABLE.toString = $estr;
spriter_definitions_ObjectType.VARIABLE.__enum__ = spriter_definitions_ObjectType;
var spriter_definitions_SpriterTimeline = function(fast) {
	this.keys = new Array();
	this.id = Std.parseInt(fast.att.resolve("id"));
	if(fast.has.resolve("name")) this.name = fast.att.resolve("name"); else this.name = "";
	if(fast.has.resolve("object_type")) this.objectType = Type.createEnum(spriter_definitions_ObjectType,fast.att.resolve("object_type").toUpperCase()); else this.objectType = spriter_definitions_ObjectType.SPRITE;
	var _g = this.objectType;
	switch(Type.enumIndex(_g)) {
	case 0:
		var $it0 = fast.nodes.resolve("key").iterator();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			this.keys.push(new spriter_definitions_SpriteTimelineKey(k));
		}
		break;
	case 1:
		var $it1 = fast.nodes.resolve("key").iterator();
		while( $it1.hasNext() ) {
			var k1 = $it1.next();
			this.keys.push(new spriter_definitions_BoneTimelineKey(k1));
		}
		break;
	case 3:
		var $it2 = fast.nodes.resolve("key").iterator();
		while( $it2.hasNext() ) {
			var k2 = $it2.next();
			this.keys.push(new spriter_definitions_ObjectTimelineKey(k2,this.objectType));
		}
		break;
	case 2:
		var $it3 = fast.nodes.resolve("key").iterator();
		while( $it3.hasNext() ) {
			var k3 = $it3.next();
			this.keys.push(new spriter_definitions_ObjectTimelineKey(k3,this.objectType));
		}
		break;
	default:
	}
};
$hxClasses["spriter.definitions.SpriterTimeline"] = spriter_definitions_SpriterTimeline;
spriter_definitions_SpriterTimeline.__name__ = true;
spriter_definitions_SpriterTimeline.prototype = {
	__class__: spriter_definitions_SpriterTimeline
};
var spriter_definitions_TaglineKey = function(fast) {
	this._lastDispatched = -1;
	this._dispatched = false;
	this.time = 0;
	if(fast != null) {
		if(fast.has.resolve("id")) this.id = Std.parseInt(fast.att.resolve("id")); else this.id = 0;
		if(fast.has.resolve("time")) this.time = Std.parseInt(fast.att.resolve("time")); else this.time = 0;
		fast = fast.node.resolve("tag");
		this.t = Std.parseInt(fast.att.resolve("t"));
	}
};
$hxClasses["spriter.definitions.TaglineKey"] = spriter_definitions_TaglineKey;
spriter_definitions_TaglineKey.__name__ = true;
spriter_definitions_TaglineKey.prototype = {
	set_lastDispatched: function(val) {
		this._lastDispatched = val;
		this._dispatched = val != -1;
		return val;
	}
	,get_lastDispatched: function() {
		return this._lastDispatched;
	}
	,set_dispatched: function(val) {
		this._dispatched = val;
		if(!val) this._lastDispatched = -1;
		return val;
	}
	,get_dispatched: function() {
		return this._dispatched;
	}
	,__class__: spriter_definitions_TaglineKey
};
var spriter_definitions_CurveType = $hxClasses["spriter.definitions.CurveType"] = { __ename__ : true, __constructs__ : ["INSTANT","LINEAR","QUADRATIC","CUBIC"] };
spriter_definitions_CurveType.INSTANT = ["INSTANT",0];
spriter_definitions_CurveType.INSTANT.toString = $estr;
spriter_definitions_CurveType.INSTANT.__enum__ = spriter_definitions_CurveType;
spriter_definitions_CurveType.LINEAR = ["LINEAR",1];
spriter_definitions_CurveType.LINEAR.toString = $estr;
spriter_definitions_CurveType.LINEAR.__enum__ = spriter_definitions_CurveType;
spriter_definitions_CurveType.QUADRATIC = ["QUADRATIC",2];
spriter_definitions_CurveType.QUADRATIC.toString = $estr;
spriter_definitions_CurveType.QUADRATIC.__enum__ = spriter_definitions_CurveType;
spriter_definitions_CurveType.CUBIC = ["CUBIC",3];
spriter_definitions_CurveType.CUBIC.toString = $estr;
spriter_definitions_CurveType.CUBIC.__enum__ = spriter_definitions_CurveType;
var spriter_definitions_Varline = function(fast) {
	if(fast != null) {
		this.id = Std.parseInt(fast.att.resolve("def"));
		this.keys = [];
		var $it0 = fast.nodes.resolve("key").iterator();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			this.keys.push(new spriter_definitions_VarlineKey(key));
		}
	}
};
$hxClasses["spriter.definitions.Varline"] = spriter_definitions_Varline;
spriter_definitions_Varline.__name__ = true;
spriter_definitions_Varline.prototype = {
	__class__: spriter_definitions_Varline
};
var spriter_definitions_VarlineKey = function(fast) {
	this._lastDispatched = -1;
	this._dispatched = false;
	this.time = 0;
	if(fast != null) {
		if(fast.has.resolve("id")) this.id = Std.parseInt(fast.att.resolve("id")); else this.id = 0;
		if(fast.has.resolve("time")) this.time = Std.parseInt(fast.att.resolve("time")); else this.time = 0;
		this.value = fast.att.resolve("val");
	}
};
$hxClasses["spriter.definitions.VarlineKey"] = spriter_definitions_VarlineKey;
spriter_definitions_VarlineKey.__name__ = true;
spriter_definitions_VarlineKey.prototype = {
	set_lastDispatched: function(val) {
		this._lastDispatched = val;
		this._dispatched = val != -1;
		return val;
	}
	,get_lastDispatched: function() {
		return this._lastDispatched;
	}
	,get_dispatched: function() {
		return this._dispatched;
	}
	,__class__: spriter_definitions_VarlineKey
};
var spriter_engine_Spriter = function(_name,_scml,_library,_info) {
	this.playbackSpeed = 1;
	this.paused = false;
	this.timeMS = 0;
	this.scml = _scml;
	this.library = _library;
	this.spriterName = _name;
	this.scml.spriterName = this.spriterName;
	this.info = _info;
};
$hxClasses["spriter.engine.Spriter"] = spriter_engine_Spriter;
spriter_engine_Spriter.__name__ = true;
spriter_engine_Spriter.prototype = {
	advanceTime: function(elapsedMS) {
		if(!this.paused) this.timeMS += Std["int"](elapsedMS * this.playbackSpeed);
		this.scml.setCurrentTime(this.timeMS,this.library,this.info);
	}
	,playAnim: function(name,endAnimCallback,removeCallback) {
		if(removeCallback == null) removeCallback = true;
		if(name == null) {
			if(this.paused) this.paused = false;
			this.resetTime();
			if(endAnimCallback != null) {
				this.scml.endAnimCallback = (function(f,a1,a2,a3) {
					return function() {
						return f(a1,a2,a3);
					};
				})(endAnimCallback,this,this.scml.currentEntity,this.scml.currentAnimation);
				this.scml.endAnimRemoval = removeCallback;
			}
			return true;
		} else if(this.scml.entities.get(this.scml.currentEntity).animations.exists(name)) {
			if(this.paused) this.paused = false;
			this.resetTime();
			this.scml.currentAnimation = name;
			if(endAnimCallback != null) {
				this.scml.endAnimCallback = (function(f1,a11,a21,a31) {
					return function() {
						return f1(a11,a21,a31);
					};
				})(endAnimCallback,this,this.scml.currentEntity,name);
				this.scml.endAnimRemoval = removeCallback;
			}
			return true;
		} else return false;
	}
	,resetTime: function() {
		this.timeMS = 0;
	}
	,__class__: spriter_engine_Spriter
};
var spriter_flambe_SpriterMovie = function(pack,scmlFilePath,spriterEntityName) {
	flambe_Component.call(this);
	this._pack = pack;
	var aPath = scmlFilePath.split("/");
	aPath.pop();
	this._basePath = aPath.join("/");
	var scml_str = this._pack.getFile(scmlFilePath).toString();
	this._scml = new spriter_definitions_ScmlObject(Xml.parse(scml_str));
	this._container = new flambe_Entity().add(new flambe_display_Sprite());
	this._library = new spriter_library_FlambeLibrary(this._container,this._pack,this._basePath);
	this._spriter = new spriter_engine_Spriter(spriterEntityName,this._scml,this._library,new spriter_definitions_SpatialInfo());
};
$hxClasses["spriter.flambe.SpriterMovie"] = spriter_flambe_SpriterMovie;
spriter_flambe_SpriterMovie.__name__ = true;
spriter_flambe_SpriterMovie.__super__ = flambe_Component;
spriter_flambe_SpriterMovie.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "SpriterMovie_1";
	}
	,onStart: function() {
		this.owner.addChild(this._container);
	}
	,onUpdate: function(dt) {
		this._library.clear();
		this._spriter.advanceTime(Std["int"](dt * 1000));
	}
	,playAnim: function(sAnimName) {
		this._spriter.playAnim(sAnimName);
		return this;
	}
	,__class__: spriter_flambe_SpriterMovie
});
var spriter_library_AbstractLibrary = function(basePath) {
	this._basePath = basePath;
};
$hxClasses["spriter.library.AbstractLibrary"] = spriter_library_AbstractLibrary;
spriter_library_AbstractLibrary.__name__ = true;
spriter_library_AbstractLibrary.prototype = {
	addGraphic: function(group,timeline,key,name,info,pivots) {
		throw "must be overrided";
	}
	,compute: function(info,pivots,width,height) {
		var degreesUnder360 = spriter_util_SpriterUtil.under360(info.angle);
		var rad = spriter_util_SpriterUtil.toRadians(degreesUnder360);
		var s = Math.sin(rad);
		var c = Math.cos(rad);
		var pivotX = info.x;
		var pivotY = info.y;
		var preX = info.x - pivots.pivotX * width * info.scaleX;
		var preY = info.y + (1 - pivots.pivotY) * height * info.scaleY;
		var x2 = (preX - pivotX) * c - (preY - pivotY) * s + pivotX;
		var y2 = (preX - pivotX) * s + (preY - pivotY) * c + pivotY;
		return new spriter_definitions_SpatialInfo(x2,-y2,degreesUnder360,info.scaleX,info.scaleY,info.a,info.spin);
	}
	,computeRectCoordinates: function(info,pivots,width,height) {
		var degreesUnder360 = -spriter_util_SpriterUtil.under360(info.angle);
		var rad = spriter_util_SpriterUtil.toRadians(degreesUnder360);
		var s = Math.sin(rad);
		var c = Math.cos(rad);
		var pivotX = info.x;
		var pivotY = -info.y;
		var x1 = pivotX - width * info.scaleX * pivots.pivotX;
		var y1 = pivotY - height * info.scaleY * (1 - pivots.pivotY);
		var x2 = x1 + width * info.scaleX;
		var y2 = y1;
		x2 = (x2 - pivotX) * c - (y2 - pivotY) * s + pivotX;
		y2 = (x2 - pivotX) * s + (y2 - pivotY) * c + pivotY;
		var x3 = x1 + width * info.scaleX;
		var y3 = y1 + height * info.scaleY;
		x3 = (x3 - pivotX) * c - (y3 - pivotY) * s + pivotX;
		y3 = (x3 - pivotX) * s + (y3 - pivotY) * c + pivotY;
		var x4 = x1;
		var y4 = y1 + height * info.scaleY;
		x4 = (x4 - pivotX) * c - (y4 - pivotY) * s + pivotX;
		y4 = (x4 - pivotX) * s + (y4 - pivotY) * c + pivotY;
		x1 = (x1 - pivotX) * c - (y1 - pivotY) * s + pivotX;
		y1 = (x1 - pivotX) * s + (y1 - pivotY) * c + pivotY;
		return new spriter_definitions_Quadrilateral(new spriter_definitions_QuadPoint(x1,y1),new spriter_definitions_QuadPoint(x2,y2),new spriter_definitions_QuadPoint(x3,y3),new spriter_definitions_QuadPoint(x4,y4));
	}
	,__class__: spriter_library_AbstractLibrary
};
var spriter_library_FlambeLibrary = function(rootEntity,pack,basePath) {
	spriter_library_AbstractLibrary.call(this,basePath);
	this._pack = pack;
	this._point = new flambe_math_Point();
	this._matrix = new flambe_math_Matrix();
	this._rootEntity = rootEntity;
	spriter_library_FlambeLibrary._textures = new haxe_ds_StringMap();
	this._entityPool = new flambe_util_Pool(function() {
		return new flambe_Entity();
	}).setSize(25);
};
$hxClasses["spriter.library.FlambeLibrary"] = spriter_library_FlambeLibrary;
spriter_library_FlambeLibrary.__name__ = true;
spriter_library_FlambeLibrary.__super__ = spriter_library_AbstractLibrary;
spriter_library_FlambeLibrary.prototype = $extend(spriter_library_AbstractLibrary.prototype,{
	getTexture: function(name) {
		if(!spriter_library_FlambeLibrary._textures.exists(name)) {
			var noExtension = name.substring(0,name.lastIndexOf("."));
			var value = this._pack.getTexture(this._basePath + "/" + noExtension);
			spriter_library_FlambeLibrary._textures.set(name,value);
		}
		return spriter_library_FlambeLibrary._textures.get(name);
	}
	,clear: function() {
		while(this._rootEntity.firstChild != null) {
			var child = this._rootEntity.firstChild;
			this._rootEntity.removeChild(child);
			this._entityPool.put(child);
		}
		this._rootEntity.add(new flambe_display_Sprite());
	}
	,addGraphic: function(group,timeline,key,name,info,pivots) {
		var bmp = this.getTexture(name);
		var spatialResult = this.compute(info,pivots,bmp.get_width(),bmp.get_height());
		var sprite = new flambe_display_ImageSprite(bmp);
		var localMatrix = sprite.getLocalMatrix();
		localMatrix.compose(spatialResult.x,spatialResult.y,spatialResult.scaleX,spatialResult.scaleY,flambe_math_FMath.toRadians(spriter_util_SpriterUtil.fixRotation(spatialResult.angle)));
		sprite.alpha.set__(spatialResult.a);
		this._rootEntity.addChild(this._entityPool.take().add(sprite));
	}
	,__class__: spriter_library_FlambeLibrary
});
var spriter_util_SpriterUtil = function() { };
$hxClasses["spriter.util.SpriterUtil"] = spriter_util_SpriterUtil;
spriter_util_SpriterUtil.__name__ = true;
spriter_util_SpriterUtil.toRadians = function(deg) {
	return deg * Math.PI / 180;
};
spriter_util_SpriterUtil.fixRotation = function(rotation) {
	if(rotation == 0) rotation = 360;
	return 360 - rotation;
};
spriter_util_SpriterUtil.under360 = function(rotation) {
	while(rotation > 360) rotation -= 360;
	while(rotation < 0) rotation += 360;
	return rotation;
};
var spriter_vars_Variable = function(name,def) {
	this.name = name;
	this.value = def;
	this.def = def;
};
$hxClasses["spriter.vars.Variable"] = spriter_vars_Variable;
spriter_vars_Variable.__name__ = true;
spriter_vars_Variable.prototype = {
	set: function(value) {
		return false;
	}
	,__class__: spriter_vars_Variable
};
var spriter_vars_VariableFloat = function(name,value) {
	spriter_vars_Variable.call(this,name,value);
};
$hxClasses["spriter.vars.VariableFloat"] = spriter_vars_VariableFloat;
spriter_vars_VariableFloat.__name__ = true;
spriter_vars_VariableFloat.__super__ = spriter_vars_Variable;
spriter_vars_VariableFloat.prototype = $extend(spriter_vars_Variable.prototype,{
	set: function(value) {
		var temp = this.value;
		this.value = Std.parseFloat(value);
		if(temp != this.value) return true;
		return false;
	}
	,__class__: spriter_vars_VariableFloat
});
var spriter_vars_VariableInt = function(name,value) {
	spriter_vars_Variable.call(this,name,value);
};
$hxClasses["spriter.vars.VariableInt"] = spriter_vars_VariableInt;
spriter_vars_VariableInt.__name__ = true;
spriter_vars_VariableInt.__super__ = spriter_vars_Variable;
spriter_vars_VariableInt.prototype = $extend(spriter_vars_Variable.prototype,{
	set: function(value) {
		var temp = this.value;
		this.value = Std.parseInt(value);
		if(temp != this.value) return true;
		return false;
	}
	,__class__: spriter_vars_VariableInt
});
var spriter_vars_VariableString = function(name,value) {
	spriter_vars_Variable.call(this,name,value);
};
$hxClasses["spriter.vars.VariableString"] = spriter_vars_VariableString;
spriter_vars_VariableString.__name__ = true;
spriter_vars_VariableString.__super__ = spriter_vars_Variable;
spriter_vars_VariableString.prototype = $extend(spriter_vars_Variable.prototype,{
	set: function(value) {
		var temp = this.value;
		this.value = value;
		if(temp != this.value) return true;
		return false;
	}
	,__class__: spriter_vars_VariableString
});
var tools_spark_Main = function() { };
$hxClasses["tools.spark.Main"] = tools_spark_Main;
tools_spark_Main.__name__ = true;
tools_spark_Main.main = function() {
	tools_spark_framework_Framework.init();
	tools_spark_Main._loadClientConfig();
};
tools_spark_Main._loadClientConfig = function() {
	tools_spark_framework_Assets.successSignal.connect(tools_spark_Main._onClientConfigLoaded).once();
	tools_spark_framework_Assets.initiateBatch();
	tools_spark_framework_Assets.addFile(tools_spark_Main._getSkcUrl(),"config");
	tools_spark_framework_Assets.loadBatch();
};
tools_spark_Main._onClientConfigLoaded = function() {
	var l_configurator = new tools_spark_framework_config_Config(tools_spark_framework_Assets.getFile("config"));
	if(l_configurator.parseClient() == false) {
		tools_spark_framework_Console.error("Failed to parse configuration file. Aborting...");
		return;
	}
	tools_spark_sliced_core_Sliced.init();
	tools_spark_framework_Framework.createDisplayRenderers();
	var _g = 0;
	var _g1 = tools_spark_framework_Project.executeModules;
	while(_g < _g1.length) {
		var moduleName = _g1[_g];
		++_g;
		tools_spark_framework_ModuleManager.execute(moduleName);
	}
	flambe_System.root.add(new tools_spark_framework_RootComponent());
};
tools_spark_Main._getSkcUrl = function() {
	try {
		var l_skcUrl = flambe_System.get_external().call("getMainSparkClientUrl");
		if(l_skcUrl.length == 0) return "main.skc"; else return l_skcUrl;
	} catch( e ) {
		return "main.skc";
	}
};
var tools_spark_framework_Assets = function() { };
$hxClasses["tools.spark.framework.Assets"] = tools_spark_framework_Assets;
tools_spark_framework_Assets.__name__ = true;
tools_spark_framework_Assets.init = function() {
	tools_spark_framework_Assets._loader = new tools_spark_framework_assets_FlambeLoader();
	tools_spark_framework_Assets._loader.successSignal.connect(tools_spark_framework_Assets._onLoaderSuccess);
	tools_spark_framework_Assets._loader.errorSignal.connect(tools_spark_framework_Assets._onLoaderError);
	tools_spark_framework_Assets._loader.progressSignal.connect(tools_spark_framework_Assets._onLoaderProgress);
	tools_spark_framework_Assets.successSignal = new flambe_util_Signal0();
	tools_spark_framework_Assets.errorSignal = new flambe_util_Signal1();
	tools_spark_framework_Assets.progressSignal = new flambe_util_Signal2();
};
tools_spark_framework_Assets._onLoaderSuccess = function() {
	haxe_Log.trace("Assets: SUCCESS!",{ fileName : "Assets.hx", lineNumber : 49, className : "tools.spark.framework.Assets", methodName : "_onLoaderSuccess"});
	tools_spark_framework_Assets.successSignal.emit();
};
tools_spark_framework_Assets._onLoaderError = function(p_error) {
	haxe_Log.trace("Assets: ERROR: " + p_error,{ fileName : "Assets.hx", lineNumber : 55, className : "tools.spark.framework.Assets", methodName : "_onLoaderError"});
	tools_spark_framework_Assets.errorSignal.emit(p_error);
};
tools_spark_framework_Assets._onLoaderProgress = function(p_progress,p_total) {
	tools_spark_framework_Assets.progressSignal.emit(p_progress,p_total);
};
tools_spark_framework_Assets.initiateBatch = function() {
	tools_spark_framework_Assets._loader.startNewBatchLoad();
};
tools_spark_framework_Assets.addFile = function(p_url,p_name,p_forceLoadAsData) {
	if(p_forceLoadAsData == null) p_forceLoadAsData = false;
	if(p_name == null) p_name = p_url;
	tools_spark_framework_Assets._loader.addFile(p_name,p_url,p_forceLoadAsData);
};
tools_spark_framework_Assets.loadBatch = function() {
	tools_spark_framework_Assets._loader.initiateLoad();
};
tools_spark_framework_Assets.getAssetPackOf = function(p_name) {
	return tools_spark_framework_Assets._loader.getAssetPackOf(p_name);
};
tools_spark_framework_Assets.getFile = function(p_name) {
	return tools_spark_framework_Assets._loader.getFile(p_name);
};
tools_spark_framework_Assets.getTexture = function(p_name) {
	return tools_spark_framework_Assets._loader.getTexture(p_name);
};
tools_spark_framework_Assets.getSound = function(p_name) {
	return tools_spark_framework_Assets._loader.getSound(p_name);
};
var tools_spark_framework_Console = function() { };
$hxClasses["tools.spark.framework.Console"] = tools_spark_framework_Console;
tools_spark_framework_Console.__name__ = true;
tools_spark_framework_Console.log = function(p_message) {
	tools_spark_framework_SparkLog.info(p_message);
};
tools_spark_framework_Console.info = function(p_message) {
	tools_spark_framework_SparkLog.info(p_message);
};
tools_spark_framework_Console.debug = function(p_message) {
	tools_spark_framework_SparkLog.info(p_message);
};
tools_spark_framework_Console.warn = function(p_message) {
	tools_spark_framework_SparkLog.warn(p_message);
};
tools_spark_framework_Console.error = function(p_message) {
	tools_spark_framework_SparkLog.error(p_message);
};
var tools_spark_framework_Framework = function() { };
$hxClasses["tools.spark.framework.Framework"] = tools_spark_framework_Framework;
tools_spark_framework_Framework.__name__ = true;
tools_spark_framework_Framework.init = function() {
	if (Object.defineProperty) Object.defineProperty(Array.prototype, "__class__", {enumerable: false});;
	flambe_System.init();
	tools_spark_framework_platform_html_Graphics.init();
	tools_spark_framework_Assets.init();
	tools_spark_framework_Project.init();
	tools_spark_framework_ModuleManager.init();
};
tools_spark_framework_Framework.createDisplayRenderers = function() {
	tools_spark_framework_platform_html_Graphics.createDisplayRenderers();
};
var tools_spark_framework_ModuleManager = function() { };
$hxClasses["tools.spark.framework.ModuleManager"] = tools_spark_framework_ModuleManager;
tools_spark_framework_ModuleManager.__name__ = true;
tools_spark_framework_ModuleManager.init = function() {
	tools_spark_framework_ModuleManager._moduleStates = new haxe_ds_StringMap();
	tools_spark_framework_ModuleManager._modulesLoadQueue = new Array();
	tools_spark_framework_ModuleManager._modulesLoadQueueBytes = new Array();
	tools_spark_framework_ModuleManager._loadingBatch = false;
	tools_spark_framework_Assets.successSignal.connect(tools_spark_framework_ModuleManager._onLoaderSuccess);
	tools_spark_framework_Assets.errorSignal.connect(tools_spark_framework_ModuleManager._onLoaderError);
	tools_spark_framework_Assets.progressSignal.connect(tools_spark_framework_ModuleManager._onLoaderProgress);
};
tools_spark_framework_ModuleManager._onLoaderSuccess = function() {
	if(tools_spark_framework_ModuleManager._loadingBatch == false) return;
	tools_spark_framework_ModuleManager._loadingBatch = false;
	var l_moduleName = tools_spark_framework_ModuleManager._modulesLoadQueue[0];
	tools_spark_framework_Console.log("Module Loader: SUCCESS LOADING: " + l_moduleName);
	var v = tools_spark_framework_assets_EModuleState.LOADED;
	tools_spark_framework_ModuleManager._moduleStates.set(l_moduleName,v);
	v;
	tools_spark_framework_ModuleManager._modulesLoadQueue.shift();
	tools_spark_framework_ModuleManager._modulesLoadQueueBytes.shift();
	tools_spark_framework_ModuleManager._executeModule(l_moduleName);
	tools_spark_framework_ModuleManager._startLoadBatch();
};
tools_spark_framework_ModuleManager._onLoaderError = function(p_error) {
	tools_spark_framework_Console.error("Module Loader: ERROR: " + p_error);
};
tools_spark_framework_ModuleManager._onLoaderProgress = function(p_progress,p_total) {
};
tools_spark_framework_ModuleManager.execute = function(p_moduleName) {
	if(tools_spark_framework_ModuleManager.isModuleLoaded(p_moduleName)) tools_spark_framework_ModuleManager._executeModule(p_moduleName); else tools_spark_framework_ModuleManager._loadModule(p_moduleName);
};
tools_spark_framework_ModuleManager.getModuleState = function(p_ModuleName) {
	if(tools_spark_framework_ModuleManager._moduleStates.get(p_ModuleName) == null) {
		var v = tools_spark_framework_assets_EModuleState.NOT_LOADED;
		tools_spark_framework_ModuleManager._moduleStates.set(p_ModuleName,v);
		v;
	}
	return tools_spark_framework_ModuleManager._moduleStates.get(p_ModuleName);
};
tools_spark_framework_ModuleManager.isModuleLoaded = function(p_ModuleName) {
	var _g = tools_spark_framework_ModuleManager.getModuleState(p_ModuleName);
	switch(Type.enumIndex(_g)) {
	case 0:case 1:
		return false;
	case 2:case 3:case 4:
		return true;
	}
};
tools_spark_framework_ModuleManager.isModuleExecuted = function(p_ModuleName) {
	var _g = tools_spark_framework_ModuleManager.getModuleState(p_ModuleName);
	switch(Type.enumIndex(_g)) {
	case 0:case 1:case 2:
		return false;
	case 3:case 4:
		return true;
	}
};
tools_spark_framework_ModuleManager._executeModule = function(p_moduleName) {
	if(tools_spark_framework_ModuleManager.isModuleExecuted(p_moduleName)) {
		tools_spark_framework_Console.warn("Error while trying to execute Module [" + p_moduleName + "]. Module already executed. Ignoring..");
		return;
	} else if(tools_spark_framework_ModuleManager.isModuleExecutable(p_moduleName)) {
		tools_spark_sliced_core_Sliced.logic.createAndRun(tools_spark_framework_Project.modules.get(p_moduleName).executeEntity);
		var v = tools_spark_framework_assets_EModuleState.RUNNING;
		tools_spark_framework_ModuleManager._moduleStates.set(p_moduleName,v);
		v;
	} else {
		tools_spark_framework_Console.warn("Warning while trying to execute Module [" + p_moduleName + "]. Module is not executable. Ignoring..");
		return;
	}
};
tools_spark_framework_ModuleManager.isModuleExecutable = function(p_moduleName) {
	if(tools_spark_framework_Project.modules.get(p_moduleName).executeEntity == "none") return false; else return true;
};
tools_spark_framework_ModuleManager._loadModule = function(p_moduleName) {
	tools_spark_framework_Console.log("LOADING MODULE: " + p_moduleName);
	if(tools_spark_framework_ModuleManager.getModuleState(p_moduleName) == tools_spark_framework_assets_EModuleState.NOT_LOADED) {
		var _g = 0;
		var _g1 = tools_spark_framework_Project.modules.get(p_moduleName).requiresModules;
		while(_g < _g1.length) {
			var f_requiredModuleName = _g1[_g];
			++_g;
			tools_spark_framework_Console.log("LOADING MODULE REQUIREMENT: " + f_requiredModuleName);
			if(tools_spark_framework_ModuleManager.getModuleState(f_requiredModuleName) == tools_spark_framework_assets_EModuleState.NOT_LOADED) tools_spark_framework_ModuleManager._loadModule(f_requiredModuleName);
		}
		tools_spark_framework_ModuleManager._loadAssetsOfModule(p_moduleName);
	}
};
tools_spark_framework_ModuleManager._loadAssetsOfModule = function(p_moduleName) {
	var l_bytes = 0;
	var $it0 = tools_spark_framework_Project.modules.get(p_moduleName).assets.iterator();
	while( $it0.hasNext() ) {
		var asset = $it0.next();
		l_bytes += Std.parseInt(asset.bytes);
	}
	var v = tools_spark_framework_assets_EModuleState.LOADING;
	tools_spark_framework_ModuleManager._moduleStates.set(p_moduleName,v);
	v;
	tools_spark_framework_ModuleManager._modulesLoadQueue.push(p_moduleName);
	tools_spark_framework_ModuleManager._modulesLoadQueueBytes.push(l_bytes);
	if(tools_spark_framework_ModuleManager._loadingBatch == false) tools_spark_framework_ModuleManager._startLoadBatch();
};
tools_spark_framework_ModuleManager._startLoadBatch = function() {
	if(tools_spark_framework_ModuleManager._modulesLoadQueue.length > 0) {
		var l_moduleName = tools_spark_framework_ModuleManager._modulesLoadQueue[0];
		tools_spark_framework_Assets.initiateBatch();
		var $it0 = tools_spark_framework_Project.modules.get(l_moduleName).assets.iterator();
		while( $it0.hasNext() ) {
			var asset = $it0.next();
			tools_spark_framework_Assets.addFile(tools_spark_framework_Project.getPath(asset.location,asset.type) + asset.url,asset.id,asset.forceLoadAsData == "true");
		}
		tools_spark_framework_Assets.loadBatch();
		tools_spark_framework_ModuleManager._loadingBatch = true;
	}
};
var tools_spark_framework_Project = function() { };
$hxClasses["tools.spark.framework.Project"] = tools_spark_framework_Project;
tools_spark_framework_Project.__name__ = true;
tools_spark_framework_Project.init = function() {
	tools_spark_framework_Project.executeModules = new Array();
	tools_spark_framework_Project.sliced = new haxe_ds_EnumValueMap();
	tools_spark_framework_Project.paths = new haxe_ds_StringMap();
	tools_spark_framework_Project.modules = new haxe_ds_StringMap();
};
tools_spark_framework_Project.setPath = function(p_location,p_type,p_url) {
	if(tools_spark_framework_Project.paths.get(p_location) == null) {
		var v = new haxe_ds_StringMap();
		tools_spark_framework_Project.paths.set(p_location,v);
		v;
	}
	var this1 = tools_spark_framework_Project.paths.get(p_location);
	this1.set(p_type,p_url);
	p_url;
};
tools_spark_framework_Project.getPath = function(p_location,p_type) {
	if(tools_spark_framework_Project.paths.get(p_location) == null) return null;
	var this1 = tools_spark_framework_Project.paths.get(p_location);
	return this1.get(p_type);
};
var tools_spark_framework_RootComponent = function() {
	flambe_Component.call(this);
};
$hxClasses["tools.spark.framework.RootComponent"] = tools_spark_framework_RootComponent;
tools_spark_framework_RootComponent.__name__ = true;
tools_spark_framework_RootComponent.__super__ = flambe_Component;
tools_spark_framework_RootComponent.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "RootComponent_0";
	}
	,onUpdate: function(dt) {
		tools_spark_sliced_core_Sliced.update();
	}
	,__class__: tools_spark_framework_RootComponent
});
var tools_spark_framework_SparkLog = function() { };
$hxClasses["tools.spark.framework.SparkLog"] = tools_spark_framework_SparkLog;
tools_spark_framework_SparkLog.__name__ = true;
tools_spark_framework_SparkLog.info = function(text,args) {
	tools_spark_framework_SparkLog.logger.info(text,args);
};
tools_spark_framework_SparkLog.warn = function(text,args) {
	tools_spark_framework_SparkLog.logger.warn(text,args);
};
tools_spark_framework_SparkLog.error = function(text,args) {
	tools_spark_framework_SparkLog.logger.error(text,args);
};
tools_spark_framework_SparkLog.__super__ = flambe_util_PackageLog;
tools_spark_framework_SparkLog.prototype = $extend(flambe_util_PackageLog.prototype,{
	__class__: tools_spark_framework_SparkLog
});
var tools_spark_framework_assets_Asset = function(p_id) {
	this.id = p_id;
};
$hxClasses["tools.spark.framework.assets.Asset"] = tools_spark_framework_assets_Asset;
tools_spark_framework_assets_Asset.__name__ = true;
tools_spark_framework_assets_Asset.prototype = {
	__class__: tools_spark_framework_assets_Asset
};
var tools_spark_framework_assets_EModuleState = $hxClasses["tools.spark.framework.assets.EModuleState"] = { __ename__ : true, __constructs__ : ["NOT_LOADED","LOADING","LOADED","RUNNING","PAUSED"] };
tools_spark_framework_assets_EModuleState.NOT_LOADED = ["NOT_LOADED",0];
tools_spark_framework_assets_EModuleState.NOT_LOADED.toString = $estr;
tools_spark_framework_assets_EModuleState.NOT_LOADED.__enum__ = tools_spark_framework_assets_EModuleState;
tools_spark_framework_assets_EModuleState.LOADING = ["LOADING",1];
tools_spark_framework_assets_EModuleState.LOADING.toString = $estr;
tools_spark_framework_assets_EModuleState.LOADING.__enum__ = tools_spark_framework_assets_EModuleState;
tools_spark_framework_assets_EModuleState.LOADED = ["LOADED",2];
tools_spark_framework_assets_EModuleState.LOADED.toString = $estr;
tools_spark_framework_assets_EModuleState.LOADED.__enum__ = tools_spark_framework_assets_EModuleState;
tools_spark_framework_assets_EModuleState.RUNNING = ["RUNNING",3];
tools_spark_framework_assets_EModuleState.RUNNING.toString = $estr;
tools_spark_framework_assets_EModuleState.RUNNING.__enum__ = tools_spark_framework_assets_EModuleState;
tools_spark_framework_assets_EModuleState.PAUSED = ["PAUSED",4];
tools_spark_framework_assets_EModuleState.PAUSED.toString = $estr;
tools_spark_framework_assets_EModuleState.PAUSED.__enum__ = tools_spark_framework_assets_EModuleState;
var tools_spark_framework_assets_FlambeLoader = function() {
	this._init();
};
$hxClasses["tools.spark.framework.assets.FlambeLoader"] = tools_spark_framework_assets_FlambeLoader;
tools_spark_framework_assets_FlambeLoader.__name__ = true;
tools_spark_framework_assets_FlambeLoader.prototype = {
	_init: function() {
		this.successSignal = new flambe_util_Signal0();
		this.errorSignal = new flambe_util_Signal1();
		this.progressSignal = new flambe_util_Signal2();
		this._assetInUse = new haxe_ds_StringMap();
		this._assetToBatchLoad = new haxe_ds_StringMap();
		this._batchLoadToAssetPack = new haxe_ds_ObjectMap();
	}
	,startNewBatchLoad: function() {
		this._manifest = new flambe_asset_Manifest();
	}
	,addFile: function(p_name,p_url,p_forceLoadAsData) {
		if(p_forceLoadAsData) this._manifest.add(p_name,p_url + "?" + Std.random(10000),1,flambe_asset_AssetFormat.Data); else this._manifest.add(p_name,p_url + "?" + Std.random(10000),1);
		var v = this._manifest;
		this._assetToBatchLoad.set(p_name,v);
		v;
	}
	,getAssetPackOf: function(p_name) {
		var key = this._assetToBatchLoad.get(p_name);
		return this._batchLoadToAssetPack.get(key);
	}
	,getFile: function(p_name) {
		return ((function($this) {
			var $r;
			var key = $this._assetToBatchLoad.get(p_name);
			$r = $this._batchLoadToAssetPack.get(key);
			return $r;
		}(this))).getFile(p_name);
	}
	,getTexture: function(p_name) {
		return ((function($this) {
			var $r;
			var key = $this._assetToBatchLoad.get(p_name);
			$r = $this._batchLoadToAssetPack.get(key);
			return $r;
		}(this))).getTexture(p_name);
	}
	,getSound: function(p_name) {
		return ((function($this) {
			var $r;
			var key = $this._assetToBatchLoad.get(p_name);
			$r = $this._batchLoadToAssetPack.get(key);
			return $r;
		}(this))).getSound(p_name);
	}
	,initiateLoad: function() {
		this._promise = flambe_System.loadAssetPack(this._manifest);
		this._promiseSignalSuccess = this._promise.success.connect($bind(this,this._onPromiseSuccess));
		this._promiseSignalError = this._promise.error.connect($bind(this,this._onPromiseError));
		this._promiseSignalProgress = this._promise.progressChanged.connect($bind(this,this._onPromiseProgress));
	}
	,_onPromiseSuccess: function(p_assettPack) {
		this._disposePromiseSignals();
		this._batchLoadToAssetPack.set(this._manifest,p_assettPack);
		p_assettPack;
		this.successSignal.emit();
	}
	,_onPromiseError: function(p_error) {
		this._disposePromiseSignals();
		this.errorSignal.emit(p_error);
	}
	,_onPromiseProgress: function() {
		this.progressSignal.emit(this._promise.get_progress(),this._promise.get_total());
	}
	,_disposePromiseSignals: function() {
		this._promiseSignalSuccess.dispose();
		this._promiseSignalError.dispose();
		this._promiseSignalProgress.dispose();
	}
	,__class__: tools_spark_framework_assets_FlambeLoader
};
var tools_spark_framework_assets_Module = function(p_id) {
	this.id = p_id;
	this._init();
};
$hxClasses["tools.spark.framework.assets.Module"] = tools_spark_framework_assets_Module;
tools_spark_framework_assets_Module.__name__ = true;
tools_spark_framework_assets_Module.prototype = {
	_init: function() {
		this.requiresModules = new Array();
		this.assets = new haxe_ds_StringMap();
	}
	,__class__: tools_spark_framework_assets_Module
};
var tools_spark_framework_config_Config = function(p_configFile) {
	this._configFile = p_configFile;
	this._init();
};
$hxClasses["tools.spark.framework.config.Config"] = tools_spark_framework_config_Config;
tools_spark_framework_config_Config.__name__ = true;
tools_spark_framework_config_Config.prototype = {
	_init: function() {
		this._initNodeNamesMap();
		this._initNodeTypesMap();
		this._configValidator = new tools_spark_framework_config_ConfigValidator(this._xmlNodeTypeToNodeName);
		this._configInstantiator = new tools_spark_framework_config_ConfigInstantiator(this._xmlNodeTypeToNodeName);
	}
	,parseClient: function() {
		return this._parse(tools_spark_framework_config_ENodeType.CLIENT);
	}
	,_parse: function(p_rootNodeType) {
		var l_configNode;
		tools_spark_framework_Console.info("Config: Parsing...");
		try {
			l_configNode = Xml.parse(this._configFile.toString());
		} catch( err ) {
			tools_spark_framework_Console.error(Std.string(err));
			return false;
		}
		l_configNode = l_configNode.firstElement();
		var l_configNodeType;
		var key = l_configNode.get_nodeName();
		l_configNodeType = this._xmlNodeNameToNodeType.get(key);
		if(l_configNodeType != p_rootNodeType) {
			tools_spark_framework_Console.error("Config file is not correct. Expected Root Child: " + Std.string(p_rootNodeType) + ", got: " + Std.string(l_configNodeType) + ".");
			return false;
		}
		tools_spark_framework_Console.info("Config: Validating...");
		this._configValidator.init(p_rootNodeType);
		if(this._validateConfigNode(l_configNode) == false) {
			tools_spark_framework_Console.error("Config file could not be validated");
			return false;
		}
		tools_spark_framework_Console.info("Config: Instantiating...");
		this._configInstantiator.init(l_configNode,p_rootNodeType);
		this._configInstantiator.instantiateProject();
		this._configInstantiator.instantiateSliced();
		this._configInstantiator.instantiatePaths();
		this._configInstantiator.instantiateAssets();
		tools_spark_framework_Console.info("Config: Completed!");
		return true;
	}
	,_validateConfigNode: function(p_configNode) {
		var l_configNodeType;
		var key = p_configNode.get_nodeName();
		l_configNodeType = this._xmlNodeNameToNodeType.get(key);
		if(this._configValidator.validateConfigNode(p_configNode,l_configNodeType)) return true; else {
			var $it0 = p_configNode.elements();
			while( $it0.hasNext() ) {
				var elt = $it0.next();
				if(this._validateConfigNode(elt) == false) return false;
			}
			return false;
		}
	}
	,_initNodeNamesMap: function() {
		this._xmlNodeTypeToNodeName = new haxe_ds_EnumValueMap();
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.CLIENT,"Client");
		"Client";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.SERVER,"Server");
		"Server";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.PROJECT,"Project");
		"Project";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.SLICED,"Sliced");
		"Sliced";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.PATHS,"Paths");
		"Paths";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.ASSETS,"Assets");
		"Assets";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.PROJECT_NAME,"Name");
		"Name";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.PROJECT_VERSION,"Version");
		"Version";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH,"ExecuteAtLaunch");
		"ExecuteAtLaunch";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.EXECUTE_MODULE,"ExecuteModule");
		"ExecuteModule";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.SOUND_SERVICE,"Sound");
		"Sound";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.LOGIC_SERVICE,"Logic");
		"Logic";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.INPUT_SERVICE,"Input");
		"Input";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE,"Comms");
		"Comms";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.EVENT_SERVICE,"Event");
		"Event";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.DISPLAY_SERVICE,"Display");
		"Display";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.PATH,"Path");
		"Path";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.MODULE,"Module");
		"Module";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.ASSET,"Asset");
		"Asset";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.REQUIRES,"Requires");
		"Requires";
		this._xmlNodeTypeToNodeName.set(tools_spark_framework_config_ENodeType.REQUIRES_MODULE,"RequiresModule");
		"RequiresModule";
	}
	,_initNodeTypesMap: function() {
		this._xmlNodeNameToNodeType = new haxe_ds_StringMap();
		var k = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.CLIENT);
		var v = tools_spark_framework_config_ENodeType.CLIENT;
		this._xmlNodeNameToNodeType.set(k,v);
		v;
		var k1 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.SERVER);
		var v1 = tools_spark_framework_config_ENodeType.SERVER;
		this._xmlNodeNameToNodeType.set(k1,v1);
		v1;
		var k2 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PROJECT);
		var v2 = tools_spark_framework_config_ENodeType.PROJECT;
		this._xmlNodeNameToNodeType.set(k2,v2);
		v2;
		var k3 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.SLICED);
		var v3 = tools_spark_framework_config_ENodeType.SLICED;
		this._xmlNodeNameToNodeType.set(k3,v3);
		v3;
		var k4 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PATHS);
		var v4 = tools_spark_framework_config_ENodeType.PATHS;
		this._xmlNodeNameToNodeType.set(k4,v4);
		v4;
		var k5 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.ASSETS);
		var v5 = tools_spark_framework_config_ENodeType.ASSETS;
		this._xmlNodeNameToNodeType.set(k5,v5);
		v5;
		var k6 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PROJECT_NAME);
		var v6 = tools_spark_framework_config_ENodeType.PROJECT_NAME;
		this._xmlNodeNameToNodeType.set(k6,v6);
		v6;
		var k7 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PROJECT_VERSION);
		var v7 = tools_spark_framework_config_ENodeType.PROJECT_VERSION;
		this._xmlNodeNameToNodeType.set(k7,v7);
		v7;
		var k8 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH);
		var v8 = tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH;
		this._xmlNodeNameToNodeType.set(k8,v8);
		v8;
		var k9 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.EXECUTE_MODULE);
		var v9 = tools_spark_framework_config_ENodeType.EXECUTE_MODULE;
		this._xmlNodeNameToNodeType.set(k9,v9);
		v9;
		var k10 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.SOUND_SERVICE);
		var v10 = tools_spark_framework_config_ENodeType.SOUND_SERVICE;
		this._xmlNodeNameToNodeType.set(k10,v10);
		v10;
		var k11 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.LOGIC_SERVICE);
		var v11 = tools_spark_framework_config_ENodeType.LOGIC_SERVICE;
		this._xmlNodeNameToNodeType.set(k11,v11);
		v11;
		var k12 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.INPUT_SERVICE);
		var v12 = tools_spark_framework_config_ENodeType.INPUT_SERVICE;
		this._xmlNodeNameToNodeType.set(k12,v12);
		v12;
		var k13 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE);
		var v13 = tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE;
		this._xmlNodeNameToNodeType.set(k13,v13);
		v13;
		var k14 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.EVENT_SERVICE);
		var v14 = tools_spark_framework_config_ENodeType.EVENT_SERVICE;
		this._xmlNodeNameToNodeType.set(k14,v14);
		v14;
		var k15 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.DISPLAY_SERVICE);
		var v15 = tools_spark_framework_config_ENodeType.DISPLAY_SERVICE;
		this._xmlNodeNameToNodeType.set(k15,v15);
		v15;
		var k16 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PATH);
		var v16 = tools_spark_framework_config_ENodeType.PATH;
		this._xmlNodeNameToNodeType.set(k16,v16);
		v16;
		var k17 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.MODULE);
		var v17 = tools_spark_framework_config_ENodeType.MODULE;
		this._xmlNodeNameToNodeType.set(k17,v17);
		v17;
		var k18 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.ASSET);
		var v18 = tools_spark_framework_config_ENodeType.ASSET;
		this._xmlNodeNameToNodeType.set(k18,v18);
		v18;
		var k19 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.REQUIRES);
		var v19 = tools_spark_framework_config_ENodeType.REQUIRES;
		this._xmlNodeNameToNodeType.set(k19,v19);
		v19;
		var k20 = this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.REQUIRES_MODULE);
		var v20 = tools_spark_framework_config_ENodeType.REQUIRES_MODULE;
		this._xmlNodeNameToNodeType.set(k20,v20);
		v20;
	}
	,__class__: tools_spark_framework_config_Config
};
var tools_spark_framework_config_ConfigInstantiator = function(p_xmlNodeTypeToNodeName) {
	this._xmlNodeTypeToNodeName = p_xmlNodeTypeToNodeName;
};
$hxClasses["tools.spark.framework.config.ConfigInstantiator"] = tools_spark_framework_config_ConfigInstantiator;
tools_spark_framework_config_ConfigInstantiator.__name__ = true;
tools_spark_framework_config_ConfigInstantiator.prototype = {
	init: function(p_configNode,p_rootNodeType) {
		this._configNode = p_configNode;
		this._rootNodeType = p_rootNodeType;
	}
	,instantiateProject: function() {
		var l_projectNode = this._configNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PROJECT)).next();
		tools_spark_framework_Project.$name = l_projectNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PROJECT_NAME)).next().firstChild().get_nodeValue();
		tools_spark_framework_Project.version = l_projectNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PROJECT_VERSION)).next().firstChild().get_nodeValue();
		tools_spark_framework_Project.type = this._rootNodeType;
		var l_ExecuteModules = l_projectNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH)).next();
		var $it0 = l_ExecuteModules.elements();
		while( $it0.hasNext() ) {
			var executeModule = $it0.next();
			tools_spark_framework_Project.executeModules.push(executeModule.firstChild().get_nodeValue());
		}
	}
	,instantiateSliced: function() {
		var l_slicedNode = this._configNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.SLICED)).next();
		var v = l_slicedNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.LOGIC_SERVICE)).next().firstChild().get_nodeValue();
		tools_spark_framework_Project.sliced.set(tools_spark_framework_config_ENodeType.LOGIC_SERVICE,v);
		v;
		var v1 = l_slicedNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE)).next().firstChild().get_nodeValue();
		tools_spark_framework_Project.sliced.set(tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE,v1);
		v1;
		var v2 = l_slicedNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.EVENT_SERVICE)).next().firstChild().get_nodeValue();
		tools_spark_framework_Project.sliced.set(tools_spark_framework_config_ENodeType.EVENT_SERVICE,v2);
		v2;
		if(tools_spark_framework_Project.type == tools_spark_framework_config_ENodeType.CLIENT) {
			var v3 = l_slicedNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.SOUND_SERVICE)).next().firstChild().get_nodeValue();
			tools_spark_framework_Project.sliced.set(tools_spark_framework_config_ENodeType.SOUND_SERVICE,v3);
			v3;
			var v4 = l_slicedNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.INPUT_SERVICE)).next().firstChild().get_nodeValue();
			tools_spark_framework_Project.sliced.set(tools_spark_framework_config_ENodeType.INPUT_SERVICE,v4);
			v4;
			var v5 = l_slicedNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.DISPLAY_SERVICE)).next().firstChild().get_nodeValue();
			tools_spark_framework_Project.sliced.set(tools_spark_framework_config_ENodeType.DISPLAY_SERVICE,v5);
			v5;
		}
	}
	,instantiatePaths: function() {
		var l_pathsNode = this._configNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PATHS)).next();
		var $it0 = l_pathsNode.elements();
		while( $it0.hasNext() ) {
			var f_pathNode = $it0.next();
			tools_spark_framework_Project.setPath(f_pathNode.get("location"),f_pathNode.get("type"),f_pathNode.firstChild().get_nodeValue());
		}
	}
	,instantiateAssets: function() {
		var l_assetsNode = this._configNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.ASSETS)).next();
		var $it0 = l_assetsNode.elements();
		while( $it0.hasNext() ) {
			var f_moduleNode = $it0.next();
			var k = f_moduleNode.get("id");
			var v = this._instantiateModule(f_moduleNode);
			tools_spark_framework_Project.modules.set(k,v);
			v;
		}
	}
	,_instantiateModule: function(p_moduleNode) {
		var l_module = new tools_spark_framework_assets_Module(p_moduleNode.get("id"));
		l_module.executeEntity = p_moduleNode.get("executeEntity");
		if(p_moduleNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.REQUIRES)).hasNext()) {
			var l_requiresNode = p_moduleNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.REQUIRES)).next();
			var $it0 = l_requiresNode.elements();
			while( $it0.hasNext() ) {
				var requiresModuleNode = $it0.next();
				l_module.requiresModules.push(requiresModuleNode.firstChild().get_nodeValue());
			}
		}
		var l_assetChildren = p_moduleNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.ASSET));
		while(l_assetChildren.hasNext()) {
			var w_assetNode = l_assetChildren.next();
			var w_asset = this._instantiateAsset(w_assetNode);
			l_module.assets.set(w_asset.id,w_asset);
			w_asset;
		}
		return l_module;
	}
	,_instantiateAsset: function(p_assetNode) {
		var l_assetId;
		if(p_assetNode.get("id") == "useUrl") l_assetId = p_assetNode.firstChild().get_nodeValue(); else l_assetId = p_assetNode.get("id");
		var l_asset = new tools_spark_framework_assets_Asset(l_assetId);
		l_asset.url = p_assetNode.firstChild().get_nodeValue();
		l_asset.type = p_assetNode.get("type");
		l_asset.subtype = p_assetNode.get("subtype");
		l_asset.location = p_assetNode.get("location");
		l_asset.bytes = p_assetNode.get("bytes");
		l_asset.condition = p_assetNode.get("condition");
		l_asset.forceLoadAsData = p_assetNode.get("forceLoadAsData");
		return l_asset;
	}
	,__class__: tools_spark_framework_config_ConfigInstantiator
};
var tools_spark_framework_config_ConfigValidator = function(p_xmlNodeTypeToNodeName) {
	this._xmlNodeTypeToNodeName = p_xmlNodeTypeToNodeName;
};
$hxClasses["tools.spark.framework.config.ConfigValidator"] = tools_spark_framework_config_ConfigValidator;
tools_spark_framework_config_ConfigValidator.__name__ = true;
tools_spark_framework_config_ConfigValidator.prototype = {
	init: function(p_rootNodeType) {
		this._initNodeRulesMap(p_rootNodeType);
	}
	,_initNodeRulesMap: function(p_rootNodeType) {
		this._xmlNodeTypeToNodeRule = new haxe_ds_EnumValueMap();
		var v = this._createRequiresModuleNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.REQUIRES_MODULE,v);
		v;
		var v1 = this._createRequiresNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.REQUIRES,v1);
		v1;
		var v2 = this._createAssetNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.ASSET,v2);
		v2;
		var v3 = this._createModuleNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.MODULE,v3);
		v3;
		var v4 = this._createAssetsNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.ASSETS,v4);
		v4;
		var v5 = this._createPathNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.PATH,v5);
		v5;
		var v6 = this._createPathsNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.PATHS,v6);
		v6;
		var v7 = this._createSoundServiceNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.SOUND_SERVICE,v7);
		v7;
		var v8 = this._createLogicServiceNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.LOGIC_SERVICE,v8);
		v8;
		var v9 = this._createInputServiceNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.INPUT_SERVICE,v9);
		v9;
		var v10 = this._createCommsServiceNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE,v10);
		v10;
		var v11 = this._createEventServiceNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.EVENT_SERVICE,v11);
		v11;
		var v12 = this._createDisplayServiceNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.DISPLAY_SERVICE,v12);
		v12;
		var v13 = this._createExecuteModuleNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.EXECUTE_MODULE,v13);
		v13;
		var v14 = this._createExecuteAtLaunchNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH,v14);
		v14;
		var v15 = this._createProjectNameNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.PROJECT_NAME,v15);
		v15;
		var v16 = this._createProjectVersionNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.PROJECT_VERSION,v16);
		v16;
		var v17 = this._createProjectNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.PROJECT,v17);
		v17;
		if(p_rootNodeType == tools_spark_framework_config_ENodeType.CLIENT) {
			var v18 = this._createSlicedClientNodeRule();
			this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.SLICED,v18);
			v18;
			var v19 = this._createClientNodeRule();
			this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.CLIENT,v19);
			v19;
		} else if(p_rootNodeType == tools_spark_framework_config_ENodeType.SERVER) {
			var v20 = this._createSlicedServerNodeRule();
			this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.SLICED,v20);
			v20;
			var v21 = this._createServerNodeRule();
			this._xmlNodeTypeToNodeRule.set(tools_spark_framework_config_ENodeType.SERVER,v21);
			v21;
		}
	}
	,validateConfigNode: function(p_configNode,p_nodeType) {
		if(this._xmlNodeTypeToNodeRule.get(p_nodeType) == null) {
			tools_spark_framework_Console.error("This Config Node Rule has not been created Yet!");
			return false;
		}
		try {
			haxe_xml_Check.checkNode(p_configNode,this._xmlNodeTypeToNodeRule.get(p_nodeType));
			return true;
		} catch( m ) {
			if( js_Boot.__instanceof(m,String) ) {
				tools_spark_framework_Console.error(m);
				return false;
			} else throw(m);
		}
	}
	,_createClientNodeRule: function() {
		var l_children = haxe_xml_Rule.RList([this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.PROJECT),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.SLICED),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.PATHS),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.ASSETS)],false);
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.CLIENT),[],l_children);
	}
	,_createServerNodeRule: function() {
		var l_children = haxe_xml_Rule.RList([this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.PROJECT),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.SLICED),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.PATHS),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.ASSETS)],false);
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.SERVER),[],l_children);
	}
	,_createProjectNodeRule: function() {
		var l_children = haxe_xml_Rule.RList([this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.PROJECT_NAME),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.PROJECT_VERSION),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH)],false);
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PROJECT),[],l_children);
	}
	,_createProjectNameNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PROJECT_NAME),[],l_children);
	}
	,_createProjectVersionNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PROJECT_VERSION),[],l_children);
	}
	,_createExecuteAtLaunchNodeRule: function() {
		var l_children = haxe_xml_Rule.RMulti(this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.EXECUTE_MODULE),true);
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH),[],l_children);
	}
	,_createExecuteModuleNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.EXECUTE_MODULE),[],l_children);
	}
	,_createSlicedClientNodeRule: function() {
		var l_children = haxe_xml_Rule.RList([this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.SOUND_SERVICE),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.LOGIC_SERVICE),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.INPUT_SERVICE),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.EVENT_SERVICE),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.DISPLAY_SERVICE)],false);
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.SLICED),[],l_children);
	}
	,_createSlicedServerNodeRule: function() {
		var l_children = haxe_xml_Rule.RList([this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.LOGIC_SERVICE),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE),this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.EVENT_SERVICE)],false);
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.SLICED),[],l_children);
	}
	,_createSoundServiceNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.SOUND_SERVICE),[],l_children);
	}
	,_createLogicServiceNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.LOGIC_SERVICE),[],l_children);
	}
	,_createInputServiceNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.INPUT_SERVICE),[],l_children);
	}
	,_createCommsServiceNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE),[],l_children);
	}
	,_createEventServiceNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.EVENT_SERVICE),[],l_children);
	}
	,_createDisplayServiceNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.DISPLAY_SERVICE),[],l_children);
	}
	,_createPathsNodeRule: function() {
		var l_children = haxe_xml_Rule.RMulti(this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.PATH),true);
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PATHS),[],l_children);
	}
	,_createPathNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		var l_attributes = [haxe_xml_Attrib.Att("location"),haxe_xml_Attrib.Att("type")];
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.PATH),l_attributes,l_children);
	}
	,_createAssetsNodeRule: function() {
		var l_children = haxe_xml_Rule.RMulti(this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.MODULE),true);
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.ASSETS),[],l_children);
	}
	,_createModuleNodeRule: function() {
		var l_children = haxe_xml_Rule.RList([haxe_xml_Rule.ROptional(this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.REQUIRES)),haxe_xml_Rule.RMulti(this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.ASSET),true)],false);
		var l_attributes = [haxe_xml_Attrib.Att("id"),haxe_xml_Attrib.Att("executeEntity",null,"none")];
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.MODULE),l_attributes,l_children);
	}
	,_createAssetNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		var l_attributes = [haxe_xml_Attrib.Att("location"),haxe_xml_Attrib.Att("type"),haxe_xml_Attrib.Att("bytes"),haxe_xml_Attrib.Att("subtype",null,"none"),haxe_xml_Attrib.Att("id",null,"useUrl"),haxe_xml_Attrib.Att("condition",null,"always"),haxe_xml_Attrib.Att("forceLoadAsData",null,"false")];
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.ASSET),l_attributes,l_children);
	}
	,_createRequiresNodeRule: function() {
		var l_children = haxe_xml_Rule.RMulti(this._xmlNodeTypeToNodeRule.get(tools_spark_framework_config_ENodeType.REQUIRES_MODULE),true);
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.REQUIRES),[],l_children);
	}
	,_createRequiresModuleNodeRule: function() {
		var l_children = haxe_xml_Rule.RData();
		return haxe_xml_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_framework_config_ENodeType.REQUIRES_MODULE),[],l_children);
	}
	,__class__: tools_spark_framework_config_ConfigValidator
};
var tools_spark_framework_config_ENodeType = $hxClasses["tools.spark.framework.config.ENodeType"] = { __ename__ : true, __constructs__ : ["CLIENT","SERVER","PROJECT","SLICED","PATHS","ASSETS","PROJECT_NAME","PROJECT_VERSION","EXECUTE_AT_LAUNCH","EXECUTE_MODULE","SOUND_SERVICE","LOGIC_SERVICE","INPUT_SERVICE","COMMUNICATIONS_SERVICE","EVENT_SERVICE","DISPLAY_SERVICE","PATH","MODULE","ASSET","REQUIRES","REQUIRES_MODULE"] };
tools_spark_framework_config_ENodeType.CLIENT = ["CLIENT",0];
tools_spark_framework_config_ENodeType.CLIENT.toString = $estr;
tools_spark_framework_config_ENodeType.CLIENT.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.SERVER = ["SERVER",1];
tools_spark_framework_config_ENodeType.SERVER.toString = $estr;
tools_spark_framework_config_ENodeType.SERVER.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.PROJECT = ["PROJECT",2];
tools_spark_framework_config_ENodeType.PROJECT.toString = $estr;
tools_spark_framework_config_ENodeType.PROJECT.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.SLICED = ["SLICED",3];
tools_spark_framework_config_ENodeType.SLICED.toString = $estr;
tools_spark_framework_config_ENodeType.SLICED.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.PATHS = ["PATHS",4];
tools_spark_framework_config_ENodeType.PATHS.toString = $estr;
tools_spark_framework_config_ENodeType.PATHS.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.ASSETS = ["ASSETS",5];
tools_spark_framework_config_ENodeType.ASSETS.toString = $estr;
tools_spark_framework_config_ENodeType.ASSETS.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.PROJECT_NAME = ["PROJECT_NAME",6];
tools_spark_framework_config_ENodeType.PROJECT_NAME.toString = $estr;
tools_spark_framework_config_ENodeType.PROJECT_NAME.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.PROJECT_VERSION = ["PROJECT_VERSION",7];
tools_spark_framework_config_ENodeType.PROJECT_VERSION.toString = $estr;
tools_spark_framework_config_ENodeType.PROJECT_VERSION.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH = ["EXECUTE_AT_LAUNCH",8];
tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH.toString = $estr;
tools_spark_framework_config_ENodeType.EXECUTE_AT_LAUNCH.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.EXECUTE_MODULE = ["EXECUTE_MODULE",9];
tools_spark_framework_config_ENodeType.EXECUTE_MODULE.toString = $estr;
tools_spark_framework_config_ENodeType.EXECUTE_MODULE.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.SOUND_SERVICE = ["SOUND_SERVICE",10];
tools_spark_framework_config_ENodeType.SOUND_SERVICE.toString = $estr;
tools_spark_framework_config_ENodeType.SOUND_SERVICE.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.LOGIC_SERVICE = ["LOGIC_SERVICE",11];
tools_spark_framework_config_ENodeType.LOGIC_SERVICE.toString = $estr;
tools_spark_framework_config_ENodeType.LOGIC_SERVICE.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.INPUT_SERVICE = ["INPUT_SERVICE",12];
tools_spark_framework_config_ENodeType.INPUT_SERVICE.toString = $estr;
tools_spark_framework_config_ENodeType.INPUT_SERVICE.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE = ["COMMUNICATIONS_SERVICE",13];
tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE.toString = $estr;
tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.EVENT_SERVICE = ["EVENT_SERVICE",14];
tools_spark_framework_config_ENodeType.EVENT_SERVICE.toString = $estr;
tools_spark_framework_config_ENodeType.EVENT_SERVICE.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.DISPLAY_SERVICE = ["DISPLAY_SERVICE",15];
tools_spark_framework_config_ENodeType.DISPLAY_SERVICE.toString = $estr;
tools_spark_framework_config_ENodeType.DISPLAY_SERVICE.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.PATH = ["PATH",16];
tools_spark_framework_config_ENodeType.PATH.toString = $estr;
tools_spark_framework_config_ENodeType.PATH.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.MODULE = ["MODULE",17];
tools_spark_framework_config_ENodeType.MODULE.toString = $estr;
tools_spark_framework_config_ENodeType.MODULE.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.ASSET = ["ASSET",18];
tools_spark_framework_config_ENodeType.ASSET.toString = $estr;
tools_spark_framework_config_ENodeType.ASSET.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.REQUIRES = ["REQUIRES",19];
tools_spark_framework_config_ENodeType.REQUIRES.toString = $estr;
tools_spark_framework_config_ENodeType.REQUIRES.__enum__ = tools_spark_framework_config_ENodeType;
tools_spark_framework_config_ENodeType.REQUIRES_MODULE = ["REQUIRES_MODULE",20];
tools_spark_framework_config_ENodeType.REQUIRES_MODULE.toString = $estr;
tools_spark_framework_config_ENodeType.REQUIRES_MODULE.__enum__ = tools_spark_framework_config_ENodeType;
var tools_spark_framework_space2_$5D_interfaces_IBase2_$5D = function() { };
$hxClasses["tools.spark.framework.space2_5D.interfaces.IBase2_5D"] = tools_spark_framework_space2_$5D_interfaces_IBase2_$5D;
tools_spark_framework_space2_$5D_interfaces_IBase2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_interfaces_IBase2_$5D.prototype = {
	__class__: tools_spark_framework_space2_$5D_interfaces_IBase2_$5D
};
var tools_spark_framework_space2_$5D_core_ABase2_$5D = function(p_gameEntity) {
	this.gameEntity = p_gameEntity;
};
$hxClasses["tools.spark.framework.space2_5D.core.ABase2_5D"] = tools_spark_framework_space2_$5D_core_ABase2_$5D;
tools_spark_framework_space2_$5D_core_ABase2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_core_ABase2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IBase2_$5D];
tools_spark_framework_space2_$5D_core_ABase2_$5D.prototype = {
	setPosSize: function(p_x,p_y,p_width,p_height,p_view) {
	}
	,__class__: tools_spark_framework_space2_$5D_core_ABase2_$5D
};
var tools_spark_framework_space2_$5D_interfaces_IObject2_$5D = function() { };
$hxClasses["tools.spark.framework.space2_5D.interfaces.IObject2_5D"] = tools_spark_framework_space2_$5D_interfaces_IObject2_$5D;
tools_spark_framework_space2_$5D_interfaces_IObject2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_interfaces_IObject2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IBase2_$5D];
var tools_spark_framework_space2_$5D_core_AObject2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_ABase2_$5D.call(this,p_gameEntity);
};
$hxClasses["tools.spark.framework.space2_5D.core.AObject2_5D"] = tools_spark_framework_space2_$5D_core_AObject2_$5D;
tools_spark_framework_space2_$5D_core_AObject2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_core_AObject2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IObject2_$5D];
tools_spark_framework_space2_$5D_core_AObject2_$5D.__super__ = tools_spark_framework_space2_$5D_core_ABase2_$5D;
tools_spark_framework_space2_$5D_core_AObject2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_ABase2_$5D.prototype,{
	__class__: tools_spark_framework_space2_$5D_core_AObject2_$5D
});
var tools_spark_framework_space2_$5D_interfaces_ICamera2_$5D = function() { };
$hxClasses["tools.spark.framework.space2_5D.interfaces.ICamera2_5D"] = tools_spark_framework_space2_$5D_interfaces_ICamera2_$5D;
tools_spark_framework_space2_$5D_interfaces_ICamera2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_interfaces_ICamera2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IObject2_$5D];
tools_spark_framework_space2_$5D_interfaces_ICamera2_$5D.prototype = {
	__class__: tools_spark_framework_space2_$5D_interfaces_ICamera2_$5D
};
var tools_spark_framework_space2_$5D_core_ACamera2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AObject2_$5D.call(this,p_gameEntity);
	this._initACamera2_5D();
};
$hxClasses["tools.spark.framework.space2_5D.core.ACamera2_5D"] = tools_spark_framework_space2_$5D_core_ACamera2_$5D;
tools_spark_framework_space2_$5D_core_ACamera2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_core_ACamera2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_ICamera2_$5D];
tools_spark_framework_space2_$5D_core_ACamera2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AObject2_$5D;
tools_spark_framework_space2_$5D_core_ACamera2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AObject2_$5D.prototype,{
	_initACamera2_5D: function() {
		this._attachedToViews = new haxe_ds_ObjectMap();
	}
	,attachToView: function(p_view2_5D) {
		this._attachedToViews.set(p_view2_5D,p_view2_5D);
		p_view2_5D;
		return null;
	}
	,__class__: tools_spark_framework_space2_$5D_core_ACamera2_$5D
});
var tools_spark_framework_dom2_$5D_DomCamera2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_ACamera2_$5D.call(this,p_gameEntity);
};
$hxClasses["tools.spark.framework.dom2_5D.DomCamera2_5D"] = tools_spark_framework_dom2_$5D_DomCamera2_$5D;
tools_spark_framework_dom2_$5D_DomCamera2_$5D.__name__ = true;
tools_spark_framework_dom2_$5D_DomCamera2_$5D.__super__ = tools_spark_framework_space2_$5D_core_ACamera2_$5D;
tools_spark_framework_dom2_$5D_DomCamera2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_ACamera2_$5D.prototype,{
	__class__: tools_spark_framework_dom2_$5D_DomCamera2_$5D
});
var tools_spark_framework_space2_$5D_interfaces_IObjectContainer2_$5D = function() { };
$hxClasses["tools.spark.framework.space2_5D.interfaces.IObjectContainer2_5D"] = tools_spark_framework_space2_$5D_interfaces_IObjectContainer2_$5D;
tools_spark_framework_space2_$5D_interfaces_IObjectContainer2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_interfaces_IObjectContainer2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IObject2_$5D];
var tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AObject2_$5D.call(this,p_gameEntity);
	this.children = new Array();
};
$hxClasses["tools.spark.framework.space2_5D.core.AObjectContainer2_5D"] = tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D;
tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IObjectContainer2_$5D];
tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AObject2_$5D;
tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AObject2_$5D.prototype,{
	addChild: function(p_entity2_5D) {
		this.children.push(p_entity2_5D);
	}
	,__class__: tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D
});
var tools_spark_framework_space2_$5D_interfaces_IInstantiable2_$5D = function() { };
$hxClasses["tools.spark.framework.space2_5D.interfaces.IInstantiable2_5D"] = tools_spark_framework_space2_$5D_interfaces_IInstantiable2_$5D;
tools_spark_framework_space2_$5D_interfaces_IInstantiable2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_interfaces_IInstantiable2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IObjectContainer2_$5D];
tools_spark_framework_space2_$5D_interfaces_IInstantiable2_$5D.prototype = {
	__class__: tools_spark_framework_space2_$5D_interfaces_IInstantiable2_$5D
};
var tools_spark_framework_space2_$5D_core_AInstantiable2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D.call(this,p_gameEntity);
	this._initInstantiable2_5D();
};
$hxClasses["tools.spark.framework.space2_5D.core.AInstantiable2_5D"] = tools_spark_framework_space2_$5D_core_AInstantiable2_$5D;
tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IInstantiable2_$5D];
tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D;
tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D.prototype,{
	_initInstantiable2_5D: function() {
		this._instances = new haxe_ds_ObjectMap();
		this._updateStateFunctions = new haxe_ds_StringMap();
		this.groupInstances = new haxe_ds_ObjectMap();
	}
	,_updateState: function(p_state,p_view2_5D) {
		this.updateState(p_state,p_view2_5D);
	}
	,updateState: function(p_state,p_view2_5D) {
		if(p_view2_5D == null) {
			var $it0 = this._instances.keys();
			while( $it0.hasNext() ) {
				var f_view = $it0.next();
				this._updateStateOfInstance(p_state,f_view);
			}
		} else this._updateStateOfInstance(p_state,p_view2_5D);
	}
	,_updateLayoutGroup: function(p_view2_5D) {
		if(p_view2_5D == null) {
			var $it0 = this.groupInstances.keys();
			while( $it0.hasNext() ) {
				var f_view = $it0.next();
				this.groupInstances.get(f_view).update();
			}
		} else this.groupInstances.get(p_view2_5D).update();
	}
	,_updateStateOfInstance: function(p_state,p_view2_5D) {
		if(this._updateStateFunctions.get(p_state) != null) (this._updateStateFunctions.get(p_state))(this.gameEntity.getState(p_state),p_view2_5D); else tools_spark_framework_Console.warn("State " + p_state + " does not have a function handler! Ignoring :(");
	}
	,_createChildrenOfInstance: function(p_view2_5D) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var f_childEntity = _g1[_g];
			++_g;
			this._createChildOfInstance(f_childEntity,p_view2_5D);
		}
	}
	,createInstance: function(p_view2_5D) {
		this._createChildrenOfInstance(p_view2_5D);
		return this._instances.get(p_view2_5D);
	}
	,_createChildOfInstance: function(p_childEntity,p_view2_5D) {
	}
	,update: function(p_view2_5D) {
	}
	,addChild: function(p_entity2_5D) {
		tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D.prototype.addChild.call(this,p_entity2_5D);
		var $it0 = this._instances.keys();
		while( $it0.hasNext() ) {
			var f_view = $it0.next();
			this._createChildOfInstance(p_entity2_5D,f_view);
			p_entity2_5D.update(f_view);
		}
	}
	,__class__: tools_spark_framework_space2_$5D_core_AInstantiable2_$5D
});
var tools_spark_framework_space2_$5D_interfaces_IEntity2_$5D = function() { };
$hxClasses["tools.spark.framework.space2_5D.interfaces.IEntity2_5D"] = tools_spark_framework_space2_$5D_interfaces_IEntity2_$5D;
tools_spark_framework_space2_$5D_interfaces_IEntity2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_interfaces_IEntity2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IInstantiable2_$5D];
var tools_spark_framework_space2_$5D_core_AEntity2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.call(this,p_gameEntity);
};
$hxClasses["tools.spark.framework.space2_5D.core.AEntity2_5D"] = tools_spark_framework_space2_$5D_core_AEntity2_$5D;
tools_spark_framework_space2_$5D_core_AEntity2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_core_AEntity2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IEntity2_$5D];
tools_spark_framework_space2_$5D_core_AEntity2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AInstantiable2_$5D;
tools_spark_framework_space2_$5D_core_AEntity2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.prototype,{
	createInstance: function(p_view2_5D) {
		if(this.gameEntity.getState("layoutable") == true) {
			var v = new tools_spark_framework_layout_containers_Group(this.gameEntity,"Entity",this);
			this.groupInstances.set(p_view2_5D,v);
			v;
		}
		return tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.prototype.createInstance.call(this,p_view2_5D);
	}
	,_createChildOfInstance: function(p_childEntity,p_view2_5D) {
		if(p_childEntity.gameEntity.getState("layoutable") == true) this.groupInstances.get(p_view2_5D).children.push(p_childEntity.groupInstances.get(p_view2_5D));
	}
	,__class__: tools_spark_framework_space2_$5D_core_AEntity2_$5D
});
var tools_spark_framework_dom2_$5D_DomEntity2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AEntity2_$5D.call(this,p_gameEntity);
	this._initDomEntity2_5D();
};
$hxClasses["tools.spark.framework.dom2_5D.DomEntity2_5D"] = tools_spark_framework_dom2_$5D_DomEntity2_$5D;
tools_spark_framework_dom2_$5D_DomEntity2_$5D.__name__ = true;
tools_spark_framework_dom2_$5D_DomEntity2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AEntity2_$5D;
tools_spark_framework_dom2_$5D_DomEntity2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AEntity2_$5D.prototype,{
	_initDomEntity2_5D: function() {
		var v = $bind(this,this._updateNCmeshType);
		this._updateStateFunctions.set("NCmeshType",v);
		v;
		var v1 = $bind(this,this._updateTouchable);
		this._updateStateFunctions.set("touchable",v1);
		v1;
		var v2 = $bind(this,this._updateNCstyleable);
		this._updateStateFunctions.set("NCstyleable",v2);
		v2;
		var v3 = $bind(this,this._updateVisibility);
		this._updateStateFunctions.set("visibility",v3);
		v3;
		var v4 = $bind(this,this._updateOpacity);
		this._updateStateFunctions.set("opacity",v4);
		v4;
		var v5 = $bind(this,this._updateDisplay);
		this._updateStateFunctions.set("display",v5);
		v5;
		var v6 = $bind(this,this._updateText);
		this._updateStateFunctions.set("text",v6);
		v6;
		var v7 = $bind(this,this._updateFontColor);
		this._updateStateFunctions.set("fontColor",v7);
		v7;
		var v8 = $bind(this,this._updateImageSrc);
		this._updateStateFunctions.set("src",v8);
		v8;
		var v9 = $bind(this,this._updateFontSize);
		this._updateStateFunctions.set("fontSize",v9);
		v9;
		var v10 = $bind(this,this._updateOverflow);
		this._updateStateFunctions.set("overflow",v10);
		v10;
		var v11 = $bind(this,this._updateWidth);
		this._updateStateFunctions.set("width",v11);
		v11;
		var v12 = $bind(this,this._updateHeight);
		this._updateStateFunctions.set("height",v12);
		v12;
	}
	,createInstance: function(p_view2_5D) {
		var _g = this.gameEntity.getState("NCmeshType");
		switch(_g) {
		case "Div":
			var v;
			var _this = js_Browser.get_document();
			v = _this.createElement("div");
			this._instances.set(p_view2_5D,v);
			v;
			break;
		case "Input":
			var v1;
			var _this1 = js_Browser.get_document();
			v1 = _this1.createElement("input");
			this._instances.set(p_view2_5D,v1);
			v1;
			this._instances.get(p_view2_5D).onchange = $bind(this,this._onChange);
			this._instances.get(p_view2_5D).style.outline = "0";
			break;
		case "Button":
			var v2;
			var _this2 = js_Browser.get_document();
			v2 = _this2.createElement("div");
			this._instances.set(p_view2_5D,v2);
			v2;
			this._instances.get(p_view2_5D).style.outline = "0";
			break;
		case "Image":
			var v3;
			var _this3 = js_Browser.get_document();
			v3 = _this3.createElement("img");
			this._instances.set(p_view2_5D,v3);
			v3;
			break;
		case "Ace":
			var v4;
			var _this4 = js_Browser.get_document();
			v4 = _this4.createElement("div");
			this._instances.set(p_view2_5D,v4);
			v4;
			break;
		case "Tree":
			var v5;
			var _this5 = js_Browser.get_document();
			v5 = _this5.createElement("div");
			this._instances.set(p_view2_5D,v5);
			v5;
			break;
		default:
			tools_spark_framework_Console.error("Unrecognised NCMeshType input. Creating a Div By Default.");
			var v6;
			var _this6 = js_Browser.get_document();
			v6 = _this6.createElement("div");
			this._instances.set(p_view2_5D,v6);
			v6;
		}
		this._instances.get(p_view2_5D).style.position = "absolute";
		return tools_spark_framework_space2_$5D_core_AEntity2_$5D.prototype.createInstance.call(this,p_view2_5D);
	}
	,_createChildOfInstance: function(p_childEntity,p_view2_5D) {
		this._instances.get(p_view2_5D).appendChild(js_Boot.__cast(p_childEntity.createInstance(p_view2_5D) , Element));
		tools_spark_framework_space2_$5D_core_AEntity2_$5D.prototype._createChildOfInstance.call(this,p_childEntity,p_view2_5D);
	}
	,update: function(p_view2_5D) {
		this._updateState("NCmeshType",p_view2_5D);
		if(this.gameEntity.getState("NCstyleable") == true) {
			this._updateState("NCstyleable",p_view2_5D);
			this._updateState("visibility",p_view2_5D);
			this._updateState("opacity",p_view2_5D);
			this._updateState("display",p_view2_5D);
			this._updateState("fontSize",p_view2_5D);
			this._updateState("fontColor",p_view2_5D);
			this._updateState("overflow",p_view2_5D);
		}
		this._updateState("touchable",p_view2_5D);
		if(this.gameEntity.getState("text") != null) this._updateState("text",p_view2_5D);
		if(this.gameEntity.getState("layoutable") == true) this._updateLayoutGroup(p_view2_5D);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var f_childEntity = _g1[_g];
			++_g;
			f_childEntity.update(p_view2_5D);
		}
	}
	,setPosSize: function(p_x,p_y,p_width,p_height,p_view) {
		var l_mesh = this._instances.get(p_view);
		if(l_mesh != null) {
			if(p_x != null) l_mesh.style.left = Std.string(p_x) + "px";
			if(p_y != null) l_mesh.style.top = Std.string(p_y) + "px";
			if(p_width != null) l_mesh.style.width = Std.string(p_width) + "px";
			if(p_height != null) l_mesh.style.height = Std.string(p_height) + "px";
		}
	}
	,_updateNCstyleable: function(p_NCstyleable,p_view2_5D) {
		if(this.gameEntity.getState("backgroundColor") != null && this.gameEntity.getState("backgroundColor") != "Undefined") this._instances.get(p_view2_5D).style.backgroundColor = this.gameEntity.getState("backgroundColor");
		if(this.gameEntity.getState("border") != null && this.gameEntity.getState("border") != "Undefined") this._instances.get(p_view2_5D).style.border = this.gameEntity.getState("border");
		if(this.gameEntity.getState("borderRadius") != null && this.gameEntity.getState("borderRadius") != "Undefined") this._instances.get(p_view2_5D).style.borderRadius = this.gameEntity.getState("borderRadius");
		if(this.gameEntity.getState("boxShadow") != null && this.gameEntity.getState("boxShadow") != "Undefined") this._instances.get(p_view2_5D).style.boxShadow = this.gameEntity.getState("boxShadow");
		if(this.gameEntity.getState("fontFamily") != null && this.gameEntity.getState("fontFamily") != "Undefined") this._instances.get(p_view2_5D).style.fontFamily = this.gameEntity.getState("fontFamily");
		if(this.gameEntity.getState("textAlign") != null && this.gameEntity.getState("textAlign") != "Undefined") this._instances.get(p_view2_5D).style.textAlign = this.gameEntity.getState("textAlign");
		if(this.gameEntity.getState("textVerticalAlign") != null && this.gameEntity.getState("textVerticalAlign") != "Undefined") {
			if(this.gameEntity.getState("textVerticalAlign") == "middle") this._instances.get(p_view2_5D).style.lineHeight = Std.string(this.gameEntity.getState("height")) + "px";
		}
		if(this.gameEntity.getState("textIndent") != null && this.gameEntity.getState("textIndent") != "Undefined") this._instances.get(p_view2_5D).style.textIndent = this.gameEntity.getState("textIndent");
		if(this.gameEntity.getState("cursor") != null && this.gameEntity.getState("cursor") != "Undefined") this._instances.get(p_view2_5D).style.cursor = this.gameEntity.getState("cursor");
		if(this.gameEntity.getState("white-space") != null && this.gameEntity.getState("white-space") != "Undefined") this._instances.get(p_view2_5D).style.whiteSpace = this.gameEntity.getState("white-space");
	}
	,_updateImageSrc: function(p_src,p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		if(p_src != "Undefined") {
			if(p_src.indexOf("assets/") == -1) {
				var l_asset = tools_spark_framework_Project.modules.get("DoNotLoad").assets.get(p_src);
				l_instance.src = tools_spark_framework_Project.getPath(l_asset.location,l_asset.type) + l_asset.url;
			} else l_instance.src = "../" + p_src;
		}
	}
	,_updateWidth: function(p_width,p_view2_5D) {
		if(this.gameEntity.getState("layoutable") == true) {
			this.groupInstances.get(p_view2_5D).updateState("width");
			tools_spark_sliced_core_Sliced.display.projectActiveSpaceReference.activeStageReference.layoutManager.validated = false;
		} else {
		}
	}
	,_updateHeight: function(p_height,p_view2_5D) {
		if(this.gameEntity.getState("layoutable") == true) {
			this.groupInstances.get(p_view2_5D).updateState("height");
			tools_spark_sliced_core_Sliced.display.projectActiveSpaceReference.activeStageReference.layoutManager.validated = false;
		} else {
		}
	}
	,_updateOverflow: function(p_overflow,p_view2_5D) {
		if(p_overflow != "Undefined") this._instances.get(p_view2_5D).style.overflow = p_overflow;
	}
	,_updateFontSize: function(p_fontSize,p_view2_5D) {
		if(p_fontSize != "Undefined") this._instances.get(p_view2_5D).style.fontSize = p_fontSize;
	}
	,_updateFontColor: function(p_fontColor,p_view2_5D) {
		if(p_fontColor != "Undefined") this._instances.get(p_view2_5D).style.color = p_fontColor;
	}
	,_updateVisibility: function(p_visibility,p_view2_5D) {
		this._instances.get(p_view2_5D).style.visibility = p_visibility;
	}
	,_updateOpacity: function(p_opacity,p_view2_5D) {
		this._instances.get(p_view2_5D).style.opacity = p_opacity;
	}
	,_updateDisplay: function(p_display,p_view2_5D) {
		this._instances.get(p_view2_5D).style.display = p_display;
	}
	,_updateText: function(p_text,p_view2_5D) {
		if(p_text != "Undefined") {
			var _g = this.gameEntity.getState("NCmeshType");
			switch(_g) {
			case "Div":
				this._instances.get(p_view2_5D).innerHTML = p_text;
				break;
			case "Input":
				this._instances.get(p_view2_5D).value = p_text;
				break;
			case "Button":
				this._instances.get(p_view2_5D).innerHTML = p_text;
				break;
			default:
			}
		}
	}
	,_updateNCmeshType: function(p_NCmeshType,p_view2_5D) {
		switch(p_NCmeshType) {
		case "Div":
			break;
		case "Button":
			this._updateButtonProperties(p_view2_5D);
			break;
		case "Input":
			this._updateInputProperties(p_view2_5D);
			break;
		case "Image":
			this._updateImageSrc(this.gameEntity.getState("src"),p_view2_5D);
			break;
		case "Ace":
			this._updateAceProperties(p_view2_5D);
			break;
		case "Tree":
			this._updateTreeProperties(p_view2_5D);
			break;
		case "Undefined":
			tools_spark_framework_Console.warn("Undefined NCmeshType value");
			break;
		default:
			tools_spark_framework_Console.warn("Unhandled NCmeshType value: " + p_NCmeshType);
		}
	}
	,_updateInputProperties: function(p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		if(this.gameEntity.getState("text") != null && this.gameEntity.getState("text") != "Undefined") l_instance.value = this.gameEntity.getState("text");
		if(this.gameEntity.getState("placeholder") != null && this.gameEntity.getState("placeholder") != "Undefined") l_instance.placeholder = this.gameEntity.getState("placeholder");
		if(this.gameEntity.getState("type") != null && this.gameEntity.getState("type") != "Undefined") l_instance.type = this.gameEntity.getState("type");
		if(this.gameEntity.getState("type") == "file") {
			if(this.gameEntity.getState("accept") != null && this.gameEntity.getState("accept") != "Undefined") l_instance.accept = this.gameEntity.getState("accept");
		}
	}
	,_updateButtonProperties: function(p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		if(this.gameEntity.getState("text") != null && this.gameEntity.getState("text") != "Undefined") l_instance.innerHTML = this.gameEntity.getState("text");
	}
	,_updateAceProperties: function(p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		l_instance.id = "editor";
		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/merbivore_soft");
		editor.getSession().setMode("ace/mode/xml");
		this.gameEntity.setState("aceObject",editor);
	}
	,_updateTreeProperties: function(p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		l_instance.id = "tree";
		var tree = $("#tree");
		l_instance.style.overflowX = "hidden";
		l_instance.style.overflowY = "scroll";
		this.gameEntity.setState("treeObject",tree);
	}
	,_updateTouchable: function(p_touchableFlag,p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		if(l_instance != null) {
			if(p_touchableFlag) l_instance.onclick = $bind(this,this._onPointerClick); else {
			}
		}
	}
	,_onPointerClick: function(p_pointerEvent) {
		tools_spark_sliced_core_Sliced.input.pointer.submitPointerEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT_CLICK,this.gameEntity);
	}
	,_onChange: function(p_changeEvent) {
		if(this.gameEntity.getState("type") == "file") {
			this.gameEntity.setState("files",p_changeEvent.target.files);
			tools_spark_sliced_core_Sliced.input.pointer.submitPointerEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT_CLICK,this.gameEntity);
		} else this.gameEntity.setState("text",p_changeEvent.target.value);
	}
	,__class__: tools_spark_framework_dom2_$5D_DomEntity2_$5D
});
var tools_spark_framework_space2_$5D_interfaces_IScene2_$5D = function() { };
$hxClasses["tools.spark.framework.space2_5D.interfaces.IScene2_5D"] = tools_spark_framework_space2_$5D_interfaces_IScene2_$5D;
tools_spark_framework_space2_$5D_interfaces_IScene2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_interfaces_IScene2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IInstantiable2_$5D];
var tools_spark_framework_space2_$5D_core_AScene2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.call(this,p_gameEntity);
};
$hxClasses["tools.spark.framework.space2_5D.core.AScene2_5D"] = tools_spark_framework_space2_$5D_core_AScene2_$5D;
tools_spark_framework_space2_$5D_core_AScene2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_core_AScene2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IScene2_$5D];
tools_spark_framework_space2_$5D_core_AScene2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AInstantiable2_$5D;
tools_spark_framework_space2_$5D_core_AScene2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.prototype,{
	createInstance: function(p_view2_5D) {
		return tools_spark_framework_space2_$5D_core_AInstantiable2_$5D.prototype.createInstance.call(this,p_view2_5D);
	}
	,_createChildOfInstance: function(p_childEntity,p_view2_5D) {
		if(p_childEntity.gameEntity.getState("layoutable") == true) p_view2_5D.group.children.push(p_childEntity.groupInstances.get(p_view2_5D));
	}
	,__class__: tools_spark_framework_space2_$5D_core_AScene2_$5D
});
var tools_spark_framework_dom2_$5D_DomScene2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AScene2_$5D.call(this,p_gameEntity);
	this._initDomScene2_5D();
};
$hxClasses["tools.spark.framework.dom2_5D.DomScene2_5D"] = tools_spark_framework_dom2_$5D_DomScene2_$5D;
tools_spark_framework_dom2_$5D_DomScene2_$5D.__name__ = true;
tools_spark_framework_dom2_$5D_DomScene2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AScene2_$5D;
tools_spark_framework_dom2_$5D_DomScene2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AScene2_$5D.prototype,{
	_initDomScene2_5D: function() {
	}
	,createInstance: function(p_view2_5D) {
		var v;
		var _this = js_Browser.get_document();
		v = _this.createElement("div");
		this._instances.set(p_view2_5D,v);
		v;
		this._instances.get(p_view2_5D).style.position = "absolute";
		return tools_spark_framework_space2_$5D_core_AScene2_$5D.prototype.createInstance.call(this,p_view2_5D);
	}
	,update: function(p_view2_5D) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var f_childEntity = _g1[_g];
			++_g;
			f_childEntity.update(p_view2_5D);
		}
	}
	,_createChildOfInstance: function(p_childEntity,p_view2_5D) {
		this._instances.get(p_view2_5D).appendChild(js_Boot.__cast(p_childEntity.createInstance(p_view2_5D) , Element));
		tools_spark_framework_space2_$5D_core_AScene2_$5D.prototype._createChildOfInstance.call(this,p_childEntity,p_view2_5D);
	}
	,__class__: tools_spark_framework_dom2_$5D_DomScene2_$5D
});
var tools_spark_framework_space2_$5D_interfaces_IView2_$5D = function() { };
$hxClasses["tools.spark.framework.space2_5D.interfaces.IView2_5D"] = tools_spark_framework_space2_$5D_interfaces_IView2_$5D;
tools_spark_framework_space2_$5D_interfaces_IView2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_interfaces_IView2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IBase2_$5D];
tools_spark_framework_space2_$5D_interfaces_IView2_$5D.prototype = {
	__class__: tools_spark_framework_space2_$5D_interfaces_IView2_$5D
};
var tools_spark_framework_space2_$5D_core_AView2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_ABase2_$5D.call(this,p_gameEntity);
	this.group = tools_spark_sliced_core_Sliced.display.projectActiveSpaceReference.activeStageReference.layoutManager.getViewGroupByGameEntity(this.gameEntity);
	this.group.layoutableInstance = this;
};
$hxClasses["tools.spark.framework.space2_5D.core.AView2_5D"] = tools_spark_framework_space2_$5D_core_AView2_$5D;
tools_spark_framework_space2_$5D_core_AView2_$5D.__name__ = true;
tools_spark_framework_space2_$5D_core_AView2_$5D.__interfaces__ = [tools_spark_framework_space2_$5D_interfaces_IView2_$5D];
tools_spark_framework_space2_$5D_core_AView2_$5D.__super__ = tools_spark_framework_space2_$5D_core_ABase2_$5D;
tools_spark_framework_space2_$5D_core_AView2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_ABase2_$5D.prototype,{
	render: function() {
	}
	,__class__: tools_spark_framework_space2_$5D_core_AView2_$5D
});
var tools_spark_framework_dom2_$5D_DomView2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AView2_$5D.call(this,p_gameEntity);
	this._initDomView2_5D();
};
$hxClasses["tools.spark.framework.dom2_5D.DomView2_5D"] = tools_spark_framework_dom2_$5D_DomView2_$5D;
tools_spark_framework_dom2_$5D_DomView2_$5D.__name__ = true;
tools_spark_framework_dom2_$5D_DomView2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AView2_$5D;
tools_spark_framework_dom2_$5D_DomView2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AView2_$5D.prototype,{
	updateState: function(p_state) {
		switch(p_state) {
		case "visible":
			if(this.gameEntity.getState(p_state) == true) this._instanceView.style.display = "inline"; else this._instanceView.style.display = "none";
			break;
		}
	}
	,_initDomView2_5D: function() {
		var content = js_Browser.get_document().getElementById("content");
		var _this = js_Browser.get_document();
		this._instanceView = _this.createElement("div");
		this._instanceView.style.position = "absolute";
		content.insertBefore(this._instanceView,content.firstElementChild);
	}
	,set_camera: function(p_value) {
		if(this.camera == p_value) return this.camera;
		if(p_value == null) {
			this.camera = null;
			this._updateCurrentView();
			return null;
		}
		this.camera = p_value;
		this.camera.attachToView(this);
		this._updateCurrentView();
		return this.camera;
	}
	,set_scene: function(p_value) {
		if(this.scene == p_value) return this.scene;
		if(p_value == null) {
			this.scene = null;
			this._disposeCurrentScene();
			this._updateCurrentView();
			return null;
		}
		this.scene = p_value;
		this._instanceScene = js_Boot.__cast(this.scene.createInstance(this) , HTMLDivElement);
		this._updateCurrentView();
		return this.scene;
	}
	,_updateCurrentView: function() {
		if(this.scene == null || this.camera == null) {
			if(this._instanceView.firstElementChild != null) this._instanceView.removeChild(this._instanceView.firstElementChild);
			return;
		}
		if(this._instanceView.firstElementChild == null) this._instanceView.appendChild(this._instanceScene);
		this.scene.update(this);
	}
	,_disposeCurrentScene: function() {
		this._instanceScene = null;
	}
	,setPosSize: function(p_x,p_y,p_width,p_height,p_view) {
		if(p_x != null) this._instanceView.style.left = Std.string(p_x) + "px";
		if(p_y != null) this._instanceView.style.top = Std.string(p_y) + "px";
		if(p_width != null) this._instanceView.style.width = Std.string(p_width) + "px";
		if(p_height != null) this._instanceView.style.height = Std.string(p_height) + "px";
	}
	,__class__: tools_spark_framework_dom2_$5D_DomView2_$5D
});
var tools_spark_framework_flambe2_$5D_FlambeCamera2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_ACamera2_$5D.call(this,p_gameEntity);
};
$hxClasses["tools.spark.framework.flambe2_5D.FlambeCamera2_5D"] = tools_spark_framework_flambe2_$5D_FlambeCamera2_$5D;
tools_spark_framework_flambe2_$5D_FlambeCamera2_$5D.__name__ = true;
tools_spark_framework_flambe2_$5D_FlambeCamera2_$5D.__super__ = tools_spark_framework_space2_$5D_core_ACamera2_$5D;
tools_spark_framework_flambe2_$5D_FlambeCamera2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_ACamera2_$5D.prototype,{
	__class__: tools_spark_framework_flambe2_$5D_FlambeCamera2_$5D
});
var tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AEntity2_$5D.call(this,p_gameEntity);
	this._initFlambeEntity2_5D();
};
$hxClasses["tools.spark.framework.flambe2_5D.FlambeEntity2_5D"] = tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D;
tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D.__name__ = true;
tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AEntity2_$5D;
tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AEntity2_$5D.prototype,{
	_initFlambeEntity2_5D: function() {
		this._instancesMesh = new haxe_ds_ObjectMap();
		var v = $bind(this,this._update2DMeshType);
		this._updateStateFunctions.set("2DmeshType",v);
		v;
		var v1 = $bind(this,this._updatePositionX);
		this._updateStateFunctions.set("spaceX",v1);
		v1;
		var v2 = $bind(this,this._updatePositionY);
		this._updateStateFunctions.set("spaceY",v2);
		v2;
		var v3 = $bind(this,this._updateSizeX);
		this._updateStateFunctions.set("scaleX",v3);
		v3;
		var v4 = $bind(this,this._updateSizeY);
		this._updateStateFunctions.set("scaleY",v4);
		v4;
		var v5 = $bind(this,this._updateTouchable);
		this._updateStateFunctions.set("touchable",v5);
		v5;
		var v6 = $bind(this,this._updateVisible);
		this._updateStateFunctions.set("visible",v6);
		v6;
		var v7 = $bind(this,this._updateOpacity);
		this._updateStateFunctions.set("opacity",v7);
		v7;
		var v8 = $bind(this,this._updateSpaceWidth);
		this._updateStateFunctions.set("spaceWidth",v8);
		v8;
		var v9 = $bind(this,this._updateSpaceHeight);
		this._updateStateFunctions.set("spaceHeight",v9);
		v9;
		var v10 = $bind(this,this._update2DMeshImageForm);
		this._updateStateFunctions.set("2DMeshImageForm",v10);
		v10;
		var v11 = $bind(this,this._update2DMeshSpriterForm);
		this._updateStateFunctions.set("2DMeshSpriterForm",v11);
		v11;
		var v12 = $bind(this,this._update2DMeshFillRectForm);
		this._updateStateFunctions.set("2DMeshFillRectForm",v12);
		v12;
		var v13 = $bind(this,this._update2DMeshSpriteForm);
		this._updateStateFunctions.set("2DMeshSpriteForm",v13);
		v13;
		var v14 = $bind(this,this._update2DMeshSpriterAnimForm);
		this._updateStateFunctions.set("2DMeshSpriterAnimForm",v14);
		v14;
	}
	,createInstance: function(p_view2_5D) {
		var v = new flambe_Entity();
		this._instances.set(p_view2_5D,v);
		v;
		return tools_spark_framework_space2_$5D_core_AEntity2_$5D.prototype.createInstance.call(this,p_view2_5D);
	}
	,_createChildOfInstance: function(p_childEntity,p_view2_5D) {
		this._instances.get(p_view2_5D).addChild(js_Boot.__cast(p_childEntity.createInstance(p_view2_5D) , flambe_Entity));
		tools_spark_framework_space2_$5D_core_AEntity2_$5D.prototype._createChildOfInstance.call(this,p_childEntity,p_view2_5D);
	}
	,update: function(p_view2_5D) {
		this._updateState("2DmeshType",p_view2_5D);
		if(this.gameEntity.getState("layoutable") == null || this.gameEntity.getState("layoutable") == false) {
			this._updateState("spaceX",p_view2_5D);
			this._updateState("spaceY",p_view2_5D);
		}
		this._updateState("scaleX",p_view2_5D);
		this._updateState("scaleY",p_view2_5D);
		this._updateState("touchable",p_view2_5D);
		this._updateState("visible",p_view2_5D);
		this._updateState("opacity",p_view2_5D);
		if(this.gameEntity.getState("layoutable") == true) this._updateLayoutGroup(p_view2_5D);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var f_childEntity = _g1[_g];
			++_g;
			f_childEntity.update(p_view2_5D);
		}
	}
	,_update2DMeshType: function(p_2DMeshType,p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		switch(p_2DMeshType) {
		case "Image":
			this._updateStateOfInstance("2DMeshImageForm",p_view2_5D);
			break;
		case "Spriter":
			this._updateStateOfInstance("2DMeshSpriterForm",p_view2_5D);
			break;
		case "FillRect":
			this._updateStateOfInstance("2DMeshFillRectForm",p_view2_5D);
			break;
		case "Sprite":
			this._updateStateOfInstance("2DMeshSpriteForm",p_view2_5D);
			break;
		case "Undefined":
			tools_spark_framework_Console.warn("Undefined 2DmeshType value");
			break;
		default:
			tools_spark_framework_Console.warn("Unhandled 2DmeshType value: " + p_2DMeshType);
		}
		this._updateBounds(p_view2_5D);
	}
	,_update2DMeshImageForm: function(p_2DMeshImageForm,p_view2_5D) {
		if(this.gameEntity.getState("2DmeshType") != "Image") return;
		if(p_2DMeshImageForm == "Undefined") return;
		var l_instance = this._instances.get(p_view2_5D);
		var l_mesh;
		if(this._instancesMesh.get(p_view2_5D) != null) l_mesh = js_Boot.__cast(this._instancesMesh.get(p_view2_5D) , flambe_display_ImageSprite); else l_mesh = null;
		if(l_mesh == null) {
			l_mesh = new flambe_display_ImageSprite(tools_spark_framework_Assets.getTexture(this.gameEntity.gameForm.getState(p_2DMeshImageForm)));
			l_mesh.blendMode = flambe_display_BlendMode.Copy;
			l_instance.add(l_mesh);
			this._instancesMesh.set(p_view2_5D,l_mesh);
			l_mesh;
		} else l_mesh.texture = tools_spark_framework_Assets.getTexture(this.gameEntity.gameForm.getState(p_2DMeshImageForm));
	}
	,_update2DMeshSpriterForm: function(p_2DMeshSpriterForm,p_view2_5D) {
		if(this.gameEntity.getState("2DmeshType") != "Spriter") return;
		if(p_2DMeshSpriterForm == "Undefined") return;
		var l_instance = this._instances.get(p_view2_5D);
		var l_mesh = this._instancesMesh.get(p_view2_5D);
		if(l_mesh == null) {
			l_mesh = new flambe_display_Sprite();
			var l_SpriterFormName = this.gameEntity.gameForm.getState(p_2DMeshSpriterForm);
			var l_spriterMovie = new spriter_flambe_SpriterMovie(tools_spark_framework_Assets.getAssetPackOf(l_SpriterFormName),l_SpriterFormName,null);
			l_mesh.blendMode = flambe_display_BlendMode.Copy;
			l_instance.add(l_mesh);
			l_instance.add(l_spriterMovie);
			this._instancesMesh.set(p_view2_5D,l_mesh);
			l_mesh;
		} else {
		}
		this._updateStateOfInstance("2DMeshSpriterAnimForm",p_view2_5D);
	}
	,_update2DMeshFillRectForm: function(p_2DMeshFillRectForm,p_view2_5D) {
		if(this.gameEntity.getState("2DmeshType") != "FillRect") return;
		if(p_2DMeshFillRectForm == "Undefined") return;
		var l_instance = this._instances.get(p_view2_5D);
		var l_mesh;
		if(this._instancesMesh.get(p_view2_5D) != null) l_mesh = js_Boot.__cast(this._instancesMesh.get(p_view2_5D) , flambe_display_FillSprite); else l_mesh = null;
		if(l_mesh == null) {
			l_mesh = new flambe_display_FillSprite(this.gameEntity.gameForm.getState(p_2DMeshFillRectForm),this.gameEntity.getState("spaceWidth"),this.gameEntity.getState("spaceHeight"));
			l_mesh.blendMode = flambe_display_BlendMode.Copy;
			l_instance.add(l_mesh);
			this._instancesMesh.set(p_view2_5D,l_mesh);
			l_mesh;
		} else {
		}
	}
	,_update2DMeshSpriteForm: function(p_2DMeshSpriteForm,p_view2_5D) {
		if(this.gameEntity.getState("2DmeshType") != "Sprite") return;
		if(p_2DMeshSpriteForm == "Undefined") return;
		var l_instance = this._instances.get(p_view2_5D);
		var l_mesh;
		if(this._instancesMesh.get(p_view2_5D) != null) l_mesh = js_Boot.__cast(this._instancesMesh.get(p_view2_5D) , flambe_display_Sprite); else l_mesh = null;
		if(l_mesh == null) {
			l_mesh = new flambe_display_Sprite();
			l_mesh.blendMode = flambe_display_BlendMode.Copy;
			l_instance.add(l_mesh);
			this._instancesMesh.set(p_view2_5D,l_mesh);
			l_mesh;
		} else {
		}
	}
	,_update2DMeshSpriterAnimForm: function(p_2DMeshSpriterAnimForm,p_view2_5D) {
		if(this.gameEntity.getState("2DmeshType") != "Spriter") return;
		if(this.gameEntity.getState("2DMeshSpriterForm") == "Undefined") return;
		if(p_2DMeshSpriterAnimForm == "Undefined") return;
		var l_instance = this._instances.get(p_view2_5D);
		var l_spriterMovie;
		var component = l_instance.getComponent("SpriterMovie_1");
		l_spriterMovie = component;
		if(l_spriterMovie != null) l_spriterMovie.playAnim(this.gameEntity.gameForm.getState(p_2DMeshSpriterAnimForm));
	}
	,_updatePositionX: function(p_newPos,p_view2_5D) {
		var l_mesh = this._instancesMesh.get(p_view2_5D);
		if(l_mesh != null) l_mesh.x.set__(p_newPos);
	}
	,_updatePositionY: function(p_newPos,p_view2_5D) {
		var l_mesh = this._instancesMesh.get(p_view2_5D);
		if(l_mesh != null) l_mesh.y.set__(p_newPos);
	}
	,_updateSizeX: function(p_newScale,p_view2_5D) {
		var l_mesh = this._instancesMesh.get(p_view2_5D);
		if(l_mesh != null) l_mesh.scaleX.set__(p_newScale);
	}
	,_updateSizeY: function(p_newScale,p_view2_5D) {
		var l_mesh = this._instancesMesh.get(p_view2_5D);
		if(l_mesh != null) l_mesh.scaleY.set__(p_newScale);
	}
	,_updateVisible: function(p_visibleFlag,p_view2_5D) {
		var l_mesh = this._instancesMesh.get(p_view2_5D);
		if(l_mesh != null) l_mesh.set_visible(p_visibleFlag);
	}
	,_updateOpacity: function(p_opacity,p_view2_5D) {
		var l_mesh = this._instancesMesh.get(p_view2_5D);
		if(l_mesh != null) l_mesh.setAlpha(p_opacity);
	}
	,_updateTouchable: function(p_touchableFlag,p_view2_5D) {
		var l_mesh = this._instancesMesh.get(p_view2_5D);
		if(l_mesh != null) {
			if(p_touchableFlag) {
				l_mesh.set_pointerEnabled(true);
				if(!l_mesh.get_pointerIn().hasListeners()) l_mesh.get_pointerIn().connect($bind(this,this._onPointerIn));
				if(!l_mesh.get_pointerMove().hasListeners()) l_mesh.get_pointerMove().connect($bind(this,this._onPointerMove));
				if(!l_mesh.get_pointerOut().hasListeners()) l_mesh.get_pointerOut().connect($bind(this,this._onPointerOut));
				if(!l_mesh.get_pointerDown().hasListeners()) l_mesh.get_pointerDown().connect($bind(this,this._onPointerDown));
			} else {
			}
		}
	}
	,_onPointerIn: function(p_pointerEvent) {
		tools_spark_sliced_core_Sliced.input.pointer.submitPointerEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_ENTERED,this.gameEntity);
	}
	,_onPointerMove: function(p_pointerEvent) {
		tools_spark_sliced_core_Sliced.input.pointer.submitPointerEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_MOVED,this.gameEntity);
	}
	,_onPointerOut: function(p_pointerEvent) {
		tools_spark_sliced_core_Sliced.input.pointer.submitPointerEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT,this.gameEntity);
	}
	,_onPointerDown: function(p_pointerEvent) {
		tools_spark_sliced_core_Sliced.input.pointer.submitPointerEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT_CLICK,this.gameEntity);
	}
	,setPosSize: function(p_x,p_y,p_width,p_height,p_view) {
		var l_mesh = this._instancesMesh.get(p_view);
		if(l_mesh != null) {
			if(p_x != null) l_mesh.x.set__(p_x);
			if(p_y != null) l_mesh.y.set__(p_y);
		}
		var l_instance = this._instances.get(p_view);
		var l_fillSprite = Std.instance(l_instance.getComponent("Sprite_2"),flambe_display_FillSprite);
		if(l_fillSprite != null) l_fillSprite.setSize(p_width,p_height);
	}
	,_updateSpaceWidth: function(p_spaceWidth,p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		var l_fillSprite = Std.instance(l_instance.getComponent("Sprite_2"),flambe_display_FillSprite);
		if(l_fillSprite != null) l_fillSprite.width.set__(p_spaceWidth);
	}
	,_updateSpaceHeight: function(p_spaceHeight,p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		var l_fillSprite = Std.instance(l_instance.getComponent("Sprite_2"),flambe_display_FillSprite);
		if(l_fillSprite != null) l_fillSprite.height.set__(p_spaceHeight);
	}
	,_updateBounds: function(p_view2_5D) {
		var l_instance = this._instances.get(p_view2_5D);
		if(l_instance != null) this.gameEntity.setState("boundsRect",flambe_display_Sprite.getBounds(l_instance));
	}
	,__class__: tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D
});
var tools_spark_framework_flambe2_$5D_FlambeScene2_$5D = function(p_gameEntity) {
	tools_spark_framework_space2_$5D_core_AScene2_$5D.call(this,p_gameEntity);
	this._initFlambeScene2_5D();
};
$hxClasses["tools.spark.framework.flambe2_5D.FlambeScene2_5D"] = tools_spark_framework_flambe2_$5D_FlambeScene2_$5D;
tools_spark_framework_flambe2_$5D_FlambeScene2_$5D.__name__ = true;
tools_spark_framework_flambe2_$5D_FlambeScene2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AScene2_$5D;
tools_spark_framework_flambe2_$5D_FlambeScene2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AScene2_$5D.prototype,{
	_initFlambeScene2_5D: function() {
	}
	,createInstance: function(p_view2_5D) {
		var v = new flambe_Entity();
		this._instances.set(p_view2_5D,v);
		v;
		return tools_spark_framework_space2_$5D_core_AScene2_$5D.prototype.createInstance.call(this,p_view2_5D);
	}
	,update: function(p_view2_5D) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var f_childEntity = _g1[_g];
			++_g;
			f_childEntity.update(p_view2_5D);
		}
	}
	,_createChildOfInstance: function(p_childEntity,p_view2_5D) {
		this._instances.get(p_view2_5D).addChild(js_Boot.__cast(p_childEntity.createInstance(p_view2_5D) , flambe_Entity));
		tools_spark_framework_space2_$5D_core_AScene2_$5D.prototype._createChildOfInstance.call(this,p_childEntity,p_view2_5D);
	}
	,__class__: tools_spark_framework_flambe2_$5D_FlambeScene2_$5D
});
var tools_spark_framework_flambe2_$5D_FlambeView2_$5D = function(p_gameEntity,p_flambeGraphics) {
	tools_spark_framework_space2_$5D_core_AView2_$5D.call(this,p_gameEntity);
	this._flambeGraphics = p_flambeGraphics;
	this._initFlambeView2_5D();
};
$hxClasses["tools.spark.framework.flambe2_5D.FlambeView2_5D"] = tools_spark_framework_flambe2_$5D_FlambeView2_$5D;
tools_spark_framework_flambe2_$5D_FlambeView2_$5D.__name__ = true;
tools_spark_framework_flambe2_$5D_FlambeView2_$5D.__super__ = tools_spark_framework_space2_$5D_core_AView2_$5D;
tools_spark_framework_flambe2_$5D_FlambeView2_$5D.prototype = $extend(tools_spark_framework_space2_$5D_core_AView2_$5D.prototype,{
	_initFlambeView2_5D: function() {
		this._instanceView = new flambe_Entity();
		var l_viewSprite = new flambe_display_Sprite();
		l_viewSprite.blendMode = flambe_display_BlendMode.Copy;
		this._instanceView.add(l_viewSprite);
		flambe_System.root.addChild(this._instanceView);
	}
	,render: function() {
		flambe_display_Sprite.render(this._instanceView,this._flambeGraphics);
	}
	,set_camera: function(p_value) {
		if(this.camera == p_value) return this.camera;
		if(p_value == null) {
			this.camera = null;
			this._updateCurrentView();
			return null;
		}
		this.camera = p_value;
		this.camera.attachToView(this);
		this._updateCurrentView();
		return this.camera;
	}
	,set_scene: function(p_value) {
		if(this.scene == p_value) return this.scene;
		if(p_value == null) {
			this.scene = null;
			this._disposeCurrentScene();
			this._updateCurrentView();
			return null;
		}
		if(this.scene != null) {
			this.scene = null;
			this._disposeCurrentScene();
		}
		this.scene = p_value;
		this._instanceScene = js_Boot.__cast(this.scene.createInstance(this) , flambe_Entity);
		this._updateCurrentView();
		return this.scene;
	}
	,_updateCurrentView: function() {
		if(this.scene == null || this.camera == null) {
			if(this._instanceView.firstChild != null) this._instanceView.removeChild(this._instanceView.firstChild);
			return;
		}
		if(this._instanceView.firstChild == null) this._instanceView.addChild(this._instanceScene);
		this.scene.update(this);
	}
	,_disposeCurrentScene: function() {
		this._instanceScene = null;
		this._instanceView.disposeChildren();
	}
	,setPosSize: function(p_x,p_y,p_width,p_height,p_view) {
		var l_viewSprite;
		var component = this._instanceView.getComponent("Sprite_2");
		l_viewSprite = component;
		if(p_x != null) l_viewSprite.x.set__(p_x);
		if(p_y != null) l_viewSprite.y.set__(p_y);
	}
	,__class__: tools_spark_framework_flambe2_$5D_FlambeView2_$5D
});
var tools_spark_framework_haxe_Filter = $hxClasses["tools.spark.framework.haxe.Filter"] = { __ename__ : true, __constructs__ : ["FInt","FBool","FEnum","FReg"] };
tools_spark_framework_haxe_Filter.FInt = ["FInt",0];
tools_spark_framework_haxe_Filter.FInt.toString = $estr;
tools_spark_framework_haxe_Filter.FInt.__enum__ = tools_spark_framework_haxe_Filter;
tools_spark_framework_haxe_Filter.FBool = ["FBool",1];
tools_spark_framework_haxe_Filter.FBool.toString = $estr;
tools_spark_framework_haxe_Filter.FBool.__enum__ = tools_spark_framework_haxe_Filter;
tools_spark_framework_haxe_Filter.FEnum = function(values) { var $x = ["FEnum",2,values]; $x.__enum__ = tools_spark_framework_haxe_Filter; $x.toString = $estr; return $x; };
tools_spark_framework_haxe_Filter.FReg = function(matcher) { var $x = ["FReg",3,matcher]; $x.__enum__ = tools_spark_framework_haxe_Filter; $x.toString = $estr; return $x; };
var tools_spark_framework_haxe_Attrib = $hxClasses["tools.spark.framework.haxe.Attrib"] = { __ename__ : true, __constructs__ : ["Att"] };
tools_spark_framework_haxe_Attrib.Att = function(name,filter,defvalue) { var $x = ["Att",0,name,filter,defvalue]; $x.__enum__ = tools_spark_framework_haxe_Attrib; $x.toString = $estr; return $x; };
var tools_spark_framework_haxe_Rule = $hxClasses["tools.spark.framework.haxe.Rule"] = { __ename__ : true, __constructs__ : ["RNode","RData","RMulti","RList","RChoice","ROptional"] };
tools_spark_framework_haxe_Rule.RNode = function(name,attribs,childs) { var $x = ["RNode",0,name,attribs,childs]; $x.__enum__ = tools_spark_framework_haxe_Rule; $x.toString = $estr; return $x; };
tools_spark_framework_haxe_Rule.RData = function(filter) { var $x = ["RData",1,filter]; $x.__enum__ = tools_spark_framework_haxe_Rule; $x.toString = $estr; return $x; };
tools_spark_framework_haxe_Rule.RMulti = function(rule,atLeastOne) { var $x = ["RMulti",2,rule,atLeastOne]; $x.__enum__ = tools_spark_framework_haxe_Rule; $x.toString = $estr; return $x; };
tools_spark_framework_haxe_Rule.RList = function(rules,ordered) { var $x = ["RList",3,rules,ordered]; $x.__enum__ = tools_spark_framework_haxe_Rule; $x.toString = $estr; return $x; };
tools_spark_framework_haxe_Rule.RChoice = function(choices) { var $x = ["RChoice",4,choices]; $x.__enum__ = tools_spark_framework_haxe_Rule; $x.toString = $estr; return $x; };
tools_spark_framework_haxe_Rule.ROptional = function(rule) { var $x = ["ROptional",5,rule]; $x.__enum__ = tools_spark_framework_haxe_Rule; $x.toString = $estr; return $x; };
var tools_spark_framework_haxe__$LooseCheck_CheckResult = $hxClasses["tools.spark.framework.haxe._LooseCheck.CheckResult"] = { __ename__ : true, __constructs__ : ["CMatch","CMissing","CExtra","CElementExpected","CDataExpected","CExtraAttrib","CMissingAttrib","CInvalidAttrib","CInvalidData","CInElement"] };
tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch = ["CMatch",0];
tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch.toString = $estr;
tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult;
tools_spark_framework_haxe__$LooseCheck_CheckResult.CMissing = function(r) { var $x = ["CMissing",1,r]; $x.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult; $x.toString = $estr; return $x; };
tools_spark_framework_haxe__$LooseCheck_CheckResult.CExtra = function(x) { var $x = ["CExtra",2,x]; $x.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult; $x.toString = $estr; return $x; };
tools_spark_framework_haxe__$LooseCheck_CheckResult.CElementExpected = function(name,x) { var $x = ["CElementExpected",3,name,x]; $x.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult; $x.toString = $estr; return $x; };
tools_spark_framework_haxe__$LooseCheck_CheckResult.CDataExpected = function(x) { var $x = ["CDataExpected",4,x]; $x.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult; $x.toString = $estr; return $x; };
tools_spark_framework_haxe__$LooseCheck_CheckResult.CExtraAttrib = function(att,x) { var $x = ["CExtraAttrib",5,att,x]; $x.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult; $x.toString = $estr; return $x; };
tools_spark_framework_haxe__$LooseCheck_CheckResult.CMissingAttrib = function(att,x) { var $x = ["CMissingAttrib",6,att,x]; $x.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult; $x.toString = $estr; return $x; };
tools_spark_framework_haxe__$LooseCheck_CheckResult.CInvalidAttrib = function(att,x,f) { var $x = ["CInvalidAttrib",7,att,x,f]; $x.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult; $x.toString = $estr; return $x; };
tools_spark_framework_haxe__$LooseCheck_CheckResult.CInvalidData = function(x,f) { var $x = ["CInvalidData",8,x,f]; $x.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult; $x.toString = $estr; return $x; };
tools_spark_framework_haxe__$LooseCheck_CheckResult.CInElement = function(x,r) { var $x = ["CInElement",9,x,r]; $x.__enum__ = tools_spark_framework_haxe__$LooseCheck_CheckResult; $x.toString = $estr; return $x; };
var tools_spark_framework_haxe_LooseCheck = function() { };
$hxClasses["tools.spark.framework.haxe.LooseCheck"] = tools_spark_framework_haxe_LooseCheck;
tools_spark_framework_haxe_LooseCheck.__name__ = true;
tools_spark_framework_haxe_LooseCheck.isBlank = function(x) {
	return x.nodeType == Xml.PCData && tools_spark_framework_haxe_LooseCheck.blanks.match(x.get_nodeValue()) || x.nodeType == Xml.Comment;
};
tools_spark_framework_haxe_LooseCheck.filterMatch = function(s,f) {
	switch(Type.enumIndex(f)) {
	case 0:
		return tools_spark_framework_haxe_LooseCheck.filterMatch(s,tools_spark_framework_haxe_Filter.FReg(new EReg("[0-9]+","")));
	case 1:
		return tools_spark_framework_haxe_LooseCheck.filterMatch(s,tools_spark_framework_haxe_Filter.FEnum(["true","false","0","1"]));
	case 2:
		var values = f[2];
		var _g = 0;
		while(_g < values.length) {
			var v = values[_g];
			++_g;
			if(s == v) return true;
		}
		return false;
	case 3:
		var r = f[2];
		return r.match(s);
	}
};
tools_spark_framework_haxe_LooseCheck.isNullable = function(r) {
	switch(Type.enumIndex(r)) {
	case 2:
		var one = r[3];
		var r1 = r[2];
		return one != true || tools_spark_framework_haxe_LooseCheck.isNullable(r1);
	case 3:
		var rl = r[2];
		var _g = 0;
		while(_g < rl.length) {
			var r2 = rl[_g];
			++_g;
			if(!tools_spark_framework_haxe_LooseCheck.isNullable(r2)) return false;
		}
		return true;
	case 4:
		var rl1 = r[2];
		var _g1 = 0;
		while(_g1 < rl1.length) {
			var r3 = rl1[_g1];
			++_g1;
			if(tools_spark_framework_haxe_LooseCheck.isNullable(r3)) return true;
		}
		return false;
	case 1:
		return false;
	case 0:
		return false;
	case 5:
		return true;
	}
};
tools_spark_framework_haxe_LooseCheck.check = function(x,r) {
	switch(Type.enumIndex(r)) {
	case 0:
		var childs = r[4];
		var attribs = r[3];
		var name = r[2];
		if(x.nodeType != Xml.Element || x.get_nodeName() != name) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CElementExpected(name,x);
		if(attribs != null) {
			var attribs1 = attribs.slice();
			var $it0 = x.attributes();
			while( $it0.hasNext() ) {
				var xatt = $it0.next();
				var found = false;
				var _g = 0;
				while(_g < attribs1.length) {
					var att = attribs1[_g];
					++_g;
					{
						var filter = att[3];
						var name1 = att[2];
						if(xatt != name1) continue;
						if(filter != null && !tools_spark_framework_haxe_LooseCheck.filterMatch(x.get(xatt),filter)) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CInvalidAttrib(name1,x,filter);
						HxOverrides.remove(attribs1,att);
						found = true;
					}
				}
				if(!found) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CExtraAttrib(xatt,x);
			}
			var _g1 = 0;
			while(_g1 < attribs1.length) {
				var att1 = attribs1[_g1];
				++_g1;
				{
					var defvalue = att1[4];
					var name2 = att1[2];
					if(defvalue == null) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMissingAttrib(name2,x);
				}
			}
		}
		if(childs != null) {
			var m = tools_spark_framework_haxe_LooseCheck.checkList(x.iterator(),childs);
			if(m != tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CInElement(x,m);
		}
		if(attribs != null) {
			var _g2 = 0;
			while(_g2 < attribs.length) {
				var att2 = attribs[_g2];
				++_g2;
				{
					var defvalue1 = att2[4];
					var name3 = att2[2];
					x.set(name3,defvalue1);
				}
			}
		}
		return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch;
	case 1:
		var filter1 = r[2];
		if(x.nodeType != Xml.PCData && x.nodeType != Xml.CData) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CDataExpected(x);
		if(filter1 != null && !tools_spark_framework_haxe_LooseCheck.filterMatch(x.get_nodeValue(),filter1)) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CInvalidData(x,filter1);
		return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch;
	case 4:
		var choices = r[2];
		if(choices.length == 0) throw "No choice possible";
		var _g3 = 0;
		while(_g3 < choices.length) {
			var c = choices[_g3];
			++_g3;
			if(tools_spark_framework_haxe_LooseCheck.check(x,c) == tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch;
		}
		return tools_spark_framework_haxe_LooseCheck.check(x,choices[0]);
	case 5:
		var r1 = r[2];
		return tools_spark_framework_haxe_LooseCheck.check(x,r1);
	default:
		throw "Unexpected " + Std.string(r);
	}
};
tools_spark_framework_haxe_LooseCheck.checkList = function(it,r) {
	switch(Type.enumIndex(r)) {
	case 3:
		var ordered = r[3];
		var rules = r[2];
		var rules1 = rules.slice();
		while( it.hasNext() ) {
			var x = it.next();
			if(tools_spark_framework_haxe_LooseCheck.isBlank(x)) continue;
			var found = false;
			var _g = 0;
			while(_g < rules1.length) {
				var r1 = rules1[_g];
				++_g;
				var m = tools_spark_framework_haxe_LooseCheck.checkList(HxOverrides.iter([x]),r1);
				if(m == tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch) {
					found = true;
					switch(Type.enumIndex(r1)) {
					case 2:
						var one = r1[3];
						var rsub = r1[2];
						if(one) {
							var i;
							var _g2 = 0;
							var _g1 = rules1.length;
							while(_g2 < _g1) {
								var i1 = _g2++;
								if(rules1[i1] == r1) rules1[i1] = tools_spark_framework_haxe_Rule.RMulti(rsub);
							}
						}
						break;
					default:
						HxOverrides.remove(rules1,r1);
					}
					break;
				} else if(ordered && !tools_spark_framework_haxe_LooseCheck.isNullable(r1)) return m;
			}
			if(!found) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CExtra(x);
		}
		var _g3 = 0;
		while(_g3 < rules1.length) {
			var r2 = rules1[_g3];
			++_g3;
			if(!tools_spark_framework_haxe_LooseCheck.isNullable(r2)) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMissing(r2);
		}
		return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch;
	case 2:
		var one1 = r[3];
		var r3 = r[2];
		var found1 = false;
		while( it.hasNext() ) {
			var x1 = it.next();
			if(tools_spark_framework_haxe_LooseCheck.isBlank(x1)) continue;
			var m1 = tools_spark_framework_haxe_LooseCheck.checkList(HxOverrides.iter([x1]),r3);
			if(m1 != tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch) return m1;
			found1 = true;
		}
		if(one1 && !found1) return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMissing(r3);
		return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch;
	default:
		var found2 = false;
		while( it.hasNext() ) {
			var x2 = it.next();
			if(tools_spark_framework_haxe_LooseCheck.isBlank(x2)) continue;
			var m2 = tools_spark_framework_haxe_LooseCheck.check(x2,r);
			if(m2 != tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch) return m2;
			found2 = true;
			break;
		}
		if(!found2) switch(Type.enumIndex(r)) {
		case 5:
			break;
		default:
			return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMissing(r);
		}
		while( it.hasNext() ) {
			var x3 = it.next();
			if(tools_spark_framework_haxe_LooseCheck.isBlank(x3)) continue;
			return tools_spark_framework_haxe__$LooseCheck_CheckResult.CExtra(x3);
		}
		return tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch;
	}
};
tools_spark_framework_haxe_LooseCheck.makeWhere = function(path) {
	if(path.length == 0) return "";
	var s = "In ";
	var first = true;
	var _g = 0;
	while(_g < path.length) {
		var x = path[_g];
		++_g;
		if(first) first = false; else s += ".";
		s += x.get_nodeName();
	}
	return s + ": ";
};
tools_spark_framework_haxe_LooseCheck.makeString = function(x) {
	if(x.nodeType == Xml.Element) return "element " + x.get_nodeName();
	var s = x.get_nodeValue().split("\r").join("\\r").split("\n").join("\\n").split("\t").join("\\t");
	if(s.length > 20) return HxOverrides.substr(s,0,17) + "...";
	return s;
};
tools_spark_framework_haxe_LooseCheck.makeRule = function(r) {
	switch(Type.enumIndex(r)) {
	case 0:
		var name = r[2];
		return "element " + name;
	case 1:
		return "data";
	case 2:
		var r1 = r[2];
		return tools_spark_framework_haxe_LooseCheck.makeRule(r1);
	case 3:
		var rules = r[2];
		return tools_spark_framework_haxe_LooseCheck.makeRule(rules[0]);
	case 4:
		var choices = r[2];
		return tools_spark_framework_haxe_LooseCheck.makeRule(choices[0]);
	case 5:
		var r2 = r[2];
		return tools_spark_framework_haxe_LooseCheck.makeRule(r2);
	}
};
tools_spark_framework_haxe_LooseCheck.makeError = function(m,path) {
	if(path == null) path = new Array();
	switch(Type.enumIndex(m)) {
	case 0:
		throw "assert";
		break;
	case 1:
		var r = m[2];
		return tools_spark_framework_haxe_LooseCheck.makeWhere(path) + "Missing " + tools_spark_framework_haxe_LooseCheck.makeRule(r);
	case 2:
		var x = m[2];
		return tools_spark_framework_haxe_LooseCheck.makeWhere(path) + "Unexpected " + tools_spark_framework_haxe_LooseCheck.makeString(x);
	case 3:
		var x1 = m[3];
		var name = m[2];
		return tools_spark_framework_haxe_LooseCheck.makeWhere(path) + tools_spark_framework_haxe_LooseCheck.makeString(x1) + " while expected element " + name;
	case 4:
		var x2 = m[2];
		return tools_spark_framework_haxe_LooseCheck.makeWhere(path) + tools_spark_framework_haxe_LooseCheck.makeString(x2) + " while data expected";
	case 5:
		var x3 = m[3];
		var att = m[2];
		path.push(x3);
		return tools_spark_framework_haxe_LooseCheck.makeWhere(path) + "unexpected attribute " + att;
	case 6:
		var x4 = m[3];
		var att1 = m[2];
		path.push(x4);
		return tools_spark_framework_haxe_LooseCheck.makeWhere(path) + "missing required attribute " + att1;
	case 7:
		var x5 = m[3];
		var att2 = m[2];
		path.push(x5);
		return tools_spark_framework_haxe_LooseCheck.makeWhere(path) + "invalid attribute value for " + att2;
	case 8:
		var x6 = m[2];
		return tools_spark_framework_haxe_LooseCheck.makeWhere(path) + "invalid data format for " + tools_spark_framework_haxe_LooseCheck.makeString(x6);
	case 9:
		var m1 = m[3];
		var x7 = m[2];
		path.push(x7);
		return tools_spark_framework_haxe_LooseCheck.makeError(m1,path);
	}
};
tools_spark_framework_haxe_LooseCheck.checkNode = function(x,r) {
	var m = tools_spark_framework_haxe_LooseCheck.checkList(HxOverrides.iter([x]),r);
	if(m == tools_spark_framework_haxe__$LooseCheck_CheckResult.CMatch) return;
	throw tools_spark_framework_haxe_LooseCheck.makeError(m);
};
var tools_spark_framework_layout_containers_Group = function(p_layoutableEntity,p_layoutableInstanceType,p_layoutableInstance) {
	this.layoutableEntity = p_layoutableEntity;
	this.layoutableInstanceType = p_layoutableInstanceType;
	this.layoutableInstance = p_layoutableInstance;
	this._init();
};
$hxClasses["tools.spark.framework.layout.containers.Group"] = tools_spark_framework_layout_containers_Group;
tools_spark_framework_layout_containers_Group.__name__ = true;
tools_spark_framework_layout_containers_Group.prototype = {
	_init: function() {
		this.children = new Array();
		this.x = this.y = this.width = this.height = 0;
	}
	,update: function() {
		this.updateState("layout");
		this.updateState("includeInLayout");
		this.updateState("x");
		this.updateState("y");
		this.updateState("width");
		this.updateState("height");
		this.updateState("left");
		this.updateState("top");
		this.updateState("right");
		this.updateState("bottom");
		this.updateState("horizontalCenter");
		this.updateState("verticalCenter");
		if(this.layout != null) {
			if(this.layout.layoutType != "Basic") {
				this.updateState("paddingLeft");
				this.updateState("paddingRight");
				this.updateState("paddingTop");
				this.updateState("paddingBottom");
				this.updateState("gap");
				this.updateState("horizontalAlign");
				this.updateState("verticalAlign");
				if(this.layout.layoutType == "Horizontal") {
					this.updateState("columnWidth");
					this.updateState("requestedColumnCount");
					this.updateState("requestedMaxColumnCount");
					this.updateState("requestedMinColumnCount");
					this.updateState("variableColumnWidth");
				} else if(this.layout.layoutType == "Vertical") {
					this.updateState("rowHeight");
					this.updateState("requestedRowCount");
					this.updateState("requestedMaxRowCount");
					this.updateState("requestedMinRowCount");
					this.updateState("variableRowHeight");
				}
			}
		}
	}
	,updateState: function(p_state) {
		switch(p_state) {
		case "layout":
			this._updateLayout(this.layoutableEntity.getState(p_state));
			break;
		case "includeInLayout":
			this.includeInLayout = this.layoutableEntity.getState(p_state);
			break;
		case "x":
			if(!Math.isNaN(this.layoutableEntity.getState(p_state))) this.x = this.layoutableEntity.getState(p_state);
			break;
		case "y":
			if(!Math.isNaN(this.layoutableEntity.getState(p_state))) this.y = this.layoutableEntity.getState(p_state);
			break;
		case "width":
			this._updateExplicitSize(this.layoutableEntity.getState(p_state),"width");
			break;
		case "height":
			this._updateExplicitSize(this.layoutableEntity.getState(p_state),"height");
			break;
		case "left":
			if(!Math.isNaN(this.layoutableEntity.getState(p_state))) this.left = this.layoutableEntity.getState(p_state);
			break;
		case "top":
			if(!Math.isNaN(this.layoutableEntity.getState(p_state))) this.top = this.layoutableEntity.getState(p_state);
			break;
		case "right":
			if(!Math.isNaN(this.layoutableEntity.getState(p_state))) this.right = this.layoutableEntity.getState(p_state);
			break;
		case "bottom":
			if(!Math.isNaN(this.layoutableEntity.getState(p_state))) this.bottom = this.layoutableEntity.getState(p_state);
			break;
		case "horizontalCenter":
			if(!Math.isNaN(this.layoutableEntity.getState(p_state))) this.horizontalCenter = this.layoutableEntity.getState(p_state);
			break;
		case "verticalCenter":
			if(!Math.isNaN(this.layoutableEntity.getState(p_state))) this.verticalCenter = this.layoutableEntity.getState(p_state);
			break;
		case "paddingLeft":
			this.paddingLeft = this.layoutableEntity.getState(p_state);
			break;
		case "paddingRight":
			this.paddingRight = this.layoutableEntity.getState(p_state);
			break;
		case "paddingTop":
			this.paddingTop = this.layoutableEntity.getState(p_state);
			break;
		case "paddingBottom":
			this.paddingBottom = this.layoutableEntity.getState(p_state);
			break;
		case "gap":
			this.gap = this.layoutableEntity.getState(p_state);
			break;
		case "horizontalAlign":
			var s_horAlignStr = this.layoutableEntity.getState(p_state);
			if(s_horAlignStr == "left") this.horizontalAlign = tools_spark_framework_layout_interfaces_EHorizontalAlign.LEFT; else if(s_horAlignStr == "center") this.horizontalAlign = tools_spark_framework_layout_interfaces_EHorizontalAlign.CENTER; else if(s_horAlignStr == "right") this.horizontalAlign = tools_spark_framework_layout_interfaces_EHorizontalAlign.RIGHT; else if(s_horAlignStr == "justify") this.horizontalAlign = tools_spark_framework_layout_interfaces_EHorizontalAlign.JUSTIFY; else if(s_horAlignStr == "contentJustify") this.horizontalAlign = tools_spark_framework_layout_interfaces_EHorizontalAlign.CONTENT_JUSTIFY;
			break;
		case "verticalAlign":
			var s_verAlignStr = this.layoutableEntity.getState(p_state);
			if(s_verAlignStr == "top") this.verticalAlign = tools_spark_framework_layout_interfaces_EVerticalAlign.TOP; else if(s_verAlignStr == "middle") this.verticalAlign = tools_spark_framework_layout_interfaces_EVerticalAlign.MIDDLE; else if(s_verAlignStr == "bottom") this.verticalAlign = tools_spark_framework_layout_interfaces_EVerticalAlign.BOTTOM; else if(s_verAlignStr == "justify") this.verticalAlign = tools_spark_framework_layout_interfaces_EVerticalAlign.JUSTIFY; else if(s_verAlignStr == "contentJustify") this.verticalAlign = tools_spark_framework_layout_interfaces_EVerticalAlign.CONTENT_JUSTIFY;
			break;
		case "columnWidth":
			this.columnWidth = this.layoutableEntity.getState(p_state);
			break;
		case "requestedColumnCount":
			this.requestedColumnCount = this.layoutableEntity.getState(p_state);
			break;
		case "requestedMaxColumnCount":
			this.requestedMaxColumnCount = this.layoutableEntity.getState(p_state);
			break;
		case "requestedMinColumnCount":
			this.requestedMinColumnCount = this.layoutableEntity.getState(p_state);
			break;
		case "variableColumnWidth":
			this.variableColumnWidth = this.layoutableEntity.getState(p_state);
			break;
		case "rowHeight":
			this.rowHeight = this.layoutableEntity.getState(p_state);
			break;
		case "requestedRowCount":
			this.requestedRowCount = this.layoutableEntity.getState(p_state);
			break;
		case "requestedMaxRowCount":
			this.requestedMaxRowCount = this.layoutableEntity.getState(p_state);
			break;
		case "requestedMinRowCount":
			this.requestedMinRowCount = this.layoutableEntity.getState(p_state);
			break;
		case "variableRowHeight":
			this.variableRowHeight = this.layoutableEntity.getState(p_state);
			break;
		}
	}
	,_updateLayout: function(p_stateValue) {
		if(p_stateValue == "Basic") {
			if(this.layout == null) this.set_layout(new tools_spark_framework_layout_layouts_BasicLayout()); else if(this.layout.layoutType != p_stateValue) this.set_layout(new tools_spark_framework_layout_layouts_BasicLayout());
		} else if(p_stateValue == "Horizontal") {
			if(this.layout == null) this.set_layout(new tools_spark_framework_layout_layouts_HorizontalLayout()); else if(this.layout.layoutType != p_stateValue) this.set_layout(new tools_spark_framework_layout_layouts_HorizontalLayout());
		} else if(p_stateValue == "Vertical") {
			if(this.layout == null) this.set_layout(new tools_spark_framework_layout_layouts_VerticalLayout()); else if(this.layout.layoutType != p_stateValue) this.set_layout(new tools_spark_framework_layout_layouts_VerticalLayout());
		}
		this.layout.set_target(this);
	}
	,_updateExplicitSize: function(p_stateValue,p_dimension) {
		var l_explicitSize = null;
		var l_percentSize = null;
		if(p_stateValue != "Implicit") {
			if(p_stateValue.indexOf("%") != -1) l_percentSize = Std.parseFloat(p_stateValue); else l_explicitSize = Std.parseFloat(p_stateValue);
		}
		if(p_dimension == "width") {
			this.explicitWidth = l_explicitSize;
			this.percentWidth = l_percentSize;
		} else {
			this.explicitHeight = l_explicitSize;
			this.percentHeight = l_percentSize;
		}
	}
	,set_layout: function(p_value) {
		if(this.layout == p_value) return this.layout;
		this.layout = p_value;
		return this.layout;
	}
	,measure: function() {
		this.layout.measure();
	}
	,updateDisplayList: function(p_width,p_height) {
		this.layout.updateDisplayList(p_width,p_height);
	}
	,setActualSize: function(p_width,p_height) {
		if(this.explicitWidth != null) this.width = this.explicitWidth; else if(p_width != null && p_width != 0) {
			this.width = p_width;
			this.measuredWidth = p_width;
		} else if(this.get_preferredWidth() != 0) this.width = this.get_preferredWidth();
		if(this.explicitHeight != null) this.height = this.explicitHeight; else if(p_height != null && p_height != 0) {
			this.height = p_height;
			this.measuredHeight = p_height;
		} else if(this.get_preferredHeight() != 0) this.height = this.get_preferredHeight();
	}
	,get_preferredWidth: function() {
		if(this.explicitWidth == null) return this.measuredWidth; else return this.explicitWidth;
	}
	,get_preferredHeight: function() {
		if(this.explicitHeight == null) return this.measuredHeight; else return this.explicitHeight;
	}
	,get_preferredMinWidth: function() {
		if(this.explicitMinWidth == null) return this.measuredMinWidth; else return this.explicitMinWidth;
	}
	,get_preferredMinHeight: function() {
		if(this.explicitMinHeight == null) return this.measuredMinHeight; else return this.explicitMinHeight;
	}
	,get_preferredMaxWidth: function() {
		if(this.explicitMaxWidth == null) return this.measuredMaxWidth; else return this.explicitMaxWidth;
	}
	,get_preferredMaxHeight: function() {
		if(this.explicitMaxHeight == null) return this.measuredMaxHeight; else return this.explicitMaxHeight;
	}
	,__class__: tools_spark_framework_layout_containers_Group
};
var tools_spark_framework_layout_helpers_ChildInfo = function() {
	this.size = 0;
};
$hxClasses["tools.spark.framework.layout.helpers.ChildInfo"] = tools_spark_framework_layout_helpers_ChildInfo;
tools_spark_framework_layout_helpers_ChildInfo.__name__ = true;
tools_spark_framework_layout_helpers_ChildInfo.prototype = {
	__class__: tools_spark_framework_layout_helpers_ChildInfo
};
var tools_spark_framework_layout_helpers_LayoutHelper = function() { };
$hxClasses["tools.spark.framework.layout.helpers.LayoutHelper"] = tools_spark_framework_layout_helpers_LayoutHelper;
tools_spark_framework_layout_helpers_LayoutHelper.__name__ = true;
tools_spark_framework_layout_helpers_LayoutHelper.flexChildrenProportionally = function(p_spaceForChildren,p_spaceToDistribute,p_totalPercent,p_childInfoArray) {
	var l_numChildren = p_childInfoArray.length;
	var l_flexConsumed;
	var l_done;
	var l_unused;
	do {
		l_flexConsumed = 0;
		l_done = true;
		l_unused = p_spaceToDistribute - p_spaceForChildren * p_totalPercent / 100;
		if(l_unused > 0) p_spaceToDistribute -= l_unused; else l_unused = 0;
		var l_spacePerPercent = p_spaceToDistribute / p_totalPercent;
		var l_i = 0;
		while(l_i < l_numChildren) {
			var w_childInfo = p_childInfoArray[l_i];
			var w_size = w_childInfo.percent * l_spacePerPercent;
			if(w_size < w_childInfo.min) {
				var w_min = w_childInfo.min;
				w_childInfo.size = w_min;
				p_childInfoArray[l_i] = p_childInfoArray[--l_numChildren];
				p_childInfoArray[l_numChildren] = w_childInfo;
				p_totalPercent -= w_childInfo.percent;
				if(l_unused >= w_min) l_unused -= w_min; else {
					p_spaceToDistribute -= w_min - l_unused;
					l_unused = 0;
				}
				l_done = false;
				break;
			} else if(w_size > w_childInfo.max) {
				var w_max = w_childInfo.max;
				w_childInfo.size = w_max;
				p_childInfoArray[l_i] = p_childInfoArray[--l_numChildren];
				p_childInfoArray[l_numChildren] = w_childInfo;
				p_totalPercent -= w_childInfo.percent;
				if(l_unused >= w_max) l_unused -= w_max; else {
					p_spaceToDistribute -= w_max - l_unused;
					l_unused = 0;
				}
				l_done = false;
				break;
			} else {
				w_childInfo.size = w_size;
				l_flexConsumed += w_size;
			}
			l_i++;
		}
	} while(!l_done);
	return Math.max(0,Math.floor(p_spaceToDistribute + l_unused - l_flexConsumed));
};
var tools_spark_framework_layout_helpers_SizesAndLimit = function() {
};
$hxClasses["tools.spark.framework.layout.helpers.SizesAndLimit"] = tools_spark_framework_layout_helpers_SizesAndLimit;
tools_spark_framework_layout_helpers_SizesAndLimit.__name__ = true;
tools_spark_framework_layout_helpers_SizesAndLimit.prototype = {
	__class__: tools_spark_framework_layout_helpers_SizesAndLimit
};
var tools_spark_framework_layout_interfaces_EHorizontalAlign = $hxClasses["tools.spark.framework.layout.interfaces.EHorizontalAlign"] = { __ename__ : true, __constructs__ : ["LEFT","CENTER","RIGHT","JUSTIFY","CONTENT_JUSTIFY"] };
tools_spark_framework_layout_interfaces_EHorizontalAlign.LEFT = ["LEFT",0];
tools_spark_framework_layout_interfaces_EHorizontalAlign.LEFT.toString = $estr;
tools_spark_framework_layout_interfaces_EHorizontalAlign.LEFT.__enum__ = tools_spark_framework_layout_interfaces_EHorizontalAlign;
tools_spark_framework_layout_interfaces_EHorizontalAlign.CENTER = ["CENTER",1];
tools_spark_framework_layout_interfaces_EHorizontalAlign.CENTER.toString = $estr;
tools_spark_framework_layout_interfaces_EHorizontalAlign.CENTER.__enum__ = tools_spark_framework_layout_interfaces_EHorizontalAlign;
tools_spark_framework_layout_interfaces_EHorizontalAlign.RIGHT = ["RIGHT",2];
tools_spark_framework_layout_interfaces_EHorizontalAlign.RIGHT.toString = $estr;
tools_spark_framework_layout_interfaces_EHorizontalAlign.RIGHT.__enum__ = tools_spark_framework_layout_interfaces_EHorizontalAlign;
tools_spark_framework_layout_interfaces_EHorizontalAlign.JUSTIFY = ["JUSTIFY",3];
tools_spark_framework_layout_interfaces_EHorizontalAlign.JUSTIFY.toString = $estr;
tools_spark_framework_layout_interfaces_EHorizontalAlign.JUSTIFY.__enum__ = tools_spark_framework_layout_interfaces_EHorizontalAlign;
tools_spark_framework_layout_interfaces_EHorizontalAlign.CONTENT_JUSTIFY = ["CONTENT_JUSTIFY",4];
tools_spark_framework_layout_interfaces_EHorizontalAlign.CONTENT_JUSTIFY.toString = $estr;
tools_spark_framework_layout_interfaces_EHorizontalAlign.CONTENT_JUSTIFY.__enum__ = tools_spark_framework_layout_interfaces_EHorizontalAlign;
var tools_spark_framework_layout_interfaces_EVerticalAlign = $hxClasses["tools.spark.framework.layout.interfaces.EVerticalAlign"] = { __ename__ : true, __constructs__ : ["TOP","MIDDLE","BOTTOM","JUSTIFY","CONTENT_JUSTIFY"] };
tools_spark_framework_layout_interfaces_EVerticalAlign.TOP = ["TOP",0];
tools_spark_framework_layout_interfaces_EVerticalAlign.TOP.toString = $estr;
tools_spark_framework_layout_interfaces_EVerticalAlign.TOP.__enum__ = tools_spark_framework_layout_interfaces_EVerticalAlign;
tools_spark_framework_layout_interfaces_EVerticalAlign.MIDDLE = ["MIDDLE",1];
tools_spark_framework_layout_interfaces_EVerticalAlign.MIDDLE.toString = $estr;
tools_spark_framework_layout_interfaces_EVerticalAlign.MIDDLE.__enum__ = tools_spark_framework_layout_interfaces_EVerticalAlign;
tools_spark_framework_layout_interfaces_EVerticalAlign.BOTTOM = ["BOTTOM",2];
tools_spark_framework_layout_interfaces_EVerticalAlign.BOTTOM.toString = $estr;
tools_spark_framework_layout_interfaces_EVerticalAlign.BOTTOM.__enum__ = tools_spark_framework_layout_interfaces_EVerticalAlign;
tools_spark_framework_layout_interfaces_EVerticalAlign.JUSTIFY = ["JUSTIFY",3];
tools_spark_framework_layout_interfaces_EVerticalAlign.JUSTIFY.toString = $estr;
tools_spark_framework_layout_interfaces_EVerticalAlign.JUSTIFY.__enum__ = tools_spark_framework_layout_interfaces_EVerticalAlign;
tools_spark_framework_layout_interfaces_EVerticalAlign.CONTENT_JUSTIFY = ["CONTENT_JUSTIFY",4];
tools_spark_framework_layout_interfaces_EVerticalAlign.CONTENT_JUSTIFY.toString = $estr;
tools_spark_framework_layout_interfaces_EVerticalAlign.CONTENT_JUSTIFY.__enum__ = tools_spark_framework_layout_interfaces_EVerticalAlign;
var tools_spark_framework_layout_layouts_ALayoutBase = function() {
};
$hxClasses["tools.spark.framework.layout.layouts.ALayoutBase"] = tools_spark_framework_layout_layouts_ALayoutBase;
tools_spark_framework_layout_layouts_ALayoutBase.__name__ = true;
tools_spark_framework_layout_layouts_ALayoutBase.prototype = {
	get_typicalLayoutElement: function() {
		if(this._typicalLayoutElement == null && this.target != null && this.target.children.length > 0) this._typicalLayoutElement = this.target.children[0];
		return this._typicalLayoutElement;
	}
	,set_target: function(p_value) {
		if(this.target == p_value) return this.target;
		this.target = p_value;
		return this.target;
	}
	,measure: function() {
	}
	,updateDisplayList: function(p_unscaledWidth,p_unscaledHeight) {
	}
	,__class__: tools_spark_framework_layout_layouts_ALayoutBase
};
var tools_spark_framework_layout_layouts_BasicLayout = function() {
	tools_spark_framework_layout_layouts_ALayoutBase.call(this);
	this.layoutType = "Basic";
};
$hxClasses["tools.spark.framework.layout.layouts.BasicLayout"] = tools_spark_framework_layout_layouts_BasicLayout;
tools_spark_framework_layout_layouts_BasicLayout.__name__ = true;
tools_spark_framework_layout_layouts_BasicLayout._constraintsDetermineWidth = function(p_group) {
	return p_group.percentWidth != null || p_group.left != null && p_group.right != null;
};
tools_spark_framework_layout_layouts_BasicLayout._constraintsDetermineHeight = function(p_group) {
	return p_group.percentHeight != null || p_group.top != null && p_group.bottom != null;
};
tools_spark_framework_layout_layouts_BasicLayout._maxSizeToFitIn = function(p_totalSize,p_center,p_lowConstraint,p_highConstraint,p_position) {
	if(p_center != null) return p_totalSize - 2 * Math.abs(p_center); else if(p_lowConstraint != null) return p_totalSize - p_lowConstraint; else if(p_highConstraint != null) return p_totalSize - p_highConstraint; else return p_totalSize - p_position;
};
tools_spark_framework_layout_layouts_BasicLayout.__super__ = tools_spark_framework_layout_layouts_ALayoutBase;
tools_spark_framework_layout_layouts_BasicLayout.prototype = $extend(tools_spark_framework_layout_layouts_ALayoutBase.prototype,{
	measure: function() {
		var l_width = 0;
		var l_height = 0;
		var l_minWidth = 0;
		var l_minHeight = 0;
		var _g = 0;
		var _g1 = this.target.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			if(f_child == null || f_child.includeInLayout == false) continue;
			var f_extX;
			var f_extY;
			if(f_child.left != null && f_child.right != null) f_extX = f_child.left + f_child.right; else if(f_child.horizontalCenter != null) f_extX = Math.abs(f_child.horizontalCenter) * 2; else if(f_child.left != null || f_child.right != null) {
				if(f_child.left == null) f_extX = 0; else f_extX = f_child.left;
				if(f_child.right == null) f_extX += 0; else f_extX += f_child.right;
			} else f_extX = f_child.x;
			if(f_child.top != null && f_child.bottom != null) f_extY = f_child.top + f_child.bottom; else if(f_child.verticalCenter != null) f_extY = Math.abs(f_child.verticalCenter) * 2; else if(f_child.top != null || f_child.bottom != null) {
				if(f_child.top == null) f_extY = 0; else f_extY = f_child.top;
				if(f_child.bottom == null) f_extY += 0; else f_extY += f_child.bottom;
			} else f_extY = f_child.y;
			l_width = Math.max(l_width,f_extX + f_child.get_preferredWidth());
			l_height = Math.max(l_height,f_extY + f_child.get_preferredHeight());
			var l_elementMinWidth;
			if(tools_spark_framework_layout_layouts_BasicLayout._constraintsDetermineWidth(f_child)) l_elementMinWidth = f_child.get_preferredMinWidth(); else l_elementMinWidth = f_child.get_preferredWidth();
			var l_elementMinHeight;
			if(tools_spark_framework_layout_layouts_BasicLayout._constraintsDetermineHeight(f_child)) l_elementMinHeight = f_child.get_preferredMinHeight(); else l_elementMinHeight = f_child.get_preferredHeight();
			l_minWidth = Math.max(l_minWidth,f_extX + l_elementMinWidth);
			l_minHeight = Math.max(l_minHeight,f_extY + l_elementMinHeight);
		}
		this.target.measuredWidth = Math.ceil(Math.max(l_width,l_minWidth));
		this.target.measuredHeight = Math.ceil(Math.max(l_height,l_minHeight));
		this.target.measuredMinWidth = Math.ceil(l_minWidth);
		this.target.measuredMinHeight = Math.ceil(l_minHeight);
		this.target.measuredMaxWidth = 999999;
		this.target.measuredMaxHeight = 999999;
	}
	,updateDisplayList: function(p_unscaledWidth,p_unscaledHeight) {
		var l_maxX = 0;
		var l_maxY = 0;
		var _g = 0;
		var _g1 = this.target.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			if(f_child == null || f_child.includeInLayout == false) continue;
			var f_elementMaxWidth = null;
			var f_elementMaxHeight = null;
			var f_childWidth = null;
			var f_childHeight = null;
			if(f_child.percentWidth != null) {
				var f_availableWidth = p_unscaledWidth;
				if(f_child.left != null) f_availableWidth -= f_child.left;
				if(f_child.right != null) f_availableWidth -= f_child.right;
				f_childWidth = Math.round(f_availableWidth * Math.min(f_child.percentWidth * 0.01,1));
				f_elementMaxWidth = Math.min(f_child.get_preferredMaxWidth(),tools_spark_framework_layout_layouts_BasicLayout._maxSizeToFitIn(p_unscaledWidth,f_child.horizontalCenter,f_child.left,f_child.right,f_child.x));
			} else if(f_child.left != null && f_child.right != null) f_childWidth = p_unscaledWidth - f_child.right - f_child.left;
			if(f_child.percentHeight != null) {
				var f_availableHeight = p_unscaledHeight;
				if(f_child.top != null) f_availableHeight -= f_child.top;
				if(f_child.bottom != null) f_availableHeight -= f_child.bottom;
				f_childHeight = Math.round(f_availableHeight * Math.min(f_child.percentHeight * 0.01,1));
				f_elementMaxHeight = Math.min(f_child.get_preferredMaxHeight(),tools_spark_framework_layout_layouts_BasicLayout._maxSizeToFitIn(p_unscaledHeight,f_child.verticalCenter,f_child.top,f_child.bottom,f_child.y));
			} else if(f_child.top != null && f_child.bottom != null) f_childHeight = p_unscaledHeight - f_child.bottom - f_child.top;
			if(f_childWidth != null) {
				if(f_elementMaxWidth == null) f_elementMaxWidth = f_child.get_preferredMaxWidth();
				f_childWidth = Math.max(f_child.get_preferredMinWidth(),Math.min(f_elementMaxWidth,f_childWidth));
			}
			if(f_childHeight != null) {
				if(f_elementMaxHeight == null) f_elementMaxHeight = f_child.get_preferredMaxHeight();
				f_childHeight = Math.max(f_child.get_preferredMinHeight(),Math.min(f_elementMaxHeight,f_childHeight));
			}
			f_child.setActualSize(f_childWidth,f_childHeight);
			var f_elementWidth = f_child.width;
			var f_elementHeight = f_child.height;
			var f_childX = null;
			var f_childY = null;
			if(f_child.horizontalCenter != null) f_childX = Math.round((p_unscaledWidth - f_elementWidth) / 2 + f_child.horizontalCenter); else if(f_child.left != null) f_childX = f_child.left; else if(f_child.right != null) f_childX = p_unscaledWidth - f_elementWidth - f_child.right; else f_childX = f_child.x;
			if(f_child.verticalCenter != null) f_childY = Math.round((p_unscaledHeight - f_elementHeight) / 2 + f_child.verticalCenter); else if(f_child.top != null) f_childY = f_child.top; else if(f_child.bottom != null) f_childY = p_unscaledHeight - f_elementHeight - f_child.bottom; else f_childY = f_child.y;
			f_child.x = f_childX;
			f_child.y = f_childY;
			l_maxX = Math.max(l_maxX,f_childX + f_elementWidth);
			l_maxY = Math.max(l_maxY,f_childY + f_elementHeight);
		}
		this.target.width = Math.ceil(p_unscaledWidth);
		this.target.height = Math.ceil(p_unscaledHeight);
	}
	,__class__: tools_spark_framework_layout_layouts_BasicLayout
});
var tools_spark_framework_layout_layouts_HorizontalLayout = function() {
	tools_spark_framework_layout_layouts_ALayoutBase.call(this);
	this.layoutType = "Horizontal";
};
$hxClasses["tools.spark.framework.layout.layouts.HorizontalLayout"] = tools_spark_framework_layout_layouts_HorizontalLayout;
tools_spark_framework_layout_layouts_HorizontalLayout.__name__ = true;
tools_spark_framework_layout_layouts_HorizontalLayout._pinBetween = function(p_val,p_min,p_max) {
	return Math.min(p_max,Math.max(p_min,p_val));
};
tools_spark_framework_layout_layouts_HorizontalLayout._calculatePercentHeight = function(p_layoutElement,p_height) {
	var l_percentHeight;
	l_percentHeight = tools_spark_framework_layout_layouts_HorizontalLayout._pinBetween(Math.min(Math.round(p_layoutElement.percentHeight * 0.01 * p_height),p_height),p_layoutElement.get_preferredMinHeight(),p_layoutElement.get_preferredMaxHeight());
	return l_percentHeight;
};
tools_spark_framework_layout_layouts_HorizontalLayout._sizeLayoutElement = function(p_layoutElement,p_height,p_verticalAlign,p_restrictedHeight,p_width,p_variableColumnWidth,p_columnWidth) {
	var l_newHeight = null;
	if(p_verticalAlign == tools_spark_framework_layout_interfaces_EVerticalAlign.JUSTIFY || p_verticalAlign == tools_spark_framework_layout_interfaces_EVerticalAlign.CONTENT_JUSTIFY) l_newHeight = p_restrictedHeight; else if(p_layoutElement.percentHeight != null) l_newHeight = tools_spark_framework_layout_layouts_HorizontalLayout._calculatePercentHeight(p_layoutElement,p_height);
	if(p_variableColumnWidth) p_layoutElement.setActualSize(p_width,l_newHeight); else p_layoutElement.setActualSize(p_columnWidth,l_newHeight);
};
tools_spark_framework_layout_layouts_HorizontalLayout.__super__ = tools_spark_framework_layout_layouts_ALayoutBase;
tools_spark_framework_layout_layouts_HorizontalLayout.prototype = $extend(tools_spark_framework_layout_layouts_ALayoutBase.prototype,{
	_getColumsToMeasure: function(p_numElementsInLayout) {
		var l_columnsToMeasure;
		if(this.target.requestedColumnCount != -1) l_columnsToMeasure = this.target.requestedColumnCount; else {
			l_columnsToMeasure = p_numElementsInLayout;
			if(this.target.requestedMaxColumnCount != -1) l_columnsToMeasure = Std["int"](Math.min(this.target.requestedMaxColumnCount,l_columnsToMeasure));
			if(this.target.requestedMinColumnCount != -1) l_columnsToMeasure = Std["int"](Math.max(this.target.requestedMinColumnCount,l_columnsToMeasure));
		}
		return l_columnsToMeasure;
	}
	,_getElementWidth: function(p_element,p_fixedColumnWidth,p_result) {
		var l_elementPreferredWidth;
		if(p_fixedColumnWidth == null) l_elementPreferredWidth = Math.ceil(p_element.get_preferredWidth()); else l_elementPreferredWidth = p_fixedColumnWidth;
		var l_flexibleWidth = p_element.percentWidth != null;
		var l_elementMinWidth;
		if(l_flexibleWidth) l_elementMinWidth = Math.ceil(p_element.get_preferredMinWidth()); else l_elementMinWidth = l_elementPreferredWidth;
		p_result.preferredSize = l_elementPreferredWidth;
		p_result.minSize = l_elementMinWidth;
	}
	,_getElementHeight: function(p_element,p_justify,p_result) {
		var l_elementPreferredHeight = Math.ceil(p_element.get_preferredHeight());
		var l_flexibleHeight = p_element.percentHeight != null || p_justify;
		var l_elementMinHeight;
		if(l_flexibleHeight) l_elementMinHeight = Math.ceil(p_element.get_preferredMinHeight()); else l_elementMinHeight = l_elementPreferredHeight;
		p_result.preferredSize = l_elementPreferredHeight;
		p_result.minSize = l_elementMinHeight;
	}
	,_distributeWidth: function(p_width,p_height,p_restrictedHeight) {
		var l_spaceToDistribute = p_width;
		var l_totalPercentWidth = 0;
		var l_childInfoArray = new Array();
		var l_childInfo;
		var l_newHeight;
		var l_layoutElement;
		var l_cw;
		if(this.target.variableColumnWidth) l_cw = 0; else l_cw = Math.ceil(Std.parseFloat(this.target.columnWidth));
		var l_totalCount = this.target.children.length;
		var _g = 0;
		var _g1 = this.target.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			if(f_child == null || f_child.includeInLayout == false) {
				l_totalCount--;
				continue;
			}
			if(f_child.percentWidth != null && this.target.variableColumnWidth) {
				l_totalPercentWidth += f_child.percentWidth;
				l_childInfo = new tools_spark_framework_layout_helpers_ChildInfo();
				l_childInfo.layoutElement = f_child;
				l_childInfo.percent = f_child.percentWidth;
				l_childInfo.min = f_child.get_preferredMinWidth();
				l_childInfo.max = f_child.get_preferredMaxWidth();
				l_childInfoArray.push(l_childInfo);
			} else {
				tools_spark_framework_layout_layouts_HorizontalLayout._sizeLayoutElement(f_child,p_height,this.target.verticalAlign,p_restrictedHeight,null,this.target.variableColumnWidth,l_cw);
				l_spaceToDistribute -= Math.ceil(f_child.width);
			}
		}
		if(l_totalCount > 1) l_spaceToDistribute -= (l_totalCount - 1) * this.target.gap;
		if(l_totalPercentWidth != 0) {
			tools_spark_framework_layout_helpers_LayoutHelper.flexChildrenProportionally(p_width,l_spaceToDistribute,l_totalPercentWidth,l_childInfoArray);
			var l_roundOff = 0;
			var _g2 = 0;
			while(_g2 < l_childInfoArray.length) {
				var f_childInfo = l_childInfoArray[_g2];
				++_g2;
				var l_childSize = Math.round(f_childInfo.size + l_roundOff);
				l_roundOff += f_childInfo.size - l_childSize;
				tools_spark_framework_layout_layouts_HorizontalLayout._sizeLayoutElement(f_childInfo.layoutElement,p_height,this.target.verticalAlign,p_restrictedHeight,l_childSize,this.target.variableColumnWidth,l_cw);
				l_spaceToDistribute -= l_childSize;
			}
		}
		return l_spaceToDistribute;
	}
	,measure: function() {
		var l_size = new tools_spark_framework_layout_helpers_SizesAndLimit();
		var l_justify = this.target.verticalAlign == tools_spark_framework_layout_interfaces_EVerticalAlign.JUSTIFY;
		var l_numElements = this.target.children.length;
		var l_numElementsInLayout = l_numElements;
		var l_requestedColumnCount = this.target.requestedColumnCount;
		var l_columnsMeasured = 0;
		var l_preferredHeight = 0;
		var l_preferredWidth = 0;
		var l_minHeight = 0;
		var l_minWidth = 0;
		var l_fixedColumnWidth = null;
		if(!this.target.variableColumnWidth) {
			if(this.target.columnWidth == "calculated") l_fixedColumnWidth = this.get_typicalLayoutElement().get_preferredWidth(); else l_fixedColumnWidth = Std.parseFloat(this.target.columnWidth);
		}
		var l_columnsToMeasure = this._getColumsToMeasure(l_numElementsInLayout);
		var _g = 0;
		var _g1 = this.target.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			if(f_child == null || f_child.includeInLayout == false) {
				l_numElementsInLayout--;
				continue;
			}
			this._getElementHeight(f_child,l_justify,l_size);
			l_preferredHeight = Math.max(l_preferredHeight,l_size.preferredSize);
			l_minHeight = Math.max(l_minHeight,l_size.minSize);
			if(l_columnsMeasured < l_columnsToMeasure) {
				this._getElementWidth(f_child,l_fixedColumnWidth,l_size);
				l_preferredWidth += l_size.preferredSize;
				l_minWidth += l_size.minSize;
				l_columnsMeasured++;
			}
		}
		l_columnsToMeasure = this._getColumsToMeasure(l_numElementsInLayout);
		if(l_columnsMeasured < l_columnsToMeasure) {
			var l_element = this.get_typicalLayoutElement();
			if(l_element != null) {
				this._getElementHeight(l_element,l_justify,l_size);
				l_preferredHeight = Math.max(l_preferredHeight,l_size.preferredSize);
				l_minHeight = Math.max(l_minHeight,l_size.minSize);
				this._getElementWidth(l_element,l_fixedColumnWidth,l_size);
				l_preferredWidth += l_size.preferredSize * (l_columnsToMeasure - l_columnsMeasured);
				l_minWidth += l_size.minSize * (l_columnsToMeasure - l_columnsMeasured);
				l_columnsMeasured = l_columnsToMeasure;
			}
		}
		if(l_columnsMeasured > 1) {
			var l_hgap = this.target.gap * (l_columnsMeasured - 1);
			l_preferredWidth += l_hgap;
			l_minWidth += l_hgap;
		}
		var l_hPadding = this.target.paddingLeft + this.target.paddingRight;
		var l_vPadding = this.target.paddingTop + this.target.paddingBottom;
		this.target.measuredHeight = Math.ceil(l_preferredHeight + l_vPadding);
		this.target.measuredWidth = Math.ceil(l_preferredWidth + l_hPadding);
		this.target.measuredMinHeight = Math.ceil(l_minHeight + l_vPadding);
		this.target.measuredMinWidth = Math.ceil(l_minWidth + l_hPadding);
		this.target.measuredMaxWidth = 999999;
		this.target.measuredMaxHeight = 999999;
	}
	,updateDisplayList: function(p_unscaledWidth,p_unscaledHeight) {
		if(this.target.children.length == 0 || p_unscaledWidth == 0 || p_unscaledHeight == 0) {
			if(this.target.children.length == 0) {
				this.target.width = Math.ceil(this.target.paddingLeft + this.target.paddingRight);
				this.target.height = Math.ceil(this.target.paddingTop + this.target.paddingBottom);
			}
			return;
		}
		var l_targetWidth = Math.max(0,this.target.width - this.target.paddingLeft - this.target.paddingRight);
		var l_targetHeight = Math.max(0,this.target.height - this.target.paddingTop - this.target.paddingBottom);
		var l_containerHeight = l_targetHeight;
		if(this.target.verticalAlign == tools_spark_framework_layout_interfaces_EVerticalAlign.CONTENT_JUSTIFY) {
			var _g = 0;
			var _g1 = this.target.children;
			while(_g < _g1.length) {
				var f_child = _g1[_g];
				++_g;
				if(f_child == null || f_child.includeInLayout == false) continue;
				var l_layoutElementHeight;
				if(f_child.percentHeight != null) l_layoutElementHeight = tools_spark_framework_layout_layouts_HorizontalLayout._calculatePercentHeight(f_child,l_targetHeight); else l_layoutElementHeight = f_child.get_preferredHeight();
				l_containerHeight = Math.max(l_containerHeight,Math.ceil(l_layoutElementHeight));
			}
		}
		var l_excessWidth = this._distributeWidth(l_targetWidth,l_targetHeight,l_containerHeight);
		var l_vAlign = 0;
		if(this.target.verticalAlign == tools_spark_framework_layout_interfaces_EVerticalAlign.MIDDLE) l_vAlign = .5; else if(this.target.verticalAlign == tools_spark_framework_layout_interfaces_EVerticalAlign.BOTTOM) l_vAlign = 1;
		var l_x = this.target.paddingLeft;
		var l_y0 = this.target.paddingTop;
		var l_maxX = this.target.paddingLeft;
		var l_maxY = this.target.paddingTop;
		if(l_excessWidth > 0 || true) {
			var l_hAlign = this.target.horizontalAlign;
			if(l_hAlign == tools_spark_framework_layout_interfaces_EHorizontalAlign.CENTER) l_x = this.target.paddingLeft + Math.round(l_excessWidth / 2); else if(l_hAlign == tools_spark_framework_layout_interfaces_EHorizontalAlign.RIGHT) l_x = this.target.paddingLeft + l_excessWidth;
		}
		var _g2 = 0;
		var _g11 = this.target.children;
		while(_g2 < _g11.length) {
			var f_child1 = _g11[_g2];
			++_g2;
			if(f_child1 == null || f_child1.includeInLayout == false) continue;
			var l_dx = Math.ceil(f_child1.width);
			var l_dy = Math.ceil(f_child1.height);
			var l_y;
			l_y = l_y0 + (l_containerHeight - l_dy) * l_vAlign;
			if(l_vAlign == 0.5) l_y = Math.round(l_y);
			f_child1.x = l_x;
			f_child1.y = l_y;
			l_maxX = Math.max(l_maxX,l_x + l_dx);
			l_maxY = Math.max(l_maxY,l_y + l_dy);
			l_x += l_dx + this.target.gap;
		}
		this.target.width = Math.ceil(p_unscaledWidth);
		this.target.height = Math.ceil(p_unscaledHeight);
	}
	,__class__: tools_spark_framework_layout_layouts_HorizontalLayout
});
var tools_spark_framework_layout_layouts_VerticalLayout = function() {
	tools_spark_framework_layout_layouts_ALayoutBase.call(this);
	this.layoutType = "Vertical";
};
$hxClasses["tools.spark.framework.layout.layouts.VerticalLayout"] = tools_spark_framework_layout_layouts_VerticalLayout;
tools_spark_framework_layout_layouts_VerticalLayout.__name__ = true;
tools_spark_framework_layout_layouts_VerticalLayout._pinBetween = function(p_val,p_min,p_max) {
	return Math.min(p_max,Math.max(p_min,p_val));
};
tools_spark_framework_layout_layouts_VerticalLayout._calculatePercentWidth = function(p_layoutElement,p_width) {
	var l_percentWidth;
	l_percentWidth = tools_spark_framework_layout_layouts_VerticalLayout._pinBetween(Math.min(Math.round(p_layoutElement.percentWidth * 0.01 * p_width),p_width),p_layoutElement.get_preferredMinWidth(),p_layoutElement.get_preferredMaxWidth());
	return l_percentWidth;
};
tools_spark_framework_layout_layouts_VerticalLayout._sizeLayoutElement = function(p_layoutElement,p_width,p_horizontalAlign,p_restrictedWidth,p_height,p_variableRowHeight,p_rowHeight) {
	var l_newWidth = null;
	if(p_horizontalAlign == tools_spark_framework_layout_interfaces_EHorizontalAlign.JUSTIFY || p_horizontalAlign == tools_spark_framework_layout_interfaces_EHorizontalAlign.CONTENT_JUSTIFY) l_newWidth = p_restrictedWidth; else if(p_layoutElement.percentWidth != null) l_newWidth = tools_spark_framework_layout_layouts_VerticalLayout._calculatePercentWidth(p_layoutElement,p_width);
	if(p_variableRowHeight) p_layoutElement.setActualSize(l_newWidth,p_height); else p_layoutElement.setActualSize(l_newWidth,p_rowHeight);
};
tools_spark_framework_layout_layouts_VerticalLayout.__super__ = tools_spark_framework_layout_layouts_ALayoutBase;
tools_spark_framework_layout_layouts_VerticalLayout.prototype = $extend(tools_spark_framework_layout_layouts_ALayoutBase.prototype,{
	_getRowsToMeasure: function(p_numElementsInLayout) {
		var l_rowsToMeasure;
		if(this.target.requestedRowCount != -1) l_rowsToMeasure = this.target.requestedRowCount; else {
			l_rowsToMeasure = p_numElementsInLayout;
			if(this.target.requestedMaxRowCount != -1) l_rowsToMeasure = Std["int"](Math.min(this.target.requestedMaxRowCount,l_rowsToMeasure));
			if(this.target.requestedMinRowCount != -1) l_rowsToMeasure = Std["int"](Math.max(this.target.requestedMinRowCount,l_rowsToMeasure));
		}
		return l_rowsToMeasure;
	}
	,_getElementWidth: function(p_element,p_justify,p_result) {
		var l_elementPreferredWidth = Math.ceil(p_element.get_preferredWidth());
		var l_flexibleWidth = p_element.percentWidth != null || p_justify;
		var l_elementMinWidth;
		if(l_flexibleWidth) l_elementMinWidth = Math.ceil(p_element.get_preferredMinWidth()); else l_elementMinWidth = l_elementPreferredWidth;
		p_result.preferredSize = l_elementPreferredWidth;
		p_result.minSize = l_elementMinWidth;
	}
	,_getElementHeight: function(p_element,p_fixedRowHeight,p_result) {
		var l_elementPreferredHeight;
		if(p_fixedRowHeight == null) l_elementPreferredHeight = Math.ceil(p_element.get_preferredHeight()); else l_elementPreferredHeight = p_fixedRowHeight;
		var l_flexibleHeight = p_element.percentHeight != null;
		var l_elementMinHeight;
		if(l_flexibleHeight) l_elementMinHeight = Math.ceil(p_element.get_preferredMinHeight()); else l_elementMinHeight = l_elementPreferredHeight;
		p_result.preferredSize = l_elementPreferredHeight;
		p_result.minSize = l_elementMinHeight;
	}
	,_distributeHeight: function(p_width,p_height,p_restrictedWidth) {
		var l_spaceToDistribute = p_height;
		var l_totalPercentHeight = 0;
		var l_childInfoArray = new Array();
		var l_childInfo;
		var l_layoutElement;
		var l_rh;
		if(this.target.variableRowHeight) l_rh = 0; else l_rh = Math.ceil(Std.parseFloat(this.target.rowHeight));
		var l_totalCount = this.target.children.length;
		var _g = 0;
		var _g1 = this.target.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			if(f_child == null || f_child.includeInLayout == false) {
				l_totalCount--;
				continue;
			}
			if(f_child.percentHeight != null && this.target.variableRowHeight) {
				l_totalPercentHeight += f_child.percentHeight;
				l_childInfo = new tools_spark_framework_layout_helpers_ChildInfo();
				l_childInfo.layoutElement = f_child;
				l_childInfo.percent = f_child.percentHeight;
				l_childInfo.min = f_child.get_preferredMinHeight();
				l_childInfo.max = f_child.get_preferredMaxHeight();
				l_childInfoArray.push(l_childInfo);
			} else {
				tools_spark_framework_layout_layouts_VerticalLayout._sizeLayoutElement(f_child,p_width,this.target.horizontalAlign,p_restrictedWidth,null,this.target.variableRowHeight,l_rh);
				l_spaceToDistribute -= Math.ceil(f_child.height);
			}
		}
		if(l_totalCount > 1) l_spaceToDistribute -= (l_totalCount - 1) * this.target.gap;
		if(l_totalPercentHeight != 0) {
			tools_spark_framework_layout_helpers_LayoutHelper.flexChildrenProportionally(p_height,l_spaceToDistribute,l_totalPercentHeight,l_childInfoArray);
			var l_roundOff = 0;
			var _g2 = 0;
			while(_g2 < l_childInfoArray.length) {
				var f_childInfo = l_childInfoArray[_g2];
				++_g2;
				var l_childSize = Math.round(f_childInfo.size + l_roundOff);
				l_roundOff += f_childInfo.size - l_childSize;
				tools_spark_framework_layout_layouts_VerticalLayout._sizeLayoutElement(f_childInfo.layoutElement,p_width,this.target.horizontalAlign,p_restrictedWidth,l_childSize,this.target.variableRowHeight,l_rh);
				l_spaceToDistribute -= l_childSize;
			}
		}
		return l_spaceToDistribute;
	}
	,measure: function() {
		var l_size = new tools_spark_framework_layout_helpers_SizesAndLimit();
		var l_justify = this.target.horizontalAlign == tools_spark_framework_layout_interfaces_EHorizontalAlign.JUSTIFY;
		var l_numElements = this.target.children.length;
		var l_numElementsInLayout = l_numElements;
		var l_requestedRowCount = this.target.requestedRowCount;
		var l_rowsMeasured = 0;
		var l_preferredHeight = 0;
		var l_preferredWidth = 0;
		var l_minHeight = 0;
		var l_minWidth = 0;
		var l_fixedRowHeight = null;
		if(!this.target.variableRowHeight) {
			if(this.target.rowHeight == "calculated") l_fixedRowHeight = this.get_typicalLayoutElement().get_preferredHeight(); else l_fixedRowHeight = Std.parseFloat(this.target.rowHeight);
		}
		var l_rowsToMeasure = this._getRowsToMeasure(l_numElementsInLayout);
		var _g = 0;
		var _g1 = this.target.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			if(f_child == null || f_child.includeInLayout == false) {
				l_numElementsInLayout--;
				continue;
			}
			if(l_rowsMeasured < l_rowsToMeasure) {
				this._getElementHeight(f_child,l_fixedRowHeight,l_size);
				l_preferredHeight += l_size.preferredSize;
				l_minHeight += l_size.minSize;
				l_rowsMeasured++;
			}
			this._getElementWidth(f_child,l_justify,l_size);
			l_preferredWidth = Math.max(l_preferredWidth,l_size.preferredSize);
			l_minWidth = Math.max(l_minWidth,l_size.minSize);
		}
		l_rowsToMeasure = this._getRowsToMeasure(l_numElementsInLayout);
		if(l_rowsMeasured < l_rowsToMeasure) {
			var l_element = this.get_typicalLayoutElement();
			if(l_element != null) {
				this._getElementHeight(l_element,l_fixedRowHeight,l_size);
				l_preferredHeight += l_size.preferredSize * (l_rowsToMeasure - l_rowsMeasured);
				l_minHeight += l_size.minSize * (l_rowsToMeasure - l_rowsMeasured);
				this._getElementWidth(l_element,l_justify,l_size);
				l_preferredWidth = Math.max(l_preferredWidth,l_size.preferredSize);
				l_minWidth = Math.max(l_minWidth,l_size.minSize);
				l_rowsMeasured = l_rowsToMeasure;
			}
		}
		if(l_rowsMeasured > 1) {
			var l_vgap = this.target.gap * (l_rowsMeasured - 1);
			l_preferredHeight += l_vgap;
			l_minHeight += l_vgap;
		}
		var l_hPadding = this.target.paddingLeft + this.target.paddingRight;
		var l_vPadding = this.target.paddingTop + this.target.paddingBottom;
		this.target.measuredHeight = Math.ceil(l_preferredHeight + l_vPadding);
		this.target.measuredWidth = Math.ceil(l_preferredWidth + l_hPadding);
		this.target.measuredMinHeight = Math.ceil(l_minHeight + l_vPadding);
		this.target.measuredMinWidth = Math.ceil(l_minWidth + l_hPadding);
		this.target.measuredMaxWidth = 999999;
		this.target.measuredMaxHeight = 999999;
	}
	,updateDisplayList: function(p_unscaledWidth,p_unscaledHeight) {
		if(this.target.children.length == 0 || p_unscaledWidth == 0 || p_unscaledHeight == 0) {
			if(this.target.children.length == 0) {
				this.target.width = Math.ceil(this.target.paddingLeft + this.target.paddingRight);
				this.target.height = Math.ceil(this.target.paddingTop + this.target.paddingBottom);
			}
			return;
		}
		var l_targetWidth = Math.max(0,this.target.width - this.target.paddingLeft - this.target.paddingRight);
		var l_targetHeight = Math.max(0,this.target.height - this.target.paddingTop - this.target.paddingBottom);
		var l_containerWidth = l_targetWidth;
		if(this.target.horizontalAlign == tools_spark_framework_layout_interfaces_EHorizontalAlign.CONTENT_JUSTIFY) {
			var _g = 0;
			var _g1 = this.target.children;
			while(_g < _g1.length) {
				var f_child = _g1[_g];
				++_g;
				if(f_child == null || f_child.includeInLayout == false) continue;
				var l_layoutElementWidth;
				if(f_child.percentWidth != null) l_layoutElementWidth = tools_spark_framework_layout_layouts_VerticalLayout._calculatePercentWidth(f_child,l_targetWidth); else l_layoutElementWidth = f_child.get_preferredWidth();
				l_containerWidth = Math.max(l_containerWidth,Math.ceil(l_layoutElementWidth));
			}
		}
		var l_excessHeight = this._distributeHeight(l_targetWidth,l_targetHeight,l_containerWidth);
		var l_hAlign = 0;
		if(this.target.horizontalAlign == tools_spark_framework_layout_interfaces_EHorizontalAlign.CENTER) l_hAlign = .5; else if(this.target.horizontalAlign == tools_spark_framework_layout_interfaces_EHorizontalAlign.RIGHT) l_hAlign = 1;
		var l_x0 = this.target.paddingLeft;
		var l_y = this.target.paddingTop;
		var l_maxX = this.target.paddingLeft;
		var l_maxY = this.target.paddingTop;
		if(l_excessHeight > 0 || true) {
			var l_vAlign = this.target.verticalAlign;
			if(l_vAlign == tools_spark_framework_layout_interfaces_EVerticalAlign.MIDDLE) l_y = this.target.paddingTop + Math.round(l_excessHeight / 2); else if(l_vAlign == tools_spark_framework_layout_interfaces_EVerticalAlign.BOTTOM) l_y = this.target.paddingTop + l_excessHeight;
		}
		var _g2 = 0;
		var _g11 = this.target.children;
		while(_g2 < _g11.length) {
			var f_child1 = _g11[_g2];
			++_g2;
			if(f_child1 == null || f_child1.includeInLayout == false) continue;
			var l_dx = Math.ceil(f_child1.width);
			var l_dy = Math.ceil(f_child1.height);
			var l_x = l_x0 + (l_containerWidth - l_dx) * l_hAlign;
			if(l_hAlign == 0.5) l_x = Math.round(l_x);
			f_child1.x = l_x;
			f_child1.y = l_y;
			l_maxX = Math.max(l_maxX,l_x + l_dx);
			l_maxY = Math.max(l_maxY,l_y + l_dy);
			l_y += l_dy + this.target.gap;
		}
		this.target.width = Math.ceil(p_unscaledWidth);
		this.target.height = Math.ceil(p_unscaledHeight);
	}
	,__class__: tools_spark_framework_layout_layouts_VerticalLayout
});
var tools_spark_framework_layout_managers_LayoutManager = function(p_rootLayoutElement) {
	this.rootLayoutElement = p_rootLayoutElement;
	this.validated = false;
};
$hxClasses["tools.spark.framework.layout.managers.LayoutManager"] = tools_spark_framework_layout_managers_LayoutManager;
tools_spark_framework_layout_managers_LayoutManager.__name__ = true;
tools_spark_framework_layout_managers_LayoutManager.prototype = {
	validate: function() {
		if(!this.validated) {
			tools_spark_framework_Console.error("VALIDATING LAYOUT...");
			this.measure(this.rootLayoutElement);
			this.updateDisplayList(this.rootLayoutElement);
			this.updateRealObjects(this.rootLayoutElement);
			this.validated = true;
		}
	}
	,getViewGroupByGameEntity: function(p_gameEntity,p_Group) {
		if(p_Group == null) p_Group = this.rootLayoutElement;
		if(p_Group.layoutableEntity == p_gameEntity) return p_Group;
		var _g = 0;
		var _g1 = p_Group.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			if(f_child.layoutableInstanceType != "Entity") {
				var l_found = this.getViewGroupByGameEntity(p_gameEntity,f_child);
				if(l_found != null) return l_found;
			}
		}
		return null;
	}
	,updateRealObjects: function(p_Group,p_parentsX,p_parentsY,p_parentView) {
		if(p_parentsY == null) p_parentsY = 0;
		if(p_parentsX == null) p_parentsX = 0;
		var l_view2_5D = p_parentView;
		if(p_Group.layoutableInstanceType == "View") {
			if(p_Group.layoutableEntity.getState("renderer") == "3D") {
				var l_view3D = p_Group.layoutableInstance;
				l_view3D.x = p_Group.x + p_parentsX;
				l_view3D.y = p_Group.y + p_parentsY;
				l_view3D.width = p_Group.width;
				l_view3D.height = p_Group.height;
			} else {
				l_view2_5D = p_Group.layoutableInstance;
				l_view2_5D.setPosSize(p_Group.x + p_parentsX,p_Group.y + p_parentsY,p_Group.width,p_Group.height);
			}
		} else if(p_Group.layoutableInstanceType == "Entity") {
			var l_entity2_5D = p_Group.layoutableInstance;
			l_entity2_5D.setPosSize(p_Group.x,p_Group.y,p_Group.width,p_Group.height,l_view2_5D);
		}
		var _g = 0;
		var _g1 = p_Group.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			this.updateRealObjects(f_child,p_Group.x + p_parentsX,p_Group.y + p_parentsY,l_view2_5D);
		}
	}
	,measure: function(p_Group) {
		var _g = 0;
		var _g1 = p_Group.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			this.measure(f_child);
		}
		p_Group.measure();
	}
	,updateDisplayList: function(p_Group) {
		p_Group.updateDisplayList(p_Group.get_preferredWidth(),p_Group.get_preferredHeight());
		var _g = 0;
		var _g1 = p_Group.children;
		while(_g < _g1.length) {
			var f_child = _g1[_g];
			++_g;
			this.updateDisplayList(f_child);
		}
	}
	,__class__: tools_spark_framework_layout_managers_LayoutManager
};
var tools_spark_framework_platform_html_Graphics = function() { };
$hxClasses["tools.spark.framework.platform.html.Graphics"] = tools_spark_framework_platform_html_Graphics;
tools_spark_framework_platform_html_Graphics.__name__ = true;
tools_spark_framework_platform_html_Graphics.init = function() {
	tools_spark_framework_platform_html_flambe2_$5_Subgraphics.init();
};
tools_spark_framework_platform_html_Graphics.createDisplayRenderers = function() {
	tools_spark_framework_platform_html_flambe2_$5_Subgraphics.createDisplayRenderers();
	var v = new tools_spark_sliced_services_std_display_renderers_core_platform_html_NativeControlsHtmlRenderer();
	tools_spark_sliced_core_Sliced.display.platformRendererSet.set("NativeControls",v);
	v;
};
var tools_spark_framework_platform_html_flambe2_$5_Subgraphics = function() { };
$hxClasses["tools.spark.framework.platform.html.flambe2_5.Subgraphics"] = tools_spark_framework_platform_html_flambe2_$5_Subgraphics;
tools_spark_framework_platform_html_flambe2_$5_Subgraphics.__name__ = true;
tools_spark_framework_platform_html_flambe2_$5_Subgraphics.createDisplayRenderers = function() {
	var v = new tools_spark_sliced_services_std_display_renderers_core_platform_html_Flambe2_$5DHtmlRenderer();
	tools_spark_sliced_core_Sliced.display.platformRendererSet.set("2D",v);
	v;
};
tools_spark_framework_platform_html_flambe2_$5_Subgraphics.init = function() {
	tools_spark_framework_platform_html_flambe2_$5_Subgraphics._flambeDisplaySystem = flambe_platform_html_HtmlPlatform.instance.getRenderer();
};
tools_spark_framework_platform_html_flambe2_$5_Subgraphics.onRender = function() {
	tools_spark_framework_platform_html_flambe2_$5_Subgraphics._flambeDisplaySystem.willRender();
	if(tools_spark_sliced_core_Sliced.display != null) {
		if(tools_spark_sliced_core_Sliced.display.projectActiveSpaceReference != null) {
			if(tools_spark_sliced_core_Sliced.display.projectActiveSpaceReference.activeStageReference != null) {
				var _g = 0;
				var _g1 = tools_spark_sliced_core_Sliced.display.projectActiveSpaceReference.activeStageReference.activeViewReferences;
				while(_g < _g1.length) {
					var activeViewReference = _g1[_g];
					++_g;
					activeViewReference.renderer.renderView(activeViewReference.viewEntity);
				}
			}
		}
	}
	tools_spark_framework_platform_html_flambe2_$5_Subgraphics._flambeDisplaySystem.didRender();
};
var tools_spark_sliced_interfaces_IService = function() { };
$hxClasses["tools.spark.sliced.interfaces.IService"] = tools_spark_sliced_interfaces_IService;
tools_spark_sliced_interfaces_IService.__name__ = true;
var tools_spark_sliced_core_AService = function() {
};
$hxClasses["tools.spark.sliced.core.AService"] = tools_spark_sliced_core_AService;
tools_spark_sliced_core_AService.__name__ = true;
tools_spark_sliced_core_AService.__interfaces__ = [tools_spark_sliced_interfaces_IService];
tools_spark_sliced_core_AService.prototype = {
	__class__: tools_spark_sliced_core_AService
};
var tools_spark_sliced_interfaces_IServiceFactory = function() { };
$hxClasses["tools.spark.sliced.interfaces.IServiceFactory"] = tools_spark_sliced_interfaces_IServiceFactory;
tools_spark_sliced_interfaces_IServiceFactory.__name__ = true;
var tools_spark_sliced_core_ServiceFactory = function() {
	this._init();
};
$hxClasses["tools.spark.sliced.core.ServiceFactory"] = tools_spark_sliced_core_ServiceFactory;
tools_spark_sliced_core_ServiceFactory.__name__ = true;
tools_spark_sliced_core_ServiceFactory.__interfaces__ = [tools_spark_sliced_interfaces_IServiceFactory];
tools_spark_sliced_core_ServiceFactory.prototype = {
	_init: function() {
		this._createServices();
	}
	,_createServices: function() {
		var l_soundService = this._reflectService(tools_spark_framework_config_ENodeType.SOUND_SERVICE);
		var l_logicService = this._reflectService(tools_spark_framework_config_ENodeType.LOGIC_SERVICE);
		var l_inputService = this._reflectService(tools_spark_framework_config_ENodeType.INPUT_SERVICE);
		var l_commsService = this._reflectService(tools_spark_framework_config_ENodeType.COMMUNICATIONS_SERVICE);
		var l_eventService = this._reflectService(tools_spark_framework_config_ENodeType.EVENT_SERVICE);
		var l_displayService = this._reflectService(tools_spark_framework_config_ENodeType.DISPLAY_SERVICE);
		tools_spark_sliced_core_Sliced.assignServices(l_soundService,l_logicService,l_inputService,l_commsService,l_eventService,l_displayService);
	}
	,_reflectService: function(p_slicedService) {
		var l_classPath = tools_spark_framework_Project.sliced.get(p_slicedService);
		return Type.createInstance(Type.resolveClass(l_classPath),[]);
	}
	,__class__: tools_spark_sliced_core_ServiceFactory
};
var tools_spark_sliced_core_Sliced = function() { };
$hxClasses["tools.spark.sliced.core.Sliced"] = tools_spark_sliced_core_Sliced;
tools_spark_sliced_core_Sliced.__name__ = true;
tools_spark_sliced_core_Sliced.init = function() {
	var l_serviceFactory = new tools_spark_sliced_core_ServiceFactory();
};
tools_spark_sliced_core_Sliced.assignServices = function(p_sound,p_logic,p_input,p_comms,p_event,p_display) {
	tools_spark_framework_Console.log("Init Core (S.L.I.C.E.D.)...");
	tools_spark_sliced_core_Sliced.sound = p_sound;
	tools_spark_sliced_core_Sliced.logic = p_logic;
	tools_spark_sliced_core_Sliced.input = p_input;
	tools_spark_sliced_core_Sliced.comms = p_comms;
	tools_spark_sliced_core_Sliced.event = p_event;
	tools_spark_sliced_core_Sliced.display = p_display;
};
tools_spark_sliced_core_Sliced.update = function() {
	tools_spark_sliced_core_Sliced.input.update();
	tools_spark_sliced_core_Sliced.event.update();
	tools_spark_sliced_core_Sliced.logic.update();
	tools_spark_sliced_core_Sliced.display.update();
	tools_spark_sliced_core_Sliced.comms.update();
};
var tools_spark_sliced_interfaces_IComms = function() { };
$hxClasses["tools.spark.sliced.interfaces.IComms"] = tools_spark_sliced_interfaces_IComms;
tools_spark_sliced_interfaces_IComms.__name__ = true;
tools_spark_sliced_interfaces_IComms.__interfaces__ = [tools_spark_sliced_interfaces_IService];
tools_spark_sliced_interfaces_IComms.prototype = {
	__class__: tools_spark_sliced_interfaces_IComms
};
var tools_spark_sliced_interfaces_IDisplay = function() { };
$hxClasses["tools.spark.sliced.interfaces.IDisplay"] = tools_spark_sliced_interfaces_IDisplay;
tools_spark_sliced_interfaces_IDisplay.__name__ = true;
tools_spark_sliced_interfaces_IDisplay.__interfaces__ = [tools_spark_sliced_interfaces_IService];
tools_spark_sliced_interfaces_IDisplay.prototype = {
	__class__: tools_spark_sliced_interfaces_IDisplay
};
var tools_spark_sliced_interfaces_IEvent = function() { };
$hxClasses["tools.spark.sliced.interfaces.IEvent"] = tools_spark_sliced_interfaces_IEvent;
tools_spark_sliced_interfaces_IEvent.__name__ = true;
tools_spark_sliced_interfaces_IEvent.__interfaces__ = [tools_spark_sliced_interfaces_IService];
tools_spark_sliced_interfaces_IEvent.prototype = {
	__class__: tools_spark_sliced_interfaces_IEvent
};
var tools_spark_sliced_interfaces_IInput = function() { };
$hxClasses["tools.spark.sliced.interfaces.IInput"] = tools_spark_sliced_interfaces_IInput;
tools_spark_sliced_interfaces_IInput.__name__ = true;
tools_spark_sliced_interfaces_IInput.__interfaces__ = [tools_spark_sliced_interfaces_IService];
tools_spark_sliced_interfaces_IInput.prototype = {
	__class__: tools_spark_sliced_interfaces_IInput
};
var tools_spark_sliced_interfaces_ILogic = function() { };
$hxClasses["tools.spark.sliced.interfaces.ILogic"] = tools_spark_sliced_interfaces_ILogic;
tools_spark_sliced_interfaces_ILogic.__name__ = true;
tools_spark_sliced_interfaces_ILogic.__interfaces__ = [tools_spark_sliced_interfaces_IService];
tools_spark_sliced_interfaces_ILogic.prototype = {
	__class__: tools_spark_sliced_interfaces_ILogic
};
var tools_spark_sliced_interfaces_ISound = function() { };
$hxClasses["tools.spark.sliced.interfaces.ISound"] = tools_spark_sliced_interfaces_ISound;
tools_spark_sliced_interfaces_ISound.__name__ = true;
tools_spark_sliced_interfaces_ISound.__interfaces__ = [tools_spark_sliced_interfaces_IService];
var tools_spark_sliced_services_std_comms_core_Comms = function() {
	tools_spark_sliced_core_AService.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.comms.core.Comms"] = tools_spark_sliced_services_std_comms_core_Comms;
tools_spark_sliced_services_std_comms_core_Comms.__name__ = true;
tools_spark_sliced_services_std_comms_core_Comms.__interfaces__ = [tools_spark_sliced_interfaces_IComms];
tools_spark_sliced_services_std_comms_core_Comms.__super__ = tools_spark_sliced_core_AService;
tools_spark_sliced_services_std_comms_core_Comms.prototype = $extend(tools_spark_sliced_core_AService.prototype,{
	_init: function() {
		tools_spark_framework_Console.log("Init Comms std Service...");
		this._socket = new tools_spark_sliced_services_std_comms_sockets_core_pomelo_platform_html5_websocket_Socket();
		this._requestsData = new haxe_ds_StringMap();
		this._serverEventsData = new haxe_ds_StringMap();
		this.isConnected = false;
		this._file_requestsData = new haxe_ds_StringMap();
		this.file_isConnected = false;
	}
	,update: function() {
		this._requestsData = new haxe_ds_StringMap();
		this._serverEventsData = new haxe_ds_StringMap();
		this._file_requestsData = new haxe_ds_StringMap();
	}
	,getRequestData: function(p_requestName) {
		return this._requestsData.get(p_requestName);
	}
	,getServerEventData: function(p_serverEventName) {
		return this._serverEventsData.get(p_serverEventName);
	}
	,connectTo: function(p_hostname,p_port,p_serverIdentifier) {
		var _g = this;
		if(p_serverIdentifier == null) p_serverIdentifier = p_hostname + ":" + p_port;
		var l_connectToCallback = function() {
			_g.isConnected = true;
			_g.connectedServerName = p_serverIdentifier;
			tools_spark_sliced_core_Sliced.event.raiseEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_CONNECTED);
		};
		this._socket.init(p_hostname,p_port,null,l_connectToCallback);
	}
	,request: function(p_remoteRoute,p_message,p_requestIdentifier) {
		var _g = this;
		if(p_requestIdentifier == null) p_requestIdentifier = p_remoteRoute;
		var l_requestCallback = function(p_data) {
			var v = p_data;
			_g._requestsData.set(p_requestIdentifier,v);
			v;
			tools_spark_sliced_core_Sliced.event.raiseEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_REQUEST);
		};
		this._socket.request(p_remoteRoute,p_message,l_requestCallback);
	}
	,disconnect: function() {
		this._socket.disconnect();
		this.isConnected = false;
		this.connectedServerName = null;
	}
	,addServerEvent: function(p_serverEventName,p_serverEventIdentifier) {
		var _g = this;
		if(p_serverEventIdentifier == null) p_serverEventIdentifier = p_serverEventName;
		var l_serverEventCallback = function(p_data) {
			var v = p_data;
			_g._serverEventsData.set(p_serverEventIdentifier,v);
			v;
			tools_spark_sliced_core_Sliced.event.raiseEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_SERVER_EVENT);
		};
		this._socket.on(p_serverEventName,l_serverEventCallback);
	}
	,file_connectTo: function(p_hostname,p_port,p_serverIdentifier) {
		var _g = this;
		if(this.file_isConnected) tools_spark_framework_Console.warn("Attempting to connect to file server: File Transfer already connected. Disconnect first."); else {
			if(p_serverIdentifier == null) p_serverIdentifier = p_hostname + ":" + p_port;
			var l_connectToCallback = function() {
				_g.file_isConnected = true;
				_g.file_connectedServerName = p_serverIdentifier;
				tools_spark_sliced_core_Sliced.event.raiseEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_CONNECTED);
			};
			this._fileTransfer = new tools_spark_sliced_services_std_comms_filetransfer_core_platform_html5_websocket_binaryjs_FileTransfer("ws://" + p_hostname + ":" + p_port);
			this._fileTransfer.onConnected(l_connectToCallback);
		}
	}
	,file_getSendFileRequestData: function(p_fileRequestName) {
		return this._file_requestsData.get(p_fileRequestName);
	}
	,file_disconnect: function() {
		this._fileTransfer.disconnect();
		this.file_isConnected = false;
		this._fileTransfer = null;
		this.file_connectedServerName = null;
	}
	,file_sendFileRequest: function(p_fileReference,p_fileMeta,p_fileRequestIdentifier) {
		var _g = this;
		if(!this.file_isConnected) tools_spark_framework_Console.warn("Attempting to send a file: File Transfer is not connected."); else {
			if(p_fileRequestIdentifier == null) p_fileRequestIdentifier = p_fileMeta.name;
			var clsr_progressBytes = 0;
			var l_requestCallback = function(p_data) {
				clsr_progressBytes += p_data.length;
				p_data.progress = clsr_progressBytes / p_fileMeta.size;
				p_data.progressPercent = Math.round(clsr_progressBytes / p_fileMeta.size * 100);
				var v = p_data;
				_g._file_requestsData.set(p_fileRequestIdentifier,v);
				v;
				tools_spark_sliced_core_Sliced.event.raiseEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_SENDREQUEST);
			};
			this._fileTransfer.sendFile(p_fileReference,p_fileMeta,l_requestCallback);
		}
	}
	,__class__: tools_spark_sliced_services_std_comms_core_Comms
});
var tools_spark_sliced_services_std_comms_filetransfer_interfaces_IFileTransfer = function() { };
$hxClasses["tools.spark.sliced.services.std.comms.filetransfer.interfaces.IFileTransfer"] = tools_spark_sliced_services_std_comms_filetransfer_interfaces_IFileTransfer;
tools_spark_sliced_services_std_comms_filetransfer_interfaces_IFileTransfer.__name__ = true;
tools_spark_sliced_services_std_comms_filetransfer_interfaces_IFileTransfer.prototype = {
	__class__: tools_spark_sliced_services_std_comms_filetransfer_interfaces_IFileTransfer
};
var tools_spark_sliced_services_std_comms_filetransfer_core_platform_html5_websocket_binaryjs_FileTransfer = function(p_address) {
	this._binaryJs = new BinaryClient(p_address);
};
$hxClasses["tools.spark.sliced.services.std.comms.filetransfer.core.platform.html5.websocket.binaryjs.FileTransfer"] = tools_spark_sliced_services_std_comms_filetransfer_core_platform_html5_websocket_binaryjs_FileTransfer;
tools_spark_sliced_services_std_comms_filetransfer_core_platform_html5_websocket_binaryjs_FileTransfer.__name__ = true;
tools_spark_sliced_services_std_comms_filetransfer_core_platform_html5_websocket_binaryjs_FileTransfer.__interfaces__ = [tools_spark_sliced_services_std_comms_filetransfer_interfaces_IFileTransfer];
tools_spark_sliced_services_std_comms_filetransfer_core_platform_html5_websocket_binaryjs_FileTransfer.prototype = {
	onConnected: function(p_callback) {
		this._binaryJs.on("open",p_callback);
	}
	,disconnect: function() {
		this._binaryJs.close();
		this._binaryJs = null;
	}
	,sendFile: function(p_fileReference,p_fileMeta,p_callBack) {
		var l_stream = this._binaryJs.send(p_fileReference,p_fileMeta);
		l_stream.on("data",p_callBack);
	}
	,__class__: tools_spark_sliced_services_std_comms_filetransfer_core_platform_html5_websocket_binaryjs_FileTransfer
};
var tools_spark_sliced_services_std_comms_sockets_interfaces_ISocket = function() { };
$hxClasses["tools.spark.sliced.services.std.comms.sockets.interfaces.ISocket"] = tools_spark_sliced_services_std_comms_sockets_interfaces_ISocket;
tools_spark_sliced_services_std_comms_sockets_interfaces_ISocket.__name__ = true;
tools_spark_sliced_services_std_comms_sockets_interfaces_ISocket.prototype = {
	__class__: tools_spark_sliced_services_std_comms_sockets_interfaces_ISocket
};
var tools_spark_sliced_services_std_comms_sockets_core_pomelo_platform_html5_websocket_Socket = function() {
};
$hxClasses["tools.spark.sliced.services.std.comms.sockets.core.pomelo.platform.html5.websocket.Socket"] = tools_spark_sliced_services_std_comms_sockets_core_pomelo_platform_html5_websocket_Socket;
tools_spark_sliced_services_std_comms_sockets_core_pomelo_platform_html5_websocket_Socket.__name__ = true;
tools_spark_sliced_services_std_comms_sockets_core_pomelo_platform_html5_websocket_Socket.__interfaces__ = [tools_spark_sliced_services_std_comms_sockets_interfaces_ISocket];
tools_spark_sliced_services_std_comms_sockets_core_pomelo_platform_html5_websocket_Socket.prototype = {
	init: function(p_hostName,p_port,p_log,p_callBack) {
		if(p_log == null) p_log = false;
		window.pomelo.init({ host : p_hostName, port : p_port, log : p_log},p_callBack);
	}
	,request: function(p_route,p_msg,p_callBack) {
		window.pomelo.request(p_route,p_msg,p_callBack);
	}
	,on: function(p_route,p_callback) {
		window.pomelo.on(p_route,p_callback);
	}
	,disconnect: function() {
		window.pomelo.disconnect();
	}
	,__class__: tools_spark_sliced_services_std_comms_sockets_core_pomelo_platform_html5_websocket_Socket
};
var tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveSpaceReference = function() { };
$hxClasses["tools.spark.sliced.services.std.display.active_displayentity_references.interfaces.IActiveSpaceReference"] = tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveSpaceReference;
tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveSpaceReference.__name__ = true;
tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveSpaceReference.prototype = {
	__class__: tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveSpaceReference
};
var tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveSpaceReference = function(p_spaceEntity) {
	this.spaceEntity = p_spaceEntity;
};
$hxClasses["tools.spark.sliced.services.std.display.active_displayentity_references.core.ActiveSpaceReference"] = tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveSpaceReference;
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveSpaceReference.__name__ = true;
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveSpaceReference.__interfaces__ = [tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveSpaceReference];
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveSpaceReference.prototype = {
	__class__: tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveSpaceReference
};
var tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageAreaReference = function() { };
$hxClasses["tools.spark.sliced.services.std.display.active_displayentity_references.interfaces.IActiveStageAreaReference"] = tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageAreaReference;
tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageAreaReference.__name__ = true;
tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageAreaReference.prototype = {
	__class__: tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageAreaReference
};
var tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageAreaReference = function(p_stageAreaEntity) {
	this.stageAreaEntity = p_stageAreaEntity;
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.display.active_displayentity_references.core.ActiveStageAreaReference"] = tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageAreaReference;
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageAreaReference.__name__ = true;
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageAreaReference.__interfaces__ = [tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageAreaReference];
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageAreaReference.prototype = {
	_init: function() {
		this.layoutElement = new tools_spark_framework_layout_containers_Group(this.stageAreaEntity,"StageArea",this);
	}
	,__class__: tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageAreaReference
};
var tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageReference = function() { };
$hxClasses["tools.spark.sliced.services.std.display.active_displayentity_references.interfaces.IActiveStageReference"] = tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageReference;
tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageReference.__name__ = true;
tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageReference.prototype = {
	__class__: tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageReference
};
var tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageReference = function(p_stageEntity) {
	this.stageEntity = p_stageEntity;
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.display.active_displayentity_references.core.ActiveStageReference"] = tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageReference;
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageReference.__name__ = true;
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageReference.__interfaces__ = [tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageReference];
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageReference.prototype = {
	_init: function() {
		this.activeViewReferences = new Array();
		this.activeStageAreaReferences = new Array();
		this.layoutRoot = new tools_spark_framework_layout_containers_Group(this.stageEntity,"Stage",this);
		this.layoutManager = new tools_spark_framework_layout_managers_LayoutManager(this.layoutRoot);
		flambe_System.get_stage().resize.connect($bind(this,this._onResize));
	}
	,_onResize: function() {
		this.layoutRoot.explicitWidth = js_Browser.get_window().innerWidth;
		this.layoutRoot.explicitHeight = js_Browser.get_window().innerHeight;
		this.layoutManager.validated = false;
	}
	,addView: function(p_viewReference) {
		this.activeViewReferences.push(p_viewReference);
		this.activeViewReferences.sort($bind(this,this._orderViews));
		this._addLayoutElement(p_viewReference.layoutElement);
	}
	,addStageArea: function(p_stageAreaReference) {
		this.activeStageAreaReferences.push(p_stageAreaReference);
		this._addLayoutElement(p_stageAreaReference.layoutElement);
	}
	,_addLayoutElement: function(p_layoutElement) {
		if(p_layoutElement.layoutableEntity.getState("parent") == "Implicit") this.layoutRoot.children.push(p_layoutElement); else {
			var _g = 0;
			var _g1 = this.activeStageAreaReferences;
			while(_g < _g1.length) {
				var activeStageAreaReference = _g1[_g];
				++_g;
				if(activeStageAreaReference.stageAreaEntity.getState("name") == p_layoutElement.layoutableEntity.getState("parent")) {
					activeStageAreaReference.layoutElement.children.push(p_layoutElement);
					break;
				}
			}
		}
	}
	,_orderViews: function(viewReference1,viewReference2) {
		if(viewReference1.viewEntity.getState("zIndex") > viewReference2.viewEntity.getState("zIndex")) return 1; else if(viewReference1.viewEntity.getState("zIndex") < viewReference2.viewEntity.getState("zIndex")) return -1; else return 0;
	}
	,__class__: tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageReference
};
var tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveViewReference = function() { };
$hxClasses["tools.spark.sliced.services.std.display.active_displayentity_references.interfaces.IActiveViewReference"] = tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveViewReference;
tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveViewReference.__name__ = true;
tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveViewReference.prototype = {
	__class__: tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveViewReference
};
var tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference = function(p_viewEntity) {
	this.viewEntity = p_viewEntity;
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.display.active_displayentity_references.core.ActiveViewReference"] = tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference;
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference.__name__ = true;
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference.__interfaces__ = [tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveViewReference];
tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference.prototype = {
	_init: function() {
		this.layoutElement = new tools_spark_framework_layout_containers_Group(this.viewEntity,"View",this);
	}
	,__class__: tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference
};
var tools_spark_sliced_services_std_display_core_Display = function() {
	tools_spark_sliced_core_AService.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.display.core.Display"] = tools_spark_sliced_services_std_display_core_Display;
tools_spark_sliced_services_std_display_core_Display.__name__ = true;
tools_spark_sliced_services_std_display_core_Display.__interfaces__ = [tools_spark_sliced_interfaces_IDisplay];
tools_spark_sliced_services_std_display_core_Display.__super__ = tools_spark_sliced_core_AService;
tools_spark_sliced_services_std_display_core_Display.prototype = $extend(tools_spark_sliced_core_AService.prototype,{
	_initRenderStateNames: function() {
		this._renderStateNames.set("2DmeshType",true);
		true;
		this._renderStateNames.set("3DmeshType",true);
		true;
		this._renderStateNames.set("touchable",true);
		true;
		this._renderStateNames.set("2DMeshImageForm",true);
		true;
		this._renderStateNames.set("2DMeshSpriterForm",true);
		true;
		this._renderStateNames.set("2DMeshFillRectForm",true);
		true;
		this._renderStateNames.set("2DMeshSpriteForm",true);
		true;
		this._renderStateNames.set("2DMeshSpriterAnimForm",true);
		true;
		this._renderStateNames.set("visibility",true);
		true;
		this._renderStateNames.set("visible",true);
		true;
		this._renderStateNames.set("width",true);
		true;
		this._renderStateNames.set("height",true);
		true;
		this._renderStateNames.set("opacity",true);
		true;
		this._renderStateNames.set("display",true);
		true;
		this._renderStateNames.set("text",true);
		true;
		this._renderStateNames.set("fontSize",true);
		true;
		this._renderStateNames.set("fontColor",true);
		true;
		this._renderStateNames.set("src",true);
		true;
		this._renderStateNames.set("overflow",true);
		true;
		this._renderStateNames.set("spaceX",true);
		true;
		this._renderStateNames.set("spaceY",true);
		true;
		this._renderStateNames.set("spaceZ",true);
		true;
		this._renderStateNames.set("scaleX",true);
		true;
		this._renderStateNames.set("scaleY",true);
		true;
		this._renderStateNames.set("scaleZ",true);
		true;
		this._renderStateNames.set("spaceWidth",true);
		true;
		this._renderStateNames.set("spaceHeight",true);
		true;
		this._renderStateNames.set("stage",true);
		true;
		this._renderStateNames.set("view",true);
		true;
		this._renderStateNames.set("camera",true);
		true;
		this._renderStateNames.set("scene",true);
		true;
		this._renderStateNames.set("space",true);
		true;
		this._renderStateNames.set("active",true);
		true;
	}
	,_init: function() {
		tools_spark_framework_Console.log("Init Display std Service...");
		this._renderStateNames = new haxe_ds_StringMap();
		this._initRenderStateNames();
		this._renderFormStateNames = new haxe_ds_StringMap();
		this._activeReferenceMediator = new tools_spark_sliced_services_std_display_managers_core_ActiveReferenceMediator(this);
		this.platformRendererSet = new haxe_ds_StringMap();
		this._dataBuffer = new tools_spark_sliced_services_std_display_databuffer_core_DataBuffer();
	}
	,setActiveSpace: function(p_spaceEntity) {
		if(p_spaceEntity.getState("displayType") == "Space") {
			this._dataBuffer.addEntry(tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.SET_SPACE,p_spaceEntity);
			return true;
		} else return false;
	}
	,_setActiveSpace: function(p_spaceEntity) {
		if(this._activeReferenceMediator.getActiveSpaceReference(p_spaceEntity) != null) tools_spark_framework_Console.warn("This space object is already bound to the Project. Ignoring..."); else {
			if(this.projectActiveSpaceReference != null) tools_spark_framework_Console.warn("Another space object was already set to this Project! Resetting...");
			this.projectActiveSpaceReference = this._activeReferenceMediator.createSpaceReference(p_spaceEntity);
			this._activeReferenceMediator.spaceReferenceManager.update(this.projectActiveSpaceReference,p_spaceEntity);
		}
	}
	,update: function() {
		var _g = 0;
		var _g1 = this._dataBuffer.dataBuffer;
		while(_g < _g1.length) {
			var f_bufferEntry = _g1[_g];
			++_g;
			var _g2 = f_bufferEntry.type;
			switch(Type.enumIndex(_g2)) {
			case 0:
				this._setActiveSpace(f_bufferEntry.source);
				break;
			case 1:
				var _g3 = f_bufferEntry.source.getState("displayType");
				switch(_g3) {
				case "Space":
					tools_spark_framework_Console.warn("adding something to a space");
					break;
				case "Stage":
					tools_spark_framework_Console.warn("adding something to a stage");
					break;
				case "StageArea":
					tools_spark_framework_Console.warn("adding something to a stageArea");
					break;
				case "View":
					tools_spark_framework_Console.warn("adding something to a view");
					var $it0 = this.platformRendererSet.iterator();
					while( $it0.hasNext() ) {
						var renderer = $it0.next();
						tools_spark_framework_Console.warn("adding something to a view, renderer logic");
					}
					break;
				default:
					var $it1 = this.platformRendererSet.iterator();
					while( $it1.hasNext() ) {
						var renderer1 = $it1.next();
						renderer1.addChild(f_bufferEntry.source,f_bufferEntry.target);
					}
				}
				break;
			case 3:
				var _g31 = f_bufferEntry.source.getState("displayType");
				switch(_g31) {
				case "Space":
					this._activeReferenceMediator.spaceReferenceManager.updateState(this._activeReferenceMediator.getActiveSpaceReference(f_bufferEntry.source),f_bufferEntry.source,f_bufferEntry.field);
					break;
				case "Stage":
					this._activeReferenceMediator.stageReferenceManager.updateState(this._activeReferenceMediator.getActiveStageReference(f_bufferEntry.source),f_bufferEntry.source,f_bufferEntry.field);
					break;
				case "StageArea":
					this._activeReferenceMediator.stageAreaReferenceManager.updateState(this._activeReferenceMediator.getActiveStageAreaReference(f_bufferEntry.source),f_bufferEntry.source,f_bufferEntry.field);
					break;
				case "View":
					this._activeReferenceMediator.viewReferenceManager.updateState(this._activeReferenceMediator.getActiveViewReference(f_bufferEntry.source),f_bufferEntry.source,f_bufferEntry.field);
					var $it2 = this.platformRendererSet.iterator();
					while( $it2.hasNext() ) {
						var renderer2 = $it2.next();
						renderer2.updateState(f_bufferEntry.source,f_bufferEntry.field);
					}
					break;
				default:
					var $it3 = this.platformRendererSet.iterator();
					while( $it3.hasNext() ) {
						var renderer3 = $it3.next();
						renderer3.updateState(f_bufferEntry.source,f_bufferEntry.field);
					}
				}
				break;
			default:
				tools_spark_framework_Console.warn("DISPLAY: Unhandled request: " + Std.string(f_bufferEntry.type));
			}
		}
		this._dataBuffer.clearBuffer();
		if(this.projectActiveSpaceReference != null) this.projectActiveSpaceReference.activeStageReference.layoutManager.validate();
	}
	,addDisplayObjectChild: function(p_gameEntityParent,p_gameEntityChild) {
		if(p_gameEntityParent.getState("displayType") != null && p_gameEntityChild.getState("displayType") != null) this._addChild(p_gameEntityParent,p_gameEntityChild);
	}
	,updateDisplayObjectState: function(p_gameEntity,p_state) {
		if(p_gameEntity.getState("displayType") != null && this._renderStateNames.get(p_state) == true) this._updateState(p_gameEntity,p_state);
	}
	,updateDisplayObjectFormState: function(p_gameEntity,p_state) {
		if(p_gameEntity.getState("displayType") != null && this._renderFormStateNames.get(p_state) == true) this._updateFormState(p_gameEntity,p_state);
	}
	,_addChild: function(p_gameEntityParent,p_gameEntityChild) {
		this._dataBuffer.addEntry(tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.ADDED,p_gameEntityParent,p_gameEntityChild);
	}
	,_updateState: function(p_gameEntity,p_state) {
		this._dataBuffer.addEntry(tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.UPDATED_STATE,p_gameEntity,null,p_state);
	}
	,_updateFormState: function(p_gameEntity,p_state) {
		this._dataBuffer.addEntry(tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.UPDATED_FORM_STATE,p_gameEntity,null,p_state);
	}
	,log: function(message) {
		tools_spark_framework_Console.log(message);
	}
	,info: function(message) {
		tools_spark_framework_Console.info(message);
	}
	,debug: function(message) {
		tools_spark_framework_Console.debug(message);
	}
	,warn: function(message) {
		tools_spark_framework_Console.warn(message);
	}
	,error: function(message) {
		tools_spark_framework_Console.error(message);
	}
	,__class__: tools_spark_sliced_services_std_display_core_Display
});
var tools_spark_sliced_services_std_display_databuffer_interfaces_IBufferEntry = function() { };
$hxClasses["tools.spark.sliced.services.std.display.databuffer.interfaces.IBufferEntry"] = tools_spark_sliced_services_std_display_databuffer_interfaces_IBufferEntry;
tools_spark_sliced_services_std_display_databuffer_interfaces_IBufferEntry.__name__ = true;
tools_spark_sliced_services_std_display_databuffer_interfaces_IBufferEntry.prototype = {
	__class__: tools_spark_sliced_services_std_display_databuffer_interfaces_IBufferEntry
};
var tools_spark_sliced_services_std_display_databuffer_core_BufferEntry = function(p_type,p_source,p_target,p_field) {
	this.type = p_type;
	this.source = p_source;
	this.target = p_target;
	this.field = p_field;
};
$hxClasses["tools.spark.sliced.services.std.display.databuffer.core.BufferEntry"] = tools_spark_sliced_services_std_display_databuffer_core_BufferEntry;
tools_spark_sliced_services_std_display_databuffer_core_BufferEntry.__name__ = true;
tools_spark_sliced_services_std_display_databuffer_core_BufferEntry.__interfaces__ = [tools_spark_sliced_services_std_display_databuffer_interfaces_IBufferEntry];
tools_spark_sliced_services_std_display_databuffer_core_BufferEntry.prototype = {
	__class__: tools_spark_sliced_services_std_display_databuffer_core_BufferEntry
};
var tools_spark_sliced_services_std_display_databuffer_interfaces_IDataBuffer = function() { };
$hxClasses["tools.spark.sliced.services.std.display.databuffer.interfaces.IDataBuffer"] = tools_spark_sliced_services_std_display_databuffer_interfaces_IDataBuffer;
tools_spark_sliced_services_std_display_databuffer_interfaces_IDataBuffer.__name__ = true;
tools_spark_sliced_services_std_display_databuffer_interfaces_IDataBuffer.prototype = {
	__class__: tools_spark_sliced_services_std_display_databuffer_interfaces_IDataBuffer
};
var tools_spark_sliced_services_std_display_databuffer_core_DataBuffer = function() {
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.display.databuffer.core.DataBuffer"] = tools_spark_sliced_services_std_display_databuffer_core_DataBuffer;
tools_spark_sliced_services_std_display_databuffer_core_DataBuffer.__name__ = true;
tools_spark_sliced_services_std_display_databuffer_core_DataBuffer.__interfaces__ = [tools_spark_sliced_services_std_display_databuffer_interfaces_IDataBuffer];
tools_spark_sliced_services_std_display_databuffer_core_DataBuffer.prototype = {
	_init: function() {
		this.dataBuffer = new Array();
	}
	,addEntry: function(p_type,p_source,p_target,p_field) {
		this.dataBuffer.push(new tools_spark_sliced_services_std_display_databuffer_core_BufferEntry(p_type,p_source,p_target,p_field));
	}
	,clearBuffer: function() {
		this.dataBuffer = new Array();
	}
	,__class__: tools_spark_sliced_services_std_display_databuffer_core_DataBuffer
};
var tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType = $hxClasses["tools.spark.sliced.services.std.display.databuffer.interfaces.EBufferEntryType"] = { __ename__ : true, __constructs__ : ["SET_SPACE","ADDED","REMOVED","UPDATED_STATE","UPDATED_FORM_STATE"] };
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.SET_SPACE = ["SET_SPACE",0];
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.SET_SPACE.toString = $estr;
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.SET_SPACE.__enum__ = tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType;
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.ADDED = ["ADDED",1];
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.ADDED.toString = $estr;
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.ADDED.__enum__ = tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType;
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.REMOVED = ["REMOVED",2];
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.REMOVED.toString = $estr;
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.REMOVED.__enum__ = tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType;
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.UPDATED_STATE = ["UPDATED_STATE",3];
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.UPDATED_STATE.toString = $estr;
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.UPDATED_STATE.__enum__ = tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType;
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.UPDATED_FORM_STATE = ["UPDATED_FORM_STATE",4];
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.UPDATED_FORM_STATE.toString = $estr;
tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType.UPDATED_FORM_STATE.__enum__ = tools_spark_sliced_services_std_display_databuffer_interfaces_EBufferEntryType;
var tools_spark_sliced_services_std_display_managers_interfaces_IActiveReferenceMediator = function() { };
$hxClasses["tools.spark.sliced.services.std.display.managers.interfaces.IActiveReferenceMediator"] = tools_spark_sliced_services_std_display_managers_interfaces_IActiveReferenceMediator;
tools_spark_sliced_services_std_display_managers_interfaces_IActiveReferenceMediator.__name__ = true;
tools_spark_sliced_services_std_display_managers_interfaces_IActiveReferenceMediator.prototype = {
	__class__: tools_spark_sliced_services_std_display_managers_interfaces_IActiveReferenceMediator
};
var tools_spark_sliced_services_std_display_managers_core_ActiveReferenceMediator = function(p_display) {
	this.display = p_display;
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.ActiveReferenceMediator"] = tools_spark_sliced_services_std_display_managers_core_ActiveReferenceMediator;
tools_spark_sliced_services_std_display_managers_core_ActiveReferenceMediator.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_ActiveReferenceMediator.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IActiveReferenceMediator];
tools_spark_sliced_services_std_display_managers_core_ActiveReferenceMediator.prototype = {
	_init: function() {
		this.spaceReferenceManager = new tools_spark_sliced_services_std_display_managers_core_SpaceReferenceManager(this);
		this.stageReferenceManager = new tools_spark_sliced_services_std_display_managers_core_StageReferenceManager(this);
		this.viewReferenceManager = new tools_spark_sliced_services_std_display_managers_core_ViewReferenceManager(this);
		this.stageAreaReferenceManager = new tools_spark_sliced_services_std_display_managers_core_StageAreaReferenceManager(this);
	}
	,createSpaceReference: function(p_spaceEntity) {
		return js_Boot.__cast(this.spaceReferenceManager.create(p_spaceEntity) , tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveSpaceReference);
	}
	,createStageReference: function(p_stageEntity) {
		return js_Boot.__cast(this.stageReferenceManager.create(p_stageEntity) , tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageReference);
	}
	,createViewReference: function(p_viewEntity) {
		return js_Boot.__cast(this.viewReferenceManager.create(p_viewEntity) , tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference);
	}
	,createStageAreaReference: function(p_stageAreaEntity) {
		return js_Boot.__cast(this.stageAreaReferenceManager.create(p_stageAreaEntity) , tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageAreaReference);
	}
	,getActiveSpaceReference: function(p_spaceEntity) {
		if(this.display.projectActiveSpaceReference == null) return null;
		if(p_spaceEntity == this.display.projectActiveSpaceReference.spaceEntity) return this.display.projectActiveSpaceReference; else return null;
	}
	,getActiveStageReference: function(p_stageEntity) {
		if(this.display.projectActiveSpaceReference == null) return null; else if(this.display.projectActiveSpaceReference.activeStageReference == null) return null;
		if(p_stageEntity == this.display.projectActiveSpaceReference.activeStageReference.stageEntity) return this.display.projectActiveSpaceReference.activeStageReference; else return null;
	}
	,getActiveViewReference: function(p_viewEntity) {
		if(this.display.projectActiveSpaceReference == null) return null; else if(this.display.projectActiveSpaceReference.activeStageReference == null) return null;
		var _g = 0;
		var _g1 = this.display.projectActiveSpaceReference.activeStageReference.activeViewReferences;
		while(_g < _g1.length) {
			var f_activeViewReference = _g1[_g];
			++_g;
			if(f_activeViewReference.viewEntity == p_viewEntity) return f_activeViewReference;
		}
		return null;
	}
	,getActiveStageAreaReference: function(p_stageAreaEntity) {
		if(this.display.projectActiveSpaceReference == null) return null; else if(this.display.projectActiveSpaceReference.activeStageReference == null) return null;
		var _g = 0;
		var _g1 = this.display.projectActiveSpaceReference.activeStageReference.activeStageAreaReferences;
		while(_g < _g1.length) {
			var f_activeStageAreaReference = _g1[_g];
			++_g;
			if(f_activeStageAreaReference.stageAreaEntity == p_stageAreaEntity) return f_activeStageAreaReference;
		}
		return null;
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_ActiveReferenceMediator
};
var tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager = function() { };
$hxClasses["tools.spark.sliced.services.std.display.managers.interfaces.IDisplayObjectManager"] = tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager;
tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager.prototype = {
	__class__: tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager
};
var tools_spark_sliced_services_std_display_managers_core_DomCameraManager = function(p_renderer) {
	this._renderer = p_renderer;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.DomCameraManager"] = tools_spark_sliced_services_std_display_managers_core_DomCameraManager;
tools_spark_sliced_services_std_display_managers_core_DomCameraManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_DomCameraManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_DomCameraManager.prototype = {
	create: function(p_gameEntity) {
		var l_camera2_5D = new tools_spark_framework_dom2_$5D_DomCamera2_$5D(p_gameEntity);
		return l_camera2_5D;
	}
	,update: function(p_object,p_gameEntity) {
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_DomCameraManager
};
var tools_spark_sliced_services_std_display_managers_core_DomObjectManager = function(p_renderer) {
	this._renderer = p_renderer;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.DomObjectManager"] = tools_spark_sliced_services_std_display_managers_core_DomObjectManager;
tools_spark_sliced_services_std_display_managers_core_DomObjectManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_DomObjectManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_DomObjectManager.prototype = {
	create: function(p_gameEntity) {
		var l_object2_5D = new tools_spark_framework_dom2_$5D_DomEntity2_$5D(p_gameEntity);
		this.update(l_object2_5D,p_gameEntity);
		return l_object2_5D;
	}
	,update: function(p_object,p_gameEntity) {
		var l_entity2_5D;
		l_entity2_5D = js_Boot.__cast(p_object , tools_spark_framework_dom2_$5D_DomEntity2_$5D);
		var _g = 0;
		var _g1 = p_gameEntity.get_children();
		while(_g < _g1.length) {
			var f_childEntity = _g1[_g];
			++_g;
			this.addTo(this._renderer.createObject(f_childEntity),l_entity2_5D);
		}
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
		var l_entity2_5D;
		l_entity2_5D = js_Boot.__cast(p_object , tools_spark_framework_dom2_$5D_DomEntity2_$5D);
		l_entity2_5D.updateState(p_state);
	}
	,addTo: function(p_objectChild,p_objectParent) {
		var l_entity2_5D;
		l_entity2_5D = js_Boot.__cast(p_objectParent , tools_spark_framework_dom2_$5D_DomEntity2_$5D);
		if(p_objectChild != null) l_entity2_5D.addChild(p_objectChild);
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_DomObjectManager
};
var tools_spark_sliced_services_std_display_managers_core_DomSceneManager = function(p_renderer) {
	this._renderer = p_renderer;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.DomSceneManager"] = tools_spark_sliced_services_std_display_managers_core_DomSceneManager;
tools_spark_sliced_services_std_display_managers_core_DomSceneManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_DomSceneManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_DomSceneManager.prototype = {
	create: function(p_gameEntity) {
		var l_scene2_5D = new tools_spark_framework_dom2_$5D_DomScene2_$5D(p_gameEntity);
		this.update(l_scene2_5D,p_gameEntity);
		return l_scene2_5D;
	}
	,update: function(p_object,p_gameEntity) {
		var l_scene2_5D;
		l_scene2_5D = js_Boot.__cast(p_object , tools_spark_framework_dom2_$5D_DomScene2_$5D);
		var _g = 0;
		var _g1 = p_gameEntity.get_children();
		while(_g < _g1.length) {
			var f_childEntity = _g1[_g];
			++_g;
			this.addTo(this._renderer.createObject(f_childEntity),l_scene2_5D);
		}
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
	}
	,addTo: function(p_objectChild,p_objectParent) {
		var l_scene2_5D;
		l_scene2_5D = js_Boot.__cast(p_objectParent , tools_spark_framework_dom2_$5D_DomScene2_$5D);
		if(p_objectChild != null) l_scene2_5D.addChild(p_objectChild);
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_DomSceneManager
};
var tools_spark_sliced_services_std_display_managers_core_DomViewManager = function(p_renderer) {
	this._renderer = p_renderer;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.DomViewManager"] = tools_spark_sliced_services_std_display_managers_core_DomViewManager;
tools_spark_sliced_services_std_display_managers_core_DomViewManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_DomViewManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_DomViewManager.prototype = {
	create: function(p_gameEntity) {
		var l_view2_5D = new tools_spark_framework_dom2_$5D_DomView2_$5D(p_gameEntity);
		this.update(l_view2_5D,p_gameEntity);
		return l_view2_5D;
	}
	,update: function(p_object,p_gameEntity) {
		this.updateState(p_object,p_gameEntity,"scene");
		this.updateState(p_object,p_gameEntity,"camera");
		this.updateState(p_object,p_gameEntity,"visible");
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
		var l_view2_5D;
		l_view2_5D = js_Boot.__cast(p_object , tools_spark_framework_dom2_$5D_DomView2_$5D);
		switch(p_state) {
		case "scene":
			var l_sceneEntity = p_gameEntity.getState(p_state);
			l_view2_5D.set_scene(this._renderer.createScene(l_sceneEntity));
			break;
		case "camera":
			var l_cameraEntity = p_gameEntity.getState(p_state);
			l_view2_5D.set_camera(this._renderer.createCamera(l_cameraEntity));
			break;
		case "visible":
			l_view2_5D.updateState(p_state);
			break;
		}
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_DomViewManager
};
var tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DCameraManager = function(p_renderer) {
	this._renderer = p_renderer;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.Flambe2_5DCameraManager"] = tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DCameraManager;
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DCameraManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DCameraManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DCameraManager.prototype = {
	create: function(p_gameEntity) {
		var l_camera2_5D = new tools_spark_framework_flambe2_$5D_FlambeCamera2_$5D(p_gameEntity);
		return l_camera2_5D;
	}
	,update: function(p_object,p_gameEntity) {
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DCameraManager
};
var tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DObjectManager = function(p_renderer) {
	this._renderer = p_renderer;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.Flambe2_5DObjectManager"] = tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DObjectManager;
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DObjectManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DObjectManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DObjectManager.prototype = {
	create: function(p_gameEntity) {
		var l_object2_5D = new tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D(p_gameEntity);
		this.update(l_object2_5D,p_gameEntity);
		return l_object2_5D;
	}
	,update: function(p_object,p_gameEntity) {
		var l_entity2_5D;
		l_entity2_5D = js_Boot.__cast(p_object , tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D);
		var _g = 0;
		var _g1 = p_gameEntity.get_children();
		while(_g < _g1.length) {
			var f_childEntity = _g1[_g];
			++_g;
			this.addTo(this._renderer.createObject(f_childEntity),l_entity2_5D);
		}
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
		var l_entity2_5D;
		l_entity2_5D = js_Boot.__cast(p_object , tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D);
		l_entity2_5D.updateState(p_state);
	}
	,addTo: function(p_objectChild,p_objectParent) {
		var l_entity2_5D;
		l_entity2_5D = js_Boot.__cast(p_objectParent , tools_spark_framework_flambe2_$5D_FlambeEntity2_$5D);
		if(p_objectChild != null) l_entity2_5D.addChild(p_objectChild);
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DObjectManager
};
var tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DSceneManager = function(p_renderer) {
	this._renderer = p_renderer;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.Flambe2_5DSceneManager"] = tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DSceneManager;
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DSceneManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DSceneManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DSceneManager.prototype = {
	create: function(p_gameEntity) {
		var l_scene2_5D = new tools_spark_framework_flambe2_$5D_FlambeScene2_$5D(p_gameEntity);
		this.update(l_scene2_5D,p_gameEntity);
		return l_scene2_5D;
	}
	,update: function(p_object,p_gameEntity) {
		var l_scene2_5D;
		l_scene2_5D = js_Boot.__cast(p_object , tools_spark_framework_flambe2_$5D_FlambeScene2_$5D);
		var _g = 0;
		var _g1 = p_gameEntity.get_children();
		while(_g < _g1.length) {
			var f_childEntity = _g1[_g];
			++_g;
			this.addTo(this._renderer.createObject(f_childEntity),l_scene2_5D);
		}
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
	}
	,addTo: function(p_objectChild,p_objectParent) {
		var l_scene2_5D;
		l_scene2_5D = js_Boot.__cast(p_objectParent , tools_spark_framework_flambe2_$5D_FlambeScene2_$5D);
		if(p_objectChild != null) l_scene2_5D.addChild(p_objectChild);
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DSceneManager
};
var tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DViewManager = function(p_renderer,p_flambeGraphics) {
	this._renderer = p_renderer;
	this._flambeGraphics = p_flambeGraphics;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.Flambe2_5DViewManager"] = tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DViewManager;
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DViewManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DViewManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DViewManager.prototype = {
	create: function(p_gameEntity) {
		var l_view2_5D = new tools_spark_framework_flambe2_$5D_FlambeView2_$5D(p_gameEntity,this._flambeGraphics);
		this.update(l_view2_5D,p_gameEntity);
		return l_view2_5D;
	}
	,update: function(p_object,p_gameEntity) {
		this.updateState(p_object,p_gameEntity,"scene");
		this.updateState(p_object,p_gameEntity,"camera");
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
		var l_view2_5D;
		l_view2_5D = js_Boot.__cast(p_object , tools_spark_framework_flambe2_$5D_FlambeView2_$5D);
		switch(p_state) {
		case "scene":
			var l_sceneEntity = p_gameEntity.getState(p_state);
			l_view2_5D.set_scene(this._renderer.createScene(l_sceneEntity));
			break;
		case "camera":
			var l_cameraEntity = p_gameEntity.getState(p_state);
			l_view2_5D.set_camera(this._renderer.createCamera(l_cameraEntity));
			break;
		}
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DViewManager
};
var tools_spark_sliced_services_std_display_managers_core_SpaceReferenceManager = function(p_activeReferenceMediator) {
	this._activeReferenceMediator = p_activeReferenceMediator;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.SpaceReferenceManager"] = tools_spark_sliced_services_std_display_managers_core_SpaceReferenceManager;
tools_spark_sliced_services_std_display_managers_core_SpaceReferenceManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_SpaceReferenceManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_SpaceReferenceManager.prototype = {
	create: function(p_gameEntity) {
		var l_spaceReference = new tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveSpaceReference(p_gameEntity);
		return l_spaceReference;
	}
	,update: function(p_object,p_gameEntity) {
		if(p_object == null) return;
		this.updateState(p_object,p_gameEntity,"stage");
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
		if(p_object == null) return;
		var l_spaceReference;
		l_spaceReference = js_Boot.__cast(p_object , tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveSpaceReference);
		switch(p_state) {
		case "stage":
			if(p_gameEntity.getState(p_state) != null) this._setStage(l_spaceReference,this._activeReferenceMediator.createStageReference(p_gameEntity.getState(p_state)),p_gameEntity.getState(p_state));
			break;
		}
	}
	,_setStage: function(p_spaceReference,p_stageReference,p_stageEntity) {
		if(this._activeReferenceMediator.getActiveStageReference(p_stageEntity) != null) tools_spark_framework_Console.warn("This stage object [" + Std.string(p_stageEntity.getState("name")) + "] is already bound to the Active Space. Ignoring..."); else {
			if(this._activeReferenceMediator.display.projectActiveSpaceReference.activeStageReference != null) tools_spark_framework_Console.warn("Another stage object was already set to this Project! Resetting...");
			p_spaceReference.activeStageReference = p_stageReference;
			this._activeReferenceMediator.stageReferenceManager.update(p_stageReference,p_stageEntity);
		}
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_SpaceReferenceManager
};
var tools_spark_sliced_services_std_display_managers_core_StageAreaReferenceManager = function(p_activeReferenceMediator) {
	this._activeReferenceMediator = p_activeReferenceMediator;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.StageAreaReferenceManager"] = tools_spark_sliced_services_std_display_managers_core_StageAreaReferenceManager;
tools_spark_sliced_services_std_display_managers_core_StageAreaReferenceManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_StageAreaReferenceManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_StageAreaReferenceManager.prototype = {
	create: function(p_gameEntity) {
		var l_stageAreaReference = new tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageAreaReference(p_gameEntity);
		return l_stageAreaReference;
	}
	,update: function(p_object,p_gameEntity) {
		if(p_object == null) return;
		var l_stageAreaReference;
		l_stageAreaReference = js_Boot.__cast(p_object , tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageAreaReference);
		l_stageAreaReference.layoutElement.update();
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
		if(p_object == null) return;
		var l_stageAreaReference;
		l_stageAreaReference = js_Boot.__cast(p_object , tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageAreaReference);
		l_stageAreaReference.layoutElement.updateState(p_state);
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_StageAreaReferenceManager
};
var tools_spark_sliced_services_std_display_managers_core_StageReferenceManager = function(p_activeReferenceMediator) {
	this._activeReferenceMediator = p_activeReferenceMediator;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.StageReferenceManager"] = tools_spark_sliced_services_std_display_managers_core_StageReferenceManager;
tools_spark_sliced_services_std_display_managers_core_StageReferenceManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_StageReferenceManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_StageReferenceManager.prototype = {
	create: function(p_gameEntity) {
		var l_stageReference = new tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageReference(p_gameEntity);
		return l_stageReference;
	}
	,update: function(p_object,p_gameEntity) {
		if(p_object == null) return;
		var l_stageReference;
		l_stageReference = js_Boot.__cast(p_object , tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageReference);
		this.updateState(l_stageReference,p_gameEntity,"test");
		this.updateState(l_stageReference,p_gameEntity,"width");
		this.updateState(l_stageReference,p_gameEntity,"height");
		l_stageReference.layoutRoot.update();
		l_stageReference.layoutRoot.explicitWidth = flambe_System.get_stage().get_width();
		l_stageReference.layoutRoot.explicitHeight = flambe_System.get_stage().get_height();
		var _g = 0;
		var _g1 = p_gameEntity.getChildren();
		while(_g < _g1.length) {
			var f_stageChildEntity = _g1[_g];
			++_g;
			this.addTo(f_stageChildEntity,l_stageReference);
		}
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
		if(p_object == null) return;
		var l_activeStageReference;
		l_activeStageReference = js_Boot.__cast(p_object , tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveStageReference);
		switch(p_state) {
		case "width":
			break;
		case "height":
			break;
		}
	}
	,addTo: function(p_objectChild,p_objectParent) {
		if(p_objectParent == null) return;
		var l_stageReference;
		l_stageReference = js_Boot.__cast(p_objectParent , tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveStageReference);
		var l_stageChildEntity;
		l_stageChildEntity = js_Boot.__cast(p_objectChild , tools_spark_sliced_services_std_logic_gde_core_GameEntity);
		if(l_stageChildEntity.getState("displayType") == "View") this._addView(l_stageReference,this._activeReferenceMediator.createViewReference(l_stageChildEntity),l_stageChildEntity); else if(l_stageChildEntity.getState("displayType") == "StageArea") this._addStageArea(l_stageReference,this._activeReferenceMediator.createStageAreaReference(l_stageChildEntity),l_stageChildEntity); else tools_spark_framework_Console.warn("A child of a Stage gameEntity is NOT a View or a StageArea! Ignoring...");
	}
	,_addView: function(p_stageReference,p_viewReference,p_viewEntity) {
		if(this._activeReferenceMediator.getActiveViewReference(p_viewEntity) != null) tools_spark_framework_Console.warn("This view object [" + Std.string(p_viewEntity.getState("name")) + "] is already bound to the Active Stage. Ignoring..."); else if(p_viewEntity.getState("scene") == null || p_viewEntity.getState("camera") == null) tools_spark_framework_Console.warn("This view object [" + Std.string(p_viewEntity.getState("name")) + "] is not ready yet (missing camera or scene). Ignoring..."); else {
			p_stageReference.addView(p_viewReference);
			this._activeReferenceMediator.viewReferenceManager.update(p_viewReference,p_viewEntity);
		}
	}
	,_addStageArea: function(p_stageReference,p_stageAreaReference,p_stageAreaEntity) {
		if(this._activeReferenceMediator.getActiveStageAreaReference(p_stageAreaEntity) != null) tools_spark_framework_Console.warn("This stageArea object [" + Std.string(p_stageAreaEntity.getState("name")) + "] is already bound to the Active Stage. Ignoring..."); else {
			p_stageReference.addStageArea(p_stageAreaReference);
			this._activeReferenceMediator.stageAreaReferenceManager.update(p_stageAreaReference,p_stageAreaEntity);
		}
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_StageReferenceManager
};
var tools_spark_sliced_services_std_display_managers_core_ViewReferenceManager = function(p_activeReferenceMediator) {
	this._activeReferenceMediator = p_activeReferenceMediator;
};
$hxClasses["tools.spark.sliced.services.std.display.managers.core.ViewReferenceManager"] = tools_spark_sliced_services_std_display_managers_core_ViewReferenceManager;
tools_spark_sliced_services_std_display_managers_core_ViewReferenceManager.__name__ = true;
tools_spark_sliced_services_std_display_managers_core_ViewReferenceManager.__interfaces__ = [tools_spark_sliced_services_std_display_managers_interfaces_IDisplayObjectManager];
tools_spark_sliced_services_std_display_managers_core_ViewReferenceManager.prototype = {
	create: function(p_gameEntity) {
		var l_viewReference = new tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference(p_gameEntity);
		return l_viewReference;
	}
	,update: function(p_object,p_gameEntity) {
		if(p_object == null) return;
		var l_viewReference;
		l_viewReference = js_Boot.__cast(p_object , tools_spark_sliced_services_std_display_active_$displayentity_$references_interfaces_IActiveViewReference);
		this.updateState(l_viewReference,p_gameEntity,"scene");
		this.updateState(l_viewReference,p_gameEntity,"camera");
		l_viewReference.layoutElement.update();
		this._updateRenderer(l_viewReference);
	}
	,updateState: function(p_object,p_gameEntity,p_state) {
		if(p_object == null) return;
		switch(p_state) {
		case "scene":
			this._updateRenderer(js_Boot.__cast(p_object , tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference));
			break;
		case "camera":
			this._updateRenderer(js_Boot.__cast(p_object , tools_spark_sliced_services_std_display_active_$displayentity_$references_core_ActiveViewReference));
			break;
		}
	}
	,_updateRenderer: function(p_viewReference) {
		if(p_viewReference.renderer == null) {
			if(p_viewReference.viewEntity.getState("renderer") != "Implicit") {
				var key = p_viewReference.viewEntity.getState("renderer");
				p_viewReference.renderer = this._activeReferenceMediator.display.platformRendererSet.get(key);
			} else tools_spark_framework_Console.error("Implicit Renderer selection has not been implemented yet. View " + Std.string(p_viewReference.viewEntity.getState("name")) + " cannot be rendered!");
			if(p_viewReference.renderer != null) p_viewReference.renderer.createView(p_viewReference.viewEntity); else tools_spark_framework_Console.error("Could not create renderer: " + Std.string(p_viewReference.viewEntity.getState("renderer")) + ".");
		}
	}
	,__class__: tools_spark_sliced_services_std_display_managers_core_ViewReferenceManager
};
var tools_spark_sliced_services_std_display_renderers_interfaces_IRenderer = function() { };
$hxClasses["tools.spark.sliced.services.std.display.renderers.interfaces.IRenderer"] = tools_spark_sliced_services_std_display_renderers_interfaces_IRenderer;
tools_spark_sliced_services_std_display_renderers_interfaces_IRenderer.__name__ = true;
var tools_spark_sliced_services_std_display_renderers_core_ARenderer = function() {
	this._aRendererInit();
};
$hxClasses["tools.spark.sliced.services.std.display.renderers.core.ARenderer"] = tools_spark_sliced_services_std_display_renderers_core_ARenderer;
tools_spark_sliced_services_std_display_renderers_core_ARenderer.__name__ = true;
tools_spark_sliced_services_std_display_renderers_core_ARenderer.__interfaces__ = [tools_spark_sliced_services_std_display_renderers_interfaces_IRenderer];
tools_spark_sliced_services_std_display_renderers_core_ARenderer.prototype = {
	_aRendererInit: function() {
	}
	,__class__: tools_spark_sliced_services_std_display_renderers_core_ARenderer
};
var tools_spark_sliced_services_std_display_renderers_interfaces_IDimensionSpecificRenderer = function() { };
$hxClasses["tools.spark.sliced.services.std.display.renderers.interfaces.IDimensionSpecificRenderer"] = tools_spark_sliced_services_std_display_renderers_interfaces_IDimensionSpecificRenderer;
tools_spark_sliced_services_std_display_renderers_interfaces_IDimensionSpecificRenderer.__name__ = true;
tools_spark_sliced_services_std_display_renderers_interfaces_IDimensionSpecificRenderer.__interfaces__ = [tools_spark_sliced_services_std_display_renderers_interfaces_IRenderer];
var tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer = function() {
	tools_spark_sliced_services_std_display_renderers_core_ARenderer.call(this);
	this._a2DRendererInit();
};
$hxClasses["tools.spark.sliced.services.std.display.renderers.core.dimension.A2_5DRenderer"] = tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer;
tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer.__name__ = true;
tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer.__interfaces__ = [tools_spark_sliced_services_std_display_renderers_interfaces_IDimensionSpecificRenderer];
tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer.__super__ = tools_spark_sliced_services_std_display_renderers_core_ARenderer;
tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer.prototype = $extend(tools_spark_sliced_services_std_display_renderers_core_ARenderer.prototype,{
	_a2DRendererInit: function() {
	}
	,__class__: tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer
});
var tools_spark_sliced_services_std_display_renderers_interfaces_ILibrarySpecificRenderer = function() { };
$hxClasses["tools.spark.sliced.services.std.display.renderers.interfaces.ILibrarySpecificRenderer"] = tools_spark_sliced_services_std_display_renderers_interfaces_ILibrarySpecificRenderer;
tools_spark_sliced_services_std_display_renderers_interfaces_ILibrarySpecificRenderer.__name__ = true;
tools_spark_sliced_services_std_display_renderers_interfaces_ILibrarySpecificRenderer.__interfaces__ = [tools_spark_sliced_services_std_display_renderers_interfaces_IDimensionSpecificRenderer];
tools_spark_sliced_services_std_display_renderers_interfaces_ILibrarySpecificRenderer.prototype = {
	__class__: tools_spark_sliced_services_std_display_renderers_interfaces_ILibrarySpecificRenderer
};
var tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer = function() {
	tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer.call(this);
	this._aFlambe2_5dRendererInit();
};
$hxClasses["tools.spark.sliced.services.std.display.renderers.core.library.AFlambe2_5DRenderer"] = tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer;
tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer.__name__ = true;
tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer.__interfaces__ = [tools_spark_sliced_services_std_display_renderers_interfaces_ILibrarySpecificRenderer];
tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer.__super__ = tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer;
tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer.prototype = $extend(tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer.prototype,{
	_aFlambe2_5dRendererInit: function() {
		this._internalGraphics = this._platform.getRenderer().graphics;
		if(this._internalGraphics == null) tools_spark_framework_Console.error("Flambe renderer does NOT have internal graphics!");
		this._views = new haxe_ds_ObjectMap();
		this._scenes = new haxe_ds_ObjectMap();
		this._cameras = new haxe_ds_ObjectMap();
		this._objects = new haxe_ds_ObjectMap();
		this._viewManager = new tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DViewManager(this,this._internalGraphics);
		this._sceneManager = new tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DSceneManager(this);
		this._cameraManager = new tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DCameraManager(this);
		this._objectManager = new tools_spark_sliced_services_std_display_managers_core_Flambe2_$5DObjectManager(this);
	}
	,renderView: function(p_viewEntity) {
		this._views.get(p_viewEntity).render();
	}
	,createView: function(p_viewEntity) {
		if(this._views.get(p_viewEntity) != null) tools_spark_framework_Console.warn("View " + Std.string(p_viewEntity.getState("name")) + " has already been added to this Flambe2_5DRenderer. Ignoring..."); else {
			var v;
			v = js_Boot.__cast(this._viewManager.create(p_viewEntity) , tools_spark_framework_flambe2_$5D_FlambeView2_$5D);
			this._views.set(p_viewEntity,v);
			v;
		}
		return this._views.get(p_viewEntity);
	}
	,createScene: function(p_sceneEntity) {
		if(this._scenes.get(p_sceneEntity) != null) tools_spark_framework_Console.warn("Scene " + Std.string(p_sceneEntity.getState("name")) + " has already been added to this Flambe2_5DRenderer. Ignoring..."); else {
			var v;
			v = js_Boot.__cast(this._sceneManager.create(p_sceneEntity) , tools_spark_framework_flambe2_$5D_FlambeScene2_$5D);
			this._scenes.set(p_sceneEntity,v);
			v;
		}
		return this._scenes.get(p_sceneEntity);
	}
	,createCamera: function(p_cameraEntity) {
		if(this._cameras.get(p_cameraEntity) != null) tools_spark_framework_Console.warn("Camera " + Std.string(p_cameraEntity.getState("name")) + " has already been added to this Flambe2_5DRenderer. Ignoring..."); else {
			var v;
			v = js_Boot.__cast(this._cameraManager.create(p_cameraEntity) , tools_spark_framework_flambe2_$5D_FlambeCamera2_$5D);
			this._cameras.set(p_cameraEntity,v);
			v;
		}
		return this._cameras.get(p_cameraEntity);
	}
	,createObject: function(p_objectEntity) {
		if(p_objectEntity.getState("displayType") == "Entity") {
			if(this._objects.get(p_objectEntity) != null) tools_spark_framework_Console.warn("Object " + Std.string(p_objectEntity.getState("name")) + " has already been added to this Flambe2_5DRenderer. Ignoring..."); else {
				var v;
				v = js_Boot.__cast(this._objectManager.create(p_objectEntity) , tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D);
				this._objects.set(p_objectEntity,v);
				v;
			}
			return this._objects.get(p_objectEntity);
		} else return null;
	}
	,addChild: function(p_parentEntity,p_childEntity) {
		var _g = p_parentEntity.getState("displayType");
		switch(_g) {
		case "Scene":
			if(this._scenes.get(p_parentEntity) != null) this._sceneManager.addTo(this.createObject(p_childEntity),this._scenes.get(p_parentEntity));
			break;
		case "Entity":
			if(this._objects.get(p_parentEntity) != null) this._objectManager.addTo(this.createObject(p_childEntity),this._objects.get(p_parentEntity));
			break;
		default:
			tools_spark_framework_Console.warn("AFlambe2_5DRenderer: Unhandled add child request: " + Std.string(p_parentEntity.getState("displayType")));
		}
	}
	,updateState: function(p_objectEntity,p_state) {
		if(this._objects.get(p_objectEntity) != null) this._objectManager.updateState(this._objects.get(p_objectEntity),p_objectEntity,p_state); else if(this._views.get(p_objectEntity) != null) this._viewManager.updateState(this._views.get(p_objectEntity),p_objectEntity,p_state);
	}
	,__class__: tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer
});
var tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer = function() {
	tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer.call(this);
};
$hxClasses["tools.spark.sliced.services.std.display.renderers.core.library.ANativeControls2_5DRenderer"] = tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer;
tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer.__name__ = true;
tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer.__interfaces__ = [tools_spark_sliced_services_std_display_renderers_interfaces_ILibrarySpecificRenderer];
tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer.__super__ = tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer;
tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer.prototype = $extend(tools_spark_sliced_services_std_display_renderers_core_dimension_A2_$5DRenderer.prototype,{
	renderView: function(p_viewEntity) {
	}
	,createView: function(p_viewEntity) {
		return null;
	}
	,createScene: function(p_sceneEntity) {
		return null;
	}
	,createCamera: function(p_cameraEntity) {
		return null;
	}
	,createObject: function(p_objectEntity) {
		return null;
	}
	,addChild: function(p_parentEntity,p_childEntity) {
	}
	,updateState: function(p_objectEntity,p_state) {
	}
	,__class__: tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer
});
var tools_spark_sliced_services_std_display_renderers_interfaces_IPlatformSpecificRenderer = function() { };
$hxClasses["tools.spark.sliced.services.std.display.renderers.interfaces.IPlatformSpecificRenderer"] = tools_spark_sliced_services_std_display_renderers_interfaces_IPlatformSpecificRenderer;
tools_spark_sliced_services_std_display_renderers_interfaces_IPlatformSpecificRenderer.__name__ = true;
tools_spark_sliced_services_std_display_renderers_interfaces_IPlatformSpecificRenderer.__interfaces__ = [tools_spark_sliced_services_std_display_renderers_interfaces_ILibrarySpecificRenderer];
var tools_spark_sliced_services_std_display_renderers_core_platform_html_Flambe2_$5DHtmlRenderer = function() {
	this._platform = flambe_platform_html_HtmlPlatform.instance;
	tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer.call(this);
	this._flambe2DHtmlRendererInit();
};
$hxClasses["tools.spark.sliced.services.std.display.renderers.core.platform.html.Flambe2_5DHtmlRenderer"] = tools_spark_sliced_services_std_display_renderers_core_platform_html_Flambe2_$5DHtmlRenderer;
tools_spark_sliced_services_std_display_renderers_core_platform_html_Flambe2_$5DHtmlRenderer.__name__ = true;
tools_spark_sliced_services_std_display_renderers_core_platform_html_Flambe2_$5DHtmlRenderer.__interfaces__ = [tools_spark_sliced_services_std_display_renderers_interfaces_IPlatformSpecificRenderer];
tools_spark_sliced_services_std_display_renderers_core_platform_html_Flambe2_$5DHtmlRenderer.__super__ = tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer;
tools_spark_sliced_services_std_display_renderers_core_platform_html_Flambe2_$5DHtmlRenderer.prototype = $extend(tools_spark_sliced_services_std_display_renderers_core_library_AFlambe2_$5DRenderer.prototype,{
	_flambe2DHtmlRendererInit: function() {
		tools_spark_framework_Console.info("Creating Flambe 2_5D Html Renderer...");
	}
	,__class__: tools_spark_sliced_services_std_display_renderers_core_platform_html_Flambe2_$5DHtmlRenderer
});
var tools_spark_sliced_services_std_display_renderers_core_platform_html_NativeControlsHtmlRenderer = function() {
	tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer.call(this);
	this._nativeControlsHtmlRendererInit();
};
$hxClasses["tools.spark.sliced.services.std.display.renderers.core.platform.html.NativeControlsHtmlRenderer"] = tools_spark_sliced_services_std_display_renderers_core_platform_html_NativeControlsHtmlRenderer;
tools_spark_sliced_services_std_display_renderers_core_platform_html_NativeControlsHtmlRenderer.__name__ = true;
tools_spark_sliced_services_std_display_renderers_core_platform_html_NativeControlsHtmlRenderer.__interfaces__ = [tools_spark_sliced_services_std_display_renderers_interfaces_IPlatformSpecificRenderer];
tools_spark_sliced_services_std_display_renderers_core_platform_html_NativeControlsHtmlRenderer.__super__ = tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer;
tools_spark_sliced_services_std_display_renderers_core_platform_html_NativeControlsHtmlRenderer.prototype = $extend(tools_spark_sliced_services_std_display_renderers_core_library_ANativeControls2_$5DRenderer.prototype,{
	_nativeControlsHtmlRendererInit: function() {
		tools_spark_framework_Console.info("Creating Native Controls Html (DOM) Renderer...");
		this._views = new haxe_ds_ObjectMap();
		this._scenes = new haxe_ds_ObjectMap();
		this._cameras = new haxe_ds_ObjectMap();
		this._objects = new haxe_ds_ObjectMap();
		this._viewManager = new tools_spark_sliced_services_std_display_managers_core_DomViewManager(this);
		this._sceneManager = new tools_spark_sliced_services_std_display_managers_core_DomSceneManager(this);
		this._cameraManager = new tools_spark_sliced_services_std_display_managers_core_DomCameraManager(this);
		this._objectManager = new tools_spark_sliced_services_std_display_managers_core_DomObjectManager(this);
	}
	,renderView: function(p_viewEntity) {
		this._views.get(p_viewEntity).render();
	}
	,createView: function(p_viewEntity) {
		if(this._views.get(p_viewEntity) != null) tools_spark_framework_Console.warn("View " + Std.string(p_viewEntity.getState("name")) + " has already been added to this NativeControlsHtmlRenderer. Ignoring..."); else {
			var v;
			v = js_Boot.__cast(this._viewManager.create(p_viewEntity) , tools_spark_framework_dom2_$5D_DomView2_$5D);
			this._views.set(p_viewEntity,v);
			v;
		}
		return this._views.get(p_viewEntity);
	}
	,createScene: function(p_sceneEntity) {
		if(this._scenes.get(p_sceneEntity) != null) tools_spark_framework_Console.warn("Scene " + Std.string(p_sceneEntity.getState("name")) + " has already been added to this NativeControlsHtmlRenderer. Ignoring..."); else {
			var v;
			v = js_Boot.__cast(this._sceneManager.create(p_sceneEntity) , tools_spark_framework_dom2_$5D_DomScene2_$5D);
			this._scenes.set(p_sceneEntity,v);
			v;
		}
		return this._scenes.get(p_sceneEntity);
	}
	,createCamera: function(p_cameraEntity) {
		if(this._cameras.get(p_cameraEntity) != null) tools_spark_framework_Console.warn("Camera " + Std.string(p_cameraEntity.getState("name")) + " has already been added to this NativeControlsHtmlRenderer. Ignoring..."); else {
			var v;
			v = js_Boot.__cast(this._cameraManager.create(p_cameraEntity) , tools_spark_framework_dom2_$5D_DomCamera2_$5D);
			this._cameras.set(p_cameraEntity,v);
			v;
		}
		return this._cameras.get(p_cameraEntity);
	}
	,createObject: function(p_objectEntity) {
		if(p_objectEntity.getState("displayType") == "Entity") {
			if(this._objects.get(p_objectEntity) != null) tools_spark_framework_Console.warn("Object " + Std.string(p_objectEntity.getState("name")) + " has already been added to this NativeControlsHtmlRenderer. Ignoring..."); else {
				var v;
				v = js_Boot.__cast(this._objectManager.create(p_objectEntity) , tools_spark_framework_space2_$5D_core_AObjectContainer2_$5D);
				this._objects.set(p_objectEntity,v);
				v;
			}
			return this._objects.get(p_objectEntity);
		} else return null;
	}
	,addChild: function(p_parentEntity,p_childEntity) {
		var _g = p_parentEntity.getState("displayType");
		switch(_g) {
		case "Scene":
			if(this._scenes.get(p_parentEntity) != null) this._sceneManager.addTo(this.createObject(p_childEntity),this._scenes.get(p_parentEntity));
			break;
		case "Entity":
			if(this._objects.get(p_parentEntity) != null) this._objectManager.addTo(this.createObject(p_childEntity),this._objects.get(p_parentEntity));
			break;
		default:
			tools_spark_framework_Console.warn("NativeControlsHtmlRenderer: Unhandled add child request: " + Std.string(p_parentEntity.getState("displayType")));
		}
	}
	,updateState: function(p_objectEntity,p_state) {
		if(this._objects.get(p_objectEntity) != null) this._objectManager.updateState(this._objects.get(p_objectEntity),p_objectEntity,p_state); else if(this._views.get(p_objectEntity) != null) this._viewManager.updateState(this._views.get(p_objectEntity),p_objectEntity,p_state);
	}
	,__class__: tools_spark_sliced_services_std_display_renderers_core_platform_html_NativeControlsHtmlRenderer
});
var tools_spark_sliced_services_std_event_core_Event = function() {
	tools_spark_sliced_core_AService.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.event.core.Event"] = tools_spark_sliced_services_std_event_core_Event;
tools_spark_sliced_services_std_event_core_Event.__name__ = true;
tools_spark_sliced_services_std_event_core_Event.__interfaces__ = [tools_spark_sliced_interfaces_IEvent];
tools_spark_sliced_services_std_event_core_Event.__super__ = tools_spark_sliced_core_AService;
tools_spark_sliced_services_std_event_core_Event.prototype = $extend(tools_spark_sliced_core_AService.prototype,{
	_init: function() {
		tools_spark_framework_Console.log("Init Event std Service...");
		this._NO_FILTER = new Array();
		this._FILTER_VARIABLE_USER_ENTITY = new Array();
		this._eventTypeFilterFlags = new haxe_ds_EnumValueMap();
		this._eventTypeFilterTriggers = new haxe_ds_EnumValueMap();
		this._initPrefabConvertToTypeMap();
		this._initPrefabConvertToFilterMap();
	}
	,addTrigger: function(p_gameTrigger) {
		var l_eventType = this._prefabConvertToType.get(p_gameTrigger.eventPrefab);
		var l_eventFilter = this._prefabConvertToFilter.get(p_gameTrigger.eventPrefab);
		if(l_eventFilter == this._FILTER_VARIABLE_USER_ENTITY) l_eventFilter = p_gameTrigger.parentEntity;
		if(this._eventTypeFilterTriggers.exists(l_eventType) == false) {
			var value = new haxe_ds_ObjectMap();
			this._eventTypeFilterTriggers.set(l_eventType,value);
		}
		if(this._eventTypeFilterTriggers.get(l_eventType).exists(l_eventFilter) == false) this._eventTypeFilterTriggers.get(l_eventType).set(l_eventFilter,new Array());
		this._eventTypeFilterTriggers.get(l_eventType).get(l_eventFilter).push(p_gameTrigger);
		if(l_eventType == tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT_CLICK || l_eventType == tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_RIGHT_CLICK || l_eventType == tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_ENTERED || l_eventType == tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_MOVED || l_eventType == tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT) tools_spark_sliced_core_Sliced.input.pointer.registerTrigger(l_eventType,l_eventFilter);
	}
	,raiseEvent: function(p_eventType,p_eventFilter) {
		if(p_eventFilter == null) p_eventFilter = this._NO_FILTER;
		if(this._eventTypeFilterFlags.exists(p_eventType) == false) {
			var v = new haxe_ds_ObjectMap();
			this._eventTypeFilterFlags.set(p_eventType,v);
			v;
		}
		this._eventTypeFilterFlags.get(p_eventType).set(p_eventFilter,true);
		if(p_eventFilter != this._NO_FILTER) this._eventTypeFilterFlags.get(p_eventType).set(this._NO_FILTER,true);
	}
	,_doTriggers: function(p_eventType,p_eventFilter) {
		if(this._eventTypeFilterTriggers.exists(p_eventType)) {
			if(this._eventTypeFilterTriggers.get(p_eventType).exists(p_eventFilter)) {
				var _g = 0;
				var _g1 = this._eventTypeFilterTriggers.get(p_eventType).get(p_eventFilter);
				while(_g < _g1.length) {
					var gameTrigger = _g1[_g];
					++_g;
					gameTrigger.doPass();
				}
			} else {
			}
		} else {
		}
	}
	,update: function() {
		var $it0 = this._eventTypeFilterFlags.keys();
		while( $it0.hasNext() ) {
			var flag = $it0.next();
			if(this._eventTypeFilterFlags.get(flag).get(this._NO_FILTER) == true) {
				var $it1 = this._eventTypeFilterFlags.get(flag).keys();
				while( $it1.hasNext() ) {
					var filterFlag = $it1.next();
					if(this._eventTypeFilterFlags.get(flag).get(filterFlag) == true) {
						this._eventTypeFilterFlags.get(flag).set(filterFlag,false);
						this._doTriggers(flag,filterFlag);
					}
				}
			}
		}
	}
	,_initPrefabConvertToTypeMap: function() {
		this._prefabConvertToType = new haxe_ds_EnumValueMap();
		var v = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.CREATED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.CREATED,v);
		v;
		var v1 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.UPDATE;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.UPDATE,v1);
		v1;
		var v2 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_CONNECTED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_CONNECTED,v2);
		v2;
		var v3 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_REQUEST;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_REQUEST,v3);
		v3;
		var v4 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_SERVER_EVENT;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_SERVER_EVENT,v4);
		v4;
		var v5 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_CONNECTED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_CONNECTED,v5);
		v5;
		var v6 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_SENDREQUEST;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_SENDREQUEST,v6);
		v6;
		var v7 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT_CLICK;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICK,v7);
		v7;
		var v8 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_RIGHT_CLICK;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICK,v8);
		v8;
		var v9 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT_CLICK;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICKED,v9);
		v9;
		var v10 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_RIGHT_CLICK;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICKED,v10);
		v10;
		var v11 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_ENTERED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_ENTERED,v11);
		v11;
		var v12 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_MOVED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_MOVED,v12);
		v12;
		var v13 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT,v13);
		v13;
		var v14 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED,v14);
		v14;
		var v15 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED,v15);
		v15;
		var v16 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ALT,v16);
		v16;
		var v17 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSPACE,v17);
		v17;
		var v18 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CAPS_LOCK,v18);
		v18;
		var v19 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CONTROL,v19);
		v19;
		var v20 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DELETE,v20);
		v20;
		var v21 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DOWN,v21);
		v21;
		var v22 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_END,v22);
		v22;
		var v23 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ENTER,v23);
		v23;
		var v24 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ESCAPE,v24);
		v24;
		var v25 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F1,v25);
		v25;
		var v26 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F10,v26);
		v26;
		var v27 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F11,v27);
		v27;
		var v28 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F12,v28);
		v28;
		var v29 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F13,v29);
		v29;
		var v30 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F14,v30);
		v30;
		var v31 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F15,v31);
		v31;
		var v32 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F2,v32);
		v32;
		var v33 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F3,v33);
		v33;
		var v34 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F4,v34);
		v34;
		var v35 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F5,v35);
		v35;
		var v36 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F6,v36);
		v36;
		var v37 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F7,v37);
		v37;
		var v38 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F8,v38);
		v38;
		var v39 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F9,v39);
		v39;
		var v40 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_HOME,v40);
		v40;
		var v41 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_INSERT,v41);
		v41;
		var v42 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFT,v42);
		v42;
		var v43 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_0,v43);
		v43;
		var v44 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_1,v44);
		v44;
		var v45 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_2,v45);
		v45;
		var v46 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_3,v46);
		v46;
		var v47 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_4,v47);
		v47;
		var v48 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_5,v48);
		v48;
		var v49 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_6,v49);
		v49;
		var v50 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_7,v50);
		v50;
		var v51 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_8,v51);
		v51;
		var v52 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_9,v52);
		v52;
		var v53 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ADD,v53);
		v53;
		var v54 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DECIMAL,v54);
		v54;
		var v55 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DIVIDE,v55);
		v55;
		var v56 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ENTER,v56);
		v56;
		var v57 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_MULTIPLY,v57);
		v57;
		var v58 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_SUBTRACT,v58);
		v58;
		var v59 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_DOWN,v59);
		v59;
		var v60 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_UP,v60);
		v60;
		var v61 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHT,v61);
		v61;
		var v62 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SHIFT,v62);
		v62;
		var v63 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SPACE,v63);
		v63;
		var v64 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_TAB,v64);
		v64;
		var v65 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UP,v65);
		v65;
		var v66 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_A,v66);
		v66;
		var v67 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_B,v67);
		v67;
		var v68 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_C,v68);
		v68;
		var v69 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_D,v69);
		v69;
		var v70 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_E,v70);
		v70;
		var v71 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F,v71);
		v71;
		var v72 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_G,v72);
		v72;
		var v73 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_H,v73);
		v73;
		var v74 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_I,v74);
		v74;
		var v75 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_J,v75);
		v75;
		var v76 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_K,v76);
		v76;
		var v77 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_L,v77);
		v77;
		var v78 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_M,v78);
		v78;
		var v79 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_N,v79);
		v79;
		var v80 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_O,v80);
		v80;
		var v81 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_P,v81);
		v81;
		var v82 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Q,v82);
		v82;
		var v83 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_R,v83);
		v83;
		var v84 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_S,v84);
		v84;
		var v85 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_T,v85);
		v85;
		var v86 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_U,v86);
		v86;
		var v87 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_V,v87);
		v87;
		var v88 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_W,v88);
		v88;
		var v89 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_X,v89);
		v89;
		var v90 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Y,v90);
		v90;
		var v91 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Z,v91);
		v91;
		var v92 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_0,v92);
		v92;
		var v93 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_1,v93);
		v93;
		var v94 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_2,v94);
		v94;
		var v95 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_3,v95);
		v95;
		var v96 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_4,v96);
		v96;
		var v97 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_5,v97);
		v97;
		var v98 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_6,v98);
		v98;
		var v99 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_7,v99);
		v99;
		var v100 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_8,v100);
		v100;
		var v101 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_9,v101);
		v101;
		var v102 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_EQUALS,v102);
		v102;
		var v103 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SLASH,v103);
		v103;
		var v104 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSLASH,v104);
		v104;
		var v105 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFTBRACKET,v105);
		v105;
		var v106 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHTBRACKET,v106);
		v106;
		var v107 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKQUOTE,v107);
		v107;
		var v108 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMA,v108);
		v108;
		var v109 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMAND,v109);
		v109;
		var v110 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_MINUS,v110);
		v110;
		var v111 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PERIOD,v111);
		v111;
		var v112 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_QUOTE,v112);
		v112;
		var v113 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SEMICOLON,v113);
		v113;
		var v114 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDMENU,v114);
		v114;
		var v115 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDSEARCH,v115);
		v115;
		var v116 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UNKNOWN,v116);
		v116;
		var v117 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ALT,v117);
		v117;
		var v118 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSPACE,v118);
		v118;
		var v119 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CAPS_LOCK,v119);
		v119;
		var v120 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CONTROL,v120);
		v120;
		var v121 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DELETE,v121);
		v121;
		var v122 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DOWN,v122);
		v122;
		var v123 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_END,v123);
		v123;
		var v124 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ENTER,v124);
		v124;
		var v125 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ESCAPE,v125);
		v125;
		var v126 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F1,v126);
		v126;
		var v127 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F10,v127);
		v127;
		var v128 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F11,v128);
		v128;
		var v129 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F12,v129);
		v129;
		var v130 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F13,v130);
		v130;
		var v131 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F14,v131);
		v131;
		var v132 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F15,v132);
		v132;
		var v133 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F2,v133);
		v133;
		var v134 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F3,v134);
		v134;
		var v135 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F4,v135);
		v135;
		var v136 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F5,v136);
		v136;
		var v137 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F6,v137);
		v137;
		var v138 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F7,v138);
		v138;
		var v139 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F8,v139);
		v139;
		var v140 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F9,v140);
		v140;
		var v141 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_HOME,v141);
		v141;
		var v142 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_INSERT,v142);
		v142;
		var v143 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFT,v143);
		v143;
		var v144 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_0,v144);
		v144;
		var v145 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_1,v145);
		v145;
		var v146 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_2,v146);
		v146;
		var v147 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_3,v147);
		v147;
		var v148 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_4,v148);
		v148;
		var v149 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_5,v149);
		v149;
		var v150 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_6,v150);
		v150;
		var v151 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_7,v151);
		v151;
		var v152 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_8,v152);
		v152;
		var v153 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_9,v153);
		v153;
		var v154 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ADD,v154);
		v154;
		var v155 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DECIMAL,v155);
		v155;
		var v156 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DIVIDE,v156);
		v156;
		var v157 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ENTER,v157);
		v157;
		var v158 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_MULTIPLY,v158);
		v158;
		var v159 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_SUBTRACT,v159);
		v159;
		var v160 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_DOWN,v160);
		v160;
		var v161 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_UP,v161);
		v161;
		var v162 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHT,v162);
		v162;
		var v163 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SHIFT,v163);
		v163;
		var v164 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SPACE,v164);
		v164;
		var v165 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_TAB,v165);
		v165;
		var v166 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UP,v166);
		v166;
		var v167 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_A,v167);
		v167;
		var v168 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_B,v168);
		v168;
		var v169 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_C,v169);
		v169;
		var v170 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_D,v170);
		v170;
		var v171 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_E,v171);
		v171;
		var v172 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F,v172);
		v172;
		var v173 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_G,v173);
		v173;
		var v174 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_H,v174);
		v174;
		var v175 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_I,v175);
		v175;
		var v176 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_J,v176);
		v176;
		var v177 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_K,v177);
		v177;
		var v178 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_L,v178);
		v178;
		var v179 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_M,v179);
		v179;
		var v180 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_N,v180);
		v180;
		var v181 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_O,v181);
		v181;
		var v182 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_P,v182);
		v182;
		var v183 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Q,v183);
		v183;
		var v184 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_R,v184);
		v184;
		var v185 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_S,v185);
		v185;
		var v186 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_T,v186);
		v186;
		var v187 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_U,v187);
		v187;
		var v188 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_V,v188);
		v188;
		var v189 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_W,v189);
		v189;
		var v190 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_X,v190);
		v190;
		var v191 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Y,v191);
		v191;
		var v192 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Z,v192);
		v192;
		var v193 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_0,v193);
		v193;
		var v194 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_1,v194);
		v194;
		var v195 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_2,v195);
		v195;
		var v196 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_3,v196);
		v196;
		var v197 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_4,v197);
		v197;
		var v198 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_5,v198);
		v198;
		var v199 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_6,v199);
		v199;
		var v200 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_7,v200);
		v200;
		var v201 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_8,v201);
		v201;
		var v202 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_9,v202);
		v202;
		var v203 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_EQUALS,v203);
		v203;
		var v204 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SLASH,v204);
		v204;
		var v205 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSLASH,v205);
		v205;
		var v206 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFTBRACKET,v206);
		v206;
		var v207 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHTBRACKET,v207);
		v207;
		var v208 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKQUOTE,v208);
		v208;
		var v209 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMA,v209);
		v209;
		var v210 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMAND,v210);
		v210;
		var v211 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_MINUS,v211);
		v211;
		var v212 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PERIOD,v212);
		v212;
		var v213 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_QUOTE,v213);
		v213;
		var v214 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SEMICOLON,v214);
		v214;
		var v215 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDMENU,v215);
		v215;
		var v216 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDSEARCH,v216);
		v216;
		var v217 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED;
		this._prefabConvertToType.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UNKNOWN,v217);
		v217;
	}
	,_initPrefabConvertToFilterMap: function() {
		this._prefabConvertToFilter = new haxe_ds_EnumValueMap();
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.CREATED,this._FILTER_VARIABLE_USER_ENTITY);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.UPDATE,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_CONNECTED,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_REQUEST,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_SERVER_EVENT,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_CONNECTED,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_SENDREQUEST,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICK,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICK,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICKED,this._FILTER_VARIABLE_USER_ENTITY);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICKED,this._FILTER_VARIABLE_USER_ENTITY);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_ENTERED,this._FILTER_VARIABLE_USER_ENTITY);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_MOVED,this._FILTER_VARIABLE_USER_ENTITY);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT,this._FILTER_VARIABLE_USER_ENTITY);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED,this._NO_FILTER);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ALT,flambe_input_Key.Alt);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSPACE,flambe_input_Key.Backspace);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CAPS_LOCK,flambe_input_Key.CapsLock);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CONTROL,flambe_input_Key.Control);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DELETE,flambe_input_Key.Delete);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DOWN,flambe_input_Key.Down);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_END,flambe_input_Key.End);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ENTER,flambe_input_Key.Enter);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ESCAPE,flambe_input_Key.Escape);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F1,flambe_input_Key.F1);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F10,flambe_input_Key.F10);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F11,flambe_input_Key.F11);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F12,flambe_input_Key.F12);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F13,flambe_input_Key.F13);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F14,flambe_input_Key.F14);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F15,flambe_input_Key.F15);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F2,flambe_input_Key.F2);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F3,flambe_input_Key.F3);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F4,flambe_input_Key.F4);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F5,flambe_input_Key.F5);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F6,flambe_input_Key.F6);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F7,flambe_input_Key.F7);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F8,flambe_input_Key.F8);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F9,flambe_input_Key.F9);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_HOME,flambe_input_Key.Home);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_INSERT,flambe_input_Key.Insert);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFT,flambe_input_Key.Left);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_0,flambe_input_Key.Numpad0);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_1,flambe_input_Key.Numpad1);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_2,flambe_input_Key.Numpad2);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_3,flambe_input_Key.Numpad3);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_4,flambe_input_Key.Numpad4);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_5,flambe_input_Key.Numpad5);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_6,flambe_input_Key.Numpad6);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_7,flambe_input_Key.Numpad7);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_8,flambe_input_Key.Numpad8);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_9,flambe_input_Key.Numpad9);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ADD,flambe_input_Key.NumpadAdd);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DECIMAL,flambe_input_Key.NumpadDecimal);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DIVIDE,flambe_input_Key.NumpadDivide);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ENTER,flambe_input_Key.NumpadEnter);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_MULTIPLY,flambe_input_Key.NumpadMultiply);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_SUBTRACT,flambe_input_Key.NumpadSubtract);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_DOWN,flambe_input_Key.PageDown);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_UP,flambe_input_Key.PageUp);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHT,flambe_input_Key.Right);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SHIFT,flambe_input_Key.Shift);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SPACE,flambe_input_Key.Space);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_TAB,flambe_input_Key.Tab);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UP,flambe_input_Key.Up);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_A,flambe_input_Key.A);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_B,flambe_input_Key.B);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_C,flambe_input_Key.C);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_D,flambe_input_Key.D);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_E,flambe_input_Key.E);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F,flambe_input_Key.F);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_G,flambe_input_Key.G);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_H,flambe_input_Key.H);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_I,flambe_input_Key.I);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_J,flambe_input_Key.J);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_K,flambe_input_Key.K);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_L,flambe_input_Key.L);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_M,flambe_input_Key.M);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_N,flambe_input_Key.N);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_O,flambe_input_Key.O);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_P,flambe_input_Key.P);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Q,flambe_input_Key.Q);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_R,flambe_input_Key.R);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_S,flambe_input_Key.S);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_T,flambe_input_Key.T);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_U,flambe_input_Key.U);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_V,flambe_input_Key.V);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_W,flambe_input_Key.W);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_X,flambe_input_Key.X);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Y,flambe_input_Key.Y);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Z,flambe_input_Key.Z);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_0,flambe_input_Key.Number0);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_1,flambe_input_Key.Number1);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_2,flambe_input_Key.Number2);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_3,flambe_input_Key.Number3);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_4,flambe_input_Key.Number4);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_5,flambe_input_Key.Number5);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_6,flambe_input_Key.Number6);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_7,flambe_input_Key.Number7);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_8,flambe_input_Key.Number8);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_9,flambe_input_Key.Number9);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_EQUALS,flambe_input_Key.Equals);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SLASH,flambe_input_Key.Slash);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSLASH,flambe_input_Key.Backslash);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFTBRACKET,flambe_input_Key.LeftBracket);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHTBRACKET,flambe_input_Key.RightBracket);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKQUOTE,flambe_input_Key.Backquote);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMA,flambe_input_Key.Comma);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMAND,flambe_input_Key.Command);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_MINUS,flambe_input_Key.Minus);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PERIOD,flambe_input_Key.Period);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_QUOTE,flambe_input_Key.Quote);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SEMICOLON,flambe_input_Key.Semicolon);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDMENU,flambe_input_Key.Menu);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDSEARCH,flambe_input_Key.Search);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UNKNOWN,flambe_input_Key.Unknown);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ALT,flambe_input_Key.Alt);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSPACE,flambe_input_Key.Backspace);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CAPS_LOCK,flambe_input_Key.CapsLock);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CONTROL,flambe_input_Key.Control);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DELETE,flambe_input_Key.Delete);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DOWN,flambe_input_Key.Down);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_END,flambe_input_Key.End);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ENTER,flambe_input_Key.Enter);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ESCAPE,flambe_input_Key.Escape);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F1,flambe_input_Key.F1);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F10,flambe_input_Key.F10);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F11,flambe_input_Key.F11);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F12,flambe_input_Key.F12);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F13,flambe_input_Key.F13);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F14,flambe_input_Key.F14);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F15,flambe_input_Key.F15);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F2,flambe_input_Key.F2);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F3,flambe_input_Key.F3);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F4,flambe_input_Key.F4);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F5,flambe_input_Key.F5);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F6,flambe_input_Key.F6);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F7,flambe_input_Key.F7);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F8,flambe_input_Key.F8);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F9,flambe_input_Key.F9);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_HOME,flambe_input_Key.Home);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_INSERT,flambe_input_Key.Insert);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFT,flambe_input_Key.Left);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_0,flambe_input_Key.Numpad0);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_1,flambe_input_Key.Numpad1);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_2,flambe_input_Key.Numpad2);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_3,flambe_input_Key.Numpad3);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_4,flambe_input_Key.Numpad4);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_5,flambe_input_Key.Numpad5);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_6,flambe_input_Key.Numpad6);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_7,flambe_input_Key.Numpad7);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_8,flambe_input_Key.Numpad8);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_9,flambe_input_Key.Numpad9);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ADD,flambe_input_Key.NumpadAdd);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DECIMAL,flambe_input_Key.NumpadDecimal);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DIVIDE,flambe_input_Key.NumpadDivide);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ENTER,flambe_input_Key.NumpadEnter);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_MULTIPLY,flambe_input_Key.NumpadMultiply);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_SUBTRACT,flambe_input_Key.NumpadSubtract);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_DOWN,flambe_input_Key.PageDown);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_UP,flambe_input_Key.PageUp);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHT,flambe_input_Key.Right);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SHIFT,flambe_input_Key.Shift);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SPACE,flambe_input_Key.Space);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_TAB,flambe_input_Key.Tab);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UP,flambe_input_Key.Up);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_A,flambe_input_Key.A);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_B,flambe_input_Key.B);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_C,flambe_input_Key.C);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_D,flambe_input_Key.D);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_E,flambe_input_Key.E);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F,flambe_input_Key.F);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_G,flambe_input_Key.G);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_H,flambe_input_Key.H);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_I,flambe_input_Key.I);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_J,flambe_input_Key.J);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_K,flambe_input_Key.K);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_L,flambe_input_Key.L);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_M,flambe_input_Key.M);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_N,flambe_input_Key.N);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_O,flambe_input_Key.O);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_P,flambe_input_Key.P);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Q,flambe_input_Key.Q);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_R,flambe_input_Key.R);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_S,flambe_input_Key.S);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_T,flambe_input_Key.T);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_U,flambe_input_Key.U);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_V,flambe_input_Key.V);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_W,flambe_input_Key.W);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_X,flambe_input_Key.X);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Y,flambe_input_Key.Y);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Z,flambe_input_Key.Z);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_0,flambe_input_Key.Number0);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_1,flambe_input_Key.Number1);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_2,flambe_input_Key.Number2);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_3,flambe_input_Key.Number3);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_4,flambe_input_Key.Number4);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_5,flambe_input_Key.Number5);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_6,flambe_input_Key.Number6);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_7,flambe_input_Key.Number7);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_8,flambe_input_Key.Number8);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_9,flambe_input_Key.Number9);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_EQUALS,flambe_input_Key.Equals);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SLASH,flambe_input_Key.Slash);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSLASH,flambe_input_Key.Backslash);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFTBRACKET,flambe_input_Key.LeftBracket);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHTBRACKET,flambe_input_Key.RightBracket);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKQUOTE,flambe_input_Key.Backquote);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMA,flambe_input_Key.Comma);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMAND,flambe_input_Key.Command);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_MINUS,flambe_input_Key.Minus);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PERIOD,flambe_input_Key.Period);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_QUOTE,flambe_input_Key.Quote);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SEMICOLON,flambe_input_Key.Semicolon);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDMENU,flambe_input_Key.Menu);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDSEARCH,flambe_input_Key.Search);
		this._prefabConvertToFilter.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UNKNOWN,flambe_input_Key.Unknown);
	}
	,__class__: tools_spark_sliced_services_std_event_core_Event
});
var tools_spark_sliced_services_std_input_core_Input = function() {
	tools_spark_sliced_core_AService.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.input.core.Input"] = tools_spark_sliced_services_std_input_core_Input;
tools_spark_sliced_services_std_input_core_Input.__name__ = true;
tools_spark_sliced_services_std_input_core_Input.__interfaces__ = [tools_spark_sliced_interfaces_IInput];
tools_spark_sliced_services_std_input_core_Input.__super__ = tools_spark_sliced_core_AService;
tools_spark_sliced_services_std_input_core_Input.prototype = $extend(tools_spark_sliced_core_AService.prototype,{
	_init: function() {
		tools_spark_framework_Console.log("Init Input std Service...");
		this.keyboard = new tools_spark_sliced_services_std_input_devices_core_KeyboardDevice();
		this.pointer = new tools_spark_sliced_services_std_input_devices_core_PointerDevice();
	}
	,update: function() {
		this.keyboard.update();
		this.pointer.update();
	}
	,__class__: tools_spark_sliced_services_std_input_core_Input
});
var tools_spark_sliced_services_std_input_devices_interfaces_IInputDevice = function() { };
$hxClasses["tools.spark.sliced.services.std.input.devices.interfaces.IInputDevice"] = tools_spark_sliced_services_std_input_devices_interfaces_IInputDevice;
tools_spark_sliced_services_std_input_devices_interfaces_IInputDevice.__name__ = true;
var tools_spark_sliced_services_std_input_devices_core_KeyboardDevice = function() {
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.input.devices.core.KeyboardDevice"] = tools_spark_sliced_services_std_input_devices_core_KeyboardDevice;
tools_spark_sliced_services_std_input_devices_core_KeyboardDevice.__name__ = true;
tools_spark_sliced_services_std_input_devices_core_KeyboardDevice.__interfaces__ = [tools_spark_sliced_services_std_input_devices_interfaces_IInputDevice];
tools_spark_sliced_services_std_input_devices_core_KeyboardDevice.prototype = {
	_init: function() {
		this._keysDown = new Array();
		this._keysUp = new Array();
		this._keysJustPressed = new haxe_ds_EnumValueMap();
		this._keysJustReleased = new haxe_ds_EnumValueMap();
		flambe_System.get_keyboard().down.connect($bind(this,this._onKeyDown));
		flambe_System.get_keyboard().up.connect($bind(this,this._onKeyUp));
	}
	,_onKeyDown: function(p_keyboardEvent) {
		this._keysDown.push(p_keyboardEvent.key);
	}
	,_onKeyUp: function(p_keyboardEvent) {
		this._keysUp.push(p_keyboardEvent.key);
	}
	,update: function() {
		this._keysJustPressed = new haxe_ds_EnumValueMap();
		this._keysJustReleased = new haxe_ds_EnumValueMap();
		while(this._keysDown.length > 0) {
			var w_keyDown = this._keysDown.pop();
			this._keysJustPressed.set(w_keyDown,true);
			true;
			tools_spark_sliced_core_Sliced.event.raiseEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED,w_keyDown);
		}
		while(this._keysUp.length > 0) {
			var w_keyUp = this._keysUp.pop();
			this._keysJustReleased.set(w_keyUp,true);
			true;
			tools_spark_sliced_core_Sliced.event.raiseEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED,w_keyUp);
		}
	}
	,registerTrigger: function(p_eventType,p_eventFilter) {
	}
	,isKeyDown: function(type) {
		return flambe_System.get_keyboard().isDown(type);
	}
	,isKeyPressed: function(type) {
		return this._keysJustPressed.exists(type);
	}
	,isKeyReleased: function(type) {
		return this._keysJustReleased.exists(type);
	}
	,__class__: tools_spark_sliced_services_std_input_devices_core_KeyboardDevice
};
var tools_spark_sliced_services_std_input_devices_core_PointerDevice = function() {
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.input.devices.core.PointerDevice"] = tools_spark_sliced_services_std_input_devices_core_PointerDevice;
tools_spark_sliced_services_std_input_devices_core_PointerDevice.__name__ = true;
tools_spark_sliced_services_std_input_devices_core_PointerDevice.__interfaces__ = [tools_spark_sliced_services_std_input_devices_interfaces_IInputDevice];
tools_spark_sliced_services_std_input_devices_core_PointerDevice.prototype = {
	_init: function() {
		this._registeredTriggers = new haxe_ds_EnumValueMap();
	}
	,update: function() {
		this._oldX = this.currentX;
		this._oldY = this.currentY;
		this.currentX = flambe_System.get_pointer().get_x();
		this.currentY = flambe_System.get_pointer().get_y();
	}
	,distX: function() {
		return this.currentX - this._oldX;
	}
	,distY: function() {
		return this.currentY - this._oldY;
	}
	,isDown: function() {
		return flambe_System.get_pointer().isDown();
	}
	,_setTrigger: function(p_eventType,p_eventFilter) {
		if(this._registeredTriggers.get(p_eventType) == null) {
			var v = new haxe_ds_ObjectMap();
			this._registeredTriggers.set(p_eventType,v);
			v;
		}
		var this1 = this._registeredTriggers.get(p_eventType);
		this1.set(p_eventFilter,p_eventFilter);
		p_eventFilter;
	}
	,_getTrigger: function(p_eventType,p_eventFilter) {
		if(this._registeredTriggers.get(p_eventType) == null) return null;
		var this1 = this._registeredTriggers.get(p_eventType);
		return this1.get(p_eventFilter);
	}
	,registerTrigger: function(p_eventType,p_eventFilter) {
		this._setTrigger(p_eventType,p_eventFilter);
	}
	,submitPointerEvent: function(p_eventType,p_eventFilter) {
		if(this._getTrigger(p_eventType,p_eventFilter) != null) tools_spark_sliced_core_Sliced.event.raiseEvent(p_eventType,p_eventFilter);
	}
	,_onMove: function(p) {
		tools_spark_framework_Console.error("PointerMove: " + p.viewX + ", " + p.viewY);
	}
	,__class__: tools_spark_sliced_services_std_input_devices_core_PointerDevice
};
var tools_spark_sliced_services_std_logic_core_Logic = function() {
	tools_spark_sliced_core_AService.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.core.Logic"] = tools_spark_sliced_services_std_logic_core_Logic;
tools_spark_sliced_services_std_logic_core_Logic.__name__ = true;
tools_spark_sliced_services_std_logic_core_Logic.__interfaces__ = [tools_spark_sliced_interfaces_ILogic];
tools_spark_sliced_services_std_logic_core_Logic.__super__ = tools_spark_sliced_core_AService;
tools_spark_sliced_services_std_logic_core_Logic.prototype = $extend(tools_spark_sliced_core_AService.prototype,{
	_init: function() {
		tools_spark_framework_Console.log("Init Logic std Service...");
		this.scriptInterpreter = new tools_spark_sliced_services_std_logic_interpreter_core_HaxeInterpreter();
		this.gmlInterpreter = new tools_spark_sliced_services_std_logic_interpreter_core_GmlInterpreter();
		this.gameFactory = new tools_spark_sliced_services_std_logic_gde_core_GameFactory();
		this.rootGameEntitiesRunning = new haxe_ds_StringMap();
		this.rootGameEntitiesPaused = new haxe_ds_StringMap();
		this._gameEntitiesByName = new haxe_ds_StringMap();
	}
	,update: function() {
		var $it0 = this.rootGameEntitiesRunning.iterator();
		while( $it0.hasNext() ) {
			var gameEntity = $it0.next();
			gameEntity.doActions();
		}
	}
	,startAction: function(entity,actionId) {
		return entity.startAction(actionId);
	}
	,createAndRun: function(p_gameEntityUrl) {
		var v = this.gameFactory.createGameEntity(p_gameEntityUrl);
		this.rootGameEntitiesRunning.set(p_gameEntityUrl,v);
		v;
		tools_spark_framework_Console.warn("Logic Service: Create and Running entity: " + p_gameEntityUrl);
	}
	,createAndPause: function(p_gameEntityUrl) {
		var v = this.gameFactory.createGameEntity(p_gameEntityUrl);
		this.rootGameEntitiesPaused.set(p_gameEntityUrl,v);
		v;
	}
	,getEntityByName: function(p_stateName) {
		return this._gameEntitiesByName.get(p_stateName);
	}
	,registerEntityByName: function(p_entity) {
		if(p_entity.getState("name") != null) {
			var key = p_entity.getState("name");
			this._gameEntitiesByName.set(key,p_entity);
		}
	}
	,__class__: tools_spark_sliced_services_std_logic_core_Logic
});
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameBase"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase
};
var tools_spark_sliced_services_std_logic_gde_core_AGameBase = function() {
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.AGameBase"] = tools_spark_sliced_services_std_logic_gde_core_AGameBase;
tools_spark_sliced_services_std_logic_gde_core_AGameBase.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_AGameBase.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase];
tools_spark_sliced_services_std_logic_gde_core_AGameBase.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_core_AGameBase
};
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameAction = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameAction"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameAction;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameAction.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameAction.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase];
tools_spark_sliced_services_std_logic_gde_interfaces_IGameAction.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameAction
};
var tools_spark_sliced_services_std_logic_gde_core_GameAction = function() {
	tools_spark_sliced_services_std_logic_gde_core_AGameBase.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameAction"] = tools_spark_sliced_services_std_logic_gde_core_GameAction;
tools_spark_sliced_services_std_logic_gde_core_GameAction.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameAction.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameAction];
tools_spark_sliced_services_std_logic_gde_core_GameAction.__super__ = tools_spark_sliced_services_std_logic_gde_core_AGameBase;
tools_spark_sliced_services_std_logic_gde_core_GameAction.prototype = $extend(tools_spark_sliced_services_std_logic_gde_core_AGameBase.prototype,{
	_init: function() {
		this.scriptSet = new Array();
		this.gameStateSet = new haxe_ds_StringMap();
	}
	,addState: function(gameState) {
		if(this.gameStateSet.get(gameState.id) != null) tools_spark_framework_Console.warn("A State with id " + gameState.id + " already exists in this Action.");
		this.gameStateSet.set(gameState.id,gameState);
		gameState;
	}
	,doPass: function() {
		var _g = 0;
		var _g1 = this.scriptSet;
		while(_g < _g1.length) {
			var hashId = _g1[_g];
			++_g;
			if(hashId == -1) tools_spark_sliced_core_Sliced.logic.gmlInterpreter.run(hashId,(function($this) {
				var $r;
				var _g2 = new haxe_ds_StringMap();
				_g2.set("me",$this.parentEntity);
				_g2.set("parent",$this.parentEntity.parentEntity);
				$r = _g2;
				return $r;
			}(this))); else tools_spark_sliced_core_Sliced.logic.scriptInterpreter.run(hashId,(function($this) {
				var $r;
				var _g21 = new haxe_ds_StringMap();
				_g21.set("me",$this.parentEntity);
				_g21.set("parent",$this.parentEntity.parentEntity);
				$r = _g21;
				return $r;
			}(this)));
		}
	}
	,getState: function(p_stateId) {
		if(this.gameStateSet.get(p_stateId) == null) return null; else return this.gameStateSet.get(p_stateId).value;
	}
	,setState: function(p_stateId,p_value) {
		this.gameStateSet.get(p_stateId).value = p_value;
		return this.gameStateSet.get(p_stateId).value;
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameAction
});
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassInstantiator = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameClassInstantiator"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassInstantiator;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassInstantiator.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassInstantiator.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassInstantiator
};
var tools_spark_sliced_services_std_logic_gde_core_GameClassInstantiator = function(p_xmlNodeTypeToNodeName,p_xmlConcurrencyNameToType,p_xmlStateNameToType,p_xmlEventNameToPrefab) {
	tools_spark_framework_Console.log("Creating Game Class Instantiator");
	this._xmlNodeTypeToNodeName = p_xmlNodeTypeToNodeName;
	this._xmlConcurrencyNameToType = p_xmlConcurrencyNameToType;
	this._xmlStateNameToType = p_xmlStateNameToType;
	this._xmlEventNameToPrefab = p_xmlEventNameToPrefab;
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameClassInstantiator"] = tools_spark_sliced_services_std_logic_gde_core_GameClassInstantiator;
tools_spark_sliced_services_std_logic_gde_core_GameClassInstantiator.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameClassInstantiator.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassInstantiator];
tools_spark_sliced_services_std_logic_gde_core_GameClassInstantiator.prototype = {
	_init: function() {
	}
	,instantiateEntity: function(p_gameNode,p_parentEntity) {
		var l_gameEntity = new tools_spark_sliced_services_std_logic_gde_core_GameEntity();
		l_gameEntity.parentEntity = p_parentEntity;
		l_gameEntity.gameForm = this.instantiateForm(p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM)).next(),l_gameEntity);
		if(p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES)).hasNext()) {
			var states = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES)).next();
			var $it0 = states.elements();
			while( $it0.hasNext() ) {
				var state = $it0.next();
				l_gameEntity.addState(this.instantiateState(state,l_gameEntity));
			}
		}
		if(p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS)).hasNext()) {
			var actions = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS)).next();
			var $it1 = actions.elements();
			while( $it1.hasNext() ) {
				var action = $it1.next();
				var f_gameAction = this.instantiateAction(action,l_gameEntity);
				l_gameEntity.addAction(f_gameAction);
			}
		}
		if(p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS)).hasNext()) {
			var triggers = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS)).next();
			var $it2 = triggers.elements();
			while( $it2.hasNext() ) {
				var trigger = $it2.next();
				var f_gameTrigger = this.instantiateTrigger(trigger,l_gameEntity);
				tools_spark_sliced_core_Sliced.event.addTrigger(f_gameTrigger);
			}
		}
		tools_spark_sliced_core_Sliced.logic.registerEntityByName(l_gameEntity);
		tools_spark_sliced_core_Sliced.event.raiseEvent(tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.CREATED,l_gameEntity);
		return l_gameEntity;
	}
	,instantiateForm: function(p_gameNode,p_parentEntity) {
		var l_gameForm = new tools_spark_sliced_services_std_logic_gde_core_GameForm();
		l_gameForm.parentEntity = p_parentEntity;
		if(p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES)).hasNext()) {
			var states = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES)).next();
			var $it0 = states.elements();
			while( $it0.hasNext() ) {
				var state = $it0.next();
				l_gameForm.addState(this.instantiateState(state,p_parentEntity));
			}
		}
		l_gameForm.gameSpace = this.instantiateSpace(p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE)).next(),p_parentEntity);
		return l_gameForm;
	}
	,instantiateSpace: function(p_gameNode,p_parentEntity) {
		var l_gameSpace = new tools_spark_sliced_services_std_logic_gde_core_GameSpace();
		l_gameSpace.parentEntity = p_parentEntity;
		if(p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES)).hasNext()) {
			var entities = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES)).next();
			var $it0 = entities.elements();
			while( $it0.hasNext() ) {
				var entity = $it0.next();
				l_gameSpace.gameEntitySet.push(this.instantiateEntity(entity,p_parentEntity));
			}
		}
		return l_gameSpace;
	}
	,instantiateState: function(p_gameNode,p_parentEntity) {
		var l_gameState = new tools_spark_sliced_services_std_logic_gde_core_GameState();
		l_gameState.parentEntity = p_parentEntity;
		l_gameState.id = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID)).next().firstChild().get_nodeValue();
		var key = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE)).next().firstChild().get_nodeValue();
		l_gameState.type = this._xmlStateNameToType.get(key);
		var l_valueInString = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE)).next().firstChild().get_nodeValue();
		var _g = l_gameState.type;
		switch(Type.enumIndex(_g)) {
		case 3:
			l_gameState.value = l_valueInString == "true" || l_valueInString == "True" || l_valueInString == "t" || l_valueInString == "T";
			break;
		case 2:
			l_gameState.value = Std.parseFloat(l_valueInString);
			break;
		case 1:
			l_gameState.value = Std.parseInt(l_valueInString);
			break;
		case 4:
			l_gameState.value = l_valueInString;
			break;
		case 0:
			l_gameState.value = null;
			break;
		}
		return l_gameState;
	}
	,instantiateAction: function(p_gameNode,p_parentEntity) {
		var l_gameAction = new tools_spark_sliced_services_std_logic_gde_core_GameAction();
		l_gameAction.parentEntity = p_parentEntity;
		l_gameAction.id = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID)).next().firstChild().get_nodeValue();
		var key = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY)).next().firstChild().get_nodeValue();
		l_gameAction.concurrency = this._xmlConcurrencyNameToType.get(key);
		var scripts = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS)).next();
		var $it0 = scripts.elements();
		while( $it0.hasNext() ) {
			var script = $it0.next();
			if(script.get_nodeName() == this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT)) l_gameAction.scriptSet.push(tools_spark_sliced_core_Sliced.logic.scriptInterpreter.hash(script.firstChild().get_nodeValue())); else l_gameAction.scriptSet.push(tools_spark_sliced_core_Sliced.logic.gmlInterpreter.hash(script.firstChild().get_nodeValue()));
		}
		if(p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES)).hasNext()) {
			var states = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES)).next();
			var $it1 = states.elements();
			while( $it1.hasNext() ) {
				var state = $it1.next();
				l_gameAction.addState(this.instantiateState(state,p_parentEntity));
			}
		}
		return l_gameAction;
	}
	,instantiateTrigger: function(p_gameNode,p_parentEntity) {
		var l_gameTrigger = new tools_spark_sliced_services_std_logic_gde_core_GameTrigger();
		l_gameTrigger.parentEntity = p_parentEntity;
		var key = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT)).next().firstChild().get_nodeValue();
		l_gameTrigger.eventPrefab = this._xmlEventNameToPrefab.get(key);
		var scripts = p_gameNode.elementsNamed(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS)).next();
		var $it0 = scripts.elements();
		while( $it0.hasNext() ) {
			var script = $it0.next();
			if(script.get_nodeName() == this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT)) l_gameTrigger.scriptSet.push(tools_spark_sliced_core_Sliced.logic.scriptInterpreter.hash(script.firstChild().get_nodeValue())); else l_gameTrigger.scriptSet.push(tools_spark_sliced_core_Sliced.logic.gmlInterpreter.hash(script.firstChild().get_nodeValue()));
		}
		return l_gameTrigger;
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameClassInstantiator
};
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassParser = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameClassParser"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassParser;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassParser.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassParser.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassParser
};
var tools_spark_sliced_services_std_logic_gde_core_GameClassParser = function() {
	tools_spark_framework_Console.log("Creating Game Class Parser");
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameClassParser"] = tools_spark_sliced_services_std_logic_gde_core_GameClassParser;
tools_spark_sliced_services_std_logic_gde_core_GameClassParser.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameClassParser.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassParser];
tools_spark_sliced_services_std_logic_gde_core_GameClassParser.prototype = {
	_init: function() {
		this._initNodeNamesMap();
		this._initNodeTypesMap();
		this._initGameTypesMap();
		this._initNodeToGameMap();
		this._initFileExtensionsMap();
		this._initExtendableNodesMap();
		this._initMergableNodesMap();
		this._initTargetMergableNodesMap();
		this._initArrayNodesMap();
		this._initConcurrencyTypeToNameMap();
		this._initConcurrencyNameToTypeMap();
		this._initStateTypeToNameMap();
		this._initStateNameToTypeMap();
		this._initEventPrefabToNameMap();
		this._initEventNameToPrefabMap();
		this._gameClassValidator = new tools_spark_sliced_services_std_logic_gde_core_GameClassValidator(this._xmlNodeTypeToNodeName,this._xmlConcurrencyTypeToName,this._xmlStateTypeToName,this._xmlEventPrefabToName);
		this._gameClassInstantiator = new tools_spark_sliced_services_std_logic_gde_core_GameClassInstantiator(this._xmlNodeTypeToNodeName,this._xmlConcurrencyNameToType,this._xmlStateNameToType,this._xmlEventNameToPrefab);
	}
	,_initNodeNamesMap: function() {
		this._xmlNodeTypeToNodeName = new haxe_ds_EnumValueMap();
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION,"Action");
		"Action";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS,"Actions");
		"Actions";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES,"Entities");
		"Entities";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY,"Entity");
		"Entity";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM,"Form");
		"Form";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS,"Scripts");
		"Scripts";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT,"Script");
		"Script";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML,"Gml");
		"Gml";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS,"Triggers");
		"Triggers";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER,"Trigger");
		"Trigger";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT,"Event");
		"Event";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY,"Concurrency");
		"Concurrency";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID,"Id");
		"Id";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE,"Space");
		"Space";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE,"State");
		"State";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES,"States");
		"States";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE,"Type");
		"Type";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE,"Value");
		"Value";
		this._xmlNodeTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS,"Extends");
		"Extends";
	}
	,_initNodeTypesMap: function() {
		this._xmlNodeNameToNodeType = new haxe_ds_StringMap();
		var k = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION);
		var v = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION;
		this._xmlNodeNameToNodeType.set(k,v);
		v;
		var k1 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS);
		var v1 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS;
		this._xmlNodeNameToNodeType.set(k1,v1);
		v1;
		var k2 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES);
		var v2 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES;
		this._xmlNodeNameToNodeType.set(k2,v2);
		v2;
		var k3 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY);
		var v3 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY;
		this._xmlNodeNameToNodeType.set(k3,v3);
		v3;
		var k4 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM);
		var v4 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM;
		this._xmlNodeNameToNodeType.set(k4,v4);
		v4;
		var k5 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS);
		var v5 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS;
		this._xmlNodeNameToNodeType.set(k5,v5);
		v5;
		var k6 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT);
		var v6 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT;
		this._xmlNodeNameToNodeType.set(k6,v6);
		v6;
		var k7 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML);
		var v7 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML;
		this._xmlNodeNameToNodeType.set(k7,v7);
		v7;
		var k8 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS);
		var v8 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS;
		this._xmlNodeNameToNodeType.set(k8,v8);
		v8;
		var k9 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER);
		var v9 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER;
		this._xmlNodeNameToNodeType.set(k9,v9);
		v9;
		var k10 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT);
		var v10 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT;
		this._xmlNodeNameToNodeType.set(k10,v10);
		v10;
		var k11 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY);
		var v11 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY;
		this._xmlNodeNameToNodeType.set(k11,v11);
		v11;
		var k12 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID);
		var v12 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID;
		this._xmlNodeNameToNodeType.set(k12,v12);
		v12;
		var k13 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE);
		var v13 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE;
		this._xmlNodeNameToNodeType.set(k13,v13);
		v13;
		var k14 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE);
		var v14 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE;
		this._xmlNodeNameToNodeType.set(k14,v14);
		v14;
		var k15 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES);
		var v15 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES;
		this._xmlNodeNameToNodeType.set(k15,v15);
		v15;
		var k16 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE);
		var v16 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE;
		this._xmlNodeNameToNodeType.set(k16,v16);
		v16;
		var k17 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE);
		var v17 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE;
		this._xmlNodeNameToNodeType.set(k17,v17);
		v17;
		var k18 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS);
		var v18 = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS;
		this._xmlNodeNameToNodeType.set(k18,v18);
		v18;
	}
	,_initGameTypesMap: function() {
		this._xmlGameTypeToNodeName = new haxe_ds_EnumValueMap();
		var v = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY);
		this._xmlGameTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ENTITY,v);
		v;
		var v1 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE);
		this._xmlGameTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.STATE,v1);
		v1;
		var v2 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE);
		this._xmlGameTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.SPACE,v2);
		v2;
		var v3 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM);
		this._xmlGameTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.FORM,v3);
		v3;
		var v4 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION);
		this._xmlGameTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ACTION,v4);
		v4;
		var v5 = this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER);
		this._xmlGameTypeToNodeName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.TRIGGER,v5);
		v5;
	}
	,_initNodeToGameMap: function() {
		this._xmlNodeTypeToGameType = new haxe_ds_EnumValueMap();
		var v = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ENTITY;
		this._xmlNodeTypeToGameType.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY,v);
		v;
		var v1 = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.STATE;
		this._xmlNodeTypeToGameType.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE,v1);
		v1;
		var v2 = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.SPACE;
		this._xmlNodeTypeToGameType.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE,v2);
		v2;
		var v3 = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.FORM;
		this._xmlNodeTypeToGameType.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM,v3);
		v3;
		var v4 = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ACTION;
		this._xmlNodeTypeToGameType.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION,v4);
		v4;
		var v5 = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.TRIGGER;
		this._xmlNodeTypeToGameType.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER,v5);
		v5;
	}
	,_initFileExtensionsMap: function() {
		this._xmlGameTypeToFileExtension = new haxe_ds_EnumValueMap();
		this._xmlGameTypeToFileExtension.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ENTITY,"egc");
		"egc";
		this._xmlGameTypeToFileExtension.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.STATE,"sgc");
		"sgc";
		this._xmlGameTypeToFileExtension.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.SPACE,"pgc");
		"pgc";
		this._xmlGameTypeToFileExtension.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.FORM,"fgc");
		"fgc";
		this._xmlGameTypeToFileExtension.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ACTION,"agc");
		"agc";
		this._xmlGameTypeToFileExtension.set(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.TRIGGER,"tgc");
		"tgc";
	}
	,_initExtendableNodesMap: function() {
		this._isNodeExtendable = new haxe_ds_EnumValueMap();
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION,true);
		true;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY,true);
		true;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM,true);
		true;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER,true);
		true;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE,true);
		true;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE,true);
		true;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE,false);
		false;
		this._isNodeExtendable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS,false);
		false;
	}
	,_initMergableNodesMap: function() {
		this._isNodeMergable = new haxe_ds_EnumValueMap();
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS,true);
		true;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES,true);
		true;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM,true);
		true;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS,true);
		true;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS,true);
		true;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE,true);
		true;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES,true);
		true;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE,false);
		false;
		this._isNodeMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS,false);
		false;
	}
	,_initTargetMergableNodesMap: function() {
		this._isNodeTargetMergable = new haxe_ds_EnumValueMap();
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION,true);
		true;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE,true);
		true;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE,false);
		false;
		this._isNodeTargetMergable.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS,false);
		false;
	}
	,_initArrayNodesMap: function() {
		this._isNodeArray = new haxe_ds_EnumValueMap();
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS,true);
		true;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES,true);
		true;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS,true);
		true;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS,true);
		true;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES,true);
		true;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE,false);
		false;
		this._isNodeArray.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS,true);
		true;
	}
	,_initConcurrencyTypeToNameMap: function() {
		this._xmlConcurrencyTypeToName = new haxe_ds_EnumValueMap();
		this._xmlConcurrencyTypeToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PARALLEL,"Parallel");
		"Parallel";
		this._xmlConcurrencyTypeToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PERSISTENT,"Persistent");
		"Persistent";
		this._xmlConcurrencyTypeToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.TRANSIENT,"Transient");
		"Transient";
	}
	,_initConcurrencyNameToTypeMap: function() {
		this._xmlConcurrencyNameToType = new haxe_ds_StringMap();
		var k = this._xmlConcurrencyTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PARALLEL);
		var v = tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PARALLEL;
		this._xmlConcurrencyNameToType.set(k,v);
		v;
		var k1 = this._xmlConcurrencyTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PERSISTENT);
		var v1 = tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PERSISTENT;
		this._xmlConcurrencyNameToType.set(k1,v1);
		v1;
		var k2 = this._xmlConcurrencyTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.TRANSIENT);
		var v2 = tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.TRANSIENT;
		this._xmlConcurrencyNameToType.set(k2,v2);
		v2;
	}
	,_initStateTypeToNameMap: function() {
		this._xmlStateTypeToName = new haxe_ds_EnumValueMap();
		this._xmlStateTypeToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DYNAMIC,"Dynamic");
		"Dynamic";
		this._xmlStateTypeToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.BOOLEAN,"Boolean");
		"Boolean";
		this._xmlStateTypeToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DECIMAL,"Decimal");
		"Decimal";
		this._xmlStateTypeToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.INTEGER,"Integer");
		"Integer";
		this._xmlStateTypeToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.TEXT,"Text");
		"Text";
	}
	,_initStateNameToTypeMap: function() {
		this._xmlStateNameToType = new haxe_ds_StringMap();
		var k = this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DYNAMIC);
		var v = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DYNAMIC;
		this._xmlStateNameToType.set(k,v);
		v;
		var k1 = this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.BOOLEAN);
		var v1 = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.BOOLEAN;
		this._xmlStateNameToType.set(k1,v1);
		v1;
		var k2 = this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DECIMAL);
		var v2 = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DECIMAL;
		this._xmlStateNameToType.set(k2,v2);
		v2;
		var k3 = this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.INTEGER);
		var v3 = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.INTEGER;
		this._xmlStateNameToType.set(k3,v3);
		v3;
		var k4 = this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.TEXT);
		var v4 = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.TEXT;
		this._xmlStateNameToType.set(k4,v4);
		v4;
	}
	,_initEventPrefabToNameMap: function() {
		this._xmlEventPrefabToName = new haxe_ds_EnumValueMap();
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.CREATED,"Created");
		"Created";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.UPDATE,"Update");
		"Update";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_CONNECTED,"NetworkConnected");
		"NetworkConnected";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_REQUEST,"NetworkRequest");
		"NetworkRequest";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_SERVER_EVENT,"NetworkServerEvent");
		"NetworkServerEvent";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_CONNECTED,"FileTransferConnected");
		"FileTransferConnected";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_SENDREQUEST,"FileTransferRequest");
		"FileTransferRequest";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICK,"MouseLeftClick");
		"MouseLeftClick";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICK,"MouseRightClick");
		"MouseRightClick";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICKED,"MouseLeftClicked");
		"MouseLeftClicked";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICKED,"MouseRightClicked");
		"MouseRightClicked";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_ENTERED,"MouseEntered");
		"MouseEntered";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_MOVED,"MouseMoved");
		"MouseMoved";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT,"MouseLeft");
		"MouseLeft";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED,"KeyPressed");
		"KeyPressed";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED,"KeyReleased");
		"KeyReleased";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ALT,"KeyPressed_Alt");
		"KeyPressed_Alt";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSPACE,"KeyPressed_Backspace");
		"KeyPressed_Backspace";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CAPS_LOCK,"KeyPressed_Capslock");
		"KeyPressed_Capslock";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CONTROL,"KeyPressed_Control");
		"KeyPressed_Control";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DELETE,"KeyPressed_Delete");
		"KeyPressed_Delete";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DOWN,"KeyPressed_Down");
		"KeyPressed_Down";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_END,"KeyPressed_End");
		"KeyPressed_End";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ENTER,"KeyPressed_Enter");
		"KeyPressed_Enter";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ESCAPE,"KeyPressed_Escape");
		"KeyPressed_Escape";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F1,"KeyPressed_F1");
		"KeyPressed_F1";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F10,"KeyPressed_F10");
		"KeyPressed_F10";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F11,"KeyPressed_F11");
		"KeyPressed_F11";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F12,"KeyPressed_F12");
		"KeyPressed_F12";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F13,"KeyPressed_F13");
		"KeyPressed_F13";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F14,"KeyPressed_F14");
		"KeyPressed_F14";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F15,"KeyPressed_F15");
		"KeyPressed_F15";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F2,"KeyPressed_F2");
		"KeyPressed_F2";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F3,"KeyPressed_F3");
		"KeyPressed_F3";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F4,"KeyPressed_F4");
		"KeyPressed_F4";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F5,"KeyPressed_F5");
		"KeyPressed_F5";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F6,"KeyPressed_F6");
		"KeyPressed_F6";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F7,"KeyPressed_F7");
		"KeyPressed_F7";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F8,"KeyPressed_F8");
		"KeyPressed_F8";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F9,"KeyPressed_F9");
		"KeyPressed_F9";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_HOME,"KeyPressed_Home");
		"KeyPressed_Home";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_INSERT,"KeyPressed_Insert");
		"KeyPressed_Insert";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFT,"KeyPressed_Left");
		"KeyPressed_Left";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_0,"KeyPressed_Num0");
		"KeyPressed_Num0";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_1,"KeyPressed_Num1");
		"KeyPressed_Num1";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_2,"KeyPressed_Num2");
		"KeyPressed_Num2";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_3,"KeyPressed_Num3");
		"KeyPressed_Num3";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_4,"KeyPressed_Num4");
		"KeyPressed_Num4";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_5,"KeyPressed_Num5");
		"KeyPressed_Num5";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_6,"KeyPressed_Num6");
		"KeyPressed_Num6";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_7,"KeyPressed_Num7");
		"KeyPressed_Num7";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_8,"KeyPressed_Num8");
		"KeyPressed_Num8";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_9,"KeyPressed_Num9");
		"KeyPressed_Num9";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ADD,"KeyPressed_Add");
		"KeyPressed_Add";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DECIMAL,"KeyPressed_Decimal");
		"KeyPressed_Decimal";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DIVIDE,"KeyPressed_Divide");
		"KeyPressed_Divide";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ENTER,"KeyPressed_Enter");
		"KeyPressed_Enter";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_MULTIPLY,"KeyPressed_Multiply");
		"KeyPressed_Multiply";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_SUBTRACT,"KeyPressed_Subtract");
		"KeyPressed_Subtract";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_DOWN,"KeyPressed_Pagedown");
		"KeyPressed_Pagedown";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_UP,"KeyPressed_Pageup");
		"KeyPressed_Pageup";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHT,"KeyPressed_Right");
		"KeyPressed_Right";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SHIFT,"KeyPressed_Shift");
		"KeyPressed_Shift";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SPACE,"KeyPressed_Space");
		"KeyPressed_Space";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_TAB,"KeyPressed_Tab");
		"KeyPressed_Tab";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UP,"KeyPressed_Up");
		"KeyPressed_Up";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_A,"KeyPressed_A");
		"KeyPressed_A";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_B,"KeyPressed_B");
		"KeyPressed_B";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_C,"KeyPressed_C");
		"KeyPressed_C";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_D,"KeyPressed_D");
		"KeyPressed_D";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_E,"KeyPressed_E");
		"KeyPressed_E";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F,"KeyPressed_F");
		"KeyPressed_F";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_G,"KeyPressed_G");
		"KeyPressed_G";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_H,"KeyPressed_H");
		"KeyPressed_H";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_I,"KeyPressed_I");
		"KeyPressed_I";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_J,"KeyPressed_J");
		"KeyPressed_J";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_K,"KeyPressed_K");
		"KeyPressed_K";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_L,"KeyPressed_L");
		"KeyPressed_L";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_M,"KeyPressed_M");
		"KeyPressed_M";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_N,"KeyPressed_N");
		"KeyPressed_N";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_O,"KeyPressed_O");
		"KeyPressed_O";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_P,"KeyPressed_P");
		"KeyPressed_P";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Q,"KeyPressed_Q");
		"KeyPressed_Q";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_R,"KeyPressed_R");
		"KeyPressed_R";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_S,"KeyPressed_S");
		"KeyPressed_S";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_T,"KeyPressed_T");
		"KeyPressed_T";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_U,"KeyPressed_U");
		"KeyPressed_U";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_V,"KeyPressed_V");
		"KeyPressed_V";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_W,"KeyPressed_W");
		"KeyPressed_W";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_X,"KeyPressed_X");
		"KeyPressed_X";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Y,"KeyPressed_Y");
		"KeyPressed_Y";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Z,"KeyPressed_Z");
		"KeyPressed_Z";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_0,"KeyPressed_0");
		"KeyPressed_0";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_1,"KeyPressed_1");
		"KeyPressed_1";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_2,"KeyPressed_2");
		"KeyPressed_2";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_3,"KeyPressed_3");
		"KeyPressed_3";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_4,"KeyPressed_4");
		"KeyPressed_4";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_5,"KeyPressed_5");
		"KeyPressed_5";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_6,"KeyPressed_6");
		"KeyPressed_6";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_7,"KeyPressed_7");
		"KeyPressed_7";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_8,"KeyPressed_8");
		"KeyPressed_8";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_9,"KeyPressed_9");
		"KeyPressed_9";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_EQUALS,"KeyPressed_Equals");
		"KeyPressed_Equals";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SLASH,"KeyPressed_Slash");
		"KeyPressed_Slash";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSLASH,"KeyPressed_Backslash");
		"KeyPressed_Backslash";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFTBRACKET,"KeyPressed_LeftBracket");
		"KeyPressed_LeftBracket";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHTBRACKET,"KeyPressed_RightBracket");
		"KeyPressed_RightBracket";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKQUOTE,"KeyPressed_Backquote");
		"KeyPressed_Backquote";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMA,"KeyPressed_Comma");
		"KeyPressed_Comma";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMAND,"KeyPressed_Command");
		"KeyPressed_Command";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_MINUS,"KeyPressed_Minus");
		"KeyPressed_Minus";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PERIOD,"KeyPressed_Period");
		"KeyPressed_Period";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_QUOTE,"KeyPressed_Quote");
		"KeyPressed_Quote";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SEMICOLON,"KeyPressed_Semicolon");
		"KeyPressed_Semicolon";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDMENU,"KeyPressed_AndroidMenu");
		"KeyPressed_AndroidMenu";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDSEARCH,"KeyPressed_AndroidSearch");
		"KeyPressed_AndroidSearch";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UNKNOWN,"KeyPressed_Unknown");
		"KeyPressed_Unknown";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ALT,"KeyReleased_Alt");
		"KeyReleased_Alt";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSPACE,"KeyReleased_Backspace");
		"KeyReleased_Backspace";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CAPS_LOCK,"KeyReleased_Capslock");
		"KeyReleased_Capslock";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CONTROL,"KeyReleased_Control");
		"KeyReleased_Control";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DELETE,"KeyReleased_Delete");
		"KeyReleased_Delete";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DOWN,"KeyReleased_Down");
		"KeyReleased_Down";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_END,"KeyReleased_End");
		"KeyReleased_End";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ENTER,"KeyReleased_Enter");
		"KeyReleased_Enter";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ESCAPE,"KeyReleased_Escape");
		"KeyReleased_Escape";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F1,"KeyReleased_F1");
		"KeyReleased_F1";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F10,"KeyReleased_F10");
		"KeyReleased_F10";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F11,"KeyReleased_F11");
		"KeyReleased_F11";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F12,"KeyReleased_F12");
		"KeyReleased_F12";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F13,"KeyReleased_F13");
		"KeyReleased_F13";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F14,"KeyReleased_F14");
		"KeyReleased_F14";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F15,"KeyReleased_F15");
		"KeyReleased_F15";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F2,"KeyReleased_F2");
		"KeyReleased_F2";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F3,"KeyReleased_F3");
		"KeyReleased_F3";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F4,"KeyReleased_F4");
		"KeyReleased_F4";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F5,"KeyReleased_F5");
		"KeyReleased_F5";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F6,"KeyReleased_F6");
		"KeyReleased_F6";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F7,"KeyReleased_F7");
		"KeyReleased_F7";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F8,"KeyReleased_F8");
		"KeyReleased_F8";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F9,"KeyReleased_F9");
		"KeyReleased_F9";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_HOME,"KeyReleased_Home");
		"KeyReleased_Home";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_INSERT,"KeyReleased_Insert");
		"KeyReleased_Insert";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFT,"KeyReleased_Left");
		"KeyReleased_Left";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_0,"KeyReleased_Num0");
		"KeyReleased_Num0";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_1,"KeyReleased_Num1");
		"KeyReleased_Num1";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_2,"KeyReleased_Num2");
		"KeyReleased_Num2";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_3,"KeyReleased_Num3");
		"KeyReleased_Num3";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_4,"KeyReleased_Num4");
		"KeyReleased_Num4";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_5,"KeyReleased_Num5");
		"KeyReleased_Num5";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_6,"KeyReleased_Num6");
		"KeyReleased_Num6";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_7,"KeyReleased_Num7");
		"KeyReleased_Num7";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_8,"KeyReleased_Num8");
		"KeyReleased_Num8";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_9,"KeyReleased_Num9");
		"KeyReleased_Num9";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ADD,"KeyReleased_Add");
		"KeyReleased_Add";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DECIMAL,"KeyReleased_Decimal");
		"KeyReleased_Decimal";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DIVIDE,"KeyReleased_Divide");
		"KeyReleased_Divide";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ENTER,"KeyReleased_Enter");
		"KeyReleased_Enter";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_MULTIPLY,"KeyReleased_Multiply");
		"KeyReleased_Multiply";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_SUBTRACT,"KeyReleased_Subtract");
		"KeyReleased_Subtract";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_DOWN,"KeyReleased_Pagedown");
		"KeyReleased_Pagedown";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_UP,"KeyReleased_Pageup");
		"KeyReleased_Pageup";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHT,"KeyReleased_Right");
		"KeyReleased_Right";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SHIFT,"KeyReleased_Shift");
		"KeyReleased_Shift";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SPACE,"KeyReleased_Space");
		"KeyReleased_Space";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_TAB,"KeyReleased_Tab");
		"KeyReleased_Tab";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UP,"KeyReleased_Up");
		"KeyReleased_Up";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_A,"KeyReleased_A");
		"KeyReleased_A";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_B,"KeyReleased_B");
		"KeyReleased_B";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_C,"KeyReleased_C");
		"KeyReleased_C";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_D,"KeyReleased_D");
		"KeyReleased_D";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_E,"KeyReleased_E");
		"KeyReleased_E";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F,"KeyReleased_F");
		"KeyReleased_F";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_G,"KeyReleased_G");
		"KeyReleased_G";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_H,"KeyReleased_H");
		"KeyReleased_H";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_I,"KeyReleased_I");
		"KeyReleased_I";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_J,"KeyReleased_J");
		"KeyReleased_J";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_K,"KeyReleased_K");
		"KeyReleased_K";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_L,"KeyReleased_L");
		"KeyReleased_L";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_M,"KeyReleased_M");
		"KeyReleased_M";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_N,"KeyReleased_N");
		"KeyReleased_N";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_O,"KeyReleased_O");
		"KeyReleased_O";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_P,"KeyReleased_P");
		"KeyReleased_P";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Q,"KeyReleased_Q");
		"KeyReleased_Q";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_R,"KeyReleased_R");
		"KeyReleased_R";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_S,"KeyReleased_S");
		"KeyReleased_S";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_T,"KeyReleased_T");
		"KeyReleased_T";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_U,"KeyReleased_U");
		"KeyReleased_U";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_V,"KeyReleased_V");
		"KeyReleased_V";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_W,"KeyReleased_W");
		"KeyReleased_W";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_X,"KeyReleased_X");
		"KeyReleased_X";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Y,"KeyReleased_Y");
		"KeyReleased_Y";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Z,"KeyReleased_Z");
		"KeyReleased_Z";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_0,"KeyReleased_0");
		"KeyReleased_0";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_1,"KeyReleased_1");
		"KeyReleased_1";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_2,"KeyReleased_2");
		"KeyReleased_2";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_3,"KeyReleased_3");
		"KeyReleased_3";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_4,"KeyReleased_4");
		"KeyReleased_4";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_5,"KeyReleased_5");
		"KeyReleased_5";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_6,"KeyReleased_6");
		"KeyReleased_6";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_7,"KeyReleased_7");
		"KeyReleased_7";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_8,"KeyReleased_8");
		"KeyReleased_8";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_9,"KeyReleased_9");
		"KeyReleased_9";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_EQUALS,"KeyReleased_Equals");
		"KeyReleased_Equals";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SLASH,"KeyReleased_Slash");
		"KeyReleased_Slash";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSLASH,"KeyReleased_Backslash");
		"KeyReleased_Backslash";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFTBRACKET,"KeyReleased_LeftBracket");
		"KeyReleased_LeftBracket";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHTBRACKET,"KeyReleased_RightBracket");
		"KeyReleased_RightBracket";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKQUOTE,"KeyReleased_Backquote");
		"KeyReleased_Backquote";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMA,"KeyReleased_Comma");
		"KeyReleased_Comma";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMAND,"KeyReleased_Command");
		"KeyReleased_Command";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_MINUS,"KeyReleased_Minus");
		"KeyReleased_Minus";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PERIOD,"KeyReleased_Period");
		"KeyReleased_Period";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_QUOTE,"KeyReleased_Quote");
		"KeyReleased_Quote";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SEMICOLON,"KeyReleased_Semicolon");
		"KeyReleased_Semicolon";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDMENU,"KeyReleased_AndroidMenu");
		"KeyReleased_AndroidMenu";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDSEARCH,"KeyReleased_AndroidSearch");
		"KeyReleased_AndroidSearch";
		this._xmlEventPrefabToName.set(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UNKNOWN,"KeyReleased_Unknown");
		"KeyReleased_Unknown";
	}
	,_initEventNameToPrefabMap: function() {
		this._xmlEventNameToPrefab = new haxe_ds_StringMap();
		var k = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.CREATED);
		var v = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.CREATED;
		this._xmlEventNameToPrefab.set(k,v);
		v;
		var k1 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.UPDATE);
		var v1 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.UPDATE;
		this._xmlEventNameToPrefab.set(k1,v1);
		v1;
		var k2 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_CONNECTED);
		var v2 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_CONNECTED;
		this._xmlEventNameToPrefab.set(k2,v2);
		v2;
		var k3 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_REQUEST);
		var v3 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_REQUEST;
		this._xmlEventNameToPrefab.set(k3,v3);
		v3;
		var k4 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_SERVER_EVENT);
		var v4 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_SERVER_EVENT;
		this._xmlEventNameToPrefab.set(k4,v4);
		v4;
		var k5 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_CONNECTED);
		var v5 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_CONNECTED;
		this._xmlEventNameToPrefab.set(k5,v5);
		v5;
		var k6 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_SENDREQUEST);
		var v6 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_SENDREQUEST;
		this._xmlEventNameToPrefab.set(k6,v6);
		v6;
		var k7 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICK);
		var v7 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICK;
		this._xmlEventNameToPrefab.set(k7,v7);
		v7;
		var k8 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICK);
		var v8 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICK;
		this._xmlEventNameToPrefab.set(k8,v8);
		v8;
		var k9 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICKED);
		var v9 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICKED;
		this._xmlEventNameToPrefab.set(k9,v9);
		v9;
		var k10 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICKED);
		var v10 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICKED;
		this._xmlEventNameToPrefab.set(k10,v10);
		v10;
		var k11 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_ENTERED);
		var v11 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_ENTERED;
		this._xmlEventNameToPrefab.set(k11,v11);
		v11;
		var k12 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_MOVED);
		var v12 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_MOVED;
		this._xmlEventNameToPrefab.set(k12,v12);
		v12;
		var k13 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT);
		var v13 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT;
		this._xmlEventNameToPrefab.set(k13,v13);
		v13;
		var k14 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED);
		var v14 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED;
		this._xmlEventNameToPrefab.set(k14,v14);
		v14;
		var k15 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED);
		var v15 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED;
		this._xmlEventNameToPrefab.set(k15,v15);
		v15;
		var k16 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ALT);
		var v16 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ALT;
		this._xmlEventNameToPrefab.set(k16,v16);
		v16;
		var k17 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSPACE);
		var v17 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSPACE;
		this._xmlEventNameToPrefab.set(k17,v17);
		v17;
		var k18 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CAPS_LOCK);
		var v18 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CAPS_LOCK;
		this._xmlEventNameToPrefab.set(k18,v18);
		v18;
		var k19 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CONTROL);
		var v19 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CONTROL;
		this._xmlEventNameToPrefab.set(k19,v19);
		v19;
		var k20 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DELETE);
		var v20 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DELETE;
		this._xmlEventNameToPrefab.set(k20,v20);
		v20;
		var k21 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DOWN);
		var v21 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DOWN;
		this._xmlEventNameToPrefab.set(k21,v21);
		v21;
		var k22 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_END);
		var v22 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_END;
		this._xmlEventNameToPrefab.set(k22,v22);
		v22;
		var k23 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ENTER);
		var v23 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ENTER;
		this._xmlEventNameToPrefab.set(k23,v23);
		v23;
		var k24 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ESCAPE);
		var v24 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ESCAPE;
		this._xmlEventNameToPrefab.set(k24,v24);
		v24;
		var k25 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F1);
		var v25 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F1;
		this._xmlEventNameToPrefab.set(k25,v25);
		v25;
		var k26 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F10);
		var v26 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F10;
		this._xmlEventNameToPrefab.set(k26,v26);
		v26;
		var k27 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F11);
		var v27 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F11;
		this._xmlEventNameToPrefab.set(k27,v27);
		v27;
		var k28 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F12);
		var v28 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F12;
		this._xmlEventNameToPrefab.set(k28,v28);
		v28;
		var k29 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F13);
		var v29 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F13;
		this._xmlEventNameToPrefab.set(k29,v29);
		v29;
		var k30 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F14);
		var v30 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F14;
		this._xmlEventNameToPrefab.set(k30,v30);
		v30;
		var k31 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F15);
		var v31 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F15;
		this._xmlEventNameToPrefab.set(k31,v31);
		v31;
		var k32 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F2);
		var v32 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F2;
		this._xmlEventNameToPrefab.set(k32,v32);
		v32;
		var k33 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F3);
		var v33 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F3;
		this._xmlEventNameToPrefab.set(k33,v33);
		v33;
		var k34 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F4);
		var v34 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F4;
		this._xmlEventNameToPrefab.set(k34,v34);
		v34;
		var k35 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F5);
		var v35 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F5;
		this._xmlEventNameToPrefab.set(k35,v35);
		v35;
		var k36 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F6);
		var v36 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F6;
		this._xmlEventNameToPrefab.set(k36,v36);
		v36;
		var k37 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F7);
		var v37 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F7;
		this._xmlEventNameToPrefab.set(k37,v37);
		v37;
		var k38 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F8);
		var v38 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F8;
		this._xmlEventNameToPrefab.set(k38,v38);
		v38;
		var k39 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F9);
		var v39 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F9;
		this._xmlEventNameToPrefab.set(k39,v39);
		v39;
		var k40 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_HOME);
		var v40 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_HOME;
		this._xmlEventNameToPrefab.set(k40,v40);
		v40;
		var k41 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_INSERT);
		var v41 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_INSERT;
		this._xmlEventNameToPrefab.set(k41,v41);
		v41;
		var k42 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFT);
		var v42 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFT;
		this._xmlEventNameToPrefab.set(k42,v42);
		v42;
		var k43 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_0);
		var v43 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_0;
		this._xmlEventNameToPrefab.set(k43,v43);
		v43;
		var k44 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_1);
		var v44 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_1;
		this._xmlEventNameToPrefab.set(k44,v44);
		v44;
		var k45 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_2);
		var v45 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_2;
		this._xmlEventNameToPrefab.set(k45,v45);
		v45;
		var k46 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_3);
		var v46 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_3;
		this._xmlEventNameToPrefab.set(k46,v46);
		v46;
		var k47 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_4);
		var v47 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_4;
		this._xmlEventNameToPrefab.set(k47,v47);
		v47;
		var k48 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_5);
		var v48 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_5;
		this._xmlEventNameToPrefab.set(k48,v48);
		v48;
		var k49 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_6);
		var v49 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_6;
		this._xmlEventNameToPrefab.set(k49,v49);
		v49;
		var k50 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_7);
		var v50 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_7;
		this._xmlEventNameToPrefab.set(k50,v50);
		v50;
		var k51 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_8);
		var v51 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_8;
		this._xmlEventNameToPrefab.set(k51,v51);
		v51;
		var k52 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_9);
		var v52 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_9;
		this._xmlEventNameToPrefab.set(k52,v52);
		v52;
		var k53 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ADD);
		var v53 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ADD;
		this._xmlEventNameToPrefab.set(k53,v53);
		v53;
		var k54 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DECIMAL);
		var v54 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DECIMAL;
		this._xmlEventNameToPrefab.set(k54,v54);
		v54;
		var k55 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DIVIDE);
		var v55 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DIVIDE;
		this._xmlEventNameToPrefab.set(k55,v55);
		v55;
		var k56 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ENTER);
		var v56 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ENTER;
		this._xmlEventNameToPrefab.set(k56,v56);
		v56;
		var k57 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_MULTIPLY);
		var v57 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_MULTIPLY;
		this._xmlEventNameToPrefab.set(k57,v57);
		v57;
		var k58 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_SUBTRACT);
		var v58 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_SUBTRACT;
		this._xmlEventNameToPrefab.set(k58,v58);
		v58;
		var k59 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_DOWN);
		var v59 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_DOWN;
		this._xmlEventNameToPrefab.set(k59,v59);
		v59;
		var k60 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_UP);
		var v60 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_UP;
		this._xmlEventNameToPrefab.set(k60,v60);
		v60;
		var k61 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHT);
		var v61 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHT;
		this._xmlEventNameToPrefab.set(k61,v61);
		v61;
		var k62 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SHIFT);
		var v62 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SHIFT;
		this._xmlEventNameToPrefab.set(k62,v62);
		v62;
		var k63 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SPACE);
		var v63 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SPACE;
		this._xmlEventNameToPrefab.set(k63,v63);
		v63;
		var k64 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_TAB);
		var v64 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_TAB;
		this._xmlEventNameToPrefab.set(k64,v64);
		v64;
		var k65 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UP);
		var v65 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UP;
		this._xmlEventNameToPrefab.set(k65,v65);
		v65;
		var k66 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_A);
		var v66 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_A;
		this._xmlEventNameToPrefab.set(k66,v66);
		v66;
		var k67 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_B);
		var v67 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_B;
		this._xmlEventNameToPrefab.set(k67,v67);
		v67;
		var k68 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_C);
		var v68 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_C;
		this._xmlEventNameToPrefab.set(k68,v68);
		v68;
		var k69 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_D);
		var v69 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_D;
		this._xmlEventNameToPrefab.set(k69,v69);
		v69;
		var k70 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_E);
		var v70 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_E;
		this._xmlEventNameToPrefab.set(k70,v70);
		v70;
		var k71 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F);
		var v71 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F;
		this._xmlEventNameToPrefab.set(k71,v71);
		v71;
		var k72 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_G);
		var v72 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_G;
		this._xmlEventNameToPrefab.set(k72,v72);
		v72;
		var k73 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_H);
		var v73 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_H;
		this._xmlEventNameToPrefab.set(k73,v73);
		v73;
		var k74 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_I);
		var v74 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_I;
		this._xmlEventNameToPrefab.set(k74,v74);
		v74;
		var k75 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_J);
		var v75 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_J;
		this._xmlEventNameToPrefab.set(k75,v75);
		v75;
		var k76 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_K);
		var v76 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_K;
		this._xmlEventNameToPrefab.set(k76,v76);
		v76;
		var k77 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_L);
		var v77 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_L;
		this._xmlEventNameToPrefab.set(k77,v77);
		v77;
		var k78 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_M);
		var v78 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_M;
		this._xmlEventNameToPrefab.set(k78,v78);
		v78;
		var k79 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_N);
		var v79 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_N;
		this._xmlEventNameToPrefab.set(k79,v79);
		v79;
		var k80 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_O);
		var v80 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_O;
		this._xmlEventNameToPrefab.set(k80,v80);
		v80;
		var k81 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_P);
		var v81 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_P;
		this._xmlEventNameToPrefab.set(k81,v81);
		v81;
		var k82 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Q);
		var v82 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Q;
		this._xmlEventNameToPrefab.set(k82,v82);
		v82;
		var k83 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_R);
		var v83 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_R;
		this._xmlEventNameToPrefab.set(k83,v83);
		v83;
		var k84 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_S);
		var v84 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_S;
		this._xmlEventNameToPrefab.set(k84,v84);
		v84;
		var k85 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_T);
		var v85 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_T;
		this._xmlEventNameToPrefab.set(k85,v85);
		v85;
		var k86 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_U);
		var v86 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_U;
		this._xmlEventNameToPrefab.set(k86,v86);
		v86;
		var k87 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_V);
		var v87 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_V;
		this._xmlEventNameToPrefab.set(k87,v87);
		v87;
		var k88 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_W);
		var v88 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_W;
		this._xmlEventNameToPrefab.set(k88,v88);
		v88;
		var k89 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_X);
		var v89 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_X;
		this._xmlEventNameToPrefab.set(k89,v89);
		v89;
		var k90 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Y);
		var v90 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Y;
		this._xmlEventNameToPrefab.set(k90,v90);
		v90;
		var k91 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Z);
		var v91 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Z;
		this._xmlEventNameToPrefab.set(k91,v91);
		v91;
		var k92 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_0);
		var v92 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_0;
		this._xmlEventNameToPrefab.set(k92,v92);
		v92;
		var k93 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_1);
		var v93 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_1;
		this._xmlEventNameToPrefab.set(k93,v93);
		v93;
		var k94 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_2);
		var v94 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_2;
		this._xmlEventNameToPrefab.set(k94,v94);
		v94;
		var k95 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_3);
		var v95 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_3;
		this._xmlEventNameToPrefab.set(k95,v95);
		v95;
		var k96 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_4);
		var v96 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_4;
		this._xmlEventNameToPrefab.set(k96,v96);
		v96;
		var k97 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_5);
		var v97 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_5;
		this._xmlEventNameToPrefab.set(k97,v97);
		v97;
		var k98 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_6);
		var v98 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_6;
		this._xmlEventNameToPrefab.set(k98,v98);
		v98;
		var k99 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_7);
		var v99 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_7;
		this._xmlEventNameToPrefab.set(k99,v99);
		v99;
		var k100 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_8);
		var v100 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_8;
		this._xmlEventNameToPrefab.set(k100,v100);
		v100;
		var k101 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_9);
		var v101 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_9;
		this._xmlEventNameToPrefab.set(k101,v101);
		v101;
		var k102 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_EQUALS);
		var v102 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_EQUALS;
		this._xmlEventNameToPrefab.set(k102,v102);
		v102;
		var k103 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SLASH);
		var v103 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SLASH;
		this._xmlEventNameToPrefab.set(k103,v103);
		v103;
		var k104 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSLASH);
		var v104 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSLASH;
		this._xmlEventNameToPrefab.set(k104,v104);
		v104;
		var k105 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFTBRACKET);
		var v105 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFTBRACKET;
		this._xmlEventNameToPrefab.set(k105,v105);
		v105;
		var k106 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHTBRACKET);
		var v106 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHTBRACKET;
		this._xmlEventNameToPrefab.set(k106,v106);
		v106;
		var k107 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKQUOTE);
		var v107 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKQUOTE;
		this._xmlEventNameToPrefab.set(k107,v107);
		v107;
		var k108 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMA);
		var v108 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMA;
		this._xmlEventNameToPrefab.set(k108,v108);
		v108;
		var k109 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMAND);
		var v109 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMAND;
		this._xmlEventNameToPrefab.set(k109,v109);
		v109;
		var k110 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_MINUS);
		var v110 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_MINUS;
		this._xmlEventNameToPrefab.set(k110,v110);
		v110;
		var k111 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PERIOD);
		var v111 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PERIOD;
		this._xmlEventNameToPrefab.set(k111,v111);
		v111;
		var k112 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_QUOTE);
		var v112 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_QUOTE;
		this._xmlEventNameToPrefab.set(k112,v112);
		v112;
		var k113 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SEMICOLON);
		var v113 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SEMICOLON;
		this._xmlEventNameToPrefab.set(k113,v113);
		v113;
		var k114 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDMENU);
		var v114 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDMENU;
		this._xmlEventNameToPrefab.set(k114,v114);
		v114;
		var k115 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDSEARCH);
		var v115 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDSEARCH;
		this._xmlEventNameToPrefab.set(k115,v115);
		v115;
		var k116 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UNKNOWN);
		var v116 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UNKNOWN;
		this._xmlEventNameToPrefab.set(k116,v116);
		v116;
		var k117 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ALT);
		var v117 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ALT;
		this._xmlEventNameToPrefab.set(k117,v117);
		v117;
		var k118 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSPACE);
		var v118 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSPACE;
		this._xmlEventNameToPrefab.set(k118,v118);
		v118;
		var k119 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CAPS_LOCK);
		var v119 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CAPS_LOCK;
		this._xmlEventNameToPrefab.set(k119,v119);
		v119;
		var k120 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CONTROL);
		var v120 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CONTROL;
		this._xmlEventNameToPrefab.set(k120,v120);
		v120;
		var k121 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DELETE);
		var v121 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DELETE;
		this._xmlEventNameToPrefab.set(k121,v121);
		v121;
		var k122 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DOWN);
		var v122 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DOWN;
		this._xmlEventNameToPrefab.set(k122,v122);
		v122;
		var k123 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_END);
		var v123 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_END;
		this._xmlEventNameToPrefab.set(k123,v123);
		v123;
		var k124 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ENTER);
		var v124 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ENTER;
		this._xmlEventNameToPrefab.set(k124,v124);
		v124;
		var k125 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ESCAPE);
		var v125 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ESCAPE;
		this._xmlEventNameToPrefab.set(k125,v125);
		v125;
		var k126 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F1);
		var v126 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F1;
		this._xmlEventNameToPrefab.set(k126,v126);
		v126;
		var k127 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F10);
		var v127 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F10;
		this._xmlEventNameToPrefab.set(k127,v127);
		v127;
		var k128 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F11);
		var v128 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F11;
		this._xmlEventNameToPrefab.set(k128,v128);
		v128;
		var k129 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F12);
		var v129 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F12;
		this._xmlEventNameToPrefab.set(k129,v129);
		v129;
		var k130 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F13);
		var v130 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F13;
		this._xmlEventNameToPrefab.set(k130,v130);
		v130;
		var k131 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F14);
		var v131 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F14;
		this._xmlEventNameToPrefab.set(k131,v131);
		v131;
		var k132 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F15);
		var v132 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F15;
		this._xmlEventNameToPrefab.set(k132,v132);
		v132;
		var k133 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F2);
		var v133 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F2;
		this._xmlEventNameToPrefab.set(k133,v133);
		v133;
		var k134 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F3);
		var v134 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F3;
		this._xmlEventNameToPrefab.set(k134,v134);
		v134;
		var k135 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F4);
		var v135 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F4;
		this._xmlEventNameToPrefab.set(k135,v135);
		v135;
		var k136 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F5);
		var v136 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F5;
		this._xmlEventNameToPrefab.set(k136,v136);
		v136;
		var k137 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F6);
		var v137 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F6;
		this._xmlEventNameToPrefab.set(k137,v137);
		v137;
		var k138 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F7);
		var v138 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F7;
		this._xmlEventNameToPrefab.set(k138,v138);
		v138;
		var k139 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F8);
		var v139 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F8;
		this._xmlEventNameToPrefab.set(k139,v139);
		v139;
		var k140 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F9);
		var v140 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F9;
		this._xmlEventNameToPrefab.set(k140,v140);
		v140;
		var k141 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_HOME);
		var v141 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_HOME;
		this._xmlEventNameToPrefab.set(k141,v141);
		v141;
		var k142 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_INSERT);
		var v142 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_INSERT;
		this._xmlEventNameToPrefab.set(k142,v142);
		v142;
		var k143 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFT);
		var v143 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFT;
		this._xmlEventNameToPrefab.set(k143,v143);
		v143;
		var k144 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_0);
		var v144 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_0;
		this._xmlEventNameToPrefab.set(k144,v144);
		v144;
		var k145 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_1);
		var v145 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_1;
		this._xmlEventNameToPrefab.set(k145,v145);
		v145;
		var k146 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_2);
		var v146 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_2;
		this._xmlEventNameToPrefab.set(k146,v146);
		v146;
		var k147 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_3);
		var v147 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_3;
		this._xmlEventNameToPrefab.set(k147,v147);
		v147;
		var k148 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_4);
		var v148 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_4;
		this._xmlEventNameToPrefab.set(k148,v148);
		v148;
		var k149 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_5);
		var v149 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_5;
		this._xmlEventNameToPrefab.set(k149,v149);
		v149;
		var k150 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_6);
		var v150 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_6;
		this._xmlEventNameToPrefab.set(k150,v150);
		v150;
		var k151 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_7);
		var v151 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_7;
		this._xmlEventNameToPrefab.set(k151,v151);
		v151;
		var k152 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_8);
		var v152 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_8;
		this._xmlEventNameToPrefab.set(k152,v152);
		v152;
		var k153 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_9);
		var v153 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_9;
		this._xmlEventNameToPrefab.set(k153,v153);
		v153;
		var k154 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ADD);
		var v154 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ADD;
		this._xmlEventNameToPrefab.set(k154,v154);
		v154;
		var k155 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DECIMAL);
		var v155 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DECIMAL;
		this._xmlEventNameToPrefab.set(k155,v155);
		v155;
		var k156 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DIVIDE);
		var v156 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DIVIDE;
		this._xmlEventNameToPrefab.set(k156,v156);
		v156;
		var k157 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ENTER);
		var v157 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ENTER;
		this._xmlEventNameToPrefab.set(k157,v157);
		v157;
		var k158 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_MULTIPLY);
		var v158 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_MULTIPLY;
		this._xmlEventNameToPrefab.set(k158,v158);
		v158;
		var k159 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_SUBTRACT);
		var v159 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_SUBTRACT;
		this._xmlEventNameToPrefab.set(k159,v159);
		v159;
		var k160 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_DOWN);
		var v160 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_DOWN;
		this._xmlEventNameToPrefab.set(k160,v160);
		v160;
		var k161 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_UP);
		var v161 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_UP;
		this._xmlEventNameToPrefab.set(k161,v161);
		v161;
		var k162 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHT);
		var v162 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHT;
		this._xmlEventNameToPrefab.set(k162,v162);
		v162;
		var k163 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SHIFT);
		var v163 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SHIFT;
		this._xmlEventNameToPrefab.set(k163,v163);
		v163;
		var k164 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SPACE);
		var v164 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SPACE;
		this._xmlEventNameToPrefab.set(k164,v164);
		v164;
		var k165 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_TAB);
		var v165 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_TAB;
		this._xmlEventNameToPrefab.set(k165,v165);
		v165;
		var k166 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UP);
		var v166 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UP;
		this._xmlEventNameToPrefab.set(k166,v166);
		v166;
		var k167 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_A);
		var v167 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_A;
		this._xmlEventNameToPrefab.set(k167,v167);
		v167;
		var k168 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_B);
		var v168 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_B;
		this._xmlEventNameToPrefab.set(k168,v168);
		v168;
		var k169 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_C);
		var v169 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_C;
		this._xmlEventNameToPrefab.set(k169,v169);
		v169;
		var k170 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_D);
		var v170 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_D;
		this._xmlEventNameToPrefab.set(k170,v170);
		v170;
		var k171 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_E);
		var v171 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_E;
		this._xmlEventNameToPrefab.set(k171,v171);
		v171;
		var k172 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F);
		var v172 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F;
		this._xmlEventNameToPrefab.set(k172,v172);
		v172;
		var k173 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_G);
		var v173 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_G;
		this._xmlEventNameToPrefab.set(k173,v173);
		v173;
		var k174 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_H);
		var v174 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_H;
		this._xmlEventNameToPrefab.set(k174,v174);
		v174;
		var k175 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_I);
		var v175 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_I;
		this._xmlEventNameToPrefab.set(k175,v175);
		v175;
		var k176 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_J);
		var v176 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_J;
		this._xmlEventNameToPrefab.set(k176,v176);
		v176;
		var k177 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_K);
		var v177 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_K;
		this._xmlEventNameToPrefab.set(k177,v177);
		v177;
		var k178 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_L);
		var v178 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_L;
		this._xmlEventNameToPrefab.set(k178,v178);
		v178;
		var k179 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_M);
		var v179 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_M;
		this._xmlEventNameToPrefab.set(k179,v179);
		v179;
		var k180 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_N);
		var v180 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_N;
		this._xmlEventNameToPrefab.set(k180,v180);
		v180;
		var k181 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_O);
		var v181 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_O;
		this._xmlEventNameToPrefab.set(k181,v181);
		v181;
		var k182 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_P);
		var v182 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_P;
		this._xmlEventNameToPrefab.set(k182,v182);
		v182;
		var k183 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Q);
		var v183 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Q;
		this._xmlEventNameToPrefab.set(k183,v183);
		v183;
		var k184 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_R);
		var v184 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_R;
		this._xmlEventNameToPrefab.set(k184,v184);
		v184;
		var k185 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_S);
		var v185 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_S;
		this._xmlEventNameToPrefab.set(k185,v185);
		v185;
		var k186 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_T);
		var v186 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_T;
		this._xmlEventNameToPrefab.set(k186,v186);
		v186;
		var k187 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_U);
		var v187 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_U;
		this._xmlEventNameToPrefab.set(k187,v187);
		v187;
		var k188 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_V);
		var v188 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_V;
		this._xmlEventNameToPrefab.set(k188,v188);
		v188;
		var k189 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_W);
		var v189 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_W;
		this._xmlEventNameToPrefab.set(k189,v189);
		v189;
		var k190 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_X);
		var v190 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_X;
		this._xmlEventNameToPrefab.set(k190,v190);
		v190;
		var k191 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Y);
		var v191 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Y;
		this._xmlEventNameToPrefab.set(k191,v191);
		v191;
		var k192 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Z);
		var v192 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Z;
		this._xmlEventNameToPrefab.set(k192,v192);
		v192;
		var k193 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_0);
		var v193 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_0;
		this._xmlEventNameToPrefab.set(k193,v193);
		v193;
		var k194 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_1);
		var v194 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_1;
		this._xmlEventNameToPrefab.set(k194,v194);
		v194;
		var k195 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_2);
		var v195 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_2;
		this._xmlEventNameToPrefab.set(k195,v195);
		v195;
		var k196 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_3);
		var v196 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_3;
		this._xmlEventNameToPrefab.set(k196,v196);
		v196;
		var k197 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_4);
		var v197 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_4;
		this._xmlEventNameToPrefab.set(k197,v197);
		v197;
		var k198 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_5);
		var v198 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_5;
		this._xmlEventNameToPrefab.set(k198,v198);
		v198;
		var k199 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_6);
		var v199 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_6;
		this._xmlEventNameToPrefab.set(k199,v199);
		v199;
		var k200 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_7);
		var v200 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_7;
		this._xmlEventNameToPrefab.set(k200,v200);
		v200;
		var k201 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_8);
		var v201 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_8;
		this._xmlEventNameToPrefab.set(k201,v201);
		v201;
		var k202 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_9);
		var v202 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_9;
		this._xmlEventNameToPrefab.set(k202,v202);
		v202;
		var k203 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_EQUALS);
		var v203 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_EQUALS;
		this._xmlEventNameToPrefab.set(k203,v203);
		v203;
		var k204 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SLASH);
		var v204 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SLASH;
		this._xmlEventNameToPrefab.set(k204,v204);
		v204;
		var k205 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSLASH);
		var v205 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSLASH;
		this._xmlEventNameToPrefab.set(k205,v205);
		v205;
		var k206 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFTBRACKET);
		var v206 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFTBRACKET;
		this._xmlEventNameToPrefab.set(k206,v206);
		v206;
		var k207 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHTBRACKET);
		var v207 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHTBRACKET;
		this._xmlEventNameToPrefab.set(k207,v207);
		v207;
		var k208 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKQUOTE);
		var v208 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKQUOTE;
		this._xmlEventNameToPrefab.set(k208,v208);
		v208;
		var k209 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMA);
		var v209 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMA;
		this._xmlEventNameToPrefab.set(k209,v209);
		v209;
		var k210 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMAND);
		var v210 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMAND;
		this._xmlEventNameToPrefab.set(k210,v210);
		v210;
		var k211 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_MINUS);
		var v211 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_MINUS;
		this._xmlEventNameToPrefab.set(k211,v211);
		v211;
		var k212 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PERIOD);
		var v212 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PERIOD;
		this._xmlEventNameToPrefab.set(k212,v212);
		v212;
		var k213 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_QUOTE);
		var v213 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_QUOTE;
		this._xmlEventNameToPrefab.set(k213,v213);
		v213;
		var k214 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SEMICOLON);
		var v214 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SEMICOLON;
		this._xmlEventNameToPrefab.set(k214,v214);
		v214;
		var k215 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDMENU);
		var v215 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDMENU;
		this._xmlEventNameToPrefab.set(k215,v215);
		v215;
		var k216 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDSEARCH);
		var v216 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDSEARCH;
		this._xmlEventNameToPrefab.set(k216,v216);
		v216;
		var k217 = this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UNKNOWN);
		var v217 = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UNKNOWN;
		this._xmlEventNameToPrefab.set(k217,v217);
		v217;
	}
	,parseGameNode: function(p_gameNode) {
		tools_spark_framework_Console.info("Extending " + p_gameNode.get_nodeName() + " Node...");
		if(this._extendGameNode(p_gameNode)) {
			tools_spark_framework_Console.info("Extending " + p_gameNode.get_nodeName() + " Node COMPLETED");
			tools_spark_framework_Console.info("Merging " + p_gameNode.get_nodeName() + " Node...");
			this._mergeGameNode(p_gameNode);
			tools_spark_framework_Console.info("Merging " + p_gameNode.get_nodeName() + " Node COMPLETED");
			tools_spark_framework_Console.info("Validating " + p_gameNode.get_nodeName() + " Node...");
			if(this._validateGameNode(p_gameNode)) {
				tools_spark_framework_Console.info("Validating " + p_gameNode.get_nodeName() + " Node COMPLETED");
				return true;
			} else {
				tools_spark_framework_Console.error("Game Entity could not be validated");
				return false;
			}
		} else {
			tools_spark_framework_Console.error("Game Entity Class is not valid!");
			return false;
		}
	}
	,instantiateEntity: function(p_gameNode) {
		return this._gameClassInstantiator.instantiateEntity(p_gameNode);
	}
	,_extendGameNode: function(p_gameNode) {
		var l_gameNodeType;
		if((function($this) {
			var $r;
			var _this = p_gameNode.get_nodeName();
			$r = HxOverrides.substr(_this,0,1);
			return $r;
		}(this)) == "_") {
			var key;
			var _this1 = p_gameNode.get_nodeName();
			key = HxOverrides.substr(_this1,1,null);
			l_gameNodeType = this._xmlNodeNameToNodeType.get(key);
		} else {
			var key1 = p_gameNode.get_nodeName();
			l_gameNodeType = this._xmlNodeNameToNodeType.get(key1);
		}
		if(l_gameNodeType == null) {
			tools_spark_framework_Console.error("Unexpected Element: <" + p_gameNode.get_nodeName() + ">");
			return false;
		} else {
			var $it0 = p_gameNode.elements();
			while( $it0.hasNext() ) {
				var elt = $it0.next();
				if(this._extendGameNode(elt) == false) {
					tools_spark_framework_Console.error("Failed to parse node " + elt.get_nodeName());
					return false;
				}
			}
			if(this._handleExtendsElement(p_gameNode,l_gameNodeType)) {
				if(this._handleExtendsAttribute(p_gameNode,l_gameNodeType)) return true; else {
					tools_spark_framework_Console.error("Failed to extend " + Std.string(l_gameNodeType) + " node from the \"extends\" parameter.");
					return false;
				}
			} else {
				tools_spark_framework_Console.error("Failed to extend " + Std.string(l_gameNodeType) + " node from the \"Extends\" tag.");
				return false;
			}
		}
	}
	,_handleExtendsElement: function(p_gameNode,p_nodeType) {
		var l_extendsElementFound = p_gameNode.elementsNamed("Extends").hasNext();
		if(this._isNodeExtendable.get(p_nodeType) && l_extendsElementFound) {
			var l_extendsElement = p_gameNode.elementsNamed("Extends").next();
			var l_extendsChildren = new Array();
			var $it0 = l_extendsElement.elements();
			while( $it0.hasNext() ) {
				var elt = $it0.next();
				l_extendsChildren.splice(0,0,elt);
			}
			var _g = 0;
			while(_g < l_extendsChildren.length) {
				var elt1 = l_extendsChildren[_g];
				++_g;
				if(this._xmlNodeTypeToNodeName.get(p_nodeType) == elt1.get_nodeName()) this._moveChildren(p_gameNode,elt1); else {
					tools_spark_framework_Console.error("Expected Node <" + this._xmlNodeTypeToNodeName.get(p_nodeType) + ">. Got <" + elt1.get_nodeName() + ">.");
					return false;
				}
			}
			p_gameNode.removeChild(l_extendsElement);
			return true;
		} else if(l_extendsElementFound) {
			tools_spark_framework_Console.warn("Element " + Std.string(p_nodeType) + " cannot be extended!");
			return false;
		} else return true;
	}
	,_handleExtendsAttribute: function(p_gameNode,p_nodeType) {
		if(this._isNodeExtendable.get(p_nodeType) && p_gameNode.exists("extends")) {
			var l_superNode = this.getGameNode(this._xmlNodeTypeToGameType.get(p_nodeType),p_gameNode.get("extends"));
			p_gameNode.remove("extends");
			if(l_superNode != null) {
				if(this._extendGameNode(l_superNode)) {
					this._moveChildren(p_gameNode,l_superNode);
					return true;
				} else {
					tools_spark_framework_Console.error("" + Std.string(p_nodeType) + " Class is not valid!");
					return false;
				}
			} else {
				tools_spark_framework_Console.error("" + Std.string(p_nodeType) + " Class is not well-formed or not found!");
				return false;
			}
		} else if(p_gameNode.exists("extends")) {
			tools_spark_framework_Console.error("Element " + Std.string(p_nodeType) + " cannot be extended!");
			return false;
		} else return true;
	}
	,_moveChildren: function(p_gameNode,p_superNode) {
		var childrenArray = new Array();
		var $it0 = p_superNode.elements();
		while( $it0.hasNext() ) {
			var elt = $it0.next();
			childrenArray.push(elt);
		}
		var _g = 0;
		while(_g < childrenArray.length) {
			var elt1 = childrenArray[_g];
			++_g;
			if(p_gameNode.elementsNamed(elt1.get_nodeName()).hasNext() == false) p_gameNode.addChild(elt1); else if((function($this) {
				var $r;
				var _this = elt1.get_nodeName();
				$r = HxOverrides.substr(_this,0,1);
				return $r;
			}(this)) == "_") p_gameNode.insertChild(elt1,0);
		}
	}
	,_validateGameNode: function(p_gameNode) {
		var l_gameNodeType;
		var key = p_gameNode.get_nodeName();
		l_gameNodeType = this._xmlNodeNameToNodeType.get(key);
		if(this._gameClassValidator.validateGameNode(p_gameNode,l_gameNodeType)) {
			var $it0 = p_gameNode.elements();
			while( $it0.hasNext() ) {
				var elt = $it0.next();
				if(this._validateGameNode(elt) == false) {
					tools_spark_framework_Console.error("Failed to validate node " + elt.get_nodeName());
					return false;
				}
			}
			return true;
		} else {
			tools_spark_framework_Console.error("Failed to validate " + Std.string(l_gameNodeType) + " node");
			return false;
		}
	}
	,_mergeGameNode: function(p_gameNode) {
		this._mergeSingleGameNode(p_gameNode);
		var $it0 = p_gameNode.elements();
		while( $it0.hasNext() ) {
			var elt = $it0.next();
			this._mergeGameNode(elt);
		}
	}
	,_mergeSingleGameNode: function(p_gameNode) {
		var childrenArray = new Array();
		var $it0 = p_gameNode.elements();
		while( $it0.hasNext() ) {
			var elt = $it0.next();
			childrenArray.push(elt);
		}
		var _g = 0;
		while(_g < childrenArray.length) {
			var elt1 = childrenArray[_g];
			++_g;
			if((function($this) {
				var $r;
				var _this = elt1.get_nodeName();
				$r = HxOverrides.substr(_this,0,1);
				return $r;
			}(this)) == "_") {
				var l_elementCleanNodeName;
				var _this1 = elt1.get_nodeName();
				l_elementCleanNodeName = HxOverrides.substr(_this1,1,null);
				if((function($this) {
					var $r;
					var key = $this._xmlNodeNameToNodeType.get(l_elementCleanNodeName);
					$r = $this._isNodeMergable.get(key);
					return $r;
				}(this))) {
					if(p_gameNode.elementsNamed(l_elementCleanNodeName).hasNext()) {
						var l_cleanNode = p_gameNode.elementsNamed(l_elementCleanNodeName).next();
						this._mergeChildren(elt1,l_cleanNode);
						p_gameNode.removeChild(elt1);
					} else elt1.set_nodeName((function($this) {
						var $r;
						var _this2 = elt1.get_nodeName();
						$r = HxOverrides.substr(_this2,1,null);
						return $r;
					}(this)));
				} else if((function($this) {
					var $r;
					var key1 = $this._xmlNodeNameToNodeType.get(l_elementCleanNodeName);
					$r = $this._isNodeTargetMergable.get(key1);
					return $r;
				}(this))) {
					if(elt1.exists("id")) {
						var l_cleanNode1 = null;
						var l_targetNodeFound = false;
						var $it1 = p_gameNode.elementsNamed(l_elementCleanNodeName);
						while( $it1.hasNext() ) {
							var i_cleanNode = $it1.next();
							if(i_cleanNode.elementsNamed("Id").hasNext()) {
								var l_targetMergeElement = i_cleanNode.elementsNamed("Id").next();
								if(l_targetMergeElement.firstChild().get_nodeValue() == elt1.get("id")) {
									l_cleanNode1 = i_cleanNode;
									l_targetNodeFound = true;
									break;
								}
							}
						}
						if(l_targetNodeFound) {
							this._mergeChildren(elt1,l_cleanNode1);
							p_gameNode.removeChild(elt1);
						} else {
							elt1.set_nodeName((function($this) {
								var $r;
								var _this3 = elt1.get_nodeName();
								$r = HxOverrides.substr(_this3,1,null);
								return $r;
							}(this)));
							elt1.remove("id");
						}
					} else tools_spark_framework_Console.warn("Target-Mergable Element " + l_elementCleanNodeName + " does not have a targetMerge attribute");
				} else tools_spark_framework_Console.warn("Non-mergable element " + l_elementCleanNodeName + " has a merge identifier");
			}
		}
	}
	,_mergeChildren: function(mergeNode,cleanNode) {
		var childrenArray = new Array();
		var $it0 = mergeNode.elements();
		while( $it0.hasNext() ) {
			var elt = $it0.next();
			childrenArray.push(elt);
		}
		if((function($this) {
			var $r;
			var key;
			{
				var key1 = cleanNode.get_nodeName();
				key = $this._xmlNodeNameToNodeType.get(key1);
			}
			$r = $this._isNodeArray.get(key);
			return $r;
		}(this))) {
			var _g = 0;
			while(_g < childrenArray.length) {
				var mergeNodeChild = childrenArray[_g];
				++_g;
				cleanNode.addChild(mergeNodeChild);
			}
		} else {
			var _g1 = 0;
			while(_g1 < childrenArray.length) {
				var mergeNodeChild1 = childrenArray[_g1];
				++_g1;
				if((function($this) {
					var $r;
					var _this = mergeNodeChild1.get_nodeName();
					$r = HxOverrides.substr(_this,0,1);
					return $r;
				}(this)) != "_") {
					if(cleanNode.elementsNamed(mergeNodeChild1.get_nodeName()).hasNext()) cleanNode.removeChild(cleanNode.elementsNamed(mergeNodeChild1.get_nodeName()).next());
				}
				cleanNode.addChild(mergeNodeChild1);
			}
		}
	}
	,_parseEmbeddedStringAsset: function(p_stringAssetUrl) {
		try {
			return Xml.parse(tools_spark_framework_Assets.getFile(p_stringAssetUrl).toString());
		} catch( err ) {
			tools_spark_framework_Console.error(Std.string(err));
			return null;
		}
	}
	,_getClassUrl: function(p_gameEntityClassName,p_fileExtension) {
		return StringTools.replace(p_gameEntityClassName,".","/") + "." + p_fileExtension;
	}
	,getGameNode: function(p_expectedGameType,p_gameClassName,p_gameClassNode) {
		var l_gameClassNode;
		if(p_gameClassName != null && p_gameClassNode != null) {
			tools_spark_framework_Console.warn("Both a game class name and a game class node have been specified to create a game class. Using game class node...");
			l_gameClassNode = p_gameClassNode;
		} else if(p_gameClassName != null) {
			l_gameClassNode = this._parseEmbeddedStringAsset(this._getClassUrl(p_gameClassName,this._xmlGameTypeToFileExtension.get(p_expectedGameType)));
			if(l_gameClassNode != null) l_gameClassNode = l_gameClassNode.firstElement();
		} else if(p_gameClassNode != null) l_gameClassNode = p_gameClassNode; else l_gameClassNode = Xml.createElement(this._xmlGameTypeToNodeName.get(p_expectedGameType));
		if(l_gameClassNode != null) {
			if(l_gameClassNode.get_nodeName() != this._xmlGameTypeToNodeName.get(p_expectedGameType)) {
				tools_spark_framework_Console.error("Expected " + this._xmlGameTypeToNodeName.get(p_expectedGameType) + ", got " + l_gameClassNode.get_nodeName());
				return null;
			} else return l_gameClassNode;
		} else {
			tools_spark_framework_Console.error("Class " + Std.string(p_expectedGameType) + " is not well-formed or not found!");
			return null;
		}
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameClassParser
};
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassValidator = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameClassValidator"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassValidator;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassValidator.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassValidator.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassValidator
};
var tools_spark_sliced_services_std_logic_gde_core_GameClassValidator = function(p_xmlNodeTypeToNodeName,p_xmlConcurrencyTypeToName,p_xmlStateTypeToName,p_xmlEventPrefabToName) {
	tools_spark_framework_Console.log("Creating Game Class Validator");
	this._xmlNodeTypeToNodeName = p_xmlNodeTypeToNodeName;
	this._xmlConcurrencyTypeToName = p_xmlConcurrencyTypeToName;
	this._xmlStateTypeToName = p_xmlStateTypeToName;
	this._xmlEventPrefabToName = p_xmlEventPrefabToName;
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameClassValidator"] = tools_spark_sliced_services_std_logic_gde_core_GameClassValidator;
tools_spark_sliced_services_std_logic_gde_core_GameClassValidator.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameClassValidator.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameClassValidator];
tools_spark_sliced_services_std_logic_gde_core_GameClassValidator.prototype = {
	_init: function() {
		this._initNodeRulesMap();
	}
	,_initNodeRulesMap: function() {
		this._xmlNodeTypeToNodeRule = new haxe_ds_EnumValueMap();
		var v = this._createActionNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION,v);
		v;
		var v1 = this._createActionsNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS,v1);
		v1;
		var v2 = this._createEntitiesNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES,v2);
		v2;
		var v3 = this._createEntityNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY,v3);
		v3;
		var v4 = this._createFormNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM,v4);
		v4;
		var v5 = this._createScriptsNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS,v5);
		v5;
		var v6 = this._createScriptNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT,v6);
		v6;
		var v7 = this._createGmlNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML,v7);
		v7;
		var v8 = this._createTriggersNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS,v8);
		v8;
		var v9 = this._createTriggerNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER,v9);
		v9;
		var v10 = this._createEventNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT,v10);
		v10;
		var v11 = this._createConcurrencyNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY,v11);
		v11;
		var v12 = this._createIdNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID,v12);
		v12;
		var v13 = this._createSpaceNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE,v13);
		v13;
		var v14 = this._createStateNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE,v14);
		v14;
		var v15 = this._createStatesNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES,v15);
		v15;
		var v16 = this._createTypeNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE,v16);
		v16;
		var v17 = this._createValueNodeRule();
		this._xmlNodeTypeToNodeRule.set(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE,v17);
		v17;
	}
	,validateGameNode: function(p_gameNode,p_nodeType) {
		if(this._xmlNodeTypeToNodeRule.get(p_nodeType) == null) {
			tools_spark_framework_Console.error("This rule has not been created Yet!");
			return false;
		}
		try {
			tools_spark_framework_haxe_LooseCheck.checkNode(p_gameNode,this._xmlNodeTypeToNodeRule.get(p_nodeType));
			return true;
		} catch( m ) {
			if( js_Boot.__instanceof(m,String) ) {
				tools_spark_framework_Console.error(m);
				return false;
			} else throw(m);
		}
	}
	,_createEntityNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RList([tools_spark_framework_haxe_Rule.ROptional(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS))),tools_spark_framework_haxe_Rule.ROptional(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES))),tools_spark_framework_haxe_Rule.ROptional(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS))),tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM))],false);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY),[],l_children);
	}
	,_createFormNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RList([tools_spark_framework_haxe_Rule.ROptional(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES))),tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE))],false);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM),[],l_children);
	}
	,_createStateNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RList([tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID)),tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE)),tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE))],false);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE),[],l_children);
	}
	,_createActionNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RList([tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID)),tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY)),tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS)),tools_spark_framework_haxe_Rule.ROptional(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES)))],false);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION),[],l_children);
	}
	,_createSpaceNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.ROptional(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES)));
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE),[],l_children);
	}
	,_createEntitiesNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RMulti(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY)),false);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES),[],l_children);
	}
	,_createStatesNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RMulti(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE)),false);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES),[],l_children);
	}
	,_createActionsNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RMulti(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION)),false);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS),[],l_children);
	}
	,_createIdNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RData();
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID),[],l_children);
	}
	,_createScriptsNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RMulti(tools_spark_framework_haxe_Rule.RChoice([tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT)),tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML))]),true);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS),[],l_children);
	}
	,_createScriptNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RData();
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT),[],l_children);
	}
	,_createGmlNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RData();
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML),[],l_children);
	}
	,_createTriggersNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RMulti(tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER)),false);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS),[],l_children);
	}
	,_createTriggerNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RList([tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT)),tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS))],false);
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER),[],l_children);
	}
	,_createConcurrencyNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RData(tools_spark_framework_haxe_Filter.FEnum([this._xmlConcurrencyTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PARALLEL),this._xmlConcurrencyTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PERSISTENT),this._xmlConcurrencyTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.TRANSIENT)]));
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY),[],l_children);
	}
	,_createTypeNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RData(tools_spark_framework_haxe_Filter.FEnum([this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DYNAMIC),this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.INTEGER),this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DECIMAL),this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.BOOLEAN),this._xmlStateTypeToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.TEXT)]));
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE),[],l_children);
	}
	,_createValueNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RData();
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE),[],l_children);
	}
	,_createEventNodeRule: function() {
		var l_children = tools_spark_framework_haxe_Rule.RData(tools_spark_framework_haxe_Filter.FEnum([this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.CREATED),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.UPDATE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_CONNECTED),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_REQUEST),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_SERVER_EVENT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_CONNECTED),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_SENDREQUEST),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICK),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICK),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICKED),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICKED),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_ENTERED),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_MOVED),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ALT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSPACE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CAPS_LOCK),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CONTROL),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DELETE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DOWN),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_END),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ENTER),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ESCAPE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F1),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F10),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F11),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F12),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F13),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F14),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F15),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F2),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F3),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F4),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F5),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F6),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F7),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F8),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F9),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_HOME),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_INSERT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_0),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_1),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_2),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_3),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_4),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_5),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_6),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_7),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_8),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_9),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ADD),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DECIMAL),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DIVIDE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ENTER),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_MULTIPLY),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_SUBTRACT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_DOWN),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_UP),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SHIFT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SPACE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_TAB),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UP),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_A),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_B),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_C),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_D),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_E),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_G),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_H),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_I),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_J),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_K),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_L),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_M),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_N),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_O),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_P),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Q),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_R),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_S),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_T),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_U),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_V),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_W),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_X),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Y),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Z),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_0),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_1),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_2),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_3),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_4),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_5),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_6),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_7),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_8),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_9),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_EQUALS),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SLASH),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSLASH),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFTBRACKET),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHTBRACKET),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKQUOTE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMA),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMAND),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_MINUS),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PERIOD),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_QUOTE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SEMICOLON),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDMENU),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDSEARCH),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UNKNOWN),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ALT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSPACE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CAPS_LOCK),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CONTROL),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DELETE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DOWN),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_END),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ENTER),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ESCAPE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F1),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F10),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F11),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F12),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F13),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F14),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F15),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F2),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F3),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F4),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F5),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F6),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F7),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F8),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F9),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_HOME),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_INSERT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_0),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_1),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_2),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_3),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_4),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_5),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_6),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_7),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_8),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_9),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ADD),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DECIMAL),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DIVIDE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ENTER),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_MULTIPLY),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_SUBTRACT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_DOWN),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_UP),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SHIFT),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SPACE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_TAB),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UP),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_A),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_B),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_C),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_D),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_E),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_G),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_H),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_I),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_J),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_K),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_L),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_M),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_N),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_O),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_P),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Q),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_R),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_S),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_T),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_U),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_V),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_W),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_X),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Y),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Z),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_0),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_1),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_2),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_3),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_4),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_5),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_6),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_7),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_8),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_9),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_EQUALS),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SLASH),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSLASH),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFTBRACKET),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHTBRACKET),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKQUOTE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMA),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMAND),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_MINUS),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PERIOD),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_QUOTE),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SEMICOLON),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDMENU),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDSEARCH),this._xmlEventPrefabToName.get(tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UNKNOWN)]));
		return tools_spark_framework_haxe_Rule.RNode(this._xmlNodeTypeToNodeName.get(tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT),[],l_children);
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameClassValidator
};
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameEntity = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameEntity"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameEntity;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameEntity.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameEntity.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase];
tools_spark_sliced_services_std_logic_gde_interfaces_IGameEntity.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameEntity
};
var tools_spark_sliced_services_std_logic_gde_core_GameEntity = function() {
	tools_spark_sliced_services_std_logic_gde_core_AGameBase.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameEntity"] = tools_spark_sliced_services_std_logic_gde_core_GameEntity;
tools_spark_sliced_services_std_logic_gde_core_GameEntity.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameEntity.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameEntity];
tools_spark_sliced_services_std_logic_gde_core_GameEntity.__super__ = tools_spark_sliced_services_std_logic_gde_core_AGameBase;
tools_spark_sliced_services_std_logic_gde_core_GameEntity.prototype = $extend(tools_spark_sliced_services_std_logic_gde_core_AGameBase.prototype,{
	_init: function() {
		this.gameStateSet = new haxe_ds_StringMap();
		this.possibleActionSet = new haxe_ds_StringMap();
		this.currentActionSet = new haxe_ds_StringMap();
	}
	,doActions: function() {
		var $it0 = this.currentActionSet.iterator();
		while( $it0.hasNext() ) {
			var actions = $it0.next();
			var _g = 0;
			while(_g < actions.length) {
				var action = actions[_g];
				++_g;
				action.doPass();
			}
		}
		var _g1 = 0;
		var _g11 = this.gameForm.gameSpace.gameEntitySet;
		while(_g1 < _g11.length) {
			var entity = _g11[_g1];
			++_g1;
			entity.doActions();
		}
	}
	,addState: function(gameState) {
		if(this.gameStateSet.get(gameState.id) != null) tools_spark_framework_Console.warn("A State with id " + gameState.id + " already exists in this Entity.");
		this.gameStateSet.set(gameState.id,gameState);
		gameState;
	}
	,addAction: function(gameAction) {
		if(this.possibleActionSet.get(gameAction.id) != null) tools_spark_framework_Console.warn("An Action with id " + gameAction.id + " already exists in this Entity."); else {
			var v = new Array();
			this.currentActionSet.set(gameAction.id,v);
			v;
		}
		this.possibleActionSet.set(gameAction.id,gameAction);
		gameAction;
	}
	,getAction: function(p_actionId) {
		return this.possibleActionSet.get(p_actionId);
	}
	,startAction: function(actionId) {
		var gameAction = this.possibleActionSet.get(actionId);
		if(gameAction != null) {
			var _g = gameAction.concurrency;
			switch(Type.enumIndex(_g)) {
			case 0:
				this.currentActionSet.get(gameAction.id).push(gameAction);
				break;
			case 1:
				if(this.currentActionSet.get(gameAction.id).length == 0) this.currentActionSet.get(gameAction.id).push(gameAction);
				break;
			case 2:
				while(this.currentActionSet.get(gameAction.id).length > 0) this.currentActionSet.get(gameAction.id).pop();
				this.currentActionSet.get(gameAction.id).push(gameAction);
				break;
			}
			return true;
		} else {
			tools_spark_framework_Console.warn("Action with id '" + actionId + "' could not be started.");
			return false;
		}
	}
	,stopAction: function(actionId) {
		if(this.currentActionSet.exists(actionId)) {
			while(this.currentActionSet.get(actionId).length > 0) this.currentActionSet.get(actionId).pop();
			return true;
		} else {
			tools_spark_framework_Console.warn("Action with id '" + actionId + "' could not be stopped.");
			return false;
		}
	}
	,getState: function(p_stateId) {
		if(this.gameStateSet.get(p_stateId) == null) return null; else return this.gameStateSet.get(p_stateId).value;
	}
	,setState: function(p_stateId,p_value) {
		this.gameStateSet.get(p_stateId).value = p_value;
		tools_spark_sliced_core_Sliced.display.updateDisplayObjectState(this,p_stateId);
		return this.gameStateSet.get(p_stateId).value;
	}
	,addChild: function(p_gameEntity) {
		this.get_children().push(p_gameEntity);
		p_gameEntity.parentEntity = this;
		tools_spark_sliced_core_Sliced.display.addDisplayObjectChild(this,p_gameEntity);
	}
	,getChildren: function() {
		return this.get_children();
	}
	,get_children: function() {
		return this.gameForm.gameSpace.gameEntitySet;
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameEntity
});
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameFactory = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameFactory"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameFactory;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameFactory.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameFactory.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameFactory
};
var tools_spark_sliced_services_std_logic_gde_core_GameFactory = function() {
	tools_spark_framework_Console.log("Creating Game Factory");
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameFactory"] = tools_spark_sliced_services_std_logic_gde_core_GameFactory;
tools_spark_sliced_services_std_logic_gde_core_GameFactory.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameFactory.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameFactory];
tools_spark_sliced_services_std_logic_gde_core_GameFactory.prototype = {
	_init: function() {
		this._gameClassParser = new tools_spark_sliced_services_std_logic_gde_core_GameClassParser();
	}
	,createGameEntityExtended: function(p_gameClassName,p_extendGameClassName) {
		var l_extendGameNode = this._gameClassParser.getGameNode(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ENTITY,p_extendGameClassName);
		l_extendGameNode.set("extends",p_gameClassName);
		return this.createGameEntity(null,l_extendGameNode);
	}
	,createGameEntity: function(p_gameClassName,p_gameClassNode) {
		var l_gameNode = this._gameClassParser.getGameNode(tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ENTITY,p_gameClassName,p_gameClassNode);
		if(l_gameNode != null) {
			if(this._gameClassParser.parseGameNode(l_gameNode)) {
				var l_gameEntity = this._gameClassParser.instantiateEntity(l_gameNode);
				if(l_gameEntity != null) return l_gameEntity; else {
					tools_spark_framework_Console.error("Game Entity could not be instantiated");
					return null;
				}
			} else {
				tools_spark_framework_Console.error("Game Entity could not be parsed");
				tools_spark_framework_Console.debug(l_gameNode.toString());
				return null;
			}
		} else {
			tools_spark_framework_Console.error("Game Entity Class is not well-formed or not found!");
			return null;
		}
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameFactory
};
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameForm = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameForm"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameForm;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameForm.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameForm.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase];
tools_spark_sliced_services_std_logic_gde_interfaces_IGameForm.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameForm
};
var tools_spark_sliced_services_std_logic_gde_core_GameForm = function() {
	tools_spark_sliced_services_std_logic_gde_core_AGameBase.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameForm"] = tools_spark_sliced_services_std_logic_gde_core_GameForm;
tools_spark_sliced_services_std_logic_gde_core_GameForm.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameForm.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameForm];
tools_spark_sliced_services_std_logic_gde_core_GameForm.__super__ = tools_spark_sliced_services_std_logic_gde_core_AGameBase;
tools_spark_sliced_services_std_logic_gde_core_GameForm.prototype = $extend(tools_spark_sliced_services_std_logic_gde_core_AGameBase.prototype,{
	_init: function() {
		this.gameStateSet = new haxe_ds_StringMap();
	}
	,addState: function(gameState) {
		if(this.gameStateSet.get(gameState.id) != null) tools_spark_framework_Console.warn("A State with id " + gameState.id + " already exists in this Form.");
		this.gameStateSet.set(gameState.id,gameState);
		gameState;
	}
	,getState: function(p_stateId) {
		if(this.gameStateSet.get(p_stateId) == null) return null; else return this.gameStateSet.get(p_stateId).value;
	}
	,setState: function(p_stateId,p_value) {
		this.gameStateSet.get(p_stateId).value = p_value;
		return this.gameStateSet.get(p_stateId).value;
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameForm
});
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameSpace = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameSpace"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameSpace;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameSpace.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameSpace.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase];
tools_spark_sliced_services_std_logic_gde_interfaces_IGameSpace.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameSpace
};
var tools_spark_sliced_services_std_logic_gde_core_GameSpace = function() {
	tools_spark_sliced_services_std_logic_gde_core_AGameBase.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameSpace"] = tools_spark_sliced_services_std_logic_gde_core_GameSpace;
tools_spark_sliced_services_std_logic_gde_core_GameSpace.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameSpace.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameSpace];
tools_spark_sliced_services_std_logic_gde_core_GameSpace.__super__ = tools_spark_sliced_services_std_logic_gde_core_AGameBase;
tools_spark_sliced_services_std_logic_gde_core_GameSpace.prototype = $extend(tools_spark_sliced_services_std_logic_gde_core_AGameBase.prototype,{
	_init: function() {
		this.gameEntitySet = new Array();
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameSpace
});
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameState = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameState"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameState;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameState.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameState.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase];
tools_spark_sliced_services_std_logic_gde_interfaces_IGameState.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameState
};
var tools_spark_sliced_services_std_logic_gde_core_GameState = function() {
	tools_spark_sliced_services_std_logic_gde_core_AGameBase.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameState"] = tools_spark_sliced_services_std_logic_gde_core_GameState;
tools_spark_sliced_services_std_logic_gde_core_GameState.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameState.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameState];
tools_spark_sliced_services_std_logic_gde_core_GameState.__super__ = tools_spark_sliced_services_std_logic_gde_core_AGameBase;
tools_spark_sliced_services_std_logic_gde_core_GameState.prototype = $extend(tools_spark_sliced_services_std_logic_gde_core_AGameBase.prototype,{
	_init: function() {
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameState
});
var tools_spark_sliced_services_std_logic_gde_interfaces_IGameTrigger = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.IGameTrigger"] = tools_spark_sliced_services_std_logic_gde_interfaces_IGameTrigger;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameTrigger.__name__ = true;
tools_spark_sliced_services_std_logic_gde_interfaces_IGameTrigger.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameBase];
tools_spark_sliced_services_std_logic_gde_interfaces_IGameTrigger.prototype = {
	__class__: tools_spark_sliced_services_std_logic_gde_interfaces_IGameTrigger
};
var tools_spark_sliced_services_std_logic_gde_core_GameTrigger = function() {
	tools_spark_sliced_services_std_logic_gde_core_AGameBase.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.gde.core.GameTrigger"] = tools_spark_sliced_services_std_logic_gde_core_GameTrigger;
tools_spark_sliced_services_std_logic_gde_core_GameTrigger.__name__ = true;
tools_spark_sliced_services_std_logic_gde_core_GameTrigger.__interfaces__ = [tools_spark_sliced_services_std_logic_gde_interfaces_IGameTrigger];
tools_spark_sliced_services_std_logic_gde_core_GameTrigger.__super__ = tools_spark_sliced_services_std_logic_gde_core_AGameBase;
tools_spark_sliced_services_std_logic_gde_core_GameTrigger.prototype = $extend(tools_spark_sliced_services_std_logic_gde_core_AGameBase.prototype,{
	_init: function() {
		this.scriptSet = new Array();
	}
	,doPass: function() {
		var _g = 0;
		var _g1 = this.scriptSet;
		while(_g < _g1.length) {
			var hashId = _g1[_g];
			++_g;
			if(hashId == -1) tools_spark_sliced_core_Sliced.logic.gmlInterpreter.run(hashId,(function($this) {
				var $r;
				var _g2 = new haxe_ds_StringMap();
				_g2.set("me",$this.parentEntity);
				_g2.set("parent",$this.parentEntity.parentEntity);
				$r = _g2;
				return $r;
			}(this))); else tools_spark_sliced_core_Sliced.logic.scriptInterpreter.run(hashId,(function($this) {
				var $r;
				var _g21 = new haxe_ds_StringMap();
				_g21.set("me",$this.parentEntity);
				_g21.set("parent",$this.parentEntity.parentEntity);
				$r = _g21;
				return $r;
			}(this)));
		}
	}
	,__class__: tools_spark_sliced_services_std_logic_gde_core_GameTrigger
});
var tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType = $hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.EConcurrencyType"] = { __ename__ : true, __constructs__ : ["PARALLEL","PERSISTENT","TRANSIENT"] };
tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PARALLEL = ["PARALLEL",0];
tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PARALLEL.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PARALLEL.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType;
tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PERSISTENT = ["PERSISTENT",1];
tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PERSISTENT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.PERSISTENT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType;
tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.TRANSIENT = ["TRANSIENT",2];
tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.TRANSIENT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType.TRANSIENT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EConcurrencyType;
var tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab = $hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.EEventPrefab"] = { __ename__ : true, __constructs__ : ["CREATED","UPDATE","NETWORK_CONNECTED","NETWORK_REQUEST","NETWORK_SERVER_EVENT","FILETRANSFER_CONNECTED","FILETRANSFER_SENDREQUEST","MOUSE_LEFT_CLICK","MOUSE_RIGHT_CLICK","MOUSE_LEFT_CLICKED","MOUSE_RIGHT_CLICKED","MOUSE_ENTERED","MOUSE_MOVED","MOUSE_LEFT","KEY_PRESSED","KEY_RELEASED","KEY_PRESSED_ALT","KEY_PRESSED_BACKSPACE","KEY_PRESSED_CAPS_LOCK","KEY_PRESSED_CONTROL","KEY_PRESSED_DELETE","KEY_PRESSED_DOWN","KEY_PRESSED_END","KEY_PRESSED_ENTER","KEY_PRESSED_ESCAPE","KEY_PRESSED_F1","KEY_PRESSED_F10","KEY_PRESSED_F11","KEY_PRESSED_F12","KEY_PRESSED_F13","KEY_PRESSED_F14","KEY_PRESSED_F15","KEY_PRESSED_F2","KEY_PRESSED_F3","KEY_PRESSED_F4","KEY_PRESSED_F5","KEY_PRESSED_F6","KEY_PRESSED_F7","KEY_PRESSED_F8","KEY_PRESSED_F9","KEY_PRESSED_HOME","KEY_PRESSED_INSERT","KEY_PRESSED_LEFT","KEY_PRESSED_NUMPAD_0","KEY_PRESSED_NUMPAD_1","KEY_PRESSED_NUMPAD_2","KEY_PRESSED_NUMPAD_3","KEY_PRESSED_NUMPAD_4","KEY_PRESSED_NUMPAD_5","KEY_PRESSED_NUMPAD_6","KEY_PRESSED_NUMPAD_7","KEY_PRESSED_NUMPAD_8","KEY_PRESSED_NUMPAD_9","KEY_PRESSED_NUMPAD_ADD","KEY_PRESSED_NUMPAD_DECIMAL","KEY_PRESSED_NUMPAD_DIVIDE","KEY_PRESSED_NUMPAD_ENTER","KEY_PRESSED_NUMPAD_MULTIPLY","KEY_PRESSED_NUMPAD_SUBTRACT","KEY_PRESSED_PAGE_DOWN","KEY_PRESSED_PAGE_UP","KEY_PRESSED_RIGHT","KEY_PRESSED_SHIFT","KEY_PRESSED_SPACE","KEY_PRESSED_TAB","KEY_PRESSED_UP","KEY_PRESSED_A","KEY_PRESSED_B","KEY_PRESSED_C","KEY_PRESSED_D","KEY_PRESSED_E","KEY_PRESSED_F","KEY_PRESSED_G","KEY_PRESSED_H","KEY_PRESSED_I","KEY_PRESSED_J","KEY_PRESSED_K","KEY_PRESSED_L","KEY_PRESSED_M","KEY_PRESSED_N","KEY_PRESSED_O","KEY_PRESSED_P","KEY_PRESSED_Q","KEY_PRESSED_R","KEY_PRESSED_S","KEY_PRESSED_T","KEY_PRESSED_U","KEY_PRESSED_V","KEY_PRESSED_W","KEY_PRESSED_X","KEY_PRESSED_Y","KEY_PRESSED_Z","KEY_PRESSED_NUMBER_0","KEY_PRESSED_NUMBER_1","KEY_PRESSED_NUMBER_2","KEY_PRESSED_NUMBER_3","KEY_PRESSED_NUMBER_4","KEY_PRESSED_NUMBER_5","KEY_PRESSED_NUMBER_6","KEY_PRESSED_NUMBER_7","KEY_PRESSED_NUMBER_8","KEY_PRESSED_NUMBER_9","KEY_PRESSED_EQUALS","KEY_PRESSED_SLASH","KEY_PRESSED_BACKSLASH","KEY_PRESSED_LEFTBRACKET","KEY_PRESSED_RIGHTBRACKET","KEY_PRESSED_BACKQUOTE","KEY_PRESSED_COMMA","KEY_PRESSED_COMMAND","KEY_PRESSED_MINUS","KEY_PRESSED_PERIOD","KEY_PRESSED_QUOTE","KEY_PRESSED_SEMICOLON","KEY_PRESSED_ANDROIDMENU","KEY_PRESSED_ANDROIDSEARCH","KEY_PRESSED_UNKNOWN","KEY_RELEASED_ALT","KEY_RELEASED_BACKSPACE","KEY_RELEASED_CAPS_LOCK","KEY_RELEASED_CONTROL","KEY_RELEASED_DELETE","KEY_RELEASED_DOWN","KEY_RELEASED_END","KEY_RELEASED_ENTER","KEY_RELEASED_ESCAPE","KEY_RELEASED_F1","KEY_RELEASED_F10","KEY_RELEASED_F11","KEY_RELEASED_F12","KEY_RELEASED_F13","KEY_RELEASED_F14","KEY_RELEASED_F15","KEY_RELEASED_F2","KEY_RELEASED_F3","KEY_RELEASED_F4","KEY_RELEASED_F5","KEY_RELEASED_F6","KEY_RELEASED_F7","KEY_RELEASED_F8","KEY_RELEASED_F9","KEY_RELEASED_HOME","KEY_RELEASED_INSERT","KEY_RELEASED_LEFT","KEY_RELEASED_NUMPAD_0","KEY_RELEASED_NUMPAD_1","KEY_RELEASED_NUMPAD_2","KEY_RELEASED_NUMPAD_3","KEY_RELEASED_NUMPAD_4","KEY_RELEASED_NUMPAD_5","KEY_RELEASED_NUMPAD_6","KEY_RELEASED_NUMPAD_7","KEY_RELEASED_NUMPAD_8","KEY_RELEASED_NUMPAD_9","KEY_RELEASED_NUMPAD_ADD","KEY_RELEASED_NUMPAD_DECIMAL","KEY_RELEASED_NUMPAD_DIVIDE","KEY_RELEASED_NUMPAD_ENTER","KEY_RELEASED_NUMPAD_MULTIPLY","KEY_RELEASED_NUMPAD_SUBTRACT","KEY_RELEASED_PAGE_DOWN","KEY_RELEASED_PAGE_UP","KEY_RELEASED_RIGHT","KEY_RELEASED_SHIFT","KEY_RELEASED_SPACE","KEY_RELEASED_TAB","KEY_RELEASED_UP","KEY_RELEASED_A","KEY_RELEASED_B","KEY_RELEASED_C","KEY_RELEASED_D","KEY_RELEASED_E","KEY_RELEASED_F","KEY_RELEASED_G","KEY_RELEASED_H","KEY_RELEASED_I","KEY_RELEASED_J","KEY_RELEASED_K","KEY_RELEASED_L","KEY_RELEASED_M","KEY_RELEASED_N","KEY_RELEASED_O","KEY_RELEASED_P","KEY_RELEASED_Q","KEY_RELEASED_R","KEY_RELEASED_S","KEY_RELEASED_T","KEY_RELEASED_U","KEY_RELEASED_V","KEY_RELEASED_W","KEY_RELEASED_X","KEY_RELEASED_Y","KEY_RELEASED_Z","KEY_RELEASED_NUMBER_0","KEY_RELEASED_NUMBER_1","KEY_RELEASED_NUMBER_2","KEY_RELEASED_NUMBER_3","KEY_RELEASED_NUMBER_4","KEY_RELEASED_NUMBER_5","KEY_RELEASED_NUMBER_6","KEY_RELEASED_NUMBER_7","KEY_RELEASED_NUMBER_8","KEY_RELEASED_NUMBER_9","KEY_RELEASED_EQUALS","KEY_RELEASED_SLASH","KEY_RELEASED_BACKSLASH","KEY_RELEASED_LEFTBRACKET","KEY_RELEASED_RIGHTBRACKET","KEY_RELEASED_BACKQUOTE","KEY_RELEASED_COMMA","KEY_RELEASED_COMMAND","KEY_RELEASED_MINUS","KEY_RELEASED_PERIOD","KEY_RELEASED_QUOTE","KEY_RELEASED_SEMICOLON","KEY_RELEASED_ANDROIDMENU","KEY_RELEASED_ANDROIDSEARCH","KEY_RELEASED_UNKNOWN"] };
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.CREATED = ["CREATED",0];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.CREATED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.CREATED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.UPDATE = ["UPDATE",1];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.UPDATE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.UPDATE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_CONNECTED = ["NETWORK_CONNECTED",2];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_CONNECTED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_CONNECTED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_REQUEST = ["NETWORK_REQUEST",3];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_REQUEST.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_REQUEST.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_SERVER_EVENT = ["NETWORK_SERVER_EVENT",4];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_SERVER_EVENT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.NETWORK_SERVER_EVENT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_CONNECTED = ["FILETRANSFER_CONNECTED",5];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_CONNECTED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_CONNECTED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_SENDREQUEST = ["FILETRANSFER_SENDREQUEST",6];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_SENDREQUEST.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.FILETRANSFER_SENDREQUEST.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICK = ["MOUSE_LEFT_CLICK",7];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICK.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICK.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICK = ["MOUSE_RIGHT_CLICK",8];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICK.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICK.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICKED = ["MOUSE_LEFT_CLICKED",9];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICKED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT_CLICKED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICKED = ["MOUSE_RIGHT_CLICKED",10];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICKED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_RIGHT_CLICKED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_ENTERED = ["MOUSE_ENTERED",11];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_ENTERED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_ENTERED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_MOVED = ["MOUSE_MOVED",12];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_MOVED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_MOVED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT = ["MOUSE_LEFT",13];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.MOUSE_LEFT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED = ["KEY_PRESSED",14];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED = ["KEY_RELEASED",15];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ALT = ["KEY_PRESSED_ALT",16];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ALT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ALT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSPACE = ["KEY_PRESSED_BACKSPACE",17];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSPACE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSPACE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CAPS_LOCK = ["KEY_PRESSED_CAPS_LOCK",18];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CAPS_LOCK.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CAPS_LOCK.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CONTROL = ["KEY_PRESSED_CONTROL",19];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CONTROL.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_CONTROL.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DELETE = ["KEY_PRESSED_DELETE",20];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DELETE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DELETE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DOWN = ["KEY_PRESSED_DOWN",21];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DOWN.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_DOWN.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_END = ["KEY_PRESSED_END",22];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_END.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_END.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ENTER = ["KEY_PRESSED_ENTER",23];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ENTER.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ENTER.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ESCAPE = ["KEY_PRESSED_ESCAPE",24];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ESCAPE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ESCAPE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F1 = ["KEY_PRESSED_F1",25];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F1.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F1.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F10 = ["KEY_PRESSED_F10",26];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F10.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F10.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F11 = ["KEY_PRESSED_F11",27];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F11.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F11.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F12 = ["KEY_PRESSED_F12",28];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F12.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F12.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F13 = ["KEY_PRESSED_F13",29];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F13.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F13.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F14 = ["KEY_PRESSED_F14",30];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F14.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F14.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F15 = ["KEY_PRESSED_F15",31];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F15.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F15.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F2 = ["KEY_PRESSED_F2",32];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F2.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F2.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F3 = ["KEY_PRESSED_F3",33];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F3.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F3.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F4 = ["KEY_PRESSED_F4",34];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F4.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F4.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F5 = ["KEY_PRESSED_F5",35];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F5.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F5.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F6 = ["KEY_PRESSED_F6",36];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F6.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F6.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F7 = ["KEY_PRESSED_F7",37];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F7.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F7.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F8 = ["KEY_PRESSED_F8",38];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F8.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F8.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F9 = ["KEY_PRESSED_F9",39];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F9.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F9.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_HOME = ["KEY_PRESSED_HOME",40];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_HOME.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_HOME.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_INSERT = ["KEY_PRESSED_INSERT",41];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_INSERT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_INSERT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFT = ["KEY_PRESSED_LEFT",42];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_0 = ["KEY_PRESSED_NUMPAD_0",43];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_0.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_0.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_1 = ["KEY_PRESSED_NUMPAD_1",44];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_1.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_1.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_2 = ["KEY_PRESSED_NUMPAD_2",45];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_2.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_2.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_3 = ["KEY_PRESSED_NUMPAD_3",46];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_3.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_3.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_4 = ["KEY_PRESSED_NUMPAD_4",47];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_4.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_4.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_5 = ["KEY_PRESSED_NUMPAD_5",48];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_5.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_5.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_6 = ["KEY_PRESSED_NUMPAD_6",49];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_6.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_6.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_7 = ["KEY_PRESSED_NUMPAD_7",50];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_7.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_7.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_8 = ["KEY_PRESSED_NUMPAD_8",51];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_8.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_8.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_9 = ["KEY_PRESSED_NUMPAD_9",52];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_9.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_9.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ADD = ["KEY_PRESSED_NUMPAD_ADD",53];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ADD.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ADD.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DECIMAL = ["KEY_PRESSED_NUMPAD_DECIMAL",54];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DECIMAL.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DECIMAL.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DIVIDE = ["KEY_PRESSED_NUMPAD_DIVIDE",55];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DIVIDE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_DIVIDE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ENTER = ["KEY_PRESSED_NUMPAD_ENTER",56];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ENTER.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_ENTER.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_MULTIPLY = ["KEY_PRESSED_NUMPAD_MULTIPLY",57];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_MULTIPLY.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_MULTIPLY.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_SUBTRACT = ["KEY_PRESSED_NUMPAD_SUBTRACT",58];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_SUBTRACT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMPAD_SUBTRACT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_DOWN = ["KEY_PRESSED_PAGE_DOWN",59];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_DOWN.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_DOWN.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_UP = ["KEY_PRESSED_PAGE_UP",60];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_UP.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PAGE_UP.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHT = ["KEY_PRESSED_RIGHT",61];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SHIFT = ["KEY_PRESSED_SHIFT",62];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SHIFT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SHIFT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SPACE = ["KEY_PRESSED_SPACE",63];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SPACE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SPACE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_TAB = ["KEY_PRESSED_TAB",64];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_TAB.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_TAB.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UP = ["KEY_PRESSED_UP",65];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UP.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UP.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_A = ["KEY_PRESSED_A",66];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_A.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_A.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_B = ["KEY_PRESSED_B",67];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_B.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_B.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_C = ["KEY_PRESSED_C",68];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_C.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_C.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_D = ["KEY_PRESSED_D",69];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_D.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_D.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_E = ["KEY_PRESSED_E",70];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_E.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_E.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F = ["KEY_PRESSED_F",71];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_F.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_G = ["KEY_PRESSED_G",72];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_G.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_G.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_H = ["KEY_PRESSED_H",73];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_H.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_H.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_I = ["KEY_PRESSED_I",74];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_I.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_I.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_J = ["KEY_PRESSED_J",75];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_J.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_J.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_K = ["KEY_PRESSED_K",76];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_K.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_K.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_L = ["KEY_PRESSED_L",77];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_L.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_L.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_M = ["KEY_PRESSED_M",78];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_M.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_M.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_N = ["KEY_PRESSED_N",79];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_N.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_N.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_O = ["KEY_PRESSED_O",80];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_O.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_O.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_P = ["KEY_PRESSED_P",81];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_P.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_P.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Q = ["KEY_PRESSED_Q",82];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Q.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Q.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_R = ["KEY_PRESSED_R",83];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_R.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_R.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_S = ["KEY_PRESSED_S",84];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_S.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_S.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_T = ["KEY_PRESSED_T",85];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_T.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_T.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_U = ["KEY_PRESSED_U",86];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_U.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_U.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_V = ["KEY_PRESSED_V",87];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_V.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_V.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_W = ["KEY_PRESSED_W",88];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_W.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_W.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_X = ["KEY_PRESSED_X",89];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_X.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_X.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Y = ["KEY_PRESSED_Y",90];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Y.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Y.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Z = ["KEY_PRESSED_Z",91];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Z.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_Z.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_0 = ["KEY_PRESSED_NUMBER_0",92];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_0.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_0.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_1 = ["KEY_PRESSED_NUMBER_1",93];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_1.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_1.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_2 = ["KEY_PRESSED_NUMBER_2",94];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_2.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_2.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_3 = ["KEY_PRESSED_NUMBER_3",95];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_3.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_3.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_4 = ["KEY_PRESSED_NUMBER_4",96];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_4.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_4.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_5 = ["KEY_PRESSED_NUMBER_5",97];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_5.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_5.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_6 = ["KEY_PRESSED_NUMBER_6",98];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_6.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_6.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_7 = ["KEY_PRESSED_NUMBER_7",99];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_7.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_7.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_8 = ["KEY_PRESSED_NUMBER_8",100];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_8.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_8.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_9 = ["KEY_PRESSED_NUMBER_9",101];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_9.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_NUMBER_9.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_EQUALS = ["KEY_PRESSED_EQUALS",102];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_EQUALS.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_EQUALS.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SLASH = ["KEY_PRESSED_SLASH",103];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SLASH.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SLASH.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSLASH = ["KEY_PRESSED_BACKSLASH",104];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSLASH.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKSLASH.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFTBRACKET = ["KEY_PRESSED_LEFTBRACKET",105];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFTBRACKET.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_LEFTBRACKET.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHTBRACKET = ["KEY_PRESSED_RIGHTBRACKET",106];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHTBRACKET.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_RIGHTBRACKET.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKQUOTE = ["KEY_PRESSED_BACKQUOTE",107];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKQUOTE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_BACKQUOTE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMA = ["KEY_PRESSED_COMMA",108];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMA.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMA.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMAND = ["KEY_PRESSED_COMMAND",109];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMAND.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_COMMAND.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_MINUS = ["KEY_PRESSED_MINUS",110];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_MINUS.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_MINUS.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PERIOD = ["KEY_PRESSED_PERIOD",111];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PERIOD.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_PERIOD.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_QUOTE = ["KEY_PRESSED_QUOTE",112];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_QUOTE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_QUOTE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SEMICOLON = ["KEY_PRESSED_SEMICOLON",113];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SEMICOLON.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_SEMICOLON.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDMENU = ["KEY_PRESSED_ANDROIDMENU",114];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDMENU.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDMENU.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDSEARCH = ["KEY_PRESSED_ANDROIDSEARCH",115];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDSEARCH.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_ANDROIDSEARCH.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UNKNOWN = ["KEY_PRESSED_UNKNOWN",116];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UNKNOWN.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_PRESSED_UNKNOWN.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ALT = ["KEY_RELEASED_ALT",117];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ALT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ALT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSPACE = ["KEY_RELEASED_BACKSPACE",118];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSPACE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSPACE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CAPS_LOCK = ["KEY_RELEASED_CAPS_LOCK",119];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CAPS_LOCK.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CAPS_LOCK.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CONTROL = ["KEY_RELEASED_CONTROL",120];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CONTROL.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_CONTROL.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DELETE = ["KEY_RELEASED_DELETE",121];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DELETE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DELETE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DOWN = ["KEY_RELEASED_DOWN",122];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DOWN.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_DOWN.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_END = ["KEY_RELEASED_END",123];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_END.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_END.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ENTER = ["KEY_RELEASED_ENTER",124];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ENTER.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ENTER.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ESCAPE = ["KEY_RELEASED_ESCAPE",125];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ESCAPE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ESCAPE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F1 = ["KEY_RELEASED_F1",126];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F1.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F1.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F10 = ["KEY_RELEASED_F10",127];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F10.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F10.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F11 = ["KEY_RELEASED_F11",128];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F11.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F11.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F12 = ["KEY_RELEASED_F12",129];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F12.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F12.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F13 = ["KEY_RELEASED_F13",130];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F13.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F13.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F14 = ["KEY_RELEASED_F14",131];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F14.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F14.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F15 = ["KEY_RELEASED_F15",132];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F15.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F15.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F2 = ["KEY_RELEASED_F2",133];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F2.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F2.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F3 = ["KEY_RELEASED_F3",134];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F3.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F3.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F4 = ["KEY_RELEASED_F4",135];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F4.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F4.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F5 = ["KEY_RELEASED_F5",136];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F5.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F5.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F6 = ["KEY_RELEASED_F6",137];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F6.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F6.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F7 = ["KEY_RELEASED_F7",138];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F7.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F7.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F8 = ["KEY_RELEASED_F8",139];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F8.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F8.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F9 = ["KEY_RELEASED_F9",140];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F9.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F9.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_HOME = ["KEY_RELEASED_HOME",141];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_HOME.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_HOME.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_INSERT = ["KEY_RELEASED_INSERT",142];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_INSERT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_INSERT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFT = ["KEY_RELEASED_LEFT",143];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_0 = ["KEY_RELEASED_NUMPAD_0",144];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_0.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_0.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_1 = ["KEY_RELEASED_NUMPAD_1",145];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_1.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_1.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_2 = ["KEY_RELEASED_NUMPAD_2",146];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_2.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_2.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_3 = ["KEY_RELEASED_NUMPAD_3",147];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_3.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_3.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_4 = ["KEY_RELEASED_NUMPAD_4",148];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_4.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_4.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_5 = ["KEY_RELEASED_NUMPAD_5",149];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_5.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_5.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_6 = ["KEY_RELEASED_NUMPAD_6",150];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_6.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_6.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_7 = ["KEY_RELEASED_NUMPAD_7",151];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_7.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_7.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_8 = ["KEY_RELEASED_NUMPAD_8",152];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_8.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_8.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_9 = ["KEY_RELEASED_NUMPAD_9",153];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_9.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_9.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ADD = ["KEY_RELEASED_NUMPAD_ADD",154];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ADD.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ADD.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DECIMAL = ["KEY_RELEASED_NUMPAD_DECIMAL",155];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DECIMAL.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DECIMAL.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DIVIDE = ["KEY_RELEASED_NUMPAD_DIVIDE",156];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DIVIDE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_DIVIDE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ENTER = ["KEY_RELEASED_NUMPAD_ENTER",157];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ENTER.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_ENTER.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_MULTIPLY = ["KEY_RELEASED_NUMPAD_MULTIPLY",158];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_MULTIPLY.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_MULTIPLY.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_SUBTRACT = ["KEY_RELEASED_NUMPAD_SUBTRACT",159];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_SUBTRACT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMPAD_SUBTRACT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_DOWN = ["KEY_RELEASED_PAGE_DOWN",160];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_DOWN.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_DOWN.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_UP = ["KEY_RELEASED_PAGE_UP",161];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_UP.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PAGE_UP.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHT = ["KEY_RELEASED_RIGHT",162];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SHIFT = ["KEY_RELEASED_SHIFT",163];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SHIFT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SHIFT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SPACE = ["KEY_RELEASED_SPACE",164];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SPACE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SPACE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_TAB = ["KEY_RELEASED_TAB",165];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_TAB.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_TAB.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UP = ["KEY_RELEASED_UP",166];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UP.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UP.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_A = ["KEY_RELEASED_A",167];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_A.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_A.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_B = ["KEY_RELEASED_B",168];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_B.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_B.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_C = ["KEY_RELEASED_C",169];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_C.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_C.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_D = ["KEY_RELEASED_D",170];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_D.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_D.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_E = ["KEY_RELEASED_E",171];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_E.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_E.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F = ["KEY_RELEASED_F",172];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_F.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_G = ["KEY_RELEASED_G",173];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_G.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_G.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_H = ["KEY_RELEASED_H",174];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_H.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_H.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_I = ["KEY_RELEASED_I",175];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_I.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_I.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_J = ["KEY_RELEASED_J",176];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_J.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_J.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_K = ["KEY_RELEASED_K",177];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_K.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_K.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_L = ["KEY_RELEASED_L",178];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_L.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_L.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_M = ["KEY_RELEASED_M",179];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_M.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_M.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_N = ["KEY_RELEASED_N",180];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_N.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_N.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_O = ["KEY_RELEASED_O",181];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_O.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_O.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_P = ["KEY_RELEASED_P",182];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_P.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_P.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Q = ["KEY_RELEASED_Q",183];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Q.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Q.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_R = ["KEY_RELEASED_R",184];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_R.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_R.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_S = ["KEY_RELEASED_S",185];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_S.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_S.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_T = ["KEY_RELEASED_T",186];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_T.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_T.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_U = ["KEY_RELEASED_U",187];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_U.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_U.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_V = ["KEY_RELEASED_V",188];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_V.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_V.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_W = ["KEY_RELEASED_W",189];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_W.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_W.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_X = ["KEY_RELEASED_X",190];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_X.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_X.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Y = ["KEY_RELEASED_Y",191];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Y.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Y.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Z = ["KEY_RELEASED_Z",192];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Z.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_Z.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_0 = ["KEY_RELEASED_NUMBER_0",193];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_0.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_0.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_1 = ["KEY_RELEASED_NUMBER_1",194];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_1.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_1.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_2 = ["KEY_RELEASED_NUMBER_2",195];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_2.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_2.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_3 = ["KEY_RELEASED_NUMBER_3",196];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_3.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_3.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_4 = ["KEY_RELEASED_NUMBER_4",197];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_4.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_4.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_5 = ["KEY_RELEASED_NUMBER_5",198];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_5.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_5.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_6 = ["KEY_RELEASED_NUMBER_6",199];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_6.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_6.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_7 = ["KEY_RELEASED_NUMBER_7",200];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_7.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_7.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_8 = ["KEY_RELEASED_NUMBER_8",201];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_8.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_8.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_9 = ["KEY_RELEASED_NUMBER_9",202];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_9.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_NUMBER_9.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_EQUALS = ["KEY_RELEASED_EQUALS",203];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_EQUALS.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_EQUALS.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SLASH = ["KEY_RELEASED_SLASH",204];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SLASH.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SLASH.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSLASH = ["KEY_RELEASED_BACKSLASH",205];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSLASH.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKSLASH.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFTBRACKET = ["KEY_RELEASED_LEFTBRACKET",206];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFTBRACKET.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_LEFTBRACKET.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHTBRACKET = ["KEY_RELEASED_RIGHTBRACKET",207];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHTBRACKET.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_RIGHTBRACKET.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKQUOTE = ["KEY_RELEASED_BACKQUOTE",208];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKQUOTE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_BACKQUOTE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMA = ["KEY_RELEASED_COMMA",209];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMA.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMA.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMAND = ["KEY_RELEASED_COMMAND",210];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMAND.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_COMMAND.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_MINUS = ["KEY_RELEASED_MINUS",211];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_MINUS.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_MINUS.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PERIOD = ["KEY_RELEASED_PERIOD",212];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PERIOD.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_PERIOD.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_QUOTE = ["KEY_RELEASED_QUOTE",213];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_QUOTE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_QUOTE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SEMICOLON = ["KEY_RELEASED_SEMICOLON",214];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SEMICOLON.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_SEMICOLON.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDMENU = ["KEY_RELEASED_ANDROIDMENU",215];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDMENU.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDMENU.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDSEARCH = ["KEY_RELEASED_ANDROIDSEARCH",216];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDSEARCH.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_ANDROIDSEARCH.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UNKNOWN = ["KEY_RELEASED_UNKNOWN",217];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UNKNOWN.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab.KEY_RELEASED_UNKNOWN.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventPrefab;
var tools_spark_sliced_services_std_logic_gde_interfaces_EEventType = $hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.EEventType"] = { __ename__ : true, __constructs__ : ["CREATED","UPDATE","NETWORK_CONNECTED","NETWORK_REQUEST","NETWORK_SERVER_EVENT","FILETRANSFER_CONNECTED","FILETRANSFER_SENDREQUEST","MOUSE_LEFT_CLICK","MOUSE_RIGHT_CLICK","MOUSE_ENTERED","MOUSE_MOVED","MOUSE_LEFT","KEY_PRESSED","KEY_RELEASED"] };
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.CREATED = ["CREATED",0];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.CREATED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.CREATED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.UPDATE = ["UPDATE",1];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.UPDATE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.UPDATE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_CONNECTED = ["NETWORK_CONNECTED",2];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_CONNECTED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_CONNECTED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_REQUEST = ["NETWORK_REQUEST",3];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_REQUEST.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_REQUEST.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_SERVER_EVENT = ["NETWORK_SERVER_EVENT",4];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_SERVER_EVENT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.NETWORK_SERVER_EVENT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_CONNECTED = ["FILETRANSFER_CONNECTED",5];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_CONNECTED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_CONNECTED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_SENDREQUEST = ["FILETRANSFER_SENDREQUEST",6];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_SENDREQUEST.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.FILETRANSFER_SENDREQUEST.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT_CLICK = ["MOUSE_LEFT_CLICK",7];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT_CLICK.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT_CLICK.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_RIGHT_CLICK = ["MOUSE_RIGHT_CLICK",8];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_RIGHT_CLICK.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_RIGHT_CLICK.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_ENTERED = ["MOUSE_ENTERED",9];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_ENTERED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_ENTERED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_MOVED = ["MOUSE_MOVED",10];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_MOVED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_MOVED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT = ["MOUSE_LEFT",11];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.MOUSE_LEFT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED = ["KEY_PRESSED",12];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_PRESSED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED = ["KEY_RELEASED",13];
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EEventType.KEY_RELEASED.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EEventType;
var tools_spark_sliced_services_std_logic_gde_interfaces_EGameType = $hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.EGameType"] = { __ename__ : true, __constructs__ : ["ENTITY","FORM","STATE","SPACE","ACTION","TRIGGER"] };
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ENTITY = ["ENTITY",0];
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ENTITY.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ENTITY.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.FORM = ["FORM",1];
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.FORM.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.FORM.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.STATE = ["STATE",2];
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.STATE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.STATE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.SPACE = ["SPACE",3];
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.SPACE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.SPACE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ACTION = ["ACTION",4];
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ACTION.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.ACTION.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.TRIGGER = ["TRIGGER",5];
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.TRIGGER.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EGameType.TRIGGER.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EGameType;
var tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType = $hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.ENodeType"] = { __ename__ : true, __constructs__ : ["ENTITIES","ENTITY","FORM","STATES","STATE","SPACE","ACTIONS","ACTION","SCRIPTS","SCRIPT","GML","TRIGGERS","TRIGGER","EVENT","CONCURRENCY","ID","TYPE","VALUE","EXTENDS"] };
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES = ["ENTITIES",0];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITIES.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY = ["ENTITY",1];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ENTITY.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM = ["FORM",2];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.FORM.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES = ["STATES",3];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATES.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE = ["STATE",4];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.STATE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE = ["SPACE",5];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SPACE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS = ["ACTIONS",6];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTIONS.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION = ["ACTION",7];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ACTION.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS = ["SCRIPTS",8];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPTS.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT = ["SCRIPT",9];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.SCRIPT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML = ["GML",10];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.GML.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS = ["TRIGGERS",11];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGERS.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER = ["TRIGGER",12];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TRIGGER.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT = ["EVENT",13];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EVENT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY = ["CONCURRENCY",14];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.CONCURRENCY.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID = ["ID",15];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.ID.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE = ["TYPE",16];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.TYPE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE = ["VALUE",17];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.VALUE.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS = ["EXTENDS",18];
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType.EXTENDS.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_ENodeType;
var tools_spark_sliced_services_std_logic_gde_interfaces_EStateType = $hxClasses["tools.spark.sliced.services.std.logic.gde.interfaces.EStateType"] = { __ename__ : true, __constructs__ : ["DYNAMIC","INTEGER","DECIMAL","BOOLEAN","TEXT"] };
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DYNAMIC = ["DYNAMIC",0];
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DYNAMIC.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DYNAMIC.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType;
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.INTEGER = ["INTEGER",1];
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.INTEGER.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.INTEGER.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType;
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DECIMAL = ["DECIMAL",2];
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DECIMAL.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.DECIMAL.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType;
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.BOOLEAN = ["BOOLEAN",3];
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.BOOLEAN.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.BOOLEAN.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType;
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.TEXT = ["TEXT",4];
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.TEXT.toString = $estr;
tools_spark_sliced_services_std_logic_gde_interfaces_EStateType.TEXT.__enum__ = tools_spark_sliced_services_std_logic_gde_interfaces_EStateType;
var tools_spark_sliced_services_std_logic_interpreter_interfaces_IInterpreter = function() { };
$hxClasses["tools.spark.sliced.services.std.logic.interpreter.interfaces.IInterpreter"] = tools_spark_sliced_services_std_logic_interpreter_interfaces_IInterpreter;
tools_spark_sliced_services_std_logic_interpreter_interfaces_IInterpreter.__name__ = true;
tools_spark_sliced_services_std_logic_interpreter_interfaces_IInterpreter.prototype = {
	__class__: tools_spark_sliced_services_std_logic_interpreter_interfaces_IInterpreter
};
var tools_spark_sliced_services_std_logic_interpreter_core_GmlInterpreter = function() {
	tools_spark_framework_Console.log("Init Gml Interpreter...");
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.interpreter.core.GmlInterpreter"] = tools_spark_sliced_services_std_logic_interpreter_core_GmlInterpreter;
tools_spark_sliced_services_std_logic_interpreter_core_GmlInterpreter.__name__ = true;
tools_spark_sliced_services_std_logic_interpreter_core_GmlInterpreter.__interfaces__ = [tools_spark_sliced_services_std_logic_interpreter_interfaces_IInterpreter];
tools_spark_sliced_services_std_logic_interpreter_core_GmlInterpreter.prototype = {
	_init: function() {
		this._hashTable = new haxe_ds_IntMap();
	}
	,run: function(hashId,parameters) {
		var program = this._get(hashId);
		this._deleteMeCircleAround(parameters.get("me"));
		return true;
	}
	,_deleteMeCircleAround: function(me) {
		if(me.getState("std_object") != null) {
			me.setState("std_x",me.getState("initX") + 50 * Math.cos(me.getState("rotationDegree")));
			me.getState("std_object").x = me.getState("std_x");
			me.setState("std_y",me.getState("initY") + 50 * Math.sin(me.getState("rotationDegree")));
			me.getState("std_object").y = me.getState("std_y");
			me.setState("rotationDegree",me.getState("rotationDegree") + 0.1);
		}
	}
	,hash: function(script) {
		return -1;
	}
	,_get: function(hashId) {
		return "doTheCircle";
	}
	,__class__: tools_spark_sliced_services_std_logic_interpreter_core_GmlInterpreter
};
var tools_spark_sliced_services_std_logic_interpreter_core_HaxeInterpreter = function() {
	tools_spark_framework_Console.log("Init Haxe Interpreter...");
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.logic.interpreter.core.HaxeInterpreter"] = tools_spark_sliced_services_std_logic_interpreter_core_HaxeInterpreter;
tools_spark_sliced_services_std_logic_interpreter_core_HaxeInterpreter.__name__ = true;
tools_spark_sliced_services_std_logic_interpreter_core_HaxeInterpreter.__interfaces__ = [tools_spark_sliced_services_std_logic_interpreter_interfaces_IInterpreter];
tools_spark_sliced_services_std_logic_interpreter_core_HaxeInterpreter.prototype = {
	_init: function() {
		this._hashTable = new haxe_ds_IntMap();
		this._parser = new hscript_Parser();
		this._interpreter = new hscript_Interp();
		this._interpreter.variables.set("Game",tools_spark_sliced_core_Sliced);
		this._interpreter.variables.set("Sound",tools_spark_sliced_core_Sliced.sound);
		this._interpreter.variables.set("Logic",tools_spark_sliced_core_Sliced.logic);
		this._interpreter.variables.set("Input",tools_spark_sliced_core_Sliced.input);
		this._interpreter.variables.set("Comms",tools_spark_sliced_core_Sliced.comms);
		this._interpreter.variables.set("Display",tools_spark_sliced_core_Sliced.display);
		this._interpreter.variables.set("Key",flambe_input_Key);
		this._interpreter.variables.set("Console",tools_spark_framework_Console);
		this._interpreter.variables.set("Math",Math);
		this._interpreter.variables.set("Std",Std);
		this._interpreter.variables.set("String",String);
		this._interpreter.variables.set("Assets",tools_spark_framework_Assets);
		this._interpreter.variables.set("Xml",Xml);
		this._interpreter.variables.set("StringTools",StringTools);
		this._interpreter.variables.set("XMLHttpRequest",XMLHttpRequest);
	}
	,run: function(hashId,parameters) {
		var program = this._get(hashId);
		this._interpreter.variables.set("Game",tools_spark_sliced_core_Sliced);
		this._interpreter.variables.set("Sound",tools_spark_sliced_core_Sliced.sound);
		this._interpreter.variables.set("Logic",tools_spark_sliced_core_Sliced.logic);
		this._interpreter.variables.set("Input",tools_spark_sliced_core_Sliced.input);
		this._interpreter.variables.set("Comms",tools_spark_sliced_core_Sliced.comms);
		this._interpreter.variables.set("Display",tools_spark_sliced_core_Sliced.display);
		this._interpreter.variables.set("Key",flambe_input_Key);
		this._interpreter.variables.set("Console",tools_spark_framework_Console);
		this._interpreter.variables.set("Math",Math);
		this._interpreter.variables.set("Std",Std);
		this._interpreter.variables.set("String",String);
		this._interpreter.variables.set("Assets",tools_spark_framework_Assets);
		this._interpreter.variables.set("Xml",Xml);
		this._interpreter.variables.set("StringTools",StringTools);
		this._interpreter.variables.set("XMLHttpRequest",XMLHttpRequest);
		var $it0 = parameters.keys();
		while( $it0.hasNext() ) {
			var varName = $it0.next();
			var value = parameters.get(varName);
			this._interpreter.variables.set(varName,value);
		}
		return this._interpreter.execute(program);
	}
	,hash: function(script) {
		return this._store(this._parser.parseString(script),haxe_crypto_Crc32.make(haxe_io_Bytes.ofString(script)));
	}
	,_get: function(hashId) {
		var script = this._hashTable.get(hashId);
		if(script == null) tools_spark_framework_Console.error("Script not found on address [" + hashId + "]");
		return script;
	}
	,_store: function(script,hashId) {
		if(this._hashTable.get(hashId) != null) {
			if(Std.string(script) == Std.string(this._hashTable.get(hashId))) return hashId; else {
				tools_spark_framework_Console.warn("Collision detected with hashId: [" + hashId + "] and script [" + Std.string(script) + "]. Previous Stored Entry Script: " + Std.string(this._hashTable.get(hashId)));
				return this._store(script,++hashId);
			}
		} else {
			this._hashTable.set(hashId,script);
			script;
			return hashId;
		}
	}
	,__class__: tools_spark_sliced_services_std_logic_interpreter_core_HaxeInterpreter
};
var tools_spark_sliced_services_std_sound_core_Sound = function() {
	tools_spark_sliced_core_AService.call(this);
	this._init();
};
$hxClasses["tools.spark.sliced.services.std.sound.core.Sound"] = tools_spark_sliced_services_std_sound_core_Sound;
tools_spark_sliced_services_std_sound_core_Sound.__name__ = true;
tools_spark_sliced_services_std_sound_core_Sound.__interfaces__ = [tools_spark_sliced_interfaces_ISound];
tools_spark_sliced_services_std_sound_core_Sound.__super__ = tools_spark_sliced_core_AService;
tools_spark_sliced_services_std_sound_core_Sound.prototype = $extend(tools_spark_sliced_core_AService.prototype,{
	_init: function() {
		tools_spark_framework_Console.log("Init Sound std Service...");
	}
	,playSound: function(p_soundName,volume) {
		return tools_spark_framework_Assets.getSound(p_soundName).play(volume);
	}
	,loopSound: function(p_soundName,volume) {
		return tools_spark_framework_Assets.getSound(p_soundName).loop(volume);
	}
	,__class__: tools_spark_sliced_services_std_sound_core_Sound
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
flambe_platform_html_HtmlPlatform.instance = new flambe_platform_html_HtmlPlatform();
flambe_util_SignalBase.DISPATCHING_SENTINEL = new flambe_util_SignalConnection(null,null);
flambe_System.root = new flambe_Entity();
flambe_System.uncaughtError = new flambe_util_Signal1();
flambe_System.hidden = new flambe_util_Value(false);
flambe_System.volume = new flambe_animation_AnimatedFloat(1);
flambe_System._platform = flambe_platform_html_HtmlPlatform.instance;
flambe_System._calledInit = false;
flambe_Log.logger = flambe_System.createLogger("flambe");
flambe_asset_Manifest.__meta__ = { obj : { assets : [{ }]}};
flambe_asset_Manifest._supportsCrossOrigin = (function() {
	var detected = (function() {
		if(js_Browser.get_navigator().userAgent.indexOf("Linux; U; Android") >= 0) return false;
		var xhr = new XMLHttpRequest();
		return xhr.withCredentials != null;
	})();
	if(!detected) flambe_Log.warn("This browser does not support cross-domain asset loading, any Manifest.remoteBase setting will be ignored.");
	return detected;
})();
flambe_display_Sprite._scratchPoint = new flambe_math_Point();
flambe_platform_BasicKeyboard._sharedEvent = new flambe_input_KeyboardEvent();
flambe_platform_BasicMouse._sharedEvent = new flambe_input_MouseEvent();
flambe_platform_BasicPointer._sharedEvent = new flambe_input_PointerEvent();
flambe_platform_html_CanvasRenderer.CANVAS_TEXTURES = (function() {
	var pattern = new EReg("(iPhone|iPod|iPad)","");
	return pattern.match(js_Browser.get_window().navigator.userAgent);
})();
flambe_platform_html_HtmlAssetPackLoader._mediaRefCount = 0;
flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport = true;
flambe_platform_html_HtmlUtil.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = js_Browser.get_window().top == js_Browser.get_window() && new EReg("Mobile(/.*)? Safari","").match(js_Browser.get_navigator().userAgent);
flambe_platform_html_WebAudioSound._detectSupport = true;
flambe_platform_html_WebGLGraphics._scratchMatrix = new flambe_math_Matrix();
haxe_ds_ObjectMap.count = 0;
haxe_xml_Check.blanks = new EReg("^[ \r\n\t]*$","");
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
tools_spark_framework_SparkLog.logger = flambe_System.createLogger("tools.spark.framework");
tools_spark_framework_haxe_LooseCheck.blanks = new EReg("^[ \r\n\t]*$","");
tools_spark_Main.main();
})();

//# sourceMappingURL=main-html.js.map