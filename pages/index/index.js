//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    "bnrUrl": [{
      "url": "/pages/images/discount-banner.jpg"
    }, {
      "url": "/pages/images/draw-banner.jpg"
    }, {
      "url": "/pages/images/discount-banner.jpg"
    }, {
      "url": "/pages/images/nursing-banner.jpg"
    }],
      list:[],
      page:1,   //列表 页号
      pagesize:10,   //列表大小
  
  },
  //事件处理函数
  bindViewTap:function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //页面上拉触底事件
  onReachBottom:function(){
    this.data.page++;
    this.glist();
  },

  //获取商品数据
  glist:function(){
    let _this = this;
   // console.log(_this);
    wx.request({
      url:'http://2004.mayatong.top/api/goodslist',
      data:{
        page:_this.data.page,  //分页 页号
        size:_this.data.pagesize
      },
      success:function(res){
        //console.log(res);
        let new_list = _this.data.list.concat(res.data.data.list)
        //console.log(res.data.data.data.goods);
        _this.setData({
        list:new_list
        })



      }
    })
  },

  catchTap:function(res){
    // console.log(res)
      let goodsid = res.currentTarget.dataset.goodsid
      wx.navigateTo({
        url:'/pages/detail/detail?goods_id='+goodsid
      })
  },


  onLoad: function () {
    //console.log(this)
    //let _this = this;
      this.glist();

    //发起网络请求
  //   wx.request({
  //     url: 'http://weixin.2004.com/api/goodslist', //仅为示例，并非真实的接口地址
  //     data: {
  //       x: 'wert',
  //       y: 'wertyu'
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: function (data){
  //     console.log(data);
  //       _this.setData({
  //         list:data.data.data.goods
  //       })
  //   }
  // })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
