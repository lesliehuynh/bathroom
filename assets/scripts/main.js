$(function () {
    let optionWidth = $('#first_option').width();
    $('.bath').width(optionWidth);
    $('.shelf').width(optionWidth);
    $('.floor').width(optionWidth);
    let titleHeight = $($('.part-item-custom-1')[0]).height();
    $('#part-title-1').height(titleHeight);

    let itemWidth = $('#natural_design').width();

    $(window).resize(() => {
        let optionWidth = $('#first_option').width();
        $('.option').width(optionWidth);
        itemWidth = $('#natural_design').width();
    })

    const scrollRight = $('#scroll_right');

    const scrollLeft = $('#scroll_left');

    let lastScrollLeft = 0;


    $('#part-item-custom').scroll(function(){
        let st = $(this).scrollLeft();
        if (st > 0 && st < itemWidth*2){
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
            if ($(this).scrollLeft() === itemWidth*2) {
                scrollRight.hide()
            }
        })
    });

    let firstClick = true;

    $('.option').click(() => {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && firstClick) {
            $('#header').hide();
            firstClick = false;
        }
    })
})