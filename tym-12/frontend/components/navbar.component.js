import Image from "next/image"
import logo from "../public/Logogo.svg"

export default function Navbar() {
    return (
        <div className="bg-nav-default">
            <div className="flex items-center">
                <div className="flex ml-10 mr-5"><Image width="100px" height="50px" src={logo}/></div>
                <label htmlFor="test"
                    className="text-xl pl-5 pr-5 pt-7 pb-7 font-bold hover:bg-nav-red tracking-tight text-nav-white">Kategorie
                </label>
                <div className="dropdown dropdown-hover zdrop">
                    <div
                        tabIndex={0}
                        className="text-xl pl-5 pr-5 pt-7 pb-7 font-bold hover:bg-nav-red tracking-tight text-nav-white zdrop">Přednastavení
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-compact dropdown-content p-2 shadow bg-nav-default dropwidth zdrop">
                        <li>
                            <a className="justify-between">
                                Student
                            </a>
                        </li>
                        <li><a>Cyklista</a></li>
                        <li><a>woooo</a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}