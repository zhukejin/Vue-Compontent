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
            params: ['minDate', 'maxDate', 'startDate'],

            bind () {
                var opt = {
                    lang: 'ch',
                    closeOnDateSelect: true,
                    timepicker: false,
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                };

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
}
