<?php 
//playlist3 index
    //Required to get the header and footer from the wordpress themes folder
    define('WP_USE_THEMES', true);
    require_once( '/Library/Server/Web/Data/Sites/tvtvwebsites/tvtv2014website/wp-load.php' );
    get_header();
    global $switched;
    switch_to_blog(1);
    
?>
    <div class="content">
        
        <article id="post-23"  role="article" itemscope itemtype="http://schema.org/BlogPosting" class="feature iv-page-content"> 
            <header class="article-header">
                                                    <h1 class="page-title">The vision behind the Page</h1>
            </header> <!-- end article header -->

            <section class="entry-content clearfix" itemprop="articleBody">
                <img width="960" height="203" src="<?php echo network_home_url();?>/wp-content/uploads/2014/03/iv_featured.jpg" class="attachment-full wp-post-image" alt="iv_featured" />
                <p>It&#8217;s a simple, creative approach that makes online videos work gracefully with existing website elements, rather than treating them like an afterthought, and making them look more like post-it notes slapped onto a slick brochure. Using this new approach assures webpage integrity and branding while maximizing valuable online real estate.</p>
            </section> <!-- end article section -->

            <footer class="article-footer">
                <p class="clearfix"></p>

            </footer> <!-- end article footer -->

            
        </article> <!-- end article -->
        
        <article id="iv-experience" class="spotlight">
            <h1><span>The Integrated Video Experience</span></h1>
            <div class="row">
                <div>
                    <img src="<?php echo get_template_directory_uri();?>/library/images/misc/iv_explanation.jpg" alt="" width="460" height="157" alt="IV Explanation" />
                </div><!--
                
                --><div>
                    <p>
                        This web-page demonstrates just a few simple examples of Integrated Video... a more elegant merger of traditional content with cinematic video.
                        Hover around and play buttons will appear. Click on them and see how it works!.
                    </p>
                    <p>
                        It’s simply a more enjoyable on-line experience. Integrated Video seemlessly launches high quality video from within page content, while maintaining existing SEO & links.
                        And because it’s just video hidden under page elements, it provides the benefits of video, such as increased conversion while making more efficient use of website real estate.
                        Once a visitor experiences this, they may be antisipating the discovery of more video content on other pages. Looking for that play button to appear. Will they find yours?
                    </p>
                    <p>
                        <a href="<?php echo network_home_url();?>/integrated-video/samples/">View Integrated Video Samples</a>
                    </p>
                </div>
            </div>
        </article>
        
        <article id="how-it-works" class="spotlight">
            <h1><span>How it works</span></h1>
            <img src="<?php echo get_template_directory_uri(); ?>/library/images/misc/iv_how_it_works.jpg" alt="" width="960" height="428" alt="IV - How it works" />
            <br/><br/>
            <p>
                <em>This web programming is not anything new or too complicated - in fact it’s just simple HTML5. 
                But the design of videos using guidelines that carefully consider how smoothly the video integrates into the page design is a rather new concept.</em>
            </p>
            <br/><br/>
            
            <div class="row">
                <div>
                    <h3>STEP 1</h3>
                    <p>
                        A portion of a typical homepage may have the usual text, graphics, and a still-frame placeholder for a video, 
                        and look similar to this example.
                    </p>
                    <p>
                        But by using a more “integrated” approach, more videos are able to be embedded behind other less utilized 
                        text and graphic areas, awaiting visitor interaction to pass over the text or graphics, revealing play buttons...
                    </p>
                </div><!--
                
                --><div>
                    <h3>STEP 2</h3>
                    <p>
                        Transitions from text/graphics to motion video are smooth and elegant, 
                        without the usual black frames flashing, pop-out windows, or other 
                        disruptive events. 
                    </p>
                </div>
            </div>
        </article>

        <article id="case-study" class="spotlight">
            <h1><span>CASE STUDY</span></h1>
            <p>Findly Overview Video</p>
            <p>
                But by using a more integrated approach, more videos are able to be embedded behind other less utilized text and graphic areas, awaiting visitor interaction to pass over the text or graphics, revealing play buttons...
            </p>

            <img src="<?php echo get_template_directory_uri()?>/library/images/misc/findly.1.png" width="700" alt="Findly Overview" />
            <p>Clicking on a playbutton launches a video</p>
            

            <img src="<?php echo get_template_directory_uri()?>/library/images/misc/findly.2.png" width="700" alt="Findly on demand" />
            <p>After the video is done the play buttons appear automatically</p>
            
        </article>

    </div> <!-- end #content -->

<script type="text/javascript" charset="utf-8">
    (function(){
        document.title ="Integrated Video » Transvideo Studios LLC";
        $('#menu-item-47').css({'background': 'rgba(99, 94, 94, 0.3)'});
    })();
</script>

<?php
    restore_current_blog();
    get_footer();
?>
