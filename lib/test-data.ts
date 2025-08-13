export const testCategories = [
  {
    _id: "1",
    key: "mask",
    name: "마스크",
    icon: "shield",
    description: "호흡기 보호를 위한 다양한 마스크 시험",
    subcategories: [
      {
        type: "방진마스크",
        tests: ["안면부 흡기저항", "여과효율", "누설률"]
      },
      {
        type: "방독마스크",
        tests: ["파과시험", "정화통 호흡저항", "안면부 누설률"]
      },
      {
        type: "송기마스크",
        tests: ["공급유량 시험", "내압 및 기밀시험", "안면부 성능시험"]
      }
    ],
    order: 1,
    isActive: true
  },
  {
    _id: "2",
    key: "safety-shoes",
    name: "안전화",
    icon: "footprints",
    description: "작업자의 발을 보호하는 안전화 시험",
    subcategories: [
      {
        type: "가죽제 안전화 (6종)",
        tests: ["내충격성", "내압박성", "내답발성", "박리저항", "내유성", "내마모성"]
      },
      {
        type: "고무제 안전화 (5종)",
        tests: ["내충격성", "내압박성", "내답발성", "박리저항", "내유성"]
      },
      {
        type: "정전기 안전화 (가죽제/고무제)",
        tests: ["정전기 저항", "내충격성", "내압박성"]
      },
      {
        type: "발등 안전화",
        tests: ["발등 충격성", "내충격성", "내압박성"]
      },
      {
        type: "절연화 (가죽제/고무제)",
        tests: ["내전압성", "누설전류", "내충격성"]
      },
      {
        type: "절연장화",
        tests: ["내전압성", "누설전류", "내충격성"]
      }
    ],
    order: 2,
    isActive: true
  },
  {
    _id: "3",
    key: "protective-clothing",
    name: "보호복",
    icon: "shirt",
    description: "유해물질으로부터 신체를 보호하는 보호복 시험",
    subcategories: [
      {
        type: "방열복",
        tests: ["열전도 저항", "복사열 저항", "난연성"]
      },
      {
        type: "화학물질용 보호복",
        tests: ["투과 저항", "내구성", "솔기 강도"]
      }
    ],
    order: 3,
    isActive: true
  },
  {
    _id: "4",
    key: "fall-protection",
    name: "추락방지대",
    icon: "alerttriangle",
    description: "고소 작업자의 안전을 위한 추락방지대 시험",
    subcategories: [
      {
        type: "추락방지대",
        tests: ["동적 성능", "정적 강도", "내식성"]
      }
    ],
    order: 4,
    isActive: true
  },
  {
    _id: "5",
    key: "safety-helmet",
    name: "안전모",
    icon: "hardhat",
    description: "머리 보호를 위한 안전모 시험",
    subcategories: [
      {
        type: "AB형, AE형, ABE형",
        tests: ["내충격성", "내관통성", "내전압성", "난연성"]
      }
    ],
    order: 5,
    isActive: true
  },
  {
    _id: "6",
    key: "safety-gloves",
    name: "안전장갑",
    icon: "hand",
    description: "전기로부터 손을 보호하는 내전압용 장갑 시험",
    subcategories: [
      {
        type: "내전압용",
        tests: ["내전압성", "인장강도", "신장률"]
      }
    ],
    order: 6,
    isActive: true
  },
  {
    _id: "7",
    key: "safety-belt",
    name: "안전대",
    icon: "wrench",
    description: "고소 작업자의 추락 방지를 위한 안전대 시험",
    subcategories: [
      {
        type: "벨트식 (U자 걸이용/1개 걸이용)",
        tests: ["동적 성능", "정적 강도", "부식 저항"]
      },
      {
        type: "그네식 (U자 걸이용/1개 걸이용)",
        tests: ["동적 성능", "정적 강도", "부식 저항"]
      },
      {
        type: "안전블럭",
        tests: ["제동 성능", "충격 하중", "내구성"]
      }
    ],
    order: 7,
    isActive: true
  }
];
