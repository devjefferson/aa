import Assalto from '../image/pin/pin-assalto.png'
import home from '../image/pin/pin-home.png'
import car from '../image/pin/pin-car.png'
import company from '../image/pin/pin-company.png'
import fishnet from '../image/pin/pin-fishnet.png'
import motorcycle from '../image/pin/pin-motorcycle.png'
import theft from '../image/pin/pin-theft.png'



export default (name: string)=>{
  var Image = Assalto
  switch (name) {
    case 'assalto':
        Image = Assalto
      break;

    case 'arrastao':
        Image = fishnet
      break;

    case 'furto':
        Image = theft
      break;
    
    case 'residencial':
        Image = home
      break;
      
    case 'empresa':
        Image = company
      break;

    case 'moto':
        Image = motorcycle
      break;

    case 'carro':
      Image = car
    break;
  
    default: Assalto
      break;
  }

  return Image

}