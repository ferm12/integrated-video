var Swiftype = window.Swiftype || {};
Swiftype.root_url = Swiftype.root_url || "//api.swiftype.com";
if (typeof Swiftype.renderStyle === 'undefined') {
  Swiftype.renderStyle = 'nocode';
}

Swiftype.isMobile = function() {
  var ua = window.navigator.userAgent;
  if(/iPhone|iPod/.test(ua) && ua.indexOf("AppleWebKit") > -1 ) {
    return true;
  }
  if (/Android/.test(ua) && /Mobile/i.test(ua) && ua.indexOf("AppleWebKit") > -1 ) {
    return true;
  }
  return false;
};

Swiftype.loadScript = function(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = url;

  var entry = document.getElementsByTagName('script')[0];
  entry.parentNode.insertBefore(script, entry);

  if (script.addEventListener) {
    script.addEventListener('load', callback, false);
  } else {
    script.attachEvent('onreadystatechange', function() {
      if (/complete|loaded/.test(script.readyState))
        callback();
    });
  }
};

Swiftype.loadStylesheet = function(url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(link);
};

Swiftype.loadSupportingFiles = function(callback) {
  if (Swiftype.renderStyle === false) {
    Swiftype.loadScript("//swiftype-assets.a.ssl.fastly.net/assets/swiftype_no_render-c358258664bf4b4ead63a2aae79969a9.js", callback);
    Swiftype.loadStylesheet("//swiftype-assets.a.ssl.fastly.net/assets/swiftype-a33ebbf4a0b8b05774f6488421026b6d.css");
  } else if (Swiftype.isMobile()) {
    Swiftype.loadScript("//swiftype-assets.a.ssl.fastly.net/assets/swiftype_nocode-d0f84ee32cbad9857bbb6875e03093b9.js", callback);
    Swiftype.loadStylesheet("//swiftype-assets.a.ssl.fastly.net/assets/swiftype_nocode-d82cd4c105351409a16594ead04d8417.css");
  } else if (Swiftype.renderStyle === 'inline' || Swiftype.renderStyle === 'new_page') {
    Swiftype.loadScript("//swiftype-assets.a.ssl.fastly.net/assets/swiftype_onpage-ff72b24476ae4a88c9d2ec2ddb16b394.js", callback);
    Swiftype.loadStylesheet("//swiftype-assets.a.ssl.fastly.net/assets/swiftype-a33ebbf4a0b8b05774f6488421026b6d.css");
  } else {
    Swiftype.loadScript("//swiftype-assets.a.ssl.fastly.net/assets/swiftype_nocode-d0f84ee32cbad9857bbb6875e03093b9.js", callback);
    Swiftype.loadStylesheet("//swiftype-assets.a.ssl.fastly.net/assets/swiftype_nocode-d82cd4c105351409a16594ead04d8417.css");
  }

  Swiftype.loadScript("http://swiftype.com/te.js", function(){});
};

var Swiftype = (function(window, undefined) {
   Swiftype.loadSupportingFiles(function(){});
   return Swiftype;
})(window);
