import { Gene } from "../../domain/chromosome/Gene";

describe("Gene Test", () => {
  test("Check the gene constructor", () => {
    let a = new Gene(0);

    expect(a.m_value).toEqual(0);
  });

  test("Equals operator", () => {
    let a = new Gene(0);
    let b = new Gene(0);

    let c = a.equalsOperator(a, b);

    expect(c).toEqual(true);
  });

  test("Not equals operator", () => {
    let a = new Gene(0);
    let b = new Gene(0);

    let c = a.notEqualsOperator(a, b);

    expect(c).toEqual(false);
  });

  test("Not toString", () => {
    let a = new Gene(0);

    expect(a.toString()).toEqual("0");
  });

  test("To test toString null", () => {
    let a = new Gene(null);

    expect(a.toString()).toEqual("");
  });

  test("To test equals method", () => {
    let a = new Gene(0);
    let b = new Gene(0);

    expect(a.equals(b)).toEqual(true);
  });

  test("To test equals method false", () => {
    let a = new Gene(0);
    let b = new Gene(1);

    expect(a.equals(b)).toEqual(false);
  });

  test("To test equals method null", () => {
    let a = new Gene(null);
    let b = null;

    expect(a.equals(b)).toEqual(false);
  });
});
