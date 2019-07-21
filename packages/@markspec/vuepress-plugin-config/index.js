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
    base = process.env.BASE_URL || siteConfig.base,
    title = siteConfig.title || pkg.name,
    description = siteConfig.description || pkg.description,
    author = (pkg.author && pkg.author.email) || undefined,
    logo = (themeConfig && themeConfig.logo) || "/favicon.png",
    autonav = true,
    sidebar = themeConfig.sidebar || "auto",
    nav = themeConfig.nav || [],
    links = [],
    repository = true,
    markdown = siteConfig.markdown || {
      lineNumbers: true
    },
    evergreen = siteConfig.evergreen || true,
    dbgDump
  } = config;

  const repolink = repository == true ? findOrigin(sourceDir, pkg) : repository;

  const head = buildHead(siteConfig.head, author, description);

  Object.assign(themeConfig, {
    logo,
    sidebar,
    nav
  });

  Object.assign(siteConfig, {
    base,
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
        themeConfig.nav = buildNav(pages, autonav == "all");
      }
      if (repolink || links.length) {
        addLinks(themeConfig.nav, repolink, links);
        // console.log(themeConfig.nav)
      }

      if (dbgDump) console.debug(JSON.stringify({ siteConfig }, null, 2));
    }
  };
};

function buildHead(head, author, description) {
  head = head || [];
  // build head
  head.unshift(["link", { rel: "icon", href: "/favicon.png" }]);
  if (author) {
    head.unshift(["meta", { rel: "author", content: author }]);
  }
  if (description) {
    head.unshift(["meta", { name: "description", content: description }]);
  }
  return head;
}

function findOrigin(dir, pkg) {
  let origin = undefined;
  const remoteOrigin = require("remote-origin-url");
  const findGitRoot = require("find-git-root");

  try {
    const gitroot = findGitRoot(dir);
    origin = remoteOrigin.sync(path.join(gitroot, "config"));
  } catch (e) {
    console.error(e.message);
  }

  return (
    origin || (pkg && pkg.repository && (pkg.repository.url || pkg.repository))
  );
}

function buildNav(pages, all) {
  const { items: nav } = pages
    .filter(
      page =>
        page.path != "/" &&
        page.frontmatter.navbar != "hide" &&
        (all || page.frontmatter.navbar)
    )
    .map(page => {
      const { title, path: link, frontmatter } = page || {};
      const { navbar } = frontmatter || {};
      const { group = link, order = 99 } =
        typeof navbar == "string"
          ? { group: navbar }
          : typeof navbar == "number"
          ? { order: navbar }
          : navbar == "true"
          ? { order: 10 }
          : {};

      const path = group
        .replace(".html", "")
        .slice(1)
        .split("/");

      const level = path.filter(s => !!s).length;
      const text = path[level - 1] || title;

      return {
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
    })
    .reduce(
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

  return nav;
}

function addLinks(nav, repolink, links) {
  let items = [];

  if (repolink) {
    const text = startCase(new URL(repolink).hostname.split(".")[0]);
    items.push({ text, link: repolink });
  }

  for (link of links) {
    items.push(link);
  }

  if (items.length == 1) {
    nav.push(items[0]);
  } else {
    for (item of items) {
      nav.push(item);
    }
  }
  return nav;
}

function navCase(s) {
  return startCase(lowerCase(s));
}
