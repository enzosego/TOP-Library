const newBook = document.querySelector('#new-book');
const bookContainer = document.querySelector('#book-container');
const checkBox = document.querySelector('#check');

let tileCount = 0;

let inputArr = []

let allBooks = [];

let readOrNot = false;

let lStorageCopy = JSON.parse(localStorage.getItem('books'));

if (lStorageCopy) {
    for (let i = 0; i < lStorageCopy.length; i++) {
        allBooks.push(lStorageCopy[i]);
        if (lStorageCopy[i]['read'] === true) {
            readOrNot = true;
        } else if (lStorageCopy[i]['read'] === false) {
            readOrNot = false;
        }
        pushTheTile();
        pushTheBook();
    }
}

readOrNot = false;

checkBox.addEventListener('change', (e) => {
    if (checkBox.checked) {
        readOrNot = true;
    } else {
        readOrNot = false
    }
})

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function getUserInput() {

    inputArr.push(document.getElementById('book-author').value);
    inputArr.push(document.getElementById('book-title').value);
    inputArr.push(document.getElementById('book-pages').value);

    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-pages').value = '';
} 

newBook.addEventListener('click', () => {
    
    getUserInput();

    author  = inputArr[0];
    title = inputArr[1];
    pages = inputArr[2];

    inputArr = [];

    if (author != '' && title != '' && pages > 0) {
        allBooks.push(new Book(author, title, pages, readOrNot));

        localStorage.setItem(`books`, JSON.stringify(allBooks));

        pushTheTile();
        pushTheBook();
    }

    if (checkBox.checked) {
        checkBox.checked = false;
    }
});

function pushTheTile() {
    tileCount++;
    const bookTile = document.createElement('div');
    bookTile.classList.add('bookTiles');
    bookTile.setAttribute('id', `tile${tileCount}`)
    bookContainer.appendChild(bookTile);
    
    const tileEdit = document.querySelector(`#tile${tileCount}`)
    const subtile = document.createElement('div');
    subtile.classList.add('subtile');
    subtile.setAttribute('id', `subtile${tileCount}`);
    tileEdit.appendChild(subtile);
}

function pushTheBook() {
    const tileToEdit = document.querySelector(`#tile${tileCount}`);
    const subtile = document.querySelector(`#subtile${tileCount}`);


    const author = document.createElement('h3');
    const bookTitle = document.createElement('h2');
    const numPages = document.createElement('p');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    removeBtn.classList.add('remove-btn');
    removeBtn.setAttribute('id', `remove${tileCount - 1}`);
    readBtn.classList.add('read-btn');
    readBtn.setAttribute('id', `read${tileCount - 1}`);

    author.textContent = allBooks[allBooks.length - 1]['author'];
    bookTitle.textContent = allBooks[allBooks.length - 1]['title'];
    numPages.textContent = `${allBooks[allBooks.length - 1]['pages']} pages`;
    
    removeBtn.textContent = 'Remove';

    if (readOrNot == true) {
        readBtn.textContent = 'Already read';
        readBtn.style.backgroundColor = 'green';
    } else {
        readBtn.textContent = 'Not read';    
        readBtn.style.backgroundColor = 'red';
    }

    subtile.appendChild(bookTitle);
    tileToEdit.appendChild(author);
    tileToEdit.appendChild(numPages);
    tileToEdit.appendChild(readBtn);
    tileToEdit.appendChild(removeBtn);
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList == 'read-btn') {
        if (e.target.textContent == 'Not read') {
            e.target.textContent = 'Already read';
            e.target.style.backgroundColor = 'green';
            let readId = e.target.id;
            readId = readId.replace('read', '');
            allBooks[readId].read = true;
            localStorage.setItem('books', JSON.stringify(allBooks))
        } else {
            e.target.textContent = 'Not read'; 
            e.target.style.backgroundColor = 'red';
            let readId = e.target.id;
            readId = readId.slice(readId.length - 1);
            allBooks[readId].read = false;
            localStorage.setItem('books', JSON.stringify(allBooks))
        }
    }
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList == 'remove-btn') {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        let removeId = e.target.id;
        removeId = removeId.replace('remove', '');
        allBooks.splice(removeId, 1);
        for (let i = +removeId + 1; i <= allBooks.length; i++) {
            document.getElementById(`remove${i}`).id = `remove${i - 1}`;
            document.getElementById(`read${i}`).id = `read${i - 1}`;
        }
        localStorage.setItem('books', JSON.stringify(allBooks));
    }
});