<?php 
//playlist3 index
    //Required to get the header and footer from the wordpress themes folder
    define('WP_USE_THEMES', true);
    require_once( '/Library/Server/Web/Data/Sites/tvtvwebsites/tvtv2014website/wp-load.php' );
    get_header();
    global $switched;
    switch_to_blog(1);
    
?>

    <link rel="stylesheet" href="../samples.css" type="text/css" media="screen" charset="utf-8">
    <h1>imo Integrated Video Sample</h1>

    <div class="iframe" style="background:url(<?php echo get_template_directory_uri(); ?>/library/images/generic-browser.png) no-repeat 0 0; width:977px;margin-left:-8.5px">
        <div id="right-browser" style="background:url(<?php echo get_template_directory_uri()?>/library/images/right-browser.png) no-repeat 0 0"></div>
        <div class="tab-txt">imo Sample</div>
        <div class="url-txt">imo Sample</div>
        <iframe src="http://tvtvitdev6.transvideo.com/integrated-video/samples/imo/v1_optimized/" width="977" height="1400" frameborder="0" scrolling="no" seamless="seamless"></iframe>
        <div style="position:relative;width:inherit;height:1px;">
            <div class="gradiant-pos">
                <div class="gradiant"></div>
                <div class="white-bg"></div>
            </div>
        </div>
        
    </div>
    <script type="text/javascript" src="../samples.js"></script>


<?php
    restore_current_blog();
                                        
    get_footer();
?>
