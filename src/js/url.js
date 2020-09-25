

    let thisurl = window.location.href.split('/#')
    let bb = thisurl[0].split('/authorization')

// export const postimgurl="http://192.168.3.101:80/upload"
export const postimgurl=bb[0]+'/upload'
