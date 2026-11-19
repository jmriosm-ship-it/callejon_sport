import local from '../assets/local.webp'

// Recorte de la foto del local como imagen de fondo (placeholder hasta tener fotos de producto)
export const photo = (pos, size = 340) => ({
  backgroundImage: `url(${local})`,
  backgroundSize: `${size}% auto`,
  backgroundPosition: pos,
})
