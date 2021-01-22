const getText = ( { siteName, privacyURL } ) => ( id ) => (({
    'banner':          () => `We use cookies, including third-party cookies, to provide you with the best possible navigation and to measure the frequency of our services. To find out more about our personal data protection policy, we invite you to <a href="${privacyURL}">click here</a>.`,
    'accept':          () => 'Accept',
    'deny':            () => 'Deny',
    'customise':       () => 'Customise',
    'mandatory':       () => 'Mandatory',
    'details':         () => `<h2>Managing your preferences on cookies</h2>
<p>The features of this site listed below are based on services offered by third parties.</p>
<p>If you give your consent, these third parties will deposit cookies that allow you to view on ${siteName} content hosted by these third parties or to share our content.</p>
<p>Via these cookies, these third parties will collect and use your browsing data for their own purposes, in accordance with their privacy policy (links below).</p>`,
    'allServices':     () => 'Preferences for all services',
    'policyLinkLabel': () => 'Link to the privacy policy',
})[ id ] || (() => id))();

export default getText;
