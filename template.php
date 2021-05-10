
<?php

/*function rb_theme_form_element(&$variables) {
  $element = &$variables['element'];

  // Inline title.
  if (isset($element['#title_display']) && $element['#title_display'] === 'inline') {
    $element['#title_display'] = 'before';
    $element['#wrapper_attributes']['class'][] = 'form-inline';
  }

  // Description above field.
  if (!empty($element['#webform_component']['extra']['description_above'])) {
    $element['#description_display'] = 'before';
  }

  // If field prefix or suffix is present, make this an input group.
  if (!empty($element['#field_prefix']) || !empty($element['#field_suffix'])) {
    $element['#input_group'] = TRUE;
  }

  // Render as a normal "form_element" theme hook.
  return theme_form_element($variables);
}*/



function the_menu($display = true, $menu = 'main-menu', $depth = 2){
	$output = "<!-- menu: Меню сгенерино из " . strtoupper($menu) . "; -->";
	$tmp = menu_tree_output(menu_tree_all_data($menu, null, $depth));
	$output .= drupal_render($tmp);
	$output .= "<!-- end: " .strtoupper($menu). "; -->";

	if (!$display) {
		return $output;
	}

	print($output);
}



function the_slogan($display = true){
	$slogan = variable_get('site_slogan');
	$output = "<!-- Слоган сайта BEGIN (ПРАВКА В НАСТРОЙКАХ конфигурация  информация о сайте) -->";
	if(!empty($slogan))
		$output .= $slogan;
	else
		$output .= "Настроить слоган";
	$output .= "<!-- Слоган сайта END -->";

	if (!$display) {
		return $output;
	}

	print($output);
}



// function prototype

/**
* cart
*/
class CustomCart
{
	function __construct()
	{
		// настройка и передача значений


		return true;
	}



	/**
	 * Вывод в месте вызова
	 * @return string 	Готовый блок корзины
	 */
	public function displayCart(){
		$_cost 			= $this->getCost();
		$_qty 			= $this->getQty();
		$_cartClass = "full";

		if ($_qty == 1) {
			$message = "В корзине <strong>$_qty</strong> товар";

		}elseif (($_qty > 1) and ($_qty < 5)) {
			$message = "В корзине <strong>$_qty</strong> товара";

		}elseif ($_qty >= 5) {
			$message = "В корзине <strong>$_qty</strong> товаров";

		}
		else{
			$message = "В конзине <strong>НЕТ</strong> товаров";
			$_cartClass = 'empty';
		}

		if ($_cost) {
			$priceMessage = "<strong>". $_cost ."</strong>руб.";
		} else {
			$priceMessage = "0руб.";
		}


		$output = '<div class="custom-cart">
	<div class="custom-cart__inner">
		<div class="custom-cart__line1">
			<div class="custom-cart__message">'. $message .'</div>
		</div>
		<div class="custom-cart__line2">
			<div class="custom-cart__trigger-image--'. $_cartClass .'"><a href="/cart" alt="">Cart</a></div>
			<div class="custom-cart__price">' .$priceMessage. '</div>
		</div>
	</div>
</div>';
		return $output;
	}


	/**
	 * Общая стоимость для отображения в корзине
	 * @param  int  $cid ID корзины
	 * @return int      Общая стоимость для всей корзины
	 */
	protected function getCost($cid = NULL){
		$cost = 0;
			if (empty($cid)) {
				$cid = uc_cart_get_id(FALSE);
			}

			if ($cid) {
				foreach (uc_cart_get_contents($cid) as $item) {
					$cost += $item->qty * $item->sell_price;
				}
			}
		return $cost;
	}


	/**
	 * Общее количество товаров
	 * @param  int $cid ID корзины
	 * @return int      Общее количество товаров в корзине
	 */
	protected function getQty($cid = NULL){
			$qty = 0;
			if (empty($cid)) {
				$cid = uc_cart_get_id(FALSE);
			}

			if ($cid) {
				foreach (uc_cart_get_contents($cid) as $item) {
					$qty += $item->qty;
				}
			}

		return $qty;
	}


}


 // First, we must set up an array
$element = array(
  '#tag' => 'link', // The #tag is the html tag - <link />
  '#attributes' => array( // Set up an array of attributes inside the tag
    'href' => 'http://'. $_SERVER['SERVER_NAME'] . '/humans.txt',
    'rel' => 'author',
    'type' => 'text/plain',
  ),
);
drupal_add_html_head($element, 'humans');

function rb_theme_preprocess_page(&$vars, $hook) {
  if (isset($vars['node'])) {
    // If the node type is "blog_madness" the template suggestion will be "page--blog-madness.tpl.php".
    $vars['theme_hook_suggestions'][] = 'page__'. $vars['node']->type;
  }
}


function pn_node($node, $mode = 'n') {
  if (!function_exists('prev_next_nid')) {
    return NULL;
  }

  switch($mode) {
    case 'p':
      $n_nid = prev_next_nid($node->nid, 'prev');
      $link_text = 'Previous article';
      $link_class = 'link-wrapepr_prev';
      break;

    case 'n':
      $n_nid = prev_next_nid($node->nid, 'next');
      $link_text = 'Next article';
      $link_class = 'link-wrapepr_next';
      break;

    default:
      return NULL;
  }

  if ($n_nid) {
    $n_node = node_load($n_nid);

    $options = array(
      'attributes' => array('class' => 'thumbnail'),
      'html'  => TRUE,
    );
    switch($n_node->type) {
      // For image nodes only
      case 'blog':
      // kpr($n_node);
        // This is an image node, get the thumbnail
        $html = "<div class='link-wrapepr $link_class'>";
        $html .= l($link_text, "node/$n_nid", array('html' => TRUE));
        $html .= "<p>". $n_node->title ."</p></div>";
        return $html;

      // For blog nodes only

      case 'cases':
        $html = "<div class='link-wrapepr $link_class'>";
        $html .= l($link_text, "node/$n_nid", array('html' => TRUE));
        $html .= "<p>". $n_node->title ."</p></div>";
        return $html;

      // For cases nodes only
      case 'video':
        foreach ($n_node->files as $fid => $file) {
          $html  = '<img src="' . base_path() . $file->filepath;
          $html .= '" alt="' . $n_node->title;
          $html .= '" title="' . $n_node->title;
          $html .= '" class="image image-thumbnail" />';
          $img_html = l($html, "node/$n_nid", $options);
          $text_html = l($link_text, "node/$n_nid", array('html' => TRUE));
          return $img_html . $text_html;
        }
      default:
        // Add other node types here if you want.
    }
  }
}
?>