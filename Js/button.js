Vue.component('vButton', {
    template: "<span v-el:father style='display: inline-block;'><template v-if='material==\"span\"'>" +
         "<span :style=\"{width: width + 'px', height: height + 'px', marginLeft: left + 'px', marginRight: right + 'px', lineHeight: '24px'}\" class='zq-btn' :class=\"btnClass\"><slot></slot></span>" + 
    "</template>" +
    "<template v-else>"+
    "<button :type='htmlType' :disabled='disabled' :style=\"{width: width + 'px', height: height + 'px', marginLeft: left + 'px', marginRight: right + 'px'}\" class='zq-btn' :class=\"btnClass\"><slot></slot></button>"
    +"</template></span>",

    props: {
        type: String,
        htmlType: String,
        disabled: Boolean,
        material: String,
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
            var cls = ['zq-' + this.type + '-btn']
            if (this.disabled) { 
                cls.push('zq-disable-btn');
                this.$off(['click'])
            };
            if (!this.type || this.type == 'ghost') cls.push('zq-default-btn');
            return cls.join(" ");
        }
    }
});