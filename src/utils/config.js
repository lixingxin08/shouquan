const pagination = {
  "total": 0, //总页数
  "pageSize": 20, //每页中显示10条数据
  "showSizeChanger": true,
  "current": 1, //当前页
  "page": 1, //几页
  "size": "default",
  "pageSizeOptions": ["20", "50", "100"], //每页中显示的数据
  "showTotal": (total) => `共有 ${total} 条数据`, //分页中显示总的数据
}

export default {
  pagination, //分页信息
}
