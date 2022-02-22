// // 传统方式
function queryToObj() {
  const res = {};
  const search = location.search.substr(1); //去掉前面的？
  search.split("&").forEach((paramStr) => {
    const arr = paramStr.split("=");
    const key = arr[0];
    const val = arr[1];
    res[key] = val;
  });
  return res;
}

// URLSearchParams
function query(name) {
  const search = location.search;
  const p = new URLSearchParams(search);
  console.log("pList", p);
  return p.get(name);
}
console.log(query("b"));

// 使用URLSearchParams将url参数解析为对象
function queryToObj2() {
  const res = {};
  const pList = new URLSearchParams(location.search);
  pList.forEach((val, key) => {
    res[key] = val;
  });
  return res;
}
