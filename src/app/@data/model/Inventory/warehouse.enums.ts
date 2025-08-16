// src/app/core/models/warehouse/warehouse.enums.ts

export enum WarehouseType {
  CENTRO_DISTRIBUCION = 'CENTRO_DISTRIBUCION',
  ALMACEN_REGIONAL = 'ALMACEN_REGIONAL',
  TRANSITO = 'TRANSITO',
  REFRIGERADO = 'REFRIGERADO'
}

export enum OperationalStatus {
  OPERATIVO = 'OPERATIVO',
  EN_MANTENIMIENTO = 'EN_MANTENIMIENTO',
  CERRADO = 'CERRADO'
}

export enum CapacityUnit {
  PALETAS = 'PALETAS',
  METROS_CUADRADOS = 'METROS_CUADRADOS',
  UNIDADES = 'UNIDADES'
}