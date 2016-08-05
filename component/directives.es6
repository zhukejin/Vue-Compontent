/**
 * Create by zhukejin@hupu.com
 * Date 2016年6月24日14:28:28
 */
class Directives {
    constructor (directive) {
        this[directive] && this[directive]();
    }

    /**
     * 日期指令
     */
    datepicker () {
        Vue.directive('datepicker', {
            params: ['minDate', 'maxDate', 'startDate', 'format', 'datepicker', 'timepicker'],

            bind () {
                var opt = {
                    lang: 'ch',
                    closeOnDateSelect: true,
                    timepicker: this.params.timepicker !== undefined ? this.params.timepicker : false,
                    datepicker: this.params.datepicker !== undefined ? this.params.datepicker : true,
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    timeFormat: 'HH:mm:ss',//格式化时间
                };

                if (this.params.timepicker) {
                    opt.format = opt.formatDate = 'H:i';
                }

                if (this.arg === 'ym') {
                    opt.format = opt.formatDate = 'Y-m';
                }

                if (this.params.format) {
                    opt.format = opt.formatDate = this.params.format;
                }


                for (let i in this.params) {
                    if (this.params[i]) opt[i] = this.params[i];
                }

                $(this.el).datetimepicker(opt);
            },
            paramWatchers: {
                maxDate () {
                    this.unbind().bind();
                },
                minDate () {
                    this.unbind().bind()
                }
            },
            unbind () {
                $(this.el).datetimepicker('destroy');
                return this
            }
        })
    }

    /**
     * 输入框指令
     */
    input () {
        Vue.directive('restriction', {
            params: ['length'],

            eventType: 'input',

            bind () {
                switch(this.arg) {
                    case 'number':
                        this.handler = () => {
                            this.el.value =  +this.el.value.replace(/\D*/g, '')
                        };

                        break;

                    case 'float':
                        this.eventType = 'blur';
                        this.handler = () => {
                            var number = +this.el.value.replace(/[^\d.]/g, '');
                            this.el.value = isNaN(number) ? 0 : parseFloat(number.toFixed(this.expression || 2))
                        }
                        break;
                    default:
                }

                this.el.addEventListener(this.eventType, this.handler)
            },
            unbind () {
                this.el.removeEventListener(this.eventType, this.handler)
            }
        })
    }

    /**
     * v-select 指令
     */

    select () {
        Vue.directive('select', {
            twoWay: true,
            deep: true,
            params: ['width', 'search', 'placeholder', 'onChange', 'disabled'],

            bind () {
                var obj = {
                    minimumResultsForSearch: this.params.search ? 0 : -1,
                    width: this.params.width || 100,
                    language: "zh-CN"
                };

                if (this.params.placeholder) {
                    obj.placeholder = this.params.placeholder
                }

                var _this = this;
                $(this.el).select2(obj).on('change', function () {
                    _this.set($(this).val());

                    if (_this.params.onChange) {
                        _this.vm[_this.params.onChange]($(this).val());
                    }

                })
            },
            update (value) {
                console.log(123)
                $(this.el).val(value).trigger('change');

                $(this.el).prop('disabled', this.params.disabled);
            },
            unbind () {
                $(this.el).off().select2('destroy')
            }
        })
    }
}