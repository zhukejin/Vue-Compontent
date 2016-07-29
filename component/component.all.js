'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Create by zhukejin@hupu.com
 * Date 2016年6月24日14:28:28
 */

var Component = function () {
    function Component(directive) {
        _classCallCheck(this, Component);

        this[directive] && this[directive]();
    }

    _createClass(Component, [{
        key: 'chekckbox',
        value: function chekckbox() {
            Vue.component('checkbox', {
                template: '<label class=\'ant-checkbox-wrapper\'>' + '<span class="ant-checkbox" :class="{\'ant-checkbox-checked-1 ant-checkbox-checked\': isValue ? value === trueValue : value, \'ant-checkbox-disabled\': disabled}">' + '            <span class="ant-checkbox-inner"></span>' + '            <input v-if=\'isValue\' :disabled=\'disabled\' type=\'checkbox\' class="ant-checkbox-input" :name="name" v-model="value" :true-value="trueValue" :false-value="falseValue">' + '            <input v-else :disabled=\'disabled\' type="checkbox" class="ant-checkbox-input" :name="name" v-model="value">' + '        </span>' + '        <span><slot></slot></span>' + '    </label>',
                props: {
                    value: {
                        required: true,
                        twoWay: true
                    },
                    name: String,
                    isValue: [],
                    trueValue: [],
                    falseValue: [],
                    disabled: []
                },
                watch: {
                    'value': function value(v) {
                        this.$dispatch('onchange', {
                            value: v,
                            name: this.name
                        });
                    }
                }
            });
        }
    }, {
        key: 'checkboxGroup',
        value: function checkboxGroup() {
            Vue.component('checkboxGroup', {
                template: '<template v-if="useButton">' + '    <template v-for="item in options">' + '        <label class=\'ant-checkbox-wrapper\'>' + '            <input :disabled=\'item.disabled\' type="checkbox" class="zq-hidden" :value="item.value" :name="name" v-model="value">' + '            <v-button :width="useButton.width" :disabled="item.disabled" :type="!item.disabled && value.indexOf(item.value) < 0 ? useButton.startType : !item.disabled && value.indexOf(item.value) > -1 ? useButton.endType : \'\'" @click="check(item.value)">{{item.label}}</v-button>' + '        </label>' + '    </template>' + '</template>' + '<template v-else>' + '    <template v-for="item in options">' + '        <label class=\'ant-checkbox-wrapper\'>' + '            <span class="ant-checkbox" :class="{\'ant-checkbox-checked-1 ant-checkbox-checked\': value.indexOf(item.value) > -1, \'ant-checkbox-disabled\': item.disabled}">' + '                <span class="ant-checkbox-inner"></span>' + '                <input :disabled=\'item.disabled\' type="checkbox" class="ant-checkbox-input" :value="item.value" :name="name" v-model="value">' + '            </span>' + '            <span>{{item.label}}</span>' + '        </label>' + '    </template>' + '</template>',
                props: {
                    value: Array,
                    name: String,
                    disabled: [],
                    options: Array,
                    useButton: Object
                },
                methods: {
                    check: function check(v) {
                        this.value.indexOf(v) > -1 ? this.value.$remove(v) : this.value.push(v);
                    }
                }

            });
        }
    }, {
        key: 'button',
        value: function button() {
            Vue.component('vButton', {
                template: "<span v-el:father style='display: inline-block;' :style='style'><template v-if='material==\"span\"'>" + "<span class='zq-btn' style='display: inline-block;' :style=\"styleBtn\" :class=\"btnClass\"><slot></slot></span>" + "</template>" + "<template v-else>" + "<button :type='htmlType' :disabled='disabled1' :style=\"styleBtn\" class='zq-btn' :class=\"btnClass\"><slot></slot></button>" + "</template></span>",

                props: {
                    style: Object,
                    styleBtn: Object,
                    type: String,
                    htmlType: String,
                    disabled: Boolean,
                    material: String,
                    width: ['Number', 'String'],
                    height: ['Number', 'String'],
                    left: ['Number', 'String'],
                    right: ['Number', 'String']
                },
                data: function data() {
                    if (this.disabled === undefined) this.disabled = true;
                    return {
                        disabled1: this.disabled
                    };
                },

                computed: {
                    btnClass: function btnClass() {
                        var cls = ['zq-' + this.type + '-btn'];
                        if (this.disabled) {
                            cls.push('zq-disable-btn');
                        };
                        if (!this.type || this.type == 'ghost') cls.push('zq-default-btn');
                        return cls.join(" ");
                    }
                },
                beforeCompile: function beforeCompile() {
                    var style = {
                        width: this.width + 'px',
                        height: this.height + 'px',
                        marginLeft: this.left + 'px',
                        marginRight: this.right + 'px'
                    };

                    if (this.material == 'span') {
                        style.lineHeight = this.height ? this.height - 10 + 'px' : '24px';
                    }

                    this.styleBtn = Object.assign(style, this.styleBtn);
                }
            });
        }
    }, {
        key: 'modal',
        value: function modal() {
            //模态框组件
            Vue.component('modal', {
                template: '<div v-el:modal class="modal-layer v-modal" :style="{top: top + \'px\'}" id="marketing-layer" transition="modal" v-show="show" @click.self="hideBind">' + '<div class="modal-layer-part" :style="{width: width + \'px\'}">' + '<div class="modal-layer-part-title modal-layer-success other-layer-title" :class="{\'modal-layer-success\': type ==\'success\', \'modal-layer-failed\' :type ==\'failed\'}">' + '<span class="modal-layer-part-title-left">{{title}}</span>' + '<span class="modal-layer-part-title-right" @click="close">' + '×' + '</span>' + '</div>' + '<div class="modal-layer-content"><slot></slot></div>' + '<template v-if="nofooter">' + '<div style="height: 30px"></div>' + '</template>' + '<div class="clearfix modal-layer-footer" v-if="!nofooter">' + '<div class="footer-btn"><v-button :disabled="btnDisabled" :type="type == \'failed\' ? \'red\' : \'blue\'" width=76 height=26 @click="onOk()">{{btnText || "确定"}}</v-button></div>' + '</div>' + '</div>' + ' </div>',
                props: {
                    show: Boolean,
                    title: String,
                    type: String,
                    onOk: Function,
                    width: [Number, String],
                    top: [Number, String],
                    btnText: String,
                    dismiss: Boolean,
                    nofooter: Boolean,
                    btnDisabled: Boolean
                },
                watch: {
                    'show': function show() {
                        if (this.show) {
                            //$('body').css({
                            //    overflowY: 'hidden',
                            //    paddingRight: `${this.getScrollWidth()}px`
                            //})

                            document.body.style.overflowY = 'hidden';
                            document.body.style.paddingRight = this.getScrollWidth() + 'px';

                            this.$els.modal.style.paddingRight = '17px';
                        } else {
                            this.clearPadding();
                        }
                    }
                },
                methods: {
                    getScrollWidth: function getScrollWidth() {
                        var oP = document.createElement('p'),
                            styles = {
                            width: '100px',
                            height: '100px'
                        },
                            i,
                            clientWidth1,
                            clientWidth2,
                            scrollbarWidth;
                        //$(oP).css(styles);
                        for (i in styles) {
                            oP.style[i] = styles[i];
                        } //$('body').append(oP);
                        document.body.appendChild(oP);
                        clientWidth1 = oP.clientWidth;
                        oP.style.overflowY = 'scroll';
                        clientWidth2 = oP.clientWidth;
                        scrollbarWidth = clientWidth1 - clientWidth2;
                        //$(oP).remove();
                        oP.parentElement.removeChild(oP);
                        return scrollbarWidth;
                    },
                    clearPadding: function clearPadding() {
                        //$('body').css({
                        //    overflowY: 'auto',
                        //    paddingRight: '0'
                        //});

                        document.body.style.overflowY = 'auto';
                        document.body.style.paddingRight = '0';
                        this.$els.modal.style.paddingRight = '0';
                    },
                    close: function close() {
                        this.show = false;
                    },

                    hideBind: function hideBind() {
                        if (!this.dismiss) return;
                        this.show = false;
                    }
                }
            });
        }
    }, {
        key: 'tooltip',
        value: function tooltip() {
            /**
             * Created by user on 2016/6/14.
             */
            Vue.component('tooltip', {
                template: '<span v-el:slot style="display: inline-block;" @mouseenter="tigger(1)" @mouseleave="tigger(0)"><slot></slot></span>' + '<div v-el:tooltip class="zq-tooltip zq-tooltip-placement-top" transition="zoom" v-show="show" :style="{left: left, top: top, transformOrigin: \'50% 51px 0px\'}">' + '<div class="zq-tooltip-content">' + '<div class="zq-tooltip-arrow"></div>' + '<div class="zq-tooltip-inner">' + '<span>{{title}}</span>' + '</div>' + '</div></div>',
                props: {
                    title: String
                },
                data: function data() {
                    return {
                        show: false,
                        left: 0,
                        top: 0
                    };
                },
                methods: {
                    tigger: function tigger(_a) {
                        this.show = !this.show;
                        if (_a == 1) {
                            this.$nextTick(function () {
                                this.getoffset();
                            });
                        }
                    },
                    getoffset: function getoffset() {
                        var slot = this.$els.slot,
                            tooltip = this.$els.tooltip;
                        this.left = slot.offsetLeft + parseInt((slot.offsetWidth - tooltip.offsetWidth) / 2) + 'px';
                        this.top = slot.offsetTop - slot.offsetHeight - tooltip.offsetHeight + slot.offsetHeight / 1.28 + 'px';
                    }
                }
            });
        }
    }]);

    return Component;
}();

//默认初始化 v-button, v-tooltip


new Component('button');
new Component('tooltip');

//# sourceMappingURL=component.all.js.map