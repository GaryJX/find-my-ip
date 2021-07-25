import { Flex, Heading } from '@chakra-ui/react';
import { GlobalContext } from 'pages';
import React from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import Info from './Info';

const IPLookup = () => {
  const data = useContext(GlobalContext);
  const location = useMemo(() => {
    return data?.city.name;
  }, [data]);

  return (
    <Flex height="35vh" background="grey" p={8} justifyContent="center" position="relative">
      <Heading>Find My IP Address</Heading>
      <Flex
        position="absolute"
        bottom="0"
        gridGap={10}
        background="white"
        p={8}
        borderRadius={5}
        transform="translateY(50%)"
        zIndex="1000"
        boxShadow="lg"
      >
        <Info title="IP Address" details={data?.ip} />
        <Info title="ISP" details={data?.asn.organisation} />
        <Info title="Location" details={location} />
        <Info title="Time Zone" details={data?.time.timezone} />
      </Flex>
    </Flex>
  );
};

export default IPLookup;
