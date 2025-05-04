

// Animation for the carousel
// This code handles the carousel functionality, including auto-sliding and button controls.
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');

let currentIndex = 0;
let autoSlideInterval;

// Update carousel position
function updateCarousel() {
    const itemWidth = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Move to the next slide
function moveToNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}

// Move to the previous slide
function moveToPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

// Auto-slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(moveToNext, 5000); // Slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event listeners for buttons
nextButton.addEventListener('click', () => {
    stopAutoSlide();
    moveToNext();
    startAutoSlide();
});

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    moveToPrev();
    startAutoSlide();
});

// Start auto-slide on page load
startAutoSlide();
// Typewriter effect for the text
//just copy from chadselph/jquery-typewriter .Thanks for the author.
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
});

