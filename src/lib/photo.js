import local from '../assets/local.webp'

// Recorte de la foto del local como imagen de fondo (placeholder hasta tener fotos de producto)
export const photo = (pos, size = 340) => ({
  backgroundImage: `url(${local})`,
  backgroundSize: `${size}% auto`,
  backgroundPosition: pos,
})

// Foto real si la hay; si no, el recorte de ejemplo
export const itemPhoto = (item, size = 340, index = 0) =>
  item.photos?.[index]
    ? { backgroundImage: `url("${item.photos[index]}")`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'none' }
    : photo(item.pos || '50% 50%', size)

export const catPhoto = (c) =>
  c.photo
    ? { backgroundImage: `url("${c.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundImage: `url(${local})`, backgroundPosition: c.pos || '50% 50%' }
