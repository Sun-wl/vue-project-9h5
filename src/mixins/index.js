import {baseUrl} from '@/api'
var mixins = {
  data: function () {
    return {
      text: '获取',
      toastShow: false,
      toastText: '',
      delicerys: [
        {value: 'EMS', name: 'EMS'},
        {value: 'SF', name: '顺丰'},
        {value: 'YTO', name: '圆通'},
        {value: 'HTKY', name: '百世快递'},
        {value: 'ZTO', name: '中通'},
        {value: 'YD', name: '韵达'},
        {value: 'STO', name: '申通'}
      ]
    }
  },
  components: {
    'toast': require("../components/toast.vue")
  },
  methods: {
    timeChange(value){
      /*时间： 9 -- 09， 10 -- 10*/
      return String(value).length < 2 ? '0' + value : value
    },
    getTime(value){
      /*2017-12-12 12:12*/
      return (new Date(value)).getFullYear() + '-' +
        this.timeChange((new Date(value)).getMonth() + 1) + '-' +
        this.timeChange((new Date(value)).getDate()) + ' ' +
        this.timeChange((new Date(value)).getHours()) + ':' +
        this.timeChange((new Date(value)).getMinutes())
    },
    getDate(value){
      /*2017-12-12*/
      return (new Date(value)).getFullYear() + '-' +
        this.timeChange((new Date(value)).getMonth() + 1) + '-' +
        this.timeChange((new Date(value)).getDate())
    },
    jump(path){
      this.$router.push(path)
    },
    jumpReplace(path){
      this.$router.replace(path)
    },
    toast(toastText){
      /*弹框*/
      var _this = this;
      _this.toastText = toastText;
      _this.toastShow = true;
      setTimeout(function () {
        _this.toastShow = false;
      }, 1000);
    },
    sendCode(type, phone){
      //发送验证码
      if (!/^1[345678]\d{9}$/.test(phone)) {
        alert("请输入正确的手机号")
        return
      }
      var c = 59;
      this.text = "60s";
      var _this = this;
      var t = setInterval(function () {
        _this.text = c + "s";
        if (c == 0) {
          clearInterval(t);
          c = 60;
          _this.text = '获取';
        }
        c--;
      }, 1000);
      this.$http.post(baseUrl + 'api/captcha/sendSMS', {
        mobile: phone,
        type: +type
      }, {emulateJSON: true}).then(function (res) {
        if (res.status != 200) {
          clearInterval(t);
          c = 60;
          this.text = '获取';
          alert('当前网络连接错误')
        } else {
          if (res.data.statusCode != 200) {
            clearInterval(t);
            c = 60;
            this.text = '获取';
            alert(res.data.message)
          }
        }

      }, function (res) {
        console.log(res)
        alert('当前网络连接错误')
        clearInterval(t);
        c = 60;
        this.text = '获取';
      });
    }
  },
  created(){

  }
}

export default mixins;

