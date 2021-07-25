import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

const Info: React.FC<{ title: string; details: React.ReactNode }> = ({ title, details }) => {
  details = details ?? 'Not Found';

  return (
    <Flex className="info-container" flexDirection="column" alignItems={{ base: 'center', md: 'flex-start' }}>
      <Heading fontSize="0.75rem" textTransform="uppercase" color="gray.600">
        {title}
      </Heading>
      <Text fontWeight="bold" fontSize={{ base: '1rem', md: '1.5rem' }} title={details as string}>
        {details}
      </Text>
    </Flex>
  );
};

export default Info;
