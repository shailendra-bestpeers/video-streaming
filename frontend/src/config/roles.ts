import { type Permissions, PERMISSIONS, type Role } from "./permissions";

export const ROLE_PERMISSIONS: Record<Role, Permissions[]> = {
  viewer: [],

  creator: [
    PERMISSIONS.VIDEO_UPLOAD,
    PERMISSIONS.VIDEO_EDIT,
    PERMISSIONS.ANALYTICS_VIEW,
  ],

  admin: ["*"],
};
