(function ($) {

  oneHeightElements = function(element) {
    if(screen.width > 601 && screen.width < 1025){
      var maxheight = 0;
      element.height('auto');
      element.each(function () {
      var height = $(this).height();
      if (height > maxheight) {
        maxheight = height;
      }
      });
      element.height(maxheight);
    };
  };

  oneHeightElementsAllRes = function(element) {
    var maxheight = 0;
    element.height('auto');
    element.each(function () {
    var height = $(this).height();
    if (height > maxheight) {
      maxheight = height;
    }
    });
    element.height(maxheight);
  };

  techPageStyling = function(bodyElement, wrapperMarkup){
    bodyElement.children().not('.footer').not('.hidden-menu').not('#colorbox').not('#cboxOverlay').wrapAll(wrapperMarkup);
  };

  slidinMenuTrigger = function(menuElement, buttonMarkup){
    let bodyItem = $('html body');
    bodyItem.append(buttonMarkup);

    let trigger = bodyItem.find('.js-menu-button');
    trigger.on('click', function(){
      $(this).toggleClass('js-button-triggered');
      menuElement.toggleClass('js-menu--visible');
      bodyItem.toggleClass('js-body--fixed');
    });
  };

  emptyLineFixer = function(element) {
    $(element).each(function(){
      if (!$(this).text().trim().length && $(this).children().length < 1 ) {
        $(this).remove();
      };
    });
  };

  clickableBlock = function(element){
    if(element.length > 0){
      element.each(function(){
        $(this).on('click', function(){
          let link = $(this).find('a');
          $(link)[0].click();
        });
      });
    }
  };

  headingStyling = function(element){
    element.each(function(){
      $(this).addClass('js-heading-decorated');
    });
  };

  headerMenuOpener = function(element){
    if(element.length > 0){
      let trigger = element.find('.block-menu ul.nav li a');

      trigger.on('click', function(e){
        e.preventDefault();
        $(this).closest('ul').toggleClass('js-main-menu-button--triggered');
        $(this).closest('.block-menu').toggleClass('js-border-radius');
        element.toggleClass('js-header-menu--visible');
      });
    };
  };

  headerSlider = function(element, menu){
    if (screen.width > 1025) {
      element.append('<div class="js-menu-nav-buttons"><div class="js-nav-back"></div><div class="js-nav-forward"></div></div>');

      let backButt = $('.js-nav-back');
      let forwardButt = $('.js-nav-forward');

      menu.css('width', '99999px');

      let swing = 0;

      forwardButt.on('click', function(){
        if(swing >= -800){
          swing-=200;
          menu.css('left', swing);
        };
      });
      backButt.on('click', function(){
        if(swing <= -200){
          swing+=200;
          menu.css('left', swing);
        };
      });
    };
  };

  bannerImageFilterCLasses = function(){
    $('.front .under-header .container .img-comp-container .img-comp-img ul').addClass('img-comp-container');
    $('.front .under-header .container .img-comp-container .img-comp-img ul li').addClass('img-comp-img');
    $('.front .under-header .container .img-comp-container .img-comp-img ul li').not(':first').addClass('img-comp-overlay');
  };

  classGenerator = function(item, className, commonClass){
    let newClassName = className;
    item.each(function(i){
      $(item[1]).addClass('grid-type--visible');
      let generatedClassName = newClassName + [i];
      $(this).addClass(commonClass);
      $(this).addClass(generatedClassName.toString());
    });
  }

  function initComparisons() {
    var x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
      compareImages(x[i]);
    }
    function compareImages(img) {
      var slider, img, clicked = 0, w, h;
      fields = $('.js-banner-textfield');
      w = img.offsetWidth;
      h = img.offsetHeight;
      img.style.width = (w / 2) + "px";
      slider = document.createElement("DIV");
      slider.setAttribute("class", "img-comp-slider");
      img.parentElement.insertBefore(slider, img);
      slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
      slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
      slider.addEventListener("mousedown", slideReady);
      window.addEventListener("mouseup", slideFinish);
      slider.addEventListener("touchstart", slideReady);
      window.addEventListener("touchstop", slideFinish);
      function slideReady(e) {
        e.preventDefault();
        e.target.classList.add('slider-shining');
        clicked = 1;
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
      }
      function slideFinish() {
        clicked = 0;
        slider.classList.remove('slider-shining');

        if (slider.offsetLeft <= 90){
          slider.style.left = 0 + 'px';
          img.style.width = 0 + "px";
          fields.each(function(){
            $(this).stop().removeClass('grid-type--visible');
            $('.js-griding-type2').addClass('grid-type--visible');
          });
        } else if (slider.offsetLeft >= 90 && slider.offsetLeft <= 270) {
          slider.style.left = 180 + 'px';
          img.style.width = 180 + "px";
          fields.each(function(){
            $(this).stop().removeClass('grid-type--visible');
            $('.js-griding-type1').addClass('grid-type--visible');
          });
        } else if (slider.offsetLeft >= 270) {
          slider.style.left = 360 + 'px';
          img.style.width = 360 + "px";
          fields.each(function(){
            $(this).stop().removeClass('grid-type--visible');
            $('.js-griding-type0').addClass('grid-type--visible');
          });
        };

      }
      function slideMove(e) {
        var pos;
        if (clicked == 0) return false;
        pos = getCursorPos(e)
        if (pos < 0) {
          pos = 0;

          fields.each(function(){
            $(this).stop().removeClass('grid-type--visible');
            $('.js-griding-type2').addClass('grid-type--visible');
          });
        };
        if (pos > w) {
          pos = w;

          fields.each(function(){
            $(this).stop().removeClass('grid-type--visible');
            $('.js-griding-type0').addClass('grid-type--visible');
          });
        };
        if (pos > 100 && pos < 200) {

          fields.each(function(){
            $(this).stop().removeClass('grid-type--visible');
            $('.js-griding-type1').addClass('grid-type--visible');
          });
        };
        slide(pos);
      }
      function getCursorPos(e) {
        var a, x = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        x = x - window.pageXOffset;
        return x;
      }
      function slide(x) {
        img.style.width = x + "px";
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
      }
    }
  };

  twoELemesWrap = function(element, wrapper){
    if(element.length > 0){
      element.next().andSelf().wrapAll(wrapper);
    }
  };

  appendHtml = function(element, markup){
    if(element.length > 0){
      element.append(markup);
    }
  };

  mobileGridSwitcher = function(list, buttons, state){
    let allTypes = list.find('.js-banner-textfield');
    let grains = list.find('.js-griding-type2');
    let grid = list.find('.js-griding-type0');
    let grainBtn = buttons.find('#m-tab-grain');
    let gridBtn = buttons.find('#m-tab-grid');

    grainBtn.on('click', function(e){
      e.preventDefault();
      allTypes.each(function(){
        $(this).removeClass(state);
        grains.addClass(state);
      });
    });

    gridBtn.on('click', function(e){
      e.preventDefault();
      allTypes.each(function(){
        $(this).removeClass(state);
        grid.addClass(state);
      });
    });

    parentStyling = function(element, className){
      element.parent().addClass(className);
    };

    cardWrapper = function(element, markup){
      element.each(function(){
        $(this).wrap(markup);
      });
    };

    textCenterButtons = function(prev, next, first, last){
      if($('.text-center').length > 0){
        prev.find('a').html('');
        next.find('a').html('');
        first.find('a').html('');
        last.find('a').html('');
      };
    };

    htmlClear = function(element){
      element.html('');
    };

    productGridPick = function(container, type1, type2){
      let activeClass = 'js-griding-type--chosen';
      if(container.length > 0){
        pick = function(element){
          element.on('click', function(){
            let value = $(this).find('h2').text();
            let valueFolder = $('.modal-body .webform-component--pole-dlya-tipa-pomola input');
            valueFolder.val(value);
            let wrapper = $(this).find('.field-item');
            $('.js-griding-type--chosen').each(function(){
              $(this).removeClass(activeClass);
            });
            wrapper.addClass(activeClass);
          });
        };
        pick(type1);
        pick(type2);
      };
    };

    formNameSetup = function(modalNameField, nameField){
      if(nameField.length > 0){
        let nameVal = nameField.text();
        modalNameField.val(nameVal);
      };
    };

    lineBreakerFixer = function(element){
      element.each(function(){
        $(this).find('br').remove();
      });
    };

    elementPlaceholderClear = function(element) {
      element.each(function(){
        $(this).attr('placeholder', '');
        $(this).on('input', function(){
          if ($(this).val().length) {
            $(this).addClass('js-input-filled');
          } else {
            $(this).removeClass('js-input-filled');
          };
        });
        
        if ($(this).val().length) {
          $(this).addClass('js-input-filled');
        } else {
          $(this).removeClass('js-input-filled');
        };
      })
    };

    inputClear = function(element){
      element.each(function(){
        $(this).val('');
      });
    };

    telElementPlaceholderClear = function(element) {
      element.each(function(){
        $(this).attr('placeholder', '');
        $(this).on('focus', function(){
          $(this).addClass('js-input-filled');
        });

        /*
        if ($(this).val().length > 0) {
          $(this).addClass('js-input-filled');
        } else {
          $(this).removeClass('js-input-filled');
        };
        */
      })
    };

    productTabFormWrappers = function(topElement, bottomElement){
      if(topElement.length > 0){
        topElement.nextAll(':lt(3)').andSelf().wrapAll('<div class="js-tabForm__top"></div>');
        bottomElement.nextAll().andSelf().wrapAll('<div class="js-tabForm__bottom"></div>');
      };
    };

    productFormWrapper = function(element, markup){
      element.wrap(markup);
    };

    idApplier = function(element){
      element.attr('id', 'js-form-holder');
    };

    productModal = function(element){
      if(element.children('.js-modal-heading').length < 1){
        element.prepend('<div class="js-modal-heading"></div>');
        let productName = $('.node-type-product .main .region-content .node-product .group-right .group-2 .field-name-title .field-items .field-item h2').text();
        let modalHeading = $('.js-modal-heading');
        modalHeading.text(productName);
      };

      let modalAgree = $('.modal-body form.webform-client-form > div > .webform-component--ya-soglasen-s-usloviyami-politiki-obrabotki-personalnyh-dannyh');
      modalAgree.nextAll().andSelf().wrapAll('<div class="js-modal-bottom"></div>');
    };

    agreementChecker = function(element, className){
      element.each(function(){
        let thisInput = $(this).find('input');

        if(thisInput.is(':checked')){
          $(this).addClass(className);
        };

        $(this).on('click', function(){
          if(thisInput.is(':checked')){
            thisInput.prop('checked', false);
            $(this).removeClass(className);
          } else {
            thisInput.prop('checked', true);
            $(this).addClass(className);
          };

        });
      });
    };

    scrollShiver = function(element){
      const initial = element.css('right');
      var i = 0;
      $(window).scroll(function() {
        element.addClass('js-scrolled');
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
          element.removeClass('js-scrolled');
          element.css('right', initial);
          i++;
        }, 150));
      });
    };

    formPrevent = function(element){
      element.each(function(){
        $(this).on('submit', function(e){
          e.preventDefault();
        });
      });
    };

    preloader = function(){
      $('body').append('<div class="js-loader-overlay"></div>');
      $('body').append('<div class="js-loader"><div class="js-circle"></div><div class="js-circle"></div><div class="js-circle"></div></div>');

      $(window).on('load', function(){
        $('body').addClass('loaded_hiding');
        window.setTimeout(function () {
          $('body').addClass('loaded');
          $('body').removeClass('loaded_hiding');
        }, 500);
      });
    };

    currenciesConvertor = function(){
      window.onload = function () {
        $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {

            let KZT = data.Valute.KZT.Value;
            let TJS = data.Valute.TJS.Value;
            let BYN = data.Valute.BYN.Value;
            let AZN = data.Valute.AZN.Value;
            
            console.log(KZT, TJS, BYN, AZN);

            let price = $('PRICE_SELECTOR');
            let priceValue = price.text();
            let priceClear = priceValue.substring(0, priceValue.length - 3);
            let priceConverted = priceClear*KZT + 'тнг';
            price.text(priceConverted);
        });
      };
    };

    langSwitcher = function(){
      let ru = $('#ruRU');
      let eng = $('#enEN');
  
      if (window.location.href.indexOf("en.") > -1) {
        eng.closest('li').addClass('js-current-language');
        ru.closest('li').removeClass('js-current-language');
      } else {
        ru.closest('li').addClass('js-current-language');
        eng.closest('li').removeClass('js-current-language');
      };
    };

  };

  $(document).ready(function() {
    techPageStyling($('.page-node-4'), '<div class="js-tech-page-wrapper"></div>');
    techPageStyling($('.page-node-5'), '<div class="js-tech-page-wrapper"></div>');
    slidinMenuTrigger($('.hidden-menu'), '<div class="js-menu-button"><div class="js-menu-button__lines"></div></div>');
    emptyLineFixer('p');
    emptyLineFixer('h2');
    clickableBlock($('.index-categories .view-categories .view-content .views-row'));
    headingStyling($('.h1-doc h1'));
    headingStyling($('.front h2'));
    headingStyling($('.block-title'));
    headingStyling($('.node-type-about-us .node-about-us .group-company2 .field-name-field-caption2 .field-items .field-item p'));
    headingStyling($('.node-type-about-us .node-about-us .group-company4 .field-name-field-caption4 .field-items .field-item p'));
    clickableBlock($('.index-blog .view-blog-main-view .view-content .views-row'));
    headerMenuOpener($('header.header .container .header__navigation .region-navigation'));
    headerSlider($('.header.header .container .header__navigation .region-navigation .block-views'), $('header.header .container .header__navigation .region-navigation .block-views .view-header-menu-view .view-content'));
    classGenerator($('.front .under-header .container .img-comp-container .img-comp-text > div'), 'js-griding-type', 'js-banner-textfield');
    bannerImageFilterCLasses();
    initComparisons();
    twoELemesWrap($('footer.footer .container .row2 .footer__copyright'), '<div class="js-footer-bottom__left"></div>');
    mobileGridSwitcher($('.front .under-header .container .img-comp-container .img-comp-text'), $('.group-banner-1'), 'grid-type--visible');
    parentStyling($('.front .under-header .container .img-comp-container'), 'js-banner-container');
    cardWrapper($('.page-blog main .container .region .block-system .view .view-content .views-row'), '<div class="js-news-item"></div>');
    textCenterButtons($('.text-center ul.pagination .prev'), $('.text-center ul.pagination .next'), $('.text-center ul.pagination .pager-first'), $('.text-center ul.pagination .pager-last'));
    oneHeightElements($('.page-blog main .container .region .block-system .view .view-content .js-news-item .views-row'));
    oneHeightElements($('.index-blog .view-blog-main-view .view-content .views-row'));
    clickableBlock($('.page-blog .main .container .region .block-system .view .view-content .views-row'));
    oneHeightElements($('.index-blog .view-blog-main-view .view-content .views-row '));
    oneHeightElementsAllRes($('.page-taxonomy-term .main .region-content .view .view-content .views-row'));
    productGridPick($('.node-type-product .main .region-content .node-product .group-right .field-name-field-griding'), $('#taxonomy-term-17'), $('#taxonomy-term-18'));
    lineBreakerFixer($('ul li'));
    lineBreakerFixer($('ol li'));
    elementPlaceholderClear($('form.webform-client-form input[type="text"]'));
    elementPlaceholderClear($('form.webform-client-form input[type="email"]'));
    elementPlaceholderClear($('form.webform-client-form input[type="tel"]'));
    telElementPlaceholderClear($('.form-item-submitted-vash-telefon- input'));
    telElementPlaceholderClear($('.form-item-submitted-vash-telefon input'))
    productTabFormWrappers($('.node-type-product .main .region-content .node-product .group-footer .field-group-htabs-wrapper .horizontal-tabs .horizontal-tabs-panes .field-name-know-partner-themes .webform-client-form .form-item-submitted-vashe-imya'), $('.node-type-product .main .region-content .node-product .group-footer .field-group-htabs-wrapper .horizontal-tabs .horizontal-tabs-panes .field-name-know-partner-themes .webform-client-form .form-item-submitted-ya-soglasen-s-usloviyami-politiki-obrabotki-personalnyh-dannyh'));
    productFormWrapper($('.node-type-product .block-webform'), '<div class="js-product-form"></div>');
    productFormWrapper($('.node-type-about-us .block-webform'), '<div class="js-product-form"></div>');
    clickableBlock($('.page-taxonomy-term .main .region-content .view .view-content .views-row'));
    idApplier($('.node-type-about-us .under-main .region-under-main'));
    htmlClear($('.modal-dialog .modal-content .close'));
    htmlClear($('div.error .close'));
    productModal($('.modal-dialog .modal-content .modal-header'));
    formNameSetup($('.modal-body .webform-component--pole-dlya-nazvaniya-tovara input'), $('.node-type-product .main .region-content .node-product .group-right .group-2 .field-name-title .field-items .field-item h2'));
    agreementChecker($('form.webform-client-form > div .form-item-submitted-ya-soglasen-s-usloviyami-politiki-obrabotki-personalnyh-dannyh-1 label.control-label'), 'js-input--checked');
    scrollShiver($('.js-menu-button'));
    preloader();
    langSwitcher();

    $(document).ajaxComplete(function(){
      htmlClear($('div.error .close'));
      agreementChecker($('form.webform-client-form > div .form-item-submitted-ya-soglasen-s-usloviyami-politiki-obrabotki-personalnyh-dannyh-1 label.control-label'), 'js-input--checked');
      formNameSetup($('.modal-body .webform-component--pole-dlya-nazvaniya-tovara input'), $('.node-type-product .main .region-content .node-product .group-right .group-2 .field-name-title .field-items .field-item h2'));
      htmlClear($('.modal-dialog .modal-content .close'));
      productTabFormWrappers($('.node-type-product .main .region-content .node-product .group-footer .field-group-htabs-wrapper .horizontal-tabs .horizontal-tabs-panes .field-name-know-partner-themes .webform-client-form .form-item-submitted-vashe-imya'), $('.node-type-product .main .region-content .node-product .group-footer .field-group-htabs-wrapper .horizontal-tabs .horizontal-tabs-panes .field-name-know-partner-themes .webform-client-form .form-item-submitted-ya-soglasen-s-usloviyami-politiki-obrabotki-personalnyh-dannyh'));
      productFormWrapper($('.node-type-product .block-webform'), '<div class="js-product-form"></div>');
      productFormWrapper($('.node-type-about-us .block-webform'), '<div class="js-product-form"></div>');
      elementPlaceholderClear($('form.webform-client-form input[type="text"]'));
      elementPlaceholderClear($('form.webform-client-form input[type="email"]'));
      elementPlaceholderClear($('form.webform-client-form input[type="tel"]'));
      telElementPlaceholderClear($('.form-item-submitted-vash-telefon- input'));
      productModal($('.modal-dialog .modal-content .modal-header'));
    });

  });
})(jQuery);
