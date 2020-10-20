class Gene {
    m_value: Object;
    constructor(value: Object) {
        this.m_value = value;
    }
    equalsOperator(first: Gene, second: Gene) {
        return first.equals(second);
    }

    notEqualsOperator(first: Gene, second: Gene) {
        return !first.equals(second);
    }

    toString() {
        return (this.m_value != null ? this.m_value : "").toString();
    }

    equals(other: Gene) {
        if (other == null) {
            return false;
        }
        return other.m_value == this.m_value;
    }
}

export { Gene };