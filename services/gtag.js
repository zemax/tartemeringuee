import addScript from "../utils/addscript";

export const gtagService = ( UA, configOptions = { 'anonymize_ip': true }, more = () => true ) => ({
    'key':     'gtag',
    'type':    'analytic',
    'name':    'Google Analytics (gtag.js)',
    'uri':     'https://support.google.com/analytics/answer/6004245',
    'cookies': [ '_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', ('_gat_gtag_' + UA).replace( /-/g, '_' ) ],
    'init':    () => {
        window.dataLayer = window.dataLayer || [];
        
        window.gtag = function gtag() {
            window.dataLayer.push( arguments );
        };
        
        gtag( 'js', new Date() );
        gtag( 'config', UA, configOptions );
        
        more();
    },
    'accept':  () => addScript( 'https://www.googletagmanager.com/gtag/js?id=' + UA ),
    'refuse':  () => true,
});

export default gtagService;
