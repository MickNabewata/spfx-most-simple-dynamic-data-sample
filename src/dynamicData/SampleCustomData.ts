import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';

/** プロパティID */
export const propertyId = 'sampleCustomData';

/** 動的データの型 */
export interface CustomType {
  /** 住所 */
  address : string;

  /** 電話番号 */
  phoneNumber : string;
}

/** 自分で定義した型の値を公開する動的データクラスのサンプル */
export default class SampleCustomData implements IDynamicDataCallables {

  /** 動的データの値を保持するプロパティ */
  private _value : CustomType;

  /** 動的データの型定義 */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: propertyId,
        title: 'サンプルカスタム定義型データ'
      }
    ];
  }

  /** 動的データの値を取得 */
  public getPropertyValue(propId: string): CustomType {
    switch (propId) {
        case propertyId:
            return this._value;
    }
    throw new Error('プロパティIDが不正です。');
  }

  /** 動的データの値をセット */
  public setPropertyValue(value : CustomType)
  {
    this._value = value;
  }
}