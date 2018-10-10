<div class="container mt-5">
  <div class="row list">
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
      <div class="col-sm-12 col-md-6 col-lg-4 list-item">

        <div class="card mb-3">
        <!-- article -->
        <?php
          $is_external = false;
          $link_url = get_post_meta( $post->ID, 'resource_url', true );
          if ( empty( $link_url ) ){
            $link_url = get_post_permalink( $post->ID );
          }
          else{
            $is_external = true;
          }

          if ( has_post_thumbnail()){ ?>
            <a href="<?php echo $link_url; ?>" title="<?php  get_the_title(); ?>">
              <?php 
                $post_thumbnail_id = get_post_thumbnail_id();
                the_post_thumbnail('post-thumbnail', ['data-src' => get_the_post_thumbnail_url( $post_thumbnail_id ),'class' => 'lazy-load card-img-top', 'title' => get_post($post_thumbnail_id)->post_title ]);
              ?>
            </a>
          <?php } ?>
          <div class="card-body" id="post-<?php the_ID(); ?>">
            <h5 class="card-title"><a href="<?php echo $link_url; ?>" title="<?php get_the_title(); ?>"><?php the_title(); ?></a></h5>
            <p class="card-text">   
            <?php
              bw_excerpt('html5wp_index');
              $post_id = get_the_ID();
              $post_type = get_post_type( $post_id );
              $post_meta = get_post_meta( $post_id );
            ?>
            <!-- post details -->
            <?php if ( is_home() || $post_type == 'tutorial' ){ 
              $post_date = get_the_time('F j, Y');
              $post_date_full = $post_date . ' ' . get_the_time('g:i a');
              $m = new \Moment\Moment($post_date);
              $post_date_ago = $m->fromNow()->getRelative();
            ?>

            <p><em>Posted <span title="<?php echo $post_date; ?>"><?php echo $post_date_ago; ?></span>
              by <a href="<?php echo get_author_posts_url($author_id, get_the_author_meta('user_nicename', $author_id)); ?>"><?php echo get_the_author_meta('nickname', $author_id); ?></a></em></p>
            <?php } ?>

            </p>
        <!-- /post thumbnail -->


            </div>
            <div class="card-footer text-muted">
              <ul class="btn-list mb-0">
                <li><a class="btn mb-0 view-article" href="<?php echo $link_url; ?> "><?php echo ( $is_external ? 'View on ' . str_replace('www.', '', parse_url($link_url)['host']) : 'Read more') ?></a></li>
                <?php
                if ($post_type == 'bot'){
                  $bot_languages = wp_get_post_terms($post_id, 'programing_language');

                  $bot_source_urls = array();

                  if (array_key_exists('bot_source_url', $post_meta) && !empty($post_meta['bot_source_url'][0]) ){
                    $bot_source_urls = preg_split( '/\r\n|[\r\n]/', $post_meta['bot_source_url'][0] );
                  }

                  // if ( count( $bot_source_urls ) > 0 ){ ?>
                  <!-- 
                    <li>
                      <a class="btn mb-0 view-source" href="<?php echo $link_url; ?>#source-code">View source</a>
                    </li> 
                  -->
                  <?php
                  // }

                }
                if ( current_user_can('administrator') ){ ?>
                  <li><a class="btn mb-0" href="/wp-admin/post.php?post=<?php echo $post_id; ?>&action=edit">Edit</a></li>
                <?php } ?>
              </ul>
            </div>

          </div>
        </div>

      <?php endwhile; ?>
      </div>
    </div>
<?php else: ?>

  <!-- article -->
  <article>
    <h2><?php _e( 'Sorry, nothing to display.', 'botwiki' ); ?></h2>
  </article>
  <!-- /article -->

<?php endif; ?>
