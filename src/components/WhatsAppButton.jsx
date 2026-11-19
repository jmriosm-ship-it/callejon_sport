import Icon from './Icon'
import { useStore } from '../store/useStore'

export default function WhatsAppButton() {
  const { wa, instagram: INSTAGRAM_URL } = useStore()
  return (
    <>
      <a className="fab fab--ig" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
        <Icon name="ig" />
      </a>
      <a className="fab" href={wa('Hola Callejón Store, quiero info')} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp">
        <Icon name="wa" />
      </a>
    </>
  )
}
