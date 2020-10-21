

//     let thisurl = window.location.href.split('/#')
//     // let bb = thisurl[0].split('/auth')
//     let bb = thisurl[0].split('/auth')

// // export const postimgurl="http://139.159.249.31:18082/upload"
export const postimgurl=localStorage.getItem('auth')?JSON.parse(localStorage.getItem('auth')).fileUrlHead:''
