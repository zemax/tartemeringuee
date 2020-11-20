import addScript from "../utils/addscript";

export const facebookPixelService = ( facebookPixelId, configOptions = {}, more = () => true ) => ({
    "key":     "facebookpixel",
    "type":    "ads",
    "name":    "Facebook Pixel",
    "uri":     "https://fr-fr.facebook.com/business/help/www/651294705016616",
    "cookies": [ 'datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src' ],
    'init':    () => {
        "use strict";
        var n;
        if ( window.fbq ) {
            return;
        }
        n = window.fbq = function () {
            n.callMethod ? n.callMethod.apply( n, arguments ) : n.queue.push( arguments )
        };
        if ( !window._fbq ) {
            window._fbq = n;
        }
        n.push    = n;
        n.loaded  = !0;
        n.version = '2.0';
        n.queue   = [];
    },
    'accept':  () => {
        addScript( 'https://connect.facebook.net/en_US/fbevents.js' );
        fbq( 'init', facebookPixelId );
        fbq( 'track', 'PageView' );
        
        more();
    },
    'refuse':  () => true,
});

export default facebookPixelService;
