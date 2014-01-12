<?php

/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 */



get_header(); ?>

		<div class="content">

			<section class="my-carousel">
				<div class="jcarousel">
					<ul id="carousel" class="elastislide-list">
						<?php
							$my_query = new WP_Query('category_name=carousel&posts_per_page=15');
							while ($my_query->have_posts()) : $my_query->the_post();
							$do_not_duplicate[] = $post->ID;
						?>
						<li><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_post_thumbnail('carousel-thumb', array('class' => 'carousel-thumbnail')); ?></a></li>
						<?php
							endwhile;
						?>
					</ul>
				</div>
			
				<button type="button" class="btn btn-default btn-md jcarousel-prev"><span class="glyphicon glyphicon-chevron-left"></span></button>
				<button type="button" class="btn btn-default btn-md jcarousel-next"><span class="glyphicon glyphicon-chevron-right"></span></button>
    			
    		</section><!-- carousel -->

    		<section class="main-article row">
    			<div class="big-article megalink">
    				<?php
    					$my_second_query = new WP_Query('category_name=center&posts_per_page=1');
    					while ($my_second_query->have_posts()) : $my_second_query->the_post();
    					$do_not_duplicate[] = $post->ID;
    				?>
    				<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
    					<?php the_post_thumbnail('full', array('class' => 'img-responsive big-thumbnail')); ?>
    					<span class="thumbnail-title container"><h1><?php the_title(); ?></h1></span>
    				</a>
    				<?php
    					endwhile;
    				?>
    			</div>
    		</section>

    		<section class="other-articles">
    			<div class="separator">
    			</div>

    			<div class="container">

    				<div class="row">

    					<?php
                            $i = 0;
    						if (have_posts()) : while (have_posts()) : the_post();
    						if (in_array($post->ID, $do_not_duplicate)) continue;
    					?>
    					<div class="col-md-4">
		    				<article class="small-article">
    							<header class="small-article-header">
    								<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><h2><?php the_title(); ?></h2></a>
    							</header>
    							<p><?php the_excerpt(); ?></p>
    						</article>
    					</div>

                        <?php
                            $i++;
                            if ($i >= 7) {
                                break;
                            }
                            elseif ($i%3 == 0) {
                                echo '
                                    </div>
                                    <div class="row">
                                ';
                            };
                        ?>

    					<?php
    						endwhile;
    						endif;
    					?>

    				</div>
    			</div>
    		</section>

		</div><!-- content -->

<?php get_footer(); ?>