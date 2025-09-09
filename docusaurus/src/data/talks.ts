import dayjs, { Dayjs } from "dayjs"
import { Locale } from "./locale"

export type TalkLang = "en" | "ja"

export interface TalkBaseInfo {
  date: Dayjs
  lang: TalkLang
}

export interface TalkInfo {
  title: string
  conference: string
  venue: string
  url?: string
}

export type TalkObject = { base: TalkBaseInfo } & { [K in Locale]?: TalkInfo }

export const talks: TalkObject[] = [
  // {
  //   base: {
  //     date: dayjs("2014-12-13"),
  //     lang: "ja"
  //   },
  //   ja: {
  //     title: "Thompson群とループ空間のコホモロジー",
  //     conference: "無限離散群と量子トポロジー",
  //     venue: "文部科学省共済組合箱根宿泊所"
  //   }
  // },
  {
    base: {
      date: dayjs("2015-11-23"),
      lang: "ja"
    },
    ja: {
      title: "有理Gorenstein空間上のストリングトポロジーについて",
      conference: "ホモトピー論シンポジウム",
      url: "http://www.math.u-ryukyu.ac.jp/~tsukuda/homotopy2015/",
      venue: "姫路・西はりま地場産業センター(じばさんびる)"
    }
  },
  {
    base: {
      date: dayjs("2015-12-12"),
      lang: "ja"
    },
    ja: {
      title: "有理Gorenstein空間上のストリングトポロジーについて",
      conference: "リーマン面の幾何の展開",
      venue: "KKR伊豆長岡 千歳荘"
    }
  },
  {
    base: {
      date: dayjs("2016-09-06"),
      lang: "ja"
    },
    ja: {
      title: "Description and triviality of the loop products and coproducts for rational Gorenstein spaces",
      conference: "リーマン面に関連する位相幾何学",
      url: "https://sites.google.com/view/ytadokoro/Topological_Studies_around_Riemann_Surfaces/2016",
      // url: "https://www.ms.u-tokyo.ac.jp/~tado/riemann_surface16.html", // broken link
      venue: "東京大学"
    }
  },
  {
    base: {
      date: dayjs("2016-09-15"),
      lang: "ja"
    },
    ja: {
      title: "String topology on rational Gorenstein spaces",
      conference: "日本数学会 2016年度秋季総合分科会",
      url: "http://www.mathsoc.jp/activity/meeting/kansai16sept/",
      venue: "関西大学"
    },
    en: {
      title: "String topology on rational Gorenstein spaces",
      conference: "MSJ Autumn Meeting 2016",
      url: "http://www.mathsoc.jp/en/meeting/kansai16sept/",
      venue: "Kansai University"
    }
  },
  {
    base: {
      date: dayjs("2016-10-30"),
      lang: "ja"
    },
    ja: {
      title: "Computation of string operations using rational homotopy theory",
      conference: "トポロジーとコンピュータ 2016",
      url: "http://www.math.akita-u.ac.jp/tc2016/",
      venue: "秋田市 カレッジプラザ"
    }
  },
  {
    base: {
      date: dayjs("2016-11-30"),
      lang: "ja"
    },
    ja: {
      title: "Description and triviality of the loop products and coproducts for rational Gorenstein spaces",
      conference: "信州トポロジーセミナー",
      url: "http://math.shinshu-u.ac.jp/~topology/seminar/archive16.html",
      venue: "信州大学"
    }
  },
  {
    base: {
      date: dayjs("2017-03-24"),
      lang: "ja"
    },
    ja: {
      title: "Sullivan 代数の semi-pure 性について",
      conference: "日本数学会 2017年度年会",
      url: "https://www.mathsoc.jp/activity/meeting/tmu17mar/",
      venue: "首都大学東京"
    },
    en: {
      title: "Sullivan 代数の semi-pure 性について",
      conference: "MSJ Spring Meeting 2017",
      url: "https://www.mathsoc.jp/en/meeting/tmu17mar/",
      venue: "Tokyo Metropolitan University"
    }
  },
  {
    base: {
      date: dayjs("2017-05-22"),
      lang: "ja"
    },
    ja: {
      title: "String topology on rational Gorenstein spaces",
      conference: "変換群を核とする代数的位相幾何学",
      url: "https://www.rs.tus.ac.jp/math2/math2/tsatoh/tsatoh-homepage/rims_trans_2017_program.pdf",
      venue: "京都大学数理解析研究所"
    }
  },
  {
    base: {
      date: dayjs("2017-07-06"),
      lang: "en"
    },
    en: {
      title: "String topology on rational Gorenstein spaces",
      conference: "Young Topologists Meeting",
      url: "https://www.math-stockholm.se/en/konferenser-och-akti/young-topologists-meeting-2017-1.670396",
      venue: "KTH Royal Institute of Technology in Stockholm, Sweden"
    }
  },
  {
    base: {
      date: dayjs("2017-11-24"),
      lang: "ja"
    },
    ja: {
      title: "Brane topology on rational Gorenstein spaces",
      conference: "ホモトピー論シンポジウム",
      url: "http://bach.kinwu.ac.jp/homotopy2017/",
      venue: "高松市生涯学習センター(まなびCAN)"
    }
  },
  {
    base: {
      date: dayjs("2017-12-09"),
      lang: "ja"
    },
    ja: {
      title: "Coproducts in brane topology",
      conference: "ストリングトポロジーとその周辺",
      venue: "四季の湯強羅静雲荘"
    }
  },
  {
    base: {
      date: dayjs("2018-08-30"),
      lang: "en"
    },
    en: {
      title: "Coproducts in brane topology on rational Gorenstein spaces",
      conference: "Mapping Spaces in Algebraic Topology",
      // url: "https://www.math.kyoto-u.ac.jp/~kishi/conference/kyoto2018/top", // broken link
      venue: "Kyoto University"
    }
  },
  {
    base: {
      date: dayjs("2018-09-25"),
      lang: "en"
    },
    en: {
      title: "Coproducts in brane topology on rational Gorenstein spaces",
      conference: "Topological Activities",
      url: "https://www.math-stockholm.se/en/kalender/shun-wakatsuki-coproducts-in-brane-topology-on-rational-gorenstein-spaces-1.845240?date=2018-09-25&orgdate=2018-09-01&length=1&orglength=30",
      venue: "Stockholm University"
    }
  },
  {
    base: {
      date: dayjs("2018-11-04"),
      lang: "ja"
    },
    ja: {
      title: "Properties of brane operations",
      conference: "ホモトピー論シンポジウム2018",
      url: "https://www.math.kyoto-u.ac.jp/~kishi/conference/tokyo2018.html",
      venue: "東京工業大学"
    }
  },
  {
    base: {
      date: dayjs("2019-03-06"),
      lang: "en"
    },
    en: {
      title: "Gorenstein spaces and string topology",
      conference: "Building-up Differential Homotopy Theory",
      url: "https://www2.math.kyushu-u.ac.jp/~iwase/BDHT/Home.html",
      venue: "Kyushu University"
    }
  },
  {
    base: {
      date: dayjs("2019-03-17"),
      lang: "ja"
    },
    ja: {
      title: "Generalization of the loop coproduct",
      conference: "日本数学会・2019年度年会",
      url: "http://www.mathsoc.jp/activity/meeting/titech19mar/",
      venue: "東京工業大学"
    },
    en: {
      title: "Generalization of the loop coproduct",
      conference: "MSJ Spring Meeting 2019",
      url: "http://www.mathsoc.jp/en/meeting/titech19mar/",
      venue: "Tokyo Institute of Technology"
    }
  },
  {
    base: {
      date: dayjs("2019-06-05"),
      lang: "ja"
    },
    ja: {
      title: "Brane coproducts and vanishing of cup products on sphere spaces",
      conference: "信州トポロジーセミナー",
      url: "http://math.shinshu-u.ac.jp/~topology/seminar/",
      venue: "信州大学"
    }
  },
  {
    base: {
      date: dayjs("2019-07-02"),
      lang: "ja"
    },
    ja: {
      title: "Brane coproducts and their applications",
      conference: "トポロジー火曜セミナー",
      url: "http://www.ms.u-tokyo.ac.jp/seminar/topology/index.html",
      venue: "東京大学"
    },
    en: {
      title: "Brane coproducts and their applications",
      conference: "Tuesday Seminar on Topology",
      url: "http://www.ms.u-tokyo.ac.jp/seminar/topology_e/index_e.html",
      venue: "University of Tokyo"
    }
  },
  {
    base: {
      date: dayjs("2019-08-08"),
      lang: "ja"
    },
    ja: {
      title: "Brane coproducts and their applications",
      conference: "トポロジーシンポジウム",
      url: "http://www.math.akita-u.ac.jp/ts2019/",
      venue: "秋田市・にぎわい交流館AU（あう）"
    }
  },
  {
    base: {
      date: dayjs("2020-03-04"),
      lang: "en"
    },
    en: {
      title: "Differential forms in rational homotopy theory",
      conference: "Building-up Differential Homotopy Theory 2020",
      url: "https://www2.math.kyushu-u.ac.jp/~iwase/BDHT2/Home.html",
      venue: "Shinshu University"
    }
  },
  {
    base: {
      date: dayjs("2020-06-17"),
      lang: "ja"
    },
    ja: {
      title: "Vanishing of some cup products on mapping spaces from spheres",
      conference: "東工大トポロジーセミナー",
      url: "https://sites.google.com/view/titech-topology/home",
      venue: "Zoom"
    }
  },
  {
    base: {
      date: dayjs("2021-07-16"),
      lang: "ja"
    },
    ja: {
      title: "Vanishing of some cup products on mapping spaces from spheres",
      conference: "信州・京都・九大トポロジーセミナー",
      url: "http://math.shinshu-u.ac.jp/~topology/seminar/",
      venue: "Zoom"
    }
  },
  {
    base: {
      date: dayjs("2021-11-07"),
      lang: "ja"
    },
    ja: {
      title: "A reduction of the string bracket to the loop product",
      conference: "ホモトピー論シンポジウム2021",
      url: "https://sites.google.com/view/homotopytheorysymposium2021/home",
      venue: "Zoom"
    }
  },
  {
    base: {
      date: dayjs("2021-11-10"),
      lang: "en"
    },
    en: {
      title: "BV exactness and string brackets",
      conference: "Purdue Topology Seminar",
      url: "https://sites.google.com/view/purduetopologyseminar",
      venue: "Zoom"
    }
  },
  {
    base: {
      date: dayjs("2022-02-21"),
      lang: "ja"
    },
    ja: {
      title: "Koszulity in topology",
      conference: "Winter School on Koszul Algebra and Koszul Duality",
      url: "https://ryokanda.net/conferences/koszul2021/?lang=ja",
      venue: "大阪市立大学, Zoom"
    },
    en: {
      title: "Koszulity in topology",
      conference: "Winter School on Koszul Algebra and Koszul Duality",
      url: "https://ryokanda.net/conferences/koszul2021/",
      venue: "Osaka City University, Zoom"
    }
  },
  {
    base: {
      date: dayjs("2022-05-09"),
      lang: "ja"
    },
    ja: {
      title: "BV exactness and string bracket",
      conference: "大阪大学幾何セミナー",
      url: "http://www4.math.sci.osaka-u.ac.jp/sembbs2/poster.cgi?id=918",
      venue: "大阪大学"
    },
  },
  {
    base: {
      date: dayjs("2022-07-30"),
      lang: "ja"
    },
    ja: {
      title: "BV exactness and string brackets",
      conference: "ホモトピー沖縄2022",
      url: "https://sites.google.com/view/homotopy-okinawa-2022/",
      venue: "琉球大学"
    },
  },
  {
    base: {
      date: dayjs("2022-08-30"),
      lang: "ja"
    },
    ja: {
      title: "Algebraic structures on the cohomology of the free loop spaces",
      conference: "第69回 幾何学シンポジウム",
      url: "https://www.mathsoc.jp/~geometry/symp_schedule/geometry_symposium_2022.html",
      venue: "東京理科大学"
    },
  },
  {
    base: {
      date: dayjs("2022-09-13"),
      lang: "ja"
    },
    ja: {
      title: "BV exactness and string brackets",
      conference: "日本数学会・2022年度秋季総合分科会",
      url: "https://www.mathsoc.jp/activity/meeting/hokudai22sept/",
      venue: "北海道大学"
    },
    en: {
      title: "BV exactness and string brackets",
      conference: "MSJ Autumn Meeting 2022",
      url: "https://www.mathsoc.jp/en/meeting/hokudai22sept/",
      venue: "Hokkaido University"
    }
  },
  {
    base: {
      date: dayjs("2022-09-21"),
      lang: "en"
    },
    en: {
      title: "BV exactness and the S^1-equivariant cohomology of free loop spaces",
      conference: "Workshop on complex geometry in Osaka 2022",
      url: "https://sites.google.com/site/hisashikasuyamath/workshop-on-complex-geometry",
      venue: "Osaka University"
    }
  },
  {
    base: {
      date: dayjs("2022-10-23"),
      lang: "ja"
    },
    ja: {
      title: "Computations in rational homotopy theory",
      conference: "トポロジーとコンピュータ2022",
      url: "https://sites.google.com/view/topocom2022/",
      venue: "広島大学"
    },
  },
  {
    base: {
      date: dayjs("2022-11-05"),
      lang: "ja"
    },
    ja: {
      title: "Cartan calculi on the free loop spaces",
      conference: "ホモトピー論シンポジウム2022",
      url: "https://sites.google.com/view/homotopytheorysymposium2022",
      venue: "Zoom"
    },
  },
  {
    base: {
      date: dayjs("2022-11-29"),
      lang: "ja"
    },
    ja: {
      title: "Cartan calculi on the free loop spaces",
      conference: "微分トポロジーセミナー",
      url: "https://www.math.kyoto-u.ac.jp/ja/event/seminar/5001",
      venue: "京都大学"
    },
  },
  {
    base: {
      date: dayjs("2023-03-15"),
      lang: "ja"
    },
    ja: {
      title: "Independence complexes of grid graphs",
      conference: "日本数学会・2023年度年会",
      url: "https://www.mathsoc.jp/activity/meeting/chuo23mar/",
      venue: "中央大学"
    },
    en: {
      title: "Independence complexes of grid graphs",
      conference: "MSJ Spring Meeting 2023",
      url: "https://www.mathsoc.jp/en/meeting/chuo23mar/",
      venue: "Chuo University"
    }
  },
  {
    base: {
      date: dayjs("2023-03-22"),
      lang: "ja"
    },
    ja: {
      title: "Rational homotopy theory and the cohomology of free loop spaces",
      conference: "第10回(非)可換代数とトポロジー",
      url: "http://marine.shinshu-u.ac.jp/~kuri/ALGEBRA_TOPOLOGY/schedule2022.html",
      venue: "信州大学"
    },
  },
  {
    base: {
      date: dayjs("2023-09-08"),
      lang: "en"
    },
    en: {
      title: "String topology from the viewpoint of algebraic topology",
      conference: "Shenzhen–Nagoya Workshop on Quantum Science 2023",
      url: "https://shenzhen-nagoya.github.io/2023/",
      venue: "Hybrid (Nagoya University and Zoom)"
    }
  },
  {
    base: {
      date: dayjs("2023-11-19"),
      lang: "ja"
    },
    ja: {
      title: "Computations in rational homotopy theory and string topology",
      conference: "多様体と写像空間の代数トポロジー",
      url: "https://www2.math.kyushu-u.ac.jp/~tsutaya/2023okayama.html",
      venue: "オルガビル(岡山市)"
    }
  },
  {
    base: {
      date: dayjs("2023-11-28"),
      lang: "en",
    },
    en: {
      title: "Rational homotopy theory and computation of cohomology",
      conference: "Seminar in Mathematical and Theoretical Physics Unit (Shinobu Hikami)",
      url: "https://groups.oist.jp/mtpu/event/rational-homotopy-theory-and-computation-cohomology",
      venue: "OIST"
    }
  },
  {
    base: {
      date: dayjs("2023-12-27"),
      lang: "ja"
    },
    ja: {
      title: "Computations in rational homotopy theory and string topology",
      conference: "高知ホモトピー論談話会 2023",
      url: "https://sites.google.com/view/kochihomotopy2023/",
      venue: "高知工科大学"
    }
  },
  {
    base: {
      date: dayjs("2024-3-12"),
      lang: "en",
    },
    en: {
      title: "BV exactness and computation in rational homotopy theory",
      conference: "Seminar at Malaga University",
      // url: "https://groups.oist.jp/mtpu/event/rational-homotopy-theory-and-computation-cohomology",
      venue: "Malaga University (Spain)"
    }
  },
  {
    base: {
      date: dayjs("2024-5-22"),
      lang: "ja"
    },
    ja: {
      title: "BV exactness and computation of the S^1-equivariant cohomology of free loop spaces",
      conference: "変換群論とその進展",
      url: "https://sites.google.com/view/rims-transformation-groups24/",
      venue: "京都大学 数理解析研究所"
    }
  },
  {
    base: {
      date: dayjs("2024-6-29"),
      lang: "ja"
    },
    ja: {
      title: "Computation of the magnitude homology as a derived functor",
      conference: "ホモトピー論シンポジウム2024",
      url: "https://sites.google.com/view/homotopy-theory-symposium-2024",
      venue: "沖縄県立博物館・美術館（おきみゅー）"
    }
  },
  {
    base: {
      date: dayjs("2024-12-10"),
      lang: "ja"
    },
    ja: {
      title: "Computation of the magnitude homology as a derived functor",
      conference: "トポロジー火曜セミナー",
      url: "https://park.itc.u-tokyo.ac.jp/MSF/topology/TuesdaySeminar/topology24_2.html",
      venue: "東京大学"
    }
  },
  {
    base: {
      date: dayjs("2025-1-9"),
      lang: "ja"
    },
    ja: {
      title: "Computation of the magnitude homology as a derived functor",
      conference: "Magnitude 2024",
      url: "https://sites.google.com/fukuoka-u.ac.jp/magnitude-2024",
      venue: "九州大学 西新プラザ"
    }
  },
  {
    base: {
      date: dayjs("2025-9-8"),
      lang: "ja"
    },
    ja: {
      title: "Minimal projective resolution and magnitude homology of geodetic metric space",
      conference: "第５７回環論および表現論シンポジウム",
      url: "https://ring-theory-japan.com/ring/kan/57ringsymp.html",
      venue: "岡山理科大学"
    }
  },
]
