import type { components } from "@/shared/api/schema";

type UserProfile = components["schemas"]["UserBaseSchema"];

const getFirstChar = (value: string | null | undefined): string =>
  value?.trim().charAt(0).toUpperCase() ?? "";

export const formatUserDisplayName = (user: UserProfile): string => {
  const fullName = [user.first_name, user.last_name]
    .filter((part) => Boolean(part?.trim()))
    .join(" ")
    .trim();

  if (fullName) {
    return fullName;
  }

  if (user.email?.trim()) {
    return user.email.trim();
  }

  return user.phone;
};

export const formatUserSubtitle = (user: UserProfile): string =>
  user.email?.trim() ?? user.phone;

export const formatUserInitials = (user: UserProfile): string => {
  const fromName = getFirstChar(user.first_name) + getFirstChar(user.last_name);

  if (fromName) {
    return fromName;
  }

  const emailLocal = user.email?.trim().split("@").at(0);

  if (emailLocal && emailLocal.length >= 2) {
    return emailLocal.slice(0, 2).toUpperCase();
  }

  return user.phone.slice(0, 2);
};
