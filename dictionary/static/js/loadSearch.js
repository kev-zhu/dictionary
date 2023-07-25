const queriedWord = document.querySelector('.queriedWord')
const pronunciation = document.querySelector('.pronunciation')
const playPronunciation = document.querySelector('.playPronunciation')
const playAudio = document.querySelector('.play-audio')
const wordSound = document.querySelector('.wordSound')
const definitions = document.querySelector('.definitions')
const source = document.querySelector('.source')
const srcLinks = document.querySelectorAll('.src-link')

const clearResults = () => {
    while (definitions.hasChildNodes()) {
        definitions.removeChild(definitions.firstElementChild)
    }
}

const loadInfo = (info) => {
    clearResults()

    console.log(info)

    queriedWord.innerHTML = info.word
    pronunciation.innerHTML = info.phonetic || info.phonetics.reduce((prev, curr) => curr.text !== '' ? curr.text: prev, '')
    playPronunciation.hidden = false
    
    wordSound.src = info.phonetics.reduce((prev, curr) => curr.audio !== '' ? curr.audio: prev, '')

    info.meanings.forEach(meaning => {
        const posGroup = formatPOS(meaning.partOfSpeech)

        const meaningText = formatGrey('Meaning', 3)

        const defItem = document.createElement('li')
        defItem.classList.add('def-bulleted')
        defItem.classList.add('mt-2')
        defItem.appendChild(formatDefinition(meaning))

        definitions.appendChild(posGroup)
        definitions.append(meaningText)
        definitions.appendChild(defItem)

        if (meaning.synonyms.length > 0 ) {
            const synText = formatGrey('Synonyms', 5)
    
            const syn = document.createElement('span')
            syn.classList.add('synonyms')
            syn.innerHTML = meaning.synonyms.join(', ')
    
            synText.appendChild(syn)
            definitions.appendChild(synText)
        }
    })

    source.hidden = false
    source.style.display = 'flex'
    srcLinks.forEach(srcLink => {
        srcLink.href = info.sourceUrls[0]
    })
    srcLinks[0].innerHTML = info.sourceUrls[0]

}

const formatPOS = (pos) => {
    const posGroup = document.createElement('div')
    posGroup.classList.add('flex-container')
    posGroup.classList.add('mt-3')

    const partofspeech = document.createElement('li')
    partofspeech.innerHTML = pos

    const hline = document.createElement('div')
    hline.classList.add('hline')

    posGroup.appendChild(partofspeech)
    posGroup.appendChild(hline)

    return posGroup
}

const formatGrey = (text, marginAmt) => {
    const formatText = document.createElement('li')
    formatText.innerHTML = text
    formatText.classList.add('greyfont')
    formatText.classList.add(`mt-${marginAmt}`)

    return formatText
}

const formatDefinition = (meaning) => {  
    const defs = document.createElement('ul')

    meaning.definitions.forEach(definition => {
        const wordDef = document.createElement('li')
        wordDef.classList.add('definition')
        wordDef.classList.add('mt-1')
        wordDef.innerHTML = definition.definition
        defs.appendChild(wordDef)

        if (definition.hasOwnProperty('example')) {
            const wordExample = document.createElement('li')
            wordExample.classList.add('example')
            wordExample.classList.add('greyfont')
            wordExample.innerHTML = '"' + definition.example +'"'

            defs.appendChild(wordExample)
        }
    })

    return defs
}

playAudio.addEventListener('click', () => {
    wordSound.play()
})