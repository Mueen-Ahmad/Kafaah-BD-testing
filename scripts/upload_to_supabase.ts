
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase credentials missing in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const subjectChapters = {
  hsc: {
    bangla: [
      { name: "বাংলা ১ম পত্র গদ্য : অপরিচিতা", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_bangla_1st_paper_oporichita.json" },
      { name: "বাংলা ১ম পত্র গদ্য : বিলাসী", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_bangla_1st_paper_bilasy.json" },
      { name: "বাংলা ১ম পত্র পদ্য : ঋতু বর্ণন", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_bangla_1st_paper_ritubornon.json" }
    ],
    english: [
      { name: "English 2nd Paper : Changing Sentence", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_english_2nd_paper_changing.json" },
      { name: "English 2nd Paper : Right Form Of Verb", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_english_2nd_paper_rightformofverb.json" },
      { name: "English 2nd Paper : Synonym & Antonym", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_english_2nd_paper_synanty.json" }
    ],
    ict: [
      { name: "ICT অধ্যায় ৫", url: "https://raw.githubusercontent.com/kafaahbd/Question/refs/heads/main/ict_hsc_5.json" }
    ],
    physics: [
      { name: "পদার্থ ১ম পত্র অধ্যায় ৩ ", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_physcis_chapter_3_1st_paper.json" },
      { name: "পদার্থ ১ম পত্র অধ্যায় ৪ ", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_physcis_chapter_4_1st_paper.json" }
    ],
    chemistry: [
      { name: "রসায়ন ১ম পত্র অধ্যায় ২ ", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_chemistry_chapter_2_1st_paper.json" }
    ],
    biology: [
      { name: "জীববিজ্ঞান ১ম পত্র অধ্যায় ১ ", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_biology_chapter_1_1st_paper.json" },
      { name: "জীববিজ্ঞান ১ম পত্র অধ্যায় ২ ", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_biology_1st_paper_chapter_2.json" },
      { name: "জীববিজ্ঞান ১ম পত্র অধ্যায় ৩ ", url: "https://raw.githubusercontent.com/kafaahbd/Question/refs/heads/main/Botany-3.json" },
      { name: "জীববিজ্ঞান ২য় পত্র অধ্যায় ১ ", url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_biology_2nd_paper_chapter_1.json" }
    ],
    highermath: [
      { name: "উচ্চতর গণিত ১ম পত্র অধ্যায় ৭", url: "https://raw.githubusercontent.com/kafaahbd/Question/refs/heads/main/trigonometry_hsc_7.json" }
    ]
  },
  admission: {
    "engineering-highermath": [
      { name: "উচ্চতর গণিত (ইঞ্জিনিয়ারিং) অধ্যায় ৭", url: "https://raw.githubusercontent.com/kafaahbd/Question/refs/heads/main/engineering_hm_7.json" }
    ]
  }
};

async function upload() {
  console.log("Starting upload to Supabase...");

  for (const [group, subjects] of Object.entries(subjectChapters)) {
    for (const [subjectId, chapters] of Object.entries(subjects)) {
      for (const chapter of chapters) {
        console.log(`Processing: ${chapter.name}...`);
        try {
          const res = await fetch(chapter.url);
          const questions = await res.json();

          const formattedQuestions = questions.map((q: any) => {
            // Normalize options
            let optionsArray = [];
            if (q.options && typeof q.options === 'object' && !Array.isArray(q.options)) {
              optionsArray = [q.options.a, q.options.b, q.options.c, q.options.d].filter(opt => opt !== undefined);
            } else if (Array.isArray(q.options)) {
              optionsArray = q.options;
            }

            // Normalize answer
            let answerIndex = typeof q.answer === 'number' ? q.answer : 0;
            if (q.correct_answer && typeof q.correct_answer === 'string') {
              const mapping: any = { a: 0, b: 1, c: 2, d: 3 };
              answerIndex = mapping[q.correct_answer.toLowerCase()] ?? 0;
            }

            return {
              category_group: group,
              subject_id: subjectId,
              chapter_name: chapter.name,
              question_text: q.question,
              options: optionsArray,
              correct_option: answerIndex,
              explanation: q.explanation || ''
            };
          });

          // Insert in batches of 50 to avoid payload limits
          for (let i = 0; i < formattedQuestions.length; i += 50) {
            const batch = formattedQuestions.slice(i, i + 50);
            const { error } = await supabase.from('questions').insert(batch);
            if (error) throw error;
          }

          console.log(`✅ Successfully uploaded ${formattedQuestions.length} questions for ${chapter.name}`);
        } catch (err) {
          console.error(`❌ Error uploading ${chapter.name}:`, err);
        }
      }
    }
  }

  console.log("All done! Check your Supabase Table Editor.");
}

upload();
