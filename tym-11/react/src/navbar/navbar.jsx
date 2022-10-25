import "./navbar.scss";

function Navbar(){
    return(
        <nav>
            <div className="container">
                <img src="/src/assets/logo.png" alt="" />
                <ul>
                    <li><a href="#aktualni-stav">Aktuální stav silnic</a></li>
                    <li><a href="#planovane-opravy">Plánované opravy</a></li>
                    <li><a href="#zadost">Žádost o opravu</a></li>
                </ul>
            </div>
        </nav>
    )
}


export default Navbar;