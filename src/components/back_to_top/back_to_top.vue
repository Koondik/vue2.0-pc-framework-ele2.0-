<template>
    <div class="back-to-top" @click="backToTop" v-show="showReturnToTop" @mouseenter="show" @mouseleave="hide">
        <i :class="[bttOption.iClass]" :style="{color:bttOption.iColor,'font-size':bttOption.iFontsize}"></i>
        <span class="tips" :class="[bttOption.iPos]" :style="{color:bttOption.textColor}" v-show="showTooltips">{{bttOption.text}}</span>
    </div>
</template>

<script>
import { scrollIt } from "./scrollIt"; // 引入动画过渡的实现
export default {
  name: "back_to_top",
  props: {
    text: {
      // 文本提示
      type: String,
      default: "返回顶部"
    },
    textColor: {
      // 文本颜色
      type: String,
      default: "#f00"
    },
    iPos: {
      // 文本位置
      type: String,
      default: "right"
    },
    iClass: {
      // 图标形状
      type: String,
      default: "top-icon"
    },
    iColor: {
      // 图标颜色
      type: String,
      default: "#f00"
    },
    iFontsize: {
      // 图标大小
      type: String,
      default: "0"
    },
    pageY: {
      // 默认在哪个视图显示返回按钮
      type: Number,
      default: 400
    },
    transitionName: {
      // 过渡动画名称
      type: String,
      default: "linear"
    }
  },
  data: function() {
    return {
      showTooltips: false,
      showReturnToTop: false
    };
  },
  computed: {
    bttOption() {
      return {
        text: this.text,
        textColor: this.textColor,
        iPos: this.iPos,
        iClass: this.iClass,
        iColor: this.iColor,
        iFontsize: this.iFontsize
      };
    }
  },
  methods: {
    show() {
      // 显示隐藏提示文字
      return (this.showTooltips = true);
    },
    hide() {
      return (this.showTooltips = false);
    },
    currentPageYOffset() {
      // 判断滚动区域大于多少的时候显示返回顶部的按钮
      window.pageYOffset > this.pageY
        ? (this.showReturnToTop = true)
        : (this.showReturnToTop = false);
    },
    backToTop() {
      scrollIt(0, 500, this.transitionName, this.currentPageYOffset);
    }
  },
  created() {
    window.addEventListener("scroll", this.currentPageYOffset);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.currentPageYOffset);
  }
};
</script>

<style scoped lang="scss">
.back-to-top {
  position: fixed;
  bottom: 8%;
  right: 90px;
  z-index: 9999;
  cursor: pointer;
  width: auto;
  i {
    display: inline-block;
    position: relative;
    text-align: center;
    padding: 5px;
    background-color: rgba(234, 231, 231, 0.52);
    border-radius: 5px;
    transition: all 0.3s linear;
    &:hover {
      border-radius: 50%;
      background: #222;
      color: #fff !important;
    }
  }
  .tips {
    display: inline-block;
    position: absolute;
    word-break: normal;
    white-space: nowrap;
    width: auto;
    font-size: 12px;
    color: #fff;
    z-index: -1;
  }
  .left {
    right: 0;
    top: 50%;
    margin-right: 50px;
    transform: translateY(-50%);
  }
  .right {
    left: 0;
    top: 50%;
    margin-left: 50px;
    transform: translateY(-50%);
  }
  .bottom {
    bottom: 0;
    margin-top: 50px;
  }
  .top {
    top: 0;
    margin-bottom: 50px;
  }
  .top-icon {
    &:before {
      content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAC9UlEQVRIS6WWTXISURDHuwdmSJUl4tqQkIVmWElOEHIDcgLxBMYTBG+QG0hOIDmByQkkK6Ibx0HXDqSsSuY5/K1+wxAG5kvyqqZgPrp/r7tffzBtsL7XqCZiex55/yvOeQKi/P5p6ZDJ6ICpQ8Qa9rDgMWgAmg3scXCRpy8TOKqbXWY+JaJGnqL5e4cJvX1Xnad9nwjUVlXNz0TcKgha+QzDylQdJbl8DfjthdmalfhTplWgCzANmUisT1uOEeD41S81XP4gBgwts75kwQCcb92qE/XEbAQGtZj5Yxa0MvUPli2NAW/q5pCYX6cpiGChu6lhBHSUD8XQdtVBpHMBnB+Q1N3GYVFs4RWBAnjbHKu+QDUwz5XJsGjPhaCO7fp7C+DXeqkDLslBWV+gi8qt380+tflQRnC8Pw4G2sJR3ewz85tkIC6JpbLkpQg8JjoBsXbd6hIvNceqq4E3O6ZHxM82y7miUvBsVz2fAy0UFXvMd7brM88PzO/HKCoqW5n6z2NAAFfEfJkQgDYzHxJhAlCschBzg4l2k94xUW05rzUwjGHoUgb6BqCD/vLn36vRdrldJsKMuQu5/PBol8vlXfkFeGL+Uc591XRkI82xakcykY6bbfOMDH4n99qlaYdGXkYbiSwOn8UPmDwb1U3tFQHGZfAexLWw5mJiu0r+J6dFOjB+wLKAIPowT/bTWFokJf6mwNGO1Qsh8CpT1b+rWidiYSzxtZU7lhMGP1ybAEmprmFZDwUEaMiUAOJJ0/V1E08t3hsBgR4bhnSS2For3tHb5faUBpSuIqkQuc121Zl4hwC51oHAtT1Wi8lhrQHfVS3p5LtM1AORjsdigQbMGBgzOPIsYNSISl3SwxVkgnOWay6IfmxN/VZqAxYlMmIEJZaqvojnqouK3AusFKCTOWJEisLR0LzM6v6ZUOC6cqvahYaoZUXzePWKWitWSRyj7p60qdxBWIQkT2dkdDgchFfamK6vA4NmA2mwee4uBFxV8phR/x+yC8QqAGJiaQAAAABJRU5ErkJggg==");
    }
  }
}
</style>
