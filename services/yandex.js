const service = ( options ) => ({
    'key':     'yandex',
    'type':    'analytics',
    'name':    'Yandex',
    'uri':     'https://metrica.yandex.com/about/info/privacy-policy',
    'cookies': [],
    'init':    ( manager ) => true,
    'accept':  ( manager ) => {
        (function ( d, w, c ) {
            (w[ c ] = w[ c ] || []).push( function () {
                try {
                    w[ 'yaCounter' + options.id ] = new Ya.Metrika( options );
                } catch ( e ) {
                }
            } );
            
            var n   = d.getElementsByTagName( "script" )[ 0 ],
                s   = d.createElement( "script" ),
                f   = function () {
                    n.parentNode.insertBefore( s, n );
                };
            s.type  = "text/javascript";
            s.async = true;
            s.src   = "https://mc.yandex.ru/metrika/watch.js";
            
            if ( w.opera == "[object Opera]" ) {
                d.addEventListener( "DOMContentLoaded", f, false );
            }
            else {
                f();
            }
        })( document, window, "yandex_metrika_callbacks" );
    },
    'refuse':  () => true,
});

export default service;
