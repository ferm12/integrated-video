(function () {

  var kExtraParams = "ExtraParams"; 
  var trackerCookieName = "_EXT_TRACKER_COOKIE_";

  var trackerPixelServer = "http://pixel.captora.com/img/pix.gif";
  var trackerPixelServerHttps = "https://pixel.captora.com/img/pix.gif";

  var _user_cookie = "";
  var _domain_ = "";
  var _referrer_ = "";
  var _ref_query_ = "";

  var _user_state ="";

  // New functions

  var _global_page_type_ = "Non Captora";

  window.cpPixelLogUserState = function(state) {
    _user_state = state;
    pixelLog();
  }

  function getReferrerDomain() {
    if (document.referrer) {
      url = document.referrer;
      var ref = url.match(/:\/\/(.[^/]+)/)[1];
      if (ref.indexOf("google") != -1 && url.indexOf("aclk") != -1) {
        return "PPC";
      }
      return ref;
    }
    return "";
  }

  function getPageType() {
    if (_global_page_type_ == "cpage") {
      return "Captora";
    }
    if (document.URL.indexOf("/cp/") != -1) {
      return "Captora";
    }
    if (document.URL.indexOf("/cpages/") != -1) {
      return "Captora";
    }
    if (document.URL.indexOf("-topics/") != -1) {
      return "Captora";
    }
    return "Non Captora";
  }

  function getQuery() {
    var extractedParams = {}
    extractedParams = extractUrlParams(document.referrer);
    var query = "";
    if (extractedParams.q != null) {
      query = extractedParams.q;
    } else {
      if (extractedParams.query != null) {
        query = extractedParams.query;
      }
    }
    return unescape(query);
  }

  function setFreshCookie() {
    var trackerCookie = getDomainCookie(trackerCookieName).replace(/:$/g,"");
    var present = false;
    if (trackerCookie && trackerCookie.length > 0) {
      _user_cookie_ = trackerCookie;
      present = true;
    }
    // new format does not have uid=, its ckid=
    if (trackerCookie.indexOf("uid") != -1) {
      present = false;
    }

    if (!present) {
      // console.log("Cookie not found. Setting it now:");
      var randUid = Math.round(Math.random()*100000000000);
      trackerCookieValue = "ckid=" + randUid;
      referrerDomain = getReferrerDomain();
      pageType = getPageType();
      query = getQuery();
      setDomainCookie(trackerCookieValue, referrerDomain + "," + pageType + "," + query + "__SEP__", _domain_);
      // console.log("  Setting cookie:" + referrerDomain + "," + pageType + "," + query + "__SEP__");
      _user_cookie_ = getDomainCookie(trackerCookieName);
    }
    /* else {
      // console.log("Cookie found:");
      currentUrl = document.URL;
      pageType = getPageType();
      if (pageType == "Captora") {
        pixelParams['firstentry'] = "Captora";
        var cookieVal = getDomainCookie(kExtraParams);
        // console.log("  found cookie:" + cookieVal);
        var parts = cookieVal.split(",");
        var newVal = cookieVal;
        if (parts.length == 3) { 
          newVal = parts[0] + ",Captora," + parts[2] + "__SEP__";
        }
        var baseCookieVal = getDomainCookie(trackerCookieName);
        // console.log("  Setting cookie:" + newVal);
        setDomainCookie(baseCookieVal, newVal, _domain_);
      }
    }*/
  }

  function setDomainCookie(cookieValue, extraValues, domain) {
    var expiryDate = new Date();
    // console.log("Setting:" + extraValues);
    expiryDate.setDate(expiryDate.getDate() + 365*100);
    var cookie = trackerCookieName + "=" + escape(cookieValue) +
                 "__SEP__" +  kExtraParams + "=" + extraValues +
                 "; expires=" + expiryDate.toGMTString() + "; path=/";
    if (domain) {
      cookie = cookie + "; domain="+domain
    }

    document.cookie = cookie;
  }

  function getDomainCookie(cookieName) {
    if (document.cookie && (document.cookie.length > 0)) {
      var cookieIndex = document.cookie.indexOf(cookieName + "=");
      if (cookieIndex != -1) {
        cookieIndex = cookieIndex + cookieName.length + 1;
        var cookieEndIndex = document.cookie.indexOf("__SEP__",cookieIndex);
        if (cookieEndIndex == null || cookieEndIndex == -1) {
          cookieEndIndex = document.cookie.length
        }
        return unescape(document.cookie.substring(cookieIndex, cookieEndIndex));
      }
    }
    return "";
  }

  function setMAHiddenFields() {
    if (typeof(jQuery) != 'undefined') {
      jQuery(document).ready(function() {
	// console.log("DEBUG_CP: hidden fields");
	jQuery("form").each(function() {
	    var cookieVal = getDomainCookie(kExtraParams);
	    var parts = cookieVal.split(",");
	    var newVal = cookieVal;
	    if (parts.length == 3) { 
	      var origRef = parts[0];
	      var firstEntry = parts[1];
	      var searchTerm = parts[2];
	    }
	});
      });
    }
  } 


  

  // New functions end

  var pixelParams = new Object();

  window.genericTrackerPixLogFunc = function(key, val) {
    pixelParams[key] = val;
    pixelLog();
  }

  function attachHandler(goalstr, namestr, attrstr, valstr) {
    if (typeof(jQuery) != 'undefined') {
      jQuery(document).ready(function() {
        if (goalstr != "TRACKURL") {
	  jQuery("[" + attrstr + "='" + valstr + "']").change(
	    function() {
	      var val = jQuery(this).val();
	      if (val == null || val.length < 1) {
		val = "EVENT";
	      }
	      genericTrackerPixLogFunc("GOAL_" + goalstr + "_" + namestr, val);
	    }
	  );
	  jQuery("[" + attrstr + "='" + valstr + "']").click(
	    function() {
	      genericTrackerPixLogFunc("GOAL_" + goalstr + "_" + namestr, "CLICK");
	    }
	  );
	} else {
          if (document.URL.indexOf(valstr) != -1) {
            genericTrackerPixLogFunc("GOAL_" + goalstr + "_" + namestr, "TRACK");
	  }
        }
      });
    }
  }

  function extractUrlParams(url) {
    var extractedParams = {};
    var questionIndex = url.indexOf("?");
    if (questionIndex >= 0 && questionIndex + 1 < url.length) {
      var paramStr = url.substring(questionIndex + 1);
      var paramVars = paramStr.split("&");
      for (var i = 0; i < paramVars.length; i++) {
        var pair = paramVars[i].split("=");
        if (pair.length == 2) {
          extractedParams[pair[0]] = pair[1];
        }
      }
    }
    return extractedParams;
  }

  function initialize(domain) {
    _referrer_ = document.referrer;
    _domain_ = domain;
    setFreshCookie();
    refParams = extractUrlParams(_referrer_);
    if (refParams.q != null) {
      _ref_query_ = refParams.q;
    }
  }

  function extractDomain(host) {
    var parts = host.split(".");
    var n = parts.length;
    if (n <= 2) {
      return host
    }
    if (parts[n-1].length <= 2 && parts[n-2].length<=3) {
      return parts[n-3]+"."+parts[n-2]+"."+parts[n-1]
    } else {
      return parts[n-2]+"."+parts[n-1]
    }
  }

  function truncateUrl(url, max) {
    if (url == null || !url) {
      return "";
    }
    return url.length > max ? url.substring(0, max) + "..." : url;
  }

  function constructReqParameter(key, value) {
    return key + "=" + encodeURIComponent(value);
  }

  function isEmpty(str) {
    return (!str || 0 === str.length);
  }

  function constructRequestString() {
    var reqParameters = [];

    reqParameters.push(constructReqParameter("userid", _user_cookie_));
    reqParameters.push(constructReqParameter("domain", _domain_));
    if (document.referrer != null && document.referrer.length > 0) {
      reqParameters.push(constructReqParameter("referrer", truncateUrl(document.referrer, 10000)));
    }
    reqParameters.push(constructReqParameter("rand", Math.random()));
    reqParameters.push(constructReqParameter("url", truncateUrl(location.href, 10000)));
    for (var k in pixelParams) {
      reqParameters.push(constructReqParameter(k, pixelParams[k]));
    }
    if(!isEmpty(_user_state)) reqParameters.push(constructReqParameter("user_state",_user_state));
    return reqParameters.join("&");
  }

  function pixelLog() {
    var pixelRequestString = constructRequestString();
    var img = new Image();
    if (pixelRequestString.length > 8500) {
      pixelRequestString = pixelRequestString.substr(0, 8500);
    }
    var baseUrl = ("https:" == document.location.protocol) ? trackerPixelServerHttps : trackerPixelServer;
    img.src = baseUrl + "?" + pixelRequestString;
  }

  function clearCookie(cookieName) {
    var cookieDomain = extractDomain(document.domain);
    setDomainCookie(cookieName, "", cookieDomain)
  }

  function inputFunc() {
    var namestr = $(this).attr('name');
    var valstr = $(this).val();
    genericTrackerPixLogFunc("GOAL_FormField_" + namestr, valstr);
  }

  function TrackJS(domain) {
    if (typeof(jQuery) != 'undefined') {
      jQuery(document).ready(function() {
        jQuery("input").blur(inputFunc);
      });
    };

    attachHandler("Clicks", "Signup", "href", "#signup");
    attachHandler("Form field", "Email", "id", "signup-email");
    attachHandler("Form field", "FirstName", "id", "signup-full-name");
    attachHandler("Form field", "PhoneNumber", "id", "signup-phone-number");
    initialize(domain);
    setMAHiddenFields();
    pixelLog();
  }

  var localVar;
  window.ExtTrackerPix = {
    getTracker: function (domain) {
      if (!localVar) {
        localVar = new TrackJS(domain)
      }
      return localVar;
    }
  }
}());

var pix = ExtTrackerPix.getTracker("newrelic.com");