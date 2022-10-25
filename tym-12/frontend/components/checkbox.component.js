export default function     Checkbox({checked,children}) {
    return <label className="label cursor-pointer gap-4 justify-start">
        <input type="checkbox" checked={checked} className="checkbox" />
        <span className="label-text">{children}</span>
    </label>
}