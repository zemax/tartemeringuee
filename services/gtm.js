import addScript from "../utils/addscript";

export const gtmService = ( GTM, more = () => true ) => ({
    'key':     'googletagmanager',
    'type':    'api',
    'name':    'Google Tag Manager',
    'uri':     'https://adssettings.google.com/',
    'cookies': [ '_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs' ],
    'init':    () => {
        window.dataLayer = window.dataLayer || [];
    },
    'accept':  () => {
        window.dataLayer.push( {
                                   'gtm.start': new Date().getTime(),
                                   event:       'gtm.js'
                               } );
        addScript( '//www.googletagmanager.com/gtm.js?id=' + GTM );
        
        more();
    },
    'refuse':  () => true,
});

export default gtmService;
