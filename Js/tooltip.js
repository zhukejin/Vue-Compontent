Vue.component('tooltip', {
        template: '<span v-el:slot style="display: inline-block;" @mouseover="tigger" @mouseout="tigger"><slot></slot></span>' +
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
                style: {}
            }
        },
        methods: {
            tigger: function () {
                this.show = !this.show;
                this.$nextTick(function () {
                    this.getoffset();
                });
            },
            getoffset: function () {
                var slot = this.$els.slot,
                    tooltip = this.$els.tooltip;

                this.left = slot.offsetLeft + parseInt((slot.offsetWidth - tooltip.offsetWidth) / 2) + 'px';
                this.top = slot.offsetTop - slot.offsetHeight - tooltip.offsetHeight + (slot.offsetHeight / 1.28) + 'px';
            }
        },
    });