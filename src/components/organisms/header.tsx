import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div className="w-full fixed top-0 z-20 text-xs bg-white bg-opacity-90">
            <p className="text-lg font-bold text-gray-800 text-center p-2 transform hover:scale-105 transition-transform duration-300">
                <Link to="/">Pretty Tickets<img className="inline-block ml-1 -mt-1" width={30} src="/logo128.png" alt="ticket" /></Link>
            </p>
        </div>
    )
}