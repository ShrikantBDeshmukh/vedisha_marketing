import os
import re

mr_dir = 'mr'

translations = {
    'meta-google-ads-management.html': {
        'title': 'पेड जाहिरात व्यवस्थापन (Meta + Google Ads) | छत्रपती संभाजीनगर',
        'hero_h1': 'तुमच्या व्यवसायासाठी <span class="gradient-text">पॉवरफुल</span> जाहिरात स्ट्रॅटेजी.',
        'hero_p': 'पुणे आणि छत्रपती संभाजीनगरमधील (पूर्वीचे औरंगाबाद) व्यवसायांसाठी तज्ञ Meta आणि Google Ads व्यवस्थापन. पारदर्शक किंमत आणि ROI-केंद्रित मोहिमा.',
        'sec1_h2': 'आमचे जाहिरात व्यवस्थापन पॅकेजेस',
        'sec1_p': 'आम्ही तुमची जाहिरात गुंतवणूक (Ad Spend) योग्य ठिकाणी खर्च होईल याची खात्री करतो.'
    },
    'industrial-seo-waluj-midc.html': {
        'title': 'वाळूज MIDC साठी इंडस्ट्रियल SEO | छत्रपती संभाजीनगर',
        'hero_h1': 'वाळूज MIDC मधील <span class="gradient-text">मॅन्युफॅक्चरिंग</span> युनिट्ससाठी SEO.',
        'hero_p': 'तुमच्या कारखान्याला जागतिक पुरवठा साखळीत (Supply Chain) व्हिजिबिलिटी मिळवून द्या. आम्ही वाळूजमधील औद्योगिक गरजा समजतो.',
        'sec1_h2': 'औद्योगिक क्षेत्रातील आव्हाने आणि आमचे उपाय',
        'sec1_p': 'B2B कंपन्यांसाठी आम्ही विशेष लीड जनरेशन स्ट्रॅटेजी वापरतो.'
    },
    'b2b-lead-gen-shendra-midc.html': {
        'title': 'शेंद्रा MIDC साठी B2B लीड जनरेशन | छत्रपती संभाजीनगर',
        'hero_h1': 'शेंद्रा MIDC मधील कंपन्यांसाठी <span class="gradient-text">B2B</span> लीड्स.',
        'hero_p': 'तुमच्या शेंद्रा येथील व्यवसायासाठी उच्च दर्जाच्या ऑपरेशन्स आणि सप्लाय चेन लीड्स मिळवा. स्थानिक तज्ञांकडून मार्केटिंग.',
        'sec1_h2': 'B2B मार्केटिंगमध्ये आमचे कौशल्य',
        'sec1_p': 'आम्ही शेंद्रा आणि ऑरिक (AURIC) सिटीमधील प्रगत उद्योगांसाठी काम करतो.'
    },
    'gmb.html': {
        'title': 'GMB ऑप्टिमायझेशन | छत्रपती संभाजीनगरमधील स्थानिक SEO',
        'hero_h1': 'Google Maps वर <span class="gradient-text">अव्वल</span> स्थानी या.',
        'hero_p': 'तुमचा Google Business Profile ऑप्टिमाइझ करा आणि स्थानिक ग्राहकांकडून थेट कॉल्स मिळवा.',
        'sec1_h2': 'स्थानिक वर्चस्व मिळवा',
        'sec1_p': 'जर तुमचा व्यवसाय स्थानिक नकाशात दिसत नसेल, तर तुम्ही ७०% ग्राहक गमावत आहात.'
    },
    'healthcare-marketing-csn.html': {
        'title': 'हेल्थकेअर मार्केटिंग | छत्रपती संभाजीनगरमधील डॉक्टर्स आणि हॉस्पिटल्ससाठी',
        'hero_h1': 'तुमच्या हॉस्पिटलसाठी <span class="gradient-text">विश्वासार्ह</span> डिजिटल उपस्थिती.',
        'hero_p': 'छत्रपती संभाजीनगरमधील डॉक्टरांसाठी विशेष रुग्ण-केंद्रित मार्केटिंग स्ट्रॅटेजी. रुग्णांचा विश्वास जिंका.',
        'sec1_h2': 'वैद्यकीय क्षेत्रासाठी आमचे उपाय',
        'sec1_p': 'आम्ही हेल्थकेअर क्षेत्रातील संवेदनशीलता आणि नियमांचे पालन करून मार्केटिंग करतो.'
    }
}

for filename, trans in translations.items():
    filepath = os.path.join(mr_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace title
        content = re.sub(r'<title>.*?</title>', f'<title>{trans["title"]}</title>', content)

        # Replace Hero H1
        content = re.sub(r'<h1>.*?</h1>', f'<h1>{trans["hero_h1"]}</h1>', content)

        # Replace Hero P (first one usually)
        content = re.sub(r'<p>\s*(April 2026 market context|Expert Meta and Google Ads|Dominate local search|Stop wasting budgets|Meet Vedisha Marketing|Vedisha Marketing is the digital).*?</p>', f'<p>{trans["hero_p"]}</p>', content, flags=re.DOTALL)

        # Replace first H2 in main
        content = re.sub(r'<h2.*?>.*?</h2>', f'<h2>{trans["sec1_h2"]}</h2>', content, count=1)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Improved Marathi translations applied.")
