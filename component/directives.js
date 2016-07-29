'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Create by zhukejin@hupu.com
 * Date 2016年6月24日14:28:28
 */

var Directives = function () {
    function Directives(directive) {
        _classCallCheck(this, Directives);

        this[directive] && this[directive]();
    }

    /**
     * 日期指令
     */


    _createClass(Directives, [{
        key: 'datepicker',
        value: function datepicker() {
            Vue.directive('datepicker', {
                params: ['minDate', 'maxDate', 'startDate', 'format'],

                bind: function bind() {
                    var opt = {
                        lang: 'ch',
                        closeOnDateSelect: true,
                        timepicker: false,
                        format: 'Y-m-d',
                        formatDate: 'Y-m-d'
                    };

                    if (this.arg === 'ym') {
                        opt.format = opt.formatDate = 'Y-m';
                    }

                    if (this.params.format) {
                        opt.format = opt.formatDate = this.params.format;
                    }

                    for (var i in this.params) {
                        if (this.params[i]) opt[i] = this.params[i];
                    }

                    $(this.el).datetimepicker(opt);
                },

                paramWatchers: {
                    maxDate: function maxDate() {
                        this.unbind().bind();
                    },
                    minDate: function minDate() {
                        this.unbind().bind();
                    }
                },
                unbind: function unbind() {
                    $(this.el).datetimepicker('destroy');
                    return this;
                }
            });
        }

        /**
         * 输入框指令
         */

    }, {
        key: 'input',
        value: function input() {
            Vue.directive('restriction', {
                params: ['length'],

                eventType: 'input',

                bind: function bind() {
                    var _this = this;

                    switch (this.arg) {
                        case 'number':
                            this.handler = function () {
                                _this.el.value = +_this.el.value.replace(/\D*/g, '');
                            };

                            break;

                        case 'float':
                            this.eventType = 'blur';
                            this.handler = function () {
                                var number = +_this.el.value.replace(/[^\d.]/g, '');
                                _this.el.value = isNaN(number) ? 0 : parseFloat(number.toFixed(_this.expression || 2));
                            };
                            break;
                        default:
                    }

                    this.el.addEventListener(this.eventType, this.handler);
                },
                unbind: function unbind() {
                    this.el.removeEventListener(this.eventType, this.handler);
                }
            });
        }
    }]);

    return Directives;
}();

//# sourceMappingURL=directives.js.map