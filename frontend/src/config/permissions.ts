export const PERMISSIONS = {
  VIDEO_UPLOAD: "video.upload",
  VIDEO_EDIT: "video.edit",
  ANALYTICS_VIEW: "analytics.view",
  USER_MANAGE: "user.manage",
  SETTINGS_EDIT: "settings.edit",
} as const;

// strict union type
export type Permissions = typeof PERMISSIONS[keyof typeof PERMISSIONS] | "*";

export type Role = "viewer" | "creator" | "admin";
