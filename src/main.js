function MainPage() {
    
    fetch('https://team-hub.onrender.com/api/main')
    .then(data => console.log(data))
    .catch(error => console.error(error));

    return (
        <div>
            Welcome
        </div>
    )
}

export default MainPage;