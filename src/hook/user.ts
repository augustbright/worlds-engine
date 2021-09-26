import { getOwnProfile, updateProfile } from "api/auth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProfileFormValues } from "types/common";

export const useOwnProfile = () =>
  useQuery(["own-profile"], () => getOwnProfile());

export const useUpdateOwnProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (profile: Partial<ProfileFormValues>) => updateProfile(profile),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["own-profile"]);
      },
    }
  );
};
