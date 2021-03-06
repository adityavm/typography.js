/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var k=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return 0});var n=function(a,b,c,d){c=c||[];b=b||document;var e=b;if(b.nodeType!==1&&b.nodeType!==9){return[]}if(!a||typeof a!=="string"){return c}var f=[],m,set,checkSet,extra,prune=true,contextXML=n.isXML(b),soFar=a,ret,cur,pop,i;do{k.exec("");m=k.exec(soFar);if(m){soFar=m[3];f.push(m[1]);if(m[2]){extra=m[3];break}}}while(m);if(f.length>1&&p.exec(a)){if(f.length===2&&o.relative[f[0]]){set=t(f[0]+f[1],b)}else{set=o.relative[f[0]]?[b]:n(f.shift(),b);while(f.length){a=f.shift();if(o.relative[a]){a+=f.shift()}set=t(a,set)}}}else{if(!d&&f.length>1&&b.nodeType===9&&!contextXML&&o.match.ID.test(f[0])&&!o.match.ID.test(f[f.length-1])){ret=n.find(f.shift(),b,contextXML);b=ret.expr?n.filter(ret.expr,ret.set)[0]:ret.set[0]}if(b){ret=d?{expr:f.pop(),set:r(d)}:n.find(f.pop(),f.length===1&&(f[0]==="~"||f[0]==="+")&&b.parentNode?b.parentNode:b,contextXML);set=ret.expr?n.filter(ret.expr,ret.set):ret.set;if(f.length>0){checkSet=r(set)}else{prune=false}while(f.length){cur=f.pop();pop=cur;if(!o.relative[cur]){cur=""}else{pop=f.pop()}if(pop==null){pop=b}o.relative[cur](checkSet,pop,contextXML)}}else{checkSet=f=[]}}if(!checkSet){checkSet=set}if(!checkSet){n.error(cur||a)}if(toString.call(checkSet)==="[object Array]"){if(!prune){c.push.apply(c,checkSet)}else if(b&&b.nodeType===1){for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&n.contains(b,checkSet[i]))){c.push(set[i])}}}else{for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){c.push(set[i])}}}}else{r(checkSet,c)}if(extra){n(extra,e,c,d);n.uniqueSort(c)}return c};n.uniqueSort=function(a){if(s){hasDuplicate=baseHasDuplicate;a.sort(s);if(hasDuplicate){for(var i=1;i<a.length;i++){if(a[i]===a[i-1]){a.splice(i--,1)}}}}return a};n.matches=function(a,b){return n(a,null,null,b)};n.find=function(a,b,c){var d;if(!a){return[]}for(var i=0,l=o.order.length;i<l;i++){var e=o.order[i],match;if((match=o.leftMatch[e].exec(a))){var f=match[1];match.splice(1,1);if(f.substr(f.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");d=o.find[e](match,b,c);if(d!=null){a=a.replace(o.match[e],"");break}}}}if(!d){d=b.getElementsByTagName("*")}return{set:d,expr:a}};n.filter=function(a,b,c,d){var e=a,result=[],curLoop=b,match,anyFound,isXMLFilter=b&&b[0]&&n.isXML(b[0]);while(a&&b.length){for(var f in o.filter){if((match=o.leftMatch[f].exec(a))!=null&&match[2]){var g=o.filter[f],found,item,left=match[1];anyFound=false;match.splice(1,1);if(left.substr(left.length-1)==="\\"){continue}if(curLoop===result){result=[]}if(o.preFilter[f]){match=o.preFilter[f](match,curLoop,c,result,d,isXMLFilter);if(!match){anyFound=found=true}else if(match===true){continue}}if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=g(item,match,i,curLoop);var h=d^!!found;if(c&&found!=null){if(h){anyFound=true}else{curLoop[i]=false}}else if(h){result.push(item);anyFound=true}}}}if(found!==undefined){if(!c){curLoop=result}a=a.replace(o.match[f],"");if(!anyFound){return[]}break}}}if(a===e){if(anyFound==null){n.error(a)}else{break}}e=a}return curLoop};n.error=function(a){throw"Syntax error, unrecognized expression: "+a;};var o=n.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")}},relative:{"+":function(a,b){var c=typeof b==="string",isTag=c&&!/\W/.test(b),isPartStrNotTag=c&&!isTag;if(isTag){b=b.toLowerCase()}for(var i=0,l=a.length,elem;i<l;i++){if((elem=a[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}a[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===b?elem||false:elem===b}}if(isPartStrNotTag){n.filter(b,a,true)}},">":function(a,b){var c=typeof b==="string",elem,i=0,l=a.length;if(c&&!/\W/.test(b)){b=b.toLowerCase();for(;i<l;i++){elem=a[i];if(elem){var d=elem.parentNode;a[i]=d.nodeName.toLowerCase()===b?d:false}}}else{for(;i<l;i++){elem=a[i];if(elem){a[i]=c?elem.parentNode:elem.parentNode===b}}if(c){n.filter(b,a,true)}}},"":function(a,b,c){var d=done++,checkFn=dirCheck,nodeCheck;if(typeof b==="string"&&!/\W/.test(b)){b=b.toLowerCase();nodeCheck=b;checkFn=dirNodeCheck}checkFn("parentNode",b,d,a,nodeCheck,c)},"~":function(a,b,c){var d=done++,checkFn=dirCheck,nodeCheck;if(typeof b==="string"&&!/\W/.test(b)){b=b.toLowerCase();nodeCheck=b;checkFn=dirNodeCheck}checkFn("previousSibling",b,d,a,nodeCheck,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var m=b.getElementById(a[1]);return m?[m]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){var c=[],results=b.getElementsByName(a[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===a[1]){c.push(results[i])}}return c.length===0?null:c}},TAG:function(a,b){return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(/\\/g,"")+" ";if(f){return a}for(var i=0,elem;(elem=b[i])!=null;i++){if(elem){if(e^(elem.className&&(" "+elem.className+" ").replace(/[\t\n]/g," ").indexOf(a)>=0)){if(!c){d.push(elem)}}else if(c){b[i]=false}}}return false},ID:function(a){return a[1].replace(/\\/g,"")},TAG:function(a,b){return a[1].toLowerCase()},CHILD:function(a){if(a[1]==="nth"){var b=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=(b[1]+(b[2]||1))-0;a[3]=b[3]-0}a[0]=done++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1].replace(/\\/g,"");if(!f&&o.attrMap[g]){a[1]=o.attrMap[g]}if(a[2]==="~="){a[4]=" "+a[4]+" "}return a},PSEUDO:function(a,b,c,d,e){if(a[1]==="not"){if((k.exec(a[3])||"").length>1||/^\w/.test(a[3])){a[3]=n(a[3],null,null,b)}else{var f=n.filter(a[3],b,c,true^e);if(!c){d.push.apply(d,f)}return false}}else if(o.match.POS.test(a[0])||o.match.CHILD.test(a[0])){return true}return a},POS:function(a){a.unshift(true);return a}},filters:{enabled:function(a){return a.disabled===false&&a.type!=="hidden"},disabled:function(a){return a.disabled===true},checked:function(a){return a.checked===true},selected:function(a){a.parentNode.selectedIndex;return a.selected===true},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,i,b){return!!n(b[3],a).length},header:function(a){return(/h\d/i).test(a.nodeName)},text:function(a){return"text"===a.type},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return(/input|select|textarea|button/i).test(a.nodeName)}},setFilters:{first:function(a,i){return i===0},last:function(a,i,b,c){return i===c.length-1},even:function(a,i){return i%2===0},odd:function(a,i){return i%2===1},lt:function(a,i,b){return i<b[3]-0},gt:function(a,i,b){return i>b[3]-0},nth:function(a,i,b){return b[3]-0===i},eq:function(a,i,b){return b[3]-0===i}},filter:{PSEUDO:function(a,b,i,c){var d=b[1],filter=o.filters[d];if(filter){return filter(a,i,b,c)}else if(d==="contains"){return(a.textContent||a.innerText||n.getText([a])||"").indexOf(b[3])>=0}else if(d==="not"){var e=b[3];for(var j=0,l=e.length;j<l;j++){if(e[j]===a){return false}}return true}else{n.error("Syntax error, unrecognized expression: "+d)}},CHILD:function(a,b){var c=b[1],node=a;switch(c){case'only':case'first':while((node=node.previousSibling)){if(node.nodeType===1){return false}}if(c==="first"){return true}node=a;case'last':while((node=node.nextSibling)){if(node.nodeType===1){return false}}return true;case'nth':var d=b[2],last=b[3];if(d===1&&last===0){return true}var e=b[0],parent=a.parentNode;if(parent&&(parent.sizcache!==e||!a.nodeIndex)){var f=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++f}}parent.sizcache=e}var g=a.nodeIndex-last;if(d===0){return g===0}else{return(g%d===0&&g/d>=0)}}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return(b==="*"&&a.nodeType===1)||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],result=o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),value=result+"",q=b[2],check=b[4];return result==null?q==="!=":q==="="?value===check:q==="*="?value.indexOf(check)>=0:q==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:q==="!="?value!==check:q==="^="?value.indexOf(check)===0:q==="$="?value.substr(value.length-check.length)===check:q==="|="?value===check||value.substr(0,check.length+1)===check+"-":false},POS:function(a,b,i,c){var d=b[2],filter=o.setFilters[d];if(filter){return filter(a,i,b,c)}}}};var p=o.match.POS,fescape=function(a,b){return"\\"+(b-0+1)};for(var q in o.match){o.match[q]=new RegExp(o.match[q].source+(/(?![^\[]*\])(?![^\(]*\))/.source));o.leftMatch[q]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[q].source.replace(/\\(\d+)/g,fescape))}var r=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(e){r=function(a,b){var c=b||[],i=0;if(toString.call(a)==="[object Array]"){Array.prototype.push.apply(c,a)}else{if(typeof a.length==="number"){for(var l=a.length;i<l;i++){c.push(a[i])}}else{for(;a[i];i++){c.push(a[i])}}}return c}}var s;if(document.documentElement.compareDocumentPosition){s=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true}return a.compareDocumentPosition?-1:1}var c=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(c===0){hasDuplicate=true}return c}}else if("sourceIndex"in document.documentElement){s=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true}return a.sourceIndex?-1:1}var c=a.sourceIndex-b.sourceIndex;if(c===0){hasDuplicate=true}return c}}else if(document.createRange){s=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true}return a.ownerDocument?-1:1}var c=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();c.setStart(a,0);c.setEnd(a,0);bRange.setStart(b,0);bRange.setEnd(b,0);var d=c.compareBoundaryPoints(Range.START_TO_END,bRange);if(d===0){hasDuplicate=true}return d}}n.getText=function(a){var b="",elem;for(var i=0;a[i];i++){elem=a[i];if(elem.nodeType===3||elem.nodeType===4){b+=elem.nodeValue}else if(elem.nodeType!==8){b+=n.getText(elem.childNodes)}}return b};(function(){var d=document.createElement("div"),id="script"+(new Date()).getTime();d.innerHTML="<a name='"+id+"'/>";var e=document.documentElement;e.insertBefore(d,e.firstChild);if(document.getElementById(id)){o.find.ID=function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var m=b.getElementById(a[1]);return m?m.id===a[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===a[1]?[m]:undefined:[]}};o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}}e.removeChild(d);e=d=null})();(function(){var e=document.createElement("div");e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0){o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var i=0;c[i];i++){if(c[i].nodeType===1){d.push(c[i])}}c=d}return c}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){o.attrHandle.href=function(a){return a.getAttribute("href",2)}}e=null})();if(document.querySelectorAll){(function(){var f=n,div=document.createElement("div");div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return}n=function(a,b,c,d){b=b||document;if(!d&&b.nodeType===9&&!n.isXML(b)){try{return r(b.querySelectorAll(a),c)}catch(e){}}return f(a,b,c,d)};for(var g in f){n[g]=f[g]}div=null})()}(function(){var d=document.createElement("div");d.innerHTML="<div class='test e'></div><div class='test'></div>";if(!d.getElementsByClassName||d.getElementsByClassName("e").length===0){return}d.lastChild.className="e";if(d.getElementsByClassName("e").length===1){return}o.order.splice(1,0,"CLASS");o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!=="undefined"&&!c){return b.getElementsByClassName(a[1])}};d=null})();function dirNodeCheck(a,b,c,d,e,f){for(var i=0,l=d.length;i<l;i++){var g=d[i];if(g){g=g[a];var h=false;while(g){if(g.sizcache===c){h=d[g.sizset];break}if(g.nodeType===1&&!f){g.sizcache=c;g.sizset=i}if(g.nodeName.toLowerCase()===b){h=g;break}g=g[a]}d[i]=h}}}function dirCheck(a,b,c,d,e,f){for(var i=0,l=d.length;i<l;i++){var g=d[i];if(g){g=g[a];var h=false;while(g){if(g.sizcache===c){h=d[g.sizset];break}if(g.nodeType===1){if(!f){g.sizcache=c;g.sizset=i}if(typeof b!=="string"){if(g===b){h=true;break}}else if(n.filter(b,[g]).length>0){h=g;break}}g=g[a]}d[i]=h}}}n.contains=document.compareDocumentPosition?function(a,b){return!!(a.compareDocumentPosition(b)&16)}:function(a,b){return a!==b&&(a.contains?a.contains(b):true)};n.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":false};var t=function(a,b){var c=[],later="",match,root=b.nodeType?[b]:b;while((match=o.match.PSEUDO.exec(a))){later+=match[0];a=a.replace(o.match.PSEUDO,"")}a=o.relative[a]?a+"*":a;for(var i=0,l=root.length;i<l;i++){n(a,root[i],c)}return n.filter(later,c)};window.Sizzle=n})();

