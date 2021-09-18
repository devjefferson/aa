import { pt } from 'date-fns/locale';
import { format } from 'date-fns';
export default (secund:number) => {
  const data = new Date(secund * 1000)

  const year = format(data, 'yyyy',{
    locale: pt
  })

  const month = format(data, 'MMMM',{
    locale: pt
  })

  const day = format(data, 'dd',{
    locale: pt
  })
 
  const hours = format(data, 'HH:mm',{
    locale: pt
  })

  return `Dia ${day} de ${month} de ${year}, às ${hours}`
}