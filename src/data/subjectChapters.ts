export interface Chapter {
  name: string;
  url: string;
}

export interface SubjectChapters {
  [group: string]: {
    [subject: string]: Chapter[];
  };
}

export const subjectChapters: SubjectChapters = {
  // ========== SSC ==========
  ssc: {
    // Common Subjects
    bangla: [
      { name: "সুপাবেস টেস্ট চ্যাপ্টার (SSC)", url: "supabase" },
      { name: "বাংলা ১ম পত্র অধ্যায় ১", url: "#" },
      { name: "বাংলা ১ম পত্র অধ্যায় ২", url: "#" },
    ],
    english: [{ name: "English 1st Paper Chapter 1", url: "#" }],
    ict: [{ name: "ICT অধ্যায় ১", url: "#" }],
    math: [{ name: "সাধারণ গণিত অধ্যায় ১", url: "#" }],
    islam: [{ name: "ইসলাম শিক্ষা অধ্যায় ১", url: "#" }],
    // Science
    physics: [
      { name: "পদার্থ ১ম পত্র অধ্যায় ৩", url: "#" },
      { name: "পদার্থ ১ম পত্র অধ্যায় ৪", url: "#" },
    ],
    chemistry: [{ name: "রসায়ন ১ম পত্র অধ্যায় ১", url: "#" }],
    biology: [{ name: "জীববিজ্ঞান অধ্যায় ১", url: "#" }],
    // Arts
    history: [{ name: "ইতিহাস অধ্যায় ১", url: "#" }],
    civics: [{ name: "পৌরনীতি অধ্যায় ১", url: "#" }],
    geography: [{ name: "ভূগোল অধ্যায় ১", url: "#" }],
    // Commerce
    accounting: [{ name: "হিসাববিজ্ঞান অধ্যায় ১", url: "#" }],
    business: [{ name: "ব্যবসায় উদ্যোগ অধ্যায় ১", url: "#" }],
    finance: [{ name: "ফাইন্যান্স অধ্যায় ১", url: "#" }],
    // Optional
    highermath: [{ name: "উচ্চতর গণিত অধ্যায় ১", url: "#" }],
    agriculture: [{ name: "কৃষি শিক্ষা অধ্যায় ১", url: "#" }],
    health: [{ name: "স্বাস্থ্য বিজ্ঞান অধ্যায় ১", url: "#" }],
  },

  // ========== HSC ==========
  hsc: {
    // Common
    bangla: [
      {
        name: "বাংলা ১ম পত্র গদ্য : অপরিচিতা",
        url: "supabase",
      },
      {
        name: "বাংলা ১ম পত্র গদ্য : বিলাসী",
        url: "supabase",
      },
      {
        name: "বাংলা ১ম পত্র পদ্য : ঋতু বর্ণন",
        url: "supabase",
      },
      { name: "বাংলা ২য় পত্র অধ্যায় ১", url: "#" },
    ],
    english: [
      {
        name: "English 2nd Paper : Changing Sentence",
        url: "supabase",
      },
      {
        name: "English 2nd Paper : Right Form Of Verb",
        url: "supabase",
      },
      {
        name: "English 2nd Paper : Synonym & Antonym",
        url: "supabase",
      },
      {
        name: "English 2nd Paper : Word Meaning",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_english_2nd_paper_wordmeaning.json",
      },
      { name: "English 2nd Paper Chapter 1", url: "#" },
    ],
    ict: [
      {
        name: "ICT অধ্যায় ৫",
        url: "supabase",
      },
    ],
    // Science
    physics: [
      {
        name: "পদার্থ ১ম পত্র অধ্যায় ৩ ",
        url: "supabase",
      },
      {
        name: "পদার্থ ১ম পত্র অধ্যায় ৪ ",
        url: "supabase",
      },
      // অন্যান্য অধ্যায়
    ],
    chemistry: [
      { name: "রসায়ন ১ম পত্র অধ্যায় ১", url: "#" },
      {
        name: "রসায়ন ১ম পত্র অধ্যায় ২ ",
        url: "supabase",
      },
    ],
    biology: [
      {
        name: "জীববিজ্ঞান ১ম পত্র অধ্যায় ১ ",
        url: "supabase",
      },
      {
        name: "জীববিজ্ঞান ১ম পত্র অধ্যায় ২ ",
        url: "supabase",
      },
      {
        name: "জীববিজ্ঞান ১ম পত্র অধ্যায় ৩ ",
        url: "supabase",
      },
      {
        name: "জীববিজ্ঞান ২য় পত্র অধ্যায় ১ ",
        url: "supabase",
      },
    ],
    highermath: [
      {
        name: "উচ্চতর গণিত ১ম পত্র অধ্যায় ৭",
        url: "supabase",
      },
    ],
    // Arts
    history: [{ name: "ইতিহাস অধ্যায় ১", url: "#" }],
    islamic: [{ name: "ইসলামের ইতিহাস অধ্যায় ১", url: "#" }],
    civics: [{ name: "পৌরনীতি অধ্যায় ১", url: "#" }],
    economics: [{ name: "অর্থনীতি অধ্যায় ১", url: "#" }],
    geography: [{ name: "ভূগোল অধ্যায় ১", url: "#" }],
    // Commerce
    accounting: [
      { name: "হিসাববিজ্ঞান ১ম পত্র অধ্যায় ১", url: "#" },
      { name: "হিসাববিজ্ঞান ২য় পত্র অধ্যায় ১", url: "#" },
    ],
    management: [{ name: "ব্যবস্থাপনা অধ্যায় ১", url: "#" }],
    finance: [{ name: "ফাইন্যান্স অধ্যায় ১", url: "#" }],
    business: [{ name: "ব্যবসায় সংগঠন অধ্যায় ১", url: "#" }],
    marketing: [{ name: "মার্কেটিং অধ্যায় ১", url: "#" }],
  },

  // ========== Admission ==========
  admission: {
    "engineering-physics": [
      { name: "পদার্থ (ইঞ্জিনিয়ারিং) অধ্যায় ১", url: "#" },
    ],
    "engineering-chemistry": [
      { name: "রসায়ন (ইঞ্জিনিয়ারিং) অধ্যায় ১", url: "#" },
    ],
    "engineering-math": [{ name: "গণিত (ইঞ্জিনিয়ারিং) অধ্যায় ১", url: "#" }],
    "engineering-highermath": [
      { name: "উচ্চতর গণিত (ইঞ্জিনিয়ারিং) অধ্যায় ৭", url: "supabase" },
    ],
    "medical-physics": [{ name: "পদার্থ (মেডিকেল) অধ্যায় ১", url: "#" }],
    "medical-chemistry": [{ name: "রসায়ন (মেডিকেল) অধ্যায় ১", url: "#" }],
    "medical-biology": [{ name: "জীববিজ্ঞান (মেডিকেল) অধ্যায় ১", url: "#" }],
    "university-bangla": [{ name: "বাংলা (বিশ্ববিদ্যালয়) অধ্যায় ১", url: "#" }],
    "university-english": [
      { name: "ইংরেজি (বিশ্ববিদ্যালয়) অধ্যায় ১", url: "#" },
    ],
    "university-gk": [{ name: "সাধারণ জ্ঞান অধ্যায় ১", url: "#" }],
  },
};
