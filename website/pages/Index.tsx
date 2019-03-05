import '../assets/style/index.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getJSON } from '../helper';
import { Props, Context } from '../interface/common';

const magnifier = require('../assets/images/magnifier.png');

class Index extends React.Component <Props, Context> {
  constructor(props: Props, context: Context) {
    super(props, context);
    this.state = {
      charts: [],
    };
  }

  componentDidMount() {
    getJSON('./static/json/config.json', (data: any) => {
      if (data) {
        this.setState({
          charts: data,
        });
      }
    });
  }

  handleClick = (event: Event, type: string, item: {
    url?: string;
  }) => {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    if (type === 'origin') {
      window.open(item.url);
    } else {
    }
  };

  /**
   * 获取示例列表
   * @returns {*}
   */
  getArtList() {
    const { charts }: any = this.state;
    return charts.map((item: any, index: number) => (
      <li className="chart" key={index}>
        <div className="chart_wrap">
          <span
            className="chart_bg"
            style={{
              backgroundImage: `url('${item.imgSrc}')`,
            }}
          >
            <div className="chart_hover animation clearfix">
              <Link to={item.link}>
                <div className="chart_magnifier_right">
                  <div>
                    <img src={magnifier} />
                  </div>
                  <div>查看示例</div>
                </div>
              </Link>
            </div>
          </span>
          <div className="chart_info">
            <div className="chart_name">{item.chart_name}</div>
            <div className="chart_detail clearfix">
              <div className="chart_author pull-left">
                <span className="chart_icon chart_author_icon" />
                <span className="chart_icontxt">{item.chart_author}</span>
              </div>
              <div className="chart_time pull-right">
                <span className="chart_icon chart_time_icon" />
                <span className="chart_icontxt">{item.chart_time}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    ));
  }

  /**
   * render
   * @returns {*}
   */
  render() {
    return (
      <div>
        <Header />
        <div className="main">
          <div className="charts-list">
            <ul id="charts-list-ul" className="charts-list-ul clearfix">
              {this.getArtList()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
