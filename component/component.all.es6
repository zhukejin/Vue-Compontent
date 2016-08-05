/**
 * Create by zhukejin@hupu.com
 * Date 2016年6月24日14:28:28
 */
class Component {
    constructor(directive) {
        this[directive] && this[directive]();
    }

    chekckbox () {
        Vue.component('checkbox', {
            template:'<label class=\'ant-checkbox-wrapper\'>'+
            '<span class="ant-checkbox" :class="{\'ant-checkbox-checked-1 ant-checkbox-checked\': isValue ? value === trueValue : value, \'ant-checkbox-disabled\': disabled}">' +
            '            <span class="ant-checkbox-inner"></span>'+
            '            <input v-if=\'isValue\' :disabled=\'disabled\' type=\'checkbox\' class="ant-checkbox-input" :name="name" v-model="value" :true-value="trueValue" :false-value="falseValue">'+
            '            <input v-else :disabled=\'disabled\' type="checkbox" class="ant-checkbox-input" :name="name" v-model="value">'+
            '        </span>'+
            '        <span><slot></slot></span>'+
            '    </label>',
            props: {
                value: {
                    required: true,
                    twoWay: true
                },
                name: String,
                isValue: [],
                trueValue: [],
                falseValue: [],
                disabled: [],
            },
            watch: {
                'value': function (v) {
                    this.$dispatch('onchange', {
                        value: v,
                        name: this.name
                    })
                }
            }
        });
    }


    checkboxGroup () {
        Vue.component('checkboxGroup', {
            template: '<template v-if="useButton">'+
            '    <template v-for="item in options">'+
            '        <label class=\'ant-checkbox-wrapper\'>'+
            '            <input :disabled=\'item.disabled\' type="checkbox" class="zq-hidden" :value="item.value" :name="name" v-model="value">'+
            '            <v-button :width="useButton.width" :disabled="item.disabled" :type="!item.disabled && value.indexOf(item.value) < 0 ? useButton.startType : !item.disabled && value.indexOf(item.value) > -1 ? useButton.endType : \'\'" @click="check(item.value)">{{item.label}}</v-button>'+
            '        </label>'+
            '    </template>'+
            '</template>'+
            '<template v-else>'+
            '    <template v-for="item in options">'+
            '        <label class=\'ant-checkbox-wrapper\'>'+
            '            <span class="ant-checkbox" :class="{\'ant-checkbox-checked-1 ant-checkbox-checked\': value.indexOf(item.value) > -1, \'ant-checkbox-disabled\': item.disabled}">'+
            '                <span class="ant-checkbox-inner"></span>'+
            '                <input :disabled=\'item.disabled\' type="checkbox" class="ant-checkbox-input" :value="item.value" :name="name" v-model="value">'+
            '            </span>'+
            '            <span>{{item.label}}</span>'+
            '        </label>'+
            '    </template>'+
            '</template>',
            props: {
                value: Array,
                name: String,
                disabled: [],
                options: Array,
                useButton: Object
            },
            methods: {
                check: function (v) {
                    this.value.indexOf(v) > -1 ? this.value.$remove(v) : this.value.push(v);
                }
            }

        });
    }

