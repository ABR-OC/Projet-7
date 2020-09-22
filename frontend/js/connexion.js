
const connexion = document.getElementById('connexion')
window.addEventListener('load', () => {
    if( !sessionStorage.getItem('status') ) {
        return window.location.replace('login.html')
    }
    connexion.innerHTML = `<a href=login.html id="disconnect"><i class="fas fa-unlock-alt"></i></i>Déconnexion</a>`
    const disconnect = document.getElementById('disconnect')
    disconnect.addEventListener('click', () => {
        sessionStorage.clear();
    })
})