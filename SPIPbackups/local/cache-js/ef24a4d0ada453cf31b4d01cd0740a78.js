/* compact [
	plugins/auto/notation-2/javascript/jquery.MetaData.js
	plugins/auto/notation-2/javascript/jquery.rating.js
	plugins/auto/notation-2/javascript/notation.js
] 42.2% */

/* plugins/auto/notation-2/javascript/jquery.MetaData.js */

(function($){
$.extend({
metadata:{
defaults:{
type:'class',
name:'metadata',
cre:/({.*})/,
single:'metadata'
},
setType:function(type,name){
this.defaults.type=type;
this.defaults.name=name;
},
get:function(elem,opts){
var settings=$.extend({},this.defaults,opts);
if(!settings.single.length)settings.single='metadata';
var data=$.data(elem,settings.single);
if(data)return data;
data="{}";
if(settings.type=="class"){
var m=settings.cre.exec(elem.className);
if(m)
data=m[1];
}else if(settings.type=="elem"){
if(!elem.getElementsByTagName)return;
var e=elem.getElementsByTagName(settings.name);
if(e.length)
data=$.trim(e[0].innerHTML);
}else if(elem.getAttribute!=undefined){
var attr=elem.getAttribute(settings.name);
if(attr)
data=attr;
}
if(data.indexOf('{')<0)
data="{"+data+"}";
data=eval("("+data+")");
$.data(elem,settings.single,data);
return data;
}
}
});
$.fn.metadata=function(opts){
return $.metadata.get(this[0],opts);
};
})(jQuery);


/* plugins/auto/notation-2/javascript/jquery.rating.js */

