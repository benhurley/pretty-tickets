import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div className="w-full fixed top-0 z-20 text-xs bg-white bg-opacity-90">
            <p className="text-lg font-bold text-gray-800 text-center p-2 transform hover:scale-105 transition-transform duration-300">
                <Link to="/">Pretty Tickets<span className="text-[10px] absolute top-0">™</span></Link>
            </p>
        </div>
    )
}