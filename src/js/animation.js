(function ($) {
    $.fn.typewrite = function (options) {
        var settings = {
            'selector': this,
            'extra_char': '',
            'delay': 100,
            'trim': false,
            'callback': null
        };

        if (options) $.extend(settings, options);

        function type_next_element(index) {
            var current_element = $(settings.selector[index]);
            var final_text = current_element.text();
            if (settings.trim) final_text = $.trim(final_text);
            current_element.html("").show();

            function type_next_character(element, i) {
                element.html(final_text.substr(0, i) + settings.extra_char);
                if (final_text.length >= i) {
                    setTimeout(function () {
                        type_next_character(element, i + 1);
                    }, settings.delay);
                } else {
                    if (++index < settings.selector.length) {
                        type_next_element(index);
                    } else if (settings.callback) settings.callback();
                }
            }
            type_next_character(current_element, 0);
        }

        type_next_element(0);

        return this;
    };
})(jQuery);

let currentTabIndex = 0;
let isTabAnimating = false;

function updateActiveTabClass(activeIndex) {
    const carouselTabs = document.querySelectorAll('.carousel-tab-item');
    carouselTabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === activeIndex);
    });
}

function setupCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');

    carouselItems.forEach((item, i) => {
        item.classList.remove('is-active', 'animating-in-left', 'animating-in-right', 'animating-out-left', 'animating-out-right');
        if (i === 0) {
            item.classList.add('is-active');
        }
    });

    updateActiveTabClass(0);
}

$(document).ready(function () {
    // Create a dummy element to hold the text
    const text = '< Quypq147 />'
    $('#type').text(text);
    // Use the typewriter effect on the newly created element
    $('.typewriter').typewrite({
        'selector': [$('#type')],
        'delay': 100,
        'extra_char': ' ',
        'trim': true,
        'callback': function () {
            $('#type').css('color', 'white'); // Change color after typing
        }
    });

    setupCarousel();
});

function changeTab(index) {
    const carouselItems = document.querySelectorAll('.carousel-item');

    if (isTabAnimating || index === currentTabIndex || index < 0 || index >= carouselItems.length) {
        return;
    }

    const currentItem = carouselItems[currentTabIndex];
    const nextItem = carouselItems[index];
    const isForward = index > currentTabIndex;

    const outClass = isForward ? 'animating-out-left' : 'animating-out-right';
    const inClass = isForward ? 'animating-in-right' : 'animating-in-left';

    isTabAnimating = true;

    nextItem.classList.add('is-active', inClass);
    currentItem.classList.add(outClass);

    const onAnimationEnd = function (event) {
        if (event.target !== nextItem) {
            return;
        }

        currentItem.classList.remove('is-active', 'animating-out-left', 'animating-out-right');
        nextItem.classList.remove('animating-in-left', 'animating-in-right');

        currentTabIndex = index;
        updateActiveTabClass(currentTabIndex);
        isTabAnimating = false;

        nextItem.removeEventListener('animationend', onAnimationEnd);
    };

    nextItem.addEventListener('animationend', onAnimationEnd);
}

window.changeTab = changeTab;



