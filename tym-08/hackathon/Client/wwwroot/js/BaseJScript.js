function loadJs(sourceUrl) {
	if (document.querySelector(`script[src="${sourceUrl}"]`) !== null) {
		document.body.removeChild(document.querySelector(`script[src="${sourceUrl}"]`));
    }

	if (sourceUrl.Length == 0) {
		console.error("Invalid source URL");
		return;
	}

	var tag = document.createElement('script');
	tag.src = sourceUrl;
	tag.type = "text/javascript";

	tag.onload = function () {
		console.log("Script loaded successfully");

		//if (sourceUrl == "https://api.mapy.cz/loader.js") {
		//	Loader.load();
		//}
	}

	tag.onerror = function () {
		console.error("Failed to load script");
	}

	document.body.appendChild(tag);

	return true;
}

function isMyScriptLoaded(url) {
	console.log(url);

	var scripts = document.getElementsByTagName('script');
	console.log(scripts);

	for (var i = scripts.length; i--;) {
		if (scripts[i].src == url) return true;
	}
	return false;
}