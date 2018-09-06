document.documentElement.classList.add(isMobile.any ? 'mobile' : 'no-mobile');
jQuery(document).ready(function($) {
    /*Плавная прокрутка*/
    $('a[href^="#"]').on('click', function(e) {
        //e.preventDefault();
        var a = $(this),
            hash = a.attr('href'),
            target = $('[id="' + hash.substr(1) + '"]')

        $('html:not(:animated), body:not(:animated)').animate({
            scrollTop: target.offset().top
        }, 500, function() {
            window.location.hash = hash;
        });
    });
    /*Табы*/
    $(".using__tabs-titles").on(
        "click",
        ".using__tabs-titles-item:not(.active)",
        function() {
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active")
                .closest(".using__tabs")
                .find(".using__tabs-content-item")
                .removeClass("active")
                .eq($(this).index())
                .addClass("active");
        }
    );
    $(".prices__tabs-titles").on(
        "click",
        ".prices__tabs-titles-item:not(.active)",
        function() {
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active")
                .closest(".prices__tabs")
                .find(".prices__tabs-content-item")
                .removeClass("active")
                .eq($(this).index())
                .addClass("active");
        }
    );
    /*Динамика placeholder в форме*/
    $(function() {
        $("input, textarea").each(function() {
            if ($(this).val().length > 0)
                $(this)
                    .parent(".input")
                    .find(".input__placeholder")
                    .addClass("hidden");
            else
                $(this)
                    .parent(".input")
                    .find(".input__placeholder")
                    .removeClass("hidden");
            $(this).on("click", function(e) {
                if ($(this).val().length > 0)
                    $(this)
                        .parent(".input")
                        .removeClass(" -error")
                        .find(".input__placeholder")
                        .addClass("hidden");
                else
                    $(this)
                        .parent(".input")
                        .find(".input__placeholder")
                        .removeClass("hidden");
            });
            $(".input__placeholder").on("click", function(e) {
                $(this)
                    .parent(".input")
                    .find("input, textarea")
                    .focus()
                    .parent(".input")
                    .removeClass(" -error");
            });
            $(this).focusout(function(e) {
                if (
                    $(this).val().length > 0 &&
                    $(this).val() !== "+7 (___) ___ __ __"
                ) {
                    $(this)
                        .parent(".input")
                        .find(".input__placeholder")
                        .addClass("hidden")
                        .parent(".input")
                        .removeClass(" -error");
                    if (
                        $(this)
                            .parents(".form__field")
                            .hasClass("-step2")
                    ) {
                        $(this)
                            .parent(".input")
                            .find(".input__placeholder")
                            .css("opacity", "0");
                    }
                } else
                    $(this)
                        .parent(".input")
                        .find(".input__placeholder")
                        .removeClass("hidden")
            });
            $(this).focusin(function(e) {
                $(this)
                    .parent(".input")
                    .removeClass(" -error");
            });
        });
    });
})