//book class 

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//ui tasks class 

class UI {
    static displayBooks() {
        const StoredBooks = [];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(e) {
        if(e.classList.contains('delete')) {
            e.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}

//store class (handles storage)

class Store {

    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach ((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
    }

}

//event: display books 

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//event: add book 

document.querySelector('#book-form').addEventListener ('submit', (e) => {
    
    e.preventDefault();
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === '') {
        alert('Please fill in all fields');
    } else {
        const book = new Book(title, author, isbn);

        UI.addBookToList(book);
        UI.clearFields();
    }
});

//event: remove book

document.querySelector('#book-list').addEventListener('click', (e) => {

    UI.deleteBook(e.target);

    //from storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});