<?php 
//samples page

    //Required to get the header and footer from the wordpress themes folder
    define('WP_USE_THEMES', true);
    require_once( '/Library/Server/Web/Data/Sites/tvtvwebsites/tvtv2014website/wp-load.php' );
    get_header();
    global $switched;
    switch_to_blog(1);
    
?>
    <h1>Integrated Video Samples</h1>
    <link rel="stylesheet" href="tabs.css" type="text/css" media="screen" charset="utf-8">
<!-- box&#45;shadow:0px 0px 20px rgba(0,0,0,0.25) -->
    <div style="width:1000px;border-radius:5px 5px 0px 0px;">
    <div id='browser' style="background:url(<?php echo get_template_directory_uri(); ?>/library/images/browser-bar-top.png) no-repeat 0 0;height:35px;">
        <div id="right-browser" style="background:url(<?php echo get_template_directory_uri()?>/library/images/right-browser-short.png) no-repeat 0 0;x"></div>

        <ul>
            <li class='first-li active'>
                <a href='javascript:void();'>
                    <span id="iframe-1" style="background:url(<?php echo get_template_directory_uri(); ?>/library/images/browser-tab-selected-short.png) no-repeat 0 0;z-index:2">
                        &nbsp;&nbsp;&nbsp;&nbsp;Oxygen Cloud
                    </span>
                    <div></div>
                </a>
            </li>
            <li>
                <a href='javascript:void();'>
                    <span id="iframe-2" style="background:url(<?php echo get_template_directory_uri(); ?>/library/images/browser-tab-unselected-short.png) no-repeat 0 0;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tocata
                    </span>
                </a>
            </li>
            <li>
                <a href='javascript:void();'>
                    <span id="iframe-3" style="background:url(<?php echo get_template_directory_uri(); ?>/library/images/browser-tab-unselected-short.png) no-repeat 0 0;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imo
                    </span>
                </a>
            </li>
            <li>
                <a href='javascript:void();'>
                    <span id="iframe-4" style="background:url(<?php echo get_template_directory_uri(); ?>/library/images/browser-tab-unselected-short.png) no-repeat 0 0;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Relic
                    </span>
                </a>
            </li>
            <!-- <li> -->
            <!--     <a href='javascript:void();'> -->
            <!--         <span id="iframe&#45;5" style="background:url(<?php echo get_template_directory_uri(); ?>/library/images/browser&#45;tab&#45;unselected&#45;short.png) no&#45;repeat 0 0;"> -->
            <!--             &#38;nbsp;&#38;nbsp;&#38;nbsp;&#38;nbsp;&#38;nbsp;Biba Sample -->
            <!--         </span> -->
            <!--     </a> -->
            <!-- </li> -->

        </ul>
    </div>
    <div class="clear"></div>
    <div id='browser-bar-bottom' style="background:url(<?php echo get_template_directory_uri(); ?>/library/images/browser-bar-bottom.png) no-repeat 0 0"><span id="url-address"><span class="url-address">Oxygen Cloud</span>&nbsp;Sample IV</span></div>
    <div id='iframes'>
    <?php 
        if(wp_is_mobile()){
            $style = "";
        }else{
            $style ="display:none";
        }
    ?>
        <div class="iframe iframe-2" style="<?php echo $style; ?>">
            <iframe src="<?php echo network_home_url(); ?>integrated-video/samples/tocata/v1_optimized/" width="998" height="1300" frameborder="0" scrolling="no"></iframe>
            <div style="position:relative;width:inherit;height:1px;">
                <div class="gradiant-pos">
                    <div class="gradiant"></div>
                    <div class="white-bg"></div>
                </div>
            </div>
        </div>

        <div class="iframe iframe-3" style="<?php echo $style; ?>">
            <iframe src="<?php echo network_home_url(); ?>integrated-video/samples/imo/v1_optimized/" width="998" height="1300" frameborder="0" scrolling="no"></iframe>
            <div style="position:relative;width:inherit;height:1px;">
                <div class="gradiant-pos">
                    <div class="gradiant"></div>
                    <div class="white-bg"></div>
                </div>
            </div>
        </div>

        <div class="iframe iframe-4" style="<?php echo $style; ?>">
            <iframe src="<?php echo network_home_url(); ?>integrated-video/samples/newrelic/v1_optimized/" width="998" height="1300" frameborder="0" scrolling="no"></iframe>
            <div style="position:relative;width:inherit;height:1px;">
                <div class="gradiant-pos">
                    <div class="gradiant"></div>
                    <div class="white-bg"></div>
                </div>
            </div>
        </div>

        <!-- <div class="iframe iframe&#45;5"> -->
        <!--     <iframe src="<?php echo network_home_url(); ?>integrated&#45;video/samples/biba/v1/" width="999" height="1300" frameborder="0" scrolling="no"></iframe> -->
        <!--     <div style="position:relative;width:inherit;height:1px;"> -->
        <!--         <div class="gradiant&#45;pos"> -->
        <!--             <div class="gradiant"></div> -->
        <!--             <div class="white&#45;bg"></div> -->
        <!--         </div> -->
        <!--     </div> -->
        <!-- </div> -->

        <div class="iframe iframe-1">
            <iframe src="<?php echo network_home_url(); ?>integrated-video/samples/oxygencloud/v3_ibm_optimized/" width="998" height="1300" frameborder="0" scrolling="no"></iframe>
            <div style="position:relative;width:inherit;height:1px;">
                <div class="gradiant-pos">
                    <div class="gradiant"></div>
                    <div class="white-bg"></div>
                </div>
            </div>
        </div>


    </div>
</div>


    <script type="text/javascript" src="tabs.js"></script>

<?php
    restore_current_blog();
                                        
    get_footer();
?>
