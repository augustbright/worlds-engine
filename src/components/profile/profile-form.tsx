import { StringEditor } from "components/editor/string-editor";
import { Name } from "components/editor/word/name";
import { Color } from "components/theming";
import { useOwnProfile, useUpdateOwnProfile } from "hook/user";
import { LoadingPage } from "pages/loading-page";
import React, { useCallback } from "react";

export const ProfileForm: React.FC = () => {
  const ownProfileQuery = useOwnProfile();
  const updateOwnProfile = useUpdateOwnProfile();
  const handleChangeName = useCallback(
    (name: string) => {
      updateOwnProfile.mutate({ name });
    },
    [updateOwnProfile]
  );

  if (ownProfileQuery.isLoading) return <LoadingPage>Profile data</LoadingPage>;
  if (ownProfileQuery.data === undefined) return null;

  return (
    <>
      <Name color={Color.TEXT_RESERVED}>Name</Name>
      <span>: </span>
      <StringEditor
        onChange={handleChangeName}
        value={ownProfileQuery.data?.name || ""}
      >
        <Name color={Color.TEXT_TYPE_NAME}>{ownProfileQuery.data?.name}</Name>
      </StringEditor>
    </>
  );
};
