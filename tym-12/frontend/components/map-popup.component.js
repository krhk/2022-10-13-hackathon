export default function MapPopup() {
    return (
        <div className="card w-96 border-2 border-nav-red bg-nav-default shadow-xl">
            <label className="btn btn-sm btn-circle absolute right-2 hover:bg-nav-red hover:border-nav-default bg-nav-default flex items-center border-nav-default top-1"><span className="">x</span></label>
            <div className="card-body">
                <h2 className="card-title">Nazev</h2>
                <p>Adresa C.P.</p>
                <p>Mesto</p>
                <p>PSC</p>
                <div className="card-actions justify-end">
                </div>
            </div>
        </div>
    )
}