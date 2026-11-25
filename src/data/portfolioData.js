export const PORTFOLIO_DATA = {
  team: {
    name: "Kelompok 2",
    tagline: "Tiga mahasiswa Sistem Informasi Telkom University Jakarta yang membangun antarmuka yang rapi dan mudah dipakai.",
    email: "kelompok2@example.com",
    socials: {
      LinkedIn: "https://linkedin.com/",
      GitHub: "https://github.com/",
      Instagram: "https://instagram.com/"
    }
  },
  members: [
    {
      id: "m1",
      name: "Rama Dwi Prasetya",
      role: "Web & Full-Stack Developer",
      photo: "asset/PasFoto_Rama.png",
      bio: "Mahasiswa aktif semester 7 Program Studi Sistem Informasi di Telkom University Kampus Jakarta. Saya memiliki rasa ingin tahu yang tinggi serta semangat belajar yang kuat terhadap perkembangan teknologi informasi. Dengan sikap disiplin, tanggung jawab, dan kemampuan komunikasi yang baik, saya mampu bekerja secara efektif, baik dalam tim maupun secara mandiri. Saya juga memiliki ketertarikan besar dalam pengembangan sistem berbasis web, analisis data, serta manajemen proyek teknologi informasi. Selain itu, saya berkomitmen untuk terus mengasah keterampilan teknis, memperluas wawasan, dan meningkatkan kemampuan berpikir kritis guna mempersiapkan diri menghadapi tantangan dunia kerja yang dinamis dan kompetitif di era digital.",
      education: "S1 Sistem Informasi (102042300142), Telkom University Kampus Jakarta",
      links: {
        linkedin: "https://www.linkedin.com/in/ramadwiprstya/",
        github: "https://github.com/ramadwiprstya"
      },
      skills: {
        technical: [
          { name: "Laravel/PHP", level: 85 },
          { name: "MySQL", level: 85 },
          { name: "Full-Stack Dev", level: 88 },
          { name: "UI/UX Design", level: 80 }
        ],
        soft: [
          { name: "Problem Solving", level: 88 },
          { name: "Teamwork", level: 85 },
          { name: "Critical Thinking", level: 82 }
        ]
      },
      experience: [
        {
          type: "magang",
          period: "Jun-Agu 2026",
          role: "Full-Stack Developer Intern",
          institution: "PT Imeco Inter Saran",
          description: "Pengembangan website commercial property SBU Property and Infrastructure."
        },
        {
          type: "magang",
          period: "Feb-Mei 2022",
          role: "UI/UX Designer",
          institution: "PT Telkom DCS",
          description: "Merancang antarmuka web intuitif dan standarisasi komponen desain."
        }
      ]
    },
    {
      id: "m2",
      name: "Flora Syifa",
      role: "Front-end Developer & UI/UX Designer",
      photo: "",
      bio: "Mahasiswi Sistem Informasi Telkom University Jakarta yang berfokus pada perancangan antarmuka, pengalaman pengguna, dan pengembangan front-end.",
      education: "S1 Sistem Informasi (102042300122), Telkom University Kampus Jakarta",
      links: {
        linkedin: "https://linkedin.com/",
        github: "https://github.com/florasyifa9",
        instagram: "https://instagram.com/"
      },
      skills: {
        technical: [],
        soft: [
          { name: "Komunikasi", level: 88 },
          { name: "Kreativitas", level: 85 },
          { name: "Manajemen Waktu", level: 82 }
        ]
      },
      experience: []
    },
    {
      id: "m3",
      name: "Alvian Yusuf Nawawi",
      role: "Back-end Developer & System Analyst",
      photo: "",
      bio: "Mahasiswa Sistem Informasi Telkom University Jakarta yang berfokus pada arsitektur sistem backend, perancangan basis data, dan integrasi API.",
      education: "S1 Sistem Informasi (102042300129), Telkom University Kampus Jakarta",
      links: {
        linkedin: "https://linkedin.com/",
        github: "https://github.com/sickpytheprodigy",
        instagram: "https://instagram.com/"
      },
      skills: {
        technical: [],
        soft: [
          { name: "Pemecahan Masalah", level: 88 },
          { name: "Kerja Sama", level: 85 },
          { name: "Analisis Sistem", level: 84 }
        ]
      },
      experience: []
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Website Absensi Sekolah",
      category: "Web Development",
      description: "Sistem informasi absensi sekolah berbasis web yang dirancang untuk mengotomatisasi pencatatan kehadiran siswa dan staf pengajar menggunakan Laravel, PHP, dan MySQL.",
      techStack: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
      members: [
        { id: "m1", role: "Full-Stack Development" }
      ],
      gallery: [
        { src: "", alt: "Website Absensi Sekolah" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: "p2",
      title: "FitTrack",
      category: "Web Development",
      description: "Aplikasi web interaktif untuk pemantauan nutrisi dan kalori harian yang memudahkan pengguna dalam mengontrol asupan gizi dan melacak progres kebugaran.",
      techStack: ["PHP", "MySQL", "JavaScript", "CSS3", "Chart.js"],
      members: [
        { id: "m1", role: "Web Application Developer" }
      ],
      gallery: [
        { src: "", alt: "FitTrack" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: "p3",
      title: "Website Company Profile — Beltway Office Park",
      category: "Web Development",
      description: "Website company profile profesional untuk kawasan properti komersial Beltway Office Park di bawah naungan PT Imeco Inter Saran (SBU Property and Infrastructure).",
      techStack: ["HTML5", "CSS3", "JavaScript", "PHP"],
      members: [
        { id: "m1", role: "Website Development" }
      ],
      gallery: [
        { src: "", alt: "Beltway Office Park" }
      ],
      demoUrl: "https://beltwayofficepark.com/",
      repoUrl: "#"
    },
    {
      id: "p4",
      title: "Aplikasi To-Do List",
      category: "Web Development",
      description: "Aplikasi pengelolaan tugas harian yang intuitif, cepat, dan ringan dengan penyimpanan data lokal di browser menggunakan LocalStorage API.",
      techStack: ["JavaScript", "LocalStorage API", "HTML5", "CSS3"],
      members: [
        { id: "m1", role: "Web Application Developer" }
      ],
      gallery: [
        { src: "", alt: "Aplikasi To-Do List" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: "p5",
      title: "Aplikasi Pencatatan Keuangan",
      category: "Web Development",
      description: "Aplikasi web pencatatan keuangan pribadi dan usaha mikro untuk mencatat aliran transaksi kas masuk (income) dan kas keluar (expense) secara transparan.",
      techStack: ["PHP", "MySQL", "JavaScript", "CSS3"],
      members: [
        { id: "m1", role: "Web Application Developer" }
      ],
      gallery: [
        { src: "", alt: "Aplikasi Pencatatan Keuangan" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: "p6",
      title: "Sistem Layanan Pengaduan Sekolah",
      category: "Web Development",
      description: "Sistem informasi layanan pengaduan dan aspirasi sekolah yang dibangun untuk memfasilitasi komunikasi transparan dan akuntabel antara siswa, wali, dan pihak sekolah.",
      techStack: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
      members: [
        { id: "m1", role: "Information System Developer" }
      ],
      gallery: [
        { src: "", alt: "Sistem Layanan Pengaduan Sekolah" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: "p7",
      title: "Sistem Monitoring Kekeringan di Gunungkidul",
      category: "Web Development",
      description: "Sistem informasi pemantauan kondisi kekeringan regional di Kabupaten Gunungkidul untuk pemetaan titik rawan dan koordinasi distribusi bantuan air bersih.",
      techStack: ["PHP", "MySQL", "JavaScript", "Web GIS", "CSS3"],
      members: [
        { id: "m1", role: "Information System Developer" }
      ],
      gallery: [
        { src: "", alt: "Monitoring Kekeringan Gunungkidul" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: "p8",
      title: "Business Process Analyst — PT Pegadaian",
      category: "Business Analysis",
      description: "Proyek analisis proses bisnis komprehensif pada layanan operasional PT Pegadaian dengan investigasi alur AS-IS, Root Cause Analysis, dan pemodelan TO-BE BPMN 2.0.",
      techStack: ["BPMN 2.0", "Bizagi", "Draw.io", "Process Modeling", "Gap Analysis"],
      members: [
        { id: "m1", role: "Business Process Analyst" }
      ],
      gallery: [
        { src: "", alt: "BPMN PT Pegadaian" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: "p9",
      title: "UI/UX Designer — PT Pegadaian",
      category: "UI/UX Design",
      description: "Studi kasus perancangan antarmuka dan pengalaman pengguna (UI/UX) untuk aplikasi digital PT Pegadaian, mencakup user journey, wireframing, dan prototipe Figma.",
      techStack: ["Figma", "UI/UX Research", "Wireframing", "Interactive Prototyping", "Design System"],
      members: [
        { id: "m1", role: "UI/UX Designer" }
      ],
      gallery: [
        { src: "", alt: "UI/UX PT Pegadaian" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: "p10",
      title: "Enterprise Architecture — PT Graha Kreatif",
      category: "Enterprise Architecture",
      description: "Perancangan blueprint Enterprise Architecture untuk PT Graha Kreatif mengadopsi TOGAF ADM, menyelaraskan tujuan strategis bisnis dengan arsitektur TI.",
      techStack: ["TOGAF ADM", "Enterprise Architecture", "ArchiMate", "Business-IT Alignment"],
      members: [
        { id: "m1", role: "Enterprise Architecture Analyst" }
      ],
      gallery: [
        { src: "", alt: "TOGAF PT Graha Kreatif" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: "p11",
      title: "Data Analyst — Dataset Toko Retail",
      category: "Data Analytics",
      description: "Analisis data transaksi penjualan pada toko ritel untuk menggali pola belanja pelanggan, mengidentifikasi produk unggulan, dan memvisualisasikan tren penjualan.",
      techStack: ["Python", "Pandas", "SQL", "Data Cleaning", "Data Visualization"],
      members: [
        { id: "m1", role: "Data Analyst" }
      ],
      gallery: [
        { src: "", alt: "Data Analyst Retail Dashboard" }
      ],
      demoUrl: "#",
      repoUrl: "#"
    }
  ],
  certificates: [
    { memberId: "m1", title: "Kualifikasi II Rekayasa Perangkat Lunak", issuer: "BNSP (Badan Nasional Sertifikasi Profesi)", year: 2023, verifyUrl: "https://ramadwiprstya.vercel.app/" }
  ]
};

export const BOX_CONFIGS = [
  { id: 'home', label: ['BERANDA', ''], color: 'o', tag: 'TIM', pos: [0.48, 0.66, -14, -24, 6], title: 'Beranda' },
  { id: 'about', label: ['TENTANG', 'KAMI'], color: 'w', tag: '02', pos: [0.13, 0.86, -16, 28, 16], title: 'Tentang' },
  { id: 'skills', label: ['KEAH', 'LIAN'], color: 'o', tag: '03', pos: [0.36, 0.90, -12, -20, -10], title: 'Keahlian' },
  { id: 'exp', label: ['PENGA', 'LAMAN'], color: 'w', tag: '04', pos: [0.60, 0.88, -14, 24, 12], title: 'Pengalaman' },
  { id: 'port', label: ['PORTO', 'FOLIO'], color: 'o', tag: '05', pos: [0.86, 0.86, -16, -30, -14], title: 'Portofolio' },
  { id: 'contact', label: ['KONTAK', ''], color: 'w', tag: '06', pos: [0.25, 0.68, -14, 30, -12], title: 'Kontak' },
  { id: 'team', label: ['TIM', 'KAMI'], color: 'o', tag: '07', pos: [0.73, 0.68, -14, -26, 16], title: 'Tim Kami' }
];

export const UNIQUE_TECH = [...new Set(PORTFOLIO_DATA.projects.flatMap(p => p.techStack))];
export const STATS = [
  [PORTFOLIO_DATA.projects.length, 'Proyek'],
  [PORTFOLIO_DATA.members.length, 'Anggota'],
  [UNIQUE_TECH.length, 'Teknologi']
];

export const getMember = (id) => PORTFOLIO_DATA.members.find(m => m.id === id);

export const placeholderImg = (text) =>
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="150"><rect width="100%" height="100%" fill="#efe3c8"/><text x="120" y="75" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#1b1813">Gambar contoh: ${text}</text></svg>`
  );
