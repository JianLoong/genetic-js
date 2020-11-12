import { IModel } from "./IModel";

export default abstract class ModelBase implements IModel {
    perform() {
        throw new Error("Method not implemented.");
    }

    abstract performModel(): void;

}