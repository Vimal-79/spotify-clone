


const title = "Installing Vs Code & How Website Work | Sigma Web Development Course - Tutorial #1"
const min = 30;
const sec = 20;
const time_duration = `${min}:${sec}`;
const channelName = "CodeWithHarry";
const view_count = 2.7;
const video_old = 2;

function addingDetails(title , time , channelName , views , date){

    let card = document.querySelector(".card_container")

    let h3 = document.createElement('h3')
    h3.innerText = title
    card.append(h3)
    h3.classList.add("title")

    let p = document.createElement('p')
    p.innerText = time
    document.querySelector(".img_container").append(p)
    p.classList.add("time")

    let div = document.createElement('div')
    card.append(div)
    div.classList.add("second_row")

    let ul = document.createElement('ul')
    div.append(ul)

    ul.insertAdjacentHTML("afterbegin" , `<li>${channelName}</li>`)

    ul.insertAdjacentHTML("beforeend" , `<li>${views}K views</li>`)

    ul.insertAdjacentHTML("beforeend" , `<li>${date} year ago </li>`)
}



addingDetails(title , time_duration , channelName , view_count , video_old) 