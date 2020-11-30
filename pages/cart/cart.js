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
    let token = wx.getStorageSync('token')
    console.log(token);
    wx.request({
      url: 'http://weixin.2004.com/api/cart-list?token='+token,
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

  },


  /**
   * 单选
   */
  selects:function(res){
    let goods = res.detail.value;
    let _this=this;
    let list = this.data.list;
    let total=0;
    let isSelectAll=false;

    list.forEach( (value)=>{
        value.checked = false;
      goods.forEach((value2)=>{
        if(value.goods_id== parseInt(value2)){
          value.checked = true;  //记录选中状态
          total+= value.goods_number* value.cart_price;
        }
      })
       isSelectAll = list.every(function(value){
        return value.checked
      })
    })

      _this.setData({
        totalAmount: total,
        isSelectAll:isSelectAll
      })
  },

  /**
   * 删除商品
   */
  del:function(aa){
    let _this = this;
    let selects = [];
    let list = _this.data.list;
    let token = wx.getStorageSync('token');
    list.forEach(item=>{
      if(item.checked){
          selects.push(item.goods_id);
      }
    })

    if(selects.length>0){
      wx.showModal({
        title: '提示',
        content: '是否删除选中商品',
        success (res) {
          // console.log(res);
          if (res.confirm) {
            wx.request({
              url: 'http://weixin.2004.com/api/cartdel?token='+token,
              method:'post',
              data:{
                goods:selects.toString(),
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res){
                 console.log('删除成功')
                 _this.getCartList();
                 _this.setData({
                  isSelectAll:false,
                  totalAmount:0
                 }); 
              }
            })  
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showToast({
        title: '请先选择要删除的商品',
        icon: 'none',
        duration: 2000
      })
    }
    
  },


  /**
   * 购物车数量加
   */
  incrgoods:function(a){
      let token = wx.getStorageSync('token');
      let list = this.data.list;
      let index = a.currentTarget.dataset.goodsindex  //选中商品列表的索引
      console.log(list[index]);
      list[index].goods_number++

      //请求后台接口
      wx.request({
        url: 'http://weixin.2004.com/api/cart?token='+token,
        method:'post',
        data:{
          goods_id:list[index].goods_id,
          goods_number:list[index].goods_number
        }
      })
      this.setData({
        list:list
      })
    }
})