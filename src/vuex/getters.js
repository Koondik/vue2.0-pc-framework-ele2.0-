const getters = {
  /**
   * 企业类型
   * @param state
   */
  companyTypeList: state => state.common.companyFilterData.companyTypeList,
  /**
   * 企业规模
   * @param state
   */
  companyScaleList: state => state.common.companyFilterData.companyScaleList,
  /**
   * 企业行业
   * @param state
   */
  companyTradeList: state => state.common.companyFilterData.companyTradeList,
  /**
   * 企业性质
   * @param state
   */
  companyNatureList: state => state.common.companyFilterData.companyNatureList,
  /**
   * 公司列表
   */
  companyList: state => state.common.companyPostFilterData.companyList,
  /**
   * 专业列表
   */
  majorList: state => state.common.companyPostFilterData.majorList
};
export default getters;
