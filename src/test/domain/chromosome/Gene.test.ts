import Gene from "../../../domain/chromosome/Gene";

describe("Gene Test", () => {
  test("Check the gene constructor", () => {
    const a = new Gene(0);

    expect(a.mValue).toEqual(0);
  });

  test("Equals operator", () => {
    const a = new Gene(0);
    const b = new Gene(0);

    const c = a.equalsOperator(a, b);

    expect(c).toEqual(true);
  });

  test("Not equals operator", () => {
    const a = new Gene(0);
    const b = new Gene(0);

    const c = a.notEqualsOperator(a, b);

    expect(c).toEqual(false);
  });

  test("Not toString", () => {
    const a = new Gene(0);

    expect(a.toString()).toEqual("0");
  });

  test("To test toString null", () => {
    const a = new Gene(null);

    expect(a.toString()).toEqual("");
  });

  test("To test equals method", () => {
    const a = new Gene(0);
    const b = new Gene(0);

    expect(a.equals(b)).toEqual(true);
  });

  test("To test equals method false", () => {
    const a = new Gene(0);
    const b = new Gene(1);

    expect(a.equals(b)).toEqual(false);
  });

  test("To test equals method false", () => {
    const a = new Gene(0);
    expect(a.equals(undefined)).toEqual(false);
  });
});
