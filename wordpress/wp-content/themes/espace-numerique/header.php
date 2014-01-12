<?php

/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 */

?>

<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Site de l'association multimédia de Sciences Po, Espace Numérique !">
	<title><?php wp_title( '|', true, 'right' ); ?> Espace Numérique Sciences Po</title>

	<!-- Le styles -->
    <link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap-theme.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/style.css" rel= "stylesheet">

  	<!-- Le fav and touch icons -->
    <!--<link rel="shortcut icon" href="<?php bloginfo( 'template_url' );?>/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php bloginfo( 'template_url' );?>/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php bloginfo( 'template_url' );?>/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php bloginfo( 'template_url' );?>/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="<?php bloginfo( 'template_url' );?>/ico/apple-touch-icon-57-precomposed.png">-->

  <!--[if lt IE 9]>
	<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
  <!--[if gte IE 9]>
  <style type="text/css">
    .gradient {
       filter: none;
    }
  </style>
<![endif]-->  

	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	
	<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

	<div class="page-wrapper">

		<div class="main">

			<div class="header">

        <div class="topbar gradient container-width">

          <div class="row">

            <div class="col-md-5">
              <a href="<?php echo home_url( '/' ); ?>" title="Accueil du site">
                <img src="<?php bloginfo( 'template_url' );?>/img/logo.png" class="d4l0g0 img-responsive" alt="Espace Numérique Sciences Po" />
              </a>
            </div>

            <div class="col-xs-7">
              <div class="social-icons">
              </div>
            </div>

          </div><!--/row-->

        </div><!--topbar-->

				<nav class="navbar navbar-espacenum" role="navigation">

					<div class="container-width"><!--1-->

        				<div class="navbar-header">
          					<button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle" type="button">
            					<span class="icon-bar"></span>
            					<span class="icon-bar"></span>
            					<span class="icon-bar"></span>
          					</button>
                  <ul class="nav navbar-nav">
                    <li class="navbar-menu col-xs-8 col-sm-12"><a href="<?php echo home_url( '/' ); ?>" title="Accueil du site">Accueil</a></li>
                  </ul>
        				</div>
                
        				<div class="navbar-collapse collapse">
                      <?php wp_nav_menu( array( 'theme_location' => 'navmenu', 'container' => false, 'items_wrap' => '<ul id="%1$s" class="%2$s nav navbar-nav">%3$s</ul>', 'walker' => new li_walker() ) ); ?>
                    <form method="get" id="searchform" class="navbar-form navbar-right form-search" role="search" action="<?php bloginfo('home'); ?>/">
                        <div class="input-group">
                          <div class="input-group-btn">
                            <button class="btn btn-search btn-s" type="submit"><i class="glyphicon glyphicon-search glyphicon-red"></i></button>
                          </div><input type="text" class="search-box" placeholder="Rechercher" value="<?php echo wp_specialchars($s, 1); ?>" name="s" id="s" />
                        
                        </div>
                    </form>
     					
        				</div><!--/.nav-collapse -->
      				
      				</div><!-- container 1-->

				</nav><!--navbar-->

			</div><!--header-->