// tests/helpers/i18n-data.js
export const I18N_DATA = {
  vi: {
    nav: { about: 'Giới thiệu', experience: 'Kinh nghiệm', education: 'Học vấn', skills: 'Kỹ năng', projects: 'Dự án' },
    buttons: { print: 'In CV', export_pdf: 'Xuất PDF', exporting: 'Đang tạo...' },
    sections: {
      experience_title: 'Kinh Nghiệm Làm Việc',
      education_title: 'Học Vấn',
      skills_title: 'Kỹ Năng',
      projects_title: 'Dự Án',
      hobbies_title: 'Sở thích',
      contact_title: 'Thông tin liên hệ',
      achievements_label: 'Những điều đạt được:'
    },
    profile: {
      title: 'Automation Test Engineer',
      summary: 'Tóm tắt tiếng Việt.',
      address: 'Ngõ 332, Đường Lĩnh Nam, Hà Nội',
      hobbies: [
        { icon: '🔬', name: 'Nghiên cứu công nghệ mới' },
        { icon: '💻', name: 'Lập trình và tự động hóa' }
      ]
    },
    experience: [
      {
        title: 'Automation Tester',
        company: 'TPBank',
        start: '09/2022',
        end: 'Hiện tại',
        responsibilities: ['Xây dựng framework kiểm thử.']
      }
    ],
    education: [
      {
        degree: 'Công nghệ thông tin',
        institution: 'Trường Đại Học Bách Khoa Hà Nội',
        start: '2009',
        end: '2012',
        description: 'Hệ Cao Đẳng'
      }
    ],
    skills: [
      { category: 'Coding', description: 'Java, JavaScript' }
    ]
  },
  en: {
    nav: { about: 'About', experience: 'Experience', education: 'Education', skills: 'Skills', projects: 'Projects' },
    buttons: { print: 'Print CV', export_pdf: 'Export PDF', exporting: 'Generating...' },
    sections: {
      experience_title: 'Work Experience',
      education_title: 'Education',
      skills_title: 'Skills',
      projects_title: 'Projects',
      hobbies_title: 'Hobbies',
      contact_title: 'Contact Information',
      achievements_label: 'Achievements:'
    },
    profile: {
      title: 'Automation Test Engineer',
      summary: 'English summary.',
      address: 'Lane 332, Linh Nam Street, Hanoi',
      hobbies: [
        { icon: '🔬', name: 'Researching new technologies' },
        { icon: '💻', name: 'Programming and automation' }
      ]
    },
    experience: [
      {
        title: 'Automation Tester',
        company: 'Tien Phong Commercial Joint Stock Bank (TPBank)',
        start: '09/2022',
        end: 'Present',
        responsibilities: ['Built and defined the testing framework.']
      }
    ],
    education: [
      {
        degree: 'Information Technology',
        institution: 'Hanoi University of Science and Technology',
        start: '2009',
        end: '2012',
        description: 'College Program'
      }
    ],
    skills: [
      { category: 'Coding', description: 'Java, JavaScript' }
    ]
  },
  zh: {
    nav: { about: '关于', experience: '工作经历', education: '教育背景', skills: '技能', projects: '项目' },
    buttons: { print: '打印简历', export_pdf: '导出PDF', exporting: '生成中...' },
    sections: {
      experience_title: '工作经历',
      education_title: '教育背景',
      skills_title: '技能',
      projects_title: '项目',
      hobbies_title: '兴趣爱好',
      contact_title: '联系方式',
      achievements_label: '主要成就：'
    },
    profile: {
      title: '自动化测试工程师',
      summary: '中文摘要。',
      address: '河内灵南路332巷',
      hobbies: [
        { icon: '🔬', name: '研究新技术' },
        { icon: '💻', name: '编程与自动化' }
      ]
    },
    experience: [
      {
        title: '自动化测试工程师',
        company: '先锋商业股份银行 (TPBank)',
        start: '09/2022',
        end: '至今',
        responsibilities: ['构建并定义测试框架。']
      }
    ],
    education: [
      {
        degree: '信息技术',
        institution: '河内理工大学',
        start: '2009',
        end: '2012',
        description: '大专课程'
      }
    ],
    skills: [
      { category: '编程语言', description: 'Java, JavaScript' }
    ]
  }
};
