import * as React from 'react';
import styles from './DataViewer.module.scss';
import { IDataViewerProps } from './IDataViewerProps';

/** 動的データ表示Webパーツ */
export default class DataViewer extends React.Component<IDataViewerProps, {}> {
  public render(): React.ReactElement<IDataViewerProps> {
    return (
      <div>
        <h2>サンプル文字列</h2>
        <div>{this.props.string}</div>
      </div>
    );
  }
}
