

    let thisurl = window.location.href.split('/#')
    let bb = thisurl[0].split('/authorization')

// export const postimgurl="http://139.159.249.31:18082/upload"
export const postimgurl=bb[0]+'/upload'
