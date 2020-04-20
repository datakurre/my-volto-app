/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div className="block hero">
    <div className="block-inner-wrapper">
      {data.url && (
        <picture className="hero-image">
          <source
            srcSet={`
            ${flattenToAppURL(data.url)}/@@images/image/mini 200w,
            ${flattenToAppURL(data.url)}/@@images/image/preview 400w,
            ${flattenToAppURL(data.url)}/@@images/image/large 800w,
            ${flattenToAppURL(data.url)}/@@images/image/great 1200w,
            ${flattenToAppURL(data.url)}/@@images/image/huge 1600w
            `}
            sizes="(min-width: 1200px) calc(1127px * 0.5), (min-width: 992px) calc(933px * 0.5), (min-width: 768px) calc(723px * 0.5), calc(100vw - (1em * 2))"
          />
          <img src={`${flattenToAppURL(data.url)}/@@images/image`} alt="" />
        </picture>
      )}
      <div className="hero-body">
        {data.title && <h1>{data.title}</h1>}
        {data.description && <p>{data.description}</p>}
      </div>
    </div>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
