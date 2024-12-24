import { Box, Center, Spinner } from "@chakra-ui/react";

export function LoadingSpinner() {
  return (
    <Box pos="absolute" inset="0" bg="bg/80">
      <Center h="full">
        <Spinner size="xl" color="teal.500" />
      </Center>
    </Box>
  );
}
