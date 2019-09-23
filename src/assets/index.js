export const common=function (vue) {
  vue.prototype.getFlowSubject= function (val) {
    let obj={};
     switch (val){
       case 1 :
         obj={codePre:'RZXC',subject: '入职薪酬'};
         break;
       case 2 :
         obj={codePre:'XCTZ',subject: '薪酬调整'};
         break;
       case 3 :
         obj={codePre:'XCTZ1',subject: '薪酬调整1'};
         break;
       default :
         break;
     }
     return obj;
  }

  /**
   *  表头换行，符号： </br>
   * @param h
   * @param column
   * @param $index
   * @returns {*}
   */
  vue.prototype.renderheader= function (h, {column, $index}) {
    let arr = column.label.split('</br>') || '';
    let hArr = [];
    arr.forEach((item, i) => {
      let obj = h('span', {}, item);
      if (i > 0) hArr.push(h('br'));
      hArr.push(obj);
    });
    return h('span', {}, hArr);
  }
}
