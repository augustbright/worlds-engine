import { ApplicationPage } from "modules/application/components/application-page";
import { ProfileForm } from "modules/profile/components/profile-form";
import React from "react";

export const ProfilePage: React.FC = () => {
  return (
    <ApplicationPage>
      <ProfileForm />
    </ApplicationPage>
  );
};