/* trim() from phpjs */
function trim(a,b){var c,l=0,i=0;a+='';if(!b){c=" \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000"}else{b+='';c=b.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'$1')}l=a.length;for(i=0;i<l;i++){if(c.indexOf(a.charAt(i))===-1){a=a.substring(i);break}}l=a.length;for(i=l-1;i>=0;i--){if(c.indexOf(a.charAt(i))===-1){a=a.substring(0,i+1);break}}return c.indexOf(a.charAt(0))===-1?a:''}

/*!
 * Typography.js
 *
 * By Aditya V. Mukherjee	(adityamukherjee.com)
 * 	  Andreas Carlsson 		(nofont.com)
 *
 * Released under the MIT License.
 */
function typography(){ this.exec(this); } // run all registered hooks and apply typographical changes to required classes
typography.prototype = {
	options: {
		classContext	: "text",
		constantClass	: "glyph",
		emptyTags		: "br,hr,img" // tags that might be empty
	},
	
	/* hooks to call when typografying the text
	 */
	hooks: new Array(
				'this.ligature_fi',
				'this.ligature_fl'
			),
	
	/** INTERNAL */
	
	/* execute the transformer
	 */
	exec: function(obj){
		var context = Sizzle("." + this.options.classContext);
		
		for(var i=0;i<context.length;i++){
			if(typeof context[i] != 'object')
				continue;
			
			var c = context[i],
				text = trim(c.innerText || c.textContent),
				html = trim(c.innerHTML);
			
			//html = this.cleanup(html);
			
			/* these are easy */
			html = html.replace(/\s&amp;\s/g, " "+this.ampersand(obj, "&")+" ");
			html = html.replace(/(\.\s\.\s(\.\s)?|(\.\.(\.)?))/g, this.ellipsis(obj, "..."));
			
			context[i].innerHTML = this.tokeniseAndTypografy(obj, html);
		}
	},
	
	tokeniseAndTypografy: function(obj, html){
		var tagStack = new Array(),
			tokens = html.split(" "), // split the text into tokens (oh boy)
			skip = false, tag = "";
		for(var j=0;j<tokens.length;j++){
			/* keep skipping tokens if we encounter a tag opening until it is closed or '/>' is reached */
			if(tokens[j].match(/<(\w+)>?/)){
				skip = true; tagStack.push(RegExp['$1']);
			}
			
			if(skip){
				if(tokens[j].match(/\/>/)){
					tagStack.pop();
					skip = false;
				} else if(tokens[j].match(/>/))
					skip = false;
			}
			
			if(tokens[j].match(/<\/(\w+)>/)){
				skip = false;
				if(RegExp["$1"] == tag[tag.length-1])
					tagStack.pop();
				else // reset stack
					tagStack = new Array();
			}
			
			//console.log(tokens[j], skip, tag);
			/* if we're skipping */
			if(skip){
				if(tokens[j].match(/>(.+)<\/\w+>/))
					this.tokeniseAndTypografy(obj, RegExp['$1']);
			} else {
				html = html.replace(tokens[j], this.applyHooks(obj, tokens[j]));
			}
		}
		return html;		
	},
	
	/* apply all the hooks to the array of tokens
	 */
	applyHooks: function(obj, token){
		var output = token;
		for(i in this.hooks){
			var func = eval(this.hooks[i]);
			output = func(obj, output);
		}
		return output;
	},
	
	cleanup: function(obj, html){
		html = html.replace(/<(\w+)(\s?)([.\S]*)(?:\s*\/>)/, "<$1$2$3></$1>");
	},
	
	/** PREDEFINED HOOKS */
	
	/* Change all ampersands to SPAN-wrapped &amp;
	 */
	ampersand: function(obj, token){
		return token.replace(/^&$/, "<span class=\"typo-amp "+ this.options.constantClass +"\">&amp;</span>");
	},
	
	/* Change all ellipsis to SPAN-wrapped &hellip;
	 */
	ellipsis: function(obj, token){
		return token.replace(/^(\.\.\.)$/, "<span class=\"typo-ellipsis "+ this.options.constantClass +"\">&hellip;</span>");
	},
	
	/* Replace "fi" with "ﬁ"
	 */
	ligature_fi: function(obj, token){
		return token.replace(/fi(?!([^<]+)?>)/, "&#xFB01;");
	},
	
	/* Replace "fl" with "ﬂ"
	 */
	ligature_fl: function(obj, token){
		return token.replace(/fl(?!([^<]+)?>)/, "&#xFB02;");
	}
}