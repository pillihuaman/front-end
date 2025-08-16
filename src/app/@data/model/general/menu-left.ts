export interface MenuLeft {
    idMenu?: number
    description?: string;
    icono?: string;
    iconClass?: string,
    url?: string;
    subItem?: any[];
    opened?: boolean;
    childSelected?: boolean;
    status?: boolean;
}
