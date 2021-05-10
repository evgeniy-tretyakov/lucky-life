(function ($) {

  priceDownload = function(element, html){
    element.html(html);
  };

  productMassPick = function(item){
    let activeClass = 'js-mass--chosen';
    if(item.length > 0){
      item.each(function(){
        $(this).on('click', function(e){
          let priceValue = $(this).closest('.content').find('.field-name-field-price-coll2 .field-items .field-item').text();
          let priceFolder = $('.product_price');
          priceFolder.text('Price: ' + priceValue);
          priceFolder.addClass('product_price--js-visible');
          let value = $(this).text();
          let valueFolder = $('.modal-body .webform-component--pole-dlya-razmera-fasovki input');
          valueFolder.val(value);
          e.preventDefault();
          $('.js-mass--chosen').each(function(){
            $(this).removeClass(activeClass);
          });
          $(this).addClass(activeClass);
        });
      });
    };
  };

  productMassChecker = function(element){
    let children = element.children();
    if(children.length == 1){
      children.first().find('.field-name-field-coll1 a').click();
    }
  };

  categoriesAdjunction = function(block){
    let trigger = block.parent().find('.view-footer .btn');

    slicer = function(number){
      block.children('.views-row').slice(number).addClass('js-hidden');
    }

    if(screen.width > 769){
      slicer(6)
    } else {
      slicer(2)
    };

    trigger.on('click', function(e){
      e.preventDefault();
      block.children('.js-hidden').slideToggle();
      trigger.toggleClass('js-show-less');
      if(!trigger.hasClass('js-show-less')){
        $(this).html('Show more');
      } else {
        trigger.html('Show less');
      };
    });

  };

  $(document).ready(function() {
    priceDownload($('.front .h1-doc .region section a'), 'Download Price List');
    categoriesAdjunction($('.index-categories .view-categories .view-content'));
    productMassPick($('.node-type-product .main .region-content .node-product .group-right .field-collection-container .field-items .field-item .field-collection-view .content .field-name-field-coll1 a'));
    productMassChecker($('.node-type-product .main .region-content .node-product .group-right .field-collection-container .field-name-field-packing-price > .field-items'));
  });
})(jQuery);
  