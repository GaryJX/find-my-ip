import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
} from '@chakra-ui/react';
import { GlobalContext } from 'pages';
import React, { useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import Info from './Info';
import { FormEvent } from 'react';
import axios from 'axios';
import ExpandedDetail from './ExpandedDetail';
import { PuffLoader } from 'react-spinners';
// import Image from 'next/image';

const IPLookup = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandDetails, setExpandDetails] = useState(false);
  const { data, setData } = useContext(GlobalContext);
  const cancelTokenSource = useRef(axios.CancelToken.source());
  const isp = useMemo(() => {
    if (data) {
      const unformattedISP = data.asn.organisation;

      if (unformattedISP) {
        let isp = '';
        unformattedISP.split(' ').forEach((word) => {
          isp += `${word[0]}${word.slice(1).toLowerCase()} `;
        });
        return isp.trim();
      } else {
        return null;
      }
    } else {
      return null;
    }
  }, [data]);
  const location = useMemo(() => {
    if (data) {
      const city = data.city.name;
      const region = data.area.name;
      const countryCode = data.country.code;

      if (city && region && countryCode) {
        return `${city}, ${region}, ${countryCode}`;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }, [data]);
  const timeZone = useMemo(() => {
    if (data) {
      let utcOffset = data.time.time?.split(' ').pop()!;
      console.log({ utcOffset });

      if (utcOffset) {
        return `UTC${utcOffset.slice(0, 3)}:${utcOffset.slice(3)}`;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }, [data]);
  // Error exists if data is empty and not loading
  const hasError = !data && !loading;

  useEffect(() => {
    setExpandDetails(false);
  }, [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== '') {
      setLoading(true);
      cancelTokenSource.current.cancel('User re-sent API request.');
      cancelTokenSource.current = axios.CancelToken.source();
      console.log('@ sent');
      axios
        .get(`/api/ip/${input}`, {
          cancelToken: cancelTokenSource.current.token,
        })
        .then((response) => {
          console.log({ response: response.data });
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            console.error({ error });
            setData(null);
            setLoading(false);
            // TODO: Proper error handling
          }
        });
    }
  };

  return (
    <Flex className="image-bg" height="35vh" p={8} flexDirection="column" alignItems="center" position="relative">
      <Heading mb={8} color="white">
        Find My IP Address
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Flex justifyContent="center">
          <Input
            placeholder="Search for an IP address..."
            background="white"
            isRequired
            maxWidth="30rem"
            borderRightRadius={0}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            type="submit"
            colorScheme="blackAlpha"
            borderLeftRadius={0}
            aria-label="Search IP Address"
            icon={<SearchIcon />}
          />
        </Flex>
        {/* <img src={data?.country.flag.file} /> */}
      </form>
      <Flex
        className="search-results"
        position="absolute"
        flexDirection="column"
        alignItems="center"
        bottom="0"
        background="white"
        p={{ base: 4, md: 8 }}
        borderRadius={5}
        gridGap={5}
        transform={{ base: 'translateY(75%)', md: 'translateY(50%)' }}
        zIndex="10001"
        boxShadow="lg"
        width={{ base: 'calc(100% - 4rem)', md: 'auto' }}
        maxWidth={{ base: '32.5rem', md: 'initial' }}
      >
        {hasError && (
          <Flex p="2.25rem 3.125rem" fontWeight="bold" fontSize="1.5rem">
            Unable to find information for your IP address.
          </Flex>
        )}
        {!hasError &&
          (loading ? (
            <Flex p="1.5rem 17.5rem">
              <PuffLoader color="#4a40bf" />
            </Flex>
          ) : (
            <>
              <Flex direction={{ base: 'column', md: 'row' }} gridRowGap="0.25rem">
                <Info title="IP Address" details={data?.ip} />
                <Info title="ISP" details={isp} />
                <Info title="Location" details={location} />
                <Info title="Time Zone" details={timeZone} />
              </Flex>
              {data && (
                <Box position="relative" width="100%" height="2.5rem">
                  <Flex
                    position="absolute"
                    background="white"
                    top="0"
                    left={{ base: '-1rem', md: '-2rem' }}
                    right={{ base: '-1rem', md: '-2rem' }}
                    p={{ base: '0 1rem 1rem', md: '0 2rem 2rem' }}
                    flexDirection="column"
                    boxShadow="lg"
                    borderRadius={5}
                  >
                    <Collapse in={expandDetails}>
                      <Flex flexDirection="column" mb="2rem" gridGap="0.25rem">
                        <ExpandedDetail title="IP Address Type" details={data.type} />
                        <ExpandedDetail title="Latitude" details={data.location.latitude} />
                        <ExpandedDetail title="Longitude" details={data.location.longitude} />
                        <ExpandedDetail title="City" details={data.city.name} />
                        <ExpandedDetail title="Region" details={data.area.name} />
                        <ExpandedDetail
                          title="Country"
                          details={
                            data.country.name ? (
                              <Flex alignItems="center" gridGap="0.25rem">
                                <p>{data.country.name}</p>
                                {data.country.flag.file && (
                                  <Image src={data.country.flag.file} width={30} alt={`Flag of ${data.country.name}`} />
                                )}
                              </Flex>
                            ) : null
                          }
                        />
                        <ExpandedDetail title="Time Zone" details={data.time.timezone} />
                      </Flex>
                    </Collapse>
                    <Button
                      className="button"
                      isFullWidth
                      colorScheme="blue"
                      onClick={() => setExpandDetails((prev) => !prev)}
                    >
                      <Flex alignItems="center" justifyContent="center" fontWeight="bold" flexDirection="column">
                        <p>{expandDetails ? 'Hide' : 'Show'} details</p>
                        {/* <ChevronDownIcon /> */}
                      </Flex>
                    </Button>
                  </Flex>
                </Box>
              )}
            </>
          ))}
      </Flex>
    </Flex>
  );
};

export default IPLookup;
