import React from 'react';
import { ReactComponent as Arrow } from '../assets/img/icons/arrow-down.svg';
import { viewDropdownElements } from '../static_data/headerData';
import './css/ViewDropDown.css';
import { tsObjectKeyword } from '@babel/types';

export default class ViewDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false
    }
    this.handleList = this.handleList.bind(this);
    this.goToView = this.goToView.bind(this);
  }

  goToView = (location) => () => {
    if (this.props.location.pathname !== location) {
      this.props.history.push(location);
    }
    this.setState({showList: false});
  }

  handleList() {
    this.setState((state) => {
      return { showList: !state.showList }
    })
  }

  renderList() {
    const { location: { pathname } } = this.props;
    let elementsToRender = Object.keys(viewDropdownElements).filter((routeName) => routeName !== pathname);
    return (
      <div className='list-container'>
        {
          elementsToRender.map((itemListElement, index) => {
            return (
              <div
                key={`dropdown-list-item-${index}`}
                className='dropdown-list-item'
                onClick={this.goToView(viewDropdownElements[itemListElement].to)}
              >
                <p className='label'>{viewDropdownElements[itemListElement].list}</p>
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    let { showList } = this.state;
    return (
      <div className='site-dropdown-container'>
        <div className='dropdown-header flex' onClick={this.handleList}>
          <p className='current-site-label'>
            {
              Object.keys(viewDropdownElements).indexOf(this.props.location.pathname) !== -1 ?
                viewDropdownElements[this.props.location.pathname].label : viewDropdownElements["/"]
            }
          </p>
          <Arrow className={`dropdown-arrow ${showList ? 'open' : 'close'}`} />
        </div>
        {
          showList && this.renderList()
        }
      </div>
    );
  }
}
