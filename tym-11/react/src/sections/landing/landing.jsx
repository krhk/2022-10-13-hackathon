import Navbar from '../../navbar/navbar';
import './landing.scss';


function Landing(){
    return (
        <section className="landing">
            <Navbar />
            <div className="main container">
            <div className="shade"></div>
                <h1>
                    Údržba a oprava silnic Královehradeckého Kraje
                </h1>
                <img src="/src/assets/icon.png" alt="" />
            </div>
        </section>
    )
}

export default Landing;