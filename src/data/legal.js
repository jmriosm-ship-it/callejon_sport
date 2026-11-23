// Textos legales. Los datos del local salen de los ajustes (panel → Tienda).
// IMPORTANTE: revisar con un abogado antes de publicar; los plazos de cambios son propuestos y deben confirmarse con el dueño.
export const UPDATED = '22 de noviembre de 2026'

export const LEGAL_SLUGS = {
  terminos: 'Términos y condiciones',
  privacidad: 'Política de privacidad y tratamiento de datos',
  cookies: 'Política de cookies',
  cambios: 'Cambios, devoluciones y garantía',
}

export function legal(slug, s) {
  const name = s.legalname || 'Callejón Store'
  const id = s.legalid ? ` (${s.legalid})` : ''
  const email = s.email || ''
  const phone = s.whatsapp ? `+${s.whatsapp}` : ''
  const address = s.address || ''
  const who = `${name}${id}, que opera la tienda Callejón Store, con domicilio en ${address}`

  const docs = {
    terminos: [
      ['Quiénes somos', [`Esta tienda es operada por ${who}. Contacto: ${email}${phone ? ` · WhatsApp ${phone}` : ''}.`, 'Al usar este sitio y hacer un pedido aceptas estos términos.']],
      ['Cómo se hace un pedido', ['Eliges tus prendas, las agregas a la bolsa y llenas tus datos de entrega. El pedido se envía a nuestro WhatsApp y allí confirmamos tallas, colores, disponibilidad, valor del envío y forma de pago.', 'El pedido solo queda confirmado cuando te lo confirmamos por WhatsApp y se recibe el pago.']],
      ['Precios y disponibilidad', ['Los precios están en pesos colombianos (COP). Pueden cambiar sin previo aviso; vale el precio vigente al confirmar el pedido.', 'Las existencias que ves son las del momento de la consulta. Si una prenda se agota antes de confirmar tu pedido, te avisamos para que elijas otra o te devolvamos lo pagado.']],
      ['Pagos', ['Aceptamos los métodos que aparecen en la tienda (Nequi, Bancolombia y Daviplata). El pago se hace antes de enviar el pedido y los datos para pagar se entregan por WhatsApp.', 'Verifica siempre que los datos de pago vengan de nuestro WhatsApp oficial. No cobramos nada dentro de esta página.']],
      ['Envíos', ['Enviamos por Interrapidísimo, DHL o la transportadora que prefieras. El tiempo de entrega depende de la transportadora y de la ciudad de destino, y el costo del envío depende del destino; te lo informamos antes de pagar.', 'Es responsabilidad del comprador dar una dirección y un teléfono correctos.']],
      ['Retracto, cambios y garantía', ['En compras a distancia tienes derecho de retracto de 5 días hábiles contados desde la entrega, conforme a la Ley 1480 de 2011.', 'Los cambios, devoluciones y la garantía se explican en la política de Cambios, devoluciones y garantía.']],
      ['Propiedad intelectual', ['El nombre, el logo, las fotos y los textos de Callejón Store son de su titular. No pueden copiarse ni usarse sin autorización.']],
      ['Ley aplicable y reclamos', ['Estos términos se rigen por las leyes de Colombia. Puedes presentar tu reclamo escribiendo a ' + email + ' y, si no queda resuelto, acudir a la Superintendencia de Industria y Comercio.']],
      ['Cambios a estos términos', ['Podemos actualizar estos términos. La versión vigente es la publicada en esta página.']],
    ],
    privacidad: [
      ['Responsable del tratamiento', [`${who}. Correo: ${email}${phone ? ` · Teléfono/WhatsApp: ${phone}` : ''}.`, 'Cumplimos la Ley 1581 de 2012 y el Decreto 1377 de 2013 sobre protección de datos personales.']],
      ['Qué datos pedimos', ['Nombre, celular, país, departamento, ciudad, dirección, barrio o referencia, método de pago elegido y las notas que escribas en tu pedido.']],
      ['Para qué los usamos', ['Gestionar y confirmar tu pedido, coordinar el pago y el envío, contactarte por WhatsApp sobre ese pedido y atender cambios, garantías y reclamos.']],
      ['Cómo viajan tus datos', ['Esta página no guarda tus datos de entrega en una base de datos: al enviar el pedido se arma un mensaje que se abre en WhatsApp para que lo envíes tú. Allí lo recibimos nosotros.', 'Para enviarte el pedido compartimos nombre, teléfono y dirección con la transportadora. WhatsApp es un servicio de Meta y se rige por sus propias políticas.']],
      ['Cuánto tiempo los guardamos', ['Solo el tiempo necesario para atender tu pedido y cumplir obligaciones legales, contables y de garantía.']],
      ['Tus derechos', ['Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, y revocar la autorización, escribiendo a ' + email + '. Respondemos las consultas en máximo 10 días hábiles y los reclamos en máximo 15 días hábiles.', 'Si consideras que no respetamos tus derechos, puedes acudir a la Superintendencia de Industria y Comercio.']],
      ['Publicidad', ['No enviamos publicidad ni compartimos tus datos con terceros para fines comerciales.']],
    ],
    cookies: [
      ['Qué son', ['Las cookies y el almacenamiento local son pequeños datos que el navegador guarda para que el sitio funcione.']],
      ['Lo que usamos', ['Solo almacenamiento local necesario: guarda tu bolsa de compras para que no se pierda al recargar la página y, para los administradores, mantiene la sesión abierta.', 'No usamos cookies de publicidad ni de seguimiento, ni herramientas como Google Analytics o Meta Pixel.']],
      ['Cómo borrarlas', ['Puedes borrar estos datos desde la configuración de tu navegador. Si lo haces, tu bolsa se vacía.']],
      ['Servicios de terceros', ['Algunas secciones cargan contenido de terceros, como el mapa de Google Maps. Esos servicios pueden usar sus propias cookies según sus políticas.']],
    ],
    cambios: [
      ['Derecho de retracto', ['En compras a distancia puedes retractarte dentro de los 5 días hábiles siguientes a la entrega (Ley 1480 de 2011). Escríbenos a ' + email + ' o por WhatsApp y te indicamos cómo devolver la prenda. Debe estar sin uso, con etiquetas y en su empaque original.']],
      ['Cambios de talla o referencia', ['Aceptamos cambios dentro de los 8 días siguientes a la entrega, con la prenda sin uso, sin lavar, con etiquetas y sin olores ni manchas. El costo del envío del cambio lo asume el cliente, salvo que el error haya sido nuestro.', 'El cambio es por otra prenda de igual o mayor valor, según disponibilidad.']],
      ['Garantía por defectos', ['Si la prenda llega con un defecto de fabricación o no corresponde a lo que pediste, tienes derecho a garantía conforme a la Ley 1480 de 2011. Repórtalo con fotos dentro de los 8 días siguientes a la entrega y nosotros asumimos el envío de la reparación, el cambio o la devolución del dinero.']],
      ['Prendas en descuento', ['Las prendas con descuento tienen los mismos derechos de retracto y garantía. Los cambios por gusto o talla están sujetos a disponibilidad.']],
      ['Cómo hacer una solicitud', [`Escribe por WhatsApp${phone ? ` al ${phone}` : ''} o al correo ${email} con tu nombre, el pedido y fotos si aplica.`]],
    ],
  }

  return docs[slug] || null
}
