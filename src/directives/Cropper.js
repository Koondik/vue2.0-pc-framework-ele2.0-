/**
 * FileName：Cropper
 * Created By No.3 On 2017/9/19 0019 9:07
 * e-mail：woyzb@vip.qq.com
 */
import "cropper";
import jQuery from "jQuery";

export default {
  deep: true,
  // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
  bind() {
  },
  // 被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
  inserted() {
  },
  // 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。指令的值可能发生了改变也可能没有。
  // 但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
  update(options) {
    jQuery(this.el).cropper("destroy");
    setTimeout(() => {
      jQuery(this.el).cropper(options);
    }, 0);
  },
  // 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。
  componentUpdated() {

  },
  // 只调用一次，指令与元素解绑时调用。
  unbind() {
    jQuery(this.el).cropper("destroy");
  }
};
