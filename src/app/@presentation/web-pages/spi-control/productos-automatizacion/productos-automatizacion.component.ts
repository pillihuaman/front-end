import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-productos-automatizacion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NebularSharedModule
  ],
  templateUrl: './productos-automatizacion.component.html',
  styleUrl: './productos-automatizacion.component.scss'
})
export class ProductosAutomatizacionComponent {

  automationProducts = [
    {
      title: 'PLC’s',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883634/PLC-SPICONTROL_mooajc.jpg',
      description: 'Los controladores lógicos programables (PLC, por sus siglas en inglés) son dispositivos electrónicos que se utilizan para controlar procesos industriales y máquinas automatizadas. Los PLC’s pueden ser programados para realizar una variedad de tareas, como controlar motores, monitorear sensores, medir y regular el flujo de líquidos y gases, y realizar operaciones matemáticas.',
      benefits: [
        'Mayor eficiencia: Los PLC’s pueden automatizar tareas repetitivas y monótonas, lo que reduce el tiempo y los errores asociados con la programación manual.',
        'Mayor confiabilidad: Los PLC’s están diseñados para ser resistentes a las condiciones ambientales adversas, como la temperatura, la humedad y las vibraciones, lo que los hace ideales para su uso en entornos industriales exigentes.',
        'Facilidad de mantenimiento: Los PLC’s son dispositivos modulares que se pueden reparar o reemplazar fácilmente sin afectar el resto del sistema, lo que reduce los costos y el tiempo de inactividad.'
      ]
    },
    {
      title: 'Paneles HMI',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883634/HMI-SPICONTROL_gbk9jx.jpg',
      description: 'Los paneles de interfaz hombre-máquina (HMI, por sus siglas en inglés) son dispositivos que se utilizan para proporcionar una interfaz gráfica entre el operador y el sistema automatizado. Los HMI’s pueden mostrar información en tiempo real, como la velocidad del motor, la temperatura, la presión y el flujo, y permiten al operador controlar y ajustar las operaciones del sistema.',
      benefits: [
        'Mayor visibilidad: Los HMI’s proporcionan una representación visual clara de la operación del sistema, lo que facilita la identificación de problemas y la toma de decisiones.',
        'Mayor facilidad de uso: Los HMI’s suelen tener una interfaz gráfica intuitiva que es fácil de usar y comprender, lo que reduce el tiempo de capacitación del operador y los errores de operación.'
      ]
    },
    {
      title: 'Software De Programación',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883634/Software-programacion-SPICONTROL_d6rqyg.jpg',
      description: 'Se utiliza para diseñar, crear y probar programas para sistemas automatizados y dispositivos electrónicos. El software de programación puede ser utilizado para programar PLC’s, HMI’s, variadores de velocidad, servomotores, motores y otros dispositivos.',
      benefits: [
        'Mayor flexibilidad: El software de programación permite a los usuarios crear programas personalizados que se adapten a sus necesidades específicas, lo que aumenta la flexibilidad del sistema.',
        'Mayor eficiencia: El software de programación puede automatizar la creación de código y realizar pruebas de depuración, lo que reduce el tiempo y los errores asociados con la programación manual.',
        'Mayor facilidad de mantenimiento: El software de programación permite a los usuarios hacer cambios y actualizaciones en el código sin afectar el resto del sistema, lo que facilita el mantenimiento y la resolución de problemas.'
      ]
    },
    {
      title: 'Temporizadores Y Contadores',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883633/Contadores-SPICONTROL_x1iyom.jpg',
      description: 'Son dispositivos electrónicos que se utilizan para medir el tiempo y contar eventos en sistemas automatizados. Los temporizadores pueden ser programados para activar o desactivar dispositivos después de un período de tiempo determinado, mientras que los contadores pueden registrar el número de ciclos o eventos que ocurren en un sistema.',
      benefits: [
        'Mayor precisión: Los temporizadores y contadores electrónicos ofrecen una mayor precisión y consistencia en comparación con los dispositivos mecánicos tradicionales.',
        'Mayor eficiencia: Los temporizadores y contadores electrónicos pueden automatizar tareas que de otra manera serían realizadas manualmente, lo que reduce el tiempo y las pérdidas asociadas con la operación manual.',
        'Mayor versatilidad: Los temporizadores y contadores electrónicos pueden ser programados para realizar una variedad de tareas, desde controlar el encendido y apagado de dispositivos hasta medir la velocidad y la frecuencia del sistema.'
      ]
    }
,
      {
      title: 'Controladores e Indicadores',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883633/Indicadores-SPICONTROL_zxlqpn.jpg',
      description: 'Son dispositivos que se utilizan para monitorear y controlar el funcionamiento de sistemas automatizados. Los controladores pueden ser programados para tomar decisiones basadas en la entrada de sensores y otros dispositivos, mientras que los indicadores proporcionan información visual sobre el estado y la operación del sistema.',
      benefits: [
        'Mayor eficiencia: Los controladores pueden tomar decisiones rápidas y precisas basadas en la entrada de sensores y otros dispositivos, lo que mejora la eficiencia del sistema.',
        'Mayor seguridad: Los controladores pueden detectar y responder a situaciones peligrosas en el sistema, lo que mejora la seguridad del sistema y reduce el riesgo de lesiones o daños.',
        'Mayor facilidad de uso: Los indicadores proporcionan información visual clara y fácil de entender sobre el estado y la operación del sistema, lo que facilita la toma de decisiones y la resolución de problemas.'
      ]
    },
    {
      title: 'Fuentes de alimentación',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883633/Fuentes-de-alimentacion-SPICONTROL_e1wlac.jpg',
      description: 'Son dispositivos que se utilizan para convertir la energía eléctrica en una forma utilizable por los sistemas automatizados y otros dispositivos electrónicos. Las fuentes de alimentación pueden ser de diferentes tipos, como fuentes de alimentación lineales o conmutadas, y pueden proporcionar diferentes niveles de voltaje y corriente.',
      benefits: [
        'Mayor eficiencia: Las fuentes de alimentación modernas son altamente eficientes y pueden convertir la energía eléctrica en una forma utilizable con una pérdida mínima de energía.',
        'Mayor estabilidad: Las fuentes de alimentación pueden proporcionar un nivel constante de voltaje y corriente, lo que mejora la estabilidad y la fiabilidad del sistema.',
        'Mayor seguridad: Las fuentes de alimentación pueden proteger el sistema contra sobretensiones, sobrecorrientes y otros problemas eléctricos que podrían dañar los dispositivos electrónicos.'
      ]
    },
    {
      title: 'Variadores de velocidad',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883634/Variadores-SPICONTROL_j3bvde.jpg',
      description: 'Son dispositivos que se utilizan para controlar la velocidad de los motores eléctricos en sistemas automatizados. Los variadores de velocidad pueden ajustar la velocidad del motor de forma continua o discreta, lo que permite una mayor precisión y control en el funcionamiento del sistema.',
      benefits: [
        'Mayor eficiencia: Los variadores de velocidad pueden reducir el consumo de energía al ajustar la velocidad del motor de acuerdo con las necesidades del sistema, lo que mejora la eficiencia energética del sistema.',
        'Mayor precisión: Los variadores de velocidad pueden ajustar la velocidad del motor de forma precisa y continua, lo que permite un mayor control sobre el sistema y una mayor precisión en la operación del sistema.',
        'Mayor durabilidad: Los variadores de velocidad pueden prolongar la vida útil del motor al reducir el desgaste y la fatiga asociados con la operación a velocidad máxima constante.'
      ]
    },
    {
      title: 'Servomotores',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883634/Servomotor-SPICONTROL_m6ordc.jpg',
      description: 'Son dispositivos que se utilizan para controlar la posición, la velocidad y la aceleración de los sistemas automatizados. Los servomotores son altamente precisos y pueden proporcionar un control muy preciso del movimiento del sistema.',
      benefits: [
        'Mayor precisión: Los servomotores son muy precisos y pueden controlar la posición, la velocidad y la aceleración del sistema con una gran precisión, lo que mejora la precisión y la calidad del producto final.',
        'Mayor velocidad: Los servomotores pueden alcanzar velocidades muy altas, lo que permite un mayor rendimiento y una mayor productividad en los sistemas automatizados.',
        'Mayor durabilidad: Los servomotores son muy duraderos y pueden soportar cargas pesadas y altas velocidades sin sufrir daños.'
      ]
    },
    {
      title: 'Encoders',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883634/Medicion-de-peso-SPICONTROL_bohw5e.jpg',
      description: 'Son dispositivos que se utilizan para medir la posición, la velocidad y la dirección del movimiento en sistemas automatizados. Los encoders pueden ser de diferentes tipos, como encoders absolutos o incrementales, y pueden proporcionar diferentes resoluciones y precisión.',
      benefits: [
        'Mayor precisión: Los encoders pueden medir la posición, la velocidad y la dirección del movimiento con una gran precisión, lo que mejora la precisión y la calidad del producto final.',
        'Mayor control: Los encoders pueden proporcionar información en tiempo real sobre el movimiento del sistema, lo que permite un mayor control y una mayor precisión en la operación del sistema.',
        'Mayor seguridad: Los encoders pueden detectar y responder a situaciones peligrosas en el sistema, lo que mejora la seguridad del sistema y reduce el riesgo de lesiones para los trabajadores y para el equipo.'
      ]
    },
    {
      title: 'Relés',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883633/Reles-SPICONTROL_eaq3vg.jpg',
      description: 'Son dispositivos que se utilizan para controlar la energía eléctrica en los sistemas automatizados. Los relés pueden ser de diferentes tipos, como relés electromecánicos o relés de estado sólido, y se utilizan para controlar el encendido y apagado de los motores, las luces y otros componentes eléctricos del sistema.',
      benefits: [
        'Mayor control: Los relés pueden controlar con precisión el encendido y apagado de los componentes eléctricos del sistema, lo que permite un mayor control y una mayor precisión en la operación del sistema.',
        'Mayor seguridad: Los relés pueden detectar y responder a situaciones peligrosas en el sistema, como sobrecargas eléctricas, lo que mejora la seguridad del sistema y reduce el riesgo de lesiones para los trabajadores y para el equipo.',
        'Mayor durabilidad: Los relés pueden soportar altos niveles de corriente y de voltaje sin sufrir daños, lo que los hace ideales para aplicaciones en entornos industriales exigentes.'
      ]
    }

  ];

}