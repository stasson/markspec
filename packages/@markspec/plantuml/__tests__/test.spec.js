const { toSvg, toSvgSync, check, checkSync, toUri, toUriSync } = require("..");

const diagram = `
@startuml
A-->B: request
B-->A: ack
@enduml`;

const erroneousDiagram = `@start`;

describe("plantuml", () => {
  it("renders a diagram", async () => {
    const syncResult = toSvgSync(diagram);
    const result = await toSvg(diagram);
    const syncUri = toUriSync(diagram);
    const uri = await toUri(diagram);
    expect(result).toMatchSnapshot();
    expect(result).toEqual(syncResult);
    expect(uri).toMatchSnapshot();
    expect(uri).toEqual(syncUri);
});
  it("renders an erroneous diagram by default", () => {
    const result = toSvgSync(erroneousDiagram);
    expect(result).toMatchSnapshot();
  });
  it("checks syntax", async () => {
    await check(diagram);
    checkSync(diagram);
    expect(() => {
      checkSync(erroneousDiagram);
    }).toThrow();
    await expect(check(erroneousDiagram)).rejects.toMatchSnapshot();
  });
});
