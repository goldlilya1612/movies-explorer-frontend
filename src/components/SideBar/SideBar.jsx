import NavLinks from "../NavLinks/NavLinks";
import "./SideBar.css";
import cross from '../../images/cross.svg'

const SideBar = ({isOpen, showSideBar, isMobile}) => {

    return (
        <> 
        <nav className={`sidebar ${isOpen ? '' : 'sidebar_invisible'}`}>
                <img className="sidebar__button-image"src={cross} alt="крестик"></img>
                <button className="sidebar__button" onClick={showSideBar}></button>
                <NavLinks isMobile={isMobile} />
            </nav> 
        <div className={`sidebar-overlay ${isOpen ? '' : 'sidebar-overlay_invisible'}`}></div>     
        </>)
};        

export default SideBar;