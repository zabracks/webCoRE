
export interface IModelMapper<TRemote, TLocal> {
    toLocal: (remote: TRemote) => TLocal;
    toRemote: (local: TLocal) => TRemote;
}

export const mapModel = <TRemote, TLocal>(toLocal: (remote: TRemote) => TLocal, toRemote: (local: TLocal) => TRemote): IModelMapper<TRemote, TLocal> => ({ toLocal, toRemote });