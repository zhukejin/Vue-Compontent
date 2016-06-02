Vue.component('vButton', {
    template: "<button :type='htmlType' :disabled='disabled' :style=\"{width: width + 'px', height: height + 'px', marginLeft: left + 'px', marginRight: right + 'px'}\" class='zq-btn' :class=\"btnClass\"><slot></slot></button>",
    props: {
        type: String,
        htmlType: String,
        disabled: Boolean,
        width: ['Number', 'String'],
        height: ['Number', 'String'],
        left: ['Number', 'String'],
        right: ['Number', 'String'],
    },
    data: function () {
        if (this.disabled === undefined) this.disabled = true;
        return {
            disabled : this.disabled,
            htmlType : this.htmlType || 'button'
        }
    },
    computed: {
        btnClass: function () {
            var cls = [this.type + '-btn']
            if (this.disabled) cls.push('disable-btn');
            if (!this.type || this.type == 'ghost') cls.push('default-btn');
            return cls.join(" ");
        }
    }
});