import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneDynamicFieldSet, PropertyPaneDynamicField, DynamicDataSharedDepth, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import * as strings from 'DataViewerWebPartStrings';
import DataViewer from './components/DataViewer';
import { IDataViewerProps } from './components/IDataViewerProps';
import { DynamicProperty } from '@microsoft/sp-component-base';
import { propertyId as propIdString } from '../../dynamicData/SampleStringData';
import { propertyId as propIdCustom, CustomType } from '../../dynamicData/SampleCustomData';

/** 動的データ表示Webパーツ プロパティ定義 */
export interface IDataViewerWebPartProps {
  /** サンプル文字列 */
  sampleString : DynamicProperty<string>;
}

/** 動的データ表示Webパーツ */
export default class DataViewerWebPart extends BaseClientSideWebPart<IDataViewerWebPartProps> {

  /** 描画 */
  public render(): void {

    // 動的データ取得
    let dString : string = (this.properties.sampleString)? this.properties.sampleString.tryGetValue() : undefined;

    // 要素の生成
    const element: React.ReactElement<IDataViewerProps > = React.createElement(
      DataViewer,
      {
        string : dString,
        address : 'a',
        phoneNumber : 'b'
      }
    );

    // 描画
    ReactDom.render(element, this.domElement);
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
        {
          groups: [
            {
              groupName : '動的データ接続',
              groupFields : [
                PropertyPaneDynamicFieldSet({
                  label : '動的データ接続',
                  fields : [
                    PropertyPaneDynamicField(
                      propIdString,
                      {
                        label : '接続先'
                      }
                    )
                    /*
                    ,PropertyPaneDynamicField(
                      propIdCustom,
                      {
                        label : 'カスタム定義型'
                      }
                    )*/
                  ],
                  sharedConfiguration : {
                    depth : DynamicDataSharedDepth.Property
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
