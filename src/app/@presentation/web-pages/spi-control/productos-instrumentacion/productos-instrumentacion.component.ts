import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-productos-instrumentacion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NebularSharedModule
  ],
  templateUrl: './productos-instrumentacion.component.html',
  styleUrl: './productos-instrumentacion.component.scss'
})
export class ProductosInstrumentacionComponent {

  instrumentationProducts = [
    {
      title: 'Medición de flujo',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754912609/Medicion-de-flujo-SPICONTROL_qmjhnt.jpg', // Imagen de ejemplo
      description: 'La medición de flujo es un proceso que se utiliza para medir la cantidad de líquido, gas o vapor que fluye a través de un sistema en un momento dado. Las mediciones pueden ser invasivas o no invasivas, lo que significa que pueden ser medidas directamente en el fluido o mediante tecnologías no intrusivas que miden el flujo sin tocar el fluido.',
      benefits: [
        'Optimización de la eficiencia del sistema: La medición de flujo ayuda a identificar los puntos de estrangulamiento en un sistema y a optimizar el flujo para una mayor eficiencia.',
        'Monitoreo de calidad: La medición de flujo se utiliza a menudo para controlar la calidad de los productos líquidos y gaseosos en el procesamiento industrial.',
        'Seguridad: La medición de flujo también es importante para garantizar la seguridad en los sistemas de tuberías y prevenir problemas como el sobrecalentamiento.'
      ]
    },
    {
      title: 'Medición de nivel',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754912609/Medicion-de-nivel-SPICONTROL_gnfssd.jpg', // Imagen de ejemplo
      description: 'La medición de nivel es la medición de la altura de un líquido o sólido en un tanque o recipiente. Puede ser sin contacto o con contacto, lo que significa que puede medirse sin tocar el líquido o mediante sensores de contacto que miden el nivel directamente.',
      benefits: [
        'Control del inventario: La medición de nivel se utiliza a menudo para controlar la cantidad de líquido o sólido en un tanque o recipiente, lo que ayuda a los gerentes a mantener el inventario y a evitar la escasez.',
        'Reducción del desperdicio: La medición de nivel también ayuda a evitar el desperdicio de líquidos o sólidos que podrían ser costosos o peligrosos si se derraman o se desbordan.',
        'Cumplimiento de regulaciones: En algunos casos, la medición de nivel es una parte importante del cumplimiento de las regulaciones de seguridad y medio ambiente.'
      ]
    },
    {
      title: 'Medición de presión',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754912609/Medicion-de-presion-SPICONTROL_wcoexy.jpg', // Imagen de ejemplo
      description: 'La medición de presión es la medición de la fuerza ejercida por un líquido o gas en un sistema cerrado. Puede ser analógica o digital, lo que significa que puede medirse mediante indicadores analógicos o mediante tecnologías digitales que ofrecen una mayor precisión y flexibilidad.',
      benefits: [
        'Monitoreo de la estabilidad del sistema: La medición de presión se utiliza a menudo para controlar la estabilidad de un sistema y detectar problemas como fugas o sobrepresión.',
        'Reducción del tiempo de inactividad: La medición de presión también ayuda a identificar y corregir problemas de manera oportuna, lo que ayuda a reducir el tiempo de inactividad y a mantener la eficiencia del sistema.',
        'Cumplimiento de regulaciones: Al igual que con la medición de nivel, la medición de presión también es importante para el cumplimiento de las regulaciones de seguridad y medio ambiente.'
      ]
    },
    {
      title: 'Medición de temperatura',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754912609/Medicion-de-temperatura-SPICONTROL_zbcna9.jpg', // Imagen de ejemplo
      description: 'Es la medición de la cantidad de calor que está presente en un sistema en un momento dado. Se puede medir mediante termómetros analógicos o tecnologías digitales que ofrecen una mayor precisión y flexibilidad.',
      benefits: [
        'Monitoreo y control de procesos: La medición de temperatura es fundamental para controlar y monitorear los procesos de producción industrial, especialmente en la fabricación de productos químicos, alimentos y farmacéuticos.',
        'Identificación de problemas: La medición de temperatura también ayuda a identificar problemas en los sistemas y equipos, como sobrecalentamiento, enfriamiento insuficiente o fluctuaciones en la temperatura, lo que puede conducir a un mal funcionamiento y fallas.',
        'Seguridad: La medición de temperatura es crítica en entornos peligrosos y en procesos que implican reacciones químicas o explosiones potenciales, ya que ayuda a prevenir accidentes y mantener la seguridad del personal y las instalaciones.'
      ]
    },
    {
      title: 'Válvulas',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754912610/Valvulas-SPICONTROL_jev8qw.jpg', // Imagen de ejemplo
      description: 'Las válvulas de bola, cuchilla, mariposa y de control son dispositivos utilizados para controlar y regular el flujo de líquidos y gases en un sistema. Utilizan diferentes mecanismos como esferas, placas o sistemas de retroalimentación para ajustar el flujo.',
      benefits: [
        'Control preciso del flujo: Permiten un control de alta precisión del flujo de líquidos y gases, lo que ayuda a optimizar la eficiencia del sistema y mejorar la calidad del producto.',
        'Automatización: Las válvulas de control se pueden automatizar para ajustar el flujo de manera automática en respuesta a las condiciones del sistema, reduciendo la intervención humana.',
        'Monitoreo y diagnóstico: A menudo incluyen sistemas de monitoreo que ayudan a detectar problemas antes de que ocurran, manteniendo la seguridad y eficiencia del sistema.'
      ]
    },
    {
      title: 'Análisis de líquidos',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754912609/Analisis-de-liquidos-SPICONTROL_itdsxg.jpg', // Imagen de ejemplo
      description: 'El análisis de líquidos es el proceso de medir las propiedades físicas y químicas de los líquidos, como la acidez, la alcalinidad, la concentración de ciertos componentes y la conductividad eléctrica.',
      benefits: [
        'Control de calidad: Es fundamental para garantizar la calidad del producto en la fabricación de alimentos, bebidas, productos farmacéuticos y petroquímicos.',
        'Detección de contaminantes: Se utiliza para detectar contaminantes y sustancias no deseadas, garantizando la seguridad del consumidor y el cumplimiento de estándares regulatorios.',
        'Optimización de procesos: Puede ser utilizado para optimizar los procesos de producción y reducir los costos, identificando áreas de mejora.'
      ]
    },
    {
      title: 'Medición de peso',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754883634/Medicion-de-peso-SPICONTROL_bohw5e.jpg', // Imagen de ejemplo
      description: 'La medición de peso es fundamental en muchos procesos de producción industrial, especialmente en la fabricación de productos farmacéuticos, alimentos y productos químicos.',
      benefits: [
        'Control de calidad: Es fundamental para garantizar la calidad del producto y cumplir con los estándares regulatorios.',
        'Reducción de desperdicios: Ayuda a reducir los desperdicios y mejorar la eficiencia en los procesos de producción.',
        'Precisión: Las tecnologías modernas de medición de peso ofrecen una alta precisión y confiabilidad, lo que optimiza la eficiencia del sistema.'
      ]
    },
    {
      title: 'Medición de vibración',
      image: 'https://res.cloudinary.com/dgxyw8pkn/image/upload/v1754912609/Medicion-de-vibracion-SPICONTROL_up40x9.jpg', // Imagen de ejemplo
      description: 'La medición de vibración es el proceso de medir la vibración mecánica en equipos y estructuras, lo que puede indicar problemas como desequilibrios, fallas en los cojinetes y otros problemas mecánicos.',
      benefits: [
        'Detección temprana de problemas: Puede detectar problemas mecánicos antes de que se produzcan fallas, previniendo el tiempo de inactividad.',
        'Mejora de la eficiencia: Se puede utilizar para optimizar el funcionamiento de los equipos y mejorar la eficiencia del sistema.',
        'Monitoreo de seguridad: Es importante para garantizar la seguridad de los equipos y las estructuras, especialmente en entornos industriales.'
      ]
    }
  ];

}