// extracted Nov. 2016

const countries = [
    {
        'number': 2197201,
        'country': 'US'
    },
    {
        'number': 1330618,
        'country': 'UK'
    },
    {
        'number': 880268,
        'country': 'Germany'
    },
    {
        'number': 436329,
        'country': 'France'
    },
    {
        'number': 353624,
        'country': 'Italy'
    },
    {
        'number': 309903,
        'country': 'Netherlands'
    },
    {
        'number': 290471,
        'country': 'Japan'
    },
    {
        'number': 288976,
        'country': 'Europe'
    },
    {
        'number': 274213,
        'country': 'Canada'
    },
    {
        'number': 238302,
        'country': 'Spain'
    },
    {
        'number': 195909,
        'country': 'Unknown'
    },
    {
        'number': 177815,
        'country': 'Russia'
    },
    {
        'number': 161733,
        'country': 'Australia'
    },
    {
        'number': 131960,
        'country': 'Sweden'
    },
    {
        'number': 117802,
        'country': 'Belgium'
    },
    {
        'number': 97515,
        'country': 'Jamaica'
    },
    {
        'number': 90251,
        'country': 'Greece'
    },
    {
        'number': 87064,
        'country': 'Poland'
    },
    {
        'number': 84463,
        'country': 'Brazil'
    },
    {
        'number': 74615,
        'country': 'Finland'
    },
    {
        'number': 55864,
        'country': 'UK & Europe'
    },
    {
        'number': 54464,
        'country': 'Denmark'
    },
    {
        'number': 53265,
        'country': 'USSR'
    },
    {
        'number': 52196,
        'country': 'Portugal'
    },
    {
        'number': 52032,
        'country': 'Norway'
    },
    {
        'number': 51250,
        'country': 'Switzerland'
    },
    {
        'number': 47224,
        'country': 'Austria'
    },
    {
        'number': 43520,
        'country': 'Yugoslavia'
    },
    {
        'number': 36033,
        'country': 'Mexico'
    },
    {
        'number': 35809,
        'country': 'New Zealand'
    },
    {
        'number': 33817,
        'country': 'Argentina'
    },
    {
        'number': 28507,
        'country': 'Hungary'
    },
    {
        'number': 25769,
        'country': 'Ukraine'
    },
    {
        'number': 25141,
        'country': 'Czech Republic'
    },
    {
        'number': 24866,
        'country': 'Czechoslovakia'
    },
    {
        'number': 22341,
        'country': 'USA & Canada'
    },
    {
        'number': 21450,
        'country': 'Turkey'
    },
    {
        'number': 20656,
        'country': 'Romania'
    },
    {
        'number': 20011,
        'country': 'South Africa'
    },
    {
        'number': 18838,
        'country': 'Ireland'
    },
    {
        'number': 17153,
        'country': 'Venezuela'
    },
    {
        'number': 16891,
        'country': 'Scandinavia'
    },
    {
        'number': 15392,
        'country': 'Colombia'
    },
    {
        'number': 13822,
        'country': 'Israel'
    },
    {
        'number': 12552,
        'country': 'Croatia'
    },
    {
        'number': 12217,
        'country': 'Bulgaria'
    },
    {
        'number': 11948,
        'country': 'Indonesia'
    },
    {
        'number': 11735,
        'country': 'Chile'
    },
    {
        'number': 11453,
        'country': 'India'
    },
    {
        'number': 11184,
        'country': 'Peru'
    },
    {
        'number': 11038,
        'country': 'German Democratic Republic (GDR)'
    },
    {
        'number': 10111,
        'country': 'South Korea'
    },
    {
        'number': 10083,
        'country': 'Taiwan'
    },
    {
        'number': 9773,
        'country': 'Lithuania'
    },
    {
        'number': 8830,
        'country': 'UK Europe & US'
    },
    {
        'number': 8537,
        'country': 'Malaysia'
    },
    {
        'number': 8271,
        'country': 'Serbia'
    },
    {
        'number': 7632,
        'country': 'Germany Austria & Switzerland'
    },
    {
        'number': 6966,
        'country': 'Thailand'
    },
    {
        'number': 6328,
        'country': 'Slovakia'
    },
    {
        'number': 6135,
        'country': 'Hong Kong'
    },
    {
        'number': 6074,
        'country': 'Philippines'
    },
    {
        'number': 5968,
        'country': 'Australasia'
    },
    {
        'number': 5881,
        'country': 'Australia & New Zealand'
    },
    {
        'number': 5826,
        'country': 'Benelux'
    },
    {
        'number': 5566,
        'country': 'UK & Ireland'
    },
    {
        'number': 5458,
        'country': 'Singapore'
    },
    {
        'number': 5235,
        'country': 'Iceland'
    },
    {
        'number': 4939,
        'country': 'China'
    },
    {
        'number': 4659,
        'country': 'Egypt'
    },
    {
        'number': 4620,
        'country': 'Uruguay'
    },
    {
        'number': 4616,
        'country': 'Estonia'
    },
    {
        'number': 4481,
        'country': 'Nigeria'
    },
    {
        'number': 4256,
        'country': 'Slovenia'
    },
    {
        'number': 3865,
        'country': 'UK & US'
    },
    {
        'number': 3688,
        'country': 'Lebanon'
    },
    {
        'number': 3470,
        'country': 'Ecuador'
    },
    {
        'number': 2893,
        'country': 'Cuba'
    },
    {
        'number': 2770,
        'country': 'Belarus'
    },
    {
        'number': 2595,
        'country': 'Luxembourg'
    },
    {
        'number': 2493,
        'country': 'USA Canada & UK'
    },
    {
        'number': 2403,
        'country': 'USA Canada & Europe'
    },
    {
        'number': 2303,
        'country': 'Macedonia'
    },
    {
        'number': 2285,
        'country': 'Latvia'
    },
    {
        'number': 1966,
        'country': 'Bosnia & Herzegovina'
    },
    {
        'number': 1909,
        'country': 'Puerto Rico'
    },
    {
        'number': 1676,
        'country': 'Barbados'
    },
    {
        'number': 1620,
        'country': 'Trinidad & Tobago'
    },
    {
        'number': 1556,
        'country': 'France & Benelux'
    },
    {
        'number': 1496,
        'country': 'North America (inc Mexico)'
    },
    {
        'number': 1480,
        'country': 'Kenya'
    },
    {
        'number': 1415,
        'country': 'Ghana'
    },
    {
        'number': 1412,
        'country': 'Serbia and Montenegro'
    },
    {
        'number': 1362,
        'country': 'Bolivia'
    },
    {
        'number': 1306,
        'country': 'Panama'
    },
    {
        'number': 1278,
        'country': 'Georgia'
    },
    {
        'number': 1226,
        'country': 'Asia'
    },
    {
        'number': 1206,
        'country': 'Saudi Arabia'
    },
    {
        'number': 1186,
        'country': 'Reunion'
    },
    {
        'number': 1133,
        'country': 'Iran'
    },
    {
        'number': 1091,
        'country': 'Singapore Malaysia & Hong Kong'
    },
    {
        'number': 1084,
        'country': 'Ivory Coast'
    },
    {
        'number': 949,
        'country': 'Angola'
    },
    {
        'number': 945,
        'country': 'Zimbabwe'
    },
    {
        'number': 944,
        'country': 'Pakistan'
    },
    {
        'number': 933,
        'country': 'Germany & Switzerland'
    },
    {
        'number': 932,
        'country': 'Costa Rica'
    },
    {
        'number': 888,
        'country': 'Madagascar'
    },
    {
        'number': 823,
        'country': 'Czech Republic & Slovakia'
    },
    {
        'number': 807,
        'country': 'Guatemala'
    },
    {
        'number': 717,
        'country': 'Tunisia'
    },
    {
        'number': 705,
        'country': 'Morocco'
    },
    {
        'number': 694,
        'country': 'Zaire'
    },
    {
        'number': 651,
        'country': 'Malta'
    },
    {
        'number': 651,
        'country': 'USA & Europe'
    },
    {
        'number': 622,
        'country': 'Middle East'
    },
    {
        'number': 608,
        'country': 'Cyprus'
    },
    {
        'number': 602,
        'country': 'United Arab Emirates'
    },
    {
        'number': 591,
        'country': 'Dominican Republic'
    },
    {
        'number': 563,
        'country': 'Mauritius'
    },
    {
        'number': 559,
        'country': 'Algeria'
    },
    {
        'number': 545,
        'country': 'UK & France'
    },
    {
        'number': 457,
        'country': 'Paraguay'
    },
    {
        'number': 454,
        'country': 'Ethiopia'
    },
    {
        'number': 430,
        'country': 'El Salvador'
    },
    {
        'number': 427,
        'country': 'Haiti'
    },
    {
        'number': 425,
        'country': 'Bahamas The'
    },
    {
        'number': 425,
        'country': 'Guadeloupe'
    },
    {
        'number': 400,
        'country': 'Suriname'
    },
    {
        'number': 397,
        'country': 'Congo Democratic Republic of the'
    },
    {
        'number': 386,
        'country': 'Liechtenstein'
    },
    {
        'number': 384,
        'country': 'UK Europe & Japan'
    },
    {
        'number': 376,
        'country': 'Netherlands Antilles'
    },
    {
        'number': 333,
        'country': 'Benin'
    },
    {
        'number': 332,
        'country': 'South America'
    },
    {
        'number': 283,
        'country': 'Faroe Islands'
    },
    {
        'number': 282,
        'country': 'Senegal'
    },
    {
        'number': 273,
        'country': 'Moldova Republic of'
    },
    {
        'number': 271,
        'country': 'Sudan'
    },
    {
        'number': 270,
        'country': 'South East Asia'
    },
    {
        'number': 256,
        'country': 'Martinique'
    },
    {
        'number': 256,
        'country': 'Mozambique'
    },
    {
        'number': 253,
        'country': 'Albania'
    },
    {
        'number': 252,
        'country': 'Dahomey'
    },
    {
        'number': 239,
        'country': 'Cameroon'
    },
    {
        'number': 235,
        'country': 'Zambia'
    },
    {
        'number': 220,
        'country': 'Kosovo'
    },
    {
        'number': 210,
        'country': 'Vietnam'
    },
    {
        'number': 208,
        'country': 'Andorra'
    },
    {
        'number': 204,
        'country': 'Syria'
    },
    {
        'number': 186,
        'country': 'Kazakhstan'
    },
    {
        'number': 185,
        'country': 'Mongolia'
    },
    {
        'number': 175,
        'country': 'Libya'
    },
    {
        'number': 169,
        'country': 'Guinea'
    },
    {
        'number': 166,
        'country': 'Nicaragua'
    },
    {
        'number': 157,
        'country': 'Central America'
    },
    {
        'number': 143,
        'country': 'Rhodesia'
    },
    {
        'number': 143,
        'country': 'Virgin Islands'
    },
    {
        'number': 138,
        'country': 'Africa'
    },
    {
        'number': 138,
        'country': 'Greenland'
    },
    {
        'number': 137,
        'country': 'Bermuda'
    },
    {
        'number': 131,
        'country': 'Armenia'
    },
    {
        'number': 121,
        'country': 'Congo Republic of the'
    },
    {
        'number': 119,
        'country': 'North Korea'
    },
    {
        'number': 118,
        'country': 'Mali'
    },
    {
        'number': 117,
        'country': 'Sri Lanka'
    },
    {
        'number': 113,
        'country': 'Azerbaijan'
    },
    {
        'number': 113,
        'country': 'Guyana'
    },
    {
        'number': 112,
        'country': 'West Bank'
    },
    {
        'number': 112,
        'country': 'Yemen'
    },
    {
        'number': 111,
        'country': 'Cape Verde'
    },
    {
        'number': 105,
        'country': 'French Polynesia'
    },
    {
        'number': 105,
        'country': 'Jordan'
    },
    {
        'number': 102,
        'country': 'South Vietnam'
    },
    {
        'number': 101,
        'country': 'East Timor'
    },
    {
        'number': 100,
        'country': 'Nepal'
    },
    {
        'number': 97,
        'country': 'Montenegro'
    },
    {
        'number': 93,
        'country': 'Curaçao'
    },
    {
        'number': 91,
        'country': 'Seychelles'
    },
    {
        'number': 84,
        'country': 'Southern Rhodesia'
    },
    {
        'number': 83,
        'country': 'Kuwait'
    },
    {
        'number': 72,
        'country': 'Upper Volta'
    },
    {
        'number': 69,
        'country': 'Dominica'
    },
    {
        'number': 69,
        'country': 'Togo'
    },
    {
        'number': 67,
        'country': 'Tanzania'
    },
    {
        'number': 62,
        'country': 'Iraq'
    },
    {
        'number': 61,
        'country': 'Monaco'
    },
    {
        'number': 60,
        'country': 'Honduras'
    },
    {
        'number': 58,
        'country': 'Bangladesh'
    },
    {
        'number': 57,
        'country': 'Cambodia'
    },
    {
        'number': 54,
        'country': 'Cayman Islands'
    },
    {
        'number': 53,
        'country': 'Burma'
    },
    {
        'number': 53,
        'country': 'Kyrgyzstan'
    },
    {
        'number': 53,
        'country': 'Moldova'
    },
    {
        'number': 50,
        'country': 'New Caledonia'
    },
    {
        'number': 44,
        'country': 'French Guiana'
    },
    {
        'number': 41,
        'country': 'Belize'
    },
    {
        'number': 40,
        'country': 'Gabon'
    },
    {
        'number': 40,
        'country': 'Uzbekistan'
    },
    {
        'number': 39,
        'country': 'Uganda'
    },
    {
        'number': 38,
        'country': 'Antigua & Barbuda'
    },
    {
        'number': 38,
        'country': 'Aruba'
    },
    {
        'number': 37,
        'country': 'Austria-Hungary'
    },
    {
        'number': 36,
        'country': 'Bahrain'
    },
    {
        'number': 36,
        'country': 'Man Isle of'
    },
    {
        'number': 36,
        'country': 'UK Europe & Israel'
    },
    {
        'number': 28,
        'country': 'Burkina Faso'
    },
    {
        'number': 27,
        'country': 'Eritrea'
    },
    {
        'number': 27,
        'country': 'Gulf Cooperation Council'
    },
    {
        'number': 26,
        'country': 'Antigua & Barbuda'
    },
    {
        'number': 26,
        'country': 'Protectorate of Bohemia and Moravia'
    },
    {
        'number': 25,
        'country': 'Namibia'
    },
    {
        'number': 22,
        'country': 'Palau'
    },
    {
        'number': 22,
        'country': 'Saint Kitts and Nevis'
    },
    {
        'number': 22,
        'country': 'Sierra Leone'
    },
    {
        'number': 21,
        'country': 'Brunei'
    },
    {
        'number': 20,
        'country': 'Bhutan'
    },
    {
        'number': 19,
        'country': 'Laos'
    },
    {
        'number': 18,
        'country': 'Guam'
    },
    {
        'number': 18,
        'country': 'Macau'
    },
    {
        'number': 18,
        'country': 'San Marino'
    },
    {
        'number': 17,
        'country': 'Afghanistan'
    },
    {
        'number': 17,
        'country': 'Grenada'
    },
    {
        'number': 17,
        'country': 'Jersey'
    },
    {
        'number': 17,
        'country': 'Lesotho'
    },
    {
        'number': 16,
        'country': 'Botswana'
    },
    {
        'number': 15,
        'country': 'Guinea-Bissau'
    },
    {
        'number': 15,
        'country': 'Maldives'
    },
    {
        'number': 13,
        'country': 'Fiji'
    },
    {
        'number': 13,
        'country': 'Korea (pre-1945)'
    },
    {
        'number': 13,
        'country': 'Papua New Guinea'
    },
    {
        'number': 13,
        'country': 'Qatar'
    },
    {
        'number': 12,
        'country': 'Abkhazia'
    },
    {
        'number': 12,
        'country': 'Central African Republic'
    },
    {
        'number': 12,
        'country': 'Saint Lucia'
    },
    {
        'number': 12,
        'country': 'Somalia'
    },
    {
        'number': 11,
        'country': 'Niger'
    },
    {
        'number': 11,
        'country': 'Ottoman Empire'
    },
    {
        'number': 10,
        'country': 'Guernsey'
    },
    {
        'number': 10,
        'country': 'Liberia'
    },
    {
        'number': 9,
        'country': 'Tajikistan'
    },
    {
        'number': 7,
        'country': 'Bohemia'
    },
    {
        'number': 7,
        'country': 'Malawi'
    },
    {
        'number': 7,
        'country': 'Saint Vincent and the Grenadines'
    },
    {
        'number': 7,
        'country': 'Sint Maarten'
    },
    {
        'number': 6,
        'country': 'Cook Islands'
    },
    {
        'number': 6,
        'country': 'Rwanda'
    },
    {
        'number': 6,
        'country': 'South Pacific'
    },
    {
        'number': 5,
        'country': 'Comoros'
    },
    {
        'number': 5,
        'country': 'Gambia The'
    },
    {
        'number': 5,
        'country': 'Gibraltar'
    },
    {
        'number': 5,
        'country': 'Vanuatu'
    },
    {
        'number': 4,
        'country': 'Anguilla'
    },
    {
        'number': 4,
        'country': 'Oman'
    },
    {
        'number': 4,
        'country': 'Turkmenistan'
    },
    {
        'number': 4,
        'country': 'Vatican City'
    },
    {
        'number': 3,
        'country': 'Sao Tome and Principe'
    },
    {
        'number': 3,
        'country': 'Turks and Caicos Islands'
    },
    {
        'number': 2,
        'country': 'British Virgin Islands'
    },
    {
        'number': 2,
        'country': 'Djibouti'
    },
    {
        'number': 2,
        'country': 'Falkland Islands'
    },
    {
        'number': 2,
        'country': 'Gaza Strip'
    },
    {
        'number': 2,
        'country': 'Mauritania'
    },
    {
        'number': 2,
        'country': 'Montserrat'
    },
    {
        'number': 2,
        'country': 'Solomon Islands'
    },
    {
        'number': 2,
        'country': 'Swaziland'
    },
    {
        'number': 1,
        'country': 'Marshall Islands'
    },
    {
        'number': 1,
        'country': 'Southern Sudan'
    }
];

export default countries;
