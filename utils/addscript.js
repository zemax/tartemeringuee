export default function addScript( url, id, callback, execute, attrName, attrVal ) {
	"use strict";
	let script,
		done = false;

	if ( execute === false ) {
		if ( typeof callback === 'function' ) {
			callback();
		}
	}
	else {
		script       = document.createElement( 'script' );
		script.type  = 'text/javascript';
		script.id    = (id !== undefined) ? id : '';
		script.async = true;
		script.src   = url;

		if ( attrName !== undefined && attrVal !== undefined ) {
			script.setAttribute( attrName, attrVal );
		}

		if ( typeof callback === 'function' ) {
			script.onreadystatechange = script.onload = function () {
				const state = script.readyState;
				if ( !done && (!state || /loaded|complete/.test( state )) ) {
					done = true;
					callback();
				}
			};
		}

		document.getElementsByTagName( 'head' )[ 0 ].appendChild( script );
	}
};
