const  MarkdownIt = require('markdown-it')
const Plugin = require('..');
const fs = require('fs');
const path = require('path');

const md = new MarkdownIt().use(Plugin);
const fixture = fs.readFileSync( path.join(__dirname, 'fixture.md'),'utf8')

describe('markdown-it-markspec', () => {
    it('renders markspec',  ()=> {
        const result = (md.render(fixture))
        fs.writeFileSync(path.join(__dirname, 'rendering.html'),result,'utf8')
        expect(md.render(fixture)).toMatchSnapshot()
    });
});
