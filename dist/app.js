'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    // 修复并发
    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/my/index', 'pages/init/add', 'pages/init/grade', 'pages/my/info', 'pages/my/pay', 'pages/my/vip', 'pages/my/email', 'pages/workbook/add', 'pages/workbook/index', 'pages/workbook/want', 'pages/workbook/error', 'pages/workbook/correct', 'pages/workbook/share', 'pages/workbook/chapter', 'pages/workbook/exercise', 'pages/paper/index', 'pages/paper/filter', 'pages/statistics/index', 'pages/statistics/error', 'pages/statistics/share', 'pages/statistics/correct'],
      tabBar: {
        color: '#aaa',
        selectedColor: '#3FC6C6',
        borderStyle: 'black',
        backgroundColor: '#ffffff',
        list: [{
          pagePath: 'pages/workbook/index',
          iconPath: 'common/resources/statistics.png',
          selectedIconPath: 'common/resources/statistics_select.png',
          text: '记错题'
        }, {
          pagePath: 'pages/statistics/index',
          iconPath: 'common/resources/workbook.png',
          selectedIconPath: 'common/resources/workbook_select.png',
          text: '错题本'
        }, {
          pagePath: 'pages/paper/index',
          iconPath: 'common/resources/paper.png',
          selectedIconPath: 'common/resources/paper_select.png',
          text: '资源'
        }, {
          pagePath: 'pages/my/index',
          iconPath: 'common/resources/user.png',
          selectedIconPath: 'common/resources/user_select.png',
          text: '我的'
        }]
      },
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#FBFBFB',
        navigationBarTitleText: '错题归纳本初中数学',
        navigationBarTextStyle: 'black'
      },
      networkTimeout: {
        request: 8000,
        downloadFile: 8000
      }
    };
    _this.globalData = {
      system: {},
      paperFilter: {
        tag: 'hot',
        type: '0',
        grade: '8',
        year: '0'
      }
    };
    _this.use('requestfix');
    // request全局配置
    _this.intercept('request', {
      config: function config(params) {
        var header = {
          'openId': _wepy2.default.getStorageSync('gnb_middle_openId') || ''
        };
        _wepy2.default.showNavigationBarLoading();
        params.header = header;
        return params;
      },
      success: function success(res) {
        console.log(res);
        var statusCode = res.statusCode.toString();
        var dataCode = res.data.code.toString();
        if (statusCode === '200') {
          if (dataCode === '200') {
            return res.data.data;
          } else if (dataCode === '401') {
            // 未注册用户
            _wepy2.default.redirectTo({
              url: '/pages/init/grade'
            });
          } else {
            _wepy2.default.showToast({
              title: res.data.msg,
              icon: 'none'
            });
            return Promise.reject(new Error('错误的code'));
          }
        } else if (statusCode === '403') {
          // openid为空
          _wepy2.default.redirectTo({
            url: '/pages/my/index'
          });
        }
      },
      fail: function fail(error) {
        _wepy2.default.showToast({
          title: '网络错误',
          icon: 'none'
        });
        return Promise.reject(error);
      },
      complete: function complete() {
        _wepy2.default.hideNavigationBarLoading();
      }
    });
    // 设备信息获取
    var self = _this;
    wx.getSystemInfo({
      success: function success(res) {
        self.globalData.system = res;
      }
    });
    // 掉网的提示
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        _wepy2.default.showToast({
          title: '请检查网络连接',
          icon: 'none'
        });
      }
    });
    return _this;
  }

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsInRhYkJhciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImJvcmRlclN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJuZXR3b3JrVGltZW91dCIsInJlcXVlc3QiLCJkb3dubG9hZEZpbGUiLCJnbG9iYWxEYXRhIiwic3lzdGVtIiwicGFwZXJGaWx0ZXIiLCJ0YWciLCJ0eXBlIiwiZ3JhZGUiLCJ5ZWFyIiwidXNlIiwiaW50ZXJjZXB0IiwicGFyYW1zIiwiaGVhZGVyIiwiZ2V0U3RvcmFnZVN5bmMiLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsInN0YXR1c0NvZGUiLCJ0b1N0cmluZyIsImRhdGFDb2RlIiwiZGF0YSIsImNvZGUiLCJyZWRpcmVjdFRvIiwidXJsIiwic2hvd1RvYXN0IiwidGl0bGUiLCJtc2ciLCJpY29uIiwiUHJvbWlzZSIsInJlamVjdCIsIkVycm9yIiwiZmFpbCIsImVycm9yIiwiY29tcGxldGUiLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJzZWxmIiwid3giLCJnZXRTeXN0ZW1JbmZvIiwib25OZXR3b3JrU3RhdHVzQ2hhbmdlIiwiaXNDb25uZWN0ZWQiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBNEVFLHNCQUFlO0FBQUE7O0FBRWI7QUFGYTs7QUFBQSxVQXpFZkEsTUF5RWUsR0F6RU47QUFDUEMsYUFBTyxDQUNMLGdCQURLLEVBRUwsZ0JBRkssRUFHTCxr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QW5DbUIsRUFtQ1o7QUFDVix1QkFBS1IsU0FBTCxDQUFlO0FBQ2JDLGlCQUFPLE1BRE07QUFFYkUsZ0JBQU07QUFGTyxTQUFmO0FBSUEsZUFBT0MsUUFBUUMsTUFBUixDQUFlRyxLQUFmLENBQVA7QUFDRCxPQXpDdUI7QUEwQ3hCQyxjQTFDd0Isc0JBMENiO0FBQ1QsdUJBQUtDLHdCQUFMO0FBQ0Q7QUE1Q3VCLEtBQTFCO0FBOENBO0FBQ0EsUUFBSUMsWUFBSjtBQUNBQyxPQUFHQyxhQUFILENBQWlCO0FBQ2Z4QixhQURlLG1CQUNQQyxHQURPLEVBQ0Y7QUFDWHFCLGFBQUtuQyxVQUFMLENBQWdCQyxNQUFoQixHQUF5QmEsR0FBekI7QUFDRDtBQUhjLEtBQWpCO0FBS0E7QUFDQXNCLE9BQUdFLHFCQUFILENBQXlCLFVBQUN4QixHQUFELEVBQVM7QUFDaEMsVUFBSSxDQUFDQSxJQUFJeUIsV0FBVCxFQUFzQjtBQUNwQix1QkFBS2YsU0FBTCxDQUFlO0FBQ2JDLGlCQUFPLFNBRE07QUFFYkUsZ0JBQU07QUFGTyxTQUFmO0FBSUQ7QUFDRixLQVBEO0FBM0RhO0FBbUVkOzs7RUE3STBCLGVBQUthLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9teS9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9pbml0L2FkZCcsXHJcbiAgICAgICdwYWdlcy9pbml0L2dyYWRlJyxcclxuICAgICAgJ3BhZ2VzL215L2luZm8nLFxyXG4gICAgICAncGFnZXMvbXkvcGF5JyxcclxuICAgICAgJ3BhZ2VzL215L3ZpcCcsXHJcbiAgICAgICdwYWdlcy9teS9lbWFpbCcsXHJcbiAgICAgICdwYWdlcy93b3JrYm9vay9hZGQnLFxyXG4gICAgICAncGFnZXMvd29ya2Jvb2svaW5kZXgnLFxyXG4gICAgICAncGFnZXMvd29ya2Jvb2svd2FudCcsXHJcbiAgICAgICdwYWdlcy93b3JrYm9vay9lcnJvcicsXHJcbiAgICAgICdwYWdlcy93b3JrYm9vay9jb3JyZWN0JyxcclxuICAgICAgJ3BhZ2VzL3dvcmtib29rL3NoYXJlJyxcclxuICAgICAgJ3BhZ2VzL3dvcmtib29rL2NoYXB0ZXInLFxyXG4gICAgICAncGFnZXMvd29ya2Jvb2svZXhlcmNpc2UnLFxyXG4gICAgICAncGFnZXMvcGFwZXIvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvcGFwZXIvZmlsdGVyJyxcclxuICAgICAgJ3BhZ2VzL3N0YXRpc3RpY3MvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvc3RhdGlzdGljcy9lcnJvcicsXHJcbiAgICAgICdwYWdlcy9zdGF0aXN0aWNzL3NoYXJlJyxcclxuICAgICAgJ3BhZ2VzL3N0YXRpc3RpY3MvY29ycmVjdCdcclxuICAgIF0sXHJcbiAgICB0YWJCYXI6IHtcclxuICAgICAgY29sb3I6ICcjYWFhJyxcclxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyMzRkM2QzYnLFxyXG4gICAgICBib3JkZXJTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIGxpc3Q6IFt7XHJcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy93b3JrYm9vay9pbmRleCcsXHJcbiAgICAgICAgaWNvblBhdGg6ICdjb21tb24vcmVzb3VyY2VzL3N0YXRpc3RpY3MucG5nJyxcclxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnY29tbW9uL3Jlc291cmNlcy9zdGF0aXN0aWNzX3NlbGVjdC5wbmcnLFxyXG4gICAgICAgIHRleHQ6ICforrDplJnpopgnXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3N0YXRpc3RpY3MvaW5kZXgnLFxyXG4gICAgICAgIGljb25QYXRoOiAnY29tbW9uL3Jlc291cmNlcy93b3JrYm9vay5wbmcnLFxyXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdjb21tb24vcmVzb3VyY2VzL3dvcmtib29rX3NlbGVjdC5wbmcnLFxyXG4gICAgICAgIHRleHQ6ICfplJnpopjmnKwnXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3BhcGVyL2luZGV4JyxcclxuICAgICAgICBpY29uUGF0aDogJ2NvbW1vbi9yZXNvdXJjZXMvcGFwZXIucG5nJyxcclxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnY29tbW9uL3Jlc291cmNlcy9wYXBlcl9zZWxlY3QucG5nJyxcclxuICAgICAgICB0ZXh0OiAn6LWE5rqQJ1xyXG4gICAgICB9LCB7XHJcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9teS9pbmRleCcsXHJcbiAgICAgICAgaWNvblBhdGg6ICdjb21tb24vcmVzb3VyY2VzL3VzZXIucG5nJyxcclxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnY29tbW9uL3Jlc291cmNlcy91c2VyX3NlbGVjdC5wbmcnLFxyXG4gICAgICAgIHRleHQ6ICfmiJHnmoQnXHJcbiAgICAgIH1dXHJcbiAgICB9LFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRkJGQkZCJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mUmemimOW9kue6s+acrOWIneS4reaVsOWtpicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH0sXHJcbiAgICBuZXR3b3JrVGltZW91dDoge1xyXG4gICAgICByZXF1ZXN0OiA4MDAwLFxyXG4gICAgICBkb3dubG9hZEZpbGU6IDgwMDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICBzeXN0ZW06IHt9LFxyXG4gICAgcGFwZXJGaWx0ZXI6IHtcclxuICAgICAgdGFnOiAnaG90JyxcclxuICAgICAgdHlwZTogJzAnLFxyXG4gICAgICBncmFkZTogJzgnLFxyXG4gICAgICB5ZWFyOiAnMCdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIC8vIOS/ruWkjeW5tuWPkVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgLy8gcmVxdWVzdOWFqOWxgOmFjee9rlxyXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XHJcbiAgICAgIGNvbmZpZyhwYXJhbXMpIHtcclxuICAgICAgICBsZXQgaGVhZGVyID0ge1xyXG4gICAgICAgICAgJ29wZW5JZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2duYl9taWRkbGVfb3BlbklkJykgfHwgJydcclxuICAgICAgICB9XHJcbiAgICAgICAgd2VweS5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxyXG4gICAgICAgIHBhcmFtcy5oZWFkZXIgPSBoZWFkZXJcclxuICAgICAgICByZXR1cm4gcGFyYW1zXHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIGxldCBzdGF0dXNDb2RlID0gcmVzLnN0YXR1c0NvZGUudG9TdHJpbmcoKVxyXG4gICAgICAgIGxldCBkYXRhQ29kZSA9IHJlcy5kYXRhLmNvZGUudG9TdHJpbmcoKVxyXG4gICAgICAgIGlmIChzdGF0dXNDb2RlID09PSAnMjAwJykge1xyXG4gICAgICAgICAgaWYgKGRhdGFDb2RlID09PSAnMjAwJykge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmRhdGEuZGF0YVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhQ29kZSA9PT0gJzQwMScpIHtcclxuICAgICAgICAgICAgLy8g5pyq5rOo5YaM55So5oi3XHJcbiAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2luaXQvZ3JhZGUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLm1zZyxcclxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcign6ZSZ6K+v55qEY29kZScpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzQ29kZSA9PT0gJzQwMycpIHtcclxuICAgICAgICAgIC8vIG9wZW5pZOS4uuepulxyXG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL215L2luZGV4J1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWwoZXJyb3IpIHtcclxuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+e9kee7nOmUmeivrycsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcclxuICAgICAgfSxcclxuICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgd2VweS5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgLy8g6K6+5aSH5L+h5oGv6I635Y+WXHJcbiAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgIHd4LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5zeXN0ZW0gPSByZXNcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC8vIOaOiee9keeahOaPkOekulxyXG4gICAgd3gub25OZXR3b3JrU3RhdHVzQ2hhbmdlKChyZXMpID0+IHtcclxuICAgICAgaWYgKCFyZXMuaXNDb25uZWN0ZWQpIHtcclxuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+ivt+ajgOafpee9kee7nOi/nuaOpScsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=