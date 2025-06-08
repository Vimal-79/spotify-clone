// Initalizing Hacking...
// Reading your files...
// parsword files reading...
// Sending all parsword and personal date to sever... 
// Cleaning up... 


// <h2>Initailizing Hacking...</h2>
// <h2>Reading your files...</h2>
// <h2>Pasword files reading...</h2>
// <h2>Sending your personal files to server...</h2>
// <h2>Cleaning up...</h2>

const addItems = async (items) => {
    await randomDelay()
    console.log(items)
    let div = document.createElement('div')
    div.innerHTML = items
    document.body.append(div)
}

const randomDelay = () => {
    return new Promise((resolve, reject) => {
        timeout = 1 + 6 * Math.random();
        setTimeout(() => {
            resolve()
        }, timeout * 1000)
    })
}

async function main() {

    let time = setInterval(() => {
        let last = document.body.getElementsByTagName("div");
        last = last[last.length - 1]
        if(last.innerHTML.endsWith("...")){
            last.innerHTML = last.innerHTML.slice(0 , last.innerHTML.length-3)
        }
        else{
            last.innerHTML = last.innerHTML + "."
        }
    } , 10)


    let text = ["Initialized Hacking reding yout data",
        "Reading your files",
        "parsword files reading",
        "Sending all parsword and personal date to sever",
        "Cleaning up"]

    for (const items of text) {
        await addItems(items)
    }
    await randomDelay()
    clearInterval(time)

}

main()