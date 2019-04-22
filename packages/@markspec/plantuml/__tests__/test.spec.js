const plantuml = require("..");

const diagram = `
@startuml
A-->B: request
B-->A: ack
@enduml`;

const erroneousDiagram = `@start`;

describe("plantuml", () => {
  it("renders a svg diagram", async () => {
    const uri = plantuml.toUriSync(diagram, 'svg');
    expect(uri).toMatchSnapshot();
  });
  it("renders a png diagram by defult", async () => {
    const uri = plantuml.toUriSync(diagram);
    expect(uri).toMatchSnapshot();
  });
});
