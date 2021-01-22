const getText = ( { siteName, privacyURL } ) => ( id ) => (({
    'banner':          () => `Nous utilisons des cookies, y compris des cookies tiers afin de vous proposer la meilleure navigation possible et de mesurer la fréquentation de nos services. Pour en savoir plus sur notre politique de protection des données personnelles, nous vous invitons à <a href="${privacyURL}">cliquer ici</a>.`,
    'accept':          () => 'Accepter',
    'deny':            () => 'Refuser',
    'customise':       () => 'Personnaliser',
    'mandatory':       () => 'Nécessaire',
    'details':         () => `<h2>Gestion de vos préférences sur les cookies</h2>
<p>Les fonctionnalités de ce site listées ci-dessous s’appuient sur des services proposés par des tiers (flux Twitter, vidéos, etc.).</p>
<p>Si vous donnez votre accord (consentement), ces tiers déposeront des cookies qui vous permettront de visualiser directement sur ${siteName} du contenu hébergé par ces tiers ou de partager nos contenus.</p>
<p>Via ces cookies, ces tiers collecteront et utiliseront vos données de navigation pour des finalités qui leur sont propres, conformément à leur politique de confidentialité (liens ci-dessous).</p>`,
    'allServices':     () => 'Préférences pour tous les services',
    'policyLinkLabel': () => 'Lien vers la politique de confidentialité',
})[ id ] || (() => id))();

export default getText;
