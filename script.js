//timer input selectors
let hour_input = document.querySelector(".hour_input")
let minutes_input = document.querySelector(".minutes_input")
let seconds_input = document.querySelector(".seconds_input")

//timer display selectors
let timer_hour = document.querySelector(".timer_hour")
let timer_minutes = document.querySelector(".timer_minutes")
let timer_seconds = document.querySelector(".timer_seconds")

//timer controls selectors
let timer_start = document.querySelector(".timer_start")
let timer_stop = document.querySelector(".timer_stop")
let timer_reset = document.querySelector(".timer_reset")

function checkValidity() {
    let value = Number(this.value)
    if (isNaN(value)) {
        return
    }

    if (value < 0) this.value = 0
    else if (value > 60) this.value = 60
}

function checkValidityforHours() {
    let value = Number(this.value)
    if (isNaN(value)) {
        return
    }

    if (value < 0) this.value = 0
    else if (value > 24) this.value = 24
}

minutes_input.addEventListener('input', checkValidity)
seconds_input.addEventListener('input', checkValidity)
hour_input.addEventListener('input', checkValidityforHours)

async function asignValues() {

    if ((hour_input.value <= 0 && minutes_input.value <= 0 && seconds_input.value <= 0) && !(hour_input.value == '' && minutes_input.value == '' && seconds_input == '')) {
        // console.log("can't take negative or empty values values")
        hour_input.value = ''
        minutes_input.value = ''
        seconds_input.value = ''
    }

    else {
        //value for hour slot
        //  console.log("timer has been started")
        let hours = hour_input.value
        if (hours == '') {
            hours = "00"
        }
        else if (hours < 10) {
            hours = `0${hours}`
        }
        timer_hour.innerHTML = hours
        // console.log(hours)
        hour_input.value = ''

        //value for minutes slot
        let minutes = minutes_input.value
        if (minutes == '') {
            minutes = "00"
        }
        else if (minutes < 10) {
            minutes = `0${minutes}`
        }
        timer_minutes.innerHTML = minutes
        //console.log(minutes)
        minutes_input.value = ''

        //value for seconds slot
        let seconds = seconds_input.value
        if (seconds == '') {
            seconds = "00"
        }
        else if (seconds < 10) {
            seconds = `0${seconds}`
        }
        timer_seconds.innerHTML = seconds
        //console.log(seconds)
        seconds_input.value = ''

        start_timer(hours, minutes, seconds)
    }
}
// eventlistner for agigning values to timer
timer_start.addEventListener('click', asignValues)


async function updateseconds(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (seconds < 10) {
                timer_seconds.innerHTML = `0${seconds}`
            }
            else {
                timer_seconds.innerHTML = seconds
            }
            // console.log("seconds: ", seconds)
            resolve()
        }, 1000)
    })
}

async function updateMinutes(hours, minutes, seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            minutes -= 1
            if (minutes < 10) {
                timer_minutes.innerHTML = `0${minutes}`
            }
            else {
                timer_minutes.innerHTML = minutes
            }
            //  console.log("minutes: " , minutes)
            if (minutes >= 0) {
                seconds = 60
                start_timer(hours, minutes, seconds)
                timer_seconds.innerHTML = "59"
            }
            resolve()
        }, 1000)
    })
}

async function updateHours(hours, minutes, seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            hours -= 1
            if (hours < 10) {
                timer_hour.innerHTML = `0${hours}`
            }
            else {
                timer_hour.innerHTML = hours
            }
            // console.log("hours: ", hours)
            if (hours >= 0) {
                minutes = 59
                seconds = 59
                start_timer(hours, minutes, seconds)
                timer_minutes.innerHTML = "59"
                timer_seconds.innerHTML = "59"
            }
            resolve()
        }, 1000)
    })
}

function timesup() {
    let div = document.createElement('div')
    document.querySelector("body").prepend(div)
    let h1 = document.createElement('h1')
    h1.innerHTML = "Time's up"
    div.append(h1)
}

async function start_timer(hours, minutes, seconds) {

    if (seconds != 0) {
        for (seconds = seconds - 1; seconds >= 0; seconds--) {
            await updateseconds(seconds)
        }
    }

    if (minutes != 0) {
        await updateMinutes(hours, minutes, seconds)
    }

    else if (minutes == 0 && hours != 0) {
        await updateHours(hours, minutes, seconds)
    }

    else if (hours == 0) {
        timesup()
    }
}