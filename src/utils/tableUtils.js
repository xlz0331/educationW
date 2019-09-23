export default {
  renderheader: function (h, {column, $index}) {
    let arr = column.label.split('</br>') || '';
    let hArr = [];
    arr.forEach((item, i) => {
      let obj = h('span', {}, item);
      if (i > 0) hArr.push(h('br'));
      hArr.push(obj);
    });
    return h('span', {}, hArr);
  },

  setTableDataArr: function (list, keyField) {//keyField为索引进行分类存储
    let obj = {};
    let resList = [];
    list.forEach((element, index) => {
        element.rowIndex = index;
      if (null != element[keyField] ) {
        if (obj[element[keyField]]) {
          obj[element[keyField]].push(index);
        }
        else {
          obj[element[keyField]] = [];
          obj[element[keyField]].push(index);
        }
      }
    });

    for (let i in obj) {
      if (obj[i].length > 1) {
        resList.push(obj[i]);
      }
    }
    return resList;
  },


}
