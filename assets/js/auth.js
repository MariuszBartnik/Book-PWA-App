// Authentication state change event listener
let currentUser = '';

auth.onAuthStateChanged((user) => {
    if(user){
        setUI(user);
        getData(user.uid)
        currentUser = user.uid;
    }else{
        // User logged out
        setUI(null);
        const bookList = document.querySelector('.books-list');
        const finishedBooks = document.querySelector('.finished-books');
        bookList.innerHTML = '';
        finishedBooks.innerHTML = '';
        currentUser = ';'
    }
})

// Login in function
const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => logIn(e));

const logIn = (e) => {
    e.preventDefault();
    
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;
    const output = document.querySelector('.login-output');
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            loginForm.reset()
            output.innerHTML = '';
        })
        .catch(err => {
            output.innerHTML = `<p class="container pink-text">${err.message}</p>`
        })
}

// Sign in new user
const signinForm = document.querySelector('.signin');
signinForm.addEventListener('submit', (e) => signIn(e));

const signIn = (e) => {
    e.preventDefault();

    const email = signinForm["signin-email"].value;
    const password = signinForm["signin-password"].value;
    const confirmedPassword = signinForm["signin-confirm-password"].value;
    const output = document.querySelector('.signin-output');

    if(password == confirmedPassword){
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                signinForm.reset();
                output.innerHTML = '';
            })
            .catch(err => {
                output.innerHTML = `<p class="container pink-text">${err.message}</p>`
            })
    }else{
        const output = document.querySelector('.signin-output');
        output.innerHTML = `<p class="container pink-text">Password and confirmed password do not match</p>`
    }
}

// Sign out user
const logoutBtn = document.querySelectorAll('.logout-btn');
logoutBtn.forEach(btn => btn.addEventListener('click', () => signOut()));

const signOut = () => {
    auth.signOut()
}
