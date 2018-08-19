// page/home/drag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movewidth:0,
    moveheight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth);
        _this.setData({
          moveheight: res.windowHeight,
          movewidth: res.windowWidth,
        });
      }
    });
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
  startEvent: function (e) {
    console.log("startTouch"+e);
  },
  moveEvent: function (e) { console.log(e.touches[0].pageX +'...'+ e.touches[0].pageY);
  },
  endEvent: function (e) {
    console.log(e.changedTouches[0].clientX + '.......' + e.changedTouches[0].clientY);
    console.log(e);
  }
})