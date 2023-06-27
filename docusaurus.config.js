// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/vsLight");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Zack's note and blogs",
  tagline: "Brief notes here and there",
  url: "https://zack.onrender.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "zekaryas1", // Usually your GitHub org/user name.
  projectName: "notes", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/zekaryas1/notes/blob/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/zekaryas1/notes/blob/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      announcementBar: {
        id: "support_us",
        content:
          '⭐️ If this website can help you, give a star to support the author on <a target="_blank" rel="noopener noreferrer" href="https://github.com/zekaryas1/notes">GitHub</a>',
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: true,
      },
      navbar: {
        title: "Zack's",
        hideOnScroll: true,
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "search",
            position: "right",
          },
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Note",
          },
          { to: "/resume", label: "Resume", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/zekaryas1/notes",
            label: "GitHub",
            position: "left",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Notes on",
            items: [
              {
                label: "Algorithm & Data structure",
                to: "/docs/Algo/Fundamental Algorithms/Sorting algos/Radix Sort",
              },
              {
                label: "Python tips and Tricks",
                to: "/docs/Algo/Tips & Tricks/Useful Python Collections module",
              },
            ],
          },
          {
            title: "More Notes on",
            items: [
              {
                label: "Docker & Docker compose",
                to: "/docs/Containerization/Docker/General Step to Dockerizing a Project",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/zekaryas1/notes",
              },
              {
                label: "Contact me on Linkedin",
                href: "https://www.linkedin.com/in/zekaryas-tadele-dinku",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash"],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "4QUF041B88",
        // Public API key: it is safe to commit it
        apiKey: "160f52becaea805c46780c776893836e",
        indexName: "zack-onrender",
        debug: false,
      },
      metadata: [
        {
          name: "keywords",
          content: `Programming language notes, Docker notes, TypeScript notes, Algorithm and data structure notes, Technical notes for programmers, Programming tips and tricks, Coding best practices, Beginner-friendly programming resources, Learning resources for new programmers, Programming tutorials, Code snippets and examples, Software engineering insights`,
        },
        {
          name: "description",
          content: `Welcome to my website, where I share my technical notes on software engineering, coding, and programming languages. You'll also find my resume, which highlights my experience and side projects. Whether you're interested in web development, front-end development, or back-end development, you're sure to find valuable insights and information here.`,
        },
      ],
    }),
};

module.exports = config;
