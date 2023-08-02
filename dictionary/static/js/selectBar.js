const selectContainer = document.querySelector('.custom-select')
const defaultSelect = selectContainer.getElementsByTagName('select')[0]
const selectCount = defaultSelect.options.length

const customSelect = document.createElement('div')
customSelect.classList.add('select-selected')
customSelect.innerHTML = defaultSelect.options[defaultSelect.selectedIndex].innerHTML

selectContainer.appendChild(customSelect)


optionsContainer = document.createElement('div')
optionsContainer.classList.add('options-container')
optionsContainer.classList.add('options-hidden')

for (let c = 0; c < selectCount; c++) {
    const option = document.createElement('div')
    option.innerHTML = defaultSelect.options[c].text
    option.classList.add('option')

    option.addEventListener('click', () => {
        customSelect.innerHTML = option.innerHTML
    })
    
    optionsContainer.appendChild(option)
}
selectContainer.appendChild(optionsContainer)

optionsContainer.style.width = 104

const showOptions = () => {
    optionsContainer.classList.remove('options-hidden')
    optionsContainer.classList.add('options-shown')
    optionsContainer.style.display = 'block'
    // optionsContainer.style.width = optionsContainer.parentElement.clientWidth + 30

}

const hideOptions = () => {
    optionsContainer.classList.remove('options-shown')
    optionsContainer.classList.add('options-hidden')
    optionsContainer.style.display = 'none'
}

customSelect.addEventListener('click', () => {
    if (optionsContainer.classList.contains('options-hidden')) {
        showOptions()
    } else {
        hideOptions()
    }
})

optionsContainer.addEventListener('click', () => {
    hideOptions()
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        hideOptions()
    }
})

//fix this? -- clicking on an option will "close" twice which doesn't do anything "wrong" but is an extra action
document.addEventListener('click', (e) => {
    if (e.target !== customSelect) {
        hideOptions()
    }
})

//flip carrot around when active/inactive