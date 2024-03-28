(()=>{(function(){function t(){for(var n=arguments.length,o=0;o<n;o++){var a=o<0||arguments.length<=o?void 0:arguments[o];a.nodeType===1||a.nodeType===11?this.appendChild(a):this.appendChild(document.createTextNode(String(a)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function r(){for(var n=this.parentNode,o=arguments.length,a=new Array(o),c=0;c<o;c++)a[c]=arguments[c];var l=a.length;if(!!n)for(l||n.removeChild(this);l--;){var i=a[l];typeof i!="object"?i=this.ownerDocument.createTextNode(i):i.parentNode&&i.parentNode.removeChild(i),l?n.insertBefore(this.previousSibling,i):n.replaceChild(i,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=t,DocumentFragment.prototype.append=t),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=r,DocumentFragment.prototype.replaceWith=r))})();function kt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function nt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function ot(t,e,r){return e&&nt(t.prototype,e),r&&nt(t,r),t}function Mt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function it(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),r.push.apply(r,n)}return r}function at(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?it(Object(r),!0).forEach(function(n){Mt(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):it(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function ct(t,e){return Bt(t)||jt(t,e)||lt(t,e)||Ut()}function L(t){return Dt(t)||Gt(t)||lt(t)||Wt()}function Dt(t){if(Array.isArray(t))return F(t)}function Bt(t){if(Array.isArray(t))return t}function Gt(t){if(typeof Symbol<"u"&&Symbol.iterator in Object(t))return Array.from(t)}function jt(t,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(t)))){var r=[],n=!0,o=!1,a=void 0;try{for(var c=t[Symbol.iterator](),l;!(n=(l=c.next()).done)&&(r.push(l.value),!(e&&r.length===e));n=!0);}catch(i){o=!0,a=i}finally{try{!n&&c.return!=null&&c.return()}finally{if(o)throw a}}return r}}function lt(t,e){if(!!t){if(typeof t=="string")return F(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);if(r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set")return Array.from(t);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return F(t,e)}}function F(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function Wt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ut(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function M(t,e){return Object.getOwnPropertyNames(Object(t)).reduce(function(r,n){var o=Object.getOwnPropertyDescriptor(Object(t),n),a=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(r,n,a||o)},{})}function X(t){return typeof t=="string"}function K(t){return Array.isArray(t)}function Y(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=M(t),r;return e.types!==void 0?r=e.types:e.split!==void 0&&(r=e.split),r!==void 0&&(e.types=(X(r)||K(r)?String(r):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(t.position)),e}function Q(t){var e=X(t)||K(t)?String(t):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function V(t){return t!==null&&typeof t=="object"}function Ht(t){return V(t)&&/^(1|3|11)$/.test(t.nodeType)}function Xt(t){return typeof t=="number"&&t>-1&&t%1===0}function Yt(t){return V(t)&&Xt(t.length)}function B(t){return K(t)?t:t==null?[]:Yt(t)?Array.prototype.slice.call(t):[t]}function st(t){var e=t;return X(t)&&(/^(#[a-z]\w+)$/.test(t.trim())?e=document.getElementById(t.trim().slice(1)):e=document.querySelectorAll(t)),B(e).reduce(function(r,n){return[].concat(L(r),L(B(n).filter(Ht)))},[])}var $t=Object.entries,$="_splittype",w={},Vt=0;function N(t,e,r){if(!V(t))return console.warn("[data.set] owner is not an object"),null;var n=t[$]||(t[$]=++Vt),o=w[n]||(w[n]={});return r===void 0?!!e&&Object.getPrototypeOf(e)===Object.prototype&&(w[n]=at(at({},o),e)):e!==void 0&&(o[e]=r),r}function D(t,e){var r=V(t)?t[$]:null,n=r&&w[r]||{};return e===void 0?n:n[e]}function ut(t){var e=t&&t[$];e&&(delete t[e],delete w[e])}function qt(){Object.keys(w).forEach(function(t){delete w[t]})}function Ft(){$t(w).forEach(function(t){var e=ct(t,2),r=e[0],n=e[1],o=n.isRoot,a=n.isSplit;(!o||!a)&&(w[r]=null,delete w[r])})}function zt(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",r=t?String(t):"";return r.trim().replace(/\s+/g," ").split(e)}var tt="\\ud800-\\udfff",ft="\\u0300-\\u036f\\ufe20-\\ufe23",pt="\\u20d0-\\u20f0",dt="\\ufe0e\\ufe0f",Zt="[".concat(tt,"]"),z="[".concat(ft).concat(pt,"]"),Z="\\ud83c[\\udffb-\\udfff]",Jt="(?:".concat(z,"|").concat(Z,")"),ht="[^".concat(tt,"]"),gt="(?:\\ud83c[\\udde6-\\uddff]){2}",yt="[\\ud800-\\udbff][\\udc00-\\udfff]",mt="\\u200d",vt="".concat(Jt,"?"),At="[".concat(dt,"]?"),Kt="(?:"+mt+"(?:"+[ht,gt,yt].join("|")+")"+At+vt+")*",Qt=At+vt+Kt,te="(?:".concat(["".concat(ht).concat(z,"?"),z,gt,yt,Zt].join("|"),`
)`),ee=RegExp("".concat(Z,"(?=").concat(Z,")|").concat(te).concat(Qt),"g"),re=[mt,tt,ft,pt,dt],ne=RegExp("[".concat(re.join(""),"]"));function oe(t){return t.split("")}function St(t){return ne.test(t)}function ie(t){return t.match(ee)||[]}function ae(t){return St(t)?ie(t):oe(t)}function se(t){return t==null?"":String(t)}function ce(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return t=se(t),t&&X(t)&&!e&&St(t)?ae(t):t.split(e)}function J(t,e){var r=document.createElement(t);return e&&Object.keys(e).forEach(function(n){var o=e[n],a=X(o)?o.trim():o;a===null||a===""||(n==="children"?r.append.apply(r,L(B(a))):r.setAttribute(n,a))}),r}var et={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function le(t,e){e=M(et,e);var r=Q(e.types),n=e.tagName,o=t.nodeValue,a=document.createDocumentFragment(),c=[],l=[];return/^\s/.test(o)&&a.append(" "),c=zt(o).reduce(function(i,f,h,p){var u,s;return r.chars&&(s=ce(f).map(function(d){var y=J(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:d});return N(y,"isChar",!0),l=[].concat(L(l),[y]),y})),r.words||r.lines?(u=J(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(r.words&&e.absolute?"position: relative;":""),children:r.chars?s:f}),N(u,{isWord:!0,isWordStart:!0,isWordEnd:!0}),a.appendChild(u)):s.forEach(function(d){a.appendChild(d)}),h<p.length-1&&a.append(" "),r.words?i.concat(u):i},[]),/\s$/.test(o)&&a.append(" "),t.replaceWith(a),{words:c,chars:l}}function bt(t,e){var r=t.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(r))return n;if(r===3&&/\S/.test(t.nodeValue))return le(t,e);var o=B(t.childNodes);if(o.length&&(N(t,"isSplit",!0),!D(t).isRoot)){t.style.display="inline-block",t.style.position="relative";var a=t.nextSibling,c=t.previousSibling,l=t.textContent||"",i=a?a.textContent:" ",f=c?c.textContent:" ";N(t,{isWordEnd:/\s$/.test(l)||/^\s/.test(i),isWordStart:/^\s/.test(l)||/\s$/.test(f)})}return o.reduce(function(h,p){var u=bt(p,e),s=u.words,d=u.chars;return{words:[].concat(L(h.words),L(s)),chars:[].concat(L(h.chars),L(d))}},n)}function ue(t,e,r,n){if(!r.absolute)return{top:e?t.offsetTop:null};var o=t.offsetParent,a=ct(n,2),c=a[0],l=a[1],i=0,f=0;if(o&&o!==document.body){var h=o.getBoundingClientRect();i=h.x+c,f=h.y+l}var p=t.getBoundingClientRect(),u=p.width,s=p.height,d=p.x,y=p.y,A=y+l-f,C=d+c-i;return{width:u,height:s,top:A,left:C}}function Ot(t){D(t).isWord?(ut(t),t.replaceWith.apply(t,L(t.childNodes))):B(t.children).forEach(function(e){return Ot(e)})}var fe=function(){return document.createDocumentFragment()};function pe(t,e,r){var n=Q(e.types),o=e.tagName,a=t.getElementsByTagName("*"),c=[],l=[],i=null,f,h,p,u=[],s=t.parentElement,d=t.nextElementSibling,y=fe(),A=window.getComputedStyle(t),C=A.textAlign,G=parseFloat(A.fontSize),W=G*.2;return e.absolute&&(p={left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth},h=t.offsetWidth,f=t.offsetHeight,N(t,{cssWidth:t.style.width,cssHeight:t.style.height})),B(a).forEach(function(S){var b=S.parentElement===t,m=ue(S,b,e,r),O=m.width,E=m.height,v=m.top,T=m.left;/^br$/i.test(S.nodeName)||(n.lines&&b&&((i===null||v-i>=W)&&(i=v,c.push(l=[])),l.push(S)),e.absolute&&N(S,{top:v,left:T,width:O,height:E}))}),s&&s.removeChild(t),n.lines&&(u=c.map(function(S){var b=J(o,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(C,"; width: 100%;")});N(b,"isLine",!0);var m={height:0,top:1e4};return y.appendChild(b),S.forEach(function(O,E,v){var T=D(O),R=T.isWordEnd,U=T.top,I=T.height,q=v[E+1];m.height=Math.max(m.height,I),m.top=Math.min(m.top,U),b.appendChild(O),R&&D(q).isWordStart&&b.append(" ")}),e.absolute&&N(b,{height:m.height,top:m.top}),b}),n.words||Ot(y),t.replaceChildren(y)),e.absolute&&(t.style.width="".concat(t.style.width||h,"px"),t.style.height="".concat(f,"px"),B(a).forEach(function(S){var b=D(S),m=b.isLine,O=b.top,E=b.left,v=b.width,T=b.height,R=D(S.parentElement),U=!m&&R.isLine;S.style.top="".concat(U?O-R.top:O,"px"),S.style.left=m?"".concat(p.left,"px"):"".concat(E-(U?p.left:0),"px"),S.style.height="".concat(T,"px"),S.style.width=m?"".concat(p.width,"px"):"".concat(v,"px"),S.style.position="absolute"})),s&&(d?s.insertBefore(t,d):s.appendChild(t)),u}var j=M(et,{}),Et=function(){ot(t,null,[{key:"clearData",value:function(){qt()}},{key:"setDefaults",value:function(r){return j=M(j,Y(r)),et}},{key:"revert",value:function(r){st(r).forEach(function(n){var o=D(n),a=o.isSplit,c=o.html,l=o.cssWidth,i=o.cssHeight;a&&(n.innerHTML=c,n.style.width=l||"",n.style.height=i||"",ut(n))})}},{key:"create",value:function(r,n){return new t(r,n)}},{key:"data",get:function(){return w}},{key:"defaults",get:function(){return j},set:function(r){j=M(j,Y(r))}}]);function t(e,r){kt(this,t),this.isSplit=!1,this.settings=M(j,Y(r)),this.elements=st(e),this.split()}return ot(t,[{key:"split",value:function(r){var n=this;this.revert(),this.elements.forEach(function(c){N(c,"html",c.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var o=[window.pageXOffset,window.pageYOffset];r!==void 0&&(this.settings=M(this.settings,Y(r)));var a=Q(this.settings.types);a.none||(this.elements.forEach(function(c){N(c,"isRoot",!0);var l=bt(c,n.settings),i=l.words,f=l.chars;n.words=[].concat(L(n.words),L(i)),n.chars=[].concat(L(n.chars),L(f))}),this.elements.forEach(function(c){if(a.lines||n.settings.absolute){var l=pe(c,n.settings,o);n.lines=[].concat(L(n.lines),L(l))}}),this.isSplit=!0,window.scrollTo(o[0],o[1]),Ft())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),t.revert(this.elements)}}]),t}();var g=function(t,e){let r=typeof t;return typeof e!="string"||e.trim()===""?t:e==="true"&&r==="boolean"?!0:e==="false"&&r==="boolean"?!1:isNaN(e)&&r==="string"?e:!isNaN(e)&&r==="number"?+e:t},Tt=function(t,e="lines, words"){if(!!t)return typeSplit=new Et(t,{types:e}),typeSplit},x=function(t,e,r){if(!t||!e||!r){console.error(`GSAP checkBreakpoints Error in ${e}`);return}let{isMobile:n,isTablet:o,isDesktop:a,reduceMotion:c}=r.conditions;if(n===void 0||o===void 0||a===void 0){console.error("GSAP Match Media Conditions Not Defined");return}let l=`data-ix-${e}-desktop`,i=`data-ix-${e}-tablet`,f=`data-ix-${e}-mobile`;return runMobile=g(!0,t.getAttribute(f)),runTablet=g(!0,t.getAttribute(i)),runDesktop=g(!0,t.getAttribute(l)),!(runMobile===!1&&n||runTablet===!1&&o||runDesktop===!1&&a)};var Lt=function(t){let e="hoveractive",r='[data-ix-hoveractive="wrap"]',n="data-ix-hoveractive-class",o="is-active";gsap.utils.toArray(r).forEach(c=>{if(!c)return;let l=attr(o,c.getAttribute(n));x(c,e,t)!==!1&&(c.addEventListener("mouseover",function(f){c.classList.add(l)}),c.addEventListener("mouseleave",function(f){c.classList.remove(l)}))})};var xt=function(t){let e="mouseover",r='[data-ix-mouseover="wrap"]',n='[data-ix-mouseover="layer"]',o='[data-ix-mouseover="target"]',a="data-ix-mouseover-duration",c="data-ix-mouseover-ease",l="data-ix-mouseover-move-x",i="data-ix-mouseover-move-y",f="data-ix-mouseover-rotate-z";document.querySelectorAll(r).forEach(p=>{let u=p.querySelectorAll(n);if(u.length===0||x(p,e,t)===!1)return;let d=p.querySelector(o);d||(d=p),function(){let A={x:.5,y:.5},C={x:A.x,y:A.y},G=g(.5,p.getAttribute(a)),W=g("power1.out",p.getAttribute(c)),S=gsap.timeline({paused:!0,defaults:{ease:"none"}}),b=gsap.timeline({paused:!0,defaults:{ease:"none"}});u.forEach(O=>{let E=g(10,O.getAttribute(l)),v=g(10,O.getAttribute(i)),T=g(0,O.getAttribute(f));S.fromTo(O,{xPercent:E*-1,rotateZ:T*-1},{xPercent:E,rotateZ:T},0),b.fromTo(O,{yPercent:v*-1},{yPercent:v},0)});function m(O,E){gsap.to(C,{x:O,y:E,ease:W,duration:G,onUpdate:()=>{S.progress(C.x),b.progress(C.y)}})}m(A.x,A.y),d.addEventListener("mousemove",function(O){let E=d.getBoundingClientRect(),v=gsap.utils.clamp(0,1,gsap.utils.normalize(0,E.width,O.clientX-E.left)),T=gsap.utils.clamp(0,1,gsap.utils.normalize(0,E.height,O.clientY-E.top));m(v,T)}),d.addEventListener("mouseleave",function(O){m(A.x,A.y)})}()})};var _t=function(t){let e="parallax",r='[data-ix-parallax="wrap"]',n='[data-ix-parallax="section"]',o='[data-ix-parallax="trigger"]',a="data-ix-parallax-type",c="data-ix-parallax-amount";gsap.utils.toArray(r).forEach(i=>{let f=i.querySelector(n),h=i.querySelector(o);if(!i||!f||!h)return;let p="uncover";if(p=g("uncover",i.getAttribute(a)),moveAmount=g(50,i.getAttribute(c)),x(i,e,t)===!1)return;let s={scrub:!0,start:"top bottom",end:"top top",moveStart:"-100vh",moveEnd:"0vh"};p==="cover"&&(s.start="bottom bottom",s.end="bottom top",s.moveStart="0vh",s.moveEnd="100vh"),p==="parallax"&&(s.moveStart=`-${moveAmount}vh`,s.moveEnd="0vh"),gsap.timeline({scrollTrigger:{trigger:h,markers:!1,start:s.start,end:s.end,scrub:s.scrub},defaults:{duration:1,ease:"none"},onStart:()=>{ScrollTrigger.refresh()}}).fromTo(f,{y:s.moveStart},{y:s.moveEnd})})};var Ct=function(t){let e=function(i){let f="data-ix-scrollin-toggle-actions",h="data-ix-scrollin-scrub",p="data-ix-scrollin-start",u="data-ix-scrollin-end",s={scrub:!1,toggleActions:"play none none none",start:"top 90%",end:"top 75%"};return s.toggleActions=g(s.toggleActions,i.getAttribute(f)),s.scrub=g(s.scrub,i.getAttribute(h)),s.start=g(s.start,i.getAttribute(p)),s.end=g(s.end,i.getAttribute(u)),gsap.timeline({defaults:{duration:.6,ease:"power1.out"},scrollTrigger:{trigger:i,start:s.start,end:s.end,toggleActions:s.toggleActions,scrub:s.scrub}})},r=function(i){let f="scrollin",h='[data-ix-scrollin="heading"]';gsap.utils.toArray(h).forEach(u=>{if(x(u,f,i)===!1)return;let d=runSplit(u);if(!d)return;u.style.opacity=1,e(u).fromTo(d.words,{opacity:0,y:"2rem",skewX:-25},{opacity:1,y:"0rem",skewX:0,stagger:{each:.2,from:"start"},onComplete:()=>{d.revert()}})})},n=function(i){let f="scrollin",h='[data-ix-scrollin="item"]';gsap.utils.toArray(h).forEach(u=>{if(!u||x(u,f,i)===!1)return;u.style.opacity=1,e(u).fromTo(u,{opacity:0,y:"2rem"},{opacity:1,y:"0rem"})})},o=function(i){let f="scrollin",h='[data-ix-scrollin="image-wrap"]',p='[data-ix-scrollin="image"]',u="data-ix-scrollin-type";gsap.utils.toArray(h).forEach(d=>{if(!d||!d.querySelector(p)||x(item,f,i)===!1)return;e(d).fromTo(d,{opacity:0,y:"2rem"},{opacity:1,y:"0rem"})})},a=function(i){let f="scrollin",h='[data-ix-scrollin="line"]',p="data-ix-scrollin-direction";gsap.utils.toArray(h).forEach(s=>{if(!s||x(s,f,i)===!1)return;let y=g("left",s.getAttribute(p)),A="polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";y==="right"&&(A="polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"),y==="top"&&(A="polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"),y==="bottom"&&(A="polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)");let C="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";e(s).fromTo(s,{clipPath:A},{clipPath:C})})},c=function(i){let f="scrollin",h='[data-ix-scrollin="container"]';gsap.utils.toArray(h).forEach(u=>{if(!u||x(u,f,i)===!1)return;let d=gsap.utils.toArray(u.children);d.length!==0&&d.forEach(y=>{e(y).fromTo(y,{opacity:0,y:"2rem"},{opacity:1,y:"0rem"})})})},l=function(i){let f="scrollin",h='[data-ix-scrollin="stagger"]';gsap.utils.toArray(h).forEach(u=>{if(x(u,f,i)===!1)return;let d=gsap.utils.toArray(u.children);if(d.length===0)return;e(u).fromTo(d,{opacity:0,y:"2rem"},{opacity:1,y:"0rem",stagger:{each:.1,from:"start"}})})};r(),n(),o(),c(),l(),a()};var It=function(t){let e="scrolling",r='[data-ix-scrolling="wrap"]',n='[data-ix-scrolling="trigger"]',o='[data-ix-scrolling="layer"]',a="data-ix-scrolling-start",c="data-ix-scrolling-end",l="data-ix-scrolling-scrub",i="data-ix-scrolling-position",f="data-ix-scrolling-x-start",h="data-ix-scrolling-x-end",p="data-ix-scrolling-y-start",u="data-ix-scrolling-y-end",s="data-ix-scrolling-width-start",d="data-ix-scrolling-width-end",y="data-ix-scrolling-height-start",A="data-ix-scrolling-height-end",C="data-ix-scrolling-rotate-z-start",G="data-ix-scrolling-rotate-z-end",W="data-ix-scrolling-opacity-start",S="data-ix-scrolling-opacity-end",b="data-ix-scrolling-clip-start",m="data-ix-scrolling-clip-end",O="data-ix-scrolling-clip-end";gsap.utils.toArray(r).forEach(v=>{let T=v.querySelectorAll(o);if(!v||T.length===0)return;let R=v.querySelector(n);if(R||(R=v),x(v,e,t)===!1)return;let I={scrub:.5,start:"top bottom",end:"bottom top"};I.start=g(I.start,v.getAttribute(a)),I.end=g(I.end,v.getAttribute(c)),I.scrub=g(I.scrub,v.getAttribute(l));let q=gsap.timeline({scrollTrigger:{trigger:R,start:I.start,end:I.end,scrub:I.scrub,markers:!1},defaults:{duration:1,ease:"none"}});T.forEach(H=>{if(!H)return;let P={},k={},_=function(rt,Nt){let Rt=H.hasAttribute(rt),Pt=g(Nt,H.getAttribute(rt));if(Rt)return Pt};P.x=_(f,"0%"),k.x=_(h,"0%"),P.y=_(p,"0%"),k.y=_(u,"0%"),P.width=_(s,"0%"),k.width=_(d,"0%"),P.height=_(y,"0%"),k.height=_(A,"0%"),P.rotateZ=_(C,0),k.rotateZ=_(G,0),P.opacity=_(W,0),k.opacity=_(S,0),P.clipPath=_(b,"string"),k.clipPath=_(m,"string");let wt=g("<",H.getAttribute(i)),de=q.fromTo(H,P,k,wt)})})};document.addEventListener("DOMContentLoaded",function(){console.log("Local Script Loaded"),gsap.ScrollTrigger!==void 0&&gsap.registerPlugin(ScrollTrigger),gsap.Flip!==void 0&&gsap.registerPlugin(Flip);let t=function(){let n='[data-ix-mission="wrap"]',o='[data-ix-mission="text"]',a='[data-ix-mission="span"]',c="is-active",l=document.querySelector(n),i=document.querySelector(o),f=document.querySelector(a);if(!l||!i||!f)return;let h=Tt(i);if(!h)return;gsap.timeline({defaults:{duration:.6,ease:"power1.out"},scrollTrigger:{trigger:l,start:"top 80%",end:"bottom 80%",scrub:1}}).fromTo(h.words,{opacity:.2},{opacity:1,stagger:{each:.2,from:"start"},onComplete:()=>{f.classList.add(c)}})};(function(){gsap.matchMedia().add({isMobile:"(max-width: 767px)",isTablet:"(min-width: 768px)  and (max-width: 991px)",isDesktop:"(min-width: 992px)",reduceMotion:"(prefers-reduced-motion: reduce)"},o=>{let{isMobile:a,isTablet:c,isDesktop:l,reduceMotion:i}=o.conditions;Lt(o),xt(o),_t(o),Ct(o),It(o)})})(),document.querySelectorAll("[data-ix-reset]").forEach(function(n){n.addEventListener("click",function(o){ScrollTrigger.refresh()})})});})();
