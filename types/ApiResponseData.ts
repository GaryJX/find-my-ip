export type ApiResponseData = {
  ip: string;
  type: string;
  location: {
    latitude: number;
    longitude: number;
  };
  area: {
    name: string;
  };
  asn: {
    organisation: string;
  };
  city: {
    name: string;
  };
  country: {
    code: string;
    name: string;
    flag: {
      file: string;
    };
  };
  time: {
    timezone: string;
    time: string;
  };
};
