<?php get_header();

  if (is_home() && get_option('page_for_posts') ) {
    $page_for_posts = get_option( 'page_for_posts' );

    $img = wp_get_attachment_image_src( get_post_thumbnail_id( $page_for_posts ), 'full' ); 
    $featured_image = $img[0];
  }
?>

<?php
  // $dominant_color  = get_post_meta( $page_for_posts, 'dominant_color', true );
  // $dominant_color_css = str_replace('[', 'background-color:rgb(', $dominant_color);
  // $dominant_color_css = str_replace(']', ')', $dominant_color_css);
?>
<!-- 
  <div class="thumbnail-wrapper" style="<?php // echo $dominant_color_css; ?>">
    <img src="<?php // echo $featured_image; ?>">
  </div>
 -->
  <main role="main" class="container">
    <h2 class="blog-title">Botwiki Blog</h2>
    <div class="mt-5">
			<!-- <h1><?php
      // _e( 'Latest posts', 'botwiki' ); ?>
      </h1> -->
			<?php get_template_part('loop-blog'); ?>
			<?php get_template_part('pagination'); ?>
      <h3>Wait, there's more!</h3>
      <ul>
        <li>follow us at <a href="https://twitter.com/botwikidotorg">@botwikidotorg</a></li>
        <li>keep up with new bots and blog updates via <a href="https://twitter.com/newonbotwiki">@newonbotwiki</a></li>
        <li>check out our <a href="/learn/#blogs-and-websites">blogroll</a></li>
        <li><a href="/about/team">meet the team</a></li>
      </ul>
		</div>
	</main>
<?php get_footer(); ?>
