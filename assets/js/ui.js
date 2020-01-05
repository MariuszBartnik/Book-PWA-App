document.addEventListener('DOMContentLoaded', () => {
    const sidenav = document.querySelectorAll('.sidenav');
    const modal = document.querySelectorAll('.modal');

    M.Sidenav.init(sidenav, {edge: 'right'});
    M.Modal.init(modal);
});

const loginSection = document.querySelector('.login-form');
const signinSection = document.querySelector('.signin-form');

const setUI = (user) => {
    const loginSection = document.querySelector('.login-section');
    const logoutSection = document.querySelector('.logout-section');
    const logoutBtn = document.querySelectorAll('.logout-btn');
    const addBookBtn = document.querySelector('.add-book-btn');

    if(user){
        loginSection.style.display = "block";
        logoutSection.style.display = "none";
        logoutBtn.forEach(btn => btn.style.display = "block");
        addBookBtn.style.display = "block";
    }else{
        loginSection.style.display = "none";
        logoutSection.style.display = "block";
        logoutBtn.forEach(btn => btn.style.display = "none");
        addBookBtn.style.display = "none";
    }
}

const changeFormToSignIn = document.querySelector('#login-to-signin');
changeFormToSignIn.addEventListener('click', () => {
    loginSection.style.display = 'none';
    signinSection.style.display = 'block';
});

const changeFormToLogin = document.querySelector('#signin-to-login');
changeFormToLogin.addEventListener('click', () => {
    loginSection.style.display = 'block';
    signinSection.style.display = 'none';
});

const renderBooks = (book) => {
    const bookList = document.querySelector('.books-list');
    const finishedBooks = document.querySelector('.finished-books');
    
    let html = "";
    html = `
        <li class="collection-item avatar book-item" data-id="${book.id}">
            <img src="../assets/img/book.png" alt="Book avatar" class="circle">
            <p class="flow-text">${book.title}</p>
            <p class="grey-text">${book.author}</p>
            <p class="secondary-content">
                <span class="btn white green-text z-depth-0">
                    <i class="material-icons" data-id="${book.id}" data-action="${book.read ? 'toRead' : 'complete'}">
                        ${book.read ? 'reply' : 'check'}
                    </i>
                </span>
                <span class="btn white red-text z-depth-0">
                    <i class="material-icons" data-id="${book.id}" data-action="delete">
                        delete
                    </i>
                </span>
            </p>
        </li>
    `
    book.read ? finishedBooks.innerHTML +=html : bookList.innerHTML += html;

}

const removeBook = (id) => {
    const book = document.querySelector(`.book-item[data-id=${id}]`);
    book.remove();
}