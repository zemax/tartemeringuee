import domready from "@zemax/mf-js/modules/dom/ready";
import getTextFR from "./lang/fr";
import Observable from "@zemax/mf-js/modules/core/observable";

export const consentUI = ( options ) => {
    const hashtag = options.hashtag || '#cookies-consent';
    const getText = options.getText || getTextFR( options );
    
    const STATUS_WAIT  = 'wait';
    const STATUS_TRUE  = 'true';
    const STATUS_FALSE = 'false';
    
    /**************************************************
     * MANAGER
     **************************************************/
    
    let manager = false;
    
    const setManager = ( m ) => manager = m;
    
    /**************************************************
     * EVENT DISPATCHER
     **************************************************/
    
    const consentUIObservable = Object.assign( {}, Observable );
    
    /**************************************************
     * BANNER
     **************************************************/
    
    const createBanner = () => {
        const banner     = document.createElement( 'div' );
        banner.className = 'consent-ui--banner';
        
        const closeBanner = () => {
            if ( banner.parentNode ) {
                banner.parentNode.removeChild( banner );
            }
        };
        
        // Banner Text
        
        const bannerText     = document.createElement( 'div' );
        bannerText.className = 'consent-ui--banner-text';
        banner.appendChild( bannerText );
        
        bannerText.innerHTML = getText( 'banner' );
        
        // Banner Actions
        
        const bannerActions     = document.createElement( 'div' );
        bannerActions.className = 'consent-ui--banner-actions';
        banner.appendChild( bannerActions );
        
        const acceptAllButton     = document.createElement( 'button' );
        acceptAllButton.className = 'accept';
        acceptAllButton.type      = 'button';
        acceptAllButton.innerHTML = getText( 'accept' );
        bannerActions.appendChild( acceptAllButton );
        
        acceptAllButton.addEventListener( 'click', () => {
            manager.acceptAll();
            closeBanner();
        } );
        
        const denyAllButton     = document.createElement( 'button' );
        denyAllButton.className = 'deny';
        denyAllButton.type      = 'button';
        denyAllButton.innerHTML = getText( 'deny' );
        bannerActions.appendChild( denyAllButton );
        
        denyAllButton.addEventListener( 'click', () => {
            manager.denyAll();
            closeBanner();
        } );
        
        const detailsButton     = document.createElement( 'button' );
        detailsButton.className = 'details';
        detailsButton.type      = 'button';
        detailsButton.innerHTML = getText( 'customise' );
        bannerActions.appendChild( detailsButton );
        
        detailsButton.addEventListener( 'click', () => {
            createDetails();
            closeBanner();
        } );
        
        // Banner close
        
        const closeButton     = document.createElement( 'button' );
        closeButton.type      = 'button';
        closeButton.className = 'consent-ui--close';
        closeButton.innerHTML = '&times;';
        bannerActions.appendChild( closeButton );
        
        closeButton.addEventListener( 'click', closeBanner );
        
        // Init
        
        domready( () => {
            document.body.appendChild( banner );
            consentUIObservable.trigger( { type: 'createBanner' } );
        } );
    };
    
    /**************************************************
     * DETAILS
     **************************************************/
    
    const createDetails = () => {
        const details     = document.createElement( 'div' );
        details.className = 'consent-ui--details';
        
        const closeDetails = () => {
            document.body.removeChild( details );
            window.removeEventListener( 'keydown', keyListener, false );
            
            if ( (hashtag !== '') && (document.location.hash === hashtag) ) {
                document.location.hash = '';
            }
        };
        
        // Background
        
        const detailsBackground     = document.createElement( 'div' );
        detailsBackground.className = 'consent-ui--details-background';
        details.appendChild( detailsBackground );
        
        detailsBackground.addEventListener( 'click', closeDetails );
        
        // Modal
        
        const detailsModal     = document.createElement( 'div' );
        detailsModal.className = 'consent-ui--details-modal';
        details.appendChild( detailsModal );
        
        // Details Text
        
        const detailsText     = document.createElement( 'div' );
        detailsText.className = 'consent-ui--details-text';
        detailsModal.appendChild( detailsText );
        
        detailsText.innerHTML = getText( 'details' );
        
        const createItem = ( options ) => {
            console.log( 'ui createItem', options );
            
            const { mandatory, status, label, accept, deny } = options;
            
            const item     = document.createElement( 'div' );
            item.className = 'consent-ui--item';
            item.setAttribute( 'data-mandatory', mandatory ? 'true' : 'false' );
            item.setAttribute( 'data-status', status );
            
            // Label
            
            const itemLabel     = document.createElement( 'div' );
            itemLabel.className = 'consent-ui--item-label';
            itemLabel.innerHTML = label;
            item.appendChild( itemLabel );
            
            if ( !!options.description ) {
                const itemDescription     = document.createElement( 'p' );
                itemDescription.className = 'consent-ui--item-description';
                itemDescription.innerHTML = options.description;
                itemLabel.appendChild( itemDescription );
            }
            
            if ( !!options.uri ) {
                const itemPolicyLink     = document.createElement( 'p' );
                itemPolicyLink.className = 'consent-ui--item-policy';
                itemPolicyLink.innerHTML = `<a href="${options.uri}" target="_blank">${getText( 'policyLinkLabel' )}</a>`;
                itemLabel.appendChild( itemPolicyLink );
            }
            
            // Choices
            
            const itemChoices     = document.createElement( 'div' );
            itemChoices.className = 'consent-ui--item-choices';
            item.appendChild( itemChoices );
            
            if ( mandatory ) {
                const itemMandatory     = document.createElement( 'div' );
                itemMandatory.className = 'consent-ui--item-mandatory';
                itemMandatory.innerHTML = getText( 'mandatory' );
                itemChoices.appendChild( itemMandatory );
            }
            else {
                // Accept
                
                const itemAccept     = document.createElement( 'div' );
                itemAccept.className = 'consent-ui--item-accept';
                itemChoices.appendChild( itemAccept );
                
                const acceptButton     = document.createElement( 'button' );
                acceptButton.type      = 'button';
                acceptButton.innerHTML = getText( 'accept' );
                itemAccept.appendChild( acceptButton );
                
                acceptButton.addEventListener( 'click', () => {
                    item.setAttribute( 'data-status', STATUS_TRUE );
                    accept();
                } );
                
                // Deny
                
                const itemDeny     = document.createElement( 'div' );
                itemDeny.className = 'consent-ui--item-deny';
                itemChoices.appendChild( itemDeny );
                
                const denyButton     = document.createElement( 'button' );
                denyButton.type      = 'button';
                denyButton.innerHTML = getText( 'deny' );
                itemDeny.appendChild( denyButton );
                
                denyButton.addEventListener( 'click', () => {
                    item.setAttribute( 'data-status', STATUS_FALSE );
                    deny();
                } );
            }
            
            return item;
        };
        
        const services = manager.services();
        
        // Items All
        
        const detailsAll     = document.createElement( 'div' );
        detailsAll.className = 'consent-ui--details-all';
        detailsModal.appendChild( detailsAll );
        
        detailsAll.appendChild( createItem( {
                                                'mandatory': false,
                                                'status':    services.reduce( ( status, item ) => {
                                                    console.log( item );
                
                                                    switch ( item.status ) {
                                                        case STATUS_TRUE:
                                                            if ( status === '' || status === STATUS_TRUE ) {
                                                                return STATUS_TRUE;
                                                            }
                                                            break;
                    
                                                        case STATUS_FALSE:
                                                            if ( status === '' || status === STATUS_FALSE ) {
                                                                return STATUS_FALSE;
                                                            }
                                                            break;
                    
                                                        default:
                                                            return STATUS_WAIT;
                                                    }
                                                }, '' ),
                                                'label':     getText( 'allServices' ),
                                                'accept':    () => {
                                                    manager.acceptAll();
                                                    closeDetails();
                                                },
                                                'deny':      () => manager.denyAll(),
                                            } ) );
        
        // Items
        
        const detailsItems     = document.createElement( 'div' );
        detailsItems.className = 'consent-ui--details-items';
        detailsModal.appendChild( detailsItems );
        
        services.forEach( ( item ) => detailsItems.appendChild( createItem( {
                                                                                'mandatory':   !!item.service[ 0 ].mandatory,
                                                                                'status':      item.status,
                                                                                'label':       item.service[ 0 ].name,
                                                                                'description': (!!item.service[ 0 ].description) ? item.service[ 0 ].description : false,
                                                                                'uri':         (!!item.service[ 0 ].uri) ? item.service[ 0 ].uri : false,
                                                                                'accept':      () => manager.accept( item.key ),
                                                                                'deny':        () => manager.deny( item.key ),
                                                                            } ) ) );
        
        // Details close
        
        const closeButton     = document.createElement( 'button' );
        closeButton.type      = 'button';
        closeButton.className = 'consent-ui--close';
        closeButton.innerHTML = '&times;';
        detailsModal.appendChild( closeButton );
        
        closeButton.addEventListener( 'click', closeDetails );
        
        const keyListener = ( evt ) => {
            if ( evt.keyCode === 27 ) {
                closeDetails();
            }
        };
        
        window.addEventListener( 'keydown', keyListener, false );
        
        // Init
        
        domready( () => {
            document.body.appendChild( details );
            consentUIObservable.trigger( { type: 'createDetails' } );
        } );
    };
    
    /**************************************************
     * EVENTS
     **************************************************/
    
    const requireConsent = () => createBanner( manager );
    
    if ( hashtag !== '' ) {
        window.addEventListener( 'hashchange', () => {
            if ( document.location.hash === hashtag ) {
                createDetails();
            }
        }, false );
        
        if ( document.location.hash === hashtag ) {
            domready( () => createDetails() );
        }
    }
    
    const o = {
        setManager,
        requireConsent,
        consentUIObservable: consentUIObservable,
    };
    
    return o;
};

export default consentUI;
