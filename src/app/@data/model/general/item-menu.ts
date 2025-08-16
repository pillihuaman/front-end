export class ItemMenu {
    descripcion: string | undefined;
    icono: string | undefined;
    url: string | undefined;
    subMenu?: ItemMenu[];
    opened?: boolean;
    childSelected?: boolean;
}
