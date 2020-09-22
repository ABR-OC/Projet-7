
const content = document.getElementById('content');
const fileField = document.querySelector('input[type=file]')
const btn = document.getElementById('btn');
const errorMessage = document.getElementById('error-message');

const url = 'http://localhost:4000/post'
const token = 'Bearer ' + sessionStorage.getItem('token') // Récupère le token stocké dans local storage

/* ===NOUVEAU MESSAGE=== */

/* Crée les données du message */
const createData = async (url, formData) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': token
            },
            method: 'POST',
            body: formData
        })
        return await response.json()        
    } catch (err) {
        throw new Error(err)
    }
}

/* Permet de créer un nouveau message */
btn.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        console.log(content.value)
        if( content.value.length > 0) {
            const formData = new FormData();
            const post = { content: content.value }
            formData.append('post', JSON.stringify(post))
            if ( fileField.files[0]) formData.append('image', fileField.files[0])   
            const data = await createData(url, formData)
            content.value = "";
            window.location.reload(true)
            return console.log(data.message)
        }   
        return errorMessage.textContent = "Veuillez raconter votre histoire !"     
    } catch (err) {
        throw new Error(err)
    }
})

/* ===AFFICHER LES MESSAGES=== */

/* Permet d'afficher les différents messages */
const urlPosts = 'http://localhost:4000/posts'
const displayPosts = async () => {
    const posts = await getPosts(urlPosts);
    for( let i = posts.length -1; i >= 0; i--) {
        const {username, content, avatar, id, imageUrl} = posts[i]
        const date = posts[i].updatedAt // Récupère la date du post actuel
        const postDate = convertDate(date) // Convertis la date en format français
        renderPost(username, avatar, imageUrl, content, postDate, id)
    }
}

/* Récupère les données des différents messages */
const getPosts = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        return await response.json()
    } catch (err) {
        throw new Error(err)
    }
}

/* Affiche le message */
const renderPost = (username, avatar, imageUrl, postContent, postDate, postId) => {
    const section = document.getElementById('post');
    const article = document.createElement('article');
    if(imageUrl === null) {
        article.innerHTML = `
        <div class="post">
            <p class="username"><img src="${avatar}" id="avatar"><b class="ml-2">${username}</b></p>
            <hr>
            <div class="content">
                <p>${postContent}</p>
            </div>
            <hr>
            <p class="date">${postDate}</p>
            <hr>
            <a href="post.html?${postId}"><b class="text-primary">Voir le message...</b></a>
        </div>
        `        
    } else {
        article.innerHTML = `
        <div class="post">
            <p class="username"><img src="${avatar}" id="avatar"><b class="ml-2">${username}</b></p>
            <hr>
            <div class="content">
                <p>${postContent}</p>
                <img src="${imageUrl}">
            </div>
            <hr>
            <p class="date">${postDate}</p>
            <hr>
            <a href="post.html?${postId}"><b class="text-primary">Voir le message...</b></a>
        </div>
        `
    }

    section.appendChild(article)
}

/* Conversion de la date en format français */
const convertDate = (date) => {
    const engDate = date.split('T')[0].split('-')
    const hour = date.split('T')[1].split('.')[0]
    let frDate = []
    for( let i = engDate.length - 1 ; i >= 0; i-- ) {
        frDate.push(engDate[i])
    }
    frDate = frDate.join('-')
    const message = frDate + ', ' + hour
    return message
}

displayPosts()

