let randomDelay = async () => {
    return new Promise((resolve, reject) => {
        let randomNumber = Math.floor(Math.random() * 6 + 1)
        setTimeout(() => {
            resolve()
        }, randomNumber * 1000)
    })
}

let addItems = async (items) => {
    await randomDelay()
    let container = document.querySelector(".container")
    let div = document.createElement('div')
    div.innerText = items
    container.append(div)
}



async function mainfnc() {

    let time = setInterval(() => {
        let container = document.querySelector(".container")
        if (container.children.length > 0) {
            let last = container.lastElementChild
            if (last.innerHTML.endsWith("...")) {
                last.innerHTML = last.innerHTML.slice(0, last.innerHTML.length - 3)
            }
            else {
                last.innerHTML = last.innerHTML + "."
            }
        }

    }, 100)


    let commands = [
        "Initalizing Hacking in your pc",
        "Hacking initialized searching for files",
        "Cracking Password files",
        "Sending personal files to server",
        "removing traces of hack",
        "Cleaning up"
    ]

    for (items of commands) {
        await addItems(items)
    }

    await randomDelay()
    clearInterval(time)
}

mainfnc()