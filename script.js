class ChatBot {
  constructor() {
    this.currentUser = null;
    this.messages = [];
    this.isTyping = false;

    this.initializeElements();
    this.initializeEventListeners();
    this.checkAuthStatus();
    this.initializeTime();

    // AI Knowledge Base - Multilingual responses
    this.knowledgeBase = {
      greetings: {
        en: [
          "Hello! How can I help you today?",
          "Hi there! What can I do for you?",
          "Greetings! How may I assist you?",
        ],
        hi: [
          "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?",
          "हैलो! मैं आपके लिए क्या कर सकता हूं?",
          "आपका स्वागत है! कैसे सहायता करूं?",
        ],
        ur: [
          "السلام علیکم! آج میں آپ کی کیسے مدد کر سکتا ہوں؟",
          "ہیلو! میں آپ کے لیے کیا کر سکتا ہوں؟",
          "آپ کا خیر مقدم! کیسے مدد کروں؟",
        ],
        ar: [
          "مرحبا! كيف يمكنني مساعدتك اليوم؟",
          "أهلا وسهلا! ماذا يمكنني أن أفعل لك؟",
          "السلام عليكم! كيف يمكنني المساعدة؟",
        ],
        es: [
          "¡Hola! ¿Cómo puedo ayudarte hoy?",
          "¡Hola! ¿Qué puedo hacer por ti?",
          "¡Saludos! ¿Cómo puedo asistirte?",
        ],
        fr: [
          "Bonjour! Comment puis-je vous aider aujourd'hui?",
          "Salut! Que puis-je faire pour vous?",
          "Salutations! Comment puis-je vous assister?",
        ],
        roman: [
          "Hello! Aaj main aapki kaise madad kar sakta hun?",
          "Hi! Main aapke liye kya kar sakta hun?",
          "Namaste! Kaise help karoon aapki?",
          "Assalam walaikum! Kya hal hai? Kaise madad kar sakta hun?",
        ],
      },

      responses: {
        // Technology
        technology: {
          en: "Technology is rapidly evolving, with AI, machine learning, and quantum computing leading the way. What specific technology topic interests you?",
          hi: "तकनीक तेजी से विकसित हो रही है, AI, मशीन लर्निंग, और क्वांटम कंप्यूटिंग के साथ। कौन सा विशिष्ट तकनीकी विषय आपको दिलचस्प लगता है?",
          ur: "ٹیکنالوجی تیزی سے ترقی کر رہی ہے، AI، مشین لرننگ، اور کوانٹم کمپیوٹنگ کے ساتھ۔ کون سا مخصوص ٹیکنالوجی موضوع آپ کو دلچسپ لگتا ہے؟",
          roman:
            "Technology bahut tezi se badh rahi hai, AI, machine learning, aur quantum computing ke saath. Aap kaunsa specific technology topic ke baare mein jaanna chahte hain?",
        },

        // Science
        science: {
          en: "Science helps us understand the world around us. From physics to biology, chemistry to astronomy - each field offers fascinating insights. What would you like to explore?",
          hi: "विज्ञान हमें अपने आसपास की दुनिया को समझने में मदद करता है। भौतिकी से जीव विज्ञान तक, रसायन से खगोल विज्ञान तक - हर क्षेत्र आकर्षक अंतर्दृष्टि प्रदान करता है। आप क्या जानना चाहेंगे?",
          ur: "سائنس ہمیں اپنے ارد گرد کی دنیا کو سمجھنے میں مدد کرتی ہے۔ فزکس سے بائیولوجی تک، کیمسٹری سے فلکیات تک - ہر شعبہ دلچسپ بصیرت فراہم کرتا ہے۔ آپ کیا جاننا چاہیں گے؟",
          roman:
            "Science humein apne aas paas ki duniya samajhne mein madad karta hai. Physics se biology tak, chemistry se astronomy tak - har field mein interesting cheezein hain. Aap kya explore karna chahte hain?",
        },

        // Health
        health: {
          en: "Health is wealth! Maintaining a balanced diet, regular exercise, adequate sleep, and mental wellness are key to a healthy life. What health topic can I help you with?",
          hi: "स्वास्थ्य ही धन है! संतुलित आहार, नियमित व्यायाम, पर्याप्त नींद, और मानसिक कल्याण स्वस्थ जीवन की कुंजी हैं। मैं किस स्वास्थ्य विषय में आपकी मदद कर सकता हूं?",
          ur: "صحت ہی دولت ہے! متوازن غذا، باقاعدہ ورزش، مناسب نیند، اور ذہنی تندرستی صحت مند زندگی کی کلید ہیں۔ میں کس صحت کے موضوع میں آپ کی مدد کر سکتا ہوں؟",
          roman:
            "Health hi wealth hai! Balanced diet, regular exercise, proper sleep, aur mental wellness healthy life ke liye zaroori hai. Main kaunse health topic mein aapki madad kar sakta hun?",
        },

        // Education
        education: {
          en: "Education opens doors to endless possibilities. Whether it's mathematics, literature, history, or any subject - learning never stops. What would you like to learn about?",
          hi: "शिक्षा अनंत संभावनाओं के द्वार खोलती है। चाहे वह गणित हो, साहित्य हो, इतिहास हो, या कोई भी विषय - सीखना कभी नहीं रुकता। आप किस बारे में सीखना चाहेंगे?",
          ur: "تعلیم لامحدود امکانات کے دروازے کھولتی ہے۔ چاہے وہ ریاضی ہو، ادب ہو، تاریخ ہو، یا کوئی بھی مضمون - سیکھنا کبھی نہیں رکتا۔ آپ کس کے بارے میں سیکھنا چاہیں گے؟",
          roman:
            "Education endless possibilities ke doors kholti hai. Chahe mathematics ho, literature ho, history ho, ya koi bhi subject - learning kabhi nahi rukta. Aap kis baare mein seekhna chahte hain?",
        },
      },
    };

    // Add this expanded knowledge base after the existing knowledgeBase object in the constructor
    this.worldKnowledgeBase = {
      // Countries and Geography
      countries: {
        india: {
          en: "India is the 7th largest country by area and the 2nd most populous country in the world. It's known for its rich history, diverse culture, and contributions to mathematics, science, and philosophy. The capital is New Delhi, and it has 28 states and 8 union territories.",
          hi: "भारत क्षेत्रफल के हिसाब से 7वां सबसे बड़ा और दुनिया का दूसरा सबसे अधिक आबादी वाला देश है। यह अपने समृद्ध इतिहास, विविध संस्कृति और गणित, विज्ञान और दर्शन में योगदान के लिए जाना जाता है। राजधानी नई दिल्ली है, और इसमें 28 राज्य और 8 केंद्र शासित प्रदेश हैं।",
          ur: "ہندوستان رقبے کے لحاظ سے 7واں سب سے بڑا اور دنیا کا دوسرا سب سے زیادہ آبادی والا ملک ہے۔ یہ اپنی امیر تاریخ، متنوع ثقافت، اور ریاضی، سائنس، اور فلسفہ میں شراکت کے لیے جانا جاتا ہے۔ دارالحکومت نئی دہلی ہے، اور اس میں 28 ریاستیں اور 8 مرکزی زیر انتظام علاقے ہیں۔",
          roman:
            "India area ke hisaab se 7th largest country hai aur population ke hisaab se duniya ka 2nd largest country hai. Yeh apne rich history, diverse culture, aur mathematics, science, aur philosophy mein contributions ke liye jana jata hai. Capital New Delhi hai, aur isme 28 states aur 8 union territories hain.",
        },
        usa: {
          en: "The United States of America is the 3rd largest country by area and the 3rd most populous. It consists of 50 states, a federal district, and various territories. The USA is known for its technological innovation, entertainment industry, and economic power. The capital is Washington, D.C.",
          hi: "संयुक्त राज्य अमेरिका क्षेत्रफल के हिसाब से तीसरा सबसे बड़ा और तीसरा सबसे अधिक आबादी वाला देश है। इसमें 50 राज्य, एक संघीय जिला और विभिन्न क्षेत्र शामिल हैं। अमेरिका अपने तकनीकी नवाचार, मनोरंजन उद्योग और आर्थिक शक्ति के लिए जाना जाता है। राजधानी वाशिंगटन, डी.सी. है।",
          ur: "ریاستہائے متحدہ امریکہ رقبے کے لحاظ سے تیسرا سب سے بڑا اور تیسرا سب سے زیادہ آبادی والا ملک ہے۔ اس میں 50 ریاستیں، ایک وفاقی ضلع، اور مختلف علاقے شامل ہیں۔ امریکہ اپنی ٹیکنالوجی کی جدت، تفریحی صنعت، اور معاشی طاقت کے لیے جانا جاتا ہے۔ دارالحکومت واشنگٹن، ڈی سی ہے۔",
          roman:
            "United States of America area ke hisaab se 3rd largest country hai aur 3rd most populous bhi. Isme 50 states, ek federal district, aur various territories hain. USA technological innovation, entertainment industry, aur economic power ke liye jana jata hai. Capital Washington, D.C. hai.",
        },
        china: {
          en: "China is the 4th largest country by area and the most populous country in the world. It has one of the world's oldest civilizations with a rich history spanning over 5,000 years. The capital is Beijing, and China is known for its rapid economic growth and technological advancements.",
          hi: "चीन क्षेत्रफल के हिसाब से चौथा सबसे बड़ा और दुनिया का सबसे अधिक आबादी वाला देश है। इसकी 5,000 साल से अधिक पुरानी समृद्ध सभ्यता है। राजधानी बीजिंग है, और चीन अपने तेजी से आर्थिक विकास और तकनीकी प्रगति के लिए जाना जाता है।",
          ur: "چین رقبے کے لحاظ سے چوتھا سب سے بڑا اور دنیا کا سب سے زیادہ آبادی والا ملک ہے۔ اس کی 5,000 سال سے زیادہ پرانی امیر تہذیب ہے۔ دارالحکومت بیجنگ ہے، اور چین اپنی تیزی سے معاشی ترقی اور ٹیکنالوجی کی پیش رفت کے لیے جانا جاتا ہے۔",
          roman:
            "China area ke hisaab se 4th largest country hai aur duniya ka sabse zyada population wala country hai. Iske paas duniya ki sabse purani civilizations mein se ek hai jiska rich history 5,000 saal se bhi zyada purana hai. Capital Beijing hai, aur China apne rapid economic growth aur technological advancements ke liye jana jata hai.",
        },
      },

      // Famous People
      famousPeople: {
        einstein: {
          en: "Albert Einstein (1879-1955) was a theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics. His mass-energy equivalence formula E=mc² is one of the most famous equations in the world. He received the Nobel Prize in Physics in 1921.",
          hi: "अल्बर्ट आइंस्टाइन (1879-1955) एक सैद्धांतिक भौतिक विज्ञानी थे जिन्होंने सापेक्षता के सिद्धांत का विकास किया, जो आधुनिक भौतिकी के दो स्तंभों में से एक है। उनका द्रव्यमान-ऊर्जा समतुल्यता सूत्र E=mc² दुनिया के सबसे प्रसिद्ध समीकरणों में से एक है। उन्हें 1921 में भौतिकी का नोबेल पुरस्कार मिला था।",
          ur: "البرٹ آئنسٹائن (1879-1955) ایک نظریاتی طبیعیات دان تھے جنہوں نے اضافیت کے نظریے کو تیار کیا، جو جدید طبیعیات کے دو ستونوں میں سے ایک ہے۔ ان کا کتلہ-توانائی مساوات فارمولا E=mc² دنیا کے سب سے مشہور مساوات میں سے ایک ہے۔ انہیں 1921 میں طبیعیات کا نوبل انعام ملا تھا۔",
          roman:
            "Albert Einstein (1879-1955) ek theoretical physicist the jinhone theory of relativity develop ki, jo modern physics ke do pillars mein se ek hai. Unka mass-energy equivalence formula E=mc² duniya ke sabse famous equations mein se ek hai. Unhe 1921 mein Physics ka Nobel Prize mila tha.",
        },
        gandhi: {
          en: "Mahatma Gandhi (1869-1948) was an Indian lawyer, anti-colonial nationalist, and political ethicist who employed nonviolent resistance to lead India to independence from British rule. He inspired movements for civil rights and freedom across the world.",
          hi: "महात्मा गांधी (1869-1948) एक भारतीय वकील, उपनिवेश विरोधी राष्ट्रवादी और राजनीतिक नैतिकतावादी थे जिन्होंने अहिंसक प्रतिरोध का उपयोग करके भारत को ब्रिटिश शासन से स्वतंत्रता दिलाई। उन्होंने दुनिया भर में नागरिक अधिकारों और स्वतंत्रता के आंदोलनों को प्रेरित किया।",
          ur: "مہاتما گاندھی (1869-1948) ایک ہندوستانی وکیل، نو آبادیاتی مخالف قوم پرست، اور سیاسی اخلاقیات دان تھے جنہوں نے پرامن مزاحمت کو استعمال کرتے ہوئے ہندوستان کو برطانوی حکومت سے آزادی دلائی۔ انہوں نے دنیا بھر میں شہری حقوق اور آزادی کی تحریکوں کو متاثر کیا۔",
          roman:
            "Mahatma Gandhi (1869-1948) ek Indian lawyer, anti-colonial nationalist, aur political ethicist the jinhone nonviolent resistance ka use karke India ko British rule se independence dilai. Unhone duniya bhar mein civil rights aur freedom movements ko inspire kiya.",
        },
      },

      // History
      history: {
        worldWars: {
          en: "World War I (1914-1918) and World War II (1939-1945) were global conflicts that involved most of the world's nations. World War II was the deadliest conflict in human history, marked by 70-85 million fatalities. These wars reshaped political alignments and social structures around the world.",
          hi: "प्रथम विश्व युद्ध (1914-1918) और द्वितीय विश्व युद्ध (1939-1945) वैश्विक संघर्ष थे जिनमें दुनिया के अधिकांश देश शामिल थे। द्वितीय विश्व युद्ध मानव इतिहास का सबसे घातक संघर्ष था, जिसमें 70-85 मिलियन लोग मारे गए। इन युद्धों ने दुनिया भर में राजनीतिक संरेखण और सामाजिक संरचनाओं को बदल दिया।",
          ur: "پہلی عالمی جنگ (1914-1918) اور دوسری عالمی جنگ (1939-1945) عالمی تنازعات تھے جن میں دنیا کے زیادہ تر ممالک شامل تھے۔ دوسری عالمی جنگ انسانی تاریخ کا سب سے مہلک تنازعہ تھا، جس میں 70-85 ملین اموات ہوئیں۔ ان جنگوں نے دنیا بھر میں سیاسی اتحاد اور سماجی ڈھانچے کو تبدیل کیا۔",
          roman:
            "World War I (1914-1918) aur World War II (1939-1945) global conflicts the jinme duniya ke adhiktar nations shamil the. World War II human history ka sabse deadly conflict tha, jisme 70-85 million fatalities hui. In wars ne duniya bhar mein political alignments aur social structures ko reshape kiya.",
        },
        indianIndependence: {
          en: "India gained independence from British rule on August 15, 1947, following a long struggle for freedom. The independence movement was led by figures like Mahatma Gandhi, Jawaharlal Nehru, and Subhas Chandra Bose, and involved both nonviolent resistance and armed rebellion.",
          hi: "भारत ने 15 अगस्त, 1947 को स्वतंत्रता के लिए एक लंबे संघर्ष के बाद ब्रिटिश शासन से स्वतंत्रता प्राप्त की। स्वतंत्रता आंदोलन महात्मा गांधी, जवाहरलाल नेहरू और सुभाष चंद्र बोस जैसे नेताओं के नेतृत्व में था, और इसमें अहिंसक प्रतिरोध और सशस्त्र विद्रोह दोनों शामिल थे।",
          ur: "ہندوستان نے 15 اگست، 1947 کو آزادی کے لیے ایک طویل جدوجہد کے بعد برطانوی حکومت سے آزادی حاصل کی۔ آزادی کی تحریک مہاتما گاندھی، جواہر لال نہرو، اور سبھاش چندر بوس جیسے شخصیات کی قیادت میں تھی، اور اس میں پرامن مزاحمت اور مسلح بغاوت دونوں شامل تھے۔",
          roman:
            "India ne August 15, 1947 ko freedom ke liye ek lambe struggle ke baad British rule se independence hasil ki. Independence movement Mahatma Gandhi, Jawaharlal Nehru, aur Subhas Chandra Bose jaise figures ke leadership mein tha, aur isme nonviolent resistance aur armed rebellion dono shamil the.",
        },
      },

      // Sports
      sports: {
        cricket: {
          en: "Cricket is a bat-and-ball game played between two teams of eleven players on a field with a 22-yard pitch in the center. It originated in England and is particularly popular in Commonwealth countries. The ICC Cricket World Cup is the international championship of One Day International cricket.",
          hi: "क्रिकेट एक बल्ले और गेंद का खेल है जो दो टीमों के बीच खेला जाता है, जिसमें प्रत्येक टीम में ग्यारह खिलाड़ी होते हैं और मैदान के बीच में 22 गज की पिच होती है। इसकी उत्पत्ति इंग्लैंड में हुई थी और यह विशेष रूप से राष्ट्रमंडल देशों में लोकप्रिय है। आईसीसी क्रिकेट विश्व कप वनडे अंतरराष्ट्रीय क्रिकेट का अंतरराष्ट्रीय चैंपियनशिप है।",
          ur: "کرکٹ ایک بیٹ اور بال کا کھیل ہے جو دو ٹیموں کے درمیان کھیلا جاتا ہے، جس میں ہر ٹیم میں گیارہ کھلاڑی ہوتے ہیں اور میدان کے درمیان میں 22 گز کی پچ ہوتی ہے۔ اس کی ابتدا انگلینڈ میں ہوئی تھی اور یہ خاص طور پر دولت مشترکہ ممالک میں مقبول ہے۔ آئی سی سی کرکٹ ورلڈ کپ ون ڈے انٹرنیشنل کرکٹ کی بین الاقوامی چیمپئن شپ ہے۔",
          roman:
            "Cricket ek bat-and-ball game hai jo do teams ke beech khela jata hai, jisme har team mein 11 players hote hain aur field ke center mein 22-yard ki pitch hoti hai. Iska origin England mein hua tha aur yeh vishesh roop se Commonwealth countries mein popular hai. ICC Cricket World Cup One Day International cricket ka international championship hai.",
        },
        football: {
          en: "Football (or soccer) is a team sport played between two teams of eleven players with a spherical ball. It is played by approximately 250 million players in over 200 countries, making it the world's most popular sport. The FIFA World Cup is the most prestigious football tournament in the world.",
          hi: "फुटबॉल एक टीम खेल है जो दो टीमों के बीच खेला जाता है, जिसमें प्रत्येक टीम में ग्यारह खिलाड़ी होते हैं और एक गोलाकार गेंद होती है। यह लगभग 200 से अधिक देशों में 250 मिलियन खिलाड़ियों द्वारा खेला जाता है, जिससे यह दुनिया का सबसे लोकप्रिय खेल बन गया है। फीफा विश्व कप दुनिया का सबसे प्रतिष्ठित फुटबॉल टूर्नामेंट है।",
          ur: "فٹبال ایک ٹیم کھیل ہے جو دو ٹیموں کے درمیان کھیلا جاتا ہے، جس میں ہر ٹیم میں گیارہ کھلاڑی ہوتے ہیں اور ایک گول گیند ہوتی ہے۔ یہ تقریباً 200 سے زیادہ ممالک میں 250 ملین کھلاڑیوں کے ذریعے کھیلا جاتا ہے، جس سے یہ دنیا کا سب سے مقبول کھیل بن گیا ہے۔ فیفا ورلڈ کپ دنیا کا سب سے معزز فٹبال ٹورنامنٹ ہے۔",
          roman:
            "Football (ya soccer) ek team sport hai jo do teams ke beech khela jata hai, jisme har team mein 11 players hote hain aur ek spherical ball hoti hai. Yeh approximately 250 million players dwara 200 se zyada countries mein khela jata hai, jisse yeh duniya ka sabse popular sport ban gaya hai. FIFA World Cup duniya ka sabse prestigious football tournament hai.",
        },
      },

      // Entertainment
      entertainment: {
        bollywood: {
          en: "Bollywood is the Hindi-language film industry based in Mumbai (formerly Bombay), India. It is one of the largest film producers in the world, known for its colorful, song-and-dance sequences and melodramatic plots. Some famous Bollywood actors include Amitabh Bachchan, Shah Rukh Khan, and Deepika Padukone.",
          hi: "बॉलीवुड मुंबई (पूर्व में बॉम्बे), भारत में स्थित हिंदी भाषा की फिल्म उद्योग है। यह दुनिया के सबसे बड़े फिल्म निर्माताओं में से एक है, जो अपने रंगीन, गीत-और-नृत्य अनुक्रमों और मेलोड्रामैटिक कहानियों के लिए जाना जाता है। कुछ प्रसिद्ध बॉलीवुड अभिनेताओं में अमिताभ बच्चन, शाहरुख खान और दीपिका पादुकोण शामिल हैं।",
          ur: "بالی ووڈ ممبئی (سابقہ بمبئی)، ہندوستان میں مبنی ہندی زبان کی فلم انڈسٹری ہے۔ یہ دنیا کے سب سے بڑے فلم پروڈیوسرز میں سے ایک ہے، جو اپنے رنگین، گانے اور ڈانس سیکوئنس اور میلوڈرامیٹک پلاٹس کے لیے جانا جاتا ہے۔ کچھ مشہور بالی ووڈ اداکاروں میں امیتابھ بچن، شاہ رخ خان، اور دیپیکا پڈوکون شامل ہیں۔",
          roman:
            "Bollywood Mumbai (formerly Bombay), India mein based Hindi-language film industry hai. Yeh duniya ke sabse bade film producers mein se ek hai, jo apne colorful, song-and-dance sequences aur melodramatic plots ke liye jana jata hai. Kuch famous Bollywood actors mein Amitabh Bachchan, Shah Rukh Khan, aur Deepika Padukone shamil hain.",
        },
        hollywood: {
          en: "Hollywood is the center of the American film industry, located in Los Angeles, California. It is known globally for producing big-budget, blockbuster films and is home to major film studios like Warner Bros., Universal Pictures, and Paramount Pictures. The Hollywood Walk of Fame honors celebrities with stars embedded in the sidewalk.",
          hi: "हॉलीवुड अमेरिकी फिल्म उद्योग का केंद्र है, जो लॉस एंजिल्स, कैलिफोर्निया में स्थित है। यह बड़े बजट, ब्लॉकबस्टर फिल्मों के निर्माण के लिए विश्व स्तर पर जाना जाता है और वार्नर ब्रदर्स, यूनिवर्सल पिक्चर्स और पैरामाउंट पिक्चर्स जैसे प्रमुख फिल्म स्टूडियो का घर है। हॉलीवुड वॉक ऑफ फेम फुटपाथ में अंकित सितारों के साथ सेलिब्रिटीज को सम्मानित करता है।",
          ur: "ہالی ووڈ امریکی فلم انڈسٹری کا مرکز ہے، جو لاس اینجلس، کیلیفورنیا میں واقع ہے۔ یہ بڑے بجٹ، بلاک بسٹر فلموں کی پروڈکشن کے لیے عالمی سطح پر جانا جاتا ہے اور وارنر برادرز، یونیورسل پکچرز، اور پیرامونٹ پکچرز جیسے بڑے فلم اسٹوڈیوز کا گھر ہے۔ ہالی ووڈ واک آف فیم فٹ پاتھ میں لگے ستاروں کے ساتھ مشہور شخصیات کو اعزاز دیتا ہے۔",
          roman:
            "Hollywood American film industry ka center hai, jo Los Angeles, California mein located hai. Yeh globally big-budget, blockbuster films produce karne ke liye jana jata hai aur Warner Bros., Universal Pictures, aur Paramount Pictures jaise major film studios ka home hai. Hollywood Walk of Fame celebrities ko sidewalk mein embedded stars ke saath honor karta hai.",
        },
      },

      // Science and Technology
      scienceTech: {
        ai: {
          en: "Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn like humans. It encompasses machine learning, natural language processing, computer vision, and robotics. AI is transforming industries like healthcare, finance, transportation, and entertainment.",
          hi: "आर्टिफिशियल इंटेलिजेंस (एआई) मशीनों में मानव बुद्धि का अनुकरण है जो मनुष्यों की तरह सोचने और सीखने के लिए प्रोग्राम की जाती हैं। इसमें मशीन लर्निंग, नेचुरल लैंग्वेज प्रोसेसिंग, कंप्यूटर विजन और रोबोटिक्स शामिल हैं। एआई स्वास्थ्य सेवा, वित्त, परिवहन और मनोरंजन जैसे उद्योगों को बदल रहा है।",
          ur: "آرٹیفیشل انٹیلیجنس (اے آئی) مشینوں میں انسانی ذہانت کی نقل ہے جو انسانوں کی طرح سوچنے اور سیکھنے کے لیے پروگرام کی جاتی ہیں۔ اس میں مشین لرننگ، نیچرل لینگویج پروسیسنگ، کمپیوٹر وژن، اور روبوٹکس شامل ہیں۔ اے آئی ہیلتھ کیئر، فنانس، ٹرانسپورٹیشن، اور انٹرٹینمنٹ جیسے انڈسٹریز کو تبدیل کر رہی ہے۔",
          roman:
            "Artificial Intelligence (AI) machines mein human intelligence ka simulation hai jo humans ki tarah sochne aur seekhne ke liye program ki jati hain. Isme machine learning, natural language processing, computer vision, aur robotics shamil hain. AI healthcare, finance, transportation, aur entertainment jaise industries ko transform kar raha hai.",
        },
        spaceExploration: {
          en: "Space exploration is the use of astronomy and space technology to explore outer space. Major space agencies include NASA, ESA, Roscosmos, ISRO, and CNSA. Notable achievements include the Apollo Moon landings, the International Space Station, Mars rovers, and the James Webb Space Telescope.",
          hi: "अंतरिक्ष अन्वेषण खगोल विज्ञान और अंतरिक्ष प्रौद्योगिकी का उपयोग बाहरी अंतरिक्ष की खोज के लिए है। प्रमुख अंतरिक्ष एजेंसियों में नासा, ईएसए, रोस्कोस्मोस, इसरो और सीएनएसए शामिल हैं। उल्लेखनीय उपलब्धियों में अपोलो चंद्र लैंडिंग, अंतर्राष्ट्रीय अंतरिक्ष स्टेशन, मंगल रोवर्स और जेम्स वेब स्पेस टेलीस्कोप शामिल हैं।",
          ur: "خلائی تحقیق فلکیات اور خلائی ٹیکنالوجی کا استعمال بیرونی خلاء کی تحقیق کے لیے ہے۔ بڑی خلائی ایجنسیوں میں ناسا، ای ایس اے، روسکوسموس، آئی ایس آر او، اور سی این ایس اے شامل ہیں۔ قابل ذکر کامیابیوں میں اپولو چاند کی لینڈنگز، انٹرنیشنل اسپیس اسٹیشن، مریخ روورز، اور جیمز ویب اسپیس ٹیلی اسکوپ شامل ہیں۔",
          roman:
            "Space exploration astronomy aur space technology ka use outer space explore karne ke liye hai. Major space agencies mein NASA, ESA, Roscosmos, ISRO, aur CNSA shamil hain. Notable achievements mein Apollo Moon landings, International Space Station, Mars rovers, aur James Webb Space Telescope shamil hain.",
        },
      },

      // Current Affairs (Simulated)
      currentAffairs: {
        environment: {
          en: "Climate change remains one of the most pressing global challenges. Recent reports indicate rising global temperatures, extreme weather events, and melting ice caps. Many countries are implementing renewable energy solutions and carbon reduction strategies to combat these issues.",
          hi: "जलवायु परिवर्तन सबसे अधिक दबाव वाली वैश्विक चुनौतियों में से एक बना हुआ है। हाल की रिपोर्टों से पता चलता है कि वैश्विक तापमान बढ़ रहा है, चरम मौसम की घटनाएं हो रही हैं और बर्फ की चादरें पिघल रही हैं। कई देश इन मुद्दों से निपटने के लिए नवीकरणीय ऊर्जा समाधान और कार्बन कटौती रणनीतियों को लागू कर रहे हैं।",
          ur: "موسمیاتی تبدیلی سب سے زیادہ دباؤ والے عالمی چیلنجوں میں سے ایک بنی ہوئی ہے۔ حالیہ رپورٹس سے پتہ چلتا ہے کہ عالمی درجہ حرارت بڑھ رہا ہے، انتہائی موسمی واقعات ہو رہے ہیں، اور برفانی ٹوپیاں پگھل رہی ہیں۔ کئی ممالک ان مسائل سے نمٹنے کے لیے قابل تجدید توانائی کے حل اور کاربن میں کمی کی حکمت عملیاں نافذ کر رہے ہیں۔",
          roman:
            "Climate change sabse pressing global challenges mein se ek bana hua hai. Recent reports indicate karte hain ki global temperatures badh rahe hain, extreme weather events ho rahe hain, aur ice caps pighal rahe hain. Kai countries in issues se nipatne ke liye renewable energy solutions aur carbon reduction strategies implement kar rahe hain.",
        },
        technology: {
          en: "The technology sector continues to evolve rapidly. Advancements in quantum computing, 5G networks, and augmented reality are transforming how we live and work. Tech companies are also facing increased scrutiny regarding data privacy, algorithmic bias, and their impact on society.",
          hi: "प्रौद्योगिकी क्षेत्र तेजी से विकसित हो रहा है। क्वांटम कंप्यूटिंग, 5जी नेटवर्क और ऑगमेंटेड रियलिटी में प्रगति बदल रही है कि हम कैसे रहते और काम करते हैं। टेक कंपनियां डेटा गोपनीयता, एल्गोरिदमिक पूर्वाग्रह और समाज पर उनके प्रभाव के संबंध में बढ़ी हुई जांच का सामना कर रही हैं।",
          ur: "ٹیکنالوجی سیکٹر تیزی سے ارتقاء پذیر ہے۔ کوانٹم کمپیوٹنگ، 5جی نیٹ ورکس، اور آگمینٹڈ ریئلٹی میں پیش رفت تبدیل کر رہی ہے کہ ہم کیسے رہتے اور کام کرتے ہیں۔ ٹیک کمپنیاں ڈیٹا پرائیویسی، الگورتھمک تعصب، اور معاشرے پر ان کے اثرات کے حوالے سے بڑھتی ہوئی جانچ پڑتال کا سامنا کر رہی ہیں۔",
          roman:
            "Technology sector rapidly evolve ho raha hai. Quantum computing, 5G networks, aur augmented reality mein advancements transform kar rahe hain ki hum kaise rehte aur kaam karte hain. Tech companies data privacy, algorithmic bias, aur society par unke impact ke regarding increased scrutiny ka samna kar rahe hain.",
        },
      },
    };
  }

  initializeElements() {
    // Auth elements
    this.authModal = document.getElementById("authModal");
    // this.loginForm = document.getElementById("loginForm");
    // this.signupForm = document.getElementById("signupForm");
    // this.showSignup = document.getElementById("showSignup");
    // this.showLogin = document.getElementById("showLogin");

    // Chat elements
    this.chatContainer = document.getElementById("chatContainer");
    this.chatMessages = document.getElementById("chatMessages");
    this.messageInput = document.getElementById("messageInput");
    this.sendBtn = document.getElementById("sendBtn");
    this.themeToggle = document.getElementById("themeToggle");
    // this.logoutBtn = document.getElementById("logoutBtn");
  }

  initializeEventListeners() {
    // Auth form listeners
    this.loginForm.addEventListener("submit", (e) => this.handleLogin(e));
    this.signupForm.addEventListener("submit", (e) => this.handleSignup(e));
    this.showSignup.addEventListener("click", () =>
      this.toggleAuthForm("signup")
    );
    // this.showLogin.addEventListener("click", () =>
    //   this.toggleAuthForm("login")
    // );

    // Chat listeners
    this.sendBtn.addEventListener("click", () => this.sendMessage());
    this.messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });

    // Theme and logout
    this.themeToggle.addEventListener("click", () => this.toggleTheme());
    this.logoutBtn.addEventListener("click", () => this.logout());

    // Load theme
    this.loadTheme();
  }

  checkAuthStatus() {
    const savedUser = localStorage.getItem("chatbot_user");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.showChatInterface();
    } else {
      this.showAuthModal();
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("chatbot_users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.currentUser = user;
      localStorage.setItem("chatbot_user", JSON.stringify(user));
      this.showChatInterface();
      this.addMessage(
        "bot",
        `Welcome back, ${user.name}! How can I help you today?`
      );
    } else {
      alert("Invalid credentials. Please try again.");
    }
  }

  handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const users = JSON.parse(localStorage.getItem("chatbot_users") || "[]");

    if (users.find((u) => u.email === email)) {
      alert("User already exists. Please login.");
      return;
    }

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("chatbot_users", JSON.stringify(users));

    this.currentUser = newUser;
    localStorage.setItem("chatbot_user", JSON.stringify(newUser));
    this.showChatInterface();
    this.addMessage(
      "bot",
      `Welcome ${name}! I'm your AI assistant. I can help you with questions in any language. How can I assist you today?`
    );
  }

  toggleAuthForm(form) {
    if (form === "signup") {
      this.loginForm.classList.add("hidden");
      this.signupForm.classList.remove("hidden");
    } else {
      this.signupForm.classList.add("hidden");
      this.loginForm.classList.remove("hidden");
    }
  }

  showAuthModal() {
    this.authModal.classList.remove("hidden");
    this.chatContainer.classList.add("hidden");
  }

  showChatInterface() {
    this.authModal.classList.add("hidden");
    this.chatContainer.classList.remove("hidden");
  }

  logout() {
    localStorage.removeItem("chatbot_user");
    this.currentUser = null;
    this.messages = [];
    this.chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Hello! I'm your AI assistant. I can help you with questions in any language. How can I assist you today?</p>
                    <span class="message-time"></span>
                </div>
            </div>
        `;
    this.showAuthModal();
  }

  toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("chatbot_theme", newTheme);

    const icon = this.themeToggle.querySelector("i");
    icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  loadTheme() {
    const savedTheme = localStorage.getItem("chatbot_theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);

    const icon = this.themeToggle.querySelector("i");
    icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message || this.isTyping) return;

    this.addMessage("user", message);
    this.messageInput.value = "";

    // Show typing indicator
    this.showTypingIndicator();

    // Generate AI response
    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.generateAIResponse(message);
      this.addMessage("bot", response);
    }, 1000 + Math.random() * 2000);
  }

  addMessage(sender, content) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === "user" ? "user" : "robot"}"></i>
            </div>
            <div class="message-content">
                <p>${content}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

    this.messages.push({ sender, content, time });
  }

  showTypingIndicator() {
    this.isTyping = true;
    const typingDiv = document.createElement("div");
    typingDiv.className = "message bot-message typing-indicator";
    typingDiv.id = "typing-indicator";

    typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;

    this.chatMessages.appendChild(typingDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  detectLanguage(text) {
    // Simple language detection based on character patterns
    const hindiPattern = /[\u0900-\u097F]/;
    const urduPattern = /[\u0600-\u06FF]/;
    const arabicPattern = /[\u0600-\u06FF]/;
    const spanishPattern = /[ñáéíóúü]/i;
    const frenchPattern = /[àâäéèêëïîôöùûüÿç]/i;

    // Roman English (Hinglish) detection
    const romanHindiWords = [
      "hai",
      "hain",
      "hun",
      "ho",
      "hoon",
      "kya",
      "kaise",
      "kahan",
      "kab",
      "kyun",
      "kyu",
      "main",
      "mein",
      "aap",
      "aapka",
      "aapki",
      "mera",
      "meri",
      "tera",
      "teri",
      "uska",
      "uski",
      "yeh",
      "woh",
      "yahan",
      "wahan",
      "abhi",
      "phir",
      "fir",
      "bhi",
      "baat",
      "cheez",
      "accha",
      "achha",
      "theek",
      "thik",
      "sahi",
      "galat",
      "nahi",
      "nahin",
      "haan",
      "ji",
      "kaam",
      "paisa",
      "paise",
      "ghar",
      "school",
      "college",
      "office",
      "dost",
      "family",
      "khana",
      "paani",
      "time",
      "samay",
      "din",
      "raat",
      "subah",
      "shaam",
      "kal",
      "aaj",
      "madad",
      "help",
      "problem",
      "solution",
      "question",
      "answer",
      "pata",
      "maloom",
      "samjha",
      "samjhi",
      "samajh",
      "dekho",
      "dekha",
      "suno",
      "suna",
      "bolo",
      "kaho",
      "chahiye",
      "chaahiye",
      "mangta",
      "chahta",
      "chahti",
      "karna",
      "karne",
      "kar",
      "jaana",
      "jana",
      "aana",
      "ana",
      "lena",
      "dena",
      "milna",
      "banana",
      "khaana",
      "bolna",
      "kehna",
      "sunna",
      "dekhna",
      "padhna",
      "likhna",
      "seekhna",
      "sikhna",
    ];

    if (hindiPattern.test(text)) return "hi";
    if (urduPattern.test(text) || arabicPattern.test(text)) return "ur";
    if (spanishPattern.test(text)) return "es";
    if (frenchPattern.test(text)) return "fr";

    // Check for Roman Hindi/Hinglish words
    const lowerText = text.toLowerCase();
    const hasRomanHindi = romanHindiWords.some(
      (word) =>
        lowerText.includes(word) || new RegExp(`\\b${word}\\b`).test(lowerText)
    );

    if (hasRomanHindi) return "roman";

    return "en"; // Default to English
  }

  // Add this function after the detectLanguage function
  identifyTopic(message) {
    const lowerMessage = message.toLowerCase();

    // Country related queries
    if (
      this.containsWords(lowerMessage, [
        "india",
        "bharat",
        "indian",
        "hindustan",
        "भारत",
        "इंडिया",
        "ہندوستان",
        "بھارت",
      ])
    ) {
      return { category: "countries", topic: "india" };
    }
    if (
      this.containsWords(lowerMessage, [
        "usa",
        "america",
        "united states",
        "us",
        "अमेरिका",
        "संयुक्त राज्य",
        "امریکہ",
        "یونائیٹڈ اسٹیٹس",
      ])
    ) {
      return { category: "countries", topic: "usa" };
    }
    if (
      this.containsWords(lowerMessage, [
        "china",
        "chinese",
        "चीन",
        "चाइना",
        "چین",
      ])
    ) {
      return { category: "countries", topic: "china" };
    }

    // Famous people
    if (
      this.containsWords(lowerMessage, [
        "einstein",
        "albert einstein",
        "theory of relativity",
        "आइंस्टाइन",
        "آئنسٹائن",
      ])
    ) {
      return { category: "famousPeople", topic: "einstein" };
    }
    if (
      this.containsWords(lowerMessage, [
        "gandhi",
        "mahatma",
        "mahatma gandhi",
        "गांधी",
        "महात्मा",
        "گاندھی",
        "مہاتما",
      ])
    ) {
      return { category: "famousPeople", topic: "gandhi" };
    }

    // History
    if (
      this.containsWords(lowerMessage, [
        "world war",
        "ww1",
        "ww2",
        "world wars",
        "विश्व युद्ध",
        "عالمی جنگ",
      ])
    ) {
      return { category: "history", topic: "worldWars" };
    }
    if (
      this.containsWords(lowerMessage, [
        "independence",
        "freedom struggle",
        "1947",
        "स्वतंत्रता",
        "आज़ादी",
        "آزادی",
        "استقلال",
      ])
    ) {
      return { category: "history", topic: "indianIndependence" };
    }

    // Sports
    if (
      this.containsWords(lowerMessage, ["cricket", "ipl", "क्रिकेट", "کرکٹ"])
    ) {
      return { category: "sports", topic: "cricket" };
    }
    if (
      this.containsWords(lowerMessage, [
        "football",
        "soccer",
        "fifa",
        "फुटबॉल",
        "फुटबाल",
        "فٹبال",
      ])
    ) {
      return { category: "sports", topic: "football" };
    }

    // Entertainment
    if (
      this.containsWords(lowerMessage, [
        "bollywood",
        "hindi movies",
        "hindi films",
        "बॉलीवुड",
        "بالی ووڈ",
      ])
    ) {
      return { category: "entertainment", topic: "bollywood" };
    }
    if (
      this.containsWords(lowerMessage, [
        "hollywood",
        "american movies",
        "american films",
        "हॉलीवुड",
        "ہالی ووڈ",
      ])
    ) {
      return { category: "entertainment", topic: "hollywood" };
    }

    // Science and Technology
    if (
      this.containsWords(lowerMessage, [
        "ai",
        "artificial intelligence",
        "machine learning",
        "एआई",
        "आर्टिफिशियल इंटेलिजेंस",
        "اے آئی",
        "مصنوعی ذہانت",
      ])
    ) {
      return { category: "scienceTech", topic: "ai" };
    }
    if (
      this.containsWords(lowerMessage, [
        "space",
        "nasa",
        "isro",
        "mars",
        "moon",
        "अंतरिक्ष",
        "नासा",
        "इसरो",
        "خلاء",
        "ناسا",
        "چاند",
      ])
    ) {
      return { category: "scienceTech", topic: "spaceExploration" };
    }

    // Current Affairs
    if (
      this.containsWords(lowerMessage, [
        "climate",
        "environment",
        "global warming",
        "pollution",
        "जलवायु",
        "पर्यावरण",
        "موسمیاتی",
        "ماحول",
      ])
    ) {
      return { category: "currentAffairs", topic: "environment" };
    }
    if (
      this.containsWords(lowerMessage, [
        "tech news",
        "technology news",
        "latest technology",
        "टेक न्यूज़",
        "प्रौद्योगिकी समाचार",
        "ٹیک نیوز",
      ])
    ) {
      return { category: "currentAffairs", topic: "technology" };
    }

    return null;
  }

  // Update the generateAIResponse function to include the new knowledge base
  // Add this code after the existing weather questions handler in generateAIResponse function
  generateAIResponse(userMessage) {
    const language = this.detectLanguage(userMessage);
    const lowerMessage = userMessage.toLowerCase();

    // Greeting responses
    if (
      this.containsWords(lowerMessage, [
        "hello",
        "hi",
        "hey",
        "namaste",
        "salam",
        "hola",
        "bonjour",
        "नमस्ते",
        "السلام",
        "ہیلو",
        "kya hal",
        "kaise ho",
        "kya haal",
        "adaab",
        "sat sri akal",
        "vanakkam",
        "namaskar",
      ])
    ) {
      const greetings =
        this.knowledgeBase.greetings[language] ||
        this.knowledgeBase.greetings.en;
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Technology questions
    if (
      this.containsWords(lowerMessage, [
        "technology",
        "tech",
        "ai",
        "computer",
        "software",
        "programming",
        "तकनीक",
        "ٹیکنالوجی",
        "कंप्यूटर",
        "technology",
        "tech",
        "artificial intelligence",
        "machine learning",
        "coding",
        "programming",
        "mobile",
        "app",
        "website",
        "internet",
        "digital",
        "online",
      ])
    ) {
      return (
        this.knowledgeBase.responses.technology[language] ||
        this.knowledgeBase.responses.technology.en
      );
    }

    // Science questions
    if (
      this.containsWords(lowerMessage, [
        "science",
        "physics",
        "chemistry",
        "biology",
        "math",
        "विज्ञान",
        "سائنس",
        "भौतिकी",
        "रसायन",
        "vigyan",
        "physics",
        "chemistry",
        "biology",
        "mathematics",
        "maths",
        "space",
        "earth",
        "nature",
        "environment",
        "research",
        "experiment",
        "theory",
      ])
    ) {
      return (
        this.knowledgeBase.responses.science[language] ||
        this.knowledgeBase.responses.science.en
      );
    }

    // Health questions
    if (
      this.containsWords(lowerMessage, [
        "health",
        "fitness",
        "exercise",
        "diet",
        "medicine",
        "स्वास्थ्य",
        "صحت",
        "व्यायाम",
        "दوा",
        "sehat",
        "health",
        "fitness",
        "exercise",
        "workout",
        "diet",
        "khana",
        "medicine",
        "dawa",
        "doctor",
        "hospital",
        "treatment",
        "illness",
        "disease",
        "pain",
        "dard",
      ])
    ) {
      return (
        this.knowledgeBase.responses.health[language] ||
        this.knowledgeBase.responses.health.en
      );
    }

    // Education questions
    if (
      this.containsWords(lowerMessage, [
        "education",
        "study",
        "learn",
        "school",
        "university",
        "शिक्षा",
        "तعلیم",
        "पढ़ाई",
        "سکول",
        "padhai",
        "study",
        "learn",
        "school",
        "college",
        "university",
        "exam",
        "test",
        "book",
        "kitab",
        "teacher",
        "student",
        "class",
        "subject",
        "course",
      ])
    ) {
      return (
        this.knowledgeBase.responses.education[language] ||
        this.knowledgeBase.responses.education.en
      );
    }

    // Time questions
    if (
      this.containsWords(lowerMessage, [
        "time",
        "clock",
        "date",
        "समय",
        "وقت",
        "घड़ी",
        "تاریخ",
        "time",
        "samay",
        "waqt",
        "clock",
        "ghadi",
        "date",
        "tarikh",
        "din",
        "mahina",
        "saal",
      ])
    ) {
      const now = new Date();
      const timeStr = now.toLocaleString();

      const responses = {
        en: `The current time is ${timeStr}. Is there anything else I can help you with?`,
        hi: `वर्तमान समय ${timeStr} है। क्या मैं आपकी और कोई मदद कर सकता हूं?`,
        ur: `موجودہ وقت ${timeStr} ہے۔ کیا میں آپ کی اور کوئی مدد کر سکتا ہوں؟`,
        roman: `Abhi ka time ${timeStr} hai. Kya main aur koi madad kar sakta hun aapki?`,
      };

      return responses[language] || responses.en;
    }

    // Weather questions
    if (
      this.containsWords(lowerMessage, [
        "weather",
        "temperature",
        "rain",
        "sun",
        "मौसम",
        "موسم",
        "बारिश",
        "धूप",
        "mausam",
        "weather",
        "barish",
        "rain",
        "dhoop",
        "sun",
        "garmi",
        "sardi",
        "thanda",
        "garam",
      ])
    ) {
      const responses = {
        en: "I don't have access to real-time weather data, but I recommend checking a reliable weather service like Weather.com or your local weather app for accurate forecasts.",
        hi: "मेरे पास वास्तविक समय के मौसम डेटा तक पहुंच नहीं है, लेकिन मैं सटीक पूर्वानुमान के लिए Weather.com या आपके स्थानीय मौसम ऐप जैसी विश्वसनीय मौसम सेवा की जांच करने की सलाह देता हूं।",
        ur: "میرے پاس حقیقی وقت کے موسمی ڈیٹا تک رسائی نہیں ہے، لیکن میں درست پیشن گوئی کے لیے Weather.com یا آپ کی مقامی موسمی ایپ جیسی قابل اعتماد موسمی سروس چیک کرنے کی تجویز کرتا ہوں۔",
        roman:
          "Mere paas real-time weather data nahi hai, lekin main suggest karta hun ki aap Weather.com ya apna local weather app check kariye accurate forecast ke liye.",
      };

      return responses[language] || responses.en;
    }

    // World knowledge queries
    const topicInfo = this.identifyTopic(userMessage);
    if (topicInfo) {
      const { category, topic } = topicInfo;
      return (
        this.worldKnowledgeBase[category][topic][language] ||
        this.worldKnowledgeBase[category][topic].en
      );
    }

    // General knowledge query
    if (
      this.containsWords(lowerMessage, [
        "what is",
        "who is",
        "where is",
        "when",
        "why",
        "how",
        "explain",
        "tell me about",
        "क्या है",
        "कौन है",
        "कहां है",
        "कब",
        "क्यों",
        "कैसे",
        "बताओ",
        "کیا ہے",
        "کون ہے",
        "کہاں ہے",
        "کب",
        "کیوں",
        "کیسے",
        "بتاؤ",
      ])
    ) {
      const responses = {
        en: "I have information on many topics including countries, famous people, history, sports, entertainment, science, and current affairs. Could you please specify what exactly you'd like to know about?",
        hi: "मेरे पास कई विषयों के बारे में जानकारी है जिसमें देश, प्रसिद्ध व्यक्ति, इतिहास, खेल, मनोरंजन, विज्ञान और वर्तमान मामले शामिल हैं। क्या आप कृपया बता सकते हैं कि आप किस बारे में जानना चाहते हैं?",
        ur: "میرے پاس کئی موضوعات کے بارے میں معلومات ہیں جن میں ممالک، مشہور شخصیات، تاریخ، کھیل، تفریح، سائنس، اور حالیہ معاملات شامل ہیں۔ کیا آپ براہ کرم بتا سکتے ہیں کہ آپ کس کے بارے میں جاننا چاہتے ہیں؟",
        roman:
          "Mere paas kai topics ke baare mein information hai jisme countries, famous people, history, sports, entertainment, science, aur current affairs shamil hain. Kya aap please specify kar sakte hain ki aap exactly kya jaanna chahte hain?",
      };

      return responses[language] || responses.en;
    }

    // Default responses based on language
    const defaultResponses = {
      en: [
        "That's an interesting question! Could you provide more details so I can give you a better answer?",
        "I understand you're asking about that topic. What specific aspect would you like to know more about?",
        "Great question! I'd be happy to help. Can you be more specific about what you'd like to know?",
        "I'm here to help! Could you rephrase your question or provide more context?",
      ],
      hi: [
        "यह एक दिलचस्प सवाल है! क्या आप अधिक विवरण दे सकते हैं ताकि मैं आपको बेहतर उत्तर दे सकूं?",
        "मैं समझता हूं कि आप उस विषय के बारे में पूछ रहे हैं। आप किस विशिष्ट पहलू के बारे में और जानना चाहेंगे?",
        "बेहतरीन सवाल! मुझे मदद करने में खुशी होगी। क्या आप बता सकते हैं कि आप क्या जानना चाहते हैं?",
        "मैं यहां मदद के लिए हूं! क्या आप अपना सवाल दोबारा पूछ सकते हैं या अधिक संदर्भ दे सकते हैं?",
      ],
      ur: [
        "یہ ایک دلچسپ سوال ہے! کیا آپ مزید تفصیلات فراہم کر سکتے ہیں تاکہ میں آپ کو بہتر جواب دے سکوں؟",
        "میں سمجھتا ہوں کہ آپ اس موضوع کے بارے میں پوچھ رہے ہیں۔ آپ کس مخصوص پہلو کے بارے میں مزید جاننا چاہیں گے؟",
        "بہترین سوال! مجھے مدد کرنے میں خوشی ہوگی۔ کیا آپ بتا سکتے ہیں کہ آپ کیا جاننا چاہتے ہیں؟",
        "میں یہاں مدد کے لیے ہوں! کیا آپ اپنا سوال دوبارہ پوچھ سکتے ہیں یا مزید سیاق و سباق دے سکتے ہیں؟",
      ],
      roman: [
        "Yeh bahut interesting question hai! Kya aap thoda aur detail de sakte hain taaki main aapko better answer de sakun?",
        "Main samajh gaya ki aap us topic ke baare mein pooch rahe hain. Aap kis specific aspect ke baare mein aur jaanna chahte hain?",
        "Great question! Mujhe madad karne mein khushi hogi. Kya aap bata sakte hain ki aap kya jaanna chahte hain?",
        "Main yahan madad ke liye hun! Kya aap apna question dobara pooch sakte hain ya thoda aur context de sakte hain?",
      ],
    };

    const responses = defaultResponses[language] || defaultResponses.en;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  containsWords(text, words) {
    return words.some((word) => text.includes(word.toLowerCase()));
  }

  initializeTime() {
    // Update time in initial message
    const initialTime = document.querySelector(".message-time");
    if (initialTime) {
      initialTime.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }
}

// Initialize the chatbot when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new ChatBot();
});
