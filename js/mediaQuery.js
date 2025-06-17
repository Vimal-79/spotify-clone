
//media quey for divices
function myFunction(x) {
    if (x.matches) {
        // If media query matches

        document.querySelector(".hamburger").addEventListener('click', () => {
            document.querySelector(".left").style.left = -10 + "px";
        })

        document.querySelector(".left_close").addEventListener('click', () => {
            document.querySelector(".left").style.left = -100 + "%";
        })
    }

    else {
        document.querySelector(".left").style.left = 0;

        //release memory when unused
        document.querySelector(".hamburger").removeEventListener('click', () => {
            document.querySelector(".left").style.left = 0;
        })

        document.querySelector(".left_close").removeEventListener('click', () => {
            document.querySelector(".left").style.left = -100 + "%";
        })
    }
}

const mediaFor1300px = window.matchMedia("(max-width: 1300px)")
myFunction(mediaFor1300px);

mediaFor1300px.addEventListener("change", () => {
    myFunction(mediaFor1300px);
});

