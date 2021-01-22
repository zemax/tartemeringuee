# Tarte meringuée

_Quite personnal tool to manage cookies consent for GDPR compliance purpose_

The tool is inspired (forked ?) from tarteaucitron.js, rewritten for my use cases and build process.

- ES6 imports
- Separate UI and Model
- Separate services in modules

## Setup example

```javascript
import consentUI from "tartemeringuee/consent-ui";
import consentManager from "tartemeringuee/consent-manager";
import getTextEN from "tartemeringuee/lang/en";
import getTextFR from "tartemeringuee/lang/fr";

import gtag from "tartemeringuee/services/gtag";
import yandex from "tartemeringuee/services/yandex";

consentManager()
    .register( gtag( 'UA-XXXXXX-1' ) )
    .register( yandex( {
                           id:                  999999999,
                           clickmap:            true,
                           trackLinks:          true,
                           accurateTrackBounce: true,
                           webvisor:            true
                       } ) )
    .setUI( consentUI( {
                           'getText': (document.documentElement.getAttribute( 'lang' ) === 'en-US')
                                      ? getTextEN( { 'privacyURL': '/en/legal-notices/' } )
                                      : getTextFR( { 'privacyURL': '/fr/mentions-legales/' } )
                       } ) )
    .launch();
```

## Service structure

Each service is an Object; the structure is based on tarteaucitron's services.

```
{
    'key':          'xxxx', 
    'type':         '',
    'name':         '',
    'description':  '',
    'uri':          'https://xxxx',
    'cookies':      [],
    'init':         () => true,
    'accept':       () => true,
    'refuse':       () => true,
}
```

- **key** : the cookie key to store consent. Multiple services can share the same key.
- **type** : (optional) category; not used for now
- **name** : the name to display in the details window
- **description** : (optional) description to display in the details window
- **uri** : (optional) privacy policy link to display in the details window
- **cookies** : (optional) array of cookie names used by the service
- **init** : function called when registering the service
- **accept** : function called when the service is accepted, ie. when mandatory or when consent is given
- **refuse** : function called when the service is rejected

## ConsentManager

### Options

```
consentManager({
    cookieName: 'tarteaucitron',
    showMandatoryWaiting: false,
});
```

- **cookieName** : the cookie name; defaults to _tarteaucitron_
- **showMandatoryWaiting** : display the banner even when services are mandatory; defaults to _false_

### API

The ConsentManager returns an onbject with the followin properties :

```
{
        setUI,
        register,
        launch,
        accept,
        deny,
        acceptAll,
        denyAll,
        services
}
```

## Consent UI

The ConsentUI is an object implementing the following methods :

- **setManager** : to set the manager
- **requireConsent** : to lanuch the banner
