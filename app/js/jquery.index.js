"use strict";
$(function () {

    $.each( $( '.swiper-container' ), function() {
        Slider( $( this ) );
    } );

    $.each( $( '.tabs' ), function() {
        new Tabs( $( this ) );
    } );

    $.each( $( '.menu' ), function() {
        new  Menu( $( this ) );
    } );

});

var Menu = function ( obj ) {
    var _obj = obj,
        _layout = _obj.find( '.menu_layout' ),
        _btnSub = _obj.find( 'a' ),
        _btn = $( '.menu-btn' ),
        _site = $( '.site' ),
        _window = $( window );

    var _onEvents = function() {
            _btn.on( {
                click: function() {

                    if ( _btn.hasClass( 'menu-btn_close' ) ) {
                        _hideMenu();
                    } else {
                        _openMenu();
                    }
                    return false;
                }
            } );
            _btnSub.on( {
                click: function() {
                    if ($(this).next().is('ul')){
                        _subMenuOpen($(this));
                    }
                    return false;
                }
            } );
            _window.on( {
                click: function ( e ) {
                    if ( $( e.target ).closest( _obj ).length == 0 ){
                        _hideMenu();
                        return false;
                    }
                }
            } );
        },
        _openMenu = function () {

            _site.addClass( 'site_mobile-menu' );
            _obj.addClass( 'menu_open' );
            _btn.addClass( 'menu-btn_close' );

            _checkContentScroll();
            $( _obj ).getNiceScroll().show();

        };
        _hideMenu = function () {
            _site.removeClass( 'site_mobile-menu' );
            _obj.removeClass( 'menu_open' );
            _btn.removeClass( 'menu-btn_close' );
            $( _obj ).getNiceScroll().hide();
        };
        _subMenuOpen = function (elem) {
            var curElem = elem,
                curContent = curElem.next( 'ul' );

            if( curContent.is( ':visible' ) ){
                curContent.slideUp(300);
                curElem.removeClass('active');
            } else {
                curContent.slideDown(300);
                curElem.addClass('active');
            }

            _checkContentScroll();

        };
        _checkContentScroll = function() {
            if ( _layout.height() >  _obj.height()-42 ){
                _initContentScroll();
                $( _obj ).getNiceScroll().show();
                $( _obj ).getNiceScroll().resize();
            } else {
                $( _obj ).getNiceScroll().hide();
            }
        },
        _initContentScroll = function() {
            $( _obj ).niceScroll( {
                autohidemode: 'false',
                cursorborder: '',
                cursorcolor: "transparent",
                cursorwidth: "2px",
                cursorborderradius: "0"
            } );
        },
        init = function() {
            _onEvents();
        };

    init()
};

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