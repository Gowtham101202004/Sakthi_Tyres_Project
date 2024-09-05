const vehicleData = {
    Car: {
      brands: [
        'Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra', 'Honda', 
        'Toyota', 'Kia', 'Renault', 'Nissan', 'Ford', 'Volkswagen'
      ],
      models: {
        'Maruti Suzuki': ['Omni','Alto', 'Swift', 'Baleno', 'Swift Dzire', 'Vitara Brezza'],
        Hyundai: ['Santro', 'i10', 'i20', 'Creta'],
        'Tata Motors': ['Nano','Tiago', 'Nexon', 'Altroz', 'Harrier', 'Safari'],
        Mahindra: ['Thar', 'KUV100', 'XUV300', 'XUV500', 'Scorpio', 'Bolero'],
        Honda: ['Amaze', 'City', 'WR-V', 'Jazz', 'Civic'],
        Toyota: ['Innova', 'Fortuner', 'Etios', 'Yaris', 'Glanza'],
        Kia: ['Seltos', 'Sonet', 'Carnival'],
        Renault: ['Kwid', 'Duster', 'Triber', 'Kiger'],
        Nissan: ['Terrano', 'Magnite'],
        Ford: ['EcoSport', 'Figo', 'Endeavour', 'Aspire'],
        Volkswagen: ['Polo', 'Vento', 'Tiguan', 'Ameo']
      }
    },
    'Two Wheeler': {
      brands: [
        'Bajaj', 'Hero', 'Honda', 'KTM', 'Mahindra', 'Royal Enfield', 
        'Suzuki', 'TVS', 'Yamaha'
      ],
      models: {
        Bajaj: ['Pulsar', 'Avenger', 'Dominar', 'CT100', 'Platina'],
        Hero: ['Splendor', 'Passion', 'Xtreme', 'Glamour', 'XPulse'],
        Honda: ['Activa', 'Shine', 'Unicorn', 'Hornet', 'CBR'],
        KTM: ['Duke 200', 'Duke 390', 'RC 200', 'RC 390', 'Adventure 390'],
        Mahindra: ['Mojo', 'Gusto', 'Centuro'],
        'Royal Enfield': ['Classic 350', 'Bullet 350', 'Himalayan', 'Interceptor 650', 'Meteor 350'],
        Suzuki: ['Access 125', 'Gixxer', 'Intruder', 'Burgman Street', 'Hayabusa'],
        TVS: ['Apache', 'Ntorq', 'Jupiter', 'Star City', 'Sport'],
        Yamaha: ['FZ', 'R15', 'MT-15', 'Fascino', 'Ray ZR'],
        Kawasaki: ['Ninja 300', 'Z650', 'Vulcan S', 'Versys 650', 'Z900'],
        Ducati: ['Monster', 'Panigale', 'Scrambler', 'Diavel', 'Multistrada'],
        'Harley-Davidson': ['Iron 883', 'Street 750', 'Fat Boy', 'Sportster S', 'Road Glide'],
        BMW: ['G 310 R', 'G 310 GS', 'R nineT', 'S 1000 RR', 'F 850 GS']
      }
    },
    Truck: {
      brands: [
        'Ashok Leyland', 'Tata Motors', 'Mahindra', 'Eicher', 'BharatBenz',
        'MAN', 'AMW', 'Scania', 'Isuzu', 'Force Motors'
      ],
      models: {
        'Ashok Leyland': ['Dost', 'Boss', 'U-Truck', 'Captain', 'Comet'],
        'Tata Motors': ['Signa', 'Prima', 'Ultra', 'LPT', 'Intra'],
        Mahindra: ['Blazo X', 'Furio', 'Bolero Pik-Up', 'Jeeto', 'Cruzio'],
        Eicher: ['Pro 2000', 'Pro 3000', 'Pro 6000', 'Pro 8000', 'Starline'],
        BharatBenz: ['1923C', '1217C', '2823R', '1617R', '5028T'],
        Volvo: ['FH', 'FM', 'FMX', 'VNL', 'VNR'],
        MAN: ['CLA 31.300', 'CLA 25.300', 'TGS 40.400', 'TGS 33.360', 'TGX 41.540'],
        AMW: ['2518 TP', '2523 TP', '3118 TM', '4018 TR', '4923 TP'],
        Scania: ['R500', 'G460', 'P360', 'G310', 'S580'],
        Isuzu: ['D-Max', 'NQR 500', 'FRR 500', 'FVR 900', 'CYZ 51'],
        'Force Motors': ['Traveller', 'Trax', 'Toofan', 'Gurkha', 'Shaktiman']
      }
    },
    SCV: {
      brands: [
        'Tata Motors', 'Mahindra', 'Ashok Leyland', 'Piaggio', 'Force Motors', 
        'Bajaj', 'Isuzu', 'Atul Auto', 'Jeetay', 'Eicher', 'Swaraj Mazda', 
        'TVS', 'Maruti Suzuki', 'Kinetic Green', 'Omega Seiki', 
        'GMW', 'Altigreen', 'Olectra', 'Euler Motors', 'Kia'
      ],
      models: {
        'Tata Motors': ['Ace', 'Super Ace', 'Intra V10', 'Intra V20', 'Magic Express'],
        Mahindra: ['Jeeto', 'Supro', 'Bolero Pik-Up', 'Maxximo', 'Alfa'],
        'Ashok Leyland': ['Dost+', 'Bada Dost', 'Mithra', 'Partner', 'MiTR'],
        Piaggio: ['Porter 700', 'Ape E-Xtra', 'Ape E-City', 'Ape Xtra LDX', 'Ape Xtra'],
        'Force Motors': ['Kargo King', 'Shaktiman 400', 'Shaktiman 200', 'Shaktiman 100'],
        Bajaj: ['Maxima', 'Qute', 'Compact RE', 'Maxima Z', 'Maxima C'],
        Isuzu: ['D-Max', 'S-Cab', 'Regular Cab', 'Crew Cab'],
        'Atul Auto': ['Gemini', 'Shakti', 'Elite', 'Smart'],
        Jeetay: ['Vahaan', 'EcoV', 'EV'],
        Eicher: ['Pro 2049', 'Pro 2095', 'Pro 3015', 'Pro 2110', 'Pro 2055'],
        'Swaraj Mazda': ['Prestige GS', 'Supreme GS', 'Premium GS', 'Carrier', 'ZT54'],
        TVS: ['King Duramax', 'King Kargo', 'King Deluxe'],
        'Maruti Suzuki': ['Super Carry', 'Eeco Cargo', 'Omni Cargo'],
        'Kinetic Green': ['Safar Shakti', 'Kinetic E-Luna', 'Kinetic Zing', 'Safar Jumbo'],
        'Omega Seiki': ['M1KA', 'M1KA+'],
        GMW: ['eShakti', 'BIZLI'],
        Altigreen: ['NEEV'],
        Olectra: ['K6'],
        'Euler Motors': ['HiLoad'],
        Kia: ['K2700', 'K3000']
      }
    },
    LCV: {
      brands: [
        'Tata Motors', 'Mahindra', 'Ashok Leyland', 'Eicher', 'BharatBenz', 
        'Force Motors', 'Swaraj Mazda', 'Isuzu', 'SML Isuzu', 'Volvo', 
        'MAN', 'AMW', 'Kia', 'Scania', 'Piaggio', 
        'Toyota', 'Jeetay', 'Maruti Suzuki', 'Ford'
      ],
      models: {
        'Tata Motors': ['Ultra T.7', 'Ultra T.16', '407 Gold SFC', '1518 LPT', '1212 LPT'],
        Mahindra: ['Furio 7', 'Bolero Maxitruck', 'Furio 12', 'Supro Maxi Truck', 'JAYO'],
        'Ashok Leyland': ['Partner 4T', 'Partner 6T', 'BOSS 1212', 'BOSS 1115', 'Ecomet 1215'],
        Eicher: ['Pro 2075', 'Pro 2110', 'Pro 3019', 'Pro 2059XP', 'Pro 3015'],
        BharatBenz: ['1015R', '1215R', '1415RE', '1415R', '1617R'],
        'Force Motors': ['Traveller 3050', 'Traveller 4020', 'Traveller 3050 Super'], // Merged values here
        'Swaraj Mazda': ['Supreme GS', 'Premium GS', 'Prestige GS', 'Carrier'],
        Isuzu: ['NQR 500', 'NKR 55', 'NKR 77', 'FVR 900', 'FTR 850'],
        'SML Isuzu': ['Prestige GS', 'Supreme GS', 'Sartaj GS', 'Samrat HD', 'Samrat GS'],
        Volvo: ['FL 11', 'FMX 370', 'FM 440', 'FM 380'],
        MAN: ['CLA 31.300', 'TGS 40.400', 'TGM 18.240', 'TGL 12.250'],
        AMW: ['2523', '3118', '4018', '4923'],
        Kia: ['K2700', 'K3000'],
        Scania: ['P360', 'G310', 'R500'],
        Piaggio: ['Porter 700'],
        Toyota: ['Hilux'],
        Jeetay: ['Vahaan', 'EcoV'],
        'Maruti Suzuki': ['Super Carry'],
        Ford: ['Ranger']
      }
    },
    'Pick Up': {
      brands: [
        'Tata Motors', 'Mahindra', 'Isuzu', 'Ashok Leyland', 'Force Motors', 
        'Ford', 'Toyota', 'Nissan', 'Kia', 'Mitsubishi', 'Jeep', 'Volkswagen', 
        'Chevrolet', 'Maruti Suzuki', 'SsangYong', 'Great Wall', 'Haval', 
        'Mazda', 'Hyundai', 'RAM'
      ],
      models: {
        'Tata Motors': ['Xenon', 'Yodha', 'Intra V10', 'Intra V20', '207'],
        Mahindra: ['Bolero Pik-Up', 'Imperio', 'Scorpio Getaway', 'Genio'],
        Isuzu: ['D-Max', 'V-Cross', 'Hi-Lander'],
        'Ashok Leyland': ['Partner'],
        'Force Motors': ['Kargo King', 'Trax Toofan'],
        Ford: ['Ranger', 'F-150', 'Raptor'],
        Toyota: ['Hilux', 'Tacoma', 'Tundra'],
        Nissan: ['Navara', 'Titan', 'Frontier'],
        Kia: ['K2700', 'K3000'],
        Mitsubishi: ['L200', 'Triton'],
        Jeep: ['Gladiator'],
        Volkswagen: ['Amarok'],
        Chevrolet: ['Colorado', 'Silverado'],
        'Maruti Suzuki': ['Super Carry'],
        SsangYong: ['Musso'],
        'Great Wall': ['Steed'],
        Haval: ['H9'],
        Mazda: ['BT-50'],
        Hyundai: ['Santa Cruz'],
        RAM: ['1500', '2500', '3500']
      }
    },
    MCV: {
      brands: [
        'Tata Motors', 'Ashok Leyland', 'Mahindra', 'Eicher', 'BharatBenz', 
        'Volvo', 'MAN', 'AMW', 'Isuzu', 'Force Motors', 'Piaggio', 
        'Swaraj Mazda', 'SML Isuzu', 'Scania', 'Hino', 
        'Daimler', 'Hino', 'Jeetay', 'Avia Trucks', 'Kia'
      ],
      models: {
        'Tata Motors': ['LPT 1518', 'LPT 1412', 'LPT 1109', 'Ultra 1014', 'LPT 709'],
        'Ashok Leyland': ['Boss 1115', 'Boss 1212', 'Boss 1315', 'Ecomet 1012', 'Ecomet 1214'],
        Mahindra: ['Furio 11', 'Furio 12', 'Blazo X 28', 'Blazo X 35', 'Furio 7'],
        Eicher: ['Pro 3015', 'Pro 3016', 'Pro 3019', 'Pro 2110', 'Pro 2059XP'],
        BharatBenz: ['1215R', '1415R', '1617R', '1923C', '1923R'],
        Volvo: ['FM 380', 'FMX 370', 'FL 11', 'FM 440'],
        MAN: ['CLA 25.300', 'TGS 33.360', 'TGM 18.240', 'TGL 12.250'],
        AMW: ['3118', '4018', '4923'],
        Isuzu: ['FVR 900', 'FTR 850', 'NKR 77'],
        'Force Motors': ['Traveller 4020'],
        Piaggio: ['Porter 700'],
        'Swaraj Mazda': ['Premium GS'],
        'SML Isuzu': ['Supreme GS'],
        Scania: ['G310'],
        Hino: ['500 Series'],
        Daimler: ['Actros', 'Arocs', 'Antos'],
        Jeetay: ['EcoV'],
        'Avia Trucks': ['D90', 'D120'],
        Kia: ['K2700']
      }
    },
    ICV: {
      brands: [
        'Tata Motors', 'Ashok Leyland', 'Mahindra', 'Eicher', 'BharatBenz', 
        'Volvo', 'MAN', 'AMW', 'Isuzu', 'Force Motors', 
        'Swaraj Mazda', 'SML Isuzu', 'Scania', 'Hino', 'Daimler', 
        'Piaggio', 'Jeetay', 'Kia', 'Maruti Suzuki', 'Ford'
      ],
      models: {
        'Tata Motors': ['LPT 709', 'LPT 1109', 'LPT 1212', 'Ultra 1014', 'Ultra 1415'],
        'Ashok Leyland': ['Ecomet 1214', 'Ecomet 1012', 'Boss 1315', 'Boss 1115', 'Ecomet 1615'],
        Mahindra: ['Furio 11', 'Furio 12', 'Blazo X 28', 'Furio 7', 'Blazo X 35'],
        Eicher: ['Pro 2059XP', 'Pro 3015', 'Pro 3016', 'Pro 2110', 'Pro 3019'],
        BharatBenz: ['1415R', '1617R', '1215R', '1923R', '1923C'],
        Volvo: ['FMX 370', 'FM 380', 'FM 440'],
        MAN: ['TGS 33.360', 'CLA 25.300', 'TGM 18.240', 'TGL 12.250'],
        AMW: ['4018', '3118', '4923'],
        Isuzu: ['FVR 900', 'FTR 850', 'NKR 77'],
        'Force Motors': ['Traveller 4020'],
        'Swaraj Mazda': ['Supreme GS'],
        'SML Isuzu': ['Supreme GS'],
        Scania: ['G310'],
        Hino: ['500 Series'],
        Daimler: ['Actros', 'Arocs', 'Antos'],
        Piaggio: ['Porter 700'],
        Jeetay: ['EcoV'],
        Kia: ['K2700'],
        'Maruti Suzuki': ['Super Carry'],
        Ford: ['Ranger']
      }
    }
};

export default vehicleData;