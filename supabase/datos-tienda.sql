-- Datos reales de Callejón Store + campos nuevos (correo, TikTok, Facebook, datos legales).
-- Pégalo en SQL Editor → Run. Es seguro correrlo más de una vez.
alter table settings add column if not exists email text not null default '';
alter table settings add column if not exists tiktok text not null default '';
alter table settings add column if not exists facebook text not null default '';
alter table settings add column if not exists legalname text not null default '';
alter table settings add column if not exists legalid text not null default '';

update settings set
  whatsapp  = '573161706977',
  instagram = 'https://instagram.com/callej0n_store',
  tiktok    = 'https://www.tiktok.com/@callejon.store',
  facebook  = '',
  email     = 'menzaovallez@gmail.com',
  legalname = 'David Santiago Menza Ovalles',
  legalid   = 'C.C. 1003828676',
  address   = 'Carrera 17 #15A-14 Sur, barrio Timanco 3.ª etapa, Neiva (Huila)',
  maps      = 'Carrera 17 #15 A-14 Sur, Timanco 3 etapa, Neiva, Huila, Colombia',
  hours     = array['Lunes a sábado: 9:00 a.m. a 12:00 m. y 2:00 p.m. a 8:30 p.m.', 'Domingos y festivos: 9:00 a.m. a 4:00 p.m.'],
  shipping  = array['Transportadora: Interrapidísimo, DHL o la que tú prefieras', 'Tiempo de entrega: según la transportadora y la ciudad', 'Costo del envío: según el destino', 'Pago: antes de enviar tu pedido'],
  payments  = array['Nequi: te enviamos el número por WhatsApp', 'Bancolombia: te enviamos los datos por WhatsApp', 'Daviplata: te enviamos el número por WhatsApp']
where id = 1;
