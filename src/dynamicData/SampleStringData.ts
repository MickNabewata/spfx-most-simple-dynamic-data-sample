import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';

/** プロパティID */
export const propertyId = 'sampleStringData';

/** 文字列型の値を公開する動的データクラスのサンプル */
export default class SampleStringData implements IDynamicDataCallables {

  /** 動的データの値を保持するプロパティ */
  private _value : string;

  /** 動的データの型定義 */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: propertyId,
        title: 'サンプル文字列型データ'
      }
    ];
  }

  /** 動的データの値を取得 */
  public getPropertyValue(propId: string): string {
    switch (propId) {
        case propertyId:
          return this._value;
    }
    throw new Error('プロパティIDが不正です。');
  }

  /** 動的データの値をセット */
  public setPropertyValue(value : string)
  {
    this._value = value;
  }
}