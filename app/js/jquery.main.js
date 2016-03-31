"use strict";
$(function(){

    $( '.swiper-container' ).each(function () {
        Slider( $( this ) );
    } );

    $.each($( '.tabs' ), function () {
        new Tabs( $( this ) );
    } );

} );

var Slider = function ( obj ) {

    //private properties
    var _self = this,
        _next = $( '.partners' ).find( $( '.partners__next' ) ),
        _prev = $( '.partners' ).find( $( '.partners__prev' ) ),
        _obj = obj;

    //private methods
    var _addEvents = function () {

        },
        _init = function () {
            _addEvents();
        };
    if (_obj.hasClass( 'partners__wrap' ) ) {
        var _swiperPromo = new Swiper( _obj, {
            nextButton: _next,
            prevButton: _prev,
            slidesPerView: 4,
            spaceBetween: 0,
            loop: false,
            breakpoints: {

                992: {
                    slidesPerView: 3
                },
                769: {
                    slidesPerView: 2
                },
                500: {
                    slidesPerView: 1
                }
            }


        });

    }
    /*if (_obj.hasClass('container_wrap')) {
     var _slider = new Swiper(_obj, {
     nextButton: '.slider_next',
     prevButton: '.slider_prev',
     spaceBetween: 0,
     loop: false,
     loopedSlides: 3,
     slidesPerView: 6

     });

     }*/

    //public properties

    //public methods

    _init();
};

var Tabs = function (obj) {

    var _obj = obj,
        _window = $( window ),
        _body = $( 'body' ),
        _tabBtn = _obj.find( '.tabs__controls-wrap > div '),
        _tabBtnInner = _tabBtn.find( '> span' ),
        _tabContent = _obj.find( '.tabs__wrapper' ),
        _controls = _obj.find( '.tabs__controls-wrap' ),
        _tabContentItem = _tabContent.find( '> div' );

    var _addEvents = function () {

            _window.on({
                'load': function() {
                    _showContentWhenLoading();
                }
            } );

            _tabBtnInner.on( {
                mousedown: function() {
                    _tabContent.css( {
                        'height': _tabContent.innerHeight()
                    }, 300);
                },
                mouseup: function() {
                    var curItem = $( this ),
                        parent = curItem.parent(),
                        index = parent.index();
                    var activeContent = _tabContentItem.eq( index ),
                        activeContentHeight = activeContent.innerHeight();
                    _tabContent.animate( {
                        'height': activeContentHeight
                    }, 300);
                    setTimeout( function() {
                        _tabContent.css( {
                            "height": ""
                        } );
                    }, 400 )
                },
                click: function() {
                    var curItem = $( this ),
                        parent = curItem.parent(),
                        index = parent.index();
                    _tabBtn.removeClass("active");
                    _tabBtn.eq(index).addClass("active");
                    _showContent(index);
                    _controls.removeClass("active");
                }
            } );

            _body.on( {
                click: function() {
                    _controls.removeClass("active");
                }
            } );

        },
        _showContentWhenLoading = function() {
            var index = _tabBtn.filter('.active').index();
            if ( index == "-1" ) {
                index = 0;
                _tabBtn.eq(index).addClass( 'active' );
            }
            _showContent(index);
        },
        _showContent = function( i ) {
            var activeContent = _tabContentItem.eq( i );
            _tabContentItem.css({
                "display": "none"
            } );
            activeContent.css({
                "display": "block"
            } );
        },
        _init = function () {
            _addEvents();
        };

    _init();
};