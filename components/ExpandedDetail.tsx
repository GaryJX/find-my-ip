import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

const ExpandedDetail: React.FC<{ title: string; details: React.ReactNode }> = ({ title, details }) => {
  details = details ?? 'Not Found';

  return (
    <Flex alignItems="center" gridGap="0.25rem">
      <Heading fontSize={{ base: '0.75rem', md: '1rem' }}>{title}:</Heading>
      <Text fontSize={{ base: '0.75rem', md: '1rem' }}>{details}</Text>
    </Flex>
  );
};

export default ExpandedDetail;
