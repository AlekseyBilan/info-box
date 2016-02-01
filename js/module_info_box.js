/*module_info_box*/
(function ($) {
    'use strict';
    $.InfoBox = function (options) {
        this.options = {};
        var skinClass,
            json,
            $parent,
            itemClass,
            showDetailsText,
            hideDetailsText,
            isShowDetails,
            animateDelay,
            btnNextText,
            btnPrevText,
            btnFindText,
            parentHeight,
            parentWidth,
            indexFirstEl,

            model = {
                init: function (pathData) {
                    $.ajax({
                        type: "POST",
                        url: pathData,
                        async: false,
                        success: function (data) {
                            json = data;
                        },
                        error: function () {
                            console.log('data is not available!')
                        }
                    });
                }
            },

            view = {
                createHtml: function () {
                    var html_item = '<div class="item ' + itemClass + '">'
                        + '<img class="product_photo" src="" >'
                        + '<div class="description_section">'
                        + '<article class="about">'
                        + '<header class="title"></header>'
                        + '<div class="content">'
                        + '<p class="description"></p>'
                        + '<p class="note"></p>'
                        + '</div>'
                        + '</article>'
                        + '</div>'
                        + '<a class="show_details">' + showDetailsText + '</a>'
                        + '</div>'
                        + '<div class="action_buttons_section">'
                        + '<div class="btn_prev_wrapper">'
                        + '<button class="btn_go_to_item_first">&#171;</button>'
                        + '<button class="prev_item btn">'
                        + btnPrevText
                        + '</button>'
                        + '</div>'
                        + '<div class="btn_next_wrapper">'
                        + '<button class="btn_go_to_item_last">&#187;</button>'
                        + '<button class="next_item btn">'
                        + btnNextText
                        + '</button>'
                        + '</div>'
                        + '<div class="btn_find_store_wrapper">'
                        + '<button class="find_store btn">' + btnFindText + '</button>'
                        + '<button class="find_store_icon">&#9658;</button>'
                        + '</div>'
                        + '</div>';
                    $parent.html(html_item);
                },

                initStyle: function () {
                    $parent.addClass(skinClass).css({'width': parentWidth, 'height': parentHeight});
                    $parent.find('.content').css('height', parseInt(parentHeight * 0.074));
                    $parent.find('.title').css('font-size', parseInt(parentHeight * 0.0545));
                    $parent.find('.description_section, .show_details').css('font-size', parseInt(parentHeight * 0.029));
                    $parent.find('.btn').css('font-size', parseInt(parentHeight * 0.0353));
                },

                fillContentToHtml: function (jsonItem) {
                    $parent.find('.item').addClass('active');
                    $parent.find('.product_photo').attr("src", "img/" + jsonItem.img);
                    $parent.find('.description_section .title').text(jsonItem.title);
                    $parent.find('.description_section .description').text(jsonItem.description);
                    $parent.find('.description_section .note').text(jsonItem.note);
                    $parent.find('.find_store').attr('data-url', jsonItem.productUrl);
                }

            },

            controller = {
                initActions: function () {
                    $parent.find('.prev_item').on('click', function () {
                        if (indexFirstEl !== 0) {
                            indexFirstEl--;
                        }
                        else {
                            indexFirstEl = json.length - 1;
                        }
                        $parent.find('.item').removeClass('active').delay(animateDelay / 3).queue(function () {
                            view.fillContentToHtml(json[indexFirstEl]);
                            if ($parent.find('.item').hasClass('details_show')) {
                                controller.hideDetails();
                            }
                            $(this).dequeue();
                        });
                    });
                    $parent.find('.next_item').on('click', function () {
                        if (indexFirstEl < json.length - 1) {
                            indexFirstEl++;
                        }
                        else {
                            indexFirstEl = 0;
                        }
                        $parent.find('.item').removeClass('active').delay(animateDelay / 3).queue(function () {
                            view.fillContentToHtml(json[indexFirstEl]);
                            if ($parent.find('.item').hasClass('details_show')) {
                                controller.hideDetails();
                            }
                            $(this).dequeue();
                        });
                    });
                    $parent.find('.btn_go_to_item_first').on('click', function () {
                        $parent.find('.item').removeClass('active').delay(animateDelay / 3).queue(function () {
                            view.fillContentToHtml(json[0]);
                            if ($parent.find('.item').hasClass('details_show')) {
                                controller.hideDetails();
                            }
                            $(this).dequeue();
                        });
                    });
                    $parent.find('.btn_go_to_item_last').on('click', function () {
                        $parent.find('.item').removeClass('active').delay(animateDelay / 3).queue(function () {
                            view.fillContentToHtml(json[json.length - 1]);
                            if ($parent.find('.item').hasClass('details_show')) {
                                controller.hideDetails();
                            }
                            $(this).dequeue();
                        });
                    });
                    $parent.find('.find_store').on('click', function () {
                        window.open($(this).attr('data-url'));
                    });
                    $parent.find('.show_details').on('click', function () {
                        if (isShowDetails) {/*need to hide details*/
                            controller.hideDetails();
                        } else {/*need to show details*/
                            controller.showDetails();
                        }
                    });
                },

                showDetails: function () {
                    $parent.find('.product_photo').fadeOut(animateDelay / 3);
                    $parent.find('.description_section').animate({
                        marginTop: '-' + parseInt(parentHeight * 0.577) + 'px'
                    }, animateDelay / 2, function () {
                        $parent.find('.content').animate({
                            height: parseInt(parentHeight * 0.6506)
                        }, animateDelay / 2, function () {
                            $parent.find('.item').addClass('details_show');
                        });
                    });
                    $parent.find('.show_details').text(hideDetailsText);
                    isShowDetails = true;
                },

                hideDetails: function () {
                    $parent.find('.item').removeClass('details_show');
                    $parent.find('.description_section').animate({
                        marginTop: parseInt(parentHeight * 0.013)
                    }, animateDelay / 2);
                    $parent.find('.content').animate({
                        height: parseInt(parentHeight * 0.074),
                        scrollTop: 0
                    }, animateDelay / 2, function () {
                        $parent.find('.product_photo').fadeIn(animateDelay / 2);
                    });

                    $parent.find('.show_details').text(showDetailsText);
                    isShowDetails = false;
                },

                init: function (options) {
                    //console.log('options', options);
                    $parent = options.insertTo;
                    skinClass = options.skinClass || 'orangeSkin';
                    /* for style */
                    itemClass = options.itemClass || 'main';
                    /*for next fix and updates */
                    showDetailsText = options.showDetailsText || 'more details';
                    hideDetailsText = options.hideDetailsText || 'hide details';
                    btnNextText = options.btnNextText || 'Next';
                    btnPrevText = options.btnPrevText || 'Prev';
                    btnFindText = options.btnFindText || 'Find A Store';
                    parentHeight = options.parentHeight || parseInt($parent.css('height'));
                    parentWidth = options.parentWidth || parseInt($parent.css('width'));
                    animateDelay = options.animateDelay || 1000;
                    /* animate speed */
                    indexFirstEl = 0;
                    isShowDetails = false;

                    if ($parent) {
                        view.createHtml();
                        view.initStyle();
                        view.fillContentToHtml(json[indexFirstEl]);
                        controller.initActions();
                    } else {
                        //throw new Error('No element selected / no data');
                        console.log('No element selected, or data is not available!');
                    }
                    return this;
                }
            };

        model.init(options.pathData);
        controller.init(options);
        return controller;
    };
})(jQuery);