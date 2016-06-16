Vue.component('vButton', {
    template: "<span v-el:father style='display: inline-block;' :style='style'><template v-if='material==\"span\"'>" +
    "<span class='zq-btn' :style=\"styleBtn\" :class=\"btnClass\"><slot></slot></span>" +
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
    data: function () {
        if (this.disabled === undefined) this.disabled = true;
        return {
            disabled1 : this.disabled,
        }
    },
    computed: {
        btnClass: function () {
            var cls = ['zq-' + this.type + '-btn']
            if (this.disabled) {
                cls.push('zq-disable-btn');
            };
            if (!this.type || this.type == 'ghost') cls.push('zq-default-btn');
            return cls.join(" ");
        }
    },
    beforeCompile: function () {
        function assign (obj1, obj2) {
            for(var key in obj2){
                obj1[key]=obj2[key]
            }
            return obj1;
        }

        var style = {
            width: this.width + 'px',
            height: this.height + 'px',
            marginLeft: this.left + 'px',
            marginRight: this.right + 'px'
        };

        if (this.material == 'span') {
            style.lineHeight = this.height ? (this.height - 10 + 'px') : '24px'
        }

        this.styleBtn = assign(style, this.styleBtn);
    }
});