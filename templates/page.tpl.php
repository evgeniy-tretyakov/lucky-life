
<?php $_url = drupal_get_path('theme', 'rb_theme'); ?>

<!-- header -->
<header class="header">
	<div class="container">
		<!-- лого -->
		<div class="header__logo">
			<a class="header__logo-link" href="/">
      			<img class="logo__image logo__image--short" src="/<?php echo $_url ?>/images/logo.svg">
    	</a>
		</div>

		<!-- регион меню -->
		<div class="header__navigation">

			<?php if (!empty($page['navigation'])): ?>
			<?php print render($page['navigation']); ?>
			<?php endif; ?>

		</div>

		<div id="language-switcher" class="language-switcher">
			<ul>
				<li><a id="ruRU" href="http://lucky-life.ru/">RU</a></li>
				<li><a id="enEN" href="https://en.lucky-life.ru/">EN</a></li>
			</ul>
		</div>

	</div>

</header>

<!-- section для баннера -->
<section class="under-header">
	<div class="container">
		<?php if (!empty($page['under_header'])): ?>
		<?php print render($page['under_header']); ?>
		<?php endif; ?>
		<!-- блок с текстом и изображением -->
	</div>
</section>

<!-- section основной контент-->
<main class="main">
	<div class="container">

<?php print($messages); ?>
		<?php print($breadcrumb); ?>
		<?php print(render($tabs)); ?>
		
	<section class="h1-doc">
			<?php print("<h1>". $title ."</h1>"); ?>
			<?php if (!empty($page['up_content'])): ?>
			<?php print render($page['up_content']); ?>
			<?php endif; ?>
	</section>
		

		

		<?php print render($page['content']); ?>


	<?php
	// $block = _block_get_renderable_array(_block_render_blocks(array(block_load('block', 8))));
	// print drupal_render($block);
	?>
	</div>
</main>

<!-- section под основным контентом-->
<?php if (!empty($page['under_main'])): ?>
	<section class="under-main">
		<div class="container">
			<?php print render($page['under_main']); ?>
		</div>
	</section>
<?php endif; ?>
	
<?php if (!empty($page['under_main2'])): ?>
	<section class="under-main2">
		<div class="container">
			<?php print render($page['under_main2']); ?>
		</div>
	</section>
<?php endif; ?>



<!-- footer -->
<footer class="footer">
	<div class="container">

	<div class="row row1">

		<!-- лого -->
		<div class="footer__logo">
			<a class="logo__link" href="/">
      			<img class="logo__image logo__image--short" src="/<?php echo $_url ?>/images/logo.svg">
    		</a>
		</div>

		<!-- регион меню -->
		<div class="footer__navigation">
			<?php if (!empty($page['footer'])): ?>
			<?php print render($page['footer']); ?>
			<?php endif; ?>
		</div>
	</div>

	<div class="row row2">
		<div class="footer__copyright">
	    <?php
	      $current_year = date ( 'Y' );
	      echo "$current_year &#169; All rights reserved"; 
	    ?>
			</div>

			<!-- блок Пользовательское соглашение -->
			<div class="footer__agreement">
				<a href="/agreement" target="_blank">Privacy Policy and Terms and Conditions</a>
			</div>

	  <div class="footer__dev-logo dev-logo">
	    <a class="dev-logo__link" href="https://ribbla.com/" target="_blank">
	      <img class="logo__image logo__image--short" src="/<?php echo $_url ?>/images/logo-ribbla.svg">
	    </a>
	  </div>

		</div>

	</div>
</footer>

<!-- Регион Всплывающего меню -->
<section class="hidden-menu">
	<div class="container">
		<div class="row row1">

			<!-- лого -->
			<div class="hidden-menu__logo">
				<a class="hidden-menu__logo-link" href="/">
	      			<img class="logo__image logo__image--short" src="/<?php echo $_url ?>/images/logo.svg">
	    		</a>
			</div>
		</div>

		<div class="row row2">
			<!-- Регион для вcплывающего меню -->
			<div class="hidden-menu__schedule">
				<?php if (!empty($page['schedule'])): ?>
				<?php print render($page['schedule']); ?>
				<?php endif; ?>
				<!-- блок меню во вспл меню -->
			</div>
		</div>

		<div class="row row3">
			<!-- регион Контакты во всплывающем меню -->
			<div class="hidden-menu__contacts">
				<?php if (!empty($page['contacts'])): ?>
				<?php print render($page['contacts']); ?>
				<?php endif; ?>
			</div>
		</div>

	</div>

</section>

		</div>
	</div>
</div>
		<?php print(render($page['subregions'])); ?>
		<?php print(render($page['metaform'])); ?>


<div class="container">
<!-- Modal -->
<div class="modal fade" id="applic_form" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Please, fill all the fields and we will get back to you as soon as possible.</h4>
        </div>
        <div class="modal-body">
          <p>
          <?php $block = module_invoke('webform', 'block_view', 'webform-client-form-45');
print render($block['content']); ?>
          </p>
        </div>
        
      </div>
      
    </div>
  </div>

</div>