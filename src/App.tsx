import { Card, HStack, Separator, VStack } from "@chakra-ui/react";
import { AttractionsList } from "./components/shared/AttractionsList";
import { useState } from "react";

type City = {
  name: string;
  description: string;
  location: string;
};

type Restaurant = {
  name: string;
  description: string;
  location: string;
};

export type Attraction = City | Restaurant;

function App() {
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null);

  return (
    <VStack height="vh" justifyContent="center">
      <HStack gap={10}>
        <AttractionsList setAttraction={setSelectedAttraction} />
        <Separator orientation="vertical" />
        <VStack>
          {selectedAttraction ? (
            <Card.Root width={500} height={250} variant={"elevated"}>
              <Card.Body gap={2}>
                <Card.Title>{selectedAttraction.name}</Card.Title>
                {selectedAttraction.description && (
                  <Card.Description>
                    {selectedAttraction.description}
                  </Card.Description>
                )}
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                {selectedAttraction.location}
              </Card.Footer>
            </Card.Root>
          ) : (
            "Plase pick an attraction"
          )}
        </VStack>
      </HStack>
    </VStack>
  );
}

export default App;
