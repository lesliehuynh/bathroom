$(function () {

    let firstClick = true;

    let optionWidth, itemWidth, lastScrollLeft = 0;

    const scrollRight = $('#scroll_right');

    const scrollLeft = $('#scroll_left');

    const srcDir = './assets/images/';

    if (window.innerWidth < 576) {
        $('.init').removeClass('init').off('click');

        $('.controller-container').removeClass('d-none').addClass('d-flex');

        $('footer').removeClass('d-none').addClass('d-flex');

        initUI()
    } else {
        $('.init').on('click', function () {
            $(this).removeClass('init').off('click');

            $('.controller-container').removeClass('d-none').addClass('d-flex');

            $('footer').removeClass('d-none').addClass('d-flex');

            initUI();
        })
    }

    $(window).resize(() => {
        optionWidth = $('#first_option').width();
        $('.option').width(optionWidth);
        itemWidth = $('#natural_design').width();
    })

    $('.option').each((index, el) => {
        const whiteText = ['ヘイジーシルバー', 'ステインブルー', 'モルティオダーク', 'ブラック', 'グラニットグレー']
        let name = $(el).data('name');
        if (name) {
            let names = name.split(',');
            let svg;
            names.forEach((val, num) => {
                if (whiteText.includes(val)) {
                    svg = getSVG(val, false);
                } else {
                    svg = getSVG(val);
                }
                $($(el).children()[num]).html(svg);
            })
        }
    }).click(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && firstClick) {
            $('#header').hide();
            firstClick = false;
        }
    });

    $('.wall').on('click', function () {
        const value = $(this).data('value').replace(',', '-');
        $('#wall_img').attr('src', srcDir + 'front-wall/' + value.r + '.png');
        $('.wall').removeClass('active');
        $(this).addClass('active');
    })

    $('#part-item-custom').scroll(function () {
        let st = $(this).scrollLeft();
        if (st > 0 && st < itemWidth * 2) {
            $('.scroll').css('display', 'flex');
        } else if (st === 0) {
            scrollLeft.hide()
        } else {
            scrollRight.hide()
        }
        lastScrollLeft = st;
    });

    scrollLeft.click(() => {
        let temp = lastScrollLeft % itemWidth;
        $('#part-item-custom').animate({scrollLeft: lastScrollLeft - (temp !== 0 ? temp : itemWidth)}, 500, 'linear', function () {
            if ($(this).scrollLeft() === 0) {
                scrollLeft.hide()
            }
        })
    });

    scrollRight.click(() => {
        $('#part-item-custom').animate({scrollLeft: lastScrollLeft + itemWidth - lastScrollLeft % itemWidth}, 500, 'linear', function () {
            if ($(this).scrollLeft() === itemWidth * 2) {
                scrollRight.hide()
            }
        })
    });

    function initUI() {
            optionWidth = $('#first_option').width();

            itemWidth = $('#natural_design').width();

            $('.bath').width(optionWidth).on('click', function () {
                const value = $(this).data('value');
                $('#bath_img').attr('src', srcDir + 'bath/' + value + '.png');
                $(this).addClass('active').siblings().removeClass('active');
            });

            $('.shelf').width(optionWidth).on('click', function () {
                const value = $(this).data('value');
                $('#shelf_img').attr('src', srcDir + 'shelf/' + value + '.png');
                $(this).addClass('active').siblings().removeClass('active');
            });

            $('.floor').width(optionWidth).on('click', function () {
                const value = $(this).data('value');
                $('#floor_img').attr('src', srcDir + 'floor/' + value + '.png');
                $(this).addClass('active').siblings().removeClass('active');
            });

            let titleHeight = $($('.part-item-custom-1')[0]).height();

            $('#part-title-1').height(titleHeight);
    }

    function getSVG(val, isBlack = true) {
        return `<svg viewBox="0 0 230 18" xmlns="http://www.w3.org/2000/svg" ">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="KozGoPr6N, Helvetica, sans-serif" font-size="19" font-weight="500">
                    <text fill="${isBlack ? '#000000' : '#FFFFFF'}">
                        <tspan x="-2" y="16">${val}</tspan>
                    </text>
                </g>
            </svg>`
    }
})