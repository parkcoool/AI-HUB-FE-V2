import { useMutationState } from "@tanstack/react-query";
import { Suspense, useState } from "react";

import { Button } from "~/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";

import { UserDeleteDialog } from "../components/user-delete-dialog";
import { useGetProfileQuery } from "../hooks/use-get-profile-query";
import { useUpdateProfileMutation } from "../hooks/use-update-profile-mutation";

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="size-4" />
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}

interface ProfileForm {
  email: string;
  username: string;
}

function Content() {
  const { data: profile } = useGetProfileQuery();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfileMutation();
  const isDeletingUser = useMutationState({
    filters: { mutationKey: ["delete-user"], exact: true },
    select: (mutation) => mutation.state.status === "pending",
  }).some(Boolean);

  const [profileForm, setProfileForm] = useState<ProfileForm>({
    email: profile.email,
    username: profile.username,
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isSubmitDisabled =
    isUpdatingProfile ||
    (profileForm.email === profile.email && profileForm.username === profile.username) ||
    profileForm.email.trim() === "" ||
    profileForm.username.trim() === "" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email);

  const handleUserDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    updateProfile(profileForm);
  };

  return (
    <div className="p-4 flex flex-col items-center h-full">
      <form
        className="flex flex-col py-4 gap-6 w-full h-full max-w-md relative"
        onSubmit={handleSubmit}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">사용자 이름</FieldLabel>
            <Input
              id="username"
              type="text"
              value={profileForm.username}
              onChange={(e) => setProfileForm((prev) => ({ ...prev, username: e.target.value }))}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">이메일</FieldLabel>
            <Input
              id="email"
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </Field>
        </FieldGroup>

        <div className="flex flex-col gap-2 absolute bottom-4 left-0 right-0">
          <Button
            variant="ghost"
            disabled={isUpdatingProfile || isDeletingUser}
            className="flex-1 gap-1 text-muted-foreground"
            onClick={handleUserDelete}
          >
            {isDeletingUser && <Spinner className="size-4 mr-2" />}
            {isDeletingUser ? "계정 삭제 중..." : "계정 삭제"}
          </Button>

          <Button type="submit" disabled={isSubmitDisabled} className="flex-1 gap-1">
            {isUpdatingProfile && <Spinner className="size-4 mr-2" />}
            {isUpdatingProfile ? "프로필 업데이트 중..." : "프로필 업데이트"}
          </Button>
        </div>
      </form>

      <UserDeleteDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} />
    </div>
  );
}
