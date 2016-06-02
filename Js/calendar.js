/**
 * Created by user on 2016/6/1.
 */
Vue.component('calendar', {
    template: '<div @click.stop=""  @touchstart.stop="" class="calendar" v-show="show" :style="{\'left\':x+\'px\',\'top\':y+\'px\'}" transition="calendar" transition-mode="out-in">' +
    '<div class="calendar-tools">' +
    '<i class="left" @click="prev"  @touchstart="prev"> < </i>' +
    '<div class="text center"> ' +
    '<input type="number" v-model="year" value="{{year}}" @change="render(year,month)" @input="render(year,month)" min="1970" max="2100" maxlength="4" number> ' +
    '/ <input type="number" v-model="month" value="{{month + 1}}" @input="render(year,month)" @change="render(year,month)" min="1" max="12" maxlength="2" number> </div>' +
    '<i class="right" @click="next"  @touchstart="next"> > </i> </div> ' +
    '<table cellpadding="5"> <thead> ' +
    '<tr> ' +
    '<td v-for="week in weeks" class="week">{{week}}</td> </tr></thead> ' +
    '<tr v-for="(k1,day) in days"> <td v-for="(k2,child) in day" :class="{\'today\':child.today,\'disabled\':child.disabled}" @click="select(k1,k2,$event)" @touchstart="select(k1,k2,$event)">' +
    '{{child.day}} ' +
    '<div class="lunar" v-if="showLunar">{{child.lunar}}</div> </td> ' +
    '</tr> </table> ' +
    '<div class="calendar-time" v-show="type==\'datetime\'||type==\'time\'"> ' +
    '<div class="timer"> <input type="number" v-model="hour" value="{{hour}}" min="0" max="23" maxlength="2" number> 时 ' +
    '<input type="number" v-model="minute" value="{{minute}}" min="0" max="59" maxlength="2" number> 分 ' +
    '<input type="number" v-model="second" value="{{second}}" min="0" max="59" maxlength="2" number> 秒 </div> ' +
    '</div> <div class="calendar-button" v-show="type==\'datetime\'||type==\'time\'||range"> <button @click="ok">确定</button> <button @click="cancel" class="cancel">取消</button> ' +
    '</div> </div>',
    props: {
        show: {
            type: Boolean,
            twoWay: true,
            default:false
        },
        type: {
            type: String,
            default:"date"
        },
        value: {
            type: String,
            twoWay: true,
            default:""
        },
        x: {
            type: Number,
            default:0
        },
        y: {
            type: Number,
            default:0
        },
        begin: {
            type: String,
            default:""
        },
        end: {
            type: String,
            default:""
        },
        range: {
            type: Boolean,
            default:false
        },
        rangeBegin:{
            type: Array,
            default:Array
        },
        rangeEnd:{
            type: Array,
            default:Array
        }
    },
    data:function(){
        return {
            year:0,
            month:0,
            day:0,
            hour:0,
            minute:0,
            second:0,
            days:[],
            today:[],
            currentMonth:Number,
            sep:"/",
            weeks:['日', '一', '二', '三', '四', '五', '六'],
            months:['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        }
    },
    created:function(){
        var that=this;
        var now = new Date();
        if(that.value!=""){
            if(that.value.indexOf("-")!=-1)that.sep="-";
            if(that.value.indexOf(".")!=-1)that.sep=".";

            if(that.type=="date"){
                var split=that.value.split(that.sep);
                that.year = parseInt(split[0]);
                that.month =parseInt(split[1])-1;
                that.day = parseInt(split[2]);
            }else if(that.type=="datetime"){
                var split=that.value.split(" ");
                var splitDate=split[0].split(that.sep);
                that.year = parseInt(splitDate[0]);
                that.month =parseInt(splitDate[1])-1;
                that.day = parseInt(splitDate[2]);
                if(split.length>1){
                    var splitTime=split[1].split(":");
                    that.hour = splitTime[0];
                    that.minute = splitTime[1];
                    that.second = splitTime[2];
                }
            }
            if(that.range){
                var split=that.value.split(" ~ ");
                if(split.length>1){
                    var beginSplit=split[0].split(that.sep);
                    var endSplit=split[1].split(that.sep);
                    that.rangeBegin=[parseInt(beginSplit[0]),parseInt(beginSplit[1]-1),parseInt(beginSplit[2])];
                    that.rangeEnd=[parseInt(endSplit[0]),parseInt(endSplit[1]-1),parseInt(endSplit[2])];
                }
            }
        }else{
            that.year = now.getFullYear();
            that.month =now.getMonth();
            that.day = now.getDate();
            that.hour = that.zero(now.getHours());
            that.minute = that.zero(now.getMinutes());
            that.second = that.zero(now.getSeconds());
            if(that.range){
                that.rangeBegin=Array;
                that.rangeEnd=Array;
            }
        }
        that.render(that.year,that.month + 1);
    },
    watch:{
        year:function(val,old){
            //console.log("new %s old %s time:%s",val,old,+new Date);
        }
    },
    methods:{
        zero:function(n){
            return n<10?'0'+n:n;
        },
        render:function(y,m, a){
            //if (a) {
                m --;
            //}
            var that=this;
            var firstDayOfMonth = new Date(y, m, 1).getDay();//当月第一天
            var lastDateOfMonth = new Date(y, m + 1, 0).getDate();//当月最后一天
            var lastDayOfLastMonth = new Date(y, m, 0).getDate();//最后一月的最后一天
            that.year=y;
            console.log(m)
            that.currentMonth=that.months[m];

            var seletSplit=that.value.split(" ")[0].split(that.sep);
            var i,line=0,temp=[];
            for(i=1;i <= lastDateOfMonth;i++) {
                var dow = new Date(y, m, i).getDay();
                // 第一行
                if (dow == 0) {
                    temp[line]=[];
                }else if (i == 1) {
                    temp[line]=[];
                    var k = lastDayOfLastMonth - firstDayOfMonth + 1;
                    for (var j = 0; j < firstDayOfMonth; j++) {
                        temp[line].push({day:k,disabled:true});
                        k++;
                    }
                }

                // 如果是日期范围
                if(that.range){

                    var options={day:i};

                    if(that.rangeBegin.length>0){
                        var beginTime=Number(new Date(that.rangeBegin[0],that.rangeBegin[1],that.rangeBegin[2]));
                        var endTime=Number(new Date(that.rangeEnd[0],that.rangeEnd[1],that.rangeEnd[2]));
                        var thisTime=Number(new Date(that.year,that.month,i));

                        if(beginTime<=thisTime&&endTime>=thisTime){
                            options.today=true;
                        }
                    }
                    temp[line].push(options);
                }else{

                    var chk = new Date();
                    var chkY = chk.getFullYear();
                    var chkM = chk.getMonth();
                    if(
                        parseInt(seletSplit[0])==that.year
                        &&
                        parseInt(seletSplit[1])-1==that.month
                        &&
                        parseInt(seletSplit[2])==i
                        &&
                        (that.begin==undefined||that.end==undefined)
                    ){
                        temp[line].push({day:i,today:true});
                        that.today=[line,temp[line].length-1];
                        // 当天
                    }else if (chkY == that.year && chkM == that.month && i == that.day&&that.value==undefined) {
                        temp[line].push({day:i,today:true});
                        that.today=[line,temp[line].length-1];
                    } else {//默认
                        // 1.判断begin和end的日期
                        var options={day:i,today:false};
                        if(that.begin!=undefined){
                            var beginSplit=that.begin.split(that.sep);
                            var beginTime=Number(new Date(parseInt(beginSplit[0]),parseInt(beginSplit[1])-1,parseInt(beginSplit[2])));
                            var thisTime=Number(new Date(that.year,that.month,i));
                            if(beginTime>thisTime)options.disabled=true;
                        }
                        if(that.end!=undefined){
                            var endSplit=that.end.split(that.sep);
                            var endTime=Number(new Date(parseInt(endSplit[0]),parseInt(endSplit[1])-1,parseInt(endSplit[2])));
                            var thisTime=Number(new Date(that.year,that.month,i));
                            if(endTime<thisTime)options.disabled=true;
                        }
                        temp[line].push(options);
                    }
                }

                // 最后一行
                if (dow == 6) {
                    line++;
                }else if (i == lastDateOfMonth) {
                    var k = 1;
                    for (dow; dow < 6; dow++) {
                        temp[line].push({day:k,disabled:true});
                        k++;
                    }
                }
            }//end for
            that.days=temp;
        },
        prev:function(e){
            e.stopPropagation();
            var that=this;
            if (that.month == 0) {
                that.month = 11;
                that.year = that.year - 1;
            } else {
                that.month = that.month - 1;
            }
            that.render(that.year,that.month);
        },
        next:function(e){
            e.stopPropagation();
            var that=this;
            if (that.month == 11) {
                that.month = 0;
                that.year = that.year + 1;
            } else {
                that.month = that.month + 1;
            }
            that.render(that.year,that.month);
        },
        select:function(k1,k2,e){
            if(e!=undefined)e.stopPropagation();
            var that=this;
            // 日期范围
            if(that.range){
                if(that.rangeBegin.length==0||that.rangeEndTemp!=0){
                    that.rangeBegin=[that.year,that.month,that.days[k1][k2].day,that.hour,that.minute,that.second];
                    that.rangeBeginTemp=that.rangeBegin;
                    that.rangeEnd=[that.year,that.month,that.days[k1][k2].day,that.hour,that.minute,that.second];
                    that.rangeEndTemp=0;
                }else{
                    that.rangeEnd=[that.year,that.month,that.days[k1][k2].day,that.hour,that.minute,that.second];
                    that.rangeEndTemp=1;
                    // 判断结束日期小于开始日期则自动颠倒过来
                    if(+new Date(that.rangeEnd[0],that.rangeEnd[1],that.rangeEnd[2])<+new Date(that.rangeBegin[0],that.rangeBegin[1],that.rangeBegin[2])){
                        that.rangeBegin=that.rangeEnd;
                        that.rangeEnd=that.rangeBeginTemp;
                    }
                }
                that.render(that.year,that.month);
            }else{
                // 取消上次选中
                if(that.today.length>0){
                    that.days[that.today[0]][that.today[1]].today=false;
                }
                // 设置当前选中天
                that.days[k1][k2].today=true;
                that.day=that.days[k1][k2].day;
                that.today=[k1,k2];
                if(that.type=='date'){
                    that.value=that.year+that.sep+that.zero(that.month)+that.sep+that.zero(that.days[k1][k2].day);
                    that.show=false;
                }
            }
        },
        ok:function(){
            var that=this;
            if(that.range){
                that.value=that.output(that.rangeBegin)+" ~ "+that.output(that.rangeEnd);
            }else{
                that.value=that.output([that.year,that.month,that.day,that.hour,that.minute,that.second]);
            }
            that.show=false;
        },
        cancel:function(){
            this.show=false;
        },
        // 格式化输出
        output:function(args){
            var that=this;
            if(that.type=='time'){
                return that.zero(args[3])+":"+that.zero(args[4])+":"+that.zero(args[5])
            }
            if(that.type=='datetime'){
                return args[0]+that.sep+that.zero(args[1])+that.sep+that.zero(args[2])+" "+that.zero(args[3])+":"+that.zero(args[4])+":"+that.zero(args[5])
            }
            if(that.type=='date'){
                return args[0]+that.sep+that.zero(args[1])+that.sep+that.zero(args[2]);
            }
        }
    }
})