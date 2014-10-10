// Initiates FastClick
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);


/* Another attempt */
/* http://stackoverflow.com/questions/10357844/how-to-disable-rubber-band-in-ios-web-apps */
/*
(function registerScrolling($) {
    var prevTouchPosition = {},
        scrollYClass = 'scroll-y',
        scrollXClass = 'scroll-x',
        searchTerms = '.' + scrollYClass + ', .' + scrollXClass;

    $('body').on('touchstart', function (e) {
        var $scroll = $(e.target).closest(searchTerms),
            targetTouch = e.originalEvent.targetTouches[0];

        // Store previous touch position if within a scroll element
        prevTouchPosition = $scroll.length ? { x: targetTouch.pageX, y: targetTouch.pageY } : {};
    });

$('body').on('touchmove', function (e) {
    var $scroll = $(e.target).closest(searchTerms),
        targetTouch = e.originalEvent.targetTouches[0];

    if (prevTouchPosition && $scroll.length) {
        // Set move helper and update previous touch position
        var move = {
            x: targetTouch.pageX - prevTouchPosition.x,
            y: targetTouch.pageY - prevTouchPosition.y
        };
        prevTouchPosition = { x: targetTouch.pageX, y: targetTouch.pageY };

        // Check for scroll-y or scroll-x classes
        if ($scroll.hasClass(scrollYClass)) {
            var scrollHeight = $scroll[0].scrollHeight,
                outerHeight = $scroll.outerHeight(),

                atUpperLimit = ($scroll.scrollTop() === 0),
                atLowerLimit = (scrollHeight - $scroll.scrollTop() === outerHeight);

            if (scrollHeight > outerHeight) {
                // If at either limit move 1px away to allow normal scroll behavior on future moves,
                // but stop propagation on this move to remove limit behavior bubbling up to body
                if (move.y > 0 && atUpperLimit) {
                    $scroll.scrollTop(1);
                    e.stopPropagation();
                } else if (move.y < 0 && atLowerLimit) {
                    $scroll.scrollTop($scroll.scrollTop() - 1);
                    e.stopPropagation();
                }

                // If only moving right or left, prevent bad scroll.
                if(Math.abs(move.x) > 0 && Math.abs(move.y) < 3){
                  e.preventDefault()
                }

                // Normal scrolling behavior passes through
            } else {
                // No scrolling / adjustment when there is nothing to scroll
                e.preventDefault();
            }
        } else if ($scroll.hasClass(scrollXClass)) {
            var scrollWidth = $scroll[0].scrollWidth,
                outerWidth = $scroll.outerWidth(),

                atLeftLimit = $scroll.scrollLeft() === 0,
                atRightLimit = scrollWidth - $scroll.scrollLeft() === outerWidth;

            if (scrollWidth > outerWidth) {
                if (move.x > 0 && atLeftLimit) {
                    $scroll.scrollLeft(1);
                    e.stopPropagation();
                } else if (move.x < 0 && atRightLimit) {
                    $scroll.scrollLeft($scroll.scrollLeft() - 1);
                    e.stopPropagation();
                }
                // If only moving up or down, prevent bad scroll.
                if(Math.abs(move.y) > 0 && Math.abs(move.x) < 3){
                  e.preventDefault();
                }

                // Normal scrolling behavior passes through
            } else {
                // No scrolling / adjustment when there is nothing to scroll
                e.preventDefault();
            }
        }
    } else {
        // Prevent scrolling on non-scrolling elements
        e.preventDefault();
    }
});
})(jQuery);

*/



/* Another attempt at preventing rubberbanding */
/* http://blog.armaganamcalar.com/post/70847348271/baking-soda-paste */
/*
<script type="text/javascript">
    document.body.addEventListener('touchstart', function() {
        document.body.addEventListener('touchmove', function moveListener(e) {
            document.body.removeEventListener('touchmove', moveListener);

            var el = e.target;

            do {
                if (parseInt(window.getComputedStyle(el, null).height, 10) < el.scrollHeight)
                    return;
            } while (el != document.body && el.parentElement != document.body && (el = el.parentElement));

            e.preventDefault();
        });
    });
</script>
*/

/*
document.body.addEventListener('touchstart', function() {
    document.body.addEventListener('touchmove', function moveListener(e) {
        document.body.removeEventListener('touchmove', moveListener);

        var el = e.target;

        do {
            if (parseInt(window.getComputedStyle(el, null).height, 10) < el.scrollHeight)
                return;
        } while (el != document.body && el.parentElement != document.body && (el = el.parentElement));

        e.preventDefault();
    });
});

*/



/* This kills all scrolling everywhere, but we need a way to enable scrolling for certain elements */

//document.ontouchmove = function(e){ 
//    e.preventDefault(); 
//}

/* This incorporates the above and is supposed to allow elements with the class "touchMoveAllowed" to continue scrolling, but it doesn't seem to work

document.ontouchmove = function (event) {
    var isTouchMoveAllowed = false;
    var p = event.target;

    while (p != null) {
        if (p.classList && p.classList.contains("touchMoveAllowed")) {
            isTouchMoveAllowed = true;
            break;
        }
        p = p.parentNode;
    }

    if (!isTouchMoveAllowed) {
        event.preventDefault();
    }

};
*/



/* Also doesn't work, described here: http://blog.armaganamcalar.com/post/70847348271/baking-soda-paste

document.body.addEventListener('touchstart', function() {
    document.body.addEventListener('touchmove', function moveListener(e) {
        document.body.removeEventListener('touchmove', moveListener);

        var el = e.target;

        do {
            if (parseInt(window.getComputedStyle(el, null).height, 10) < el.scrollHeight)
                return;
        } while (el != document.body && el.parentElement != document.body && (el = el.parentElement));

        e.preventDefault();
    });
});
*/





/* Another failure: http://www.smilingsouls.net/Blog/20110804114957.html

document.addEventListener(
  'touchmove',
  function(e) {
    e.preventDefault();
  },
  false
);

*/



/* Also fails http://stackoverflow.com/questions/10238084/ios-safari-how-to-disable-overscroll-but-allow-scrollable-divs-to-scroll-norma

$('body').on('touchmove', function (e) {
	if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
});

*/




