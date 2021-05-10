(function ($) {
  $(document).ready(function() {
    Drupal.behaviors.recaptchaAjax = {
      attach: function (context, settings) {
        if ('grecaptcha' in window && context !== document) {
          $('.g-recaptcha:empty', context).each(function () {
            grecaptcha.render(this, $(this).data());
          });
        }
      }
    };
  });
})(jQuery);
