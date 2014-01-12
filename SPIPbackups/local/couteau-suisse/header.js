var cs_prive=window.location.pathname.match(/\/ecrire\/$/)!=null;
jQuery.fn.cs_todo=function(){return this.not('.cs_done').addClass('cs_done');};
 var cs_verif_email = 1;
var cs_verif_nom = 1;
var cs_verif_deux = 0;
// variable modifiable afin d'initialiser l'ouverture d'un onglet
if(typeof(onglet_actif)=='undefined'){
  var onglet_actif = '';
}

// fonction pour montrer un contenu
jQuery.fn.montre_onglet = function( selector ) {
	// click sur un titre
	if(this.is('.onglets_titre')) {
		var contenu = '#' + this[0].id.replace(/titre/,'contenu');
		var bloc = this.parent().parent();
		bloc.children('.selected').removeClass('selected').end()
			.children('.onglets_liste').children('.selected').removeClass('selected');
		jQuery(contenu).addClass('selected');
		this.addClass('selected');
	}
	// click sur un titre
	if(this.is('.onglets_contenu')) {
		var titre = this[0].id.replace(/contenu/,'titre');
		jQuery('#'+titre).montre_onglet();
	}
	return this;
};

// compatibilite Ajax : ajouter "this" a "jQuery" pour mieux localiser les actions 
function onglets_init() {
  var cs_bloc = jQuery('div.onglets_bloc_initial', this);
  if(cs_bloc.length) {
	cs_bloc.prepend('<div class="onglets_liste"></div>')
		.children('.onglets_contenu').each(function(i) {
			this.id = 'onglets_contenu_' + i;
			jQuery(this).parent().children('.onglets_liste').append(
				'<h2 id="'+'onglets_titre_' + i + '" class="onglets_titre">' + this.firstChild.innerHTML + '</h2>'
			);
		})
		.children('h2').remove();
	jQuery('div.onglets_liste', this).each(function() {
		this.firstChild.className += ' selected';
		this.nextSibling.className += ' selected';
	});
	jQuery('h2.onglets_titre', this).hover(
		function(){
			jQuery(this).addClass('hover')
		},function(){
			jQuery(this).removeClass('hover')
		}
	);
	jQuery('div.onglets_bloc_initial', this)
		.attr('class','onglets_bloc').each(function(i) {this.id = 'ongl_'+i;});
	// clic du titre...
	jQuery('h2.onglets_titre', this).click(function(e) {
		jQuery(this).montre_onglet();
		return false;
	});
	// clic des <a>, au cas ou...
	jQuery('h2.onglets_titre a', this).click(function(e){
		jQuery(this).parents('h2').click();
		if (e.stopPropagation) e.stopPropagation();
		e.cancelBubble = true;
		return false;
	});
	// activation d'onglet(s) grace a l'url
	var onglet_get = get_onglet(window.location);
	if(onglet_get && (this==document)) clic_onglet(onglet_get)
	// clic vers une note dans un onglet
	jQuery('.spip_note['+cs_sel_jQuery+'name^=nb], .spip_note['+cs_sel_jQuery+'id^=nb]').each(function(i) {
		jQuery(this).click(function(e){
			var href = this.href.substring(this.href.lastIndexOf("#"));
			jQuery(href).parents('.onglets_contenu').eq(0).montre_onglet();
			return true;
		});
	});
  }
}

function clic_onglet(liste) {
	var onglets = liste.split(',');
	for (var i=0; i<onglets.length; i++)
		jQuery('#onglets_titre_'+onglets[i]).click();
}

