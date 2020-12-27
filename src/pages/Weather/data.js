const CAN = {
  BC:[
/*     { name: 'Vancouver', id: 6173331 },
    { name: 'Victoria', id: 6174041 },
    { name: 'kelowna', id: 5990579 },
    { name: 'kamloops', id: 5989045 },
    { name: 'williams lake', id: 6182212 },
    { name: 'Prince Rupert', id: 6113406 },
    { name: 'Courtenay', id: 5930890 },
    { name: 'Port Hardy', id: 6111862 },
    { name: 'Prince George', id: 6113365 },
    { name: 'Bella Bella', id: 5897730 },
    { name: 'Clearwater', id: 5923667 },
    { name: 'Smithers', id: 6149996 }, */
    { name: 'Terrace', id: 6162949 }],
  AB:[
    { name: 'Jasper', id: 5985918 },
    { name: 'Edmonton', id: 5946768 },
    { name: 'Red Deer', id: 6118158 },
    { name: 'Calgary', id: 5913490 },
    { name: 'Medicine Hat', id: 6071618 },
    { name: 'Fort McMurray', id: 5955895 },
    { name: 'Grande Prairie', id: 5964347 }],
  SK: [
    { name: 'Saskatoon', id: 6141256 },
    { name: 'Regina', id: 6119109 },
    { name: 'Prince Albert', id: 6113335 }],
  MB: [
    { name: 'Winnipeg', id: 6183235 },
    { name: 'Brandon', id: 5907896 }],
  ON: [
    // { name: 'Kitchener', id: 5992996 },
    // { name: 'London', id: 6058560 },
    // { name: 'Hamilton', id: 5969782 },
    // { name: 'Sault Ste. Marie', id: 6141439 },
    // { name: 'Barrie', id: 5894171 },
    { name: 'Moosonee', id: 6078372 },
    { name: 'Toronto', id: 6167865 },
    { name: 'Ottawa', id: 6094817 },
    { name: 'Kenora', id: 5991055 },
    { name: 'Sudbury', id: 5964700 },
    { name: 'Thunder Bay', id: 6166142 }],
  QC: [
    // { name: 'Quebec City', id:  },
    // { name: 'Sherbrooke', id: 7284311 }
    { name: 'Montreal', id: 6077243 },
    { name: 'Saguenay', id: 6137270 },
    { name: "Val-d'Or", id: 6173017 },  ],
  NB: [
    // { name: 'Moncton', id: 6076211 }
    { name: 'Saint John', id: 6138517 },
    { name: 'Fredericton', id: 5957776 }],
  NS: [
    { name: 'Halifax', id: 6324729 },
    { name: 'Sydney', id: 6354908 },
    { name: 'Truro', id: 6169587 }],
  PEI: [
    // { name: 'Summerside', id: 6159244 }
    { name: 'Charlottetown', id: 5920288 }],
  NL: [
    // { name: 'Grand Falls-Windsor', id: 5964378 },
    { name: "St. John's", id: 6324733 },
    { name: 'Gander', id: 5959335 },
    { name: 'Corner Brook', id: 5927969 }], 
}

const regions = {
  westCoast: {
    cities: [...CAN.BC],
    zoom: 20,
    coords: {
      longitude: -123,
      latitude: 51.5
    }
  },
  prairies: {
    cities: [...CAN.AB,...CAN.SK,...CAN.MB],
    zoom: 15,
    coords: {
      longitude: -108.9,
      latitude: 53
    }
  },
  central: {
    cities: [...CAN.QC,...CAN.ON],
    zoom: 15,
    coords: {
      longitude: -82,
      latitude: 46.8
    }
  },
  atlantic: {
    cities: [...CAN.NB,...CAN.NS,...CAN.PEI,...CAN.NL],
    zoom: 20,
    coords: {
      longitude:  -60,
      latitude: 47.2,
    }
  }
}

const iconMap = {
  200: 'thunder.svg',
  201: 'thunder.svg',
  202: 'thunder.svg',
  210: 'thunder.svg',
  211: 'thunder.svg',
  221: 'thunder.svg',
  230: 'thunder.svg',
  231: 'thunder.svg',
  232: 'thunder.svg',

  300: 'rainy-1.svg',
  301: 'rainy-1.svg',
  302: 'rainy-1.svg',
  310: 'rainy-2.svg',
  311: 'rainy-2.svg',
  312: 'rainy-2.svg',
  313: 'rainy-3.svg',
  314: 'rainy-3.svg',
  321: 'rainy-3.svg',

  500: 'rainy-4.svg',
  501: 'rainy-4.svg',
  502: 'rainy-4.svg',
  503: 'rainy-5.svg',
  504: 'rainy-5.svg',
  520: 'rainy-6.svg',
  521: 'rainy-6.svg',
  522: 'rainy-6.svg',
  531: 'rainy-6.svg',
  511: 'rainy-7.svg',

  600: 'snowy-1.svg',
  601: 'snowy-1.svg',
  602: 'snowy-6.svg',
  611: 'snowy-1.svg',
  612: 'snowy-1.svg',
  613: 'snowy-1.svg',
  615: 'snowy-1.svg',
  616: 'snowy-1.svg',
  620: 'snowy-1.svg',
  621: 'snowy-1.svg',
  622: 'snowy-1.svg',

  701: 'cloudy.svg',
  711: 'cloudy.svg',
  721: 'cloudy.svg',
  731: 'cloudy.svg',
  741: 'cloudy.svg',
  751: 'cloudy.svg',
  761: 'cloudy.svg',
  762: 'cloudy.svg',
  771: 'cloudy.svg',
  781: 'cloudy.svg',

  800: 'cloudy.svg',
  801: 'cloudy.svg',
  802: 'cloudy.svg',
  803: 'cloudy.svg',
  804: 'cloudy.svg',
}

export { CAN, regions, iconMap }