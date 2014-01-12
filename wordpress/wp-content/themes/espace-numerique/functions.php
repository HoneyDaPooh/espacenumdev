<?php
	
	add_action( 'init', 'register_my_menus' );

  add_theme_support('post-thumbnails');
  add_image_size('carousel-thumb', '', '179px', 'false');


	function register_my_menus() {
		register_nav_menus(
			array(
				'navmenu' => __( 'Navigation Menu' ),
				'menu-2' => __( 'Menu 2' )
			)
		);
	}



	/* Add class for Bootstrap grid sizing to LIs in menu */

	class li_walker extends Walker_Nav_Menu {
		function start_el(&$output, $item, $depth, $args)
      	{
           global $wp_query;
           $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

           $class_names = $value = '';

           $classes = empty( $item->classes ) ? array() : (array) $item->classes;

           $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
           $class_names = ' class="navbar-menu dot '. esc_attr( $class_names ) . '"';

           $output .= $indent . '<img src="wp-content/themes/espace-numerique/img/dot.png" class="navbar-nav hidden-xs" /><li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';

           $attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
           $attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
           $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
           $attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

           $description  = ! empty( $item->description ) ? '<span>'.esc_attr( $item->description ).'</span>' : '';

           if($depth != 0)
           {
                     $description = $append = $prepend = "";
           }

            $item_output = $args->before;
            $item_output .= '<a'. $attributes .'>';
            $item_output .= $args->link_before .$prepend.apply_filters( 'the_title', $item->title, $item->ID ).$append;
            $item_output .= $description.$args->link_after;
            $item_output .= '</a>';
            $item_output .= $args->after;

            $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
            }
	}
