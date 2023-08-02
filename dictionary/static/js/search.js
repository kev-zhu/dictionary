const searchBtn = document.querySelector('.wordSearch')
const wordQuery = document.querySelector('.wordQuery')


const querySearch = () => {
    fetch(`./query?word=${wordQuery.value}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                wordInfo = data.wordInfo
                loadInfo(wordInfo)
            }
        })
}

//on btn click
searchBtn.addEventListener('click', () => {
    querySearch()
})

//on enter click when word query focused
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { 
        if (document.activeElement === wordQuery) {
            querySearch()
        }
    }
})