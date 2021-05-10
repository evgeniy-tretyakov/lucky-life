<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>

<?php
$cur = '';
if (!empty($row->field_field_packing_price)) {
	$cur = array_shift($row->field_field_packing_price[0]['rendered']['entity']['field_collection_item']);
}
	if (isset($cur['field_price_coll2']['#items'][0]['value'])) {
		$output = $cur['field_price_coll2']['#items'][0]['value'];
	} else {
		$output = t('Check the price with the manager');
	}
?>

<div class="price"><?php echo $output ?></div>