function get_onglet(url) {
 tab = url.search.match(/[?&]onglet=([0-9,]*)/) || url.hash.match(/#onglet([0-9,]*)/);
 if(tab==null) return onglet_actif;
 return tab[1];
}

var sommaire_sel = 'div.cs_sommaire_titre_avec_fond, div.cs_sommaire_titre_sans_fond';

// compatibilite Ajax : ajouter "this" a "jQuery" pour mieux localiser les actions 
// et tagger avec cs_done pour eviter de binder plrs fois le meme bloc
function cs_sommaire_init() {
	jQuery(sommaire_sel, this)
		.cs_todo()
		.click( function(){
			jQuery(this).toggleClass('cs_sommaire_replie')
				.next().toggleClass('cs_sommaire_invisible')
			// annulation du clic
			return false;
		});
}

// Sauve l'etat du 1er sommaire de la page dans un cookie si on quitte la page, et le remet quand on revient
// pour SPIP < 2.0, il faut le plugin jquery.cookie.js
function cs_sommaire_cookie() {
	if(typeof jQuery.cookie!='function') return;
	var replie = jQuery.cookie('cs_sommaire');
	jQuery.cookie('cs_sommaire', null);
	if (Number(replie))
		jQuery(sommaire_sel).eq(0).addClass('cs_sommaire_replie')
			.next().toggleClass('cs_sommaire_invisible');
	jQuery(window).bind('unload', function() {
		jQuery.cookie('cs_sommaire',
			Number(jQuery(sommaire_sel).eq(0).is('.cs_sommaire_replie'))
		);
	});
}

 function soft_scroller_init() { if(typeof jQuery.localScroll=="function")
	jQuery.localScroll({hash: true, onAfter:function(anchor,settings){jQuery(anchor).focus();}});
}
// fonction surchargeable : gestion du slide jQuery
jQuery.fn.blocs_toggle_slide_dist = function( selector ) {
	this.toggleClass('blocs_slide');
	if(typeof jQuery.fn.blocs_toggle_slide=='function')
		return this.blocs_toggle_slide();
	return this.is(".blocs_slide")?this.slideUp(blocs_slide):this.slideDown(blocs_slide);
};

jQuery.fn.blocs_set_title = function( selector ) {
	var title = this.parent().find('.blocs_title:last').text();
	if(!title) title = blocs_title_def;
	title = title.split(blocs_title_sep);
	this.children('a').attr('title', title[jQuery(this).is('.blocs_replie')?0:1]);
	return this;
};

// fonction de de/re-pliement
jQuery.fn.blocs_toggle = function() {
	if (!this.length) return this;
	// applique-t-on la fonction sur cs_blocs ou sur blocs_titre ?
	var cible = this.is('.cs_blocs')? this.children('.blocs_titre').eq(0) : this;
	// on replie/deplie la cible...
	cible.toggleClass('blocs_replie').blocs_set_title();
	var dest = this[0].id.match('^cs_bloc_id_')?jQuery('div.'+this[0].id):cible.next();
	if(blocs_slide==='aucun') {
		dest.toggleClass('blocs_invisible');
		// est-on sur un resume ?
		if (dest.is('div.blocs_resume')) dest.next().toggleClass('blocs_invisible');
	} else {
		dest.blocs_toggle_slide_dist();
		// est-on sur un resume ?
		if (dest.is('div.blocs_resume')) dest.next().blocs_toggle_slide_dist();
	}
	// est-on sur un bloc ajax ?
	var lien = cible.children();
	var url = lien.attr("href");
	if(url != 'javascript:;') {
		// une fois le bloc ajax en place, plus besoin de le recharger ensuite
		lien.attr("href", 'javascript:;');
		// ici, on charge !
		cible.parent().children(".blocs_destination")
		//.animeajax()
		.load(url);
	}
	return this;
};

// replie tout sauf le bloc appelant et sa lignee parentale
jQuery.fn.blocs_replie_tout = function() {
	if(blocs_replier_tout) {
		// applique-t-on la fonction sur cs_blocs ou sur blocs_titre ?
		var cible = this.is('.cs_blocs')? this : this.parents('div.cs_blocs');
		// lignee du bloc
		var lignee = cible.children('.blocs_titre');
		jQuery('.blocs_titre').not('.blocs_replie').not(lignee).blocs_toggle();
	}
	return this;
}

// une variable globale stockant le(s) bloc(s) a deplier si un clic ajax a eu lieu
var blocs_clic_ajax = null;

// compatibilite Ajax : ajouter "this" a "jQuery" pour mieux localiser les actions 
// et tagger avec cs_done pour eviter de binder plrs fois le meme bloc
function blocs_init() {
	// clic sur un titre de bloc
	jQuery('.blocs_titre', this).cs_todo()
	  .click( function(){
		jQuery(this).blocs_replie_tout().blocs_toggle();
		// annulation du clic
		return false;
	   })
	  .each( function(){
		jQuery(this).blocs_set_title();
	  });
	// pour un lien 'replier_bloc' present dans le bloc
	jQuery('.blocs_destination a.replier_bloc', this).cs_todo()
	 .click( function(){
		s = jQuery(this).parents('.cs_blocs:first');
		// scroll vers le debut du bloc, si le plugin 'SrollTo' est present
		if(typeof jQuery.fn.scrollTo=="function") jQuery('body').scrollTo(s, 500, 
			{margin:true, /*axis:'y',*/ onAfter:function(){s.blocs_replie_tout().blocs_toggle();}});
		else s.blocs_replie_tout().blocs_toggle();
		// annulation du clic
		return false;
	   });
	// clic vers une note dans un bloc
	jQuery('.spip_note['+cs_sel_jQuery+'name^=nb], .spip_note['+cs_sel_jQuery+'id^=nb]').each(function(i) {
		jQuery(this).click(function(e){
			var href = this.href.substring(this.href.lastIndexOf("#"));
			href = jQuery(href).parents('.cs_blocs').eq(0).children('.blocs_titre').eq(0);
			// on neutralise une eventuelle animation
			old_blocs_slide = blocs_slide;
			if(blocs_slide!='aucun') blocs_slide = -1;
			if(href.is('.blocs_replie')) href.click();
			blocs_slide = old_blocs_slide;
			return true;
		});
	});

/*
// LA SUITE DE CE CODE NE FONCTIONNE POUR L'INSTANT QUE SUR LE PREMIER CLIC, JE NE SAIS PAS ENCORE PKOI...
	// stockage du bloc (numerote !) a reouvrir dans le cas d'un clic ajax sur une 
	// pagination SPIP contenue a l'interieur
	jQuery(".ajaxbloc .pagination a.noajax", this).cs_todo()
	  .click( function(){
		var parent = jQuery(this).parents('.cs_blocs');
		if(!parent.length) return true;
		var numero = /cs_bloc\d+/.exec(parent[0].className);
		if(numero!==null) blocs_clic_ajax = numero[0];
		return true;
	   });
	// rouvre le nouveau bloc ajax si un clic a eu lieu a l'interieur de l'ancien
	if(blocs_clic_ajax!==null) {
		jQuery('.'+blocs_clic_ajax, this).blocs_toggle();
		blocs_clic_ajax = null
	}
*/
}

// un JS actif replie les blocs invisibles
document.write('<style type="text/css">div.blocs_invisible{display:none;}</style>');

// Sauve l'etat des blocs numerotes dans un cookie si on quitte la page
function cs_blocs_cookie() {
	if(typeof jQuery.cookie!='function') return;
	var blocs_cookie_name = 'blocs' + window.location.pathname + window.location.search
	blocs_cookie_name = blocs_cookie_name.replace(/[ ;,=]/,'_');
	var deplies = jQuery.cookie(blocs_cookie_name);
	jQuery.cookie(blocs_cookie_name, null);
	if(deplies)
		jQuery(deplies).blocs_replie_tout().blocs_toggle();
	jQuery(window).bind('unload', function() {
		jQuery.cookie(blocs_cookie_name, blocs_deplies());
	});
}

// renvoie la liste des selecteurs de blocs ouverts
function blocs_deplies() {
	var deplies = '';
	jQuery('.cs_blocs').each(function() {
		var numero = /cs_bloc\d+/.exec(this.className);
		if(numero==null) return;
		replie = jQuery(this).children('.blocs_titre').eq(0).is('.blocs_replie');
		if(!replie) deplies += (deplies.length?', ':'') + 'div.' + numero[0];
	});
	return deplies.length?deplies:null;
}

// une fonction et une variable pour reperer une pagination
function blocs_get_pagination(url) {
	tab=url.match(/#pagination([0-9]+)/);
	if (tab==null) return false;
	return tab[1];
}

var blocs_pagination = blocs_get_pagination(window.location.hash);

/*
// Si un bloc contient une pagination inseree dans un bloc,
// code JS a inserer dans le header de votre squelette APRES les appels du Couteau Suisse :
jQuery(document).ready(function() {
	if(blocs_pagination!==false) {
		jQuery('div.cs_bloc' + blocs_pagination + ' .blocs_titre').eq(0).click();
		window.location.hash = '#pagination' + blocs_pagination;
	}
});
*/

/*
//	Pour un bloc depliable du genre :
//	<BOUCLE_art(ARTICLES)>
//		#BLOC_TITRE
//		#TITRE
//		#BLOC_RESUME
//		#INTRODUCTION
//		#BLOC_DEBUT
//		#TEXTE
//		#BLOC_FIN
//	</BOUCLE_art>
//	le clic sur un point de suite cliquable de la balise #INTRODUCTION produit l'ouverture du bloc.
//	code JS a inserer dans le header de votre squelette APRES les appels du Couteau Suisse :
jQuery(document).ready(function(){
	jQuery('.blocs_resume>a.pts_suite')
	  .click( function(){
		jQuery(this).parents('.cs_blocs:first').children('.blocs_titre')
			.blocs_replie_tout().blocs_toggle();
		// annulation du clic
		return false;
		});
});
*/
var blocs_replier_tout = 0;
var blocs_millisec = 100;
var blocs_slide = 'normal';
var blocs_title_sep = /\|\|/g;
var blocs_title_def = 'Déplier||Replier';

// compatibilite Ajax : ajouter "this" a "jQuery" pour mieux localiser les actions 
// et tagger avec cs_done pour eviter de binder plrs fois le meme bloc
function cs_auteur_forum() {
	// selecteur du bloc de previsualisation
	var sel = jQuery('fieldset.previsu', this);
	if(!sel.length) return;
//	alert('previsu OK');
	var form = sel.parents('form').eq(0);
	if(!form.length) return;
	// SPIP 2.0 remplace 'auteur' par 'session_nom'
	var auteur = jQuery('#session_nom', this);
	if(!auteur.length) auteur = jQuery('#auteur', this);
	// SPIP 2.0 remplace 'email_auteur' par 'session_email'
	var email = jQuery('#session_email', this);
	if(!email.length) email = jQuery('#email_auteur', this);
	if(auteur.length || email.length)
	// eviter les forums anonymes
	form.cs_todo().bind('submit', function(event){
		var alert_nom = auteur.length && !auteur.val().length;
		var alert_email = email.length && !email.val().length;
		var alert_deux = cs_verif_deux && alert_nom && alert_email;
		if(!cs_verif_deux) {
			alert_nom = alert_nom && cs_verif_nom;
			alert_email = alert_email && cs_verif_email;
		} else if(!alert_deux)
			alert_nom = alert_email = false;
		auteur.css('background-color','').css('border','');
		email.css('background-color','').css('border','');
		if(alert_email) {
			email.focus();
			email.css('background-color','#FCC').css('border','solid #C30');
		}
		if(alert_nom) {
			auteur.focus();
			auteur.css('background-color','#FCC').css('border','solid #C30');
		}
		if(alert_deux) {
			alert("Merci de spécifier votre nom ou votre email !");
			return false;
		}
		if(alert_nom) {
			alert("Merci de spécifier votre nom !");
			return false;
		}
		if(alert_email) {
			alert("Merci de spécifier votre email !");
			return false;
		}
		return true;
	});
}

var cs_init = function() {
	 cs_auteur_forum.apply(this);
	onglets_init.apply(this);
	cs_sommaire_init.apply(this);
	 soft_scroller_init.apply(this);
	blocs_init.apply(this);
}
if(typeof onAjaxLoad=='function') onAjaxLoad(cs_init);
if(window.jQuery) {
var cs_sel_jQuery=typeof jQuery(document).selector=='undefined'?'@':'';
var cs_CookiePlugin="prive/javascript/jquery.cookie.js";
jQuery(document).ready(function(){
	if(jQuery("div.cs_sommaire").length) {
		// s'il y a un sommaire, on cache la navigation haute sur les pages
		jQuery("div.decoupe_haut").css("display", "none");
		// utilisation des cookies pour conserver l'etat du sommaire si on quitte la page
		if(cs_CookiePlugin) jQuery.getScript(cs_CookiePlugin, cs_sommaire_cookie);
	}
	/* optimisation : 'IF(1)' */ if(jQuery("div.cs_blocs").length)
		jQuery.getScript(cs_CookiePlugin, cs_blocs_cookie); 
	cs_init.apply(document);
});
}