    button () {
        Vue.component('vButton', {
            template: "<span style='display: inline-block;' :style='style'><template v-if='material==\"span\"'>" +
            "<span class='zq-btn' style='display: inline-block;' :style=\"styleBtn\" :class=\"btnClass\"><slot></slot></span>" +
            "</template>" +
            "<template v-else>"+
            "<button :type='htmlType' :disabled='disabled1' :style=\"styleBtn\" class='zq-btn' :class=\"btnClass\"><slot></slot></button>"
            +"</template></span>",

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
                right: ['Number', 'String'],
            },
            computed: {
                disabled1 () {
                    return this.disabled;
                },
                btnClass () {
                    var cls = ['zq-' + this.type + '-btn']
                    if (this.disabled) {
                        cls.push('zq-disable-btn');
                    };
                    if (!this.type || this.type == 'ghost') cls.push('zq-default-btn');
                    return cls.join(" ");
                }
            },
            beforeCompile () {
                var style = {
                    width: this.width + 'px',
                    height: this.height + 'px',
                    marginLeft: this.left + 'px',
                    marginRight: this.right + 'px'
                };

                if (this.material == 'span') {
                    style.lineHeight = this.height ? (this.height - 10 + 'px') : '24px'
                }

                this.styleBtn = Object.assign(style, this.styleBtn);

                if (this.disabled === undefined) this.disabled = true;
            }
        });
    }


    modal () {
        //模态框组件
        Vue.component('modal', {
            template: '<template v-if="position == \'center\'">' +
            '<div v-el:modal class="modal-mask v-modal" v-show="show" transition="modal">' +
            '<div class="modal-wrapper" @click.self="hideBind">' +
            '<div class="modal-container" :style="{width: width + \'px\'}">' +
            '<div class="modal-layer-part-title modal-layer-success other-layer-title" :class="{\'modal-layer-success\': type ==\'success\', \'modal-layer-failed\' :type ==\'failed\'}">'+
            '<span class="modal-layer-part-title-left">{{title}}</span>'+
            '<span class="modal-layer-part-title-right" @click="close">'+
            '×'+
            '</span>'+
            '</div>'+
            '<div class="modal-layer-content"><slot></slot></div>' +
            '<template v-if="noFooter">' +
            '<div style="height: 30px"></div>'+
            '</template>'+
            '<div class="clearfix modal-layer-footer" v-if="!noFooter">'+
            '<div class="footer-btn"><v-button :disabled="btnDisabled" :type="type == \'failed\' ? \'red\' : \'blue\'" width=76 height=26 @click="onOk()">{{btnText || "确定"}}</v-button></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</template>' +

            '<template v-else>' +
            '<div v-el:modal class="modal-layer v-modal" id="marketing-layer" transition="modal" v-show="show" @click.self="hideBind">'+
            '<div class="modal-layer-part" :style="{width: width + \'px\',top: top + \'px\'}">'+
            '<div class="modal-layer-part-title modal-layer-success other-layer-title" :class="{\'modal-layer-success\': type ==\'success\', \'modal-layer-failed\' :type ==\'failed\'}">'+
            '<span class="modal-layer-part-title-left">{{title}}</span>'+
            '<span class="modal-layer-part-title-right" @click="close">'+
            '×'+
            '</span>'+
            '</div>'+
            '<div class="modal-layer-content"><slot></slot></div>' +
            '<template v-if="noFooter">' +
            '<div style="height: 30px"></div>'+
            '</template>'+
            '<div class="clearfix modal-layer-footer" v-if="!noFooter">'+
            '<div class="footer-btn"><v-button :disabled="btnDisabled" :type="type == \'failed\' ? \'red\' : \'blue\'" width=76 height=26 @click="onOk()">{{btnText || "确定"}}</v-button></div>' +
            '</div>' +
            '</div>'+
            ' </div></template>',
            props: {
                show:Boolean,
                position: String,
                title:String,
                type:String,
                onOk: Function,
                width: [Number, String],
                top: [Number, String],
                btnText: String,
                dismiss: Boolean,
                noFooter: Boolean,
                btnDisabled: Boolean
            },
            watch: {
                'show' () {
                    if (this.show) {
                        //$('body').css({
                        //    overflowY: 'hidden',
                        //    paddingRight: `${this.getScrollWidth()}px`
                        //})

                        document.body.style.overflowY = 'hidden';
                        document.body.style.paddingRight = `${this.getScrollWidth()}px`;
                        this.$els.modal.style.paddingRight = '17px';
                    } else {

                        setTimeout(()=>{
                            this.clearPadding();
                        },300)

                    }
                }
            },
            methods: {
                getScrollWidth () {
                    var oP = document.createElement('p'),
                        styles = {
                            width: '100px',
                            height: '100px'
                        }, i, clientWidth1, clientWidth2, scrollbarWidth;
                    //$(oP).css(styles);
                    for (i in styles) oP.style[i] = styles[i];

                    //$('body').append(oP);
                    document.body.appendChild(oP);
                    clientWidth1 = oP.clientWidth;
                    oP.style.overflowY = 'scroll';
                    clientWidth2 = oP.clientWidth;
                    scrollbarWidth = clientWidth1 - clientWidth2;
                    //$(oP).remove();
                    oP.parentElement.removeChild(oP);
                    return scrollbarWidth;
                },
                clearPadding () {
                    //$('body').css({
                    //    overflowY: 'auto',
                    //    paddingRight: '0'
                    //});

                    document.body.style.overflowY = 'auto';
                    document.body.style.paddingRight = '0';
                    this.$els.modal.style.paddingRight = '0';
                },
                close () {
                    this.show = false;
                },
                hideBind : function () {
                    if (!this.dismiss) return;
                    this.show = false
                }
            }
        });
    }

    tooltip () {
        /**
         * Created by user on 2016/6/14.
         */
        Vue.component('tooltip', {
            template: '<span v-el:slot style="display: inline-block;" @mouseenter="tigger(1)" @mouseleave="tigger(0)"><slot></slot></span>' +
            '<div v-el:tooltip class="zq-tooltip zq-tooltip-placement-top" transition="zoom" v-show="show" :style="{left: left, top: top, transformOrigin: \'50% 51px 0px\'}">' +
            '<div class="zq-tooltip-content">' +
            '<div class="zq-tooltip-arrow"></div>' +
            '<div class="zq-tooltip-inner">' +
            '<span>{{title}}</span>' +
            '</div>' +
            '</div></div>',
            props: {
                title: String,
            },
            data: function () {
                return {
                    show : false,
                    left: 0,
                    top: 0,
                }
            },
            methods: {
                tigger: function (_a) {
                    this.show = !this.show;
                    if (_a == 1) {
                        this.$nextTick(function () {
                            this.getoffset();
                        });
                    }
                },
                getoffset: function () {
                    var slot = this.$els.slot,
                        tooltip = this.$els.tooltip;
                    this.left = slot.offsetLeft + parseInt((slot.offsetWidth - tooltip.offsetWidth) / 2) + 'px';
                    this.top = slot.offsetTop - slot.offsetHeight - tooltip.offsetHeight + (slot.offsetHeight / 1.28) + 'px';
                }
            },
        });
    }
}

//默认初始化 v-button, v-tooltip
new Component('button');
new Component('tooltip');