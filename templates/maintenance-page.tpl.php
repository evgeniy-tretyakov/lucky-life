<?php

/**
 * @file
 * Implementation to display a single Drupal page while offline.
 *
 * All the available variables are mirrored in page.tpl.php.
 *
 * @see template_preprocess()
 * @see template_preprocess_maintenance_page()
 * @see bartik_process_maintenance_page()
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">
<head>
  <?php print $head; ?>

  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
<div id="maintenance">
          <?php if ($site_name || $site_slogan): ?>
            <h1><?php echo $site_name; ?></h1>
          <?php endif; ?>

          <?php if ($title): ?><h2 class="title" id="page-title"><?php print $title; ?></h2><?php endif; ?>
            <p><?php print $content; ?></p>
            <?php if ($messages): ?>
              <br class="clearfix" />
              <?php print $messages; ?>
              <br class="clearfix" />
            <?php endif; ?>
<?php $tmp =  drupal_get_form('user_login_block'); ?>
           <div class="wrapper"><?php print render($tmp); ?></div>
  <div class="copyright">
    <span>&copy;<?php echo date("Y"); ?> Все права посчитаны</span>
  </div>
  <!-- <div class="footer"></div> -->
  </div>
</body>
</html>
