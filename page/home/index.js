Page({
  /**
     * 页面的初始数据
     */
  data: {
    kennelshadow:0,
    dogGenCount: 0,//生成狗点击次数
    dogGenLevel: 1,//生成狗等级（最高5级）
    movewidth: 0,
    modalTitle:'',//modal title
    modalConText:'OK',//modalconfirm 文字
    hiddenCancel:true,//modal隐藏cancle 
    hiddenmodalput: true,//是否隐藏modal
    modalImage:'generateSuccess',//modal暂时图片
    moveheight: 0,
    ratio: 2,
    puppyData: [
      { id: 0, column: 1, row: 1, level: 1, show: 'none'},
      { id: 1, column: 2, row: 1, level: 1, show: 'none'},
      { id: 2, column: 3, row: 1, level: 1, show: 'none'},
      { id: 3, column: 1, row: 2, level: 1, show: 'none'},
      { id: 4, column: 2, row: 2, level: 1, show: 'none'},
      { id: 5, column: 3, row: 2, level: 1, show: 'none'},
      { id: 6, column: 1, row: 3, level: 1, show: 'none'},
      { id: 7, column: 2, row: 3, level: 1, show: 'none'},
      { id: 8, column: 3, row: 3, level: 1, show: 'none'},
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
          ratio: 750 / res.windowWidth,
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
    console.log("startTouch" + e);
  },
  moveEvent: function (e) {
    console.log(e.touches[0].pageX + '...' + e.touches[0].pageY);
  },
  endEvent: function (e) {
    //结束时，鼠标所在位置。
    const clientX = e.changedTouches[0].clientX;
    const clientY = e.changedTouches[0].clientY;
    //所捕获id值
    const currentTargetId = parseInt(e.currentTarget.id,10);
    const perwidth = this.data.movewidth / 3;
    const colNum = parseInt(clientX / perwidth) + 1;
    const perHeight = 789 / this.data.ratio / 3;
    const rowNum = parseInt(clientY / perHeight);
    // 计算目标ID值
    const resultID = (rowNum - 1) * 3 + colNum - 1;
    let temphideModal = true;
    console.log(rowNum, colNum, resultID);
    const tempData = this.data.puppyData;
    const currentItem = this.data.puppyData.filter((item) => item.id == currentTargetId)[0];
    const resultItem = this.data.puppyData.filter((item) => item.id == resultID)[0];
    const arr = tempData.map(item => {
      if(currentTargetId != resultID){
        if (resultItem.show == 'block') {
          if (currentItem.level == resultItem.level && currentItem.level < 2) {
            if (item.id == currentTargetId) {
              return { ...item, show: 'none' };
            } else if (item.id == resultID) {
              temphideModal = false;
              return { ...item, level: resultItem.level + 1 }
            }
          }
        } else {
          if (item.id == currentTargetId) {
            return { ...item, show: 'none' };
          }
          if (item.id == resultID) {
            return { ...item, level: currentItem.level, show: 'block' }
          }
        }  
      }
      return { ...item };
    })
    this.setData({
      puppyData: arr,
      hiddenmodalput: temphideModal,
      modalTitle: '',
      modalImage: 'generateSuccess',
      modalConText: 'OK'
    });
  },
  onDogShop: () => wx.navigateTo({ url: './dogShop/dogShop' }),
  onDictionary:function() {
    wx.navigateTo({ url: '../Illustrations/index' });
  },
  onDogGenerate: function() {
    let tempTapCount = 0; 
    const perShadow = 166;
    const tempData = this.data.puppyData;
    if(this.data.dogGenCount != 9 ){
      tempTapCount = this.data.dogGenCount+1;
      this.setData({
        dogGenCount: tempTapCount,
        kennelshadow: tempTapCount*perShadow/10,
      });
    }else{
      let isFirst = true;
      const tempArr = tempData.map((item) =>{
        if (item.show == 'none' && isFirst) {
          isFirst = false;
         return { ...item, show: 'block', level:this.data.dogGenLevel };
        } else {
          return{ ...item };
        }
      }); 
      this.setData({
        dogGenCount: tempTapCount,
        puppyData: tempArr,
        kennelshadow:0,
      });
    }    
  },
  onKennelUpgrade: function(){
    let tempLevel = this.data.dogGenLevel+1;
    if(tempLevel > 2){
      tempLevel =2;
    }
    this.setData({
      dogGenLevel:tempLevel,
      modalTitle: '狗窝升级',
      hiddenmodalput:false,
      modalImage:'upgradeKennel',
      modalConText:'关闭'
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  }  
})