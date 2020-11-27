// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelectAll: false,
    list:[],
    totalAmount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCartList();
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

  },

   /**
   * 获取购物车商品列表
   */
  getCartList: function()
  {
    let _this = this;
    console.log(_this);
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://2004.mayatong.top/api/cart-list?token='+token,
      success: function(d)
      {
        // console.log(d);

        if(d.data.errno==0)   //请求接口成功
        {
          _this.setData({
            list:d.data.data.list
          })
        }else{
          console.log("接口请求错误")
        }

      }
    })
  },

  /**
   * 全选
   */
  selectAll:function()
  {
    let _this = this;
    let isSelectAll = !_this.data.isSelectAll;
    let list = _this.data.list;
    let total = 0;

    list.forEach((item)=>{
      if(isSelectAll)   //全选
      {
        item.checked = true;
        total += item.goods_number * item.cart_price
      }else{
        item.checked = false;
      }
    })

    _this.setData({
      list:list,
      isSelectAll:isSelectAll,
      totalAmount:total
    })

  }
})