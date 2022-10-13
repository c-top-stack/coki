/*!
  jQuery Wookmark plugin
  @name jquery.wookmark.js
  @author Christoph Ono (chri@sto.ph or @gbks)
  @author Sebastian Helzle (sebastian@helzle.net or @sebobo)
  @version 1.4.5
  @date 11/22/2013
  @category jQuery plugin
  @copyright (c) 2009-2013 Christoph Ono (www.wookmark.com)
  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(g){var a,c,d;d=function(h,i){return function(){return h.apply(i,arguments)}};c={align:"center",autoResize:false,comparator:null,container:g("body"),ignoreInactiveItems:true,itemWidth:0,fillEmptySpace:false,flexibleWidth:0,direction:undefined,offset:2,onLayoutChanged:undefined,outerOffset:0,resizeDelay:50,possibleFilters:[]};var f=window.requestAnimationFrame||function(h){h()};function b(h){f(function(){var j,k;for(j=0;j<h.length;j++){k=h[j];k.obj.css(k.css)}})}function e(h){return g.trim(h).toLowerCase()}a=(function(){function h(j,i){this.handler=j;this.columns=this.containerWidth=this.resizeTimer=null;this.activeItemCount=0;this.itemHeightsDirty=true;this.placeholders=[];g.extend(true,this,c,i);this.update=d(this.update,this);this.onResize=d(this.onResize,this);this.onRefresh=d(this.onRefresh,this);this.getItemWidth=d(this.getItemWidth,this);this.layout=d(this.layout,this);this.layoutFull=d(this.layoutFull,this);this.layoutColumns=d(this.layoutColumns,this);this.filter=d(this.filter,this);this.clear=d(this.clear,this);this.getActiveItems=d(this.getActiveItems,this);this.refreshPlaceholders=d(this.refreshPlaceholders,this);this.sortElements=d(this.sortElements,this);this.updateFilterClasses=d(this.updateFilterClasses,this);this.updateFilterClasses();if(this.autoResize){g(window).bind("resize.wookmark",this.onResize)}this.container.bind("refreshWookmark",this.onRefresh)}h.prototype.updateFilterClasses=function(){var o=0,n=0,m=0,p={},r,s,l,t=this.possibleFilters,q;for(;o<this.handler.length;o++){s=this.handler.eq(o);r=s.data("filterClass");if(typeof r=="object"&&r.length>0){for(n=0;n<r.length;n++){l=e(r[n]);if(!p[l]){p[l]=[]}p[l].push(s[0])}}}for(;m<t.length;m++){q=e(t[m]);if(!(q in p)){p[q]=[]}}this.filterClasses=p};h.prototype.update=function(i){this.itemHeightsDirty=true;g.extend(true,this,i)};h.prototype.onResize=function(){clearTimeout(this.resizeTimer);this.itemHeightsDirty=this.flexibleWidth!==0;this.resizeTimer=setTimeout(this.layout,this.resizeDelay)};h.prototype.onRefresh=function(){this.itemHeightsDirty=true;this.layout()};h.prototype.filter=function(o,w){var p=[],y,l=g(),u,s,r,n;o=o||[];w=w||"or";if(o.length){for(u=0;u<o.length;u++){n=e(o[u]);if(n in this.filterClasses){p.push(this.filterClasses[n])}}y=p.length;if(w=="or"||y==1){for(u=0;u<y;u++){l=l.add(p[u])}}else{if(w=="and"){var q=p[0],v=true,m,x,t;for(u=1;u<y;u++){if(p[u].length<q.length){q=p[u]}}q=q||[];for(u=0;u<q.length;u++){x=q[u];v=true;for(s=0;s<p.length&&v;s++){t=p[s];if(q==t){continue}for(r=0,m=false;r<t.length&&!m;r++){m=t[r]==x}v&=m}if(v){l.push(q[u])}}}}this.handler.not(l).addClass("inactive")}else{l=this.handler}l.removeClass("inactive");this.columns=null;this.layout()};h.prototype.refreshPlaceholders=function(k,l){var n=this.placeholders.length,p,s,j=this.columns.length,m,r,q,o,t=this.container.innerHeight();for(;n<j;n++){p=g('<div class="wookmark-placeholder"/>').appendTo(this.container);this.placeholders.push(p)}o=this.offset+parseInt(this.placeholders[0].css("borderLeftWidth"),10)*2;for(n=0;n<this.placeholders.length;n++){p=this.placeholders[n];m=this.columns[n];if(n>=j||!m[m.length-1]){p.css("display","none")}else{s=m[m.length-1];if(!s){continue}q=s.data("wookmark-top")+s.data("wookmark-height")+this.offset;r=t-q-o;p.css({position:"absolute",display:r>0?"block":"none",left:n*k+l,top:q,width:k-o,height:r})}}};h.prototype.getActiveItems=function(){return this.ignoreInactiveItems?this.handler.not(".inactive"):this.handler};h.prototype.getItemWidth=function(){var n=this.itemWidth,i=this.container.width()-2*this.outerOffset,l=this.handler.eq(0),j=this.flexibleWidth;if(this.itemWidth===undefined||this.itemWidth===0&&!this.flexibleWidth){n=l.outerWidth()}else{if(typeof this.itemWidth=="string"&&this.itemWidth.indexOf("%")>=0){n=parseFloat(this.itemWidth)/100*i}}if(j){if(typeof j=="string"&&j.indexOf("%")>=0){j=parseFloat(j)/100*i}var k=~~(0.5+(i+this.offset)/(j+this.offset)),m=Math.min(j,~~((i-(k-1)*this.offset)/k));n=Math.max(n,m);this.handler.css("width",n)}return n};h.prototype.layout=function(k){if(!this.container.is(":visible")){return}var l=this.getItemWidth()+this.offset,r=this.container.width(),q=r-2*this.outerOffset,m=~~((q+this.offset)/l),n=0,t=0,o=0,j=this.getActiveItems(),p=j.length,s;if(this.itemHeightsDirty||!this.container.data("itemHeightsInitialized")){for(;o<p;o++){s=j.eq(o);s.data("wookmark-height",s.outerHeight())}this.itemHeightsDirty=false;this.container.data("itemHeightsInitialized",true)}m=Math.max(1,Math.min(m,p));n=this.outerOffset;if(this.align=="center"){n+=~~(0.5+(q-(m*l-this.offset))>>1)}this.direction=this.direction||(this.align=="right"?"right":"left");if(!k&&this.columns!==null&&this.columns.length==m&&this.activeItemCount==p){t=this.layoutColumns(l,n)}else{t=this.layoutFull(l,m,n)}this.activeItemCount=p;this.container.css("height",t);if(this.fillEmptySpace){this.refreshPlaceholders(l,n)}if(this.onLayoutChanged!==undefined&&typeof this.onLayoutChanged==="function"){this.onLayoutChanged()}};h.prototype.sortElements=function(i){return typeof(this.comparator)==="function"?i.sort(this.comparator):i};h.prototype.layoutFull=function(n,p,r){var x,s=0,q=0,j=g.makeArray(this.getActiveItems()),o=j.length,u=null,l=null,m,w=[],v=[],t=this.align=="left"?true:false;this.columns=[];j=this.sortElements(j);while(w.length<p){w.push(this.outerOffset);this.columns.push([])}for(;s<o;s++){x=g(j[s]);u=w[0];l=0;for(q=0;q<p;q++){if(w[q]<u){u=w[q];l=q}}x.data("wookmark-top",u);m=r;if(l>0||!t){m+=l*n}(v[s]={obj:x,css:{position:"absolute",top:u}}).css[this.direction]=m;w[l]+=x.data("wookmark-height")+this.offset;this.columns[l].push(x)}b(v);return Math.max.apply(Math,w)};h.prototype.layoutColumns=function(m,r){var u=[],v=[],t=0,q=0,s=0,n,o,w,p,l;for(;t<this.columns.length;t++){u.push(this.outerOffset);o=this.columns[t];l=t*m+r;n=u[t];for(q=0;q<o.length;q++,s++){w=o[q].data("wookmark-top",n);(v[s]={obj:w,css:{top:n}}).css[this.direction]=l;n+=w.data("wookmark-height")+this.offset}u[t]=n}b(v);return Math.max.apply(Math,u)};h.prototype.clear=function(){clearTimeout(this.resizeTimer);g(window).unbind("resize.wookmark",this.onResize);this.container.unbind("refreshWookmark",this.onRefresh);this.handler.wookmarkInstance=null};return h})();g.fn.wookmark=function(h){if(!this.wookmarkInstance){this.wookmarkInstance=new a(this,h||{})}else{this.wookmarkInstance.update(h||{})}this.wookmarkInstance.layout(true);return this.show()}}));jQuery(document).ready(function(a){a(".pinterest-container").each(function(){var d=a(this);var e=d.data("id");var i=d.data("itemwidth");var g=d.data("minwidth");var f=a(this).find("li").css("width",i);var c=d.data("onclick");var b=d.data("imagesload")=="on"?true:false;f.find("img").css("width",i);d.find("li").each(function(j){if(a(this).find("p")[0]){a(this).css("background",d.data("background"))}});d.find("p").css("color",d.data("color"));function h(){f.wookmark({itemWidth:i,autoResize:true,container:f.parent(),resizeDelay:0,offset:d.data("offset"),outerOffset:d.data("outerOffset"),fillEmptySpace:true,onLayoutChanged:function(){if(c=="link_image"){this.handler.each(function(k){a(this).find("a.lightbox-link").removeAttr("rel");try{a.boxer("destroy");a(this).find("a.lightbox-link").boxer("destroy")}catch(j){}if(!a(this).hasClass("inactive")){a(this).find("a.lightbox-link").attr("rel","gallery-"+e)}a(this).find("a.lightbox-link").boxer({minWidth:g,fixed:true})})}}})}if(!b){a(this).imagesLoaded(function(){h()})}else{h()}})});