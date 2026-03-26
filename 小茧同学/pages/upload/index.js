const questionStore = require("../../store/questionStore");

/**
 * 拍照上传页面。
 *
 * @returns {WechatMiniprogram.Page.Instance<any, any>}
 */
Page({
  data: {
    imagePath: "",
    note: "",
    uploadRecords: [],
  },

  /**
   * 页面显示时刷新上传记录。
   *
   * @returns {void}
   */
  onShow() {
    this.refreshRecords();
  },

  /**
   * 刷新上传记录列表。
   *
   * @returns {void}
   */
  refreshRecords() {
    this.setData({
      uploadRecords: questionStore.getUploadRecords(),
    });
  },

  /**
   * 通过相机拍照。
   *
   * @returns {void}
   */
  chooseFromCamera() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["camera"],
      success: (res) => {
        const file = res.tempFiles[0];
        this.setData({
          imagePath: file.tempFilePath,
        });
      },
    });
  },

  /**
   * 从相册选择图片。
   *
   * @returns {void}
   */
  chooseFromAlbum() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["album"],
      success: (res) => {
        const file = res.tempFiles[0];
        this.setData({
          imagePath: file.tempFilePath,
        });
      },
    });
  },

  /**
   * 记录备注输入。
   *
   * @param {WechatMiniprogram.CustomEvent<{value: string}>} event 输入事件
   * @returns {void}
   */
  onNoteInput(event) {
    this.setData({
      note: event.detail.value,
    });
  },

  /**
   * 提交上传记录（当前版本仅本地留痕）。
   *
   * @returns {void}
   */
  submitUpload() {
    const { imagePath, note } = this.data;
    if (!imagePath) {
      wx.showToast({
        title: "请先拍照或选图",
        icon: "none",
      });
      return;
    }

    questionStore.addUploadRecord({
      imagePath,
      note,
    });

    this.setData({
      imagePath: "",
      note: "",
    });
    this.refreshRecords();

    wx.showToast({
      title: "上传记录已保存",
      icon: "success",
    });
  },
});
