<?php
    date_default_timezone_set('UTC');
    $timestamp = date("YmdHs");

    if (isset($_GET['debug'])) {
        $timestamp = "1";
    }
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if IE 9]>         <html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title>Home | Tocata</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="stylesheet" href=" ..//web.tocatamobile.com/wp-content/plugins/theme-my-login/theme-my-login.css?ver=6.3.8">
<link rel="stylesheet" href=" ../web.tocatamobile.com/wp-content/plugins/wsi/style/jqueryTools/overlay-basic.css">
<link rel="stylesheet" href=" ../web.tocatamobile.com/wp-content/plugins/theme-my-login/modules/ajax/css/ajax.css">
<link rel="stylesheet" href="https://fast.fonts.com/cssapi/99a34878-937d-4451-832d-0258f40e0a35.css?ver=1370966333">
<link rel="stylesheet" href=" ../web.tocatamobile.com/wp-content/themes/tocata/style.css?ver=1-0-0">

<style>
    .flex-home #learnmore {
        background-image: url(images/learnhow.png?v=<?php echo $timestamp; ?>);
        background-repeat: no-repeat;
    }

    .flex-home #learnmore:hover {
        background-position: 0 0;
    }

    .flex-home #learnmore-play {
        background-image: url(images/video-play-sm.png?v=<?php echo $timestamp; ?>);
    }
    
    #video {
        top: 143px;
    }
    
    #stop {
        left: 20px;
        background-image: url(images/video-stop-sm.png);
    }
    
    .show-it {
        opacity: 1 !important;
    }
</style>

<script type='text/javascript' src='../web.tocatamobile.com/wp-content/plugins/wsi/js/jQueryTools/jquery.tools.min.wp-front.v2.js'></script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-includes/js/jquery/jquery.js?ver=1.8.3'></script>
<script type='text/javascript'>
/* <![CDATA[ */
var wpAjax = {"noPerm":"You do not have permission to do that.","broken":"An unidentified error has occurred."};
/* ]]> */
</script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-includes/js/wp-ajax-response.min.js'></script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-content/plugins/theme-my-login/modules/ajax/js/ajax.js'></script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-content/themes/tocata/assets/js/vendor/modernizr-2.6.2.min.js'></script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-content/themes/tocata/assets/js/vendor/jquery.ddSlick.min.js'></script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-content/themes/tocata/assets/js/vendor/jquery.isotope.min.js'></script>

<meta name='Vzaar' content='1.2' />

