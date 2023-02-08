/*
 * @Author: zhuziqiang z2206071258@163.com
 * @Date: 2022-11-04 17:59:30
 * @LastEditors: zhuziqiang z2206071258@163.com
 * @LastEditTime: 2022-11-27 11:08:58
 */
const axios = require("axios");
axios.defaults.headers["user-token"] =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Njk1MTg0MjgsImV4cCI6MTcwMDczMDQyOCwiaW5mbyI6eyJ1aWQiOjE3OCwidXR5cGUiOjEsIm1vYmlsZSI6IjE1OTAxMDEwNDQ5In19.6m95Wt807GdabTiJ8PSev7fbYywledE2sAZDGxKw1gQ";

const url =
  "https://qzd.zhmi.com/v1_0/company/job/index?type=0&page=1&pagesize=100";
axios
  .get(url)
  .then((res) => {
    const jobs = res.data.data.items || [];
    if (jobs.length !== 0) {
      for (let i = 0; i < jobs.length; i++) {
        const id = jobs[i].id;
        const url = `https://qzd.zhmi.com/v1_0/company/job/editPre?id=${id}`;
        axios.get(url).then((res) => {
          let { basic, contact } = res.data.data;
          // basic.citycategory_arr = [320000, 320100, 320104];
          // basic.category1 = 6;
          // basic.category2 = 36;
          // basic.category3 = 350;
          // basic.district = 320100;
          // basic.district1 = 320000;
          // basic.district2 = 320100;
          // basic.district3 = 320104;
          basic.educationn = [
            372, 393, 371, 375, 376, 387, 377, 373, 382, 396, 417, 379, 374,
            422, 399, 416, 389, 401, 392, 400, 408, 421, 423, 418, 409, 1374,
            1375, 1373, 2543, 2545, 2566, 2553, 1493, 1495, 2924, 2226, 2229,
            2227, 2236, 2380, 2669, 2458, 522, 1833, 954, 956, 962, 961, 1974,
            1973, 1981, 1985, 1983, 1992, 1978, 2104, 2103, 2110, 891, 900, 892,
            1098, 1100, 1108, 1102, 1115, 1120, 1099, 1101, 1104, 1109, 1119,
            1583, 777, 781, 776, 787, 723, 2985, 2973, 1686, 1687, 1689, 644,
            2830, 2831, 2829, 2544, 2833, 2841, 2843, 2840, 1036, 1034, 1035,
            1046, 1037, 1049, 1056, 1040, 1048, 464, 463, 470, 2823, 2741, 3004,
            3007, 1265, 2478, 2482, 3084, 3085, 3086, 3087,
          ];
          // basic.education = 7;
          // basic.tag = [159, 147, 157];
          // basic.amount = "面议";
          axios
            .post("https://qzd.zhmi.com/v1_0/company/job/editSave", {
              basic,
              contact,
            })
            .then((res) => {
              console.log("结果", res.data);
            });
        });
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
