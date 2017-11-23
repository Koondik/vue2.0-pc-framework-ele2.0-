/**
 * FileName：dateRange
 *  获取本周、本季度、本月、上月的开端日期、停止日期
 * Created By No.3 On 2017/11/16 0016 10:28
 * e-mail：woyzb@vip.qq.com
 */

export default class DateRange {
  constructor() {
    const now = new Date(); //当前日期
    this.nowDayOfWeek = now.getDay(); //今天本周的第几天
    this.nowDay = now.getDate(); //当前日
    this.nowMonth = now.getMonth(); //当前月
    this.nowYear = now.getYear(); //当前年
    this.nowYear += (this.nowYear < 2000) ? 1900 : 0; //

    const lastMonthDate = new Date(); //上月日期
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    this.lastYear = lastMonthDate.getYear();
    this.lastMonth = lastMonthDate.getMonth();
  }

  /**
   * 格局化日期：yyyy-MM-dd
   * */
  formatDate(date) {
    const _date = new Date(date);
    let myyear = _date.getFullYear();
    let mymonth = _date.getMonth() + 1;
    let myweekday = _date.getDate();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
  }

  /**
   * 获得某月的天数
   * */
  getMonthDays(myMonth) {
    let monthStartDate = new Date(this.nowYear, myMonth, 1);
    let monthEndDate = new Date(this.nowYear, myMonth + 1, 1);
    return (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  }

  /**
   * 获得本季度的开端月份
   * */
  getQuarterStartMonth() {
    let quarterStartMonth = 0;
    if (this.nowMonth < 3) {
      quarterStartMonth = 0;
    }
    if (this.nowMonth > 2 && this.nowMonth < 6) {
      quarterStartMonth = 3;
    }
    if (this.nowMonth > 5 && this.nowMonth < 9) {
      quarterStartMonth = 6;
    }
    if (this.nowMonth > 8) {
      quarterStartMonth = 9;
    }
    return quarterStartMonth;
  }

  /**
   * 获得本周的开端日期
   * */
  getWeekStartDate() {
    const weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - (this.nowDayOfWeek - 1));
    return this.formatDate(weekStartDate);
  }

  /**
   * 获得本周的停止日期
   * */
  getWeekEndDate() {
    const weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (7 - this.nowDayOfWeek));
    return this.formatDate(weekEndDate);
  }

  /**
   * 获得上周的开端日期
   * */
  getLastWeekStartDate() {
    const weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - (this.nowDayOfWeek - 1)).getTime();
    return this.formatDate(weekStartDate - (7 * 24 * 60 * 60 * 1000));
  }

  /**
   * 获得上周的停止日期
   * */
  getLastWeekEndDate() {
    const weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (7 - this.nowDayOfWeek)).getTime();
    return this.formatDate(weekEndDate - (7 * 24 * 60 * 60 * 1000));
  }

  /**
   * 获得本月的开端日期
   * */
  getMonthStartDate() {
    const monthStartDate = new Date(this.nowYear, this.nowMonth, 1);
    return this.formatDate(monthStartDate);
  }

  /**
   * 获得本月的停止日期
   * */
  getMonthEndDate() {
    const monthEndDate = new Date(this.nowYear, this.nowMonth, this.getMonthDays(this.nowMonth));
    return this.formatDate(monthEndDate);
  }

  /**
   * 获得上月开端时候
   * */
  getLastMonthStartDate() {
    const lastMonthStartDate = new Date(this.nowYear, this.lastMonth, 1);
    return this.formatDate(lastMonthStartDate);
  }

  /**
   * 获得上月停止时候
   * */
  getLastMonthEndDate() {
    const lastMonthEndDate = new Date(this.nowYear, this.lastMonth, this.getMonthDays(this.lastMonth));
    return this.formatDate(lastMonthEndDate);
  }

  /**
   * 获得本季度的开端日期
   * */
  getQuarterStartDate() {
    const quarterStartDate = new Date(this.nowYear, this.getQuarterStartMonth(), 1);
    return this.formatDate(quarterStartDate);
  }

  /**
   * 或的本季度的停止日期
   * */
  getQuarterEndDate() {
    const quarterEndMonth = this.getQuarterStartMonth() + 2;
    const quarterStartDate = new Date(this.nowYear, quarterEndMonth, this.getMonthDays(quarterEndMonth));
    return this.formatDate(quarterStartDate);
  }
}
