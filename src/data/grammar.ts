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
  }
];
