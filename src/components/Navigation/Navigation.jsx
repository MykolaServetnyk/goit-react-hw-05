import NavLink from '../NavLink/NavLink'
import css from './Navigation.module.css'


export default function Navigation() {
    return (
        <nav>
            <NavLink to="/" >
                 Home
            </NavLink>
            <NavLink to="/movies" >
                 Movies
            </NavLink>
        </nav>
    )
}