export default function Popup({id, children}) {
    return <div>
        <input type="checkbox" id={id} className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box w-11/12 max-w-5xl bg-nav-default">
                {children}
                <div className="modal-action">
                    <label htmlFor={id} className="btn bg-nav-red">OK</label>
                </div>
            </div>
        </div>
    </div>
}