<!-- All in One SEO Pack 2.0.2 by Michael Torbert of Semper Fi Web Design[439,446] -->
<link rel="canonical" href="http://www.tocatamobile.com/" />
<!-- /all in one seo pack -->
	<link rel="canonical" href="http://www.tocatamobile.com/">
  <link rel="alternate" type="application/rss+xml" title="Tocata Feed" href="http://www.tocatamobile.com/feed/">
  <link rel="icon" type="image/x-icon" href="http://www.tocatamobile.com/favicon.ico" />
  <script>
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-24053025-1']);
  _gaq.push(['_setCookiePath', '/webfonts/']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  </script>
</head>

<body class="home page page-template page-template-template-home-php">

  <div id="top"></div>

  <div class="container">
      
    <header class="clearfix">
      <div id="logo" class="six columns alpha">
        <a href="http://www.tocatamobile.com" alt="Tocata"></a>
      </div>
      <nav class="ten columns omega">
        <div class="menu-toolbar-container"><ul id="menu-toolbar" class="menu"><li id="menu-item-35" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-35"><a href="http://blog.tocatamobile.com/blog/">Blog</a></li>
<li id="menu-item-177" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-177"><a href="http://www.tocatamobile.com/contact-us/">Contact Us</a></li>
<li id="menu-item-37" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-37"><a href="#login_modal">Login</a></li>
<li id="menu-item-284" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-284"><a href="http://www.tocatamobile.com/logout/?_wpnonce=de18687f37">Log Out</a></li>
<li id="menu-item-283" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-283"><a href="http://www.tocatamobile.com/client/tutorials/">Tutorials</a></li>
<li id="menu-item-80" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-80"><a title="Get Started" href="/demo">Get Started</a></li>
</ul></div>        <div class="menu-primary-navigation-container"><ul id="menu-primary-navigation" class="menu"><li id="menu-item-74" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-74"><a href="http://www.tocatamobile.com/build/">Build</a></li>
<li id="menu-item-97" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-97"><a href="http://www.tocatamobile.com/brands/">Experience</a></li>
<li id="menu-item-51" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-51"><a href="http://www.tocatamobile.com/learn/">Learn</a></li>
<li id="menu-item-202" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-202"><a href="http://www.tocatamobile.com/company/who-we-are/">Meet</a>
<ul class="sub-menu">
	<li id="menu-item-201" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-201"><a href="http://www.tocatamobile.com/company/news/in-the-news/">In The News</a></li>
	<li id="menu-item-200" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-200"><a href="http://www.tocatamobile.com/company/news/press-releases/">Press Releases</a></li>
	<li id="menu-item-48" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-48"><a href="/company/who-we-are#careers">Careers</a></li>
	<li id="menu-item-203" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-203"><a href="http://www.tocatamobile.com/contact-us/">Contact Us</a></li>
</ul>
</li>
</ul></div>      </nav>
    </header>
    
  </div><div class="header-grey">
    <div class="container front">
        <div class="sixteen columns flex-holder">
        		
            <div class="flex-home">
                <h1>Mobile</h1>
<h1>shopping</h1>
<h1>that delivers</h1>
<h1>big results.</h1>
                <a href="#video-overlay" id="learnmore" data-video-id="1258573"></a>
                <!-- <a href="#video&#45;overlay" id="learnmore&#45;play" data&#45;video&#45;id="1258573"></a> -->
            </div>
            <div class="flexslider">
                <ul class="slides">
                                        <li><span class="slide-container"><img src="../web.tocatamobile.com/wp-content/uploads/2013/05/phone.png" alt="slide"></span></li>
                                        <li><span class="slide-container"><img src="../web.tocatamobile.com/wp-content/uploads/2013/05/tablet21.png" alt="slide"></span></li>
                                        <li><span class="slide-container"><img src="../web.tocatamobile.com/wp-content/uploads/2013/05/tablet1.png" alt="slide"></span></li>
                                    </ul>
            </div>
            <div id="video-wrapper">
        		<a href="#" id="stop"></a>
            <video id="video" width="960" height="540" preload="auto" autobuffer>
            		<source src="videos/mst_revel_touch_integrated_nowhite_nohand_cropped_09_apple_prores4444.mp4?v=<?php echo $timestamp; ?>" type="video/mp4" />
                <source src="videos/mst_revel_touch_integrated_nowhite_nohand_cropped_09_apple_prores4444.webm?v=<?php echo $timestamp; ?>" type="video/webm" />
            </video>
            </div><!-- end #video-wrapper -->
            <div id="video-overlay-1258573" class="overlay">
							<a href="#" class="close-overlay-link"><span>Close</span></a>
            	<div class="iframe-wrap"><iframe allowfullscreen="" allowtransparency="true" class="vzaar-video-player" id="vzvd-1258573" mozallowfullscreen="" name="vzvd-1258573" src="http://view.vzaar.com/1258573/player" title="vzaar video player" type="text/html" webkitallowfullscreen="" frameborder="0" height="432" width="768"></iframe></div>
            </div>
        </div>
        
    </div>
</div>
<div class="container home-body">
        <article class="row staggered" id="section_1">
                <!-- Right Aligned -->
        <aside class="six columns alpha" role="content">
                            <span class="image-heading"><img src="../web.tocatamobile.com/wp-content/uploads/2013/05/how-it-works.png" alt=""></span>
                        <h2>Step 1: Integrate
</h2>
            <p>your existing ecommerce systems—including your merchandising data and product catalog—with Tocata.</p>
<p><a class="next" href="javascript:;" data-num="1">Next: Create</a></p>
        </aside>
        <section class="ten columns omega image-right" role="image">
                        <img src="../web.tocatamobile.com/wp-content/uploads/2013/05/integrate1.png" class="inside">        </section>
            </article>
        <article class="row staggered" id="section_2">
                <!-- Left Aligned -->
        <section class="ten columns alpha image-left" role="image">
                        <img src="../web.tocatamobile.com/wp-content/uploads/2013/05/build.png" class="outside">        </section>
        <aside class="six columns omega" role="content">
                        <h2>Step 2: Create
</h2>
            <p>your mobile experiences once, using our cutting-edge creative platform with the flexibility to produce custom looks for your brand.</p>
<p><a class="next" href="javascript:;" data-num="2">Next: Deploy</a></p>
            <p></p>
        </aside>
            </article>
        <article class="row staggered" id="section_3">
                <!-- Right Aligned -->
        <aside class="six columns alpha" role="content">
                        <h2>Step 3: Deploy
</h2>
            <p>everywhere, on tablets, smartphones, desktops, in-store, as apps or HTML5.</p>
<p><a href="/build">Learn More</a></p>
        </aside>
        <section class="ten columns omega image-right" role="image">
                        <img src="../web.tocatamobile.com/wp-content/uploads/2013/05/publish1.png" class="outside">        </section>
            </article>
    </div>


  <!-- end .container -->
  <footer>
    <div id="logos"><a href="/brands/">Brands</a></div>
    <div id="copyright">
      <div class="container">
        <div class="eight columns alpha">
          <ul>
          	            <li class="one">Copyright 2013</li>
                                    <li class="two">All Rights Reserved</li>
                                    <li><a href=" ../atre.net" target="_blank">Site Credits</a></li>
            <li></li>
          </ul>
        </div>
        <div class="eight columns omega contact-info">
            <ul>
            	<li class="contact">
              	                	<a class="email" href="mailto:info@tocatamobile.com"><span class="red">info</span><span class="orange">@tocatamobile</span><span>.com</span></a>
                                                <span>(877) 215-7736</span>
                              </li>
                            <li class="twitter social"><a href="https://twitter.com/RevelTouch">Twitter</a></li>
                                          <li class="facebook social"><a href="https://www.facebook.com/pages/Revel-Touch/230236803697540">Facebook</a></li>
                                          <li class="linkedin social"><a href=" ../www.linkedin.com/company/2411589">LinkedIn</a></li>
                                          <li class="youtube social"><a href="http://www.youtube.com/user/RevelTouch">YouTube</a></li>
                          </ul>
        </div>
      </div>
    </div>
  </footer>
    <div id="login_modal" style="display:none;width: 300px;height: 300px;">
    <form name="loginform" id="loginform" action="http://www.tocata.dev/login" method="post" _lpchecked="1">
        <p>
            <label for="user_login">Username<br>
            <input type="text" name="log" id="user_login" class="input" value="" size="20" style="background-image: url(data:image/gif;base64,R0lGODlhEAAQAMQAAHgAFq9RZp8BJfT09JkCJKUuSO/q6/n//vHh5YYBGvf6+tOyucB0hsuLmpUiOpIAHIgJJtzFy7pneuvT2fP49/Dw8L5/juS+x8Scpn4BHaMDJ3cAHHQAG6YDKHEAGv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkZCN0YxMTc0MDcyMDY4MTFCRURDRjg2RUEzOUI0MjBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUyQjY0RUJGQTQ2QzExRTA5MkM2OTcwNjIwMUM1QjhFIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUyQjY0RUJFQTQ2QzExRTA5MkM2OTcwNjIwMUM1QjhFIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkE3RjExNzQwNzIwNjgxMTkyQjA4Nzg0MUEyMjBGMUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkI3RjExNzQwNzIwNjgxMUJFRENGODZFQTM5QjQyMEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAEAAQAAAFmGAnjmTZaSgqCCqbautKdMVaOEQsEDkRTAjN44IIyHi8R+DzYRSYjAcy+Ug0PojJZ/HoUh2BgGRwOCga4UK3uiwP3mSmJVFNBBQVQwWuVzASgAkQDmAVFIcShBCAGY0ZAAsHEZEREACOjgABBxQBDhUHFpeNG6UcDhgLHgCpBQClsKUeHBAeGxkctrAcvL2zub2+HsPExcYhADs=); padding-right: 18px; background-attachment: scroll; border: 1px solid rgb(192, 31, 47); width: 262px; background-position: 100% 50%; background-repeat: no-repeat no-repeat;"></label>
        </p>
        <p>
            <label for="user_pass">Password<br>
            <input type="password" name="pwd" id="user_pass" class="input" value="" size="20" style="background-image: url(data:image/gif;base64,R0lGODlhEAAQAMQAAHgAFq9RZp8BJfT09JkCJKUuSO/q6/n//vHh5YYBGvf6+tOyucB0hsuLmpUiOpIAHIgJJtzFy7pneuvT2fP49/Dw8L5/juS+x8Scpn4BHaMDJ3cAHHQAG6YDKHEAGv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkZCN0YxMTc0MDcyMDY4MTFCRURDRjg2RUEzOUI0MjBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUyQjY0RUJGQTQ2QzExRTA5MkM2OTcwNjIwMUM1QjhFIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUyQjY0RUJFQTQ2QzExRTA5MkM2OTcwNjIwMUM1QjhFIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkE3RjExNzQwNzIwNjgxMTkyQjA4Nzg0MUEyMjBGMUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkI3RjExNzQwNzIwNjgxMUJFRENGODZFQTM5QjQyMEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAEAAQAAAFmGAnjmTZaSgqCCqbautKdMVaOEQsEDkRTAjN44IIyHi8R+DzYRSYjAcy+Ug0PojJZ/HoUh2BgGRwOCga4UK3uiwP3mSmJVFNBBQVQwWuVzASgAkQDmAVFIcShBCAGY0ZAAsHEZEREACOjgABBxQBDhUHFpeNG6UcDhgLHgCpBQClsKUeHBAeGxkctrAcvL2zub2+HsPExcYhADs=); padding-right: 18px; background-attachment: scroll; border: 1px solid rgb(192, 31, 47); width: 262px; background-position: 100% 50%; background-repeat: no-repeat no-repeat;"></label>
        </p>
    <input type="hidden" name="_wp_original_http_referer" value="/">
        <p class="forgetmenot"><label for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever"> Remember Me</label></p>
        <p class="submit">
            <input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="Log In">
            <input type="hidden" name="testcookie" value="1">
        </p>
    </form>
  </div>
    <div id="video-underlay" class="underlay"></div>
  <script type='text/javascript' src='../web.tocatamobile.com/wp-content/themes/tocata/assets/js/vendor/jquery.smoothScroll.min.js'></script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-content/themes/tocata/assets/js/vendor/jquery.fitvids.js'></script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-content/themes/tocata/assets/js/vendor/jquery.leanModal.min.js'></script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-content/themes/tocata/assets/js/vendor/jquery.flexslider-min.js'></script>
<script type='text/javascript' src='../web.tocatamobile.com/wp-content/themes/tocata/assets/js/plugins.js'></script>

<script type='text/javascript' src='js/main.js?v=<?php echo $timestamp; ?>'></script>
  <!-- Start of Async HubSpot Analytics Code -->
  <script>
    (function(d,s,i,r) {
      if (d.getElementById(i)){return;}
      var n=d.createElement(s),e=d.getElementsByTagName(s)[0];
      n.id=i;n.src='//js.hubspot.com/analytics/'+(Math.ceil(new Date()/r)*r)+'/233979.js';
      e.parentNode.insertBefore(n, e);
    })(document,"script","hs-analytics",300000);
  </script>
  <!-- End of Async HubSpot Analytics Code -->
  </body>
</html>
