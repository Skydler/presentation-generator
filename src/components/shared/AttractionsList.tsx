import { Attraction } from "@/App";
import { defaultAttractions } from "@/mocks/attractions";
import { VStack } from "@chakra-ui/react";
import { RadioCardItem, RadioCardLabel, RadioCardRoot } from "../ui/radio-card";

type AttractionsListProps = {
  setAttraction: (attraction: Attraction) => void;
};
export function AttractionsList({ setAttraction }: AttractionsListProps) {
  const attractions = defaultAttractions;

  return (
    <VStack gap={10}>
      <RadioCardRoot gap={2}>
        <RadioCardLabel fontSize="2xl">Attractions</RadioCardLabel>
        <VStack align="stretch">
          {attractions.map((attraction) => (
            <RadioCardItem
              key={attraction.name}
              value={attraction.name}
              description={attraction.description}
              label={attraction.name}
              onClick={() => setAttraction(attraction)}
            />
          ))}
        </VStack>
      </RadioCardRoot>
    </VStack>
  );
}
