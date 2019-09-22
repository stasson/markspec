const readPkgUp = require("read-pkg-up");
const cosmiconfig = require("cosmiconfig");
const explorer = cosmiconfig("vuepress");
const path = require("path");
const startCase = require("lodash/startCase");
const lowerCase = require("lodash/lowerCase");

module.exports = (_, ctx) => {
  const { sourceDir, siteConfig } = ctx;

  let { themeConfig = {} } = siteConfig;
  const { package: pkg } = readPkgUp.sync({ cwd: sourceDir }) || {
    package: {}
  };
  const { config } = explorer.searchSync(sourceDir) || { config: {} };
  const {
    title = siteConfig.title || pkg.name,
    description = siteConfig.description || pkg.description,
    author = (pkg.author && pkg.author.email) || undefined,
    logo = (themeConfig && themeConfig.logo) || "/favicon.png",
    autonav = true,
    sidebar = themeConfig.sidebar || "auto",
    nav = themeConfig.nav || [],
    links = [],
    repository = pkg.repository && (pkg.repository.url || pkg.repository),
    markdown = siteConfig.markdown || {
      lineNumbers: true
    },
    lastUpdated = "Last Updated",
    evergreen = siteConfig.evergreen || true,
    dbgDump
  } = config;

  const repolink = repository == "origin" ? findOrigin(sourceDir) : repository;

  const head = buildHead(siteConfig, author, description);

  Object.assign(themeConfig, {
    logo,
    sidebar,
    nav,
    lastUpdated
  });

  Object.assign(siteConfig, {
    title,
    description,
    head,
    themeConfig,
    markdown,
    evergreen
  });

  return {
    name: "@markspec/vuepress-plugin-config",

    async ready() {
      const { pages } = ctx.getSiteData ? ctx.getSiteData() : ctx;
      if (autonav) {
        const { nav, sidebar } = buildNav(pages, autonav == "all");
        themeConfig.nav = nav;
        themeConfig.sidebar = sidebar;
      }
      if (repolink || links.length) {
        addLinks(themeConfig.nav, repolink, links);
      }

      if (dbgDump) console.debug(JSON.stringify({ siteConfig }, null, 2));
    }
  };
};

function buildHead(siteConfig, author, description) {
  head = siteConfig.head || [];
  base = siteConfig.base || "/";
  favicon = `${base}favicon.png`;

  // build head
  head.unshift(["link", { rel: "icon", href: favicon }]);
  if (author) {
    head.unshift(["meta", { rel: "author", content: author }]);
  }
  if (description) {
    head.unshift(["meta", { name: "description", content: description }]);
  }
  return head;
}

function findOrigin(dir) {
  let origin = undefined;
  const remoteOrigin = require("remote-origin-url");
  const findGitRoot = require("find-git-root");

  try {
    const gitroot = findGitRoot(dir);
    origin = remoteOrigin.sync(path.join(gitroot, "config"));
  } catch (e) {
    console.error(e.message);
  }

  return origin;
}

function buildNav(pages, all) {
  const navitems = pages
    .filter(
      page =>
        page.path != "/" &&
        page.frontmatter.autonav != "hide" &&
        (all || page.frontmatter.autonav)
    )
    .map(page => {
      const { title, path: link, frontmatter } = page || {};
      const { autonav } = frontmatter || {};
      const { group = link, order = 99 } =
        typeof autonav == "string"
          ? { group: autonav }
          : typeof autonav == "number"
          ? { order: autonav }
          : autonav == "true"
          ? { order: 10 }
          : {};

      const path = group
        .replace(".html", "")
        .slice(1)
        .split("/");

      const level = path.filter(s => !!s).length;
      const text = path[level - 1] || title;

      return {
        page,
        link,
        text,
        path,
        order: level * 100 + order
      };
    })
    .filter(({ text }) => !text.startsWith("_"))
    .sort((a, b) => {
      return b.order != a.order
        ? a.order - b.order
        : a.path == b.path
        ? 0
        : a.path < b.path
        ? -1
        : 1;
    });

  const sidebar = navitems
    .filter(item => item.page.frontmatter.sidebar != false)
    .reduce((tree, info) => {
      const path = `/${info.path[0]}/`;
      if (!tree[path]) {
        tree[path] = [];
      }
      tree[path].push(info.link);

      return tree;
    }, {});

  sidebar["/"] = [""];

  const { items: nav } = navitems.reduce(
    (tree, info) => {
      let node = tree;
      let next = tree;
      let p;

      for (p of info.path) {
        const text = navCase(p);
        node.items = node.items || [];
        const index = node.items.findIndex(item => {
          return item.text == text;
        });
        if (index != -1) {
          next = node.items[index];
        } else {
          next = { text };
          node.items.push(next);
          node.items = node.items.sort((a, b) => b.path < a.path);
        }
        node = next;
      }

      Object.assign(node, {
        link: info.link,
        text: navCase(info.text),
        order: info.order
      });

      return tree;
    },
    { items: [] }
  );

  return { nav, sidebar };
}

function addLinks(nav, repolink, links) {
  const node = {
    text: (links && links.text) || "Links",
    items: []
  };

  if (repolink) {
    const text = startCase(new URL(repolink).hostname.split(".")[0]);
    node.items.push({ text, link: repolink });
  }

  for (item of (Array.isArray(links) && links) || links.items || []) {
    node.items.push(item);
  }

  if (node.items.length == 1) {
    nav.push(node.items[0]);
  } else {
    nav.push(node);
  }
  return nav;
}

function navCase(s) {
  return startCase(lowerCase(s));
}
