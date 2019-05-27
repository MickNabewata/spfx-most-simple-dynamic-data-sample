import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import * as strings from 'DataProviderWebPartStrings';
import DataProvider from './components/DataProvider';
import { IDataProviderProps } from './components/IDataProviderProps';
import SampleStringData, { propertyId } from '../../dynamicData/SampleStringData';

/** 動的データ生成Webパーツ プロパティ定義 */
export interface IDataProviderWebPartProps {
}

/** 動的データ生成Webパーツ */
export default class DataProviderWebPart extends BaseClientSideWebPart<IDataProviderWebPartProps> {

  /** 動的データクラス保持用 */
  private sampleStringData : SampleStringData;

  /** 描画 */
  public render(): void {
    const element: React.ReactElement<IDataProviderProps > = React.createElement(
      DataProvider,
      {
        stringInputCallBack : this.onStringSearch,
        addressInputCallBack : () => {},
        phoneNumberInputCallBack : () => {}
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /** 文字列検索イベント */
  private onStringSearch = (value : string) => {
    this.sampleStringData.setPropertyValue(value);
    this.context.dynamicDataSourceManager.notifyPropertyChanged(propertyId);
  }

  /** Webパーツ初期化イベント */
  protected onInit(): Promise<void> {
    // 動的データ初期化
    this.sampleStringData = new SampleStringData();
    this.context.dynamicDataSourceManager.initializeSource(this.sampleStringData);

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
