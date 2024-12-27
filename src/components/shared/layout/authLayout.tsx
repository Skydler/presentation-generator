import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Avatar } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../../ui/menu";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../services/firebase/auth";
import { userWhitelist } from "../../../whitelist";
import { useEffect } from "react";
import { toaster } from "../../ui/toaster";

export function AuthLayout({ user, children }: { user: User; children: React.ReactNode }) {
  const [signOut] = useSignOut(auth);

  useEffect(() => {
    if (user && !userWhitelist.includes(user.uid)) {
      toaster.error({ title: "You are not authorized to access this application" });
      signOut();
    }
  }, [user, user.email, signOut]);

  return (
    <Box>
      <HStack justifyContent="end" width="full" bgColor="teal.50" px={5} py={3} mb={3}>
        <MenuRoot positioning={{ placement: "bottom-end" }}>
          <MenuTrigger asChild>
            <Button variant="plain">
              <HStack gap={4}>
                <Avatar
                  variant="solid"
                  size="lg"
                  src={user.photoURL ?? undefined}
                  name={user.displayName ?? undefined}
                />
                <Stack gap={0} alignItems="start">
                  <Text>{user.displayName}</Text>
                  <Text color="fg.muted" textStyle="sm">
                    {user.email}
                  </Text>
                </Stack>
              </HStack>
            </Button>
          </MenuTrigger>

          <MenuContent>
            <MenuItem value="logout" onClick={() => signOut()}>
              Logout
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </HStack>
      {children}
    </Box>
  );
}
