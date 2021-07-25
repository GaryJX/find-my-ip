import React from 'react';
import { Heading, Text } from '@chakra-ui/react';

const Info: React.FC<{ title: string; details: React.ReactNode }> = ({ title, details }) => {
  details = details ?? 'Not Found';

  return (
    <div>
      <Heading fontSize="0.75rem" textTransform="uppercase" color="gray.600">
        {title}
      </Heading>
      <Text fontWeight="bold" fontSize="3xl">
        {details}
      </Text>
    </div>
  );
};

export default Info;
