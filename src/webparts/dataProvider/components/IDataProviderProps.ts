export interface IDataProviderProps {
    /** 文字列入力時コールバック */
    stringInputCallBack : (value : string) => void;

    /** 住所入力時コールバック */
    addressInputCallBack : (value : string) => void;

    /** 電話番号入力時コールバック */
    phoneNumberInputCallBack : (value :string) => void;
}
