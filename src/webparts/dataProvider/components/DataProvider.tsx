import * as React from 'react';
import styles from './DataProvider.module.scss';
import { IDataProviderProps } from './IDataProviderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

/** 動的データ生成Webパーツ */
export default class DataProvider extends React.Component<IDataProviderProps, {}> {

  /** 文字列の入力イベント */
  private onStringSearch = (value : any)=> {
    this.props.stringInputCallBack(value);
  }

  /** 住所の入力イベント */
  private onAddressSearch = (value : any)=> {
    this.props.addressInputCallBack(value);
  }

  /** 電話番号の入力イベント */
  private onPhoneNumberSearch = (value : any)=> {
    this.props.phoneNumberInputCallBack(value);
  }

  public render(): React.ReactElement<IDataProviderProps> {
    return (
      <div>
        <SearchBox
          placeholder='文字列'
          onSearch={this.onStringSearch}
          />
        <SearchBox
          placeholder='住所'
          onSearch={this.onAddressSearch}
          />
        <SearchBox
          placeholder='電話番号'
          onSearch={this.onPhoneNumberSearch}
          />
      </div>
    );
  }
}
