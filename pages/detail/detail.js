// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    dingwei:0,
    isLike: true,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //	滑动动画时长1s
  },


  index:function(res){
      //console.log(res);
      this.setData({
        dingwei:res.detail.current    

      })
  },

  //预览图片
  previewImage: function (e) {
    // console.log(e);
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.list.goods_imgs // 需要预览的图片http链接列表
    })
  },
  

  //跳转购物车
  addCar:function(a){
      //console.log(a);
      let goods_id = a.currentTarget.dataset.goods_id
      let token = wx.getStorageSync('token')
      wx.reLaunch({
        url: '/pages/cart/cart?goods_id='+a.currentTarget.dataset.goods_id
      })

      wx.request({
        url: 'http://2004.mayatong.top/api/cart?token='+token,
        method:'POST',
        dataType:'json',
        header:{'content-type':'application/x-www-form-urlencoded'},
        data:{
          goods_id:goods_id
        },
        success:function(res){
            console.log(res);
        }
      })

      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 2000
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let _this = this;
    let goods_id = options.goods_id;
       wx.request({
          url:'http://2004.mayatong.top/api/goodsdetail',
          data:{
            goods_id:goods_id
          },
          success:function(res){
            // console.log(res);
            
            _this.setData({
              // list:data
              list:res.data
              })
          }
       })
  },

  /**
   * 收藏
   */
  shoucang:function(a){
    // console.log(a);
    let goods_id = a.currentTarget.dataset.goodsid
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://2004.mayatong.top/api/add-fav?goods_id='+goods_id+'&token='+token,
    })
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 客服
   */
  makeCall:function(){
    wx.makePhoneCall({
      phoneNumber: '15032402768' //仅为示例，并非真实的电话号码
    })
  },

  switchHome:function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  switchCart:function(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})