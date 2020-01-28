class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // current index of word
        const current = this.wordIndex % this.words.length;

        //get full txt of current word
        const fullText = this.words[current];

        // console.log(fullText)
        // check if deleting
        if (this.isDeleting) {
            //REMOVE CHAR
            this.txt = fullText.substring(0, this.txt.length - 1)
        } else {
            // add char
            this.txt = fullText.substring(0, this.txt.length + 1)
        }

        // insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

        // Initial type speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullText) {
            // make pause on the end
            typeSpeed = this.wait;

            this.isDeleting = true
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // move to next word
            this.wordIndex++;
            // pause before start typing]
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


// Init on dom load
document.addEventListener('DOMContentLoaded', init);
// Inigt app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //init TypeWriter
    new TypeWriter(txtElement, words, wait)
}