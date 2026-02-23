
import fs from 'fs';

const subjectChapters = {
  hsc: {
    bangla: [
      {
        name: "বাংলা ১ম পত্র গদ্য : অপরিচিতা",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_bangla_1st_paper_oporichita.json",
      },
      {
        name: "বাংলা ১ম পত্র গদ্য : বিলাসী",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_bangla_1st_paper_bilasy.json",
      },
      {
        name: "বাংলা ১ম পত্র পদ্য : ঋতু বর্ণন",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_bangla_1st_paper_ritubornon.json",
      }
    ],
    english: [
      {
        name: "English 2nd Paper : Changing Sentence",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_english_2nd_paper_changing.json",
      },
      {
        name: "English 2nd Paper : Right Form Of Verb",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_english_2nd_paper_rightformofverb.json",
      },
      {
        name: "English 2nd Paper : Synonym & Antonym",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_english_2nd_paper_synanty.json",
      },
      {
        name: "English 2nd Paper : Word Meaning",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_english_2nd_paper_wordmeaning.json",
      }
    ],
    ict: [
      {
        name: "ICT অধ্যায় ৫",
        url: "https://raw.githubusercontent.com/kafaahbd/Question/refs/heads/main/ict_hsc_5.json",
      },
    ],
    physics: [
      {
        name: "পদার্থ ১ম পত্র অধ্যায় ৩ ",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_physcis_chapter_3_1st_paper.json",
      },
      {
        name: "পদার্থ ১ম পত্র অধ্যায় ৪ ",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_physcis_chapter_4_1st_paper.json",
      }
    ],
    chemistry: [
      {
        name: "রসায়ন ১ম পত্র অধ্যায় ২ ",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_chemistry_chapter_2_1st_paper.json",
      },
    ],
    biology: [
      {
        name: "জীববিজ্ঞান ১ম পত্র অধ্যায় ১ ",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_biology_chapter_1_1st_paper.json",
      },
      {
        name: "জীববিজ্ঞান ১ম পত্র অধ্যায় ২ ",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_biology_1st_paper_chapter_2.json",
      },
      {
        name: "জীববিজ্ঞান ১ম পত্র অধ্যায় ৩ ",
        url: "https://raw.githubusercontent.com/kafaahbd/Question/refs/heads/main/Botany-3.json",
      },
      {
        name: "জীববিজ্ঞান ২য় পত্র অধ্যায় ১ ",
        url: "https://raw.githubusercontent.com/kafaahbd/nothing/refs/heads/main/hsc_biology_2nd_paper_chapter_1.json",
      },
    ],
    highermath: [
      {
        name: "উচ্চতর গণিত ১ম পত্র অধ্যায় ৭",
        url: "https://raw.githubusercontent.com/kafaahbd/Question/refs/heads/main/trigonometry_hsc_7.json",
      },
    ]
  },
  admission: {
    "engineering-highermath": [
      { name: "উচ্চতর গণিত (ইঞ্জিনিয়ারিং) অধ্যায় ৭", url: "https://raw.githubusercontent.com/kafaahbd/Question/refs/heads/main/engineering_hm_7.json" },
    ]
  }
};

async function migrate() {
  let allSql = "";

  for (const [group, subjects] of Object.entries(subjectChapters)) {
    for (const [subjectId, chapters] of Object.entries(subjects)) {
      for (const chapter of chapters) {
        if (chapter.url === "#" || chapter.url === "supabase") continue;

        console.log(`Fetching ${chapter.name}...`);
        try {
          const res = await fetch(chapter.url);
          const data = await res.json();

          for (const q of data) {
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
              const mapping = { a: 0, b: 1, c: 2, d: 3 };
              answerIndex = mapping[q.correct_answer.toLowerCase()] ?? 0;
            }

            const sql = `INSERT INTO questions (category_group, subject_id, chapter_name, question_text, options, correct_option, explanation) VALUES (
              '${group}',
              '${subjectId}',
              '${chapter.name.replace(/'/g, "''")}',
              '${q.question.replace(/'/g, "''")}',
              ARRAY[${optionsArray.map(opt => `'${opt.replace(/'/g, "''")}'`).join(', ')}],
              ${answerIndex},
              '${(q.explanation || '').replace(/'/g, "''")}'
            );\n`;
            allSql += sql;
          }
        } catch (err) {
          console.error(`Error fetching ${chapter.name}:`, err);
        }
      }
    }
  }

  fs.writeFileSync('migration.sql', allSql);
  console.log("Migration SQL generated in migration.sql");
}

migrate();
