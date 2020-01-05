// Enable offline data persistence
db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            console.log('Multiple instances of application open')
        } else if (err.code == 'unimplemented') {
            console.log('Current browser does not support db persistence mode')
        }
    })

// Get data from Firestore db
const getData = (userId) => {
    db.collection('books').where("userId", "==", userId)
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    renderBooks({id: change.doc.id, ...change.doc.data()});
                }
                if(change.type === 'modified'){
                    removeBook(change.doc.id);
                    renderBooks({id: change.doc.id, ...change.doc.data()});
                }
                if(change.type === 'removed'){
                    removeBook(change.doc.id);
                }
            })
        })
}

// Add data to Firestore db
const addBookForm = document.querySelector('.add-book-form');
addBookForm.addEventListener('submit', (e) => addBook(e))
const addBook = (e) => {
    e.preventDefault();
    
    const title = addBookForm["title"].value;
    const author = addBookForm["author"].value;
    const readValue = document.querySelector('input[name="read"]:checked').value;
    const read = readValue == 'true' ? true : false;
    const userId = currentUser;
    const output = document.querySelector('.add-book-output');

    db.collection('books').add({title, author, read, userId})
        .then(() => {
            const modal = document.querySelector('#add-book-modal');
            M.Modal.getInstance(modal).close();
            addBookForm.reset();
            M.toast({html: 'Book added'})
        })
        .catch(err => {
            output.innerHTML = `<p class="container pink-text">${err.message}</p>`
    });
}

// Modify or delete data in Firestore db
const bookLists = document.querySelector('.login-section');
bookLists.addEventListener('click', (e) => {
    if(e.target.classList.contains('material-icons')){
        modifyBook(e.target.dataset.action, e.target.dataset.id)
    }
})

const modifyBook = (action, id) => {
    if(action === "delete"){
        deleteBook(id)
    }else{
        if(action === "toRead"){
            db.collection('books').doc(id).update({read: false})
                .then(() => {
                    M.toast({html: 'Added to books to read'})
                })
                .catch(err => console.log(err.message));
        }else if(action === "complete"){
            db.collection('books').doc(id).update({"read": true})
                .then(() => {
                    M.toast({html: 'Added to finished books'})
                })
                .catch(err => console.log(err.message));
        }
    }
}

// Delete data from Firestore db
const deleteBook = (id) => {
    db.collection('books').doc(id).delete()
        .then(() => M.toast({html: 'Book deleted'}))
        .catch(err => console.log(err.message));
}