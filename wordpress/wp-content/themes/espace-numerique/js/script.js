$(
	function() {

		$('.jcarousel').jcarousel({
            list: '.elastislide-list',
            items: '.carousel-thumbnail',
            wrap: 'circular',
        });
        $('.jcarousel-prev').jcarouselControl({
            target: '-=2'
        });

        $('.jcarousel-next').jcarouselControl({
            target: '+=2'
        });

        $('.megalink').bind('mouseenter',
            function() {
                    $('.big-thumbnail').css('filter', 'none').css('-webkit-filter', 'none');
                    $('.thumbnail-title').css('background-color', '#e1003a').css('color', '#ffffff').css('opacity', '1');
            }
        );

        $('.megalink').bind('mouseleave',
            function() {
                    $('.big-thumbnail').css('filter', 'url(wp-content/themes/espace-numerique/img/filter.svg#halfRemix)').css('-webkit-filter', 'url(wp-content/themes/espace-numerique/img/filter.svg#halfRemix)');
                    $('.thumbnail-title').css('background-color', '#ffffff').css('color', '#e1003a').css('opacity', '0.6');
            }
        );
	}
);