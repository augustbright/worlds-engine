import { ProfileForm } from "components/profile/profile-form";
import React from "react";
import { PageLayout } from "./layout/page";

export const ProfilePage: React.FC = () => {
  return (
    <PageLayout>
      <ProfileForm />
    </PageLayout>
  );
};
