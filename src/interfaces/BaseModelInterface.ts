import { IModelsInterface } from "./ModelsInterface";

export interface IBaseModelInterface {
    prototype?;
    associate?(models: IModelsInterface);
}