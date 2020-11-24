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
      wx.reLaunch({
        url: '/pages/cart/cart?goods_id='+a.currentTarget.dataset.goods_id
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let goods_id = options.goods_id;
       wx.request({
          url:'http://2004.mayatong.top/api/goodsdetail',
          data:{
            goods_id:goods_id
          },
          success:function(res){
            console.log(res);
            
            _this.setData({
              // list:data
              list:res.data
              })
          }
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