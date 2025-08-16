export interface Roles {
  id: string; // MongoDB ObjectId as string
  name: string;
  active: boolean;
  description: string;
  permissionIds: string[]; // list of ObjectId strings
  assignedUsers?: any[]; // You can replace `any` with a User interface if available
}
