import cookie from "@zemax/mf-js/modules/cookies/cookie";

const consentManager = ( options = {} ) => {
    const { cookieName } = Object.assign( { 'cookieName': 'tarteaucitron' }, options );
    
    const STATUS_WAIT  = 'wait';
    const STATUS_TRUE  = 'true';
    const STATUS_FALSE = 'false';
    
    const cookies = (cookie( cookieName ) || '')
        .split( '!' )
        .filter( ( item ) => !!item )
        .map( ( item ) => item.split( '=' ) )
        .map( ( item ) => ({ 'key': item[ 0 ], 'status': item[ 1 ] }) );
    
    const servicesStatus = {};
    cookies.forEach( ( { key, status } ) => {
        switch ( status ) {
            case STATUS_TRUE:
            case STATUS_FALSE:
                servicesStatus[ key ] = status;
                break;
            
            default:
                servicesStatus[ key ] = STATUS_WAIT;
        }
    } );
    
    const writeCookie = () => cookie(
        cookieName,
        servicesList.reduce( ( curry, key ) => curry + '!' + key + '=' + servicesStatus[ key ], '' ),
        { expires: 365, path: '/' }
    );
    
    /**************************************************
     * SERVICES
     **************************************************/
    
    const services        = {};
    const servicesList    = [];
    const servicesWaiting = [];
    
    const register = ( service, key = false ) => {
        key = key || service.key;
        
        const status = servicesStatus[ key ] = (servicesStatus[ key ] || STATUS_WAIT);
        
        servicesList.push( key );
        services[ key ] = services[ key ] ? [ ...services[ key ], service ] : [ service ];
        
        console.log( 'ConsentManager', 'register', key, status );
        
        service.init( manager );
        
        if ( !!service.required ) {
            service.accept( manager );
        }
        else if ( status === STATUS_FALSE ) {
            service.refuse();
        }
        else if ( status === STATUS_TRUE ) {
            service.accept( manager );
        }
        else {
            servicesWaiting.push( service );
        }
        
        return manager;
    };
    
    const accept = ( key ) => {
        console.log( 'ConsentManager', 'accept', key );
        
        if ( servicesStatus[ key ] !== STATUS_TRUE ) {
            servicesStatus[ key ] = STATUS_TRUE;
            services[ key ].forEach( ( service ) => service.accept( manager ) );
            writeCookie();
        }
        
        return manager;
    };
    
    const deny = ( key ) => {
        console.log( 'ConsentManager', 'deny', key );
        
        servicesStatus[ key ] = STATUS_FALSE;
        writeCookie();
        
        const domain = window.location.hostname.split( "." );
        while ( domain.length > 1 ) {
            const d = domain.join( '.' );
            
            services[ key ].forEach( ( service ) => service.cookies.forEach( ( cookieName ) => {
                cookie( cookieName, null, { 'path': '/', 'expires': -1, 'domain': '.' + d } );
                cookie( cookieName, null, { 'path': '/', 'expires': -1, 'domain': d } );
            } ) );
            
            domain.shift();
        }
        
        return manager;
    };
    
    const acceptAll = () => servicesList.forEach( ( key ) => accept( key ) );
    const denyAll   = () => servicesList.forEach( ( key ) => deny( key ) );
    
    /**************************************************
     * UI
     **************************************************/
    
    let consentUI = false;
    
    const setUI = ( u ) => {
        consentUI = u;
        
        consentUI.setManager( manager );
        
        return manager;
    };
    
    /**************************************************
     * LAUNCH
     **************************************************/
    
    const launch = () => {
        console.log( 'Consent Manager', 'launch', cookies, servicesStatus );
        
        writeCookie();
        
        if ( consentUI && servicesWaiting.length > 0 ) {
            consentUI.requireConsent();
        }
        
        return manager;
    };
    
    const manager = {
        setUI,
        register,
        launch,
        accept,
        deny,
        acceptAll,
        denyAll,
        services: () => servicesList.map( ( key ) => ({ key, service: services[ key ], status: servicesStatus[ key ] }) )
    };
    
    return manager;
};

export default consentManager;
