import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import * as strings from 'DataProviderWebPartStrings';
import DataProvider from './components/DataProvider';
import { IDataProviderProps } from './components/IDataProviderProps';
import SampleStringData, { propertyId as propIdString } from '../../dynamicData/SampleStringData';
import SampleCustomData, { propertyId as propIdCustom, CustomType } from '../../dynamicData/SampleCustomData';

/** 動的データ生成Webパーツ プロパティ定義 */
export interface IDataProviderWebPartProps {
}

/** 動的データ生成Webパーツ */
export default class DataProviderWebPart extends BaseClientSideWebPart<IDataProviderWebPartProps> {

  /** 動的データクラス保持用 */
  private sampleStringData : SampleStringData;

  /** 動的データクラス保持用 */
  private sampleCustomData : SampleCustomData;

  private customData : CustomType;

  /** 描画 */
  public render(): void {
    const element: React.ReactElement<IDataProviderProps > = React.createElement(
      DataProvider,
      {
        stringInputCallBack : this.onStringSearch,
        addressInputCallBack : this.onAddressSearch,
        phoneNumberInputCallBack : this.onPhoneNumberSearch
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /** 文字列検索イベント */
  private onStringSearch = (value : string) => {
    this.sampleStringData.setPropertyValue(value);
    this.context.dynamicDataSourceManager.notifyPropertyChanged(propIdString);
  }

  /** 住所検索イベント */
  private onAddressSearch = (value : string) => {
    this.customData.address = value;
    this.sampleCustomData.setPropertyValue(this.customData);
    this.context.dynamicDataSourceManager.notifyPropertyChanged(propIdCustom);
  }

  /** 電話番号検索イベント */
  private onPhoneNumberSearch = (value : string) => {
    this.customData.phoneNumber = value;
    this.sampleCustomData.setPropertyValue(this.customData);
    this.context.dynamicDataSourceManager.notifyPropertyChanged(propIdCustom);
  }

  /** Webパーツ初期化イベント */
  protected onInit(): Promise<void> {
    // 動的データ初期化
    this.sampleStringData = new SampleStringData();
    this.sampleStringData.setPropertyValue('testinit');
    this.context.dynamicDataSourceManager.initializeSource(this.sampleStringData);
    /*
    this.sampleCustomData = new SampleCustomData();
    this.customData = { address : '', phoneNumber : '' };
    this.context.dynamicDataSourceManager.initializeSource(this.sampleCustomData);
    */

    // 初期化終了
    return Promise.resolve();
  }

  /** 破棄イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /** データバージョン取得 */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /** プロパティ定義 */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
      ]
    };
  }
}
