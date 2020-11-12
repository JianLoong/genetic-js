export default class Gene {
  mValue: any;
  constructor(value: any) {
    this.mValue = value;
  }

  equals(other?: Gene): boolean {
    if (other === undefined)
      return false;
    return other.mValue === this.mValue;
  }

  equalsOperator(first: Gene, second: Gene): boolean {
    return first.equals(second);
  }

  notEqualsOperator(first: Gene, second: Gene): boolean {
    return !first.equals(second);
  }

  toString() {
    return (this.mValue != null ? this.mValue : "").toString();
  }
}
