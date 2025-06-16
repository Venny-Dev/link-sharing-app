import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getLinks,
  getSharedProfile,
  getUser,
  updateLinks,
  updateUser as updateUserApi,
} from "../api/apiAppFeatures";
import { toast } from "react-toastify";

export function useGetLinks() {
  const { data, isLoading: isGettingLinks } = useQuery({
    queryFn: getLinks,
    queryKey: ["links"],
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { links: data?.data?.links, isGettingLinks };
}

export function useUpdateLinks() {
  const queryClient = useQueryClient();
  const { mutate: saveLinks, isLoading: isSavingLinks } = useMutation({
    mutationFn: updateLinks,
    onSuccess: (data) => {
      // console.log(data);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { saveLinks, isSavingLinks };
}

export function useGetUser() {
  const { data, isLoading: isGettingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { user: data?.data, isGettingUser };
}

export function useUpdateUser() {
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdating };
}

export function useGetSharedProfile(id) {
  const { data, isLoading: isGettingSharedUserProfile } = useQuery({
    queryKey: ["preview-user"],
    queryFn: () => getSharedProfile(id),
  });

  return { sharedUserProfile: data?.data, isGettingSharedUserProfile };
}
