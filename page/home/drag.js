// page/home/drag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movewidth:0,
    moveheight:0,
    ratio:2,
    puppyData: [
      { id: 0 ,column: 1, row: 1, level:1, show:'block', res:"puppy2.png" },
      { id: 1, column: 2, row: 1, level: 1, show: 'block', res: "puppy3.png" },
      { id: 2, column: 3, row: 1, level: 1, show: 'none', res: "puppy1.png" },
      { id: 3, column: 1, row: 2, level: 1, show: 'block', res: "puppy1.png" },
      { id: 4, column: 2, row: 2, level: 1, show: 'block', res: "puppy1.png" },
      { id: 5, column: 3, row: 2, level: 1, show: 'block', res: "puppy1.png"},
      { id: 6, column: 1, row: 3, level: 1, show: 'block', res: "puppy1.png" },
      { id: 7, column: 2, row: 3, level: 1, show: 'block', res: "puppy1.png" },
      { id: 8, column: 3, row: 3, level: 1, show: 'block', res: "puppy1.png"},
    ],
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
          ratio: 750/res.windowWidth,
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
    console.log(3);
  
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
    //结束时，鼠标所在位置。
    const clientX = e.changedTouches[0].clientX;
    const clientY = e.changedTouches[0].clientY;
    //所捕获id值
    const currentTargetId = e.currentTarget.id;
    const perwidth = this.data.movewidth/3;
    const colNum = parseInt(clientX/perwidth) + 1;
    const perHeight = 789/this.data.ratio/3;
    const rowNum = parseInt(clientY/perHeight);
    // 计算目标ID值
    const resultID = (rowNum-1)*3+colNum -1;
    console.log(rowNum,colNum,resultID);
    const tempData = this.data.puppyData;
    const currentItem = this.data.puppyData.filter((item) => item.id == currentTargetId)[0];
    const resultItem = this.data.puppyData.filter((item)=> item.id==resultID)[0];
    const arr = tempData.map(item =>{
      if(currentItem.level == resultItem.level){
        if (item.id == currentTargetId) {
          return { ...item, row: resultItem.row, column: resultItem.column };
        } else if (item.id == resultID) {
          return { ...item, level: resultItem.level + 1 }
        }
      }     
      return {...item};      
    })
    const arr2 = arr.map(item => {
      if (currentItem.level == resultItem.level) {
        if (item.id == currentTargetId) {
          return { ...item, show: 'none' };
        }
      }
      return { ...item };
    })
    this.setData({
        puppyData:arr
    });
    console.log(2)
    setTimeout(()=>{
      this.setData({
        puppyData: arr2
      });
    }, 200)
    
  },

  onDogShop: () => wx.navigateTo({ url: './dogShop/dogShop' })
})