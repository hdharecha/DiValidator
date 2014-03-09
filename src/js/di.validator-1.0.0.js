/* ========================================================================
 * Bootstrap: Bootstrap.js v0.1
 * Just a template for Bootstrap your Javascript Plugin
 * ========================================================================
 * This is just a template of comment about a javascript plugin.
 * The same patten in Bootstraps Plugins
 * ======================================================================== */


+function ($) { "use strict";

    // PLUGIN NAME PUBLIC CLASS DEFINITION
    // ==============================

    var DiValidator = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, DiValidator.DEFAULTS, options)
        this.fieldTypes = 'input, select'
        console.info("DiValidator")
    }

// defaults
    DiValidator.DEFAULTS = {
        fieldErrorClass: 'di-validation-error'
    }

    DiValidator.prototype.setValidation = function (param) {
        var self = this
        self.$element.on('click.provoke.diValidator','[data-provoke="diValidator"]',function(){
            self.runValidations();
        })

        $(self.fieldTypes,self.$element).each(function(i, iField){
            var required = $(iField).attr('dv-required');

            var type = ''
            if($(iField).is('input:text')){
                console.info("input:text")
                type = 'INPUT:TEXT'
            }
            else if($(iField).is('select')){
                console.info("select")
                type = 'SELECT'
            }

            if(typeof required !== 'undefined' && required !== false) {
                $(iField).data('required-message',$(iField).attr('dv-required'))
                $(iField).data('required-validator',self.requiredValidator(type))
            }

        })

       /* this.$element.find('[dv-required]').each(function(i, iEl){
            $(iEl).data('message',$(iEl).attr('dv-required'))
            $(iEl).data('validator',function(){
                console.info("data function")
            })
            console.info("DiValidator setValidation"+$(iEl).data('validator'))
            $(iEl).data('validator')()
            console.info("DiValidator setValidation data"+$(iEl).data('message'))
        })*/
    }

    DiValidator.prototype.requiredValidator = function (type) {
        var self = this
        if(type == 'INPUT:TEXT'){
            return function($Field){
                if($Field.val() && $Field.val().trim()!=''){
                    return true
                }
                return false
            }
        }
        else if(type == 'SELECT'){
            return function($Field){
                if($Field.val() && $Field.val().trim()!='' && $Field.val()!=$Field.data('invalide')){
                    return true
                }
                return false
            }
        }
    }

    DiValidator.prototype.runValidations = function () {
        var self = this
        console.info("runValidations "+$(self).html())
        $(self.fieldTypes,self.$element).each(function(i, iField){
            console.info("valid "+$(iField).val());
            if(!$(iField).data('required-validator')($(iField))){
                $(iField).addClass(DiValidator.DEFAULTS.fieldErrorClass)
                alert($(iField).data('required-message'));
            }
        });
    }
    // PLUGIN DEFINITION
    // ========================

    var old = $.fn.diValidator

    $.fn.diValidator = function (option) {
        console.info("DiValidator $ fn"+JSON.stringify(option))
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('diValidator')
            console.info("DiValidator $ fn data "+JSON.stringify(data))
            var options = typeof option == 'object' && option
            console.info("DiValidator $ fn option "+JSON.stringify(option))
            if (!data) $this.data('diValidator', (data = new DiValidator(this, options)))

            if (option == 'diValidator') data.toggle()
            else if (option) data.setValidation(option)
        })
    }

    $.fn.diValidator.Constructor = DiValidator


    // PLUGIN NO CONFLICT
    // ==================

    $.fn.diValidator.noConflict = function () {
        $.fn.diValidator = old
        return this
    }


    // PLUGIN DATA-API
    // ===============

   /* $(document).on('click.bs.diValidator.data-api', '[data-validate=diValidator]', function (e) {
// waiting for some action, why wont come over here?
        e.preventDefault()
        var $this   = $(this)
        var form  = $this.attr('data-form')
        var $form = $(form)
        console.info("DiValidator init")
    })*/

    $(window).on('load', function () {
        $('[data-validate="diValidator"]').each(function () {
            console.info("DiValidator init")
            var $form   = $(this)
            $form.diValidator($form.data())

        })
    })

}(window.jQuery);