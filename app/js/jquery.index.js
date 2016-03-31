$(function () {

    $.each( $( '.menu' ), function() {
        new  Menu( $( this ) );
    } );

});

var Menu = function ( obj ) {
    var _obj = obj,
        _layout = _obj.find( '.menu_layout' ),
        _btn = $( '.menu-btn' ),
        _btnSub = $( '.menu__sub' ),
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

                    _subMenuOpen();
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

            _obj.addClass( 'menu_open' );
            //css animation

            _site.addClass( 'site_mobile-menu' );
            _obj.addClass( 'menu_open' );
            _btn.addClass( 'menu-btn_close' );

            if ( _layout.height() >  _obj.height() ){
                _initContentScroll();
            }
            $( _obj ).getNiceScroll().show();

        };
        _hideMenu = function () {
            _site.removeClass( 'site_mobile-menu' );
            _obj.removeClass( 'menu_open' );
            _btn.removeClass( 'menu-btn_close' );
            $( _obj ).getNiceScroll().hide();
        };
        _subMenuOpen = function () {
            var curElem = $(this),
                curContent = curElem.next( 'ul' );

            if( curContent.is( ':visible' ) ){
                curContent.slideUp(300);
            } else {
                curContent.slideDown(300);
            }
        };
        _initContentScroll = function() {
            $( _obj ).niceScroll( {
                autohidemode: 'false',
                cursorborder: '',
                cursorcolor: "#fff",
                cursorwidth: "6px",
                cursorborderradius: "0"
            } );
        },
        init = function() {
            _onEvents();
        };

    init()
};