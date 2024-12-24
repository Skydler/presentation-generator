import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Center, Heading, VStack } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { auth } from "../services/firebase/auth";
import { LoadingSpinner } from "../components/shared/LoadingSpinner";

export function Login() {
  const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Center textAlign="center" height="100vh">
      <VStack gap={10}>
        <Heading size="5xl">Hi! Please authenticate</Heading>
        <Button onClick={() => signInWithGoogle()}>Log in</Button>
      </VStack>
    </Center>
  );
}
