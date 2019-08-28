const getText = ( { privacyURL } ) => ( id ) => ({
	'banner':          () => `By clicking on Accept, you consent to the deposit of internal and third party cookies intended for navigation on the website, to the possible identification, to carry out statistics, to propose to you possibly offers adapted to your centers of interests, and to linking with social networks / websites. To view the data protection policy, click on&nbsp;: <a href="${privacyURL}">Read more&nbsp;+</a>`,
	'accept':          () => 'Accept',
	'deny':            () => 'Deny',
	'customise':       () => 'Customise',
	'details':         () => `<h2>Managing your preferences on cookies</h2>
<p>The features of this site listed below are based on services offered by third parties.</p> 
<p>If you give your consent, these third parties will deposit cookies that allow you to view content hosted by these third parties or to share our content.</p> 
<p>Via these cookies, these third parties will collect and use your browsing data for their own purposes, in accordance with their privacy policy (link below).</p> 
<p>This page allows you to give or withdraw your consent, either globally or purpose by purpose.</p>`,
	'allServices':     () => 'Preferences for all services',
	'policyLinkLabel': () => 'Link to the privacy policy',
})[ id ]();

export default getText;
