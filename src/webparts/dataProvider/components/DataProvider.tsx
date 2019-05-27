import * as React from 'react';
import styles from './DataProvider.module.scss';
import { IDataProviderProps } from './IDataProviderProps';
import { IDataProviderStates } from './IDataProviderStates';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

/** 動的データ生成Webパーツ */
export default class DataProvider extends React.Component<IDataProviderProps, IDataProviderStates> {

  /** 動的データ生成Webパーツ 初期化 */
  constructor(props : IDataProviderProps)
  {
    super(props);

    this.state={ stringInput : '' };
  }

  /** 文字列の入力イベント */
  private onStringSearch = (value : any)=> {
    this.props.stringInputCallBack(value);
  }

  public render(): React.ReactElement<IDataProviderProps> {
    return (
      <div>
        <SearchBox
          placeholder='文字列'
          onSearch={this.onStringSearch}
          value={this.state.stringInput}
          />
      </div>
    );
  }
}
