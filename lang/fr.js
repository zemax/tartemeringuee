const getText = ( { privacyURL } ) => ( id ) => ({
	'banner':          () => `En cliquant sur Accepter, vous consentez au dépôt de cookies internes et tiers destinés à la navigation sur le site internet, à l’identification éventuelle, à réaliser des statistiques, à vous proposer éventuellement des offres adaptées à vos centres d’intérêts, et à la mise en relation avec des réseaux sociaux/sites internet. Pour consulter la politique de protection des données, cliquez sur&nbsp;: <a href="${privacyURL}">En savoir&nbsp;+</a>`,
	'accept':          () => 'Accepter',
	'deny':            () => 'Refuser',
	'customise':       () => 'Personnaliser',
	'details':         () => `<h2>Gestion de vos préférences sur les cookies</h2>
<p>Les fonctionnalités de ce site listées ci-dessous s’appuient sur des services proposés par des tiers.</p> 
<p>Si vous donnez votre accord (consentement), ces tiers déposeront des cookies qui vous permettront de visualiser du contenu hébergé par ces tiers ou de partager nos contenus.</p> 
<p>Via ces cookies, ces tiers collecteront et utiliseront vos données de navigation pour des finalités qui leur sont propres, conformément à leur politique de confidentialité (lien ci-dessous).</p> 
<p>Cette page vous permet de donner ou de retirer votre consentement, soit globalement soit finalité par finalité.</p>`,
	'allServices':     () => 'Préférences pour tous les services',
	'policyLinkLabel': () => 'Lien vers la politique de confidentialité',
})[ id ]();

export default getText;
