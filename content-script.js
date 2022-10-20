var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

let all = [];
var commentsCount = [];
setInterval(() => {
    document.querySelectorAll('#thumbnail').forEach((item) => all.push(item.href))
    all = all.filter(item => item.includes('/watch?v='))
    all.forEach((item, index) => {
        item = item.substring(32, 43);
        getJSON(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item}&key=AIzaSyCkPUDQBUzwTB-Vgps5-BnnhXpVJkLtAKk`, function (err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                commentsCount.push({ id: item, count: data.items[0].statistics.commentCount })
                // let card = `<div style="background-color: bglight; width: 15%; height: 25px; border-style: solid; margin-top: -7px; text-align: center;"><h4 style="margin-top: 5px;">${data.items[0].statistics.commentCount}</h4></div>`
                if (document.querySelector(`.cmnt-${item}`)) {
                    document.querySelector(`.cmnt-${item}`).innerText = data.items[0].statistics.commentCount + " Comments";
                } else {
                    let cmnt = document.createElement('div');
                    cmnt.classList.add(`cmnt-${item}`)
                    cmnt.setAttribute('style', 'background-color: bglight; height: 25px; border: 4px solid; margin-top: -12px; text-align: center;')

                    // style="background-color: bglight; width: 15%; height: 25px; border-style: solid; margin-top: -7px; text-align: center;"
                    cmnt.innerText = data.items[0].statistics.commentCount + " Comments";
                    document.querySelector(`a[href="/watch?v=${item}"]`).parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(cmnt);
                }
            }
        });
    })

}, 10000);







