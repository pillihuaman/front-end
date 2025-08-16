import { DatePipe } from '@angular/common';
import { BusinessConstan } from './businnessConstant';
import moment from 'moment';
import { format, parse } from 'date-fns';
import { RespMenuTree } from '../@data/model/system/RespMenuTree';
declare var $: any;

export class Utils {
  static getKeysJson(columnsIn: {}): string[] {
    let result = [];

    for (const key of Object.keys(columnsIn)) {
      result.push(key);
    }
    return result;
  }
  static sortDate = (direction: any, a: string, b: string): number => {
    let first = Number(
      new DatePipe('es-PE').transform(a, 'YYYY-MM-DDTHH:mm:ss.sssZ')
    );
    let second = Number(
      new DatePipe('static').transform(b, 'YYYY-MM-DDTHH:mm:ss.sssZ')
    );

    if (first < second) {
      return -1 * direction;
    }
    if (first > second) {
      return direction;
    }
    return 0;
  };



  static getfechaActual() {
    moment.locale('es');
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  static getfechaFormatoEnvio(date: Date) {
    moment.locale('es');
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  static getfechaActualMas1Year() {
    moment.locale('es');
    return moment().add(1, 'year').format('YYYY-MM-DD HH:mm:ss');
  }

  static aleatoryName = () => {
    const crypto = window.crypto;
    const array = new Uint32Array(1);
    let arrayGenerado = crypto.getRandomValues(array);
    let numero = arrayGenerado[0];

    return (numero * new Date().getTime()).toString(36).replace(/\./g, ''); // NOSONAR
  };
  static separateArrayInOtherArray(
    origin: any[],
    target: any[],
    step: number = 2
  ) {
    origin.forEach((value, index) => {
      if (index % step === 0) {
        target.push([value]);
      } else {
        target[(index - (index % step)) / step].push(value);
      }
    });
  }

  static empty(e: any): boolean {
  
    {
      switch (e) {
        case '':
        case 0:
        case '0':
        case null:
        case false:
        case typeof e == 'undefined':
          return true;
        default:
          return false;
      }
    }
  }
  static   isValidObjectId(value: string): boolean {

    if (BusinessConstan.objectIdPattern.test(value)) {
      return true ;
    }else{
      return false ;
    }
  }
  static convertStringToDate(dateString: string): Date | null {
    //debuger
    const format = 'DD/MM/yyyy HH:mm:ss';
    const parsedDate = moment(dateString, format);
    if (parsedDate.isValid()) {
      return parsedDate.toDate();
    } else {
      return null;
    }
  }
  static convertDateToString(date: Date | string): string {
    ;
    if (!date) return '';
  
    let parsedDate: Date;
  
    if (typeof date === 'string') {
      parsedDate = parse(date, 'dd/MM/yyyy', new Date()); // Parse dd/MM/yyyy format
    } else {
      parsedDate = date;
    }
  
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date:", date);
      return '';
    }
  
    return format(parsedDate, 'dd/MM/yyyy'); // Format to dd/MM/yyyy
  }
  

  static  parseDate(dateString: string | undefined): string | null {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day).toISOString().split('T')[0]; // Convert to "yyyy-MM-dd"
  }

 
  
}
