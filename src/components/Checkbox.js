import './Checkbox.scss';

export default function Checkbox({ checked, onChange, children }) {
  return (
    <div className='__checkbox'>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round" />
      </label>
      
      { children }
    </div>
  )
}