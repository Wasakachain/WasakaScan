import React from 'react';
import { Link } from 'react-router-dom';
import { blocksProperties, tableHeader } from '../static_data/blockData';
import { getDifferenceFromNow, parseHashToShow } from '../utils/functions';
import './css/BlocksList.css';

export default class BlocksList extends React.Component {
  getBlockPropertyValue(property, baseUrl, index, blockIndex, responsive = false) {
    if (baseUrl) {
      return (
        <Link
          key={`block-property-${index}`}
          className={`block-property${property === 'index' || property === 'minedBy' ? ' main-color' : ' five-color'} ${responsive ? 'responsive-width' : 'desktop-width'}`}
          to={`${baseUrl}${this.props.data[blockIndex][property]}`}
        >
          <p className='overflow-ellipsis'>{property === 'minedBy' ? parseHashToShow(this.props.data[blockIndex][property]) : this.props.data[blockIndex][property]}</p>
        </Link>
      );
    }
    return (
      <p key={`block-property-${index}`} className={`overflow-ellipsis block-property ${responsive ? 'responsive-width' : 'desktop-width'} five-color`}>{
        property === 'dateCreated' ?
          getDifferenceFromNow(this.props.data[blockIndex][property]) :
          property === 'blockthis.props.DataHash' || property === 'blockHash' ?
            parseHashToShow(this.props.data[blockIndex][property]) :
            this.props.data[blockIndex][property]
      }
      </p>
    );
  }

  responsiveList() {
    const { data } = this.props;
    return (
      <div className='blocks-tables-list-container full-width flex wrap'>
        {
          Object.keys(data).map((blockIndex, index) => {
            return (
              <div key={`block-${blockIndex}`} className={`single-block-properties-table full-width flex-between ${index % 2 === 0 ? 'four-background' : 'third-background'}`}>
                <div className='property-label-column flex'>
                  {
                    tableHeader.map((label, index) => {
                      return (
                        <p key={`table-header-${index}`} className='header-label full-width five-color'>{label}</p>
                      )
                    })
                  }
                </div>
                <div className='property-value-column flex'>
                  {blocksProperties.map(({ property, baseUrl }, index) => this.getBlockPropertyValue(property, baseUrl, index, blockIndex, true))}
                  <Link className='block-property main-color' to={`/block/transactions/${blockIndex}`}>
                    <p>View</p>
                  </Link>
                </div>
              </div>
            );
          })
        }
      </div>
    )
  }

  desktopList() {
    const { data } = this.props;
    return (
      <div className='blocks-list-wrapper full-width flex wrap'>
        <div className='blocks-table-container full-width flex wrap'>
          <div className='table-header flex-center full-width'>
            {
              tableHeader.map((label, index) => {
                return (
                  <p key={`table-header-${index}`} className='header-label five-color'>{label}</p>
                )
              })
            }
          </div>
          <div className='blocks-list-container flex full-width'>
            <div className='list-scroll-container flex full-width wrap'>
              {
                Object.keys(data).map(blockIndex => {
                  return (
                    <div key={`block-${blockIndex}`} className='block-element-container full-width flex-between'>
                      {blocksProperties.map(({ property, baseUrl }, index) => this.getBlockPropertyValue(property, baseUrl, index, blockIndex))}
                      <Link className='block-property main-color' to={`/block/transactions/${blockIndex}`}>
                        <p>View</p>
                      </Link>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { responsive } = this.props;
    if (responsive <= 800) {
      return this.responsiveList();
    }
    return this.desktopList();
  }
}
