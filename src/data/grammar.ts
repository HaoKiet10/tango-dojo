import type { Grammar } from "./types";

export const GRAMMAR: Grammar[] = [
  {
    "id": "nagara",
    "pattern": "〜ながら",
    "level": 4,
    "form": "Vます(bỏ ます) + ながら",
    "meaning": "vừa … vừa …",
    "note": "Hai hành động diễn ra cùng lúc; hành động chính đặt ở vế sau.",
    "confusables": [],
    "examples": [
      {
        "ja": "テレビを見＿＿勉強します。",
        "answer": "ながら",
        "pieces": [
          "テレビを",
          "見",
          "ながら",
          "勉強します。"
        ],
        "vi": "Tôi vừa xem tivi vừa học."
      },
      {
        "ja": "歩き＿＿電話するのは危ないです。",
        "answer": "ながら",
        "pieces": [
          "歩き",
          "ながら",
          "電話するのは",
          "危ないです。"
        ],
        "vi": "Vừa đi bộ vừa gọi điện thoại thì nguy hiểm."
      }
    ]
  },
  {
    "id": "tame-ni",
    "pattern": "〜ために",
    "level": 4,
    "form": "V(từ điển) / Nの + ために",
    "meaning": "để (mục đích)",
    "note": "Chỉ mục đích mà người nói chủ động hướng tới; hai vế cùng chủ ngữ.",
    "confusables": [
      "you-ni"
    ],
    "examples": [
      {
        "ja": "日本で働く＿＿、日本語を勉強しています。",
        "answer": "ために",
        "pieces": [
          "日本で",
          "働く",
          "ために、",
          "日本語を勉強しています。"
        ],
        "vi": "Tôi học tiếng Nhật để làm việc ở Nhật."
      },
      {
        "ja": "健康の＿＿、毎日歩きます。",
        "answer": "ために",
        "pieces": [
          "健康の",
          "ために、",
          "毎日",
          "歩きます。"
        ],
        "vi": "Tôi đi bộ mỗi ngày vì sức khỏe."
      }
    ]
  },
  {
    "id": "you-ni",
    "pattern": "〜ように",
    "level": 4,
    "form": "V(từ điển) / Vない + ように",
    "meaning": "sao cho, để có thể",
    "note": "Mục đích là một trạng thái không tự kiểm soát được, thường đi với động từ khả năng hoặc thể phủ định.",
    "confusables": [
      "tame-ni"
    ],
    "examples": [
      {
        "ja": "忘れない＿＿、メモを書きます。",
        "answer": "ように",
        "pieces": [
          "忘れない",
          "ように、",
          "メモを",
          "書きます。"
        ],
        "vi": "Tôi ghi chú để không quên."
      },
      {
        "ja": "よく見える＿＿、前に行きました。",
        "answer": "ように",
        "pieces": [
          "よく",
          "見える",
          "ように、",
          "前に行きました。"
        ],
        "vi": "Tôi lên phía trước để nhìn rõ."
      }
    ]
  },
  {
    "id": "te-shimau",
    "pattern": "〜てしまう",
    "level": 4,
    "form": "Vて + しまう",
    "meaning": "lỡ …, … mất rồi",
    "note": "Hành động đã xong hoàn toàn, thường kèm cảm giác tiếc nuối; văn nói hay rút thành 〜ちゃう.",
    "confusables": [],
    "examples": [
      {
        "ja": "宿題を忘れて＿＿。",
        "answer": "しまいました",
        "pieces": [
          "宿題を",
          "忘れて",
          "しまいました。"
        ],
        "vi": "Tôi lỡ quên bài tập mất rồi."
      },
      {
        "ja": "ケーキを一人で食べて＿＿。",
        "answer": "しまった",
        "pieces": [
          "ケーキを",
          "一人で",
          "食べて",
          "しまった。"
        ],
        "vi": "Tôi lỡ ăn hết cái bánh một mình mất rồi."
      }
    ]
  },
  {
    "id": "te-oku",
    "pattern": "〜ておく",
    "level": 4,
    "form": "Vて + おく",
    "meaning": "làm sẵn, làm trước",
    "note": "Làm trước để chuẩn bị cho việc sau, hoặc để nguyên trạng thái đó.",
    "confusables": [
      "te-aru"
    ],
    "examples": [
      {
        "ja": "旅行の前にホテルを予約して＿＿。",
        "answer": "おきます",
        "pieces": [
          "旅行の前に",
          "ホテルを",
          "予約して",
          "おきます。"
        ],
        "vi": "Trước chuyến du lịch, tôi đặt khách sạn trước."
      },
      {
        "ja": "使ったはさみは元の場所に戻して＿＿ください。",
        "answer": "おいて",
        "pieces": [
          "使った",
          "はさみは",
          "元の場所に戻して",
          "おいてください。"
        ],
        "vi": "Kéo dùng xong thì hãy để lại chỗ cũ."
      }
    ]
  },
  {
    "id": "te-aru",
    "pattern": "〜てある",
    "level": 4,
    "form": "Vて (tha động từ) + ある",
    "meaning": "đã được … sẵn (trạng thái)",
    "note": "Trạng thái là kết quả của hành động có chủ ý của ai đó; dùng với tha động từ.",
    "confusables": [
      "te-oku"
    ],
    "examples": [
      {
        "ja": "黒板に名前が書いて＿＿。",
        "answer": "あります",
        "pieces": [
          "黒板に",
          "名前が",
          "書いて",
          "あります。"
        ],
        "vi": "Tên đã được viết sẵn trên bảng."
      },
      {
        "ja": "窓が開けて＿＿ので、涼しいです。",
        "answer": "ある",
        "pieces": [
          "窓が",
          "開けて",
          "あるので、",
          "涼しいです。"
        ],
        "vi": "Cửa sổ được mở sẵn nên mát."
      }
    ]
  },
  {
    "id": "te-miru",
    "pattern": "〜てみる",
    "level": 4,
    "form": "Vて + みる",
    "meaning": "thử làm",
    "note": "Làm thử một việc để biết kết quả ra sao.",
    "confusables": [
      "tara-dou"
    ],
    "examples": [
      {
        "ja": "この服を着て＿＿いいですか。",
        "answer": "みても",
        "pieces": [
          "この",
          "服を",
          "着て",
          "みても",
          "いいですか。"
        ],
        "vi": "Tôi mặc thử bộ đồ này được không?"
      },
      {
        "ja": "日本の料理を作って＿＿。",
        "answer": "みました",
        "pieces": [
          "日本の",
          "料理を",
          "作って",
          "みました。"
        ],
        "vi": "Tôi đã thử nấu món ăn Nhật."
      }
    ]
  },
  {
    "id": "tara",
    "pattern": "〜たら",
    "level": 4,
    "form": "Vた / Aかった / Nだった + ら",
    "meaning": "nếu … thì, khi … thì",
    "note": "Điều kiện hoặc thời điểm; vế sau có thể là ý chí, nhờ vả. Dùng được rộng nhất trong các thể điều kiện.",
    "confusables": [
      "ba",
      "to-joken",
      "nara"
    ],
    "examples": [
      {
        "ja": "駅に着い＿＿、電話してください。",
        "answer": "たら",
        "pieces": [
          "駅に",
          "着い",
          "たら、",
          "電話してください。"
        ],
        "vi": "Khi đến ga thì hãy gọi điện cho tôi."
      },
      {
        "ja": "雨が降っ＿＿、行きません。",
        "answer": "たら",
        "pieces": [
          "雨が",
          "降っ",
          "たら、",
          "行きません。"
        ],
        "vi": "Nếu trời mưa thì tôi không đi."
      }
    ]
  },
  {
    "id": "ba",
    "pattern": "〜ば",
    "level": 4,
    "form": "V (thể ば) / Aければ",
    "meaning": "nếu (giả định)",
    "note": "Điều kiện cần để vế sau xảy ra; hay dùng khi nói chung chung hoặc khuyên bảo.",
    "confusables": [
      "tara",
      "to-joken"
    ],
    "examples": [
      {
        "ja": "安けれ＿＿、買います。",
        "answer": "ば",
        "pieces": [
          "安けれ",
          "ば、",
          "買います。"
        ],
        "vi": "Nếu rẻ thì tôi mua."
      },
      {
        "ja": "毎日練習すれ＿＿、上手になります。",
        "answer": "ば",
        "pieces": [
          "毎日",
          "練習すれ",
          "ば、",
          "上手になります。"
        ],
        "vi": "Nếu luyện tập mỗi ngày thì sẽ giỏi lên."
      }
    ]
  },
  {
    "id": "to-joken",
    "pattern": "〜と (điều kiện)",
    "level": 4,
    "form": "V (từ điển) + と",
    "meaning": "hễ … là",
    "note": "Kết quả tất yếu, tự nhiên hoặc thói quen; vế sau không dùng ý chí, nhờ vả.",
    "confusables": [
      "tara",
      "ba"
    ],
    "examples": [
      {
        "ja": "このボタンを押す＿＿、お茶が出ます。",
        "answer": "と",
        "pieces": [
          "このボタンを",
          "押す",
          "と、",
          "お茶が出ます。"
        ],
        "vi": "Hễ ấn nút này là trà chảy ra."
      },
      {
        "ja": "春になる＿＿、暖かくなります。",
        "answer": "と",
        "pieces": [
          "春に",
          "なる",
          "と、",
          "暖かくなります。"
        ],
        "vi": "Hễ sang xuân là trời ấm lên."
      }
    ]
  },
  {
    "id": "nara",
    "pattern": "〜なら",
    "level": 4,
    "form": "N / V (thể thường) + なら",
    "meaning": "nếu là … thì",
    "note": "Lấy điều người kia vừa nói làm chủ đề rồi khuyên hoặc nêu ý kiến.",
    "confusables": [
      "tara"
    ],
    "examples": [
      {
        "ja": "日本料理＿＿、あの店がいいですよ。",
        "answer": "なら",
        "pieces": [
          "日本料理",
          "なら、",
          "あの店が",
          "いいですよ。"
        ],
        "vi": "Nếu là món Nhật thì quán kia ngon đấy."
      },
      {
        "ja": "京都へ行く＿＿、秋が一番です。",
        "answer": "なら",
        "pieces": [
          "京都へ",
          "行く",
          "なら、",
          "秋が一番です。"
        ],
        "vi": "Nếu đi Kyoto thì mùa thu là đẹp nhất."
      }
    ]
  },
  {
    "id": "noni",
    "pattern": "〜のに",
    "level": 4,
    "form": "(thể thường) / Naな / Nな + のに",
    "meaning": "vậy mà, thế mà",
    "note": "Kết quả trái với mong đợi, thường kèm bất mãn hoặc tiếc nuối.",
    "confusables": [
      "node",
      "te-mo"
    ],
    "examples": [
      {
        "ja": "たくさん勉強した＿＿、試験に落ちました。",
        "answer": "のに",
        "pieces": [
          "たくさん",
          "勉強した",
          "のに、",
          "試験に落ちました。"
        ],
        "vi": "Học nhiều vậy mà vẫn trượt kỳ thi."
      },
      {
        "ja": "約束した＿＿、彼は来ませんでした。",
        "answer": "のに",
        "pieces": [
          "約束した",
          "のに、",
          "彼は来ませんでした。"
        ],
        "vi": "Đã hứa rồi thế mà anh ấy không đến."
      }
    ]
  },
  {
    "id": "node",
    "pattern": "〜ので",
    "level": 4,
    "form": "(thể thường) / Naな / Nな + ので",
    "meaning": "vì … nên (khách quan)",
    "note": "Nêu lý do nhẹ nhàng, khách quan; lịch sự hơn から.",
    "confusables": [
      "noni"
    ],
    "examples": [
      {
        "ja": "熱がある＿＿、今日は休みます。",
        "answer": "ので",
        "pieces": [
          "熱が",
          "ある",
          "ので、",
          "今日は休みます。"
        ],
        "vi": "Vì bị sốt nên hôm nay tôi nghỉ."
      },
      {
        "ja": "電車が止まった＿＿、遅れました。",
        "answer": "ので",
        "pieces": [
          "電車が",
          "止まった",
          "ので、",
          "遅れました。"
        ],
        "vi": "Vì tàu dừng nên tôi đến muộn."
      }
    ]
  },
  {
    "id": "shi",
    "pattern": "〜し",
    "level": 4,
    "form": "(thể thường) + し",
    "meaning": "nào là … nào là, vừa … lại",
    "note": "Liệt kê nhiều lý do hoặc đặc điểm cùng hướng.",
    "confusables": [],
    "examples": [
      {
        "ja": "この店は安い＿＿、おいしいです。",
        "answer": "し",
        "pieces": [
          "この店は",
          "安い",
          "し、",
          "おいしいです。"
        ],
        "vi": "Quán này vừa rẻ lại ngon."
      },
      {
        "ja": "雨も降っている＿＿、今日は出かけません。",
        "answer": "し",
        "pieces": [
          "雨も",
          "降っている",
          "し、",
          "今日は出かけません。"
        ],
        "vi": "Trời lại đang mưa nữa, nên hôm nay tôi không ra ngoài."
      }
    ]
  },
  {
    "id": "sou-yotai",
    "pattern": "〜そうだ (trông có vẻ)",
    "level": 4,
    "form": "Vます (bỏ ます) / A (bỏ い) / Na + そうだ",
    "meaning": "trông có vẻ",
    "note": "Phán đoán dựa trên những gì nhìn thấy trước mắt.",
    "confusables": [
      "sou-denbun",
      "you-da",
      "rashii"
    ],
    "examples": [
      {
        "ja": "このケーキはおいし＿＿ですね。",
        "answer": "そう",
        "pieces": [
          "このケーキは",
          "おいし",
          "そうですね。"
        ],
        "vi": "Cái bánh này trông có vẻ ngon nhỉ."
      },
      {
        "ja": "空が暗くて、雨が降り＿＿です。",
        "answer": "そう",
        "pieces": [
          "空が暗くて、",
          "雨が",
          "降り",
          "そうです。"
        ],
        "vi": "Trời tối sầm, trông có vẻ sắp mưa."
      }
    ]
  },
  {
    "id": "sou-denbun",
    "pattern": "〜そうだ (nghe nói)",
    "level": 4,
    "form": "(thể thường) + そうだ",
    "meaning": "nghe nói",
    "note": "Truyền đạt lại thông tin nghe hoặc đọc được, thường nêu nguồn bằng 〜によると.",
    "confusables": [
      "sou-yotai",
      "rashii"
    ],
    "examples": [
      {
        "ja": "天気予報によると、明日は雨だ＿＿です。",
        "answer": "そう",
        "pieces": [
          "天気予報によると、",
          "明日は",
          "雨だ",
          "そうです。"
        ],
        "vi": "Theo dự báo thời tiết, nghe nói mai trời mưa."
      },
      {
        "ja": "田中さんは来月結婚する＿＿です。",
        "answer": "そう",
        "pieces": [
          "田中さんは",
          "来月",
          "結婚する",
          "そうです。"
        ],
        "vi": "Nghe nói anh Tanaka tháng sau kết hôn."
      }
    ]
  },
  {
    "id": "you-da",
    "pattern": "〜ようだ",
    "level": 4,
    "form": "(thể thường) / Naな / Nの + ようだ",
    "meaning": "hình như, có vẻ như",
    "note": "Phán đoán dựa trên cảm nhận, quan sát của chính người nói.",
    "confusables": [
      "sou-yotai",
      "rashii",
      "mitai"
    ],
    "examples": [
      {
        "ja": "誰か来た＿＿です。",
        "answer": "よう",
        "pieces": [
          "誰か",
          "来た",
          "ようです。"
        ],
        "vi": "Hình như có ai đó đến."
      },
      {
        "ja": "かぜをひいた＿＿で、頭が痛いです。",
        "answer": "よう",
        "pieces": [
          "かぜを",
          "ひいた",
          "ようで、",
          "頭が痛いです。"
        ],
        "vi": "Hình như tôi bị cảm, đau đầu quá."
      }
    ]
  },
  {
    "id": "rashii",
    "pattern": "〜らしい",
    "level": 4,
    "form": "(thể thường) / N + らしい",
    "meaning": "nghe đồn, dường như",
    "note": "Phán đoán dựa trên thông tin gián tiếp; người nói ít chịu trách nhiệm về độ chính xác.",
    "confusables": [
      "sou-denbun",
      "you-da"
    ],
    "examples": [
      {
        "ja": "あの店は来週閉まる＿＿です。",
        "answer": "らしい",
        "pieces": [
          "あの店は",
          "来週",
          "閉まる",
          "らしいです。"
        ],
        "vi": "Nghe đồn quán đó tuần sau đóng cửa."
      },
      {
        "ja": "山田さんは会社をやめた＿＿。",
        "answer": "らしい",
        "pieces": [
          "山田さんは",
          "会社を",
          "やめた",
          "らしい。"
        ],
        "vi": "Dường như anh Yamada đã nghỉ việc."
      }
    ]
  },
  {
    "id": "kamoshirenai",
    "pattern": "〜かもしれない",
    "level": 4,
    "form": "(thể thường) / Na / N + かもしれない",
    "meaning": "có lẽ, không chừng",
    "note": "Khả năng xảy ra khoảng một nửa, người nói không chắc chắn.",
    "confusables": [
      "hazu"
    ],
    "examples": [
      {
        "ja": "午後は雨が降る＿＿。",
        "answer": "かもしれません",
        "pieces": [
          "午後は",
          "雨が降る",
          "かもしれません。"
        ],
        "vi": "Buổi chiều có lẽ trời sẽ mưa."
      },
      {
        "ja": "電話はかばんの中にある＿＿。",
        "answer": "かもしれない",
        "pieces": [
          "電話は",
          "かばんの中に",
          "ある",
          "かもしれない。"
        ],
        "vi": "Điện thoại không chừng ở trong cặp."
      }
    ]
  },
  {
    "id": "hazu",
    "pattern": "〜はずだ",
    "level": 4,
    "form": "(thể thường) / Naな / Nの + はずだ",
    "meaning": "chắc chắn là (theo suy luận)",
    "note": "Người nói tin chắc dựa trên căn cứ, lý lẽ.",
    "confusables": [
      "kamoshirenai",
      "hazu-ga-nai"
    ],
    "examples": [
      {
        "ja": "彼は日本に十年住んでいたから、日本語が上手な＿＿です。",
        "answer": "はず",
        "pieces": [
          "彼は",
          "日本に十年住んでいたから、",
          "日本語が上手な",
          "はずです。"
        ],
        "vi": "Anh ấy sống ở Nhật mười năm nên chắc chắn giỏi tiếng Nhật."
      },
      {
        "ja": "荷物は今日届く＿＿です。",
        "answer": "はず",
        "pieces": [
          "荷物は",
          "今日",
          "届く",
          "はずです。"
        ],
        "vi": "Hành lý chắc chắn hôm nay sẽ đến."
      }
    ]
  },
  {
    "id": "hazu-ga-nai",
    "pattern": "〜はずがない",
    "level": 4,
    "form": "(thể thường) / Naな / Nの + はずがない",
    "meaning": "không có lý nào",
    "note": "Phủ định mạnh khả năng xảy ra, dựa trên lý lẽ.",
    "confusables": [
      "hazu"
    ],
    "examples": [
      {
        "ja": "あのまじめな人がうそをつく＿＿。",
        "answer": "はずがない",
        "pieces": [
          "あの",
          "まじめな人が",
          "うそをつく",
          "はずがない。"
        ],
        "vi": "Người nghiêm túc như thế không có lý nào lại nói dối."
      },
      {
        "ja": "一度見ただけで覚えられる＿＿。",
        "answer": "はずがありません",
        "pieces": [
          "一度",
          "見ただけで",
          "覚えられる",
          "はずがありません。"
        ],
        "vi": "Chỉ xem một lần thì không có lý nào nhớ được."
      }
    ]
  },
  {
    "id": "tsumori",
    "pattern": "〜つもりだ",
    "level": 4,
    "form": "V (từ điển) / Vない + つもりだ",
    "meaning": "định, có ý định",
    "note": "Dự định đã suy nghĩ từ trước; chắc chắn hơn 〜ようと思う.",
    "confusables": [
      "you-to-omou"
    ],
    "examples": [
      {
        "ja": "夏休みに国へ帰る＿＿です。",
        "answer": "つもり",
        "pieces": [
          "夏休みに",
          "国へ",
          "帰る",
          "つもりです。"
        ],
        "vi": "Kỳ nghỉ hè tôi định về nước."
      },
      {
        "ja": "もうお酒は飲まない＿＿です。",
        "answer": "つもり",
        "pieces": [
          "もう",
          "お酒は",
          "飲まない",
          "つもりです。"
        ],
        "vi": "Tôi định không uống rượu nữa."
      }
    ]
  },
  {
    "id": "you-to-omou",
    "pattern": "〜ようと思う",
    "level": 4,
    "form": "V (ý chí) + と思う",
    "meaning": "định sẽ, tính sẽ",
    "note": "Ý định nảy ra hoặc quyết tâm của người nói ngay lúc nói.",
    "confusables": [
      "tsumori"
    ],
    "examples": [
      {
        "ja": "来年日本へ行こう＿＿います。",
        "answer": "と思って",
        "pieces": [
          "来年",
          "日本へ",
          "行こう",
          "と思っています。"
        ],
        "vi": "Tôi tính sang năm sẽ đi Nhật."
      },
      {
        "ja": "今晩は早く寝よう＿＿。",
        "answer": "と思います",
        "pieces": [
          "今晩は",
          "早く",
          "寝よう",
          "と思います。"
        ],
        "vi": "Tối nay tôi định đi ngủ sớm."
      }
    ]
  },
  {
    "id": "koto-ni-suru",
    "pattern": "〜ことにする",
    "level": 4,
    "form": "V (từ điển) / Vない + ことにする",
    "meaning": "quyết định (tự mình)",
    "note": "Người nói tự quyết định làm hay không làm việc gì.",
    "confusables": [
      "koto-ni-naru"
    ],
    "examples": [
      {
        "ja": "来年から一人で住む＿＿。",
        "answer": "ことにしました",
        "pieces": [
          "来年から",
          "一人で",
          "住む",
          "ことにしました。"
        ],
        "vi": "Tôi đã quyết định từ năm sau sẽ sống một mình."
      },
      {
        "ja": "健康のために、たばこをやめる＿＿。",
        "answer": "ことにします",
        "pieces": [
          "健康のために、",
          "たばこを",
          "やめる",
          "ことにします。"
        ],
        "vi": "Vì sức khỏe, tôi quyết định bỏ thuốc lá."
      }
    ]
  },
  {
    "id": "koto-ni-naru",
    "pattern": "〜ことになる",
    "level": 4,
    "form": "V (từ điển) / Vない + ことになる",
    "meaning": "được quyết định là, rốt cuộc sẽ",
    "note": "Việc được quyết định bởi người khác hoặc hoàn cảnh, không phải ý mình.",
    "confusables": [
      "koto-ni-suru"
    ],
    "examples": [
      {
        "ja": "来月、大阪に転勤する＿＿。",
        "answer": "ことになりました",
        "pieces": [
          "来月、",
          "大阪に",
          "転勤する",
          "ことになりました。"
        ],
        "vi": "Tháng sau tôi được điều chuyển công tác tới Osaka."
      },
      {
        "ja": "会議は金曜日に開く＿＿。",
        "answer": "ことになった",
        "pieces": [
          "会議は",
          "金曜日に",
          "開く",
          "ことになった。"
        ],
        "vi": "Cuộc họp đã được quyết định tổ chức vào thứ Sáu."
      }
    ]
  },
  {
    "id": "you-ni-naru",
    "pattern": "〜ようになる",
    "level": 4,
    "form": "V (từ điển / khả năng) / Vなく + なる",
    "meaning": "trở nên (có thể)",
    "note": "Sự thay đổi về năng lực hoặc thói quen theo thời gian.",
    "confusables": [
      "you-ni-suru",
      "you-ni"
    ],
    "examples": [
      {
        "ja": "日本語が話せる＿＿。",
        "answer": "ようになりました",
        "pieces": [
          "日本語が",
          "話せる",
          "ようになりました。"
        ],
        "vi": "Tôi đã nói được tiếng Nhật."
      },
      {
        "ja": "毎朝野菜を食べる＿＿。",
        "answer": "ようになった",
        "pieces": [
          "毎朝",
          "野菜を",
          "食べる",
          "ようになった。"
        ],
        "vi": "Tôi đã có thói quen ăn rau mỗi sáng."
      }
    ]
  },
  {
    "id": "you-ni-suru",
    "pattern": "〜ようにする",
    "level": 4,
    "form": "V (từ điển) / Vない + ようにする",
    "meaning": "cố gắng (để)",
    "note": "Cố gắng duy trì một thói quen hoặc luôn để ý làm gì.",
    "confusables": [
      "you-ni-naru"
    ],
    "examples": [
      {
        "ja": "毎日運動する＿＿。",
        "answer": "ようにしています",
        "pieces": [
          "毎日",
          "運動する",
          "ようにしています。"
        ],
        "vi": "Tôi cố gắng vận động mỗi ngày."
      },
      {
        "ja": "夜は甘い物を食べない＿＿。",
        "answer": "ようにしています",
        "pieces": [
          "夜は",
          "甘い物を",
          "食べない",
          "ようにしています。"
        ],
        "vi": "Tôi cố không ăn đồ ngọt vào buổi tối."
      }
    ]
  },
  {
    "id": "koto-ga-dekiru",
    "pattern": "〜ことができる",
    "level": 4,
    "form": "V (từ điển) + ことができる",
    "meaning": "có thể (làm)",
    "note": "Khả năng hoặc sự cho phép; trang trọng hơn thể khả năng.",
    "confusables": [],
    "examples": [
      {
        "ja": "ここで写真を撮る＿＿。",
        "answer": "ことができます",
        "pieces": [
          "ここで",
          "写真を",
          "撮る",
          "ことができます。"
        ],
        "vi": "Có thể chụp ảnh ở đây."
      },
      {
        "ja": "母はピアノをひく＿＿。",
        "answer": "ことができます",
        "pieces": [
          "母は",
          "ピアノを",
          "ひく",
          "ことができます。"
        ],
        "vi": "Mẹ tôi có thể chơi piano."
      }
    ]
  },
  {
    "id": "te-mo",
    "pattern": "〜ても",
    "level": 4,
    "form": "Vて / Aくて / Na・N で + も",
    "meaning": "dù … cũng",
    "note": "Dù điều ở vế trước xảy ra thì vế sau vẫn không thay đổi.",
    "confusables": [
      "noni"
    ],
    "examples": [
      {
        "ja": "雨が降って＿＿、試合はあります。",
        "answer": "も",
        "pieces": [
          "雨が",
          "降って",
          "も、",
          "試合はあります。"
        ],
        "vi": "Dù trời mưa thì trận đấu vẫn diễn ra."
      },
      {
        "ja": "いくら考えて＿＿、分かりません。",
        "answer": "も",
        "pieces": [
          "いくら",
          "考えて",
          "も、",
          "分かりません。"
        ],
        "vi": "Dù nghĩ bao nhiêu cũng không hiểu."
      }
    ]
  },
  {
    "id": "nakute-mo-ii",
    "pattern": "〜なくてもいい",
    "level": 4,
    "form": "Vない (bỏ い) + くてもいい",
    "meaning": "không cần … cũng được",
    "note": "Cho phép không phải làm việc gì đó.",
    "confusables": [
      "nakereba"
    ],
    "examples": [
      {
        "ja": "明日は来＿＿です。",
        "answer": "なくてもいい",
        "pieces": [
          "明日は",
          "来",
          "なくてもいいです。"
        ],
        "vi": "Ngày mai không cần đến cũng được."
      },
      {
        "ja": "ぜんぶ食べ＿＿ですよ。",
        "answer": "なくてもいい",
        "pieces": [
          "ぜんぶ",
          "食べ",
          "なくてもいいですよ。"
        ],
        "vi": "Không cần ăn hết đâu."
      }
    ]
  },
  {
    "id": "nakereba",
    "pattern": "〜なければならない",
    "level": 4,
    "form": "Vない (bỏ い) + ければならない",
    "meaning": "phải",
    "note": "Nghĩa vụ, bắt buộc phải làm; văn nói hay rút thành 〜なきゃ.",
    "confusables": [
      "nakute-mo-ii"
    ],
    "examples": [
      {
        "ja": "明日までにレポートを出さ＿＿。",
        "answer": "なければなりません",
        "pieces": [
          "明日までに",
          "レポートを",
          "出さ",
          "なければなりません。"
        ],
        "vi": "Phải nộp báo cáo trước ngày mai."
      },
      {
        "ja": "薬を毎日飲ま＿＿。",
        "answer": "なければならない",
        "pieces": [
          "薬を",
          "毎日",
          "飲ま",
          "なければならない。"
        ],
        "vi": "Phải uống thuốc mỗi ngày."
      }
    ]
  },
  {
    "id": "te-kureru",
    "pattern": "〜てくれる",
    "level": 4,
    "form": "Vて + くれる",
    "meaning": "(ai đó) làm cho tôi",
    "note": "Người khác làm gì đó cho người nói hoặc người phía mình, kèm lòng biết ơn.",
    "confusables": [
      "te-ageru",
      "te-morau"
    ],
    "examples": [
      {
        "ja": "友達が駅まで送って＿＿。",
        "answer": "くれました",
        "pieces": [
          "友達が",
          "駅まで",
          "送って",
          "くれました。"
        ],
        "vi": "Bạn tôi đã tiễn tôi ra tận ga."
      },
      {
        "ja": "母がお弁当を作って＿＿。",
        "answer": "くれた",
        "pieces": [
          "母が",
          "お弁当を",
          "作って",
          "くれた。"
        ],
        "vi": "Mẹ đã làm cơm hộp cho tôi."
      }
    ]
  },
  {
    "id": "te-ageru",
    "pattern": "〜てあげる",
    "level": 4,
    "form": "Vて + あげる",
    "meaning": "làm cho (người khác)",
    "note": "Người nói hoặc phía mình làm gì đó cho người khác; nói với người trên dễ bị coi là kẻ cả.",
    "confusables": [
      "te-kureru",
      "te-morau"
    ],
    "examples": [
      {
        "ja": "妹に本を読んで＿＿。",
        "answer": "あげました",
        "pieces": [
          "妹に",
          "本を",
          "読んで",
          "あげました。"
        ],
        "vi": "Tôi đã đọc sách cho em gái."
      },
      {
        "ja": "道に迷った人に地図をかいて＿＿。",
        "answer": "あげた",
        "pieces": [
          "道に迷った人に",
          "地図を",
          "かいて",
          "あげた。"
        ],
        "vi": "Tôi đã vẽ bản đồ cho người bị lạc đường."
      }
    ]
  },
  {
    "id": "te-morau",
    "pattern": "〜てもらう",
    "level": 4,
    "form": "Vて + もらう",
    "meaning": "được (ai) làm cho",
    "note": "Người nói nhờ hoặc được người khác làm gì cho mình.",
    "confusables": [
      "te-kureru",
      "te-ageru"
    ],
    "examples": [
      {
        "ja": "先生に作文を直して＿＿。",
        "answer": "もらいました",
        "pieces": [
          "先生に",
          "作文を",
          "直して",
          "もらいました。"
        ],
        "vi": "Tôi được thầy sửa bài văn cho."
      },
      {
        "ja": "友達に引っ越しを手伝って＿＿。",
        "answer": "もらった",
        "pieces": [
          "友達に",
          "引っ越しを",
          "手伝って",
          "もらった。"
        ],
        "vi": "Tôi được bạn giúp chuyển nhà."
      }
    ]
  },
  {
    "id": "sugiru",
    "pattern": "〜すぎる",
    "level": 4,
    "form": "Vます (bỏ ます) / A (bỏ い) / Na + すぎる",
    "meaning": "quá (mức)",
    "note": "Vượt quá mức bình thường, thường mang nghĩa tiêu cực.",
    "confusables": [],
    "examples": [
      {
        "ja": "昨日は飲み＿＿、頭が痛い。",
        "answer": "すぎて",
        "pieces": [
          "昨日は",
          "飲み",
          "すぎて、",
          "頭が痛い。"
        ],
        "vi": "Hôm qua uống quá nhiều nên đau đầu."
      },
      {
        "ja": "このかばんは高＿＿。",
        "answer": "すぎます",
        "pieces": [
          "この",
          "かばんは",
          "高",
          "すぎます。"
        ],
        "vi": "Cái cặp này đắt quá."
      }
    ]
  },
  {
    "id": "yasui",
    "pattern": "〜やすい",
    "level": 4,
    "form": "Vます (bỏ ます) + やすい",
    "meaning": "dễ (làm)",
    "note": "Việc dễ thực hiện, hoặc dễ xảy ra.",
    "confusables": [
      "nikui"
    ],
    "examples": [
      {
        "ja": "このペンは書き＿＿です。",
        "answer": "やすい",
        "pieces": [
          "このペンは",
          "書き",
          "やすいです。"
        ],
        "vi": "Cây bút này dễ viết."
      },
      {
        "ja": "先生の説明は分かり＿＿。",
        "answer": "やすい",
        "pieces": [
          "先生の説明は",
          "分かり",
          "やすい。"
        ],
        "vi": "Lời giải thích của thầy dễ hiểu."
      }
    ]
  },
  {
    "id": "nikui",
    "pattern": "〜にくい",
    "level": 4,
    "form": "Vます (bỏ ます) + にくい",
    "meaning": "khó (làm)",
    "note": "Việc khó thực hiện.",
    "confusables": [
      "yasui"
    ],
    "examples": [
      {
        "ja": "この靴は歩き＿＿です。",
        "answer": "にくい",
        "pieces": [
          "この",
          "靴は",
          "歩き",
          "にくいです。"
        ],
        "vi": "Đôi giày này khó đi."
      },
      {
        "ja": "字が小さくて、読み＿＿。",
        "answer": "にくい",
        "pieces": [
          "字が小さくて、",
          "読み",
          "にくい。"
        ],
        "vi": "Chữ nhỏ nên khó đọc."
      }
    ]
  },
  {
    "id": "hajimeru",
    "pattern": "〜はじめる",
    "level": 4,
    "form": "Vます (bỏ ます) + はじめる",
    "meaning": "bắt đầu (làm)",
    "note": "Bắt đầu một hành động hoặc một sự thay đổi.",
    "confusables": [
      "owaru",
      "tsuzukeru"
    ],
    "examples": [
      {
        "ja": "去年から日本語を習い＿＿。",
        "answer": "はじめました",
        "pieces": [
          "去年から",
          "日本語を",
          "習い",
          "はじめました。"
        ],
        "vi": "Tôi bắt đầu học tiếng Nhật từ năm ngoái."
      },
      {
        "ja": "急に雨が降り＿＿。",
        "answer": "はじめた",
        "pieces": [
          "急に",
          "雨が",
          "降り",
          "はじめた。"
        ],
        "vi": "Đột nhiên trời bắt đầu mưa."
      }
    ]
  },
  {
    "id": "owaru",
    "pattern": "〜おわる",
    "level": 4,
    "form": "Vます (bỏ ます) + おわる",
    "meaning": "làm xong",
    "note": "Hoàn thành một hành động có độ dài nhất định.",
    "confusables": [
      "hajimeru"
    ],
    "examples": [
      {
        "ja": "この本をやっと読み＿＿。",
        "answer": "おわりました",
        "pieces": [
          "この本を",
          "やっと",
          "読み",
          "おわりました。"
        ],
        "vi": "Cuối cùng tôi đã đọc xong cuốn sách này."
      },
      {
        "ja": "レポートを書き＿＿、寝ます。",
        "answer": "おわったら",
        "pieces": [
          "レポートを",
          "書き",
          "おわったら、",
          "寝ます。"
        ],
        "vi": "Viết xong báo cáo thì tôi đi ngủ."
      }
    ]
  },
  {
    "id": "tsuzukeru",
    "pattern": "〜つづける",
    "level": 4,
    "form": "Vます (bỏ ます) + つづける",
    "meaning": "tiếp tục, … mãi",
    "note": "Hành động kéo dài liên tục.",
    "confusables": [
      "hajimeru"
    ],
    "examples": [
      {
        "ja": "朝からずっと歩き＿＿。",
        "answer": "つづけています",
        "pieces": [
          "朝から",
          "ずっと",
          "歩き",
          "つづけています。"
        ],
        "vi": "Từ sáng tôi cứ đi bộ mãi."
      },
      {
        "ja": "彼は十年同じ会社で働き＿＿。",
        "answer": "つづけた",
        "pieces": [
          "彼は",
          "十年",
          "同じ会社で",
          "働き",
          "つづけた。"
        ],
        "vi": "Anh ấy làm liên tục mười năm ở cùng một công ty."
      }
    ]
  },
  {
    "id": "kata",
    "pattern": "〜かた",
    "level": 4,
    "form": "Vます (bỏ ます) + かた",
    "meaning": "cách (làm)",
    "note": "Biến động từ thành danh từ chỉ cách thức làm việc đó.",
    "confusables": [],
    "examples": [
      {
        "ja": "この漢字の読み＿＿を教えてください。",
        "answer": "かた",
        "pieces": [
          "この漢字の",
          "読み",
          "かたを",
          "教えてください。"
        ],
        "vi": "Hãy chỉ tôi cách đọc chữ Hán này."
      },
      {
        "ja": "切符の買い＿＿が分かりません。",
        "answer": "かた",
        "pieces": [
          "切符の",
          "買い",
          "かたが",
          "分かりません。"
        ],
        "vi": "Tôi không biết cách mua vé."
      }
    ]
  },
  {
    "id": "shika-nai",
    "pattern": "〜しか〜ない",
    "level": 4,
    "form": "N + しか + V (phủ định)",
    "meaning": "ngoài … ra không",
    "note": "Nhấn mạnh sự ít ỏi; luôn đi với thể phủ định.",
    "confusables": [],
    "examples": [
      {
        "ja": "かばんにペンが一本＿＿ありません。",
        "answer": "しか",
        "pieces": [
          "かばんに",
          "ペンが一本",
          "しか",
          "ありません。"
        ],
        "vi": "Trong cặp chỉ có mỗi một cây bút."
      },
      {
        "ja": "朝はコーヒー＿＿飲みません。",
        "answer": "しか",
        "pieces": [
          "朝は",
          "コーヒー",
          "しか",
          "飲みません。"
        ],
        "vi": "Buổi sáng tôi chỉ uống cà phê."
      }
    ]
  },
  {
    "id": "ukemi",
    "pattern": "〜られる (bị động)",
    "level": 4,
    "form": "V (thể bị động)",
    "meaning": "bị, được (bị động)",
    "note": "Chủ ngữ chịu tác động của hành động; thường mang sắc thái bị làm phiền.",
    "confusables": [
      "shieki",
      "shieki-ukemi"
    ],
    "examples": [
      {
        "ja": "先生にほめ＿＿。",
        "answer": "られました",
        "pieces": [
          "先生に",
          "ほめ",
          "られました。"
        ],
        "vi": "Tôi được thầy khen."
      },
      {
        "ja": "電車で足を踏ま＿＿。",
        "answer": "れました",
        "pieces": [
          "電車で",
          "足を",
          "踏ま",
          "れました。"
        ],
        "vi": "Tôi bị giẫm chân trên tàu."
      }
    ]
  },
  {
    "id": "shieki",
    "pattern": "〜させる",
    "level": 4,
    "form": "V (thể sai khiến)",
    "meaning": "bắt, cho (sai khiến)",
    "note": "Khiến hoặc cho phép người khác làm gì.",
    "confusables": [
      "ukemi",
      "shieki-ukemi"
    ],
    "examples": [
      {
        "ja": "母は弟に野菜を食べ＿＿。",
        "answer": "させました",
        "pieces": [
          "母は",
          "弟に",
          "野菜を",
          "食べ",
          "させました。"
        ],
        "vi": "Mẹ bắt em trai ăn rau."
      },
      {
        "ja": "子どもを自由に遊ば＿＿。",
        "answer": "せます",
        "pieces": [
          "子どもを",
          "自由に",
          "遊ば",
          "せます。"
        ],
        "vi": "Tôi cho con chơi tự do."
      }
    ]
  },
  {
    "id": "shieki-ukemi",
    "pattern": "〜させられる",
    "level": 4,
    "form": "V (thể sai khiến bị động)",
    "meaning": "bị bắt (làm)",
    "note": "Bị người khác bắt làm việc mình không muốn.",
    "confusables": [
      "shieki",
      "ukemi"
    ],
    "examples": [
      {
        "ja": "子どものころ、毎日ピアノを練習＿＿。",
        "answer": "させられました",
        "pieces": [
          "子どものころ、",
          "毎日",
          "ピアノを",
          "練習",
          "させられました。"
        ],
        "vi": "Hồi nhỏ ngày nào tôi cũng bị bắt luyện piano."
      },
      {
        "ja": "上司にお酒を飲ま＿＿。",
        "answer": "された",
        "pieces": [
          "上司に",
          "お酒を",
          "飲ま",
          "された。"
        ],
        "vi": "Tôi bị sếp bắt uống rượu."
      }
    ]
  },
  {
    "id": "ta-tokoro",
    "pattern": "〜たところだ",
    "level": 4,
    "form": "Vた + ところだ",
    "meaning": "vừa mới (xong)",
    "note": "Hành động vừa kết thúc ngay trước thời điểm nói.",
    "confusables": [
      "ta-bakari"
    ],
    "examples": [
      {
        "ja": "今、家に帰った＿＿です。",
        "answer": "ところ",
        "pieces": [
          "今、",
          "家に",
          "帰った",
          "ところです。"
        ],
        "vi": "Tôi vừa mới về đến nhà."
      },
      {
        "ja": "ちょうど宿題が終わった＿＿です。",
        "answer": "ところ",
        "pieces": [
          "ちょうど",
          "宿題が",
          "終わった",
          "ところです。"
        ],
        "vi": "Tôi vừa làm xong bài tập."
      }
    ]
  },
  {
    "id": "ta-bakari",
    "pattern": "〜たばかりだ",
    "level": 4,
    "form": "Vた + ばかりだ",
    "meaning": "mới … không lâu",
    "note": "Người nói cảm thấy chưa bao lâu kể từ khi hành động xảy ra.",
    "confusables": [
      "ta-tokoro"
    ],
    "examples": [
      {
        "ja": "先月日本に来た＿＿です。",
        "answer": "ばかり",
        "pieces": [
          "先月",
          "日本に",
          "来た",
          "ばかりです。"
        ],
        "vi": "Tôi mới sang Nhật hồi tháng trước."
      },
      {
        "ja": "買った＿＿のかさをなくしました。",
        "answer": "ばかり",
        "pieces": [
          "買った",
          "ばかりの",
          "かさを",
          "なくしました。"
        ],
        "vi": "Tôi làm mất cái ô mới mua."
      }
    ]
  },
  {
    "id": "aida-ni",
    "pattern": "〜間に",
    "level": 4,
    "form": "V (thể thường) / Nの + 間に",
    "meaning": "trong lúc (một thời điểm)",
    "note": "Một việc xảy ra tại một thời điểm nằm trong khoảng thời gian nào đó.",
    "confusables": [
      "nagara"
    ],
    "examples": [
      {
        "ja": "母が寝ている＿＿、掃除をしました。",
        "answer": "間に",
        "pieces": [
          "母が",
          "寝ている",
          "間に、",
          "掃除をしました。"
        ],
        "vi": "Trong lúc mẹ ngủ, tôi đã dọn dẹp."
      },
      {
        "ja": "夏休みの＿＿、運転を習いたい。",
        "answer": "間に",
        "pieces": [
          "夏休みの",
          "間に、",
          "運転を習いたい。"
        ],
        "vi": "Tôi muốn học lái xe trong kỳ nghỉ hè."
      }
    ]
  },
  {
    "id": "naide",
    "pattern": "〜ないで",
    "level": 4,
    "form": "Vない + で",
    "meaning": "không … mà (làm)",
    "note": "Làm hành động sau trong trạng thái không làm hành động trước.",
    "confusables": [],
    "examples": [
      {
        "ja": "かさを持た＿＿、出かけました。",
        "answer": "ないで",
        "pieces": [
          "かさを",
          "持た",
          "ないで、",
          "出かけました。"
        ],
        "vi": "Tôi ra ngoài mà không mang ô."
      },
      {
        "ja": "辞書を使わ＿＿、読んでみてください。",
        "answer": "ないで",
        "pieces": [
          "辞書を",
          "使わ",
          "ないで、",
          "読んでみてください。"
        ],
        "vi": "Hãy thử đọc mà không dùng từ điển."
      }
    ]
  },
  {
    "id": "ka-dou-ka",
    "pattern": "〜かどうか",
    "level": 4,
    "form": "(thể thường) + かどうか",
    "meaning": "có … hay không",
    "note": "Lồng một câu hỏi có/không vào trong câu.",
    "confusables": [],
    "examples": [
      {
        "ja": "明日来られる＿＿分かりません。",
        "answer": "かどうか",
        "pieces": [
          "明日",
          "来られる",
          "かどうか",
          "分かりません。"
        ],
        "vi": "Không biết ngày mai có đến được hay không."
      },
      {
        "ja": "この答えが正しい＿＿、調べてください。",
        "answer": "かどうか",
        "pieces": [
          "この答えが",
          "正しい",
          "かどうか、",
          "調べてください。"
        ],
        "vi": "Hãy kiểm tra xem đáp án này có đúng hay không."
      }
    ]
  },
  {
    "id": "to-iu",
    "pattern": "〜という",
    "level": 4,
    "form": "N + という + N",
    "meaning": "gọi là, tên là",
    "note": "Giới thiệu tên của người, vật mà người nghe có thể chưa biết.",
    "confusables": [],
    "examples": [
      {
        "ja": "「さくら」＿＿店を知っていますか。",
        "answer": "という",
        "pieces": [
          "「さくら」",
          "という",
          "店を",
          "知っていますか。"
        ],
        "vi": "Bạn có biết quán tên là \"Sakura\" không?"
      },
      {
        "ja": "山田＿＿人から電話がありました。",
        "answer": "という",
        "pieces": [
          "山田",
          "という",
          "人から",
          "電話がありました。"
        ],
        "vi": "Có điện thoại từ một người tên là Yamada."
      }
    ]
  },
  {
    "id": "hou-ga-ii",
    "pattern": "〜ほうがいい",
    "level": 4,
    "form": "Vた / Vない + ほうがいい",
    "meaning": "nên",
    "note": "Lời khuyên; dạng Vた nhấn mạnh hơn.",
    "confusables": [
      "tara-dou"
    ],
    "examples": [
      {
        "ja": "熱があるなら、早く寝た＿＿ですよ。",
        "answer": "ほうがいい",
        "pieces": [
          "熱があるなら、",
          "早く",
          "寝た",
          "ほうがいいですよ。"
        ],
        "vi": "Nếu bị sốt thì nên đi ngủ sớm."
      },
      {
        "ja": "夜一人で歩かない＿＿。",
        "answer": "ほうがいい",
        "pieces": [
          "夜",
          "一人で",
          "歩かない",
          "ほうがいい。"
        ],
        "vi": "Không nên đi bộ một mình ban đêm."
      }
    ]
  },
  {
    "id": "mitai",
    "pattern": "〜みたいだ",
    "level": 4,
    "form": "(thể thường) / N + みたいだ",
    "meaning": "giống như (văn nói)",
    "note": "Dạng văn nói của 〜ようだ, dùng để so sánh hoặc phỏng đoán.",
    "confusables": [
      "you-da"
    ],
    "examples": [
      {
        "ja": "外は雨＿＿ですね。",
        "answer": "みたい",
        "pieces": [
          "外は",
          "雨",
          "みたいですね。"
        ],
        "vi": "Bên ngoài hình như đang mưa nhỉ."
      },
      {
        "ja": "彼女の話し方は子ども＿＿だ。",
        "answer": "みたい",
        "pieces": [
          "彼女の話し方は",
          "子ども",
          "みたいだ。"
        ],
        "vi": "Cách nói chuyện của cô ấy giống như trẻ con."
      }
    ]
  },
  {
    "id": "ba-yokatta",
    "pattern": "〜ばよかった",
    "level": 4,
    "form": "V (thể ば) + よかった",
    "meaning": "giá mà … thì tốt",
    "note": "Tiếc nuối vì đã không làm việc gì đó.",
    "confusables": [
      "ba"
    ],
    "examples": [
      {
        "ja": "もっと勉強すれ＿＿。",
        "answer": "ばよかった",
        "pieces": [
          "もっと",
          "勉強すれ",
          "ばよかった。"
        ],
        "vi": "Giá mà học nhiều hơn thì tốt."
      },
      {
        "ja": "かさを持ってくれ＿＿です。",
        "answer": "ばよかった",
        "pieces": [
          "かさを",
          "持ってくれ",
          "ばよかったです。"
        ],
        "vi": "Giá mà mang ô theo thì tốt."
      }
    ]
  },
  {
    "id": "sasete-kudasai",
    "pattern": "〜させてください",
    "level": 4,
    "form": "V (thể sai khiến) て + ください",
    "meaning": "xin cho phép tôi",
    "note": "Xin phép người nghe cho mình làm việc gì.",
    "confusables": [
      "shieki"
    ],
    "examples": [
      {
        "ja": "少し考え＿＿。",
        "answer": "させてください",
        "pieces": [
          "少し",
          "考え",
          "させてください。"
        ],
        "vi": "Xin cho tôi suy nghĩ một chút."
      },
      {
        "ja": "この仕事は私にやら＿＿。",
        "answer": "せてください",
        "pieces": [
          "この仕事は",
          "私に",
          "やら",
          "せてください。"
        ],
        "vi": "Xin hãy để tôi làm công việc này."
      }
    ]
  },
  {
    "id": "garu",
    "pattern": "〜がる",
    "level": 4,
    "form": "A (bỏ い) / Na + がる",
    "meaning": "(người khác) tỏ ra",
    "note": "Diễn tả cảm xúc, mong muốn của người khác qua biểu hiện bên ngoài.",
    "confusables": [],
    "examples": [
      {
        "ja": "妹は犬を怖＿＿。",
        "answer": "がります",
        "pieces": [
          "妹は",
          "犬を",
          "怖",
          "がります。"
        ],
        "vi": "Em gái tôi sợ chó."
      },
      {
        "ja": "子どもが新しいゲームをほし＿＿。",
        "answer": "がっている",
        "pieces": [
          "子どもが",
          "新しいゲームを",
          "ほし",
          "がっている。"
        ],
        "vi": "Đứa trẻ đang muốn có trò chơi mới."
      }
    ]
  },
  {
    "id": "nasai",
    "pattern": "〜なさい",
    "level": 4,
    "form": "Vます (bỏ ます) + なさい",
    "meaning": "hãy … đi (ra lệnh)",
    "note": "Mệnh lệnh của cha mẹ, thầy cô với con cái, học sinh.",
    "confusables": [],
    "examples": [
      {
        "ja": "早く起き＿＿。",
        "answer": "なさい",
        "pieces": [
          "早く",
          "起き",
          "なさい。"
        ],
        "vi": "Dậy mau lên!"
      },
      {
        "ja": "次の質問に答え＿＿。",
        "answer": "なさい",
        "pieces": [
          "次の",
          "質問に",
          "答え",
          "なさい。"
        ],
        "vi": "Hãy trả lời câu hỏi sau."
      }
    ]
  },
  {
    "id": "tara-dou",
    "pattern": "〜たらどうですか",
    "level": 4,
    "form": "Vた + らどうですか",
    "meaning": "… thì sao, thử … xem",
    "note": "Đưa ra gợi ý, lời khuyên nhẹ nhàng.",
    "confusables": [
      "hou-ga-ii",
      "te-miru"
    ],
    "examples": [
      {
        "ja": "医者に行っ＿＿。",
        "answer": "たらどうですか",
        "pieces": [
          "医者に",
          "行っ",
          "たらどうですか。"
        ],
        "vi": "Đi khám bác sĩ thì sao?"
      },
      {
        "ja": "先生に聞いてみ＿＿？",
        "answer": "たらどう",
        "pieces": [
          "先生に",
          "聞いてみ",
          "たらどう？"
        ],
        "vi": "Thử hỏi thầy xem sao?"
      }
    ]
  },
  {
    "id": "tai",
    "pattern": "〜たい",
    "level": 5,
    "form": "Vます (bỏ ます) + たい",
    "meaning": "muốn (làm)",
    "note": "Mong muốn của chính người nói; hỏi người khác chỉ dùng với người thân quen.",
    "confusables": [
      "ga-hoshii"
    ],
    "examples": [
      {
        "ja": "冷たい水が飲み＿＿です。",
        "answer": "たい",
        "pieces": [
          "冷たい",
          "水が",
          "飲み",
          "たいです。"
        ],
        "vi": "Tôi muốn uống nước lạnh."
      },
      {
        "ja": "週末は海へ行き＿＿。",
        "answer": "たい",
        "pieces": [
          "週末は",
          "海へ",
          "行き",
          "たい。"
        ],
        "vi": "Cuối tuần tôi muốn đi biển."
      }
    ]
  },
  {
    "id": "te-kudasai",
    "pattern": "〜てください",
    "level": 5,
    "form": "Vて + ください",
    "meaning": "xin hãy, làm ơn",
    "note": "Nhờ hoặc yêu cầu người nghe làm gì một cách lịch sự.",
    "confusables": [
      "naide-kudasai",
      "nasai"
    ],
    "examples": [
      {
        "ja": "ここに名前を書いて＿＿。",
        "answer": "ください",
        "pieces": [
          "ここに",
          "名前を",
          "書いて",
          "ください。"
        ],
        "vi": "Xin hãy viết tên vào đây."
      },
      {
        "ja": "もう一度ゆっくり言って＿＿。",
        "answer": "ください",
        "pieces": [
          "もう一度",
          "ゆっくり",
          "言って",
          "ください。"
        ],
        "vi": "Làm ơn nói lại một lần nữa thật chậm."
      }
    ]
  },
  {
    "id": "masen-ka",
    "pattern": "〜ませんか",
    "level": 5,
    "form": "Vます (bỏ ます) + ませんか",
    "meaning": "cùng … không (rủ rê)",
    "note": "Mời, rủ người nghe một cách lịch sự, tôn trọng ý của họ.",
    "confusables": [
      "mashou"
    ],
    "examples": [
      {
        "ja": "一緒に映画を見＿＿。",
        "answer": "ませんか",
        "pieces": [
          "一緒に",
          "映画を",
          "見",
          "ませんか。"
        ],
        "vi": "Cùng xem phim không?"
      },
      {
        "ja": "日曜日、テニスをし＿＿。",
        "answer": "ませんか",
        "pieces": [
          "日曜日、",
          "テニスを",
          "し",
          "ませんか。"
        ],
        "vi": "Chủ nhật cùng chơi tennis không?"
      }
    ]
  },
  {
    "id": "mashou",
    "pattern": "〜ましょう",
    "level": 5,
    "form": "Vます (bỏ ます) + ましょう",
    "meaning": "cùng … nào",
    "note": "Rủ rê một cách tích cực, hoặc đáp lại lời rủ.",
    "confusables": [
      "masen-ka",
      "mashou-ka"
    ],
    "examples": [
      {
        "ja": "少し休み＿＿。",
        "answer": "ましょう",
        "pieces": [
          "少し",
          "休み",
          "ましょう。"
        ],
        "vi": "Cùng nghỉ một chút nào."
      },
      {
        "ja": "駅の前で会い＿＿。",
        "answer": "ましょう",
        "pieces": [
          "駅の前で",
          "会い",
          "ましょう。"
        ],
        "vi": "Mình gặp nhau trước ga nhé."
      }
    ]
  },
  {
    "id": "mashou-ka",
    "pattern": "〜ましょうか",
    "level": 5,
    "form": "Vます (bỏ ます) + ましょうか",
    "meaning": "để tôi … nhé",
    "note": "Đề nghị giúp đỡ người nghe.",
    "confusables": [
      "mashou"
    ],
    "examples": [
      {
        "ja": "荷物を持ち＿＿。",
        "answer": "ましょうか",
        "pieces": [
          "荷物を",
          "持ち",
          "ましょうか。"
        ],
        "vi": "Để tôi xách hành lý giúp nhé?"
      },
      {
        "ja": "窓を開け＿＿。",
        "answer": "ましょうか",
        "pieces": [
          "窓を",
          "開け",
          "ましょうか。"
        ],
        "vi": "Để tôi mở cửa sổ nhé?"
      }
    ]
  },
  {
    "id": "kara-riyuu",
    "pattern": "〜から (lý do)",
    "level": 5,
    "form": "(thể thường / lịch sự) + から",
    "meaning": "bởi vì",
    "note": "Nêu lý do mang tính chủ quan; vế sau dùng được ý chí, mệnh lệnh.",
    "confusables": [
      "node"
    ],
    "examples": [
      {
        "ja": "暑い＿＿、窓を開けます。",
        "answer": "から",
        "pieces": [
          "暑い",
          "から、",
          "窓を開けます。"
        ],
        "vi": "Vì nóng nên tôi mở cửa sổ."
      },
      {
        "ja": "時間がない＿＿、タクシーで行きましょう。",
        "answer": "から",
        "pieces": [
          "時間が",
          "ない",
          "から、",
          "タクシーで行きましょう。"
        ],
        "vi": "Vì không có thời gian nên đi taxi thôi."
      }
    ]
  },
  {
    "id": "kara-made",
    "pattern": "〜から〜まで",
    "level": 5,
    "form": "N + から + N + まで",
    "meaning": "từ … đến",
    "note": "Điểm bắt đầu và kết thúc về thời gian hoặc nơi chốn.",
    "confusables": [],
    "examples": [
      {
        "ja": "九時＿＿五時まで働きます。",
        "answer": "から",
        "pieces": [
          "九時",
          "から",
          "五時まで",
          "働きます。"
        ],
        "vi": "Tôi làm việc từ 9 giờ đến 5 giờ."
      },
      {
        "ja": "家＿＿駅まで歩きます。",
        "answer": "から",
        "pieces": [
          "家",
          "から",
          "駅まで",
          "歩きます。"
        ],
        "vi": "Tôi đi bộ từ nhà đến ga."
      }
    ]
  },
  {
    "id": "yori-hou",
    "pattern": "〜より〜のほうが",
    "level": 5,
    "form": "N1 + より + N2 + のほうが",
    "meaning": "so với … thì … hơn",
    "note": "So sánh hai thứ; vế có のほうが là thứ hơn.",
    "confusables": [
      "ichiban",
      "hodo-nai"
    ],
    "examples": [
      {
        "ja": "バス＿＿電車のほうが速いです。",
        "answer": "より",
        "pieces": [
          "バス",
          "より",
          "電車のほうが",
          "速いです。"
        ],
        "vi": "Tàu điện nhanh hơn xe buýt."
      },
      {
        "ja": "肉＿＿魚のほうが好きです。",
        "answer": "より",
        "pieces": [
          "肉",
          "より",
          "魚のほうが",
          "好きです。"
        ],
        "vi": "Tôi thích cá hơn thịt."
      }
    ]
  },
  {
    "id": "ichiban",
    "pattern": "〜で一番",
    "level": 5,
    "form": "N (phạm vi) + で + N + が一番",
    "meaning": "nhất (trong phạm vi)",
    "note": "So sánh nhất trong một nhóm.",
    "confusables": [
      "yori-hou"
    ],
    "examples": [
      {
        "ja": "クラスで田中さんが＿＿背が高いです。",
        "answer": "一番",
        "pieces": [
          "クラスで",
          "田中さんが",
          "一番",
          "背が高いです。"
        ],
        "vi": "Trong lớp, anh Tanaka cao nhất."
      },
      {
        "ja": "果物の中でりんごが＿＿好きです。",
        "answer": "一番",
        "pieces": [
          "果物の中で",
          "りんごが",
          "一番",
          "好きです。"
        ],
        "vi": "Trong các loại trái cây, tôi thích táo nhất."
      }
    ]
  },
  {
    "id": "ta-koto-ga-aru",
    "pattern": "〜たことがある",
    "level": 5,
    "form": "Vた + ことがある",
    "meaning": "đã từng",
    "note": "Kinh nghiệm trong quá khứ.",
    "confusables": [],
    "examples": [
      {
        "ja": "富士山に登った＿＿。",
        "answer": "ことがあります",
        "pieces": [
          "富士山に",
          "登った",
          "ことがあります。"
        ],
        "vi": "Tôi đã từng leo núi Phú Sĩ."
      },
      {
        "ja": "すしを食べた＿＿。",
        "answer": "ことがありますか",
        "pieces": [
          "すしを",
          "食べた",
          "ことがありますか。"
        ],
        "vi": "Bạn đã từng ăn sushi chưa?"
      }
    ]
  },
  {
    "id": "tari",
    "pattern": "〜たり〜たりする",
    "level": 5,
    "form": "Vた + り、Vた + り + する",
    "meaning": "lúc thì … lúc thì",
    "note": "Liệt kê vài hành động tiêu biểu, không theo thứ tự.",
    "confusables": [],
    "examples": [
      {
        "ja": "休みの日は本を読ん＿＿、映画を見たりします。",
        "answer": "だり",
        "pieces": [
          "休みの日は",
          "本を読ん",
          "だり、",
          "映画を見たり",
          "します。"
        ],
        "vi": "Ngày nghỉ tôi lúc thì đọc sách, lúc thì xem phim."
      },
      {
        "ja": "週末は掃除をし＿＿、買い物をしたりしました。",
        "answer": "たり",
        "pieces": [
          "週末は",
          "掃除をし",
          "たり、",
          "買い物をしたり",
          "しました。"
        ],
        "vi": "Cuối tuần tôi dọn dẹp, đi mua sắm các thứ."
      }
    ]
  },
  {
    "id": "te-mo-ii",
    "pattern": "〜てもいい",
    "level": 5,
    "form": "Vて + もいい",
    "meaning": "được phép, … cũng được",
    "note": "Cho phép hoặc xin phép.",
    "confusables": [
      "te-wa-ikenai",
      "nakute-mo-ii"
    ],
    "examples": [
      {
        "ja": "ここでたばこを吸って＿＿ですか。",
        "answer": "もいい",
        "pieces": [
          "ここで",
          "たばこを",
          "吸って",
          "もいいですか。"
        ],
        "vi": "Tôi hút thuốc ở đây được không?"
      },
      {
        "ja": "このペンを使って＿＿ですよ。",
        "answer": "もいい",
        "pieces": [
          "このペンを",
          "使って",
          "もいいですよ。"
        ],
        "vi": "Bạn dùng cây bút này cũng được."
      }
    ]
  },
  {
    "id": "te-wa-ikenai",
    "pattern": "〜てはいけない",
    "level": 5,
    "form": "Vて + はいけない",
    "meaning": "không được (cấm)",
    "note": "Cấm đoán, quy định.",
    "confusables": [
      "te-mo-ii"
    ],
    "examples": [
      {
        "ja": "ここで写真を撮って＿＿。",
        "answer": "はいけません",
        "pieces": [
          "ここで",
          "写真を",
          "撮って",
          "はいけません。"
        ],
        "vi": "Không được chụp ảnh ở đây."
      },
      {
        "ja": "授業中に寝て＿＿。",
        "answer": "はいけない",
        "pieces": [
          "授業中に",
          "寝て",
          "はいけない。"
        ],
        "vi": "Không được ngủ trong giờ học."
      }
    ]
  },
  {
    "id": "te-iru",
    "pattern": "〜ている",
    "level": 5,
    "form": "Vて + いる",
    "meaning": "đang (làm)",
    "note": "Hành động đang diễn ra hoặc trạng thái kéo dài.",
    "confusables": [],
    "examples": [
      {
        "ja": "今、雨が降って＿＿。",
        "answer": "います",
        "pieces": [
          "今、",
          "雨が",
          "降って",
          "います。"
        ],
        "vi": "Bây giờ trời đang mưa."
      },
      {
        "ja": "弟は部屋で寝て＿＿。",
        "answer": "いる",
        "pieces": [
          "弟は",
          "部屋で",
          "寝て",
          "いる。"
        ],
        "vi": "Em trai đang ngủ trong phòng."
      }
    ]
  },
  {
    "id": "mae-ni",
    "pattern": "〜前に",
    "level": 5,
    "form": "V (từ điển) / Nの + 前に",
    "meaning": "trước khi",
    "note": "Hành động ở vế sau diễn ra trước hành động ở vế trước.",
    "confusables": [
      "ta-ato-de",
      "te-kara"
    ],
    "examples": [
      {
        "ja": "寝る＿＿、歯をみがきます。",
        "answer": "前に",
        "pieces": [
          "寝る",
          "前に、",
          "歯をみがきます。"
        ],
        "vi": "Tôi đánh răng trước khi đi ngủ."
      },
      {
        "ja": "食事の＿＿、手を洗いましょう。",
        "answer": "前に",
        "pieces": [
          "食事の",
          "前に、",
          "手を洗いましょう。"
        ],
        "vi": "Hãy rửa tay trước bữa ăn."
      }
    ]
  },
  {
    "id": "ta-ato-de",
    "pattern": "〜たあとで",
    "level": 5,
    "form": "Vた / Nの + あとで",
    "meaning": "sau khi",
    "note": "Hành động ở vế sau xảy ra sau hành động ở vế trước.",
    "confusables": [
      "mae-ni",
      "te-kara"
    ],
    "examples": [
      {
        "ja": "仕事が終わった＿＿、飲みに行きます。",
        "answer": "あとで",
        "pieces": [
          "仕事が終わった",
          "あとで、",
          "飲みに行きます。"
        ],
        "vi": "Sau khi xong việc, tôi đi uống."
      },
      {
        "ja": "授業の＿＿、先生に質問しました。",
        "answer": "あとで",
        "pieces": [
          "授業の",
          "あとで、",
          "先生に質問しました。"
        ],
        "vi": "Sau giờ học, tôi đã hỏi thầy."
      }
    ]
  },
  {
    "id": "te-kara",
    "pattern": "〜てから",
    "level": 5,
    "form": "Vて + から",
    "meaning": "… xong rồi mới",
    "note": "Nhấn mạnh thứ tự: làm xong việc trước rồi mới làm việc sau.",
    "confusables": [
      "ta-ato-de",
      "mae-ni"
    ],
    "examples": [
      {
        "ja": "宿題をして＿＿、遊びます。",
        "answer": "から",
        "pieces": [
          "宿題をして",
          "から、",
          "遊びます。"
        ],
        "vi": "Làm bài tập xong rồi mới chơi."
      },
      {
        "ja": "電話して＿＿、来てください。",
        "answer": "から",
        "pieces": [
          "電話して",
          "から、",
          "来てください。"
        ],
        "vi": "Hãy gọi điện xong rồi mới đến."
      }
    ]
  },
  {
    "id": "naide-kudasai",
    "pattern": "〜ないでください",
    "level": 5,
    "form": "Vない + でください",
    "meaning": "xin đừng",
    "note": "Yêu cầu người nghe không làm việc gì.",
    "confusables": [
      "te-kudasai"
    ],
    "examples": [
      {
        "ja": "ここに車を止め＿＿。",
        "answer": "ないでください",
        "pieces": [
          "ここに",
          "車を",
          "止め",
          "ないでください。"
        ],
        "vi": "Xin đừng đỗ xe ở đây."
      },
      {
        "ja": "どうぞ心配し＿＿。",
        "answer": "ないでください",
        "pieces": [
          "どうぞ",
          "心配し",
          "ないでください。"
        ],
        "vi": "Xin đừng lo lắng."
      }
    ]
  },
  {
    "id": "ga-hoshii",
    "pattern": "〜がほしい",
    "level": 5,
    "form": "N + が + ほしい",
    "meaning": "muốn có",
    "note": "Mong muốn sở hữu một vật; dùng cho bản thân người nói.",
    "confusables": [
      "tai"
    ],
    "examples": [
      {
        "ja": "新しいパソコンが＿＿です。",
        "answer": "ほしい",
        "pieces": [
          "新しい",
          "パソコンが",
          "ほしいです。"
        ],
        "vi": "Tôi muốn có máy tính mới."
      },
      {
        "ja": "今、何が一番＿＿ですか。",
        "answer": "ほしい",
        "pieces": [
          "今、",
          "何が",
          "一番",
          "ほしいですか。"
        ],
        "vi": "Bây giờ bạn muốn có gì nhất?"
      }
    ]
  },
  {
    "id": "ni-iku",
    "pattern": "〜に行く (mục đích)",
    "level": 5,
    "form": "Vます (bỏ ます) / N + に + 行く・来る",
    "meaning": "đi … để (mục đích)",
    "note": "Đi hoặc đến đâu đó để làm việc gì.",
    "confusables": [],
    "examples": [
      {
        "ja": "デパートへかばんを買い＿＿行きます。",
        "answer": "に",
        "pieces": [
          "デパートへ",
          "かばんを",
          "買い",
          "に",
          "行きます。"
        ],
        "vi": "Tôi đến trung tâm thương mại để mua cặp."
      },
      {
        "ja": "日本へ経済を勉強し＿＿来ました。",
        "answer": "に",
        "pieces": [
          "日本へ",
          "経済を",
          "勉強し",
          "に",
          "来ました。"
        ],
        "vi": "Tôi sang Nhật để học kinh tế."
      }
    ]
  },
  {
    "id": "deshou",
    "pattern": "〜でしょう",
    "level": 5,
    "form": "(thể thường) + でしょう",
    "meaning": "chắc là",
    "note": "Phỏng đoán, hoặc hỏi xác nhận nhẹ nhàng.",
    "confusables": [
      "kamoshirenai"
    ],
    "examples": [
      {
        "ja": "明日は晴れる＿＿。",
        "answer": "でしょう",
        "pieces": [
          "明日は",
          "晴れる",
          "でしょう。"
        ],
        "vi": "Ngày mai chắc là trời nắng."
      },
      {
        "ja": "あの人はたぶん学生＿＿。",
        "answer": "でしょう",
        "pieces": [
          "あの人は",
          "たぶん",
          "学生",
          "でしょう。"
        ],
        "vi": "Người đó chắc là sinh viên."
      }
    ]
  },
  {
    "id": "ga-suki",
    "pattern": "〜が好き",
    "level": 5,
    "form": "N + が + 好きだ",
    "meaning": "thích",
    "note": "Nói về sở thích; đối tượng đi với が, không dùng を.",
    "confusables": [
      "ga-jouzu"
    ],
    "examples": [
      {
        "ja": "私は音楽＿＿好きです。",
        "answer": "が",
        "pieces": [
          "私は",
          "音楽",
          "が",
          "好きです。"
        ],
        "vi": "Tôi thích âm nhạc."
      },
      {
        "ja": "妹はねこ＿＿大好きです。",
        "answer": "が",
        "pieces": [
          "妹は",
          "ねこ",
          "が",
          "大好きです。"
        ],
        "vi": "Em gái tôi rất thích mèo."
      }
    ]
  },
  {
    "id": "ga-jouzu",
    "pattern": "〜が上手",
    "level": 5,
    "form": "N + が + 上手だ",
    "meaning": "giỏi (kỹ năng)",
    "note": "Khen kỹ năng của người khác; nói về mình thì dùng 得意.",
    "confusables": [
      "ga-suki"
    ],
    "examples": [
      {
        "ja": "リンさんは料理が＿＿です。",
        "answer": "上手",
        "pieces": [
          "リンさんは",
          "料理が",
          "上手です。"
        ],
        "vi": "Chị Linh nấu ăn giỏi."
      },
      {
        "ja": "兄は歌がとても＿＿だ。",
        "answer": "上手",
        "pieces": [
          "兄は",
          "歌が",
          "とても",
          "上手だ。"
        ],
        "vi": "Anh trai tôi hát rất hay."
      }
    ]
  },
  {
    "id": "mada-te-inai",
    "pattern": "まだ〜ていない",
    "level": 5,
    "form": "まだ + Vて + いない",
    "meaning": "vẫn chưa",
    "note": "Việc dự định làm nhưng đến lúc nói vẫn chưa làm.",
    "confusables": [
      "mou-ta"
    ],
    "examples": [
      {
        "ja": "レポートは＿＿書いていません。",
        "answer": "まだ",
        "pieces": [
          "レポートは",
          "まだ",
          "書いて",
          "いません。"
        ],
        "vi": "Tôi vẫn chưa viết báo cáo."
      },
      {
        "ja": "その映画は＿＿見ていません。",
        "answer": "まだ",
        "pieces": [
          "その映画は",
          "まだ",
          "見て",
          "いません。"
        ],
        "vi": "Tôi vẫn chưa xem bộ phim đó."
      }
    ]
  },
  {
    "id": "mou-ta",
    "pattern": "もう〜た",
    "level": 5,
    "form": "もう + Vました / Vた",
    "meaning": "đã … rồi",
    "note": "Việc đã hoàn thành tính đến lúc nói.",
    "confusables": [
      "mada-te-inai"
    ],
    "examples": [
      {
        "ja": "宿題は＿＿終わりました。",
        "answer": "もう",
        "pieces": [
          "宿題は",
          "もう",
          "終わりました。"
        ],
        "vi": "Bài tập tôi đã làm xong rồi."
      },
      {
        "ja": "バスは＿＿出ました。",
        "answer": "もう",
        "pieces": [
          "バスは",
          "もう",
          "出ました。"
        ],
        "vi": "Xe buýt đã chạy rồi."
      }
    ]
  },
  {
    "id": "ni-naru",
    "pattern": "〜になる・〜くなる",
    "level": 5,
    "form": "N / Na + に + なる; A (bỏ い) + く + なる",
    "meaning": "trở thành",
    "note": "Sự thay đổi trạng thái.",
    "confusables": [
      "you-ni-naru"
    ],
    "examples": [
      {
        "ja": "将来、医者＿＿なりたいです。",
        "answer": "に",
        "pieces": [
          "将来、",
          "医者",
          "に",
          "なりたいです。"
        ],
        "vi": "Tương lai tôi muốn trở thành bác sĩ."
      },
      {
        "ja": "部屋がきれい＿＿なりました。",
        "answer": "に",
        "pieces": [
          "部屋が",
          "きれい",
          "に",
          "なりました。"
        ],
        "vi": "Căn phòng đã sạch sẽ rồi."
      }
    ]
  },
  {
    "id": "to-omou",
    "pattern": "〜と思う",
    "level": 5,
    "form": "(thể thường) + と思う",
    "meaning": "nghĩ rằng",
    "note": "Nêu ý kiến hoặc phỏng đoán của người nói.",
    "confusables": [
      "to-iimasu"
    ],
    "examples": [
      {
        "ja": "この本はおもしろい＿＿。",
        "answer": "と思います",
        "pieces": [
          "この本は",
          "おもしろい",
          "と思います。"
        ],
        "vi": "Tôi nghĩ cuốn sách này hay."
      },
      {
        "ja": "明日は雨が降る＿＿。",
        "answer": "と思います",
        "pieces": [
          "明日は",
          "雨が降る",
          "と思います。"
        ],
        "vi": "Tôi nghĩ ngày mai trời mưa."
      }
    ]
  },
  {
    "id": "to-iimasu",
    "pattern": "〜と言う",
    "level": 5,
    "form": "(trích dẫn) + と言う",
    "meaning": "nói rằng",
    "note": "Trích dẫn lời nói của ai đó.",
    "confusables": [
      "to-omou"
    ],
    "examples": [
      {
        "ja": "先生は明日テストがある＿＿。",
        "answer": "と言いました",
        "pieces": [
          "先生は",
          "明日テストがある",
          "と言いました。"
        ],
        "vi": "Thầy nói rằng ngày mai có bài kiểm tra."
      },
      {
        "ja": "母は早く帰りなさい＿＿。",
        "answer": "と言った",
        "pieces": [
          "母は",
          "早く帰りなさい",
          "と言った。"
        ],
        "vi": "Mẹ bảo tôi về sớm."
      }
    ]
  },
  {
    "id": "toki",
    "pattern": "〜とき",
    "level": 5,
    "form": "V / Aい / Naな / Nの + とき",
    "meaning": "khi",
    "note": "Thời điểm xảy ra hành động hoặc trạng thái.",
    "confusables": [
      "mae-ni"
    ],
    "examples": [
      {
        "ja": "子どもの＿＿、海の近くに住んでいました。",
        "answer": "とき",
        "pieces": [
          "子どもの",
          "とき、",
          "海の近くに住んでいました。"
        ],
        "vi": "Khi còn nhỏ, tôi sống gần biển."
      },
      {
        "ja": "道が分からない＿＿、地図を見ます。",
        "answer": "とき",
        "pieces": [
          "道が",
          "分からない",
          "とき、",
          "地図を見ます。"
        ],
        "vi": "Khi không biết đường, tôi xem bản đồ."
      }
    ]
  },
  {
    "id": "dake",
    "pattern": "〜だけ",
    "level": 5,
    "form": "N / (thể thường) + だけ",
    "meaning": "chỉ",
    "note": "Giới hạn phạm vi; dùng được với câu khẳng định.",
    "confusables": [
      "shika-nai"
    ],
    "examples": [
      {
        "ja": "昨日は三時間＿＿寝ました。",
        "answer": "だけ",
        "pieces": [
          "昨日は",
          "三時間",
          "だけ",
          "寝ました。"
        ],
        "vi": "Hôm qua tôi chỉ ngủ ba tiếng."
      },
      {
        "ja": "一つ＿＿質問があります。",
        "answer": "だけ",
        "pieces": [
          "一つ",
          "だけ",
          "質問があります。"
        ],
        "vi": "Tôi chỉ có một câu hỏi."
      }
    ]
  },
  {
    "id": "mo",
    "pattern": "〜も",
    "level": 5,
    "form": "N + も",
    "meaning": "cũng",
    "note": "Thêm một đối tượng giống với điều đã nói.",
    "confusables": [],
    "examples": [
      {
        "ja": "私＿＿学生です。",
        "answer": "も",
        "pieces": [
          "私",
          "も",
          "学生です。"
        ],
        "vi": "Tôi cũng là sinh viên."
      },
      {
        "ja": "姉は英語＿＿話せます。",
        "answer": "も",
        "pieces": [
          "姉は",
          "英語",
          "も",
          "話せます。"
        ],
        "vi": "Chị tôi cũng nói được tiếng Anh."
      }
    ]
  },
  {
    "id": "de-basho",
    "pattern": "〜で (nơi chốn)",
    "level": 5,
    "form": "N (nơi chốn) + で",
    "meaning": "tại (nơi diễn ra hành động)",
    "note": "Nơi mà hành động diễn ra.",
    "confusables": [
      "ni-ga-aru",
      "de-shudan"
    ],
    "examples": [
      {
        "ja": "図書館＿＿勉強します。",
        "answer": "で",
        "pieces": [
          "図書館",
          "で",
          "勉強します。"
        ],
        "vi": "Tôi học ở thư viện."
      },
      {
        "ja": "公園＿＿子どもが遊んでいます。",
        "answer": "で",
        "pieces": [
          "公園",
          "で",
          "子どもが",
          "遊んでいます。"
        ],
        "vi": "Trẻ con đang chơi ở công viên."
      }
    ]
  },
  {
    "id": "de-shudan",
    "pattern": "〜で (phương tiện)",
    "level": 5,
    "form": "N (phương tiện) + で",
    "meaning": "bằng (phương tiện)",
    "note": "Phương tiện, công cụ hoặc cách thức.",
    "confusables": [
      "de-basho"
    ],
    "examples": [
      {
        "ja": "毎日自転車＿＿学校へ行きます。",
        "answer": "で",
        "pieces": [
          "毎日",
          "自転車",
          "で",
          "学校へ行きます。"
        ],
        "vi": "Ngày nào tôi cũng đi học bằng xe đạp."
      },
      {
        "ja": "日本語＿＿手紙を書きました。",
        "answer": "で",
        "pieces": [
          "日本語",
          "で",
          "手紙を書きました。"
        ],
        "vi": "Tôi đã viết thư bằng tiếng Nhật."
      }
    ]
  },
  {
    "id": "ni-jikan",
    "pattern": "〜に (thời điểm)",
    "level": 5,
    "form": "N (thời điểm) + に",
    "meaning": "vào (thời điểm)",
    "note": "Thời điểm cụ thể xảy ra hành động.",
    "confusables": [],
    "examples": [
      {
        "ja": "毎朝六時＿＿起きます。",
        "answer": "に",
        "pieces": [
          "毎朝",
          "六時",
          "に",
          "起きます。"
        ],
        "vi": "Mỗi sáng tôi dậy lúc 6 giờ."
      },
      {
        "ja": "日曜日＿＿友達と会います。",
        "answer": "に",
        "pieces": [
          "日曜日",
          "に",
          "友達と会います。"
        ],
        "vi": "Tôi gặp bạn vào chủ nhật."
      }
    ]
  },
  {
    "id": "to-issho",
    "pattern": "〜と (cùng với)",
    "level": 5,
    "form": "N + と (一緒に)",
    "meaning": "cùng với",
    "note": "Người cùng làm hành động.",
    "confusables": [],
    "examples": [
      {
        "ja": "家族＿＿旅行しました。",
        "answer": "と",
        "pieces": [
          "家族",
          "と",
          "旅行しました。"
        ],
        "vi": "Tôi đã đi du lịch cùng gia đình."
      },
      {
        "ja": "友達＿＿一緒に勉強します。",
        "answer": "と",
        "pieces": [
          "友達",
          "と",
          "一緒に",
          "勉強します。"
        ],
        "vi": "Tôi học cùng với bạn."
      }
    ]
  },
  {
    "id": "ya-nado",
    "pattern": "〜や〜など",
    "level": 5,
    "form": "N1 + や + N2 + など",
    "meaning": "và … v.v.",
    "note": "Liệt kê vài ví dụ tiêu biểu, ngụ ý vẫn còn nữa.",
    "confusables": [],
    "examples": [
      {
        "ja": "かばんに本＿＿ノートなどがあります。",
        "answer": "や",
        "pieces": [
          "かばんに",
          "本",
          "や",
          "ノートなどが",
          "あります。"
        ],
        "vi": "Trong cặp có sách, vở, v.v."
      },
      {
        "ja": "りんご＿＿バナナを買いました。",
        "answer": "や",
        "pieces": [
          "りんご",
          "や",
          "バナナを",
          "買いました。"
        ],
        "vi": "Tôi đã mua táo, chuối các thứ."
      }
    ]
  },
  {
    "id": "ka-ka",
    "pattern": "〜か〜",
    "level": 5,
    "form": "N1 + か + N2",
    "meaning": "hoặc, hay (lựa chọn)",
    "note": "Chọn một trong hai hay nhiều thứ.",
    "confusables": [],
    "examples": [
      {
        "ja": "コーヒー＿＿紅茶をお願いします。",
        "answer": "か",
        "pieces": [
          "コーヒー",
          "か",
          "紅茶を",
          "お願いします。"
        ],
        "vi": "Cho tôi cà phê hoặc trà đen."
      },
      {
        "ja": "バス＿＿電車で行きます。",
        "answer": "か",
        "pieces": [
          "バス",
          "か",
          "電車で",
          "行きます。"
        ],
        "vi": "Tôi đi bằng xe buýt hoặc tàu điện."
      }
    ]
  },
  {
    "id": "kute",
    "pattern": "〜くて・〜で",
    "level": 5,
    "form": "A (bỏ い) + くて / Na・N + で",
    "meaning": "… và (nối tính từ)",
    "note": "Nối hai tính từ, hoặc nêu lý do nhẹ.",
    "confusables": [],
    "examples": [
      {
        "ja": "この部屋は広＿＿、明るいです。",
        "answer": "くて",
        "pieces": [
          "この部屋は",
          "広",
          "くて、",
          "明るいです。"
        ],
        "vi": "Căn phòng này rộng và sáng."
      },
      {
        "ja": "彼はやさし＿＿、おもしろい人です。",
        "answer": "くて",
        "pieces": [
          "彼は",
          "やさし",
          "くて、",
          "おもしろい人です。"
        ],
        "vi": "Anh ấy là người hiền và vui tính."
      }
    ]
  },
  {
    "id": "ga-demo",
    "pattern": "〜が (nhưng)",
    "level": 5,
    "form": "(câu) + が、(câu)",
    "meaning": "nhưng",
    "note": "Nối hai vế đối lập; lịch sự hơn けど.",
    "confusables": [
      "noni"
    ],
    "examples": [
      {
        "ja": "この店は高いです＿＿、おいしいです。",
        "answer": "が",
        "pieces": [
          "この店は",
          "高いです",
          "が、",
          "おいしいです。"
        ],
        "vi": "Quán này đắt nhưng ngon."
      },
      {
        "ja": "日本語は難しいです＿＿、おもしろいです。",
        "answer": "が",
        "pieces": [
          "日本語は",
          "難しいです",
          "が、",
          "おもしろいです。"
        ],
        "vi": "Tiếng Nhật khó nhưng thú vị."
      }
    ]
  },
  {
    "id": "ni-suru",
    "pattern": "〜にする",
    "level": 5,
    "form": "N + に + する",
    "meaning": "chọn (lấy)",
    "note": "Chọn, quyết định một thứ, nhất là khi gọi món hay mua đồ.",
    "confusables": [
      "koto-ni-suru"
    ],
    "examples": [
      {
        "ja": "私はコーヒー＿＿。",
        "answer": "にします",
        "pieces": [
          "私は",
          "コーヒー",
          "にします。"
        ],
        "vi": "Tôi chọn cà phê."
      },
      {
        "ja": "誕生日のプレゼントは時計＿＿。",
        "answer": "にしました",
        "pieces": [
          "誕生日のプレゼントは",
          "時計",
          "にしました。"
        ],
        "vi": "Quà sinh nhật thì tôi đã chọn đồng hồ."
      }
    ]
  },
  {
    "id": "ni-ga-aru",
    "pattern": "〜に〜がある・いる",
    "level": 5,
    "form": "N (nơi chốn) + に + N + がある / いる",
    "meaning": "ở … có",
    "note": "Sự tồn tại; ある cho đồ vật, いる cho người và động vật.",
    "confusables": [
      "de-basho"
    ],
    "examples": [
      {
        "ja": "机の上＿＿本があります。",
        "answer": "に",
        "pieces": [
          "机の上",
          "に",
          "本が",
          "あります。"
        ],
        "vi": "Trên bàn có quyển sách."
      },
      {
        "ja": "公園＿＿子どもがいます。",
        "answer": "に",
        "pieces": [
          "公園",
          "に",
          "子どもが",
          "います。"
        ],
        "vi": "Ở công viên có trẻ con."
      }
    ]
  },
  {
    "id": "nani-mo-nai",
    "pattern": "何も〜ない",
    "level": 5,
    "form": "何も + V (phủ định)",
    "meaning": "không … gì cả",
    "note": "Phủ định hoàn toàn về sự vật.",
    "confusables": [
      "zenzen-nai"
    ],
    "examples": [
      {
        "ja": "朝から＿＿食べていません。",
        "answer": "何も",
        "pieces": [
          "朝から",
          "何も",
          "食べていません。"
        ],
        "vi": "Từ sáng tôi chưa ăn gì cả."
      },
      {
        "ja": "冷蔵庫に＿＿ありません。",
        "answer": "何も",
        "pieces": [
          "冷蔵庫に",
          "何も",
          "ありません。"
        ],
        "vi": "Trong tủ lạnh không có gì cả."
      }
    ]
  },
  {
    "id": "zenzen-nai",
    "pattern": "全然〜ない",
    "level": 5,
    "form": "全然 + V / A (phủ định)",
    "meaning": "hoàn toàn không",
    "note": "Phủ định mạnh về mức độ.",
    "confusables": [
      "amari-nai",
      "nani-mo-nai"
    ],
    "examples": [
      {
        "ja": "この映画は＿＿おもしろくない。",
        "answer": "全然",
        "pieces": [
          "この映画は",
          "全然",
          "おもしろくない。"
        ],
        "vi": "Bộ phim này chẳng hay chút nào."
      },
      {
        "ja": "テストの問題が＿＿分かりませんでした。",
        "answer": "全然",
        "pieces": [
          "テストの問題が",
          "全然",
          "分かりませんでした。"
        ],
        "vi": "Tôi hoàn toàn không hiểu đề kiểm tra."
      }
    ]
  },
  {
    "id": "amari-nai",
    "pattern": "あまり〜ない",
    "level": 5,
    "form": "あまり + V / A (phủ định)",
    "meaning": "không … lắm",
    "note": "Phủ định nhẹ về mức độ.",
    "confusables": [
      "zenzen-nai"
    ],
    "examples": [
      {
        "ja": "今日は＿＿寒くないです。",
        "answer": "あまり",
        "pieces": [
          "今日は",
          "あまり",
          "寒くないです。"
        ],
        "vi": "Hôm nay không lạnh lắm."
      },
      {
        "ja": "私はお酒を＿＿飲みません。",
        "answer": "あまり",
        "pieces": [
          "私は",
          "お酒を",
          "あまり",
          "飲みません。"
        ],
        "vi": "Tôi không uống rượu nhiều lắm."
      }
    ]
  },
  {
    "id": "hodo-nai",
    "pattern": "〜ほど〜ない",
    "level": 5,
    "form": "N1 は N2 + ほど + A (phủ định)",
    "meaning": "không … bằng",
    "note": "So sánh: N1 không đạt tới mức như N2.",
    "confusables": [
      "yori-hou"
    ],
    "examples": [
      {
        "ja": "今年の夏は去年＿＿暑くない。",
        "answer": "ほど",
        "pieces": [
          "今年の夏は",
          "去年",
          "ほど",
          "暑くない。"
        ],
        "vi": "Mùa hè năm nay không nóng bằng năm ngoái."
      },
      {
        "ja": "この店はあの店＿＿高くないです。",
        "answer": "ほど",
        "pieces": [
          "この店は",
          "あの店",
          "ほど",
          "高くないです。"
        ],
        "vi": "Quán này không đắt bằng quán kia."
      }
    ]
  },
  {
    "id": "wo-kudasai",
    "pattern": "〜をください",
    "level": 5,
    "form": "N + を + (số lượng) + ください",
    "meaning": "cho tôi (xin)",
    "note": "Yêu cầu một đồ vật, nhất là khi mua hàng hay gọi món.",
    "confusables": [
      "ga-hoshii"
    ],
    "examples": [
      {
        "ja": "りんごを三つ＿＿。",
        "answer": "ください",
        "pieces": [
          "りんごを",
          "三つ",
          "ください。"
        ],
        "vi": "Cho tôi ba quả táo."
      },
      {
        "ja": "水を一杯＿＿。",
        "answer": "ください",
        "pieces": [
          "水を",
          "一杯",
          "ください。"
        ],
        "vi": "Cho tôi một cốc nước."
      }
    ]
  },
  {
    "id": "ni-ageru",
    "pattern": "〜にあげる",
    "level": 5,
    "form": "N (người) + に + N + を + あげる",
    "meaning": "tặng (ai)",
    "note": "Tặng đồ cho người khác (người nhận không phải người nói).",
    "confusables": [
      "ni-morau",
      "te-ageru"
    ],
    "examples": [
      {
        "ja": "母に花を＿＿。",
        "answer": "あげました",
        "pieces": [
          "母に",
          "花を",
          "あげました。"
        ],
        "vi": "Tôi đã tặng hoa cho mẹ."
      },
      {
        "ja": "友達に本を＿＿。",
        "answer": "あげます",
        "pieces": [
          "友達に",
          "本を",
          "あげます。"
        ],
        "vi": "Tôi tặng sách cho bạn."
      }
    ]
  },
  {
    "id": "ni-morau",
    "pattern": "〜にもらう",
    "level": 5,
    "form": "N (người) + に / から + N + を + もらう",
    "meaning": "nhận (từ ai)",
    "note": "Người nói nhận đồ từ người khác.",
    "confusables": [
      "ni-ageru",
      "te-morau"
    ],
    "examples": [
      {
        "ja": "父に時計を＿＿。",
        "answer": "もらいました",
        "pieces": [
          "父に",
          "時計を",
          "もらいました。"
        ],
        "vi": "Tôi được bố cho đồng hồ."
      },
      {
        "ja": "友達から手紙を＿＿。",
        "answer": "もらった",
        "pieces": [
          "友達から",
          "手紙を",
          "もらった。"
        ],
        "vi": "Tôi nhận được thư từ bạn."
      }
    ]
  },
  {
    "id": "no-shoyuu",
    "pattern": "〜の",
    "level": 5,
    "form": "N1 + の + N2",
    "meaning": "của (sở hữu)",
    "note": "Nối hai danh từ: sở hữu, thuộc tính hoặc nguồn gốc.",
    "confusables": [],
    "examples": [
      {
        "ja": "これは私＿＿かさです。",
        "answer": "の",
        "pieces": [
          "これは",
          "私",
          "の",
          "かさです。"
        ],
        "vi": "Đây là cái ô của tôi."
      },
      {
        "ja": "日本＿＿車は人気があります。",
        "answer": "の",
        "pieces": [
          "日本",
          "の",
          "車は",
          "人気があります。"
        ],
        "vi": "Xe hơi của Nhật được ưa chuộng."
      }
    ]
  }
];