;if(window.jQuery)(function($){
if($.browser.msie)try{document.execCommand("BackgroundImageCache",false,true)}catch(e){};
$.fn.rating=function(options){
if(this.length==0)return this;
if(typeof arguments[0]=='string'){
if(this.length>1){
var args=arguments;
return this.each(function(){
$.fn.rating.apply($(this),args);
});
};
$.fn.rating[arguments[0]].apply(this,$.makeArray(arguments).slice(1)||[]);
return this;
};
var options=$.extend(
{},
$.fn.rating.options,
options||{}
);
$.fn.rating.calls++;
this
.not('.star-rating-applied')
.addClass('star-rating-applied')
.each(function(){
var control,input=$(this);
var eid=(this.name||'unnamed-rating').replace(/\[|\]/g,'_').replace(/^\_+|\_+$/g,'');
var context=$(this.form||document.body);
var raters=context.data('rating');
if(!raters||raters.call!=$.fn.rating.calls)raters={count:0,call:$.fn.rating.calls};
var rater=raters[eid];
if(rater)control=rater.data('rating');
if(rater&&control)
control.count++;
else{
control=$.extend(
{},
options||{},
($.metadata?input.metadata():($.meta?input.data():null))||{},
{count:0,stars:[],inputs:[]}
);
control.serial=raters.count++;
rater=$('<span class="star-rating-control"/>');
input.before(rater);
rater.addClass('rating-to-be-drawn');
if(input.attr('disabled'))control.readOnly=true;
rater.append(
control.cancel=$('<div class="rating-cancel"><a title="'+control.cancel+'">'+control.cancelValue+'</a></div>')
.mouseover(function(){
$(this).rating('drain');
$(this).addClass('star-rating-hover');
})
.mouseout(function(){
$(this).rating('draw');
$(this).removeClass('star-rating-hover');
})
.click(function(){
$(this).rating('select');
})
.data('rating',control)
);
};
var star=$('<div class="star-rating rater-'+control.serial+'"><a title="'+(this.title||this.value)+'">'+this.value+'</a></div>');
rater.append(star);
if(this.id)star.attr('id',this.id);
if(this.className)star.addClass(this.className);
if(control.half)control.split=2;
if(typeof control.split=='number'&&control.split>0){
var stw=($.fn.width?star.width():0)||control.starWidth;
var spi=(control.count%control.split),spw=Math.floor(stw/control.split);
star
.width(spw)
.find('a').css({'margin-left':'-'+(spi*spw)+'px'})
};
if(control.readOnly)
star.addClass('star-rating-readonly');
else
star.addClass('star-rating-live')
.mouseover(function(){
$(this).rating('fill');
$(this).rating('focus');
})
.mouseout(function(){
$(this).rating('draw');
$(this).rating('blur');
})
.click(function(){
$(this).rating('select');
})
;
if(this.checked)control.current=star;
input.hide();
input.change(function(){
$(this).rating('select');
});
star.data('rating.input',input.data('rating.star',star));
control.stars[control.stars.length]=star[0];
control.inputs[control.inputs.length]=input[0];
control.rater=raters[eid]=rater;
control.context=context;
input.data('rating',control);
rater.data('rating',control);
star.data('rating',control);
context.data('rating',raters);
});
$('.rating-to-be-drawn').rating('draw').removeClass('rating-to-be-drawn');
return this;
};
$.extend($.fn.rating,{
calls:0,
focus:function(){
var control=this.data('rating');if(!control)return this;
if(!control.focus)return this;
var input=$(this).data('rating.input')||$(this.tagName=='INPUT'?this:null);
if(control.focus)control.focus.apply(input[0],[input.val(),$('a',input.data('rating.star'))[0]]);
},
blur:function(){
var control=this.data('rating');if(!control)return this;
if(!control.blur)return this;
var input=$(this).data('rating.input')||$(this.tagName=='INPUT'?this:null);
if(control.blur)control.blur.apply(input[0],[input.val(),$('a',input.data('rating.star'))[0]]);
},
fill:function(){
var control=this.data('rating');if(!control)return this;
if(control.readOnly)return;
this.rating('drain');
this.prevAll().andSelf().filter('.rater-'+control.serial).addClass('star-rating-hover');
},
drain:function(){
var control=this.data('rating');if(!control)return this;
if(control.readOnly)return;
control.rater.children().filter('.rater-'+control.serial).removeClass('star-rating-on').removeClass('star-rating-hover');
},
draw:function(){
var control=this.data('rating');if(!control)return this;
this.rating('drain');
if(control.current){
control.current.data('rating.input').attr('checked','checked');
control.current.prevAll().andSelf().filter('.rater-'+control.serial).addClass('star-rating-on');
}
else
$(control.inputs).removeAttr('checked');
control.cancel[control.readOnly||control.required?'hide':'show']();
this.siblings()[control.readOnly?'addClass':'removeClass']('star-rating-readonly');
},
select:function(value){
var control=this.data('rating');if(!control)return this;
if(control.readOnly)return;
control.current=null;
if(typeof value!='undefined'){
if(typeof value=='number')
return $(control.stars[value]).rating('select');
if(typeof value=='string')
$.each(control.stars,function(){
if($(this).data('rating.input').val()==value)$(this).rating('select');
});
}
else
control.current=this[0].tagName=='INPUT'?
this.data('rating.star'):
(this.is('.rater-'+control.serial)?this:null);
this.data('rating',control);
this.rating('draw');
var input=$(control.current?control.current.data('rating.input'):null);
if(control.callback)control.callback.apply(input[0],[input.val(),$('a',control.current)[0]]);
},
readOnly:function(toggle,disable){
var control=this.data('rating');if(!control)return this;
control.readOnly=toggle||toggle==undefined?true:false;
if(disable)$(control.inputs).attr("disabled","disabled");
else $(control.inputs).removeAttr("disabled");
this.data('rating',control);
this.rating('draw');
},
disable:function(){
this.rating('readOnly',true,true);
},
enable:function(){
this.rating('readOnly',false,false);
}
});
$.fn.rating.options={
cancel:'Cancel Rating',
cancelValue:'',
split:0,
starWidth:16
};
$(function(){
$('input[type=radio].star').rating();
});
})(jQuery);


/* plugins/auto/notation-2/javascript/notation.js */

function notation_init(){jQuery(function(){
jQuery('.formulaire_notation .access').hide();
jQuery(function(){jQuery('input[type=radio].star').rating();});
jQuery('.auto-submit-star').rating({
required:true,
callback:function(value,link){
jQuery(this.form).submit();
}});
});
jQuery('.star-rating-control').append('<span style="clear:both">&nbsp;</span>');}
jQuery(function(){notation_init.apply(document);onAjaxLoad(notation_init);});


