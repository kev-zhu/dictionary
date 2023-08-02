const darkLightSwitch = document.querySelector('.slider')
const checkbox = document.querySelector('.checkbox')
const moonIcon = document.querySelector('.fa-moon')

darkLightSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark')
})

moonIcon.addEventListener('click', () => {
    if (document.body.classList.toggle('dark')) { 
        checkbox.checked = true
    } else {
        checkbox.checked = false
    }
})
