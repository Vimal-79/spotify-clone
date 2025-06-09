

const card = `<div class="container">
        <div class="image_container">
        </div>
        <div class="content_container">

            <div class="follow_and_message_container">
                <button class="message">Message</button>
                <button class="follow">Follow</button>
            </div>
            <div class="capsule">
                <ul>
                    <li>Likes</li>
                    <li>Posts</li>
                    <li>Subscribe</li>
                </ul>
            </div>

        </div>

    </div>`;

const url = "https://dog.ceo/api/breeds/image/random"

async function getdata() {
    const api = await fetch(url)
    try {
        if (!api.ok) {
            throw SyntaxError("samasyan aa gai api mai ab kya karna hai jaldi batao")
        }
        const json = await api.json()
        console.log(json)
        await addhtml();
        await addimage(json)
    }
    catch (error) {
        console.log("their is some fult in api fatching")
        console.log(error)
        await notImage()
    }
}

async function addhtml(){
document.body.innerHTML = card 
}
async function addimage(json) {

    let image = document.createElement("img")
    document.querySelector(".image_container").append(image)
    image.src = json.message
    image.alt = "image"
}

async function notImage() {
    let h2 = document.createElement('h2')
    document.body.append(h2)
    h2.innerHTML = "API failed"

}

getdata()