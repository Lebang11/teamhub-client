const NotUser = () => {
    return ( 
        <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center">
            <h1 className="text-center">
                Please <a href="/login">Login</a>
            </h1>
            <h1 className="text-center">
                Or <a href="/create">Create new account</a>
            </h1>
        </div>
     );
}
 
export default NotUser;