export default function Dropdown({name, items}) {
    return <div>
        <li>
            <a>
                {name}
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     viewBox="0 0 24 24">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                </svg>
            </a>
            <ul className="p-2 bg-base-100">
                {items.map((item, i) => {
                    return <li>
                        <span className="label-text">{item}</span>
                        <input type="checkbox" checked className="checkbox"/>
                    </li>
                })}
            </ul>
        </li>
    </div>
}