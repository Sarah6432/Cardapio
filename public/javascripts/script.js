$(document).ready(function () {
    $('#mobile_btn').click(function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });
});
const sections = $('section');
const navItems = $('.nav-item');
$(window).on('scroll', function () {

    const header = $('header');
    const scrollPosition = $(window).scrollTop() - header.outerHeight();

    let activeSectionIndex = 0;

    if (scrollPosition <= 0) {
        header.css('box-shadow', 'none');
    } else {
        header.css('box-shadow', '5px 1px 5px rgba(0,0,0,0.1) ')
    }

    sections.each(function (i) {
        const section = $(this);
        const sectionTop = section.offset().top - 60;
        const sectionBottom = sectionTop + section.outerHeight();

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            activeSectionIndex = i;
            return false;
        }
    })

    navItems.removeClass('active');
    $(navItems[activeSectionIndex]).addClass('active');
});
ScrollReveal().reveal('#cta', {
    origin: 'left',
    duration: 2500,
    distance: '20%'
});
ScrollReveal().reveal('#banner', {
    origin: 'right',
    duration: 3000,
    distance: '25%'
});
ScrollReveal().reveal('.shape', {
    origin: 'right',
    duration: 3000,
    distance: '25%'
});
ScrollReveal().reveal('#dishes', {
    origin: 'left',
    duration: 2500,
    distance: '20%'
});
ScrollReveal().reveal('.menu-grid', {
    origin: 'left',
    duration: 2500,
    distance: '20%'
});
ScrollReveal().reveal('.menu-section', {
    origin: 'left',
    duration: 2500,
    distance: '20%'
});
ScrollReveal().reveal('.promo-cards', {
    origin: 'left',
    duration: 2500,
    distance: '20%'
});

document.querySelectorAll('.dish-heart').forEach(icon => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('favorited');
    });
});
AOS.init({
    once: false,
});

$('#dishes').slick({
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    ],

    prevArrow: '<button class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-next"><i class="fa fa-chevron-right"></i></button>'
});
$(document).ready(function () {
    $('.rodizio-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
});

$(document).ready(function () {
    $('.carousel').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 900,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button class="prev">←</button>',
        nextArrow: '<button class="next">→</button>'
    });
});

