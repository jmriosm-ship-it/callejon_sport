const TEXT = ['Callejón Store', 'Ropa urbana', 'Nueva colección', 'Envíos a toda Colombia']

function Row() {
  return (
    <span>
      {TEXT.map((t) => (
        <b key={t}>{t} <i>✕</i></b>
      ))}
    </span>
  )
}

// Dos cintas cruzadas que se deslizan en sentidos opuestos
export default function Tapes() {
  return (
    <div className="tapes" aria-hidden="true">
      <div className="tape tape--a">
        <div className="tape__track"><Row /><Row /><Row /><Row /></div>
      </div>
      <div className="tape tape--b">
        <div className="tape__track"><Row /><Row /><Row /><Row /></div>
      </div>
    </div>
  )
}
