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
    /*подписка*/
    $(".preview__form form").on("submit", function(e) {
        e.preventDefault();
        var src = $(this).attr("action");
        var serialize = $(this).serialize();
        var data_field = $(this).serializeArray();
        var form = $(this);
        var type = $(this).data("type");
        var fields = {
            email: ""
        };

        var require = ["name", "email"];
        var errors = [];
        var message = "Поле является обязательным для заполнения";
        var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        for (var field in fields) {
            var val = $(form)
                .find("[name='" + field + "']")
                .val();
            fields[field] = $.trim(val);
            if (fields[field] == "" && require.indexOf(field) != -1) {
                errors.push(message);
                $(form)
                    .find("[name='" + field + "']")
                    .parent(".input")
                    .addClass("-error")
                    .find(".input__error")
                    .html(message);
            } else {
                if (field == "email") {
                    if (!expr.test(fields[field])) {
                        errors.push(message);
                        $(form)
                            .find("[name='" + field + "']")
                            .parent(".input")
                            .addClass("-error")
                            .find(".input__error")
                            .html("введите корректный e-mail");
                    }
                }
            }
        }
        if (!errors.length) {
            $.ajax({
                type: "post",
                async: false,
                dataType: "json",
                cache: false,
                url: src,
                data: data_field
            }).done(function(data) {
                $(form)
                    .find("input")
                    .val("")
                    .parent(".input")
                    .find(".input__placeholder")
                    .removeClass("hidden")
            });
        }
    });
    $(".registration__form form").on("submit", function(e) {
        e.preventDefault();
        var src = $(this).attr("action");
        var serialize = $(this).serialize();
        var data_field = $(this).serializeArray();
        var form = $(this);
        var type = $(this).data("type");
        var fields = {
            email: "",
            password: ""
        };

        var require = ["password", "email"];
        var errors = [];
        var message = "Поле является обязательным для заполнения";
        var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        for (var field in fields) {
            var val = $(form)
                .find("[name='" + field + "']")
                .val();
            fields[field] = $.trim(val);
            if (fields[field] == "" && require.indexOf(field) != -1) {
                errors.push(message);
                $(form)
                    .find("[name='" + field + "']")
                    .parent(".input")
                    .addClass("-error")
                    .find(".input__error")
                    .html(message);
            } else {
                if (field == "email") {
                    if (!expr.test(fields[field])) {
                        errors.push(message);
                        $(form)
                            .find("[name='" + field + "']")
                            .parent(".input")
                            .addClass("-error")
                            .find(".input__error")
                            .html("введите корректный e-mail");
                    }
                }
            }
        }
        if (!errors.length) {
            $.ajax({
                type: "post",
                async: false,
                dataType: "json",
                cache: false,
                url: src,
                data: data_field
            }).done(function(data) {
                $(form)
                    .find("input")
                    .val("")
                    .parent(".input")
                    .find(".input__placeholder")
                    .removeClass("hidden")
            });
        }
    });
    $(".summary__form form").on("submit", function(e) {
        e.preventDefault();
        var src = $(this).attr("action");
        var serialize = $(this).serialize();
        var data_field = $(this).serializeArray();
        var form = $(this);
        var type = $(this).data("type");
        var fields = {
            name: "",
            contact: "",
            conditions: $("[name=conditions]:checked").length,
        };

        var require = ["name", "contact"];
        var errors = [];
        var message = "Поле является обязательным для заполнения";
        var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        for (var field in fields) {
            var val = $(form)
                .find("[name='" + field + "']")
                .val();
            fields[field] = $.trim(val);
            if (fields[field] == "" && require.indexOf(field) != -1) {
                errors.push(message);
                $(form)
                    .find("[name='" + field + "']")
                    .parent(".input")
                    .addClass("-error")
                    .find(".input__error")
                    .html(message);
            } else {
                if (field == "email") {
                    if (!expr.test(fields[field])) {
                        errors.push(message);
                        $(form)
                            .find("[name='" + field + "']")
                            .parent(".input")
                            .addClass("-error")
                            .find(".input__error")
                            .html("введите корректный e-mail");
                    }
                }
            }
        }
        if (!$(form)
            .find("[name='conditions']")
            .is(":checked")
        ) {
            errors.push(message);
            $(form)
                .find("[name='conditions']")
                .parents(".control-label__input")
                .addClass("-error")
                .find(".input__error")
                .html("Подтвердите условия");
        } else
            $(form)
            .find("[name='conditions']")
            .parents(".control-label__input")
            .removeClass("-error");

        if (!errors.length) {
            $.ajax({
                type: "post",
                async: false,
                dataType: "json",
                cache: false,
                url: src,
                data: data_field
            }).done(function(data) {
                $(form)
                    .find("input")
                    .val("")
                    .parent(".input")
                    .find(".input__placeholder")
                    .removeClass("hidden")
                $(form).append(
                    '<div class="input__error -connect">Спасибо! Мы с вами свяжемся!</div>'
                );
            });
        }
    });
    /*подгрузка*/
    $('.gallery__upload').click(function() {
        $.ajax({
            type: "get",
            url: $('.gallery__upload').attr('data-resource'),
            success: function(data) {
                $('.gallery__list').append(data);
            }
        });
    });  
    /*модальные окна*/    
    $('[data-modal]').click(function(e) {
        e.preventDefault()
        var src = $(this).attr('data-modal')
        var href = this.href
        var name = this.name || $(this).text();
        var comment = $(this).attr('data-comment');
        //le('forms', 'click', name) // начали отправлять

        var data = {
            'ajax': '1'
        }
        if ($(this).is('.buyoneclick') || $(this).is('.oneclick')) {
            selected_count = parseInt($(this).parents('.order').find('input.count').val(), 10);
        }
        if ($(this).is('.lending')) {
            tabs = $(this).attr('data-tabs');
            price = $('div.' + tabs, this).text();
        }
        $.fancybox.showLoading()
        $.ajax({
                type: 'post',
                url: src,
                data: data
            })
            .done(function(data) {
                var data = $(data)
                $.fancybox.hideLoading()
                $.fancybox(data)
        })
        .fail(function() {
            $.fancybox.hideLoading()
            alert('("' + src + '") окно не доступно,\nбудет выполнена переадресация')
            window.location.href = href
        })
    })